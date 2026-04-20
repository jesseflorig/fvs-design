# Quickstart: Slider Component Integration

**Branch**: `004-slider-component` | **Date**: 2026-04-20

## Storybook Verification Checklist

### 1. Core interaction (US1 — pointer)

- Render `<Slider defaultValue={50} />` → thumb is at the midpoint of the track ✓
- Drag thumb to the far right → value reaches 100, thumb stops at track boundary ✓
- Drag thumb to the far left → value reaches 0, thumb stops at track boundary ✓
- Click the far-right end of the track → value jumps to 100 (click-to-jump) ✓
- Drag past the end of the track → value clamps at max, thumb does not overflow container ✓
- Render `<Slider defaultValue={50} step={10} showValue />` → drag confirms snapping to 0, 10, 20 ... 100 ✓

### 2. Keyboard navigation (US2)

- Tab to the slider → amber focus ring appears on thumb ✓
- Press `ArrowRight` once → value increases by `step` ✓
- Press `ArrowLeft` once → value decreases by `step` ✓
- Press `End` → value jumps to max ✓
- Press `Home` → value jumps to min ✓
- Press `PageUp` → value increases by 10% of range ✓
- Press `PageDown` → value decreases by 10% of range ✓
- Tab away → focus ring disappears ✓
- Disabled slider: Tab → thumb is not reachable (tabIndex=-1) ✓

### 3. Value label and unit (US3)

- `<Slider defaultValue={42} showValue unit="%" />` → "42%" visible below track ✓
- `<Slider defaultValue={42} showValue />` → "42" visible, no trailing symbol ✓
- `<Slider defaultValue={42} />` → no value label visible ✓
- Drag or key through values with `showValue` → label updates live ✓

### 4. Disabled state

- Render `<Slider value={60} disabled showValue label="Locked" />` → thumb visible at 60%, opacity muted ✓
- Click or drag on disabled slider → no response, no value change ✓
- Tab to disabled slider → thumb is skipped (tabIndex=-1) ✓
- Visually distinguishable from enabled state without color alone (opacity reduction) ✓

### 5. Label

- `<Slider label="Threshold" />` → "THRESHOLD" in mono uppercase above track ✓
- Screen reader announces label when slider is focused ✓

### 6. Accessibility (addon-a11y)

- Open a11y panel on each story variant → zero violations ✓
- `role="slider"` present on thumb element ✓
- `aria-valuenow`, `aria-valuemin`, `aria-valuemax` reflect current state ✓
- `aria-valuetext` includes unit when provided ✓

### 7. Both themes

- Toggle light → console theme via toolbar ✓
- Track, fill, thumb, label, value all adapt via tokens — no hardcoded colors visible ✓
- Focus ring remains amber in both themes ✓

## Known Edge Cases

| Scenario | Expected behavior |
|----------|-------------------|
| `min === max` | Non-interactive; thumb fixed at position, no drag/key response |
| `step` that overshoots `max` | Clamps to `max` on last step |
| `value` outside `[min, max]` | Silently clamped; no error |
| Fractional step (0.1) | Snaps correctly; display precision is caller's responsibility |
| Very narrow container (<100px) | Track shrinks to container width; thumb still reachable |
| Long `unit` string | Value label grows naturally; no overflow handling needed at this scope |
