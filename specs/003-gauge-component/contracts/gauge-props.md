# Contract: Gauge Component Props Interface

**Type**: UI Component Props  
**Branch**: `003-gauge-component` | **Date**: 2026-04-20

## TypeScript Interface

```typescript
export type GaugeStatus = 'nominal' | 'live' | 'fault' | 'info' | 'offline' | 'neutral';
export type GaugeSize   = 'sm' | 'md' | 'lg';

export interface GaugeProps {
  /** Current value to display. Clamped to [min, max]. */
  value: number;

  /** Lower bound of the valid range. Default: 0 */
  min?: number;

  /** Upper bound of the valid range. Default: 100 */
  max?: number;

  /** Semantic status driving arc fill color. Default: 'neutral' */
  status?: GaugeStatus;

  /** Unit suffix appended to the value label (e.g. "%", "°C", "km/h"). */
  unit?: string;

  /** Secondary descriptor label rendered below the value. */
  label?: string;

  /** Viewport size preset. Default: 'md' */
  size?: GaugeSize;

  /** Accessible name override. Falls back to label prop, then "Gauge". */
  'aria-label'?: string;
}
```

## Invariants

1. `min < max` — if violated, component renders as empty (0% fill).
2. `value` outside `[min, max]` is silently clamped — no error or warning.
3. All color values are resolved from CSS custom properties at render time; no hardcoded values in the component.
4. The SVG element carries `aria-hidden="true"`; ARIA semantics live on the wrapping `div` (`role="meter"`).

## Usage Example

```tsx
// Minimal
<Gauge value={72} />

// Full
<Gauge
  value={72}
  min={0}
  max={100}
  status="nominal"
  unit="%"
  label="Battery"
  size="lg"
  aria-label="Battery level: 72 percent"
/>
```

## Story Coverage Requirements

| Story              | Props                                         |
|--------------------|-----------------------------------------------|
| Default            | `value={50}`                                  |
| Empty              | `value={0}`                                   |
| Full               | `value={100}`                                 |
| StatusNominal      | `value={80} status="nominal" unit="%"`        |
| StatusLive         | `value={65} status="live" unit="MHz"`         |
| StatusFault        | `value={22} status="fault" unit="°C"`         |
| StatusInfo         | `value={44} status="info"`                    |
| StatusOffline      | `value={0} status="offline"`                  |
| WithLabel          | `value={72} unit="%" label="Battery"`         |
| SmallSize          | `value={60} size="sm"`                        |
| LargeSize          | `value={60} size="lg" unit="%" label="Fuel"`  |
| CustomRange        | `value={0} min={-50} max={50} unit="°C"`      |
