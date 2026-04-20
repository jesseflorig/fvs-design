# Feature Specification: Gauge Component

**Feature Branch**: `003-gauge-component`  
**Created**: 2026-04-20  
**Status**: Draft  
**Input**: User description: "create a gauge component"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Display a Numeric Value as a Visual Gauge (Priority: P1)

A designer or developer integrates a Gauge component into a Storybook story or panel to visualize a single numeric metric (e.g., battery charge, signal strength, system health) as a filled arc or dial. The component accepts a value and range, and renders the appropriate fill proportion.

**Why this priority**: This is the core interaction — without a working gauge display, nothing else in this component has value.

**Independent Test**: Can be tested by rendering the Gauge with various values and confirming the visual fill matches the expected proportion of the arc.

**Acceptance Scenarios**:

1. **Given** a Gauge with `value=75` and `max=100`, **When** it renders, **Then** the filled portion of the arc represents 75% of the full sweep.
2. **Given** a Gauge with `value=0`, **When** it renders, **Then** the arc fill is empty (no filled segment visible).
3. **Given** a Gauge with `value=100`, **When** it renders, **Then** the arc is fully filled.
4. **Given** a Gauge with `value=50` and a custom `min=-100` / `max=100`, **When** it renders, **Then** the fill represents 75% of the arc (since 50 is 75% of the way from -100 to 100).

---

### User Story 2 - Semantic Status Coloring (Priority: P2)

The gauge communicates operational status through color, matching the FVS design system's semantic palette (nominal, live, fault, info, offline, neutral) — the same vocabulary used by Badge.

**Why this priority**: Color is a primary signal in a telemetry/monitoring design system. A gauge without semantic status coloring loses its communicative value in a dashboard context.

**Independent Test**: Can be tested by rendering a Gauge in each status variant and confirming the fill color and label text match the expected token values.

**Acceptance Scenarios**:

1. **Given** a Gauge with `status="nominal"`, **When** it renders, **Then** the fill uses the nominal semantic color token.
2. **Given** a Gauge with `status="fault"`, **When** it renders, **Then** the fill uses the fault semantic color token.
3. **Given** no `status` prop is passed, **When** it renders, **Then** the gauge defaults to the `neutral` status appearance.

---

### User Story 3 - Display Value Label and Unit (Priority: P3)

The gauge displays the numeric value and an optional unit label (e.g., "%" or "km/h") centered inside or below the arc, giving users precise readout alongside the visual indicator.

**Why this priority**: Operators need the exact numeric value — the arc alone is insufficient for precision tasks.

**Independent Test**: Can be tested by rendering a Gauge with `value=42` and `unit="%"` and confirming the label "42%" appears in the expected position.

**Acceptance Scenarios**:

1. **Given** a Gauge with `value=42` and `unit="%"`, **When** it renders, **Then** the text "42%" is visible within or below the gauge arc.
2. **Given** a Gauge with no `unit` prop, **When** it renders, **Then** only the numeric value is shown, with no dangling unit symbol.
3. **Given** a Gauge with a `label` prop of `"Battery"`, **When** it renders, **Then** the label "Battery" appears as a secondary line beneath the value.

---

### Edge Cases

- What happens when `value` exceeds `max`? The fill should clamp to 100% without visual overflow or errors.
- What happens when `value` is below `min`? The fill should clamp to 0% (empty).
- How does the gauge handle a `min` equal to `max`? Should render as empty with no division-by-zero error.
- What happens when no `value` is provided? The gauge renders in an empty/zero state.
- How does the gauge render at very small sizes (e.g., 48px)? Text labels should hide or truncate gracefully without clipping the arc.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The component MUST accept a numeric `value`, `min` (default: 0), and `max` (default: 100) prop to define the gauge fill proportion.
- **FR-002**: The component MUST clamp the fill to the valid range `[min, max]`; values outside this range must not cause visual overflow or errors.
- **FR-003**: The component MUST render a semi-circular or arc-style gauge that fills proportionally to the normalized value.
- **FR-004**: The component MUST support a `status` prop matching the FVS semantic status vocabulary: `nominal`, `live`, `fault`, `info`, `offline`, `neutral`.
- **FR-005**: The component MUST default to `neutral` status when no `status` prop is provided.
- **FR-006**: The component MUST display the current numeric value as a text label inside or below the arc.
- **FR-007**: The component MUST support an optional `unit` prop appended to the value label (e.g., "42%", "37°C").
- **FR-008**: The component MUST support an optional `label` prop displayed as a secondary descriptor beneath the value.
- **FR-009**: All colors MUST use FVS design token CSS custom properties — no hardcoded hex values.
- **FR-010**: The component MUST be keyboard-accessible and expose a meaningful ARIA role and value to screen readers.
- **FR-011**: The component MUST render correctly in both light and console (dark) themes via the existing token system.

### Key Entities

- **Gauge**: The visual component — arc fill, value label, unit, status color, and optional descriptor label.
- **Status**: Semantic classification (`nominal` | `live` | `fault` | `info` | `offline` | `neutral`) governing fill color.
- **Range**: The `min`/`max` bounds defining the valid value space for fill calculation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The gauge fill visually matches the expected proportion within 1% accuracy across all valid input values.
- **SC-002**: All six status variants render with distinct, token-correct colors that pass axe accessibility contrast checks in both themes.
- **SC-003**: The component passes all axe-core checks in Storybook addon-a11y with zero violations.
- **SC-004**: The component renders correctly at small (64px), medium (128px), and large (256px) sizes without label clipping or arc distortion.
- **SC-005**: Out-of-range clamping is verified — values below `min` and above `max` produce the empty and full states respectively without errors.

## Assumptions

- The gauge will follow existing FVS component conventions: a `src/components/Gauge/` directory with a TypeScript component file and a `.stories.tsx` file.
- The arc shape will be a semi-circle (180° sweep) by default, consistent with common dashboard gauge conventions.
- The component is a pure display element — it does not accept user interaction to change the value.
- Storybook stories will cover all six status variants, boundary values (0, 50, 100), and the label/unit combinations.
- The `status` vocabulary and token naming follows the same pattern established by the existing Badge component.
