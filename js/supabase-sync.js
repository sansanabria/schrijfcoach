// ─── SUPABASE SYNC ────────────────────────────────────────────────────────────
// Mirrors the schrijfcoach_* localStorage keys into Supabase, per key.
//
// Design: localStorage stays the single synchronous source of truth for reads,
// so every existing _lsGet() call site keeps working untouched. Writes go to
// localStorage first (instant, offline-safe) and are then pushed to Supabase in
// a debounced batch. Merging is per key, last-write-wins on updated_at.

const SB_SYNC_KEYS = [
  'schrijfcoach_stats',
  'schrijfcoach_srs',
  'schrijfcoach_flags',
  'schrijfcoach_mistakes',            // never synced by the old Gist backup
  'schrijfcoach_grammar_read',
  'schrijfcoach_unit_progress',
  'schrijfcoach_unit_progress_schema',
  'schrijfcoach_last_position',
  'schrijfcoach_reading_history',
  'schrijfcoach_unknown_words',
  'schrijfcoach_progress',
  'schrijfcoach_sentences',
  'schrijfcoach_conj_tense_pref',
  'schrijfcoach_verb_tense_pref',
];
// Deliberately NOT synced: schrijfcoach_theme — light/dark is a per-device
// choice, and forcing a phone to match the laptop would be a regression.

const SB_MTIME_KEY   = 'schrijfcoach_sb_mtime';   // {key: ISO} last local write
const SB_PULLED_FLAG = '_sb_just_pulled';         // guards the reload loop

let _sbDirty     = new Set();
let _sbTimer     = null;
let _sbSyncing   = false;

function _sbIsSyncKey(key) { return SB_SYNC_KEYS.indexOf(key) !== -1; }

function _sbMtimes() {
  try { return JSON.parse(localStorage.getItem(SB_MTIME_KEY)) || {}; }
  catch (e) { return {}; }
}
function _sbTouch(key) {
  const m = _sbMtimes();
  m[key] = new Date().toISOString();
  try { localStorage.setItem(SB_MTIME_KEY, JSON.stringify(m)); } catch (e) {}
}

// Called by _lsSet / _lsRemove in app.js on every write.
function _sbOnLocalWrite(key) {
  if (!_sbIsSyncKey(key)) return;
  _sbTouch(key);
  if (!sbUser()) return;              // signed out: local only, nothing to push
  _sbDirty.add(key);
  _sbSchedulePush();
}

function _sbSchedulePush() {
  if (!sbUser()) return;
  _sbSetIcon('busy', 'Synchroniseren…');
  clearTimeout(_sbTimer);
  _sbTimer = setTimeout(_sbPush, 3000);
}

function _sbSetIcon(status, label) {
  const el = document.getElementById('account-icon');
  if (!el) return;
  el.dataset.status = status;
  el.title = label;
}

async function _sbPush() {
  const user = sbUser();
  const client = sbClient();
  if (!user || !client || _sbDirty.size === 0) return;

  const keys = Array.from(_sbDirty);
  _sbDirty.clear();

  const mt = _sbMtimes();
  const rows = keys.map(k => ({
    user_id: user.id,
    key: k,
    value: _lsGet(k) ?? '',
    updated_at: mt[k] || new Date().toISOString(),
  })).filter(r => r.value !== '');

  if (rows.length === 0) { _sbSetIcon('ok', 'Gesynchroniseerd'); return; }

  try {
    const { error } = await client.from('user_state').upsert(rows, { onConflict: 'user_id,key' });
    if (error) throw error;
    _sbSetIcon('ok', 'Gesynchroniseerd — ' + user.email);
  } catch (e) {
    keys.forEach(k => _sbDirty.add(k));   // retry on the next write
    _logError('sbPush', e);
    _sbSetIcon('err', 'Sync mislukt — probeert opnieuw');
  }
}

// Pull remote state and merge it into localStorage. Returns true if anything
// local actually changed (meaning the UI must re-render).
async function _sbPull() {
  const user = sbUser();
  const client = sbClient();
  if (!user || !client) return false;

  const { data, error } = await client
    .from('user_state')
    .select('key,value,updated_at')
    .eq('user_id', user.id);
  if (error) { _logError('sbPull', error); return false; }

  const mt = _sbMtimes();
  const remoteKeys = new Set();
  let changed = false;

  (data || []).forEach(row => {
    if (!_sbIsSyncKey(row.key)) return;
    remoteKeys.add(row.key);
    const localAt = mt[row.key] || '';
    // Remote is newer than our last local write for this key -> take remote.
    if (row.updated_at > localAt && _lsGet(row.key) !== row.value) {
      try {
        localStorage.setItem(row.key, row.value);
        mt[row.key] = row.updated_at;
        changed = true;
      } catch (e) { _logError('sbPull:set:' + row.key, e); }
    }
  });

  try { localStorage.setItem(SB_MTIME_KEY, JSON.stringify(mt)); } catch (e) {}

  // Anything we hold locally that the account lacks (or that we edited more
  // recently) gets pushed up. This is also the first-sign-in import path.
  SB_SYNC_KEYS.forEach(k => {
    const v = _lsGet(k);
    if (v === null || v === '') return;
    if (!remoteKeys.has(k)) { _sbDirty.add(k); return; }
    const row = (data || []).find(r => r.key === k);
    if (row && (mt[k] || '') > row.updated_at) _sbDirty.add(k);
  });

  if (_sbDirty.size > 0) await _sbPush();
  return changed;
}

async function _sbSyncNow() {
  if (_sbSyncing || !sbUser()) return;
  _sbSyncing = true;
  _sbSetIcon('busy', 'Synchroniseren…');
  try {
    const changed = await _sbPull();
    if (changed && !sessionStorage.getItem(SB_PULLED_FLAG)) {
      // Progress arrived from another device; reload so every tab re-renders
      // from the updated localStorage. Guarded so this can only happen once.
      sessionStorage.setItem(SB_PULLED_FLAG, '1');
      location.reload();
      return;
    }
    _sbSetIcon('ok', 'Gesynchroniseerd — ' + sbUser().email);
  } catch (e) {
    _logError('sbSyncNow', e);
    _sbSetIcon('err', 'Sync mislukt');
  } finally {
    _sbSyncing = false;
  }
}

// Flush pending writes when leaving the page or switching apps on mobile.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && sbUser() && _sbDirty.size > 0) {
    clearTimeout(_sbTimer);
    _sbPush();
  }
});

// Sync on sign-in, and once on load if a session is already restored.
(function _sbSyncInit() {
  const client = sbClient();
  if (!client) return;
  sessionStorage.removeItem(SB_PULLED_FLAG);
  client.auth.onAuthStateChange((event, session) => {
    if (session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
      setTimeout(_sbSyncNow, 300);
    }
  });
})();
