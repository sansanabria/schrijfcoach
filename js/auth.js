// ─── ACCOUNT / SUPABASE AUTH ──────────────────────────────────────────────────
//
// Replaces the old GitHub-Gist sync (js/sync.js), which needed a personal access
// token pasted on every device and stored it in cleartext.
//
// Loads AFTER js/app.js, so showToast/_lsGet/_lsSet and the DOM all exist by the
// time anything here runs.

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// Paste the two values from Supabase → Project Settings → API here.
// The anon key is PUBLIC BY DESIGN and is meant to be committed: it only says
// "an anonymous visitor of this project", and every request it makes is checked
// against the row-level security policies, which allow touching only the row
// matching the logged-in user id. Never put the service_role / secret key here.
const SUPABASE_URL      = '';
const SUPABASE_ANON_KEY = '';

// ─── AVAILABILITY GUARD ───────────────────────────────────────────────────────
// The SDK comes from a CDN, which can fail: offline, hotel wifi, an ad blocker,
// or opening index.html straight from disk. Everything in this file no-ops when
// that happens — the app itself must keep working exactly as it does offline.
const CLOUD_CONFIGURED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
const CLOUD_AVAILABLE  = CLOUD_CONFIGURED
  && typeof window.supabase !== 'undefined'
  && typeof window.supabase.createClient === 'function';

// ─── ONE-TIME CLEANUP OF THE OLD GIST SYNC ────────────────────────────────────
// The old token key held a live GitHub personal access token in plain text.
// Removing it here does NOT revoke it — that has to be done at
// github.com/settings/tokens.
(function _authMigrateFromGistSync() {
  let hadToken = false;
  try { hadToken = localStorage.getItem('schrijfcoach_sync_token') !== null; } catch (e) { return; }
  if (!hadToken) return;

  ['schrijfcoach_sync_token', 'schrijfcoach_sync_gist_id', 'schrijfcoach_sync_updated_at']
    .forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
  try { sessionStorage.removeItem('_sync_just_pulled'); } catch (e) {}

  // The render cascade at the end of app.js is still settling; let it finish
  // before stealing the toast.
  setTimeout(() => {
    if (typeof showToast === 'function') {
      showToast('Synchronisatie is vernieuwd — log in met de knop rechtsboven.');
    }
  }, 1200);
})();

// ─── HEADER ───────────────────────────────────────────────────────────────────
// States: 'off' (logged out), 'busy' (syncing), 'ok' (synced), 'err' (failed).
// Reuses the .sync-btn CSS the old sync icon used, including the spin animation.
function authRenderHeader() {
  const btn = document.getElementById('account-btn');
  if (!btn) return;

  if (!CLOUD_AVAILABLE) {
    btn.dataset.status = 'off';
    btn.disabled = true;
    btn.title = CLOUD_CONFIGURED
      ? 'Synchronisatie niet beschikbaar (geen verbinding)'
      : 'Synchronisatie wordt nog ingesteld';
    return;
  }

  btn.disabled = false;
  btn.dataset.status = 'off';
  btn.title = 'Inloggen om te synchroniseren';
}

function authOpenPanel() {
  if (!CLOUD_AVAILABLE) return;
}

authRenderHeader();
