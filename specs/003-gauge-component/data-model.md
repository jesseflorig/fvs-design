# Data Model: Gauge Component

**Branch**: `003-gauge-component` | **Date**: 2026-04-20

## Entities

### GaugeStatus

Semantic classification governing fill color. Mirrors `BadgeStatus` exactly.

| Value     | Token          | Meaning                        |
|-----------|----------------|--------------------------------|
| `nominal` | `--nominal`    | Green — operating within spec  |
| `live`    | `--live`       | Amber — active / transmitting  |
| `fault`   | `--alert`      | Red — error or out-of-spec     |
| `info`    | `--info`       | Blue — informational           |
| `offline` | `--offline`    | Gray — disconnected / inactive |
| `neutral` | `--fg`         | Ink — no semantic state        |

Default: `neutral`

### GaugeSize

Named size preset mapping to SVG viewport dimension.

| Value | Viewport | Label visibility |
|-------|----------|-----------------|
| `sm`  | 64px     | Value only (descriptor hidden) |
| `md`  | 128px    | Value + descriptor |
| `lg`  | 192px    | Value + descriptor (larger type) |

Default: `md`

### GaugeProps (component interface)

| Prop       | Type          | Default     | Required | Description |
|------------|---------------|-------------|----------|-------------|
| `value`    | `number`      | —           | Yes      | Current value within [min, max] |
| `min`      | `number`      | `0`         | No       | Minimum bound (inclusive) |
| `max`      | `number`      | `100`       | No       | Maximum bound (inclusive) |
| `status`   | `GaugeStatus` | `'neutral'` | No       | Semantic color classification |
| `unit`     | `string`      | —           | No       | Unit suffix appended to value (e.g., `"%"`, `"°C"`) |
| `label`    | `string`      | —           | No       | Secondary descriptor below value (e.g., `"Battery"`) |
| `size`     | `GaugeSize`   | `'md'`      | No       | Viewport size preset |
| `aria-label` | `string`   | —           | No       | Accessible name override (falls back to label or "Gauge") |

## Validation Rules

- `value` is clamped to `[min, max]` — values outside this range never cause rendering errors.
- `min` must be less than `max`; if equal, the component renders as empty (0% fill) with no division-by-zero.
- `unit` is displayed verbatim — no transformation applied.
- `label` is displayed verbatim in sentence case — no uppercase transformation.

## Derived Values

```
normalizedValue = clamp((value − min) / (max − min), 0, 1)

arcSweep = 0.75                         // 270° as fraction of full circle
circumference = 2π × radius
usableArc = circumference × arcSweep
gapOffset = circumference × (1 − arcSweep)

stroke-dasharray  = circumference
stroke-dashoffset = gapOffset + usableArc × (1 − normalizedValue)
```

The SVG is rotated `135deg` so the arc starts at the lower-left and the gap falls at the bottom.
