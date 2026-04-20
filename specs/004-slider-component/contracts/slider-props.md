# Contract: Slider Component Props Interface

**Type**: UI Component Props  
**Branch**: `004-slider-component` | **Date**: 2026-04-20

## TypeScript Interface

```typescript
export interface SliderProps {
  /** Controlled current value. If provided, component is controlled. */
  value?: number;

  /** Uncontrolled initial value. Used only when `value` is not provided. Default: min */
  defaultValue?: number;

  /** Minimum bound (inclusive). Default: 0 */
  min?: number;

  /** Maximum bound (inclusive). Default: 100 */
  max?: number;

  /** Increment/decrement unit. Default: 1 */
  step?: number;

  /** Fired on every value change (pointer or keyboard). */
  onChange?: (value: number) => void;

  /** Suppresses all interaction. Default: false */
  disabled?: boolean;

  /** Shows numeric value label below track. Default: false */
  showValue?: boolean;

  /** Unit suffix appended to value label when showValue is true. */
  unit?: string;

  /** Field label rendered above track in mono uppercase. */
  label?: string;

  /** Accessible name override when no label prop is provided. Default: "Slider" */
  'aria-label'?: string;
}
```

## Invariants

1. `min < max` — if violated, component is non-interactive and displays a fixed thumb position.
2. `step > 0` — non-positive step treated as 1.
3. `value` and `defaultValue` are silently clamped to `[min, max]` before use.
4. When both `value` and `defaultValue` are provided, `value` takes precedence (controlled mode).
5. The thumb element always carries `role="slider"` with up-to-date `aria-valuenow`.
6. All colors resolved from CSS custom properties — no hardcoded values in the component.

## Usage Examples

```tsx
// Uncontrolled
<Slider defaultValue={50} label="Threshold" unit="%" showValue />

// Controlled
const [v, setV] = useState(25);
<Slider value={v} onChange={setV} min={0} max={200} step={5} label="Offset" unit="ms" showValue />

// Minimal (no label, no value display)
<Slider defaultValue={0} />

// Disabled
<Slider value={60} disabled label="Read Only" unit="%" showValue />

// Custom step
<Slider defaultValue={0} min={0} max={1} step={0.1} showValue />
```

## Story Coverage Requirements

| Story               | Props                                                          |
|---------------------|----------------------------------------------------------------|
| Default             | `defaultValue={50}`                                           |
| WithLabel           | `defaultValue={50} label="Threshold"`                         |
| WithValueDisplay    | `defaultValue={72} showValue unit="%" label="Battery"`        |
| MinValue            | `defaultValue={0}`                                            |
| MaxValue            | `defaultValue={100}`                                          |
| StepTen             | `defaultValue={50} step={10} showValue label="Volume"`        |
| Disabled            | `value={60} disabled label="Locked" unit="%" showValue`       |
| CustomRange         | `defaultValue={0} min={-50} max={50} step={5} unit="°C" showValue label="Offset"` |
| Controlled          | State-driven story with external counter display               |
| FractionalStep      | `defaultValue={0.5} min={0} max={1} step={0.1} showValue`    |
