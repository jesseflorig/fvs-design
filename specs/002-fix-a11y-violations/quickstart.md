# Quickstart / Test Scenarios: Fix All Accessibility Violations

**Branch**: `002-fix-a11y-violations` | **Date**: 2026-04-19

## Setup

```bash
npm run storybook     # http://localhost:6006
```

Install the axe browser extension (axe DevTools or similar) for manual contrast and structure checks, in addition to Storybook's built-in `@storybook/addon-a11y` panel.

---

## Scenario 1: Button Focus Ring Visible on Keyboard Navigation

1. Open `Components/Button` story in Storybook.
2. Click anywhere outside the canvas to deselect.
3. Press Tab to move focus into the canvas.
4. Tab through all Button variants.
5. **Expected**: Each button shows a 2px amber (`#E8A33D`) outline ring with 2px offset when focused.
6. **Expected**: No button shows a plain black browser-default ring or no ring at all.
7. Click a Button with the mouse, then check — the amber ring may appear (acceptable); it MUST NOT be the browser default grey ring.

---

## Scenario 2: Input and Select Labels Associated

1. Open `Components/Input` story.
2. Open browser DevTools → Accessibility panel.
3. Inspect the text input. Its accessible name MUST show the `label` prop value (e.g., "HOSTNAME").
4. Inspect the select. Its accessible name MUST show the `label` prop value.
5. Run axe on the story — zero `label` violations expected.

---

## Scenario 3: Toggle and Checkbox Accessible Names

1. Open `Components/Input` story, find Toggle and Checkbox.
2. Inspect the `<button>` element in the Accessibility panel.
3. The button's accessible name MUST match the visible label text (e.g., "POWER SWITCH", "ENABLE LOGGING").
4. Run axe — zero `button-name` violations expected.

---

## Scenario 4: Input Hint/Error Announced on Focus

1. Open `Components/Input` → "With Error" story variant.
2. Tab to the input with an error message.
3. In a screen reader (VoiceOver, NVDA) or the axe description panel: the error text MUST be announced on focus.
4. Inspect the `<input>` element — `aria-describedby` MUST point to the error span's `id`.

---

## Scenario 5: DataTable Column Headers Associated

1. Open `Components/DataTable` story.
2. Inspect any `<th>` in DevTools — `scope` attribute MUST equal `"col"`.
3. Run axe — zero `scope-attr-valid` or `th-has-data-cells` violations expected.

---

## Scenario 6: Badge Dot Hidden from Screen Readers

1. Open `Components/Badge` story, any status with dot showing.
2. Inspect the dot `<span>` — `aria-hidden="true"` MUST be present.
3. Screen reader navigation: the badge MUST announce only the label text, not empty or extra content.

---

## Scenario 7: Zero Axe Violations Across All Component Stories (Both Themes)

1. Open each component story in Storybook (Button, Badge, Card, Input, DataTable, Divider).
2. In the Storybook A11y panel, verify **Violations: 0** for each story.
3. Switch to the console theme using the theme toggle in the Storybook toolbar.
4. Re-check each story — **Violations: 0** must hold in console theme too.

---

## Scenario 8: Color Contrast — Muted Text in Light Theme

1. Open `Components/Input` — hint text is `--fg-subtle`.
2. Using the axe panel or browser contrast checker: hint text MUST achieve ≥4.5:1 against the background.
3. Repeat for Toggle's off-state label (also `--fg-subtle`).

---

## Scenario 9: Color Contrast — Muted Text in Console Theme

1. Switch to console theme.
2. Open `Components/Input` — hint text MUST achieve ≥4.5:1 against `--bg-elevated` (#151517).
3. Repeat for Toggle's off-state label.
