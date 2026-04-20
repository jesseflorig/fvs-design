# Feature Specification: Slider Component

**Feature Branch**: `004-slider-component`  
**Created**: 2026-04-20  
**Status**: Draft  
**Input**: User description: "create a slider component"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Drag or Click to Select a Value (Priority: P1)

An operator uses the Slider to select a numeric value within a defined range by dragging a thumb along a track, or clicking a point on the track to jump to that value. The selected value is reflected immediately both visually (thumb position) and via an `onChange` callback the integrating component can use.

**Why this priority**: This is the core interaction — a slider without drag/click control has no value.

**Independent Test**: Render a Slider with `min={0}`, `max={100}`, `defaultValue={50}` and confirm the thumb is positioned at the midpoint. Drag the thumb to the end — confirm it reaches 100 and does not overshoot. Click the beginning of the track — confirm the value jumps to 0.

**Acceptance Scenarios**:

1. **Given** a Slider at `defaultValue={50}`, **When** the user drags the thumb to the rightmost position, **Then** the value reaches `max` and the thumb stops at the track boundary.
2. **Given** a Slider at `defaultValue={50}`, **When** the user clicks the leftmost point on the track, **Then** the value changes to `min` and the thumb moves there.
3. **Given** a Slider with `step={10}`, **When** the user drags between step positions, **Then** the value snaps to the nearest step increment.
4. **Given** a Slider in a form, **When** the user changes the value, **Then** the `onChange` callback is invoked with the new numeric value.

---

### User Story 2 - Keyboard Navigation (Priority: P2)

An operator navigates the Slider entirely by keyboard: focusing the thumb with Tab, then using arrow keys to increment or decrement the value, and Home/End to jump to the range boundaries.

**Why this priority**: Keyboard control is required by the FVS constitution (Keyboard-First Accessibility). An operator in a vehicle control environment may be using keyboard-only navigation.

**Independent Test**: Tab to the slider thumb, press ArrowRight 5 times, confirm the value increases by 5 (or 5 steps). Press End, confirm value jumps to max. Press Home, confirm value jumps to min.

**Acceptance Scenarios**:

1. **Given** a focused Slider, **When** the user presses `ArrowRight` or `ArrowUp`, **Then** the value increases by one step.
2. **Given** a focused Slider, **When** the user presses `ArrowLeft` or `ArrowDown`, **Then** the value decreases by one step.
3. **Given** a focused Slider, **When** the user presses `End`, **Then** the value jumps to `max`.
4. **Given** a focused Slider, **When** the user presses `Home`, **Then** the value jumps to `min`.
5. **Given** a focused Slider, **When** the user presses `PageUp`, **Then** the value increases by 10% of the total range (or to `max`, whichever is less).
6. **Given** a focused Slider, **When** the user presses `PageDown`, **Then** the value decreases by 10% of the range (or to `min`, whichever is greater).

---

### User Story 3 - Display Current Value Label (Priority: P3)

The Slider displays the current numeric value and an optional unit as a text label — either inline below the track or as a tooltip above the thumb — so the operator can read the precise value without estimating from thumb position.

**Why this priority**: Operators need exact readout. The track position alone is insufficient for precision settings.

**Independent Test**: Render `<Slider value={42} unit="%" showValue />` and confirm the label "42%" appears adjacent to or above the thumb.

**Acceptance Scenarios**:

1. **Given** a Slider with `showValue` and `unit="%"`, **When** it renders at `value={42}`, **Then** the label "42%" is visible near the thumb or below the track.
2. **Given** a Slider with `showValue` but no `unit`, **When** it renders, **Then** only the numeric value is shown with no trailing symbol.
3. **Given** a Slider without `showValue`, **When** it renders, **Then** no value label is shown.
4. **Given** a Slider, **When** the user drags or keys through values, **Then** the label updates in real time as the value changes.

---

### Edge Cases

- What happens when `value` is set to exactly `min` or `max`? The thumb should be flush with the track boundary with no visual overflow.
- What happens when `step` does not evenly divide the range? The final step should clamp to `max` rather than overshooting.
- What happens when `min` equals `max`? The slider renders as disabled/non-interactive with the thumb fixed at the single valid position.
- What happens when the Slider is `disabled`? The thumb and track should appear visually muted, and all pointer and keyboard interactions should be suppressed.
- How does the component behave with a very narrow container? The track should shrink to the available width; the thumb should not overflow the container.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The component MUST accept `value` (controlled), `defaultValue` (uncontrolled), `min` (default: 0), `max` (default: 100), and `step` (default: 1) props.
- **FR-002**: The component MUST invoke an `onChange(value: number)` callback whenever the value changes via pointer or keyboard interaction.
- **FR-003**: The component MUST clamp the value to `[min, max]` at all times — pointer overshoot and out-of-range prop values must be clamped silently.
- **FR-004**: The component MUST snap the value to the nearest `step` increment when `step > 1`.
- **FR-005**: The component MUST support keyboard control: ArrowRight/Up (increment), ArrowLeft/Down (decrement), Home (min), End (max), PageUp (+10% range), PageDown (−10% range).
- **FR-006**: The component MUST expose a visible focus indicator on the thumb using the FVS amber focus ring when focused via keyboard.
- **FR-007**: The component MUST support a `disabled` prop that suppresses all pointer and keyboard interaction and renders the component in a visually muted state.
- **FR-008**: The component MUST support a `showValue` prop that displays the current numeric value adjacent to the thumb or below the track.
- **FR-009**: The component MUST support an optional `unit` prop appended to the value label when `showValue` is true.
- **FR-010**: The component MUST expose `role="slider"` with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-valuetext` on the focusable thumb element.
- **FR-011**: All colors MUST use FVS design token CSS custom properties — no hardcoded hex values.
- **FR-012**: The component MUST render correctly in both light and console (dark) themes via the token system.
- **FR-013**: The component MUST support an optional `label` prop rendered above the track, consistent with the existing Input component's label pattern.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can select any value within the valid range using only pointer interaction, with the final value matching the intended position within ±1 step.
- **SC-002**: A user can navigate from `min` to `max` using only keyboard input (arrow keys + End) without requiring a pointing device.
- **SC-003**: The component passes all axe-core accessibility checks in Storybook addon-a11y with zero violations across all variants.
- **SC-004**: The value label updates within the same interaction event as the pointer or keyboard action — no perceptible delay.
- **SC-005**: The disabled state is visually distinguishable from the enabled state without relying on color alone.

## Assumptions

- The Slider is a single-thumb range slider (one handle); a dual-thumb range picker is out of scope for this feature.
- The component follows the existing FVS Input component directory pattern: `src/components/Slider/` with a TypeScript component file and a `.stories.tsx` file.
- The `step` prop defaults to 1; non-integer steps (e.g., 0.1) are supported but decimal display formatting is the responsibility of the consuming component via the `onChange` callback.
- Horizontal orientation only; vertical orientation is out of scope for v1.
- The component supports both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`) usage patterns.
- Touch/pointer events are supported for mobile compatibility, though the primary use case is desktop.
- The `label` prop styling follows the same mono-uppercase pattern used by the Input component.
