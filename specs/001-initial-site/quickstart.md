# Quickstart & Integration Scenarios: Initial Design System Site

**Branch**: `001-initial-site` | **Date**: 2026-04-19

## Setup

```bash
# Install dependencies
npm install

# Start Storybook dev server
npm run storybook
# → http://localhost:6006

# Build static Storybook export
npm run build-storybook
```

---

## Scenario 1: Token Reference — Color Swatches

**Goal**: Verify the Color token section renders all swatches with correct values.

1. Open Storybook → `Tokens / Colors / Neutral Scale`
2. Verify 9 swatches render: `--fvs-black` through `--fvs-white`
3. Each swatch shows: color block, CSS variable name, hex value, semantic role label
4. Open `Role Tokens Light` — verify `--bg` shows `#F2F1EE` (paper), `--accent` shows `#E8A33D`
5. Switch sidebar theme toolbar to **Console** → open `Role Tokens Console`
6. Verify `--bg` now shows `#0A0A0B`, `--fg-muted` shows `#A8A8AE`

**Pass**: All 9 neutral + 5 signal + 12 role tokens visible with correct resolved values in both themes.

---

## Scenario 2: Component — Button Variants

**Goal**: Verify Button renders all 6 variants and keyboard focus is visible.

1. Open `Components / Button / All Variants`
2. Verify 6 buttons render in a row: primary, secondary, ghost, accent, danger, icon
3. Hover each button — verify subtle visual change (no color flash, no glow)
4. Tab through all buttons — verify 2px solid amber outline appears on focused button
5. Open `Components / Button / Disabled` — verify button is visually muted, cursor not-allowed
6. In the Storybook controls panel, toggle `disabled=true` on `Primary` — verify same result

**Pass**: All variants render; amber focus ring visible on keyboard nav; disabled state correctly styled.

---

## Scenario 3: Console Theme Toggle

**Goal**: Verify theme switching updates all tokens and components correctly.

1. Open `Components / Card / Battery Panel` in light theme
2. Verify card background is `#FBFAF7` (fvs-white), border `#C4C4CB` (fvs-fog)
3. Switch toolbar to **Console** theme
4. Verify card background becomes `#151517` (fvs-ink), border `#2A2A2E`
5. Open `Tokens / Colors / Role Tokens Light` after switching — verify values update
6. Tab to a focusable element — verify focus ring remains amber in console theme

**Pass**: All surfaces, text, and borders update on theme switch; focus ring unaffected.

---

## Scenario 4: Self-Hosted Font Loading

**Goal**: Verify Michroma and Space Mono load from local assets.

1. Open browser DevTools → Network tab, filter by `font`
2. Open any story using `font-display: 'Michroma'` (e.g., `Brand / Typography / Michroma Specimen`)
3. Verify font requests come from `localhost:6006/src/assets/fonts/Michroma-Regular.ttf` (not fonts.googleapis.com or unpkg.com)
4. Verify Space Mono requests come from `localhost:6006/src/assets/fonts/SpaceMono-Regular.ttf`
5. Open `Brand / Typography / Plex Sans Specimen` — IBM Plex Sans MAY load from Google Fonts (acceptable in v1)

**Pass**: Michroma and Space Mono load from local assets; no 404s on font requests.

---

## Scenario 5: Brand Section — Logo Usage

**Goal**: Verify all logo assets render on light and dark backgrounds.

1. Open `Brand / Logo / On Light` — verify logotype and mark render on `--fvs-paper` background
2. Open `Brand / Logo / On Dark` — verify same assets on `--fvs-black` background
3. Verify the FVS mark appears in the Storybook sidebar as the `brandImage` (top of sidebar)
4. Open `Brand / Logo / Favicon` — verify favicon SVG renders at 32px and 64px without distortion

**Pass**: All 3 logo assets render correctly at documented sizes on both backgrounds.

---

## Scenario 6: Accessibility — Keyboard Navigation

**Goal**: Verify all interactive components are keyboard-operable.

1. Open `Components / Input / Text Field`
2. Tab into the input — verify amber focus ring (`box-shadow` outer ring `#E8A33D`)
3. Open `Components / Button / Primary` — tab to button, press Enter — verify onClick fires (check Actions panel)
4. Open `Components / Input / Toggle Field` — tab to toggle, press Space — verify state changes
5. Open `Components / Input / Checkbox Field` — tab to checkbox, press Space — verify checked state
6. Open DevTools → Accessibility panel → run axe scan on any story — verify 0 critical violations

**Pass**: All interactive elements reachable by keyboard; actions fire correctly; axe reports no critical a11y violations.
