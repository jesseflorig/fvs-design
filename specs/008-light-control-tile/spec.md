# Feature Specification: Light Control Tile

**Feature Branch**: `008-light-control-tile`  
**Created**: 2026-04-25  
**Status**: Draft  
**Input**: User description: "Create a Light Control Tile that supports control and status for dimmer, tunable warmth, night mode (Red LED light toggle)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Control Light Brightness (Priority: P1)

A home operator can view the current state of a light and adjust its dimmer level from a compact control tile without leaving the control surface.

**Why this priority**: Brightness control is the core task for a light tile. The tile must be useful even if warmth and night mode controls are delivered later.

**Independent Test**: Display a light tile with a known brightness value, change the dimmer level, and confirm the tile shows the updated level and appropriate on/off status.

**Acceptance Scenarios**:

1. **Given** a light is on at 70% brightness, **When** the tile is displayed, **Then** the user sees the light name, on status, and 70% dimmer level.
2. **Given** a light is on, **When** the user changes brightness to 35%, **Then** the tile presents 35% as the current dimmer level.
3. **Given** a light brightness is set to 0%, **When** the tile updates, **Then** the tile communicates the light as off or effectively off.

---

### User Story 2 - Tune Light Warmth (Priority: P2)

A home operator can see and adjust the color warmth of a tunable light so the room can move between cooler task lighting and warmer ambient lighting.

**Why this priority**: Warmth is a common smart-light control that changes comfort and use case, but it depends on a light tile already communicating the primary light state.

**Independent Test**: Display a tile with a known warmth setting, adjust the warmth, and confirm the tile shows the new warmth status in clear user-facing terms.

**Acceptance Scenarios**:

1. **Given** a light is set to warm ambient output, **When** the tile is displayed, **Then** the user sees a warmth status that clearly communicates warm output.
2. **Given** a light supports warmth tuning, **When** the user adjusts through Cool White, Daylight, Neutral White, Soft White, Warm White, and Candlelight, **Then** the tile presents the updated warmth setting.
3. **Given** a light does not support warmth tuning, **When** the tile is displayed, **Then** warmth controls are not presented as available controls.

---

### User Story 3 - Toggle Night Mode (Priority: P3)

A home operator can enable or disable night mode for a light, using red LED output as the visual mode for low-light conditions.

**Why this priority**: Night mode is a specialized secondary control. It should be available when supported, but it must not obscure brightness and warmth status.

**Independent Test**: Display a tile with night mode off, toggle night mode on, and confirm the tile communicates that red LED night mode is active.

**Acceptance Scenarios**:

1. **Given** night mode is off, **When** the user toggles night mode on, **Then** the tile presents night mode as active and identifies the red LED mode.
2. **Given** night mode is active, **When** the user toggles night mode off, **Then** the tile presents normal light control status again.
3. **Given** a light does not support red LED night mode, **When** the tile is displayed, **Then** the night mode control is not presented as available.

---

### User Story 4 - Understand Light Availability and Updates (Priority: P4)

A home operator can tell whether a light is online, unavailable, updating, or in transition while still seeing the last known dimmer, warmth, and night mode status when useful.

**Why this priority**: Status prevents false confidence when a control is unavailable or still applying a change, but it is less valuable without the primary controls.

**Independent Test**: Display the tile in available, unavailable, and transitioning states and confirm each state is communicated clearly with no reliance on color alone.

**Acceptance Scenarios**:

1. **Given** a light is unavailable, **When** the tile is displayed, **Then** the user sees an unavailable status and any controls that cannot be used are clearly unavailable.
2. **Given** a brightness or warmth change is being applied, **When** the tile is displayed, **Then** the user sees an updating or transitioning status.
3. **Given** a light reports a recent successful update, **When** the tile is displayed, **Then** the tile shows the current status without stale or conflicting state labels.

### Edge Cases

- Brightness values below the supported minimum are treated as the minimum; values above the supported maximum are treated as the maximum.
- A tile may represent a simple dimmable light, a tunable white light, or a light with red LED night mode; unsupported capabilities must not appear as actionable controls.
- If the light is unavailable, the tile must still communicate last known status without implying that a new command can be completed.
- If night mode is active, the tile must make clear that the light is using red LED mode rather than ordinary warm white output.
- If a change is in progress, the tile must avoid presenting both the old and new states as simultaneously final.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The tile MUST show the light name and primary light status.
- **FR-002**: The tile MUST show the current dimmer level as a percentage from 0% to 100% when dimming is supported.
- **FR-003**: Users MUST be able to change the dimmer level when the light is available and dimming is supported.
- **FR-004**: The tile MUST communicate off or effectively off status when brightness is 0%.
- **FR-005**: The tile MUST show the current warmth setting when tunable warmth is supported.
- **FR-006**: Users MUST be able to adjust warmth when the light is available and tunable warmth is supported.
- **FR-007**: The tile MUST hide or clearly disable warmth control when the light does not support tunable warmth.
- **FR-008**: The tile MUST show whether red LED night mode is active when night mode is supported.
- **FR-009**: Users MUST be able to toggle red LED night mode when the light is available and night mode is supported.
- **FR-010**: The tile MUST hide or clearly disable night mode control when the light does not support red LED night mode.
- **FR-011**: The tile MUST communicate unavailable, updating, and normal states using text or accessible labels, not color alone.
- **FR-012**: The tile MUST prevent unavailable controls from appearing operable when the light cannot accept commands.
- **FR-013**: The tile MUST preserve a clear status summary when multiple capabilities are present, including brightness, warmth, and night mode.
- **FR-014**: The tile MUST provide meaningful names for each interactive control so users can identify brightness, warmth, and night mode actions.
- **FR-015**: The tile MUST support compact presentation without truncating the light name, primary status, or current control values beyond recognition.

### Key Entities

- **Light Control Tile**: A compact control surface for a single light, including identity, status, supported capabilities, and available actions.
- **Dimmer Level**: The current brightness value, expressed as a bounded percentage from 0% to 100%.
- **Warmth Setting**: The current white-light warmth, expressed as Cool White, Daylight, Neutral White, Soft White, Warm White, or Candlelight.
- **Night Mode State**: Whether red LED night mode is active, inactive, unsupported, or unavailable.
- **Availability Status**: Whether the light can currently report status and accept commands, including normal, unavailable, and updating states.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can identify a light's brightness, warmth, night mode, and availability status from the tile in under 5 seconds.
- **SC-002**: Users can complete a brightness adjustment from the tile in one direct interaction sequence.
- **SC-003**: Users can complete a warmth adjustment from the tile in one direct interaction sequence when warmth is supported.
- **SC-004**: Users can toggle red LED night mode from the tile in one direct interaction when night mode is supported.
- **SC-005**: In validation, 100% of unavailable or unsupported controls are either hidden or clearly communicated as unavailable.
- **SC-006**: In accessibility validation, every status and control can be understood without relying on color alone.

## Assumptions

- The tile represents one light or light group at a time.
- Brightness uses a 0% to 100% scale because that is the common smart-light dimmer model.
- Warmth can be represented with user-facing terms rather than requiring numeric color temperature in the first version.
- Red LED night mode is a distinct mode from warm white output.
- Unsupported capabilities should be omitted or disabled rather than shown as broken controls.
- The feature covers the user-facing tile behavior and status model, not device pairing, automation schedules, or multi-room scene orchestration.
