// ─── SUPABASE AUTH (e-mail + wachtwoord) ──────────────────────────────────────
// Sign-in only. This file deliberately does NOT read or write any
// schrijfcoach_* progress data — that lives in js/supabase-sync.js.
// Signed-out users are unaffected: the app keeps running on localStorage alone.

let _sb = null;          // Supabase client, created lazily
let _sbUserObj = null;   // current user object, or null when signed out

function sbClient() {
  if (_sb) return _sb;
  if (typeof supabase === 'undefined' || typeof SUPABASE_URL === 'undefined') return null;
  _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,       // stay logged in across reloads
      autoRefreshToken: true,     // refresh silently before expiry
      detectSessionInUrl: false,  // no magic-link redirects to consume
    },
  });
  return _sb;
}

function sbUser() { return _sbUserObj; }

function _sbSetStatus(s, label) {
  const el = document.getElementById('account-icon');
  if (!el) return;
  el.dataset.status = s;
  el.title = label;
  el.setAttribute('aria-label', label);
}

function _sbReflect(user) {
  _sbUserObj = user || null;
  if (_sbUserObj) _sbSetStatus('ok', 'Ingelogd als ' + _sbUserObj.email + ' — tik om uit te loggen');
  else            _sbSetStatus('off', 'Inloggen om voortgang te synchroniseren');
}

// ─── login dialog ─────────────────────────────────────────────────────────────

function _sbCloseDialog() {
  const d = document.getElementById('auth-overlay');
  if (d) d.remove();
}

function _sbDialogError(msg) {
  const el = document.getElementById('auth-error');
  if (el) { el.textContent = msg; el.hidden = false; }
}

function _sbOpenDialog() {
  _sbCloseDialog();
  const wrap = document.createElement('div');
  wrap.id = 'auth-overlay';
  wrap.className = 'auth-overlay';
  wrap.innerHTML = `
    <div class="auth-box" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <h2 id="auth-title">Inloggen</h2>
      <p class="auth-sub">Log in om je voortgang op al je apparaten te bewaren.</p>
      <label class="auth-label" for="auth-email">E-mailadres</label>
      <input class="auth-input" id="auth-email" type="email" autocomplete="username" placeholder="jij@voorbeeld.nl">
      <label class="auth-label" for="auth-pass">Wachtwoord</label>
      <input class="auth-input" id="auth-pass" type="password" autocomplete="current-password" placeholder="Minimaal 6 tekens">
      <p class="auth-error" id="auth-error" hidden></p>
      <div class="auth-actions">
        <button class="auth-btn auth-btn-primary" id="auth-login">Inloggen</button>
        <button class="auth-btn" id="auth-signup">Account aanmaken</button>
      </div>
      <button class="auth-close" id="auth-cancel" aria-label="Sluiten">Annuleren</button>
    </div>`;
  document.body.appendChild(wrap);

  document.getElementById('auth-login').onclick  = () => _sbSubmit('login');
  document.getElementById('auth-signup').onclick = () => _sbSubmit('signup');
  document.getElementById('auth-cancel').onclick = _sbCloseDialog;
  wrap.onclick = e => { if (e.target === wrap) _sbCloseDialog(); };
  document.getElementById('auth-pass').onkeydown = e => { if (e.key === 'Enter') _sbSubmit('login'); };
  document.getElementById('auth-email').focus();
}

async function _sbSubmit(mode) {
  const client = sbClient();
  if (!client) { _sbDialogError('Supabase kon niet geladen worden. Ben je offline?'); return; }

  const email = (document.getElementById('auth-email').value || '').trim();
  const pass  = document.getElementById('auth-pass').value || '';
  if (!email) { _sbDialogError('Vul je e-mailadres in.'); return; }
  if (pass.length < 6) { _sbDialogError('Wachtwoord moet minimaal 6 tekens zijn.'); return; }

  _sbSetStatus('busy', 'Bezig…');
  const { data, error } = mode === 'signup'
    ? await client.auth.signUp({ email, password: pass })
    : await client.auth.signInWithPassword({ email, password: pass });

  if (error) {
    _sbSetStatus('err', 'Inloggen mislukt');
    const m = error.message || '';
    if (/invalid login credentials/i.test(m)) {
      _sbDialogError('E-mail of wachtwoord klopt niet. Nog geen account? Kies "Account aanmaken".');
    } else if (/already registered|already exists/i.test(m)) {
      _sbDialogError('Dit e-mailadres bestaat al. Kies "Inloggen".');
    } else {
      _sbDialogError(m);
    }
    return;
  }

  // Sign-up with e-mail confirmation on returns a user but no session.
  if (mode === 'signup' && !data.session) {
    _sbCloseDialog();
    _sbSetStatus('off', 'Bevestig je e-mail om in te loggen');
    alert('Account aangemaakt!\n\nBevestig eerst je e-mailadres via de link die we\nzojuist hebben gestuurd, en log daarna in.');
    return;
  }

  _sbCloseDialog();
  _sbReflect(data.user);
}

// Tap the header icon: open the dialog, or sign out when already signed in.
async function sbShowAuth() {
  const client = sbClient();
  if (!client) { alert('Supabase kon niet geladen worden. Ben je offline?'); return; }

  if (_sbUserObj) {
    if (!confirm('Uitloggen als ' + _sbUserObj.email + '?\n\nJe voortgang blijft op dit apparaat staan.')) return;
    await client.auth.signOut();
    _sbReflect(null);
    if (typeof showToast === 'function') showToast('Uitgelogd.');
    return;
  }
  _sbOpenDialog();
}

// Restore any existing session on load, and react to sign-in / sign-out.
async function _sbInit() {
  const client = sbClient();
  if (!client) return;
  const { data } = await client.auth.getSession();
  _sbReflect(data.session ? data.session.user : null);
  client.auth.onAuthStateChange((event, session) => {
    _sbReflect(session ? session.user : null);
    if (event === 'SIGNED_IN' && typeof showToast === 'function') {
      showToast('✓ Ingelogd als ' + session.user.email);
    }
  });
}

_sbInit();
