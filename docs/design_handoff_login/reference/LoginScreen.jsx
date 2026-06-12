// Momentum — Login screen. window.MLogin
// Reuses the DS Button; fields mirror the DS Input token styling so the
// password field can carry a show/hide affordance. Theme + language
// switchers are functional (theme writes [data-theme] on <html>).
(function () {
  const Icon = window.MIcon;

  // ---- Localized copy ----------------------------------------------------
  const T = {
    en: {
      welcome: 'Welcome back', sub: 'Log in to keep your streak going.',
      email: 'Email', emailPh: 'you@example.com',
      password: 'Password', passwordPh: '••••••••',
      forgot: 'Forgot password?', login: 'Log in', or: 'or continue with',
      noAccount: "Don't have an account?", signup: 'Sign up', name: 'English',
    },
    es: {
      welcome: 'Bienvenido de nuevo', sub: 'Inicia sesión para mantener tu racha.',
      email: 'Correo', emailPh: 'tu@ejemplo.com',
      password: 'Contraseña', passwordPh: '••••••••',
      forgot: '¿Olvidaste tu contraseña?', login: 'Iniciar sesión', or: 'o continúa con',
      noAccount: '¿No tienes una cuenta?', signup: 'Regístrate', name: 'Español',
    },
    fr: {
      welcome: 'Bon retour', sub: 'Connectez-vous pour rester sur votre lancée.',
      email: 'E-mail', emailPh: 'vous@exemple.com',
      password: 'Mot de passe', passwordPh: '••••••••',
      forgot: 'Mot de passe oublié ?', login: 'Se connecter', or: 'ou continuer avec',
      noAccount: 'Pas encore de compte ?', signup: "S'inscrire", name: 'Français',
    },
  };
  const LANGS = [{ code: 'en', label: 'EN' }, { code: 'es', label: 'ES' }, { code: 'fr', label: 'FR' }];

  // ---- Brand glyphs for OAuth -------------------------------------------
  const GoogleG = (
    <svg width="19" height="19" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
  const AppleGlyph = (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.1-2.01-3.77-2.04-1.6-.16-3.13.94-3.94.94-.81 0-2.07-.92-3.4-.9-1.75.03-3.37 1.02-4.27 2.59-1.82 3.16-.47 7.84 1.31 10.41.87 1.26 1.91 2.67 3.27 2.62 1.31-.05 1.81-.85 3.4-.85 1.58 0 2.04.85 3.43.82 1.42-.03 2.31-1.28 3.18-2.55 1-1.46 1.41-2.88 1.43-2.95-.03-.01-2.74-1.05-2.77-4.17zM14.6 4.43c.72-.88 1.21-2.09 1.07-3.3-1.04.04-2.3.69-3.05 1.56-.67.78-1.26 2.02-1.1 3.21 1.16.09 2.35-.59 3.08-1.47z" />
    </svg>
  );

  // ---- Field: soft borderless filled well, focus halo (no border) -------
  function Field({ label, value, onChange, placeholder, type = 'text', iconLeft, trailing }) {
    const [focus, setFocus] = React.useState(false);
    return (
      <label style={{ display: 'block' }}>
        <span style={{ display: 'block', marginBottom: 9, fontFamily: 'var(--font-text)', fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.005em', color: 'var(--text-secondary)' }}>{label}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 11, height: 54, padding: '0 16px',
          background: 'var(--field)', borderRadius: 'var(--radius-lg)',
          boxShadow: focus ? '0 0 0 4px var(--accent-soft)' : 'none',
          transition: 'box-shadow var(--dur-fast) var(--ease-out)' }}>
          {iconLeft && <span style={{ display: 'inline-flex', color: focus ? 'var(--accent)' : 'var(--text-tertiary)', flex: 'none', transition: 'color var(--dur-fast) var(--ease-out)' }}>{iconLeft}</span>}
          <input style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', fontFamily: 'var(--font-text)', fontSize: 16, fontWeight: 500 }}
            type={type} value={value} onChange={onChange} placeholder={placeholder}
            onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} />
          {trailing}
        </span>
      </label>
    );
  }

  function OAuthButton({ glyph, label, onClick }) {
    const [hover, setHover] = React.useState(false);
    return (
      <button type="button" onClick={onClick}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, height: 54,
          background: hover ? 'var(--field-hover)' : 'var(--field)', border: 'none',
          borderRadius: 'var(--radius-lg)', cursor: 'pointer', color: 'var(--text-primary)',
          fontFamily: 'var(--font-text)', fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em',
          transition: 'background var(--dur-fast) var(--ease-out)' }}>
        {glyph}{label}
      </button>
    );
  }

  function ThemeSwitch({ theme, onChange }) {
    const isLight = theme === 'light';
    const seg = (active) => ({
      width: 36, height: 32, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', zIndex: 1, border: 'none', background: 'transparent', cursor: 'pointer',
      color: active ? 'var(--text-primary)' : 'var(--text-tertiary)', transition: 'color var(--dur-base) var(--ease-out)',
    });
    return (
      <div style={{ position: 'relative', display: 'inline-flex', padding: 4, gap: 0, borderRadius: 'var(--radius-pill)',
        background: 'var(--surface-2)', border: '1px solid var(--border-subtle)' }}>
        {/* sliding knob */}
        <span style={{ position: 'absolute', top: 4, left: isLight ? 4 : 40, width: 36, height: 32, borderRadius: 'var(--radius-pill)',
          background: 'var(--surface-1)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)',
          transition: 'left var(--dur-base) var(--ease-out)' }} />
        <button aria-label="Light theme" style={seg(isLight)} onClick={() => onChange('light')}><Icon name="sun" size={17} strokeWidth={2.25} /></button>
        <button aria-label="Dark theme" style={seg(!isLight)} onClick={() => onChange('dark')}><Icon name="moon" size={16} strokeWidth={2.25} /></button>
      </div>
    );
  }

  function LangSwitch({ lang, onChange }) {
    const [open, setOpen] = React.useState(false);
    const cur = LANGS.find((l) => l.code === lang) || LANGS[0];
    return (
      <div style={{ position: 'relative' }}>
        <button type="button" onClick={() => setOpen((o) => !o)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px',
            borderRadius: 'var(--radius-pill)', background: 'var(--surface-2)', border: '1px solid var(--border-subtle)',
            cursor: 'pointer', color: 'var(--text-primary)', fontFamily: 'var(--font-text)', fontSize: 14.5, fontWeight: 700 }}>
          <Icon name="globe" size={17} strokeWidth={2} color="var(--text-secondary)" />
          {cur.label}
          <Icon name="chevron-down" size={15} strokeWidth={2.25} color="var(--text-tertiary)" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--dur-base) var(--ease-out)' }} />
        </button>
        {open && (
          <React.Fragment>
            <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 30 }} />
            <div style={{ position: 'absolute', top: 48, left: 0, zIndex: 31, minWidth: 168, padding: 6,
              background: 'var(--surface-1)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)' }}>
              {LANGS.map((l) => {
                const active = l.code === lang;
                return (
                  <button key={l.code} type="button" onClick={() => { onChange(l.code); setOpen(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '9px 10px', textAlign: 'left',
                      background: active ? 'var(--accent-soft)' : 'transparent', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                      color: 'var(--text-primary)', fontFamily: 'var(--font-text)', fontSize: 14.5, fontWeight: active ? 700 : 500 }}>
                    <span style={{ fontFamily: 'var(--font-text)', fontSize: 13, fontWeight: 700, color: active ? 'var(--text-link)' : 'var(--text-tertiary)', width: 22 }}>{l.label}</span>
                    <span style={{ flex: 1 }}>{T[l.code].name}</span>
                    {active && <Icon name="check" size={16} strokeWidth={2.5} color="var(--text-link)" />}
                  </button>
                );
              })}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }

  function Login() {
    const NS = window.MomentumDesignSystem_7fc6e9;
    const { Button } = NS;
    const [theme, setTheme] = React.useState(() => document.documentElement.getAttribute('data-theme') || 'light');
    const [lang, setLang] = React.useState('en');
    const [showPw, setShowPw] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [pw, setPw] = React.useState('');
    const t = T[lang];

    React.useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', padding: '4px 26px 26px' }}>
        {/* Switchers */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6 }}>
          <LangSwitch lang={lang} onChange={setLang} />
          <ThemeSwitch theme={theme} onChange={setTheme} />
        </div>

        {/* Brand + intro */}
        <div style={{ flex: '0 0 auto', marginTop: 38 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <img src="../../assets/momentum-icon-noring-volt.png" alt="Momentum" width="54" height="54" style={{ display: 'block', borderRadius: 15 }} />
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 25, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--text-primary)' }}>Momentum</span>
          </div>
          <h1 style={{ margin: '30px 0 0', fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--text-primary)' }}>{t.welcome}</h1>
          <p style={{ margin: '9px 0 0', fontSize: 15.5, lineHeight: 1.4, color: 'var(--text-secondary)', maxWidth: 320 }}>{t.sub}</p>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28 }}>
          <Field label={t.email} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPh} type="email"
            iconLeft={<Icon name="mail" size={18} />} />
          <div>
            <Field label={t.password} value={pw} onChange={(e) => setPw(e.target.value)} placeholder={t.passwordPh}
              type={showPw ? 'text' : 'password'} iconLeft={<Icon name="lock" size={18} />}
              trailing={
                <button type="button" aria-label="Toggle password" onClick={() => setShowPw((s) => !s)}
                  style={{ display: 'inline-flex', flex: 'none', border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--text-tertiary)', padding: 2 }}>
                  <Icon name={showPw ? 'eye-off' : 'eye'} size={18} />
                </button>
              } />
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-link)', textDecoration: 'none', whiteSpace: 'nowrap' }}>{t.forgot}</a>
            </div>
          </div>

          <Button variant="primary" size="lg" fullWidth iconRight={<Icon name="arrow-right" size={19} strokeWidth={2.5} />} style={{ marginTop: 2, borderRadius: 'var(--radius-lg)', fontWeight: 800 }}>{t.login}</Button>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '26px 0 18px' }}>
          <span style={{ flex: 1, height: 1, background: 'var(--divider)' }} />
          <span style={{ fontFamily: 'var(--font-text)', fontSize: 13.5, fontWeight: 500, color: 'var(--text-tertiary)', whiteSpace: 'nowrap' }}>{t.or}</span>
          <span style={{ flex: 1, height: 1, background: 'var(--divider)' }} />
        </div>

        {/* OAuth */}
        <div style={{ display: 'flex', gap: 12 }}>
          <OAuthButton glyph={GoogleG} label="Google" onClick={() => {}} />
          <OAuthButton glyph={AppleGlyph} label="Apple" onClick={() => {}} />
        </div>

        {/* Sign up */}
        <div style={{ marginTop: 'auto', paddingTop: 28, textAlign: 'center', fontSize: 14.5, color: 'var(--text-secondary)' }}>
          {t.noAccount}{' '}
          <a href="#" onClick={(e) => e.preventDefault()} style={{ fontWeight: 800, color: 'var(--text-link)', textDecoration: 'none' }}>{t.signup}</a>
        </div>
      </div>
    );
  }

  window.MLogin = Login;
})();
