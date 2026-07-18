// ─── GITHUB GIST SYNC ─────────────────────────────────────────────────────────

const _SYNC_TOKEN_KEY   = 'schrijfcoach_sync_token';
const _SYNC_GIST_KEY    = 'schrijfcoach_sync_gist_id';
const _SYNC_UPDATED_KEY = 'schrijfcoach_sync_updated_at';

const _SYNC_LS_KEYS = [
  'schrijfcoach_stats',
  'schrijfcoach_srs',
  'schrijfcoach_flags',
  'schrijfcoach_grammar_read',
  'schrijfcoach_unit_progress',
  'schrijfcoach_unit_progress_schema',
  'schrijfcoach_last_position',
  'schrijfcoach_reading_history',
  'schrijfcoach_unknown_words',
  'schrijfcoach_progress',
  'schrijfcoach_sentences',
];

let _syncTimer = null;

function _syncToken()  { return localStorage.getItem(_SYNC_TOKEN_KEY) || ''; }
function _syncGistId() { return localStorage.getItem(_SYNC_GIST_KEY)  || ''; }

function _syncCollect() {
  const obj = { _at: new Date().toISOString() };
  _SYNC_LS_KEYS.forEach(k => {
    const v = localStorage.getItem(k);
    if (v !== null) obj[k] = v;
  });
  return obj;
}

function _syncApply(obj) {
  _SYNC_LS_KEYS.forEach(k => {
    if (obj[k] !== undefined) localStorage.setItem(k, obj[k]);
  });
}

function _syncSetStatus(s) {
  const el = document.getElementById('sync-icon');
  if (!el) return;
  el.dataset.status = s;
  const labels = {
    ok:   'Gesynchroniseerd ✓',
    busy: 'Synchroniseren…',
    err:  'Sync mislukt — tik om opnieuw te proberen',
    off:  'Sync instellen',
  };
  el.title = labels[s] || '';
}

async function _syncPush() {
  const token = _syncToken();
  if (!token) return;
  const gistId = _syncGistId();
  const content = JSON.stringify(_syncCollect());

  try {
    _syncSetStatus('busy');

    if (!gistId) {
      const r = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: { Authorization: 'token ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description: 'Schrijfcoach voortgang',
          public: false,
          files: { 'schrijfcoach.json': { content } },
        }),
      });
      if (!r.ok) throw new Error(r.status);
      const g = await r.json();
      localStorage.setItem(_SYNC_GIST_KEY, g.id);
    } else {
      const r = await fetch('https://api.github.com/gists/' + gistId, {
        method: 'PATCH',
        headers: { Authorization: 'token ' + token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: { 'schrijfcoach.json': { content } } }),
      });
      if (!r.ok) throw new Error(r.status);
    }

    localStorage.setItem(_SYNC_UPDATED_KEY, new Date().toISOString());
    _syncSetStatus('ok');
  } catch (e) {
    _syncSetStatus('err');
  }
}

// Called after any data change — debounced 4 seconds so rapid exercise
// answers only trigger one network request.
function syncSchedulePush() {
  if (!_syncToken()) return;
  _syncSetStatus('busy');
  clearTimeout(_syncTimer);
  _syncTimer = setTimeout(_syncPush, 4000);
}

async function _syncOnLoad() {
  const token  = _syncToken();
  const gistId = _syncGistId();

  if (!token)  { _syncSetStatus('off'); return; }
  if (!gistId) { _syncSetStatus('off'); return; }

  // Prevent reload loop: if we just reloaded after a pull, skip this pull.
  if (sessionStorage.getItem('_sync_just_pulled')) {
    sessionStorage.removeItem('_sync_just_pulled');
    _syncSetStatus('ok');
    return;
  }

  try {
    _syncSetStatus('busy');
    const r = await fetch('https://api.github.com/gists/' + gistId, {
      headers: { Authorization: 'token ' + token },
    });
    if (!r.ok) { _syncSetStatus('err'); return; }

    const g   = await r.json();
    const raw = g.files['schrijfcoach.json']?.content;
    if (!raw) { _syncSetStatus('ok'); return; }

    const cloud   = JSON.parse(raw);
    const localAt = localStorage.getItem(_SYNC_UPDATED_KEY) || '0';

    if (cloud._at > localAt) {
      _syncApply(cloud);
      localStorage.setItem(_SYNC_UPDATED_KEY, cloud._at);
      sessionStorage.setItem('_sync_just_pulled', '1');
      location.reload();
      return;
    }
    _syncSetStatus('ok');
  } catch (e) {
    _syncSetStatus('err');
  }
}

function syncShowSetup() {
  const existing = _syncToken();
  const msg = existing
    ? 'Sync is actief ✓\n\nVoer een nieuw token in om te wijzigen.\nLaat leeg + OK om sync uit te schakelen.'
    : 'Voer je GitHub Personal Access Token in:\n\n1. Ga naar github.com → Settings\n2. Developer settings → Personal access tokens → Tokens (classic)\n3. Generate new token → selecteer alleen "gist" → kopieer';

  const input = prompt(msg, '');
  if (input === null) return;

  if (input.trim() === '') {
    if (!existing) return;
    if (confirm('Sync uitschakelen?')) {
      localStorage.removeItem(_SYNC_TOKEN_KEY);
      localStorage.removeItem(_SYNC_GIST_KEY);
      _syncSetStatus('off');
    }
    return;
  }

  localStorage.setItem(_SYNC_TOKEN_KEY, input.trim());
  localStorage.removeItem(_SYNC_GIST_KEY);
  _syncPush().then(() => {
    if (typeof showToast === 'function') {
      showToast('✓ Sync ingesteld! Voortgang wordt automatisch gesynchroniseerd.');
    }
  });
}

// Push immediately when the user leaves the page / switches apps on mobile.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && _syncToken()) {
    clearTimeout(_syncTimer);
    _syncPush();
  }
});

_syncOnLoad();
