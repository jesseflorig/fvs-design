# Quickstart: Gauge Component Integration

**Branch**: `003-gauge-component` | **Date**: 2026-04-20

## Storybook Verification Checklist

After implementation, verify these scenarios in Storybook before marking tasks complete:

### 1. Arc fill proportion

- Render `<Gauge value={0} />` → arc is empty (full gap visible, no colored stroke)
- Render `<Gauge value={50} />` → arc is exactly half filled
- Render `<Gauge value={100} />` → arc is fully filled (gap at bottom only)
- Render `<Gauge value={-10} min={0} max={100} />` → same as value=0 (clamped)
- Render `<Gauge value={150} min={0} max={100} />` → same as value=100 (clamped)

### 2. Status colors

For each status, confirm the arc stroke uses the correct token color (inspect computed style or compare visually against Badge in the same status):

- `nominal` → green
- `live` → amber
- `fault` → red
- `info` → blue
- `offline` → gray
- `neutral` (default) → foreground ink

### 3. Value label and unit

- `<Gauge value={42} />` → "42" centered below arc, Space Mono, no trailing symbol
- `<Gauge value={42} unit="%" />` → "42%" centered below arc
- `<Gauge value={42} unit="%" label="Battery" />` → "42%" with "Battery" as secondary line

### 4. Size variants

- `sm` (64px): arc and value visible, descriptor hidden
- `md` (128px): arc, value, and descriptor visible
- `lg` (192px): arc, value, and descriptor visible at larger scale

### 5. Accessibility (addon-a11y panel)

- Open the a11y panel for every story variant
- Confirm zero violations (no red items)
- Tab to the gauge wrapper in the canvas — screen reader should announce value/min/max

### 6. Both themes

Toggle between light and console themes via the toolbar:
- Light: background `--bg`, arc track in `--border` or similar muted token
- Console: background `--bg` (dark), same status colors — verify contrast still passes

## Known Edge Cases

| Scenario | Expected behavior |
|----------|-------------------|
| `min === max` | 0% fill, no divide-by-zero error |
| `value` is `NaN` | 0% fill (clamped to min) |
| `unit` with special characters (`°`, `μ`) | Renders verbatim — no escaping needed in SVG text |
| Very long `label` (>20 chars) | Truncate with ellipsis or wrap — confirm no overflow beyond SVG bounds |
