// ─── CLOUD SYNC ───────────────────────────────────────────────────────────────
//
// Keeps localStorage progress in step with the `progress` row in Supabase, so
// the same account sees the same progress on phone, laptop and tablet.
//
// Loads after js/auth.js and reads sbClient / authIsLoggedIn() from it. Every
// entry point is a no-op when logged out or when the SDK never loaded, so the
// app stays fully usable offline and without an account.
//
// Conflict policy is last-write-wins, per the app owner's choice. Two silent
// safety nets exist because LWW is unforgiving: a backup of whatever is about
// to be overwritten, and a hard refusal to upload an empty local state over a
// non-empty cloud one.

// Values are the raw localStorage strings, so this layer never has to
// understand any key's schema — a change in app.js can't break sync.
const SYNCED_KEYS = new Set([
  'schrijfcoach_stats',
  'schrijfcoach_srs',
  'schrijfcoach_flags',
  'schrijfcoach_grammar_read',
  'schrijfcoach_unit_progress',
  'schrijfcoach_unit_progress_schema',
  'schrijfcoach_last_position',
  'schrijfcoach_reading_history',
  'schrijfcoach_unknown_words',
  'schrijfcoach_mistakes',
  'schrijfcoach_progress',
  'schrijfcoach_conj_tense_pref',
  'schrijfcoach_verb_tense_pref',
]);

// ~207 KB and only changes when the user edits sentences, so it gets its own
// column and is only uploaded when it actually changed. Otherwise every
// answered sentence would ship a quarter of a megabyte over mobile data.
const SYNCED_COLD_KEY = 'schrijfcoach_sentences';

// Deliberately NOT synced: 'schrijfcoach_theme' is a per-device preference
// (phone in bed vs. laptop at a desk), and the anti-FOUC script in index.html
// reads it before any other JS anyway.

const SYNC_STATE_KEY   = 'schrijfcoach_sync_state';
const SYNC_BACKUP_KEY  = 'schrijfcoach_backup_prelogin';
const SYNC_DEBOUNCE_MS = 5000;
const SYNC_MAX_WAIT_MS = 30000;   // never defer an upload longer than this
const SYNC_PULL_THROTTLE_MS = 30000;
const SYNC_BACKOFF_MS  = [15000, 60000, 300000];

let _syncTimer        = null;
let _syncFirstDirtyAt = 0;
let _syncApplying     = false;    // true while writing a pull into localStorage
let _syncInFlight     = null;
let _syncFailures     = 0;
let _syncLastPullAt   = 0;
let _syncLastCloudWeight = 0;

// ─── STATE ────────────────────────────────────────────────────────────────────
// Raw localStorage on purpose: these are sync bookkeeping, not user progress,
// and must never feed back into the write hook.

function _syncState() {
  try { return JSON.parse(localStorage.getItem(SYNC_STATE_KEY)) || {}; }
  catch (e) { return {}; }
}
function _syncSaveState(patch) {
  try {
    localStorage.setItem(SYNC_STATE_KEY, JSON.stringify(Object.assign(_syncState(), patch)));
  } catch (e) {}
}
function _syncClearState() {
  try { localStorage.removeItem(SYNC_STATE_KEY); } catch (e) {}
}

// ─── COLLECT / APPLY ──────────────────────────────────────────────────────────

function _syncCollect() {
  const data = {};
  SYNCED_KEYS.forEach(k => {
    const v = _lsGet(k);
    if (v !== null) data[k] = v;
  });
  return { data, sentences: _lsGet(SYNCED_COLD_KEY) };
}

// Writes straight to localStorage, bypassing _lsSet, so applying a pull cannot
// re-trigger a push. _syncApplying guards the same thing belt-and-braces.
function _syncApply(data, sentences) {
  _syncApplying = true;
  try {
    Object.keys(data || {}).forEach(k => {
      if (SYNCED_KEYS.has(k) && typeof data[k] === 'string') {
        try { localStorage.setItem(k, data[k]); } catch (e) {}
      }
    });
    if (typeof sentences === 'string') {
      try { localStorage.setItem(SYNCED_COLD_KEY, sentences); } catch (e) {}
    }
  } finally {
    _syncApplying = false;
  }
}

// ─── PROGRESS WEIGHT ──────────────────────────────────────────────────────────
// How much progress a blob represents. Used only by the empty-local gate — it
// never decides a conflict, it only refuses to destroy something with nothing.

function _syncCount(data, key, pick) {
  try {
    const o = JSON.parse(data[key] || '{}') || {};
    return pick ? pick(o) : Object.keys(o).length;
  } catch (e) { return 0; }
}

function _progressWeight(data) {
  if (!data) return 0;
  return _syncCount(data, 'schrijfcoach_stats')
       + _syncCount(data, 'schrijfcoach_srs')
       + _syncCount(data, 'schrijfcoach_flags')
       + _syncCount(data, 'schrijfcoach_grammar_read')
       + _syncCount(data, 'schrijfcoach_unit_progress')
       + _syncCount(data, 'schrijfcoach_unknown_words')
       + _syncCount(data, 'schrijfcoach_reading_history', o => Object.keys(o.byId || {}).length)
       + _syncCount(data, 'schrijfcoach_mistakes',
           o => Object.keys(o.dehet || {}).length
              + Object.keys(o.vocab || {}).length
              + Object.keys(o.verbMeaning || {}).length);
}

// djb2 — only ever compared against itself, to skip uploads that would be
// byte-identical to the last one.
function _syncHash(str) {
  if (str === null || str === undefined) return '0';
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return String(h >>> 0);
}

// ─── STATUS ───────────────────────────────────────────────────────────────────

function _syncSetStatus(s) {
  const el = document.getElementById('account-btn');
  if (!el || !authIsLoggedIn()) return;
  el.dataset.status = s;
  const labels = {
    ok:   'Gesynchroniseerd',
    busy: 'Synchroniseren…',
    err:  'Synchronisatie mislukt',
  };
  el.title = (labels[s] || '') + ' — ' + authUserEmail();
  authSetSyncStatusText(s === 'ok' ? syncLastSyncLabel() : (labels[s] || ''));
}

function syncLastSyncLabel() {
  const at = _syncState().lastSyncAt;
  if (!at) return 'Nog niet gesynchroniseerd';
  const secs = Math.max(0, Math.round((Date.now() - new Date(at).getTime()) / 1000));
  if (secs < 60)   return '✓ zojuist';
  if (secs < 3600) return '✓ ' + Math.round(secs / 60) + ' min geleden';
  if (secs < 86400) return '✓ ' + Math.round(secs / 3600) + ' uur geleden';
  return '✓ ' + new Date(at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });
}

// ─── WRITE HOOK ───────────────────────────────────────────────────────────────
// Called by _lsSet AND _lsRemove in app.js for every persisted change, so no
// write site can be forgotten — including deletions, which the old Gist sync
// never propagated.

function syncNoteLocalWrite(key) {
  if (_syncApplying) return;
  if (!authIsLoggedIn()) return;
  if (!SYNCED_KEYS.has(key) && key !== SYNCED_COLD_KEY) return;
  syncSchedulePush();
}

function syncSchedulePush() {
  if (!authIsLoggedIn()) return;
  const now = Date.now();
  if (!_syncFirstDirtyAt) _syncFirstDirtyAt = now;

  // One answered sentence fires three writes (stats, position, SRS), so the
  // timer is reset constantly; without this cap a long streak could defer the
  // upload indefinitely.
  if (now - _syncFirstDirtyAt >= SYNC_MAX_WAIT_MS) {
    clearTimeout(_syncTimer);
    _syncTimer = null;
    _syncPush();
    return;
  }

  _syncSetStatus('busy');
  clearTimeout(_syncTimer);
  _syncTimer = setTimeout(() => { _syncTimer = null; _syncPush(); }, SYNC_DEBOUNCE_MS);
}

// ─── PUSH ─────────────────────────────────────────────────────────────────────

async function _syncPush() {
  if (!CLOUD_AVAILABLE || !authIsLoggedIn() || _syncApplying) return;
  if (_syncInFlight) { await _syncInFlight; }

  const { data, sentences } = _syncCollect();
  const state    = _syncState();
  const hotHash  = _syncHash(JSON.stringify(data));
  const coldHash = _syncHash(sentences);
  const hotDirty  = hotHash  !== state.lastPushedHash;
  const coldDirty = coldHash !== state.lastPushedColdHash;

  if (!hotDirty && !coldDirty) { _syncFirstDirtyAt = 0; _syncSetStatus('ok'); return; }

  // ── Empty-local gate ──
  // Safari's storage eviction, "clear site data", an over-eager extension: any
  // of these leaves local progress empty, and plain last-write-wins would then
  // happily upload that emptiness over months of work.
  const localWeight = _progressWeight(data);
  if (localWeight === 0 && (_syncLastCloudWeight > 0 || (state.lastCloudWeight || 0) > 0)) {
    _syncSetStatus('err');
    showToast('Lokale voortgang lijkt leeg — synchronisatie gepauzeerd om je cloudgegevens te beschermen.');
    return;
  }

  _syncSetStatus('busy');
  const payload = { user_id: authUserId(), data };
  if (coldDirty) payload.sentences = sentences;

  _syncInFlight = (async () => {
    try {
      const { data: row, error } = await sbClient
        .from('progress')
        .upsert(payload, { onConflict: 'user_id' })
        .select('updated_at, sentences_updated_at')
        .single();
      if (error) throw error;

      _syncFailures = 0;
      _syncFirstDirtyAt = 0;
      _syncSaveState({
        userId: authUserId(),
        lastSeenServerAt: row.updated_at,
        lastSeenSentencesAt: coldDirty ? row.sentences_updated_at : state.lastSeenSentencesAt,
        lastPushedHash: hotHash,
        lastPushedColdHash: coldDirty ? coldHash : state.lastPushedColdHash,
        lastCloudWeight: localWeight,
        lastSyncAt: new Date().toISOString(),
      });
      _syncLastCloudWeight = localWeight;
      _syncSetStatus('ok');
    } catch (err) {
      if (typeof _logError === 'function') _logError('sync:push', err);
      _syncSetStatus('err');
      const wait = SYNC_BACKOFF_MS[Math.min(_syncFailures, SYNC_BACKOFF_MS.length - 1)];
      _syncFailures++;
      if (_syncFailures <= SYNC_BACKOFF_MS.length) {
        clearTimeout(_syncTimer);
        _syncTimer = setTimeout(() => { _syncTimer = null; _syncPush(); }, wait);
      }
    } finally {
      _syncInFlight = null;
    }
  })();

  return _syncInFlight;
}

// Cancels the debounce and uploads now. Awaited before signing out and before
// pulling, so nothing unsent is lost.
async function syncFlushNow() {
  if (!CLOUD_AVAILABLE || !authIsLoggedIn()) return;
  clearTimeout(_syncTimer);
  _syncTimer = null;
  await _syncPush();
}

// ─── PULL ─────────────────────────────────────────────────────────────────────

async function _syncPull() {
  if (!CLOUD_AVAILABLE || !authIsLoggedIn()) return;

  _syncSetStatus('busy');
  try {
    const { data: row, error } = await sbClient
      .from('progress')
      .select('data, sentences, updated_at, sentences_updated_at')
      .eq('user_id', authUserId())
      .maybeSingle();
    if (error) throw error;

    const state = _syncState();

    // No row yet: this account's first device. Upload what we have.
    if (!row) {
      _syncSaveState({ userId: authUserId() });
      await _syncPush();
      return;
    }

    _syncLastCloudWeight = _progressWeight(row.data);

    // Already seen this exact server version — by far the common case, and it
    // costs one small query.
    if (row.updated_at === state.lastSeenServerAt) { _syncSetStatus('ok'); return; }

    // The cloud moved. Flush anything unsent first so a local change made while
    // offline isn't silently discarded by the incoming version.
    if (_syncFirstDirtyAt) await syncFlushNow();

    // Compare byte-for-byte rather than trusting timestamps: if nothing
    // actually differs there is no reason to apply or to reload. The old sync
    // reloaded on any timestamp difference.
    const incoming = row.data || {};
    let changed = false;
    for (const k of Object.keys(incoming)) {
      if (!SYNCED_KEYS.has(k)) continue;
      if (_lsGet(k) !== incoming[k]) { changed = true; break; }
    }
    const coldChanged = row.sentences_updated_at
      && row.sentences_updated_at !== state.lastSeenSentencesAt
      && typeof row.sentences === 'string'
      && _lsGet(SYNCED_COLD_KEY) !== row.sentences;

    if (!changed && !coldChanged) {
      _syncSaveState({
        lastSeenServerAt: row.updated_at,
        lastSeenSentencesAt: row.sentences_updated_at,
        lastCloudWeight: _syncLastCloudWeight,
        lastSyncAt: new Date().toISOString(),
      });
      _syncSetStatus('ok');
      return;
    }

    // Something genuinely differs and the cloud wins. Back up the local side
    // first — "newest wins" resolves silently, so this is the only trace of
    // what was replaced.
    await _syncBackupLocal('pull-overwrite');

    _syncApply(incoming, coldChanged ? row.sentences : undefined);
    _syncSaveState({
      userId: authUserId(),
      lastSeenServerAt: row.updated_at,
      lastSeenSentencesAt: row.sentences_updated_at,
      lastPushedHash: _syncHash(JSON.stringify(_syncCollect().data)),
      lastPushedColdHash: _syncHash(_lsGet(SYNCED_COLD_KEY)),
      lastCloudWeight: _syncLastCloudWeight,
      lastSyncAt: new Date().toISOString(),
    });

    // Reload rather than rehydrate in place: two of app.js's globals are set by
    // top-level IIFEs with no function to re-call, and several more are read
    // lazily. Pulls only happen at boot or on tab focus, never mid-exercise,
    // so this is never disruptive.
    try {
      sessionStorage.setItem('_sync_just_pulled', '1');
      sessionStorage.setItem('_sync_pulled_msg', 'Voortgang van je andere apparaat geladen ✓');
    } catch (e) {}
    location.reload();
  } catch (err) {
    if (typeof _logError === 'function') _logError('sync:pull', err);
    _syncSetStatus('err');
  }
}

async function syncPullNow() {
  _syncLastPullAt = Date.now();
  await _syncPull();
}

// ─── BACKUPS ──────────────────────────────────────────────────────────────────
// Silent, because the owner chose "newest wins" with no prompt. Nothing here
// asks a question; it just keeps a copy.

async function _syncBackupLocal(reason) {
  const { data, sentences } = _syncCollect();
  if (_progressWeight(data) === 0) return;   // nothing worth keeping

  try {
    localStorage.setItem(SYNC_BACKUP_KEY, JSON.stringify({
      at: new Date().toISOString(), reason, data, sentences,
    }));
  } catch (e) {}

  // First overwrite on this device also lands a real file in Downloads, using
  // the same Blob/anchor pattern as exportSentences().
  const state = _syncState();
  if (!state.downloadedBackup) {
    try {
      const blob = new Blob([JSON.stringify({ at: new Date().toISOString(), data, sentences }, null, 2)],
                            { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'schrijfcoach-backup-' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      URL.revokeObjectURL(url);
      _syncSaveState({ downloadedBackup: true });
    } catch (e) {}
  }
}

// ─── SESSION EVENTS ───────────────────────────────────────────────────────────

async function syncOnSignedIn() {
  const state = _syncState();
  // A different account on this device: none of the previous bookkeeping or
  // the one-shot backup flag applies to it.
  if (state.userId && state.userId !== authUserId()) _syncClearState();
  _syncSaveState({ userId: authUserId() });
  authRenderHeader();
  await syncPullNow();
}

function syncOnSignedOut() {
  clearTimeout(_syncTimer);
  _syncTimer = null;
  _syncFirstDirtyAt = 0;
  _syncLastCloudWeight = 0;
  _syncClearState();
  // Local progress is deliberately left alone.
}

// ─── TRIGGERS ─────────────────────────────────────────────────────────────────

document.addEventListener('visibilitychange', () => {
  if (!authIsLoggedIn()) return;
  if (document.visibilityState === 'hidden') {
    syncFlushNow();
  } else if (Date.now() - _syncLastPullAt > SYNC_PULL_THROTTLE_MS) {
    syncPullNow();
  }
});

// More reliable than visibilitychange when iOS Safari kills the tab.
window.addEventListener('pagehide', () => { if (authIsLoggedIn()) syncFlushNow(); });

window.addEventListener('online', () => {
  if (!authIsLoggedIn()) return;
  _syncFailures = 0;
  syncPullNow();
});
