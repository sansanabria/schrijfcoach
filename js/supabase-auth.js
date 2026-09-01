// ─── SUPABASE AUTH (magic link) ───────────────────────────────────────────────
// Phase 3: sign-in only. This file deliberately does NOT read or write any
// schrijfcoach_* progress data — that arrives in the sync layer (Phase 4).
// Signed-out users are unaffected: the app keeps running on localStorage alone.

let _sb = null;          // Supabase client, created lazily
let _sbUser = null;      // current user object, or null when signed out

function sbClient() {
  if (_sb) return _sb;
  if (typeof supabase === 'undefined' || typeof SUPABASE_URL === 'undefined') return null;
  _sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,        // keep the session across reloads
      autoRefreshToken: true,      // refresh before expiry
      detectSessionInUrl: true,    // consume the #access_token from the magic link
    },
  });
  return _sb;
}

function sbUser() { return _sbUser; }

function _sbSetStatus(s, label) {
  const el = document.getElementById('account-icon');
  if (!el) return;
  el.dataset.status = s;
  el.title = label;
  el.setAttribute('aria-label', label);
}

function _sbReflect(user) {
  _sbUser = user || null;
  if (_sbUser) _sbSetStatus('ok', 'Ingelogd als ' + _sbUser.email + ' — tik om uit te loggen');
  else         _sbSetStatus('off', 'Inloggen om voortgang te synchroniseren');
}

// Send a magic link, or sign out when already signed in.
async function sbShowAuth() {
  const client = sbClient();
  if (!client) { alert('Supabase kon niet geladen worden. Ben je offline?'); return; }

  if (_sbUser) {
    if (!confirm('Uitloggen als ' + _sbUser.email + '?\n\nJe voortgang blijft op dit apparaat staan.')) return;
    await client.auth.signOut();
    _sbReflect(null);
    if (typeof showToast === 'function') showToast('Uitgelogd.');
    return;
  }

  const email = prompt(
    'Vul je e-mailadres in.\n\n' +
    'Je krijgt een inloglink toegestuurd — geen wachtwoord nodig.',
    ''
  );
  if (email === null) return;
  if (!email.trim()) return;

  _sbSetStatus('busy', 'Inloglink versturen…');
  const { error } = await client.auth.signInWithOtp({
    email: email.trim(),
    options: { emailRedirectTo: window.location.origin },
  });

  if (error) {
    _sbSetStatus('err', 'Inloggen mislukt — tik om opnieuw te proberen');
    alert('Inloggen mislukt:\n\n' + error.message);
    return;
  }

  _sbSetStatus('off', 'Controleer je e-mail voor de inloglink');
  alert('Check je e-mail!\n\nTik op de link in het bericht om in te loggen.\nDe link is 1 uur geldig.');
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
