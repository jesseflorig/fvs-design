# Research: Slider Component

**Branch**: `004-slider-component` | **Date**: 2026-04-20

## Native `<input type="range">` vs. Custom Div-Based Slider

**Decision**: Custom div-based slider using `setPointerCapture` for drag.

**Rationale**: The native `<input type="range">` thumb and track are styled via CSS pseudo-elements (`::thumb`, `::track`), which cannot be set with inline `React.CSSProperties`. Every other component in this codebase uses inline styles exclusively (no `.css` files, no Tailwind `className` utilities in component files). A native range input would require either a `<style>` tag injection or breaking the inline-only convention. A custom div-based slider gives full style control, matches the existing pattern, and is the same approach used by every production design system that has its own aesthetic (Radix UI, Adobe Spectrum, Ant Design).

**Alternatives considered**:
- Native `<input type="range">` with injected `<style>`: Works but introduces CSS side effects and makes the component's styling non-local. Breaks the inline-only convention.
- Radix UI `@radix-ui/react-slider`: Correct approach for production, but adds a dependency for a component we can implement in ~100 lines. The constitution says "Leverage the ecosystem" but also "no abstractions beyond what the task requires."

## Pointer Event Handling

**Decision**: `onPointerDown` on the thumb → `element.setPointerCapture(e.pointerId)` → `onPointerMove` + `onPointerUp` on the same thumb element.

**Rationale**: `setPointerCapture` ensures the thumb continues receiving `pointermove` events even when the cursor leaves the element or the browser window, which is essential for drag-to-edge behavior. This is the modern, cross-browser way to implement drag — it handles mouse, touch, and stylus in one code path. No global document event listeners are needed, avoiding cleanup bugs.

**Value calculation from pointer position**:
```
const rect = trackRef.current.getBoundingClientRect()
const raw = (e.clientX - rect.left) / rect.width  // 0..1
const snapped = Math.round(raw * (max - min) / step) * step + min
const clamped = Math.max(min, Math.min(max, snapped))
```

The `trackRef` points to the track container (not the thumb) so the calculation is based on the full track width.

**Alternatives considered**:
- `onMouseDown` + `document.addEventListener('mousemove')`: Works but requires manual cleanup, doesn't handle touch, and risks event listener leaks.
- `onMouseDown` on the track (for click-to-jump) + separate thumb drag: Requires two interaction zones and more state. Instead, both click-on-track and drag-on-thumb can be handled by `onPointerDown` on the track container.

## Click-on-Track vs. Drag-on-Thumb

**Decision**: Handle `onPointerDown` on the **track container** (not just the thumb). This lets a single event handler serve both "click anywhere on track to jump" and "start dragging from current position."

**Rationale**: When `onPointerDown` fires on the track container, calculate the value from click position immediately (jump), then `setPointerCapture` and continue tracking `onPointerMove`. This is a single clean interaction model.

## Controlled vs. Uncontrolled Pattern

**Decision**: Standard React controlled/uncontrolled pattern — `value` prop for controlled, `defaultValue` for uncontrolled. Internal `useState` tracks the value when uncontrolled; controlled value is used directly.

```typescript
const [internalValue, setInternalValue] = useState(defaultValue ?? min)
const currentValue = value !== undefined ? value : internalValue
```

When `value` is provided, `setInternalValue` is not called — the consuming component owns the state via `onChange`. This matches the pattern of the native `<input>` element.

## Keyboard Step Size

**Decision**:
- `ArrowLeft` / `ArrowDown`: `currentValue - step`
- `ArrowRight` / `ArrowUp`: `currentValue + step`
- `PageDown`: `currentValue - (max - min) * 0.1`
- `PageUp`: `currentValue + (max - min) * 0.1`
- `Home`: `min`
- `End`: `max`

All results are snapped to the nearest step and clamped to `[min, max]`.

**Rationale**: This is the ARIA specification for `role="slider"` keyboard behavior (ARIA Authoring Practices Guide 1.2). PageUp/PageDown at 10% of the range is the recommended large step.

## Visual Anatomy

**Decision**: Three-layer track with absolute-positioned elements inside a `position: relative` wrapper.

```
[Track container — position: relative, height: 20px, cursor: pointer]
  [Track rail — position: absolute, top: 50%, height: 2px, full width, var(--line)]
  [Track fill — position: absolute, top: 50%, height: 2px, left: 0, width: percentage%, var(--fg)]
  [Thumb — position: absolute, top: 50%, left: percentage%, transform: translate(-50%, -50%)]
    [16×16px, border-radius: var(--r-1), background: var(--bg-elevated), border: 1px solid var(--line-strong)]
```

The thumb is a `<div>` with `tabIndex={0}` and `role="slider"`. Its background matches `--bg-elevated` (white on light, dark on console) with a strong border, so it visually "floats" over the fill line.

**Thumb at boundaries**: At 0% and 100%, `transform: translate(-50%, -50%)` causes the thumb to extend slightly outside the track. The containing wrapper has `overflow: visible` so the thumb and its focus ring are never clipped.

## Focus State Implementation

**Decision**: Use `onFocus`/`onBlur` state (same as Toggle and Input) to set `outline: '2px solid var(--fvs-amber)'` on the thumb inline style.

**Rationale**: Consistent with every other interactive element in the codebase. Avoids `:focus-visible` pseudo-class which cannot be set inline.

## ARIA

**Decision**:
- `role="slider"` on the thumb div
- `aria-valuenow={currentValue}`
- `aria-valuemin={min}`
- `aria-valuemax={max}`
- `aria-valuetext={unit ? \`${currentValue} ${unit}\` : String(currentValue)}`
- `aria-labelledby={labelId}` when `label` prop is provided; `aria-label="Slider"` as fallback
- `aria-disabled={disabled}`
- `tabIndex={disabled ? -1 : 0}`

The label element gets `id={labelId}` from `useId()`. This is the correct association since `<label htmlFor>` only works with actual form controls.

## Value Display Typography

**Decision**: Value label uses `var(--font-mono)` at 11px, rendered as a `<span>` below the track. Same mono treatment as data readouts elsewhere in the system (DataTable cells, Badge values).

**Rationale**: Numeric values in FVS are always monospaced. The value label is a secondary element — smaller than the track itself, not a primary UI affordance.
