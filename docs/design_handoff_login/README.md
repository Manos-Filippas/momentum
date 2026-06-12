# Handoff: Momentum — Login screen & Volt ambient background

## Overview
A mobile login screen for the **Momentum** fitness app, plus the reusable **Volt
ambient background** that sits behind it. The screen supports **light and dark themes**
and **three languages (EN / ES / FR)**, both switchable live from the top of the screen.

## About the design files
The files in `reference/` are **design references created in HTML/React** — a working
prototype showing the intended look and behavior. They are **not** production code to ship
as-is. Your task is to **recreate these designs in this codebase's existing environment**
(React Native, SwiftUI, Flutter, web, etc.), using its established components, theming, and
i18n patterns. If no environment exists yet, pick the most appropriate framework and
implement there.

- `reference/login.html` — open in a browser to see the finished screen (light + dark).
- `reference/LoginScreen.jsx` — the full screen implementation (the source of truth for
  layout, spacing, copy, and behavior).
- `reference/icons.jsx` — Lucide icon helper used by the screen.
- `tokens/*.css` — the Momentum design tokens (colors, type, elevation, fonts). Map these
  to your codebase's token system; do not hard-code hexes if a token already exists.
- `assets/momentum-bg-volt-*.png` — pre-rendered 1080×1920 background images (light & dark),
  in case you want an image fill instead of live CSS gradients.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, radii, and interactions. Recreate
pixel-accurately using the codebase's existing primitives.

---

## The Volt ambient background (reusable)

A calm base color with four large, soft radial "splashes" — all variations of the
signature Volt lime — anchored in the corners and bleeding off-frame, so color pools in
the corners while the center stays clean. Flat; no other decoration. The splash colors and
opacities are **identical in both themes**; only the base color changes.

**Base color (themed):**
- Light: `#F4F5F4`
- Dark: `#0B0C0A`

**The four splashes** — radial gradient from color@opacity → transparent.
Format: `color | inner opacity | radius (W% H% of element) | center (x% y%) | fade stop%`
1. `#C9FB45` | 0.46 | 115% 62% | 4%  -8%  | 62%  (bright lime, top-left, off-frame)
2. `#E2FF8F` | 0.40 | 105% 56% | 106% 6%  | 60%  (pale lime, top-right, off-frame)
3. `#B2EA1E` | 0.30 | 120% 50% | 90% 105% | 58%  (deep green, bottom-right, off-frame)
4. `#EEFFBE` | 0.36 | 118% 50% | 0%  99%  | 58%  (highlight, bottom-left)

**Reference CSS (splash #1 listed first = topmost; base color last):**
```css
.ambient-bg {
  --bg-base: #F4F5F4;                 /* dark theme: #0B0C0A */
  background:
    radial-gradient(115% 62% at 4% -8%,   rgba(201,251,69,0.46), transparent 62%),
    radial-gradient(105% 56% at 106% 6%,  rgba(226,255,143,0.40), transparent 60%),
    radial-gradient(120% 50% at 90% 105%, rgba(178,234,30,0.30), transparent 58%),
    radial-gradient(118% 50% at 0% 99%,   rgba(238,255,190,0.36), transparent 58%),
    var(--bg-base);
}
[data-theme="dark"] .ambient-bg { --bg-base: #0B0C0A; }
```
For platforms without layered CSS gradients (SwiftUI, RN), stack four
`RadialGradient` layers over the base in the same order, or use the provided PNGs.

---

## Screen: Login

### Layout
- Full-height phone screen. Single column, horizontal padding **26px**.
- Vertical order, top → bottom:
  1. **Status bar** (mock, 50px) — time left, signal/wifi/battery right.
  2. **Switcher row** — language switcher (left), theme switcher (right). `space-between`.
  3. **Brand block** — margin-top 38px: app icon (54×54, 15px radius) + "Momentum"
     wordmark, gap 13px. Below it the heading (margin-top 30px) and subtitle (margin-top 9px).
  4. **Form** — margin-top 28px, vertical stack, gap 16px: email field, password field
     (with forgot-password link right-aligned 10px below it), then the primary Log in button.
  5. **Divider** — margin 26px top / 18px bottom: hairline — centered label — hairline.
  6. **OAuth row** — two equal buttons, gap 12px: Google, Apple.
  7. **Sign-up line** — pinned to bottom (`margin-top:auto`, padding-top 28px), centered.

### Components

**Language switcher (top-left)**
- Pill button, height 40px, padding 0 14px, radius `--radius-pill`, background `--surface-2`,
  1px `--border-subtle`. Contents: globe icon (17px, `--text-secondary`), language code
  ("EN"/"ES"/"FR") at 14.5px/700, chevron-down (15px) that rotates 180° when open.
- Opens a dropdown (top 48px, min-width 168px, radius `--radius-lg`, `--shadow-lg`,
  1px `--border-default`): one row per language with the code, full name, and a check on the
  active one. Active row background `--accent-soft`, link-colored text. A full-screen
  invisible overlay closes it on outside-click.

**Theme switcher (top-right)**
- Segmented pill, padding 4px, radius `--radius-pill`, background `--surface-2`, 1px
  `--border-subtle`. Two 36×32 segments: sun (light) and moon (dark).
- A sliding **knob** (36×32, radius pill, background `--surface-1`, `--shadow-sm`, 1px
  `--border-subtle`) animates `left` between the two segments. Active icon `--text-primary`,
  inactive `--text-tertiary`. Selecting sets `data-theme` on the document root.

**Brand block**
- Icon: `assets/momentum-icon-noring-volt.png` style mark, 54×54, border-radius 15px.
- Wordmark "Momentum": `--font-display`, 25px, weight 800, letter-spacing -0.03em, `--text-primary`.
- Heading (e.g. "Welcome back"): `--font-display`, 32px, weight 900, letter-spacing -0.03em,
  line-height 1.05, `--text-primary`.
- Subtitle: `--font-text`, 15.5px, line-height 1.4, `--text-secondary`, max-width 320px.

**Input field (email & password)** — *premium, borderless*
- A soft filled "well": height 54px, padding 0 16px, radius `--radius-lg`, **no border**.
- Fill via `--field`: **white (#FFFFFF) in light**, `--surface-3` in dark. Hover/secondary
  fill `--field-hover` (light `#F4F5F4`, dark `--surface-hover`).
- Focus: **no border** — a soft halo `box-shadow: 0 0 0 4px var(--accent-soft)`, and the
  leading icon shifts to `--accent`.
- Leading icon (18px, `--text-tertiary` → `--accent` on focus): mail / lock.
- Input text: `--font-text`, 16px, weight 500, `--text-primary`.
- **Label** above each field: `--font-text`, **13.5px, weight 600, sentence case**
  (NOT uppercase, NOT monospace), color `--text-secondary`, margin-bottom 9px.
- Password field has a trailing **eye / eye-off** toggle (18px, `--text-tertiary`) that
  switches the input between `password` and `text`.

**Forgot-password link**
- Right-aligned, 10px below the password field. 13.5px, weight 700, `--text-link`,
  `white-space: nowrap`.

**Primary button (Log in)**
- Full-width, large. Volt fill `--accent` on `--on-accent` text. Radius `--radius-lg`,
  weight 800, trailing arrow-right icon (19px). (This is the design system's `Button`
  component, `variant="primary" size="lg"`.)

**Divider ("or continue with")**
- Hairline `--divider` — label — hairline. Label: `--font-text`, 13.5px, weight 500,
  `--text-tertiary`, `white-space: nowrap`. Gap 14px.

**OAuth buttons (Google, Apple)** — *match the input wells*
- Equal width, height 54px, radius `--radius-lg`, **no border**, fill `--field`
  (hover `--field-hover`). Label 15px, weight 700, `--text-primary`, gap 9px.
- Brand glyphs: full-color Google "G" (4-color SVG) and Apple logo (`currentColor`,
  follows text color so it inverts correctly in dark). Both 19px.

**Sign-up line**
- Centered, 14.5px, `--text-secondary`: "Don't have an account? **Sign up**" — the link
  portion weight 800, `--text-link`, no underline.

### Copy (localized — EN / ES / FR)
| key | EN | ES | FR |
|---|---|---|---|
| heading | Welcome back | Bienvenido de nuevo | Bon retour |
| subtitle | Log in to keep your streak going. | Inicia sesión para mantener tu racha. | Connectez-vous pour rester sur votre lancée. |
| email label | Email | Correo | E-mail |
| password label | Password | Contraseña | Mot de passe |
| forgot | Forgot password? | ¿Olvidaste tu contraseña? | Mot de passe oublié ? |
| login | Log in | Iniciar sesión | Se connecter |
| or | or continue with | o continúa con | ou continuer avec |
| no account | Don't have an account? | ¿No tienes una cuenta? | Pas encore de compte ? |
| sign up | Sign up | Regístrate | S'inscrire |

---

## Interactions & behavior
- **Theme switch**: writes `data-theme="light|dark"` on the document root; every token
  re-resolves. Knob slides (`left`, ~`--dur-base` ease-out). No background transition
  (instant swap).
- **Language switch**: swaps all copy from the table above; dropdown closes on select or
  outside-click; chevron rotates while open.
- **Password visibility**: eye toggle flips input type and icon.
- **Field focus**: 4px `--accent-soft` halo appears; leading icon turns `--accent`.
- **Button/OAuth/row hovers**: background eases to the `*-hover` token.
- Forgot-password, sign-up, and OAuth handlers are stubs in the prototype — wire to real
  auth in the app.

## State
- `theme: 'light' | 'dark'` (init from document `data-theme`, default light).
- `lang: 'en' | 'es' | 'fr'`.
- `email`, `pw` (controlled inputs).
- `showPw: boolean`.
- `langOpen: boolean` (dropdown).

## Design tokens (see `tokens/*.css` for the full set)
- **Volt scale**: `--volt-500 #C9FB45` (signature), plus `#E2FF8F`, `#B2EA1E`, `#EEFFBE`
  used in the background.
- **Light surfaces**: app bg `#F4F5F4`, cards/fields white, hover `#F4F5F4`.
- **Dark surfaces**: app bg `#0B0C0A`, fields `--surface-3`, hover `--surface-hover`.
- **Radii**: fields/buttons/tiles use `--radius-lg`; pills use `--radius-pill`.
- **Elevation**: light theme is **flat** — structure from fills/hairlines, not shadows;
  only floating overlays (dropdown) use a soft `--shadow-lg`. Focus uses a 4px accent halo,
  not a hard ring.
- **Type**: display `--font-display` (Archivo), text/UI `--font-text` (Hanken Grotesk).
  Labels are sentence-case Hanken — **do not** use monospace/uppercase for field labels.

## Assets
- App icon — Momentum Volt mark (use the brand mark already in your codebase).
- Background PNGs — `assets/momentum-bg-volt-light.png`, `...-dark.png` (1080×1920).
- Icons — Lucide: `globe, chevron-down, check, sun, moon, mail, lock, eye, eye-off,
  arrow-right, signal, wifi, battery-full`. Use your codebase's icon set.
- OAuth glyphs — inline SVG (Google 4-color, Apple monochrome) in `LoginScreen.jsx`.

## Files in this bundle
- `reference/login.html` — finished screen (open in a browser).
- `reference/LoginScreen.jsx` — implementation / source of truth.
- `reference/icons.jsx` — icon helper.
- `tokens/colors.css`, `tokens/elevation.css`, `tokens/typography.css`, `tokens/fonts.css`.
- `assets/momentum-bg-volt-light.png`, `assets/momentum-bg-volt-dark.png`.
