# Data Model: Slider Component

**Branch**: `004-slider-component` | **Date**: 2026-04-20

## Entities

### SliderProps (component interface)

| Prop           | Type                      | Default       | Required | Description |
|----------------|---------------------------|---------------|----------|-------------|
| `value`        | `number`                  | —             | No       | Controlled current value |
| `defaultValue` | `number`                  | `min`         | No       | Uncontrolled initial value |
| `min`          | `number`                  | `0`           | No       | Minimum bound (inclusive) |
| `max`          | `number`                  | `100`         | No       | Maximum bound (inclusive) |
| `step`         | `number`                  | `1`           | No       | Increment/decrement unit |
| `onChange`     | `(value: number) => void` | —             | No       | Fired on every value change |
| `disabled`     | `boolean`                 | `false`       | No       | Suppresses all interaction |
| `showValue`    | `boolean`                 | `false`       | No       | Shows numeric value label below track |
| `unit`         | `string`                  | —             | No       | Suffix appended to value label when `showValue` is true |
| `label`        | `string`                  | —             | No       | Field label above the track (mono uppercase) |
| `aria-label`   | `string`                  | `"Slider"`    | No       | Accessible name override when no `label` prop |

### Derived Values

```
currentValue = value !== undefined ? clamp(value, min, max) : internalState

percentage = (currentValue - min) / (max - min) * 100   // 0..100

snapToStep(raw):
  snapped = Math.round((raw - min) / step) * step + min
  return clamp(snapped, min, max)

pageStep = (max - min) * 0.1
```

### State Machine (interaction states)

| State    | Visual                       | Pointer events | Keyboard events |
|----------|------------------------------|---------------|-----------------|
| Default  | Track: `--line`, Thumb: bordered square | Active | Inactive (not focused) |
| Focused  | + amber 2px outline on thumb | Active | Active |
| Dragging | Thumb moves with pointer     | Captured      | — |
| Disabled | `opacity: 0.45`, cursor: `not-allowed` | Suppressed | `tabIndex=-1` |

### Validation Rules

- `min` must be less than `max`. If equal, component renders as disabled with no interaction.
- `step` must be > 0. Non-positive step values are treated as 1.
- `value` / `defaultValue` are clamped to `[min, max]` silently.
- `step` that does not evenly divide the range: final position clamps to `max`.
- Non-integer `step` (e.g., 0.5, 0.1): supported; display formatting left to consuming component.
