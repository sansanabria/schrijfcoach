// ─── ACCOUNT / SUPABASE AUTH ──────────────────────────────────────────────────
//
// Replaces the old GitHub-Gist sync (js/sync.js), which needed a personal access
// token pasted on every device and kept it in cleartext.
//
// Loads AFTER js/app.js, so showToast/_lsGet/_lsSet/escapeHtml and the DOM all
// exist by the time anything here runs. js/cloud-sync.js loads after this file
// and reads sbClient + authIsLoggedIn() from here.

// ─── CONFIG ───────────────────────────────────────────────────────────────────
// From Supabase → Project Settings → API.
//
// The anon key is PUBLIC BY DESIGN and is meant to live here in the source. It
// is not a password: it only identifies "an anonymous visitor of this project",
// and every request it makes is evaluated against the row-level security
// policies in supabase/schema.sql, which permit touching only the row whose
// user_id matches the logged-in user. An anonymous visitor has no user id, so
// it can read and write nothing.
//
// NEVER put the service_role / secret key here — that one bypasses RLS entirely.
const SUPABASE_URL      = '';
const SUPABASE_ANON_KEY = '';

// Namespaced so the session sits alongside the app's other keys instead of
// under supabase-js's default name.
const AUTH_STORAGE_KEY = 'schrijfcoach_auth';

// ─── AVAILABILITY GUARD ───────────────────────────────────────────────────────
// The SDK comes from a CDN, which can fail: offline, hotel wifi, an ad blocker,
// an SRI mismatch, or index.html opened straight from disk. Everything here
// no-ops when that happens — the app itself must keep working exactly as it
// does offline, with nothing gated behind an account.
const CLOUD_CONFIGURED = !!(SUPABASE_URL && SUPABASE_ANON_KEY);
const CLOUD_AVAILABLE  = CLOUD_CONFIGURED
  && typeof window.supabase !== 'undefined'
  && typeof window.supabase.createClient === 'function';

// OAuth needs an origin Supabase can whitelist, and file:// has none. Email and
// password still work there; only the Google button is hidden.
const AUTH_CAN_USE_OAUTH = location.protocol !== 'file:';

// Named sbClient, never `supabase` — the UMD build's global is literally
// `supabase`, so shadowing it here would be a TDZ error that kills this file.
const sbClient = CLOUD_AVAILABLE
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storageKey: AUTH_STORAGE_KEY,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,   // consumes ?code=… on the OAuth return and tidies the URL
        flowType: 'pkce',
      },
    })
  : null;

let _authUser = null;

function authIsLoggedIn() { return !!_authUser; }
function authUserId()     { return _authUser ? _authUser.id : null; }
function authUserEmail()  { return _authUser ? (_authUser.email || '') : ''; }

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
// Reuses the .sync-btn CSS the old sync icon used, including its data-status
// colours and the spin animation.
function authRenderHeader() {
  const btn = document.getElementById('account-btn');
  if (!btn) return;
  const icon = document.getElementById('account-icon');

  if (!CLOUD_AVAILABLE) {
    btn.dataset.status = 'off';
    btn.disabled = true;
    btn.title = CLOUD_CONFIGURED
      ? 'Synchronisatie niet beschikbaar (geen verbinding)'
      : 'Synchronisatie wordt nog ingesteld';
    authSetSyncStatusText('');
    return;
  }

  btn.disabled = false;
  if (authIsLoggedIn()) {
    if (icon) icon.setAttribute('href', '#i-sync');
    btn.title = 'Ingelogd als ' + authUserEmail();
    // data-status is owned by cloud-sync.js from here on (ok / busy / err).
    if (!btn.dataset.status || btn.dataset.status === 'off') btn.dataset.status = 'ok';
  } else {
    if (icon) icon.setAttribute('href', '#i-user');
    btn.dataset.status = 'off';
    btn.title = 'Inloggen om te synchroniseren';
    authSetSyncStatusText('');
  }
}

function authSetSyncStatusText(text) {
  const el = document.getElementById('sync-status');
  if (el) el.textContent = text || '';
}

// ─── MODAL ────────────────────────────────────────────────────────────────────
// One element, three modes: 'login', 'account', 'recovery'.

let _authMode = 'login';
let _authBusy = false;

function authOpenPanel() {
  if (!CLOUD_AVAILABLE) return;
  authOpenModal(authIsLoggedIn() ? 'account' : 'login');
}

function authOpenModal(mode) {
  _authMode = mode || 'login';
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  authRenderModal();
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  const first = modal.querySelector('input, button:not(.modal-close)');
  if (first) setTimeout(() => first.focus(), 30);
}

function authCloseModal() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  // A recovery link is the only way to set a new password; closing without
  // setting one would strand the user on a normal screen.
  if (_authMode === 'recovery') return;
  modal.hidden = true;
  document.body.style.overflow = '';
  const btn = document.getElementById('account-btn');
  if (btn) btn.focus();
}

function authRenderModal() {
  const title = document.getElementById('auth-title');
  const body  = document.getElementById('auth-body');
  if (!title || !body) return;

  if (_authMode === 'account')  { title.textContent = 'Account';           body.innerHTML = _authAccountHtml();  }
  else if (_authMode === 'recovery') { title.textContent = 'Nieuw wachtwoord'; body.innerHTML = _authRecoveryHtml(); }
  else                          { title.textContent = 'Inloggen';          body.innerHTML = _authLoginHtml();    }
}

function _authLoginHtml() {
  const google = AUTH_CAN_USE_OAUTH ? `
    <button type="button" class="btn-google" onclick="authSignInGoogle()">
      <svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-google"/></svg>
      Doorgaan met Google
    </button>
    <div class="auth-divider"><span>of</span></div>` : '';

  return `
    ${google}
    <form onsubmit="authSubmit(event)" novalidate>
      <label class="auth-label" for="auth-email">E-mailadres</label>
      <input class="exercise-input" type="email" id="auth-email" autocomplete="email"
             placeholder="jij@voorbeeld.nl" required />
      <label class="auth-label" for="auth-password">Wachtwoord</label>
      <input class="exercise-input" type="password" id="auth-password"
             autocomplete="current-password" minlength="8" required />
      <div class="auth-error" id="auth-error" role="alert" hidden></div>
      <button type="submit" class="save-btn auth-submit" id="auth-submit-btn">Inloggen</button>
    </form>
    <button type="button" class="auth-link" onclick="authForgotPassword()">Wachtwoord vergeten?</button>
    <p class="auth-note">Nog geen account? Accounts worden op uitnodiging aangemaakt.</p>`;
}

function _authRecoveryHtml() {
  return `
    <p class="auth-note">Kies een nieuw wachtwoord (minstens 8 tekens).</p>
    <form onsubmit="authSubmitNewPassword(event)" novalidate>
      <label class="auth-label" for="auth-new-password">Nieuw wachtwoord</label>
      <input class="exercise-input" type="password" id="auth-new-password"
             autocomplete="new-password" minlength="8" required />
      <div class="auth-error" id="auth-error" role="alert" hidden></div>
      <button type="submit" class="save-btn auth-submit">Wachtwoord opslaan</button>
    </form>`;
}

function _authAccountHtml() {
  const last = (typeof syncLastSyncLabel === 'function') ? syncLastSyncLabel() : '';
  return `
    <p class="auth-account-email">${escapeHtml(authUserEmail())}</p>
    <p class="auth-note" id="auth-sync-line">${escapeHtml(last)}</p>
    <div class="auth-error" id="auth-error" role="alert" hidden></div>
    <button type="button" class="save-btn auth-submit" onclick="authSyncNow()">Nu synchroniseren</button>
    <button type="button" class="ex-mode-btn auth-secondary" onclick="authSignOut()">Uitloggen</button>
    <button type="button" class="auth-link auth-danger" onclick="authSignOutAndWipe()">
      Uitloggen en dit apparaat wissen
    </button>`;
}

function authShowError(msg) {
  const el = document.getElementById('auth-error');
  if (!el) return;
  el.textContent = msg;
  el.hidden = !msg;
}

// Supabase speaks English; the app speaks Dutch.
function _authErrorText(err) {
  const raw = (err && (err.message || err.error_description || '')) || '';
  const m = raw.toLowerCase();
  if (m.includes('invalid login credentials'))  return 'E-mailadres of wachtwoord klopt niet.';
  if (m.includes('email not confirmed'))        return 'Bevestig eerst je e-mailadres — kijk in je inbox (en je spam).';
  if (m.includes('user already registered'))    return 'Er bestaat al een account met dit adres. Log in.';
  if (m.includes('password should be at least'))return 'Je wachtwoord moet minstens 8 tekens hebben.';
  if (m.includes('signups not allowed') || m.includes('signup is disabled'))
    return 'Nieuwe accounts gaan op uitnodiging. Vraag om een uitnodiging.';
  if (m.includes('rate limit') || (err && err.status === 429))
    return 'Te veel pogingen. Wacht een minuut en probeer het opnieuw.';
  if (m.includes('failed to fetch') || m.includes('networkerror') || !navigator.onLine)
    return 'Geen verbinding. Je kunt gewoon verder oefenen — je voortgang blijft op dit apparaat.';
  if (typeof _logError === 'function') _logError('auth', err);
  return 'Er ging iets mis. Probeer het opnieuw.';
}

// ─── AUTH ACTIONS ─────────────────────────────────────────────────────────────

function _authSetBusy(on, label) {
  _authBusy = on;
  const btn = document.getElementById('auth-submit-btn');
  if (btn) { btn.disabled = on; btn.textContent = on ? (label || 'Bezig…') : 'Inloggen'; }
}

async function authSubmit(e) {
  e.preventDefault();
  if (!CLOUD_AVAILABLE || _authBusy) return;
  const email    = (document.getElementById('auth-email')    || {}).value || '';
  const password = (document.getElementById('auth-password') || {}).value || '';
  if (!email.trim() || !password) { authShowError('Vul je e-mailadres en wachtwoord in.'); return; }

  authShowError('');
  _authSetBusy(true, 'Inloggen…');
  try {
    const { error } = await sbClient.auth.signInWithPassword({ email: email.trim(), password });
    if (error) { authShowError(_authErrorText(error)); return; }
    authCloseModal();
    showToast('✓ Ingelogd');
  } catch (err) {
    authShowError(_authErrorText(err));
  } finally {
    _authSetBusy(false);
  }
}

async function authSignInGoogle() {
  if (!CLOUD_AVAILABLE || !AUTH_CAN_USE_OAUTH) return;
  authShowError('');
  try {
    const { error } = await sbClient.auth.signInWithOAuth({
      provider: 'google',
      // origin + pathname so it works both at the site root and at /index.html;
      // both are whitelisted in Supabase's redirect URLs.
      options: { redirectTo: location.origin + location.pathname },
    });
    if (error) authShowError(_authErrorText(error));
  } catch (err) {
    authShowError(_authErrorText(err));
  }
}

async function authForgotPassword() {
  if (!CLOUD_AVAILABLE) return;
  const email = ((document.getElementById('auth-email') || {}).value || '').trim();
  if (!email) { authShowError('Vul eerst je e-mailadres in.'); return; }
  authShowError('');
  try {
    await sbClient.auth.resetPasswordForEmail(email, {
      redirectTo: location.origin + location.pathname,
    });
  } catch (err) {
    if (typeof _logError === 'function') _logError('auth:reset', err);
  }
  // Deliberately vague whether the address exists — confirming it would leak
  // which addresses have accounts.
  showToast('Als dit adres bekend is, sturen we een link.');
  authCloseModal();
}

async function authSubmitNewPassword(e) {
  e.preventDefault();
  if (!CLOUD_AVAILABLE) return;
  const pw = (document.getElementById('auth-new-password') || {}).value || '';
  if (pw.length < 8) { authShowError('Je wachtwoord moet minstens 8 tekens hebben.'); return; }
  authShowError('');
  try {
    const { error } = await sbClient.auth.updateUser({ password: pw });
    if (error) { authShowError(_authErrorText(error)); return; }
    _authMode = 'account';
    authCloseModal();
    showToast('✓ Wachtwoord opgeslagen');
  } catch (err) {
    authShowError(_authErrorText(err));
  }
}

async function authSyncNow() {
  if (typeof syncFlushNow === 'function') await syncFlushNow();
  if (typeof syncPullNow  === 'function') await syncPullNow();
  const line = document.getElementById('auth-sync-line');
  if (line && typeof syncLastSyncLabel === 'function') line.textContent = syncLastSyncLabel();
}

async function authSignOut() {
  if (!CLOUD_AVAILABLE) return;
  // Anything unsent would otherwise be lost the moment the session goes.
  if (typeof syncFlushNow === 'function') await syncFlushNow();
  try { await sbClient.auth.signOut(); } catch (err) { if (typeof _logError === 'function') _logError('auth:signout', err); }
  authCloseModal();
  // Local progress deliberately stays: wiping it on logout looks exactly like
  // data loss to someone logging out on their own laptop.
  showToast('Uitgelogd. Je voortgang blijft op dit apparaat.');
}

async function authSignOutAndWipe() {
  if (!CLOUD_AVAILABLE) return;
  if (!confirm('Alles op dit apparaat wissen?\n\nJe voortgang blijft in de cloud staan en komt terug als je opnieuw inlogt. Alles wat nog niet gesynchroniseerd is, gaat verloren.')) return;
  if (typeof syncFlushNow === 'function') await syncFlushNow();
  try { await sbClient.auth.signOut(); } catch (e) {}
  try {
    Object.keys(localStorage)
      .filter(k => k.indexOf('schrijfcoach_') === 0)
      .forEach(k => localStorage.removeItem(k));
  } catch (e) {}
  location.reload();
}

// ─── SESSION WIRING ───────────────────────────────────────────────────────────

if (CLOUD_AVAILABLE) {
  sbClient.auth.onAuthStateChange((event, session) => {
    _authUser = session ? session.user : null;
    authRenderHeader();

    if (event === 'PASSWORD_RECOVERY') {
      authOpenModal('recovery');
      return;
    }

    if (event === 'SIGNED_OUT') {
      if (typeof syncOnSignedOut === 'function') syncOnSignedOut();
      return;
    }

    // INITIAL_SESSION (page load with a stored session), SIGNED_IN (fresh login
    // or the OAuth return), TOKEN_REFRESHED.
    if (_authUser && typeof syncOnSignedIn === 'function') syncOnSignedIn();
  });
}

// Esc closes the modal (except in recovery mode, which must be completed).
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const modal = document.getElementById('auth-modal');
  if (modal && !modal.hidden) authCloseModal();
});

authRenderHeader();

// A pull that changed local data ends in location.reload(), which destroys any
// toast; cloud-sync.js leaves the message here for us to show afterwards.
(function _authShowPostReloadMessage() {
  let msg = null;
  try {
    msg = sessionStorage.getItem('_sync_pulled_msg');
    if (msg) sessionStorage.removeItem('_sync_pulled_msg');
  } catch (e) { return; }
  if (msg) setTimeout(() => { if (typeof showToast === 'function') showToast(msg); }, 900);
})();
