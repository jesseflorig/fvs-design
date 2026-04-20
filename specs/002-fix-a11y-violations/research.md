# Research: Fix All Accessibility Violations

**Branch**: `002-fix-a11y-violations` | **Date**: 2026-04-19

## Resolved Token Values

| Token | Theme | Value | Background | Contrast | Status |
|-------|-------|-------|------------|----------|--------|
| `--fg-subtle` | light | `#6F6F78` | `#FBFAF7` | 4.76:1 | ✓ PASS |
| `--fg-subtle` | console | `#7E7E88` | `#151517` | 4.55:1 | ✓ PASS |

Calculation method: WCAG 2.1 relative luminance formula. All values verified to achieve ≥4.5:1 against the `--bg-elevated` token in their respective theme.

---

## Violation Inventory

Audit of the six components against WCAG 2.1 AA requirements. Findings ordered by severity.

---

### 1. Form Inputs: Label Not Associated with Control

**Files affected**: `src/components/Input/Input.tsx` (Input, Select, Toggle, Checkbox)

**Violation**: The `<label>` element in `Input` and `Select` is adjacent to the control but has no `htmlFor`/`id` binding. Screen readers cannot programmatically associate the label with the control — they read the label as disconnected text and the input as unlabeled. This triggers axe rule `label`.

**Decision**: Add a generated `id` to each control using React's `useId()` hook (React 18, already in the stack). Set `htmlFor={id}` on the `<label>`. For `Toggle` and `Checkbox`, which use a custom `<button>` rather than a native input, add `aria-labelledby` pointing to an `id` on the label `<span>`.

**Rationale**: `useId()` produces stable, collision-safe IDs without requiring a prop. This keeps the API unchanged while making every instance uniquely addressable.

**Alternatives considered**:
- Require callers to pass an `id` prop — rejected, breaks existing stories without changing API.
- Use `aria-label` instead — rejected, duplicates the visible label and creates a maintenance burden.

---

### 2. Toggle and Checkbox: Button Has No Accessible Name

**Files affected**: `src/components/Input/Input.tsx` (Toggle, Checkbox)

**Violation**: The interactive `<button role="switch">` in Toggle and `<button role="checkbox">` in Checkbox have no accessible name. The visual label is in a sibling `<span>`, which screen readers do not automatically associate with the button. axe rule: `button-name`, `aria-allowed-role`.

**Decision**: Add `id` to the label `<span>` and `aria-labelledby={labelId}` to the `<button>`. This maps the visible label text to the button's accessible name without duplicating content.

**Rationale**: `aria-labelledby` is the correct ARIA pattern for linking existing visible text to a widget when `<label>` cannot be used (because the target is a `<button>`, not a native form control).

**Alternatives considered**:
- Use native `<input type="checkbox">` with visual overlay — valid but requires significant visual rewrite; deferred to a future component overhaul.
- Add `aria-label` with the `label` prop value — works but creates invisible text that diverges from visible text; `aria-labelledby` is preferred.

---

### 3. DataTable: `<th>` Missing `scope` Attribute

**Files affected**: `src/components/DataTable/DataTable.tsx`

**Violation**: Column `<th>` elements have no `scope="col"` attribute. Without `scope`, screen readers cannot definitively determine whether headers apply to columns or rows. axe rule: `scope-attr-valid` / `th-has-data-cells`.

**Decision**: Add `scope="col"` to each `<th>` in the `DataTable` header row.

**Rationale**: This is a one-line change per column header. `scope="col"` is the canonical WCAG technique for simple tables (H63). No additional structure is needed for a flat, non-grouped table.

---

### 4. Badge: Decorative Dot Not Hidden from Assistive Technology

**Files affected**: `src/components/Badge/Badge.tsx`

**Violation**: The status indicator dot is a `<span>` child element with no `aria-hidden`. Screen readers may announce it as an empty or whitespace element. axe rule: none (this is a best-practice / screen reader UX issue rather than a hard axe rule, but aria-hidden prevents noise).

**Decision**: Add `aria-hidden="true"` to the dot `<span>`. The dot is purely decorative — the `label` text already communicates the status.

---

### 5. Button: `outline: 'none'` Suppresses Default Focus Indicator

**Files affected**: `src/components/Button/Button.tsx`

**Violation**: The base style object sets `outline: 'none'`, which removes the browser's default focus ring. The component re-applies the amber ring via an `onFocus` JS handler, but this approach is fragile: if the handler misfires or the component is re-rendered during focus, the ring may not appear. More critically, it applies the ring to all focus events (mouse and keyboard), ignoring the `focus-visible` signal that distinguishes intentional keyboard navigation from incidental focus on mouse click.

**Decision**: Remove `outline: 'none'` from the base style object. Rely on the `onFocus`/`onBlur` handler already in place for the amber ring. Add `outline: 'none'` as a `:focus:not(:focus-visible)` equivalent by setting it back in `onMouseDown` instead. 

Actually, since we're in inline styles (no CSS pseudo-class access), the simplest correct approach is: keep the `onFocus`/`onBlur` approach but also set `outlineOffset` correctly, and ensure the base style does NOT suppress the outline. Instead, set a transparent outline in base so the layout doesn't jump:

```
outline: '2px solid transparent',
outlineOffset: '2px',
```

Then `onFocus` sets it to amber and `onBlur` resets to transparent. This preserves the amber ring for keyboard users and doesn't visually suppress anything for mouse users since transparent = invisible.

**Rationale**: Transparent outline in base means no style jump on focus; the handler always applies the full ring on any focus event; and the browser default ring is never suppressed.

---

### 6. Color Contrast — Muted/Subtle Text at Micro Sizes

**Files affected**: `src/tokens/tokens.css`

**Potential violations**:

| Token | Value | Background | Approx. Ratio | Status |
|-------|-------|------------|---------------|--------|
| `--fg-subtle` (light) | `--fvs-steel` #8A8A93 | `--bg-elevated` #FBFAF7 | ~3.0:1 | **FAILS** (needs 4.5:1 for 10px text) |
| `--fg-subtle` (console) | #6A6A72 | `--bg-elevated` #151517 | ~3.4:1 | **FAILS** |
| `--fg-muted` (light) | `--fvs-slate` #4A4A52 | `--bg-elevated` #FBFAF7 | ~7.2:1 | Passes |
| `--fg-muted` (console) | #A8A8AE | `--bg` #0A0A0B | ~9.2:1 | Passes |

`--fg-subtle` is used for hint/help text in `Input` and `Select`, and for the off-state label in `Toggle`. These are 10–11px mono text.

**Decision**: Darken `--fg-subtle` in the light theme to achieve ≥4.5:1. Target: `#72727A` or darker. In the console theme, lighten `--fg-subtle` to `#8A8A93` (the current light theme steel, which passes on dark backgrounds).

**Note**: Verify final values against a precise contrast calculator before committing. The token change flows to all uses — verify no component unexpectedly changes character.

---

### 7. Input/Select: Error and Hint Spans Not Associated via `aria-describedby`

**Files affected**: `src/components/Input/Input.tsx`

**Violation**: Error and hint messages are visible but not programmatically linked to their input. Screen readers won't announce the hint on focus. axe rule: none directly, but `aria-describedby` is the WCAG technique for associating help text (H90, ARIA1).

**Decision**: Add `id` to the hint/error `<span>` and set `aria-describedby={hintId}` on the control. Use `useId()` for the hint ID. Only set `aria-describedby` when a hint or error exists.

---

## Summary of Fix Approaches

| Component | Fix Type | WCAG Criterion |
|-----------|----------|----------------|
| Input, Select | `useId()` + `htmlFor`/`id` binding | 1.3.1, 4.1.2 |
| Input, Select | `aria-describedby` for hint/error | 1.3.1 |
| Toggle, Checkbox | `aria-labelledby` linking label span to button | 4.1.2 |
| DataTable | `scope="col"` on `<th>` | 1.3.1 |
| Badge | `aria-hidden="true"` on dot span | (best practice) |
| Button | `outline: '2px solid transparent'` base; amber on focus | 2.4.7 |
| tokens.css | Darken `--fg-subtle` in both themes | 1.4.3 |
