# Research: Light Control Tile

**Branch**: `008-light-control-tile` | **Date**: 2026-04-25

## Decision 1: Specialized Light Control Tile

**Decision**: Add a specialized `LightControlTile` within the Control Tiles category instead of expanding the generic `ControlTile` to cover dimmer, warmth, and red LED night mode controls.

**Rationale**: The generic tile currently communicates status and simple press/toggle actions. A light tile needs multiple capability-specific controls and a richer status summary. Keeping it specialized avoids turning the generic tile into an overloaded component with many optional behaviors that only apply to lighting.

**Alternatives considered**:

- Extend `ControlTile` with brightness, warmth, and night-mode props: rejected because it would make the base component harder to reason about and test.
- Compose a light tile externally from generic `ControlTile` and separate inputs: rejected because compact layout, status summary, and unsupported capability behavior need a cohesive contract.

## Decision 2: Brightness Model

**Decision**: Represent dimmer level as a bounded percentage from 0 to 100.

**Rationale**: The feature spec already defines brightness as 0-100%, and this matches common smart-light user expectations. It is simple to validate, easy to announce accessibly, and maps cleanly to slider interaction.

**Alternatives considered**:

- Device-native brightness units: rejected because they leak integration detail into the design-system component.
- Discrete low/medium/high settings: rejected because dimming needs more precise control than three states.

## Decision 3: Warmth Model

**Decision**: Represent warmth with user-facing terms and an optional normalized control value, using Cool White, Daylight, Neutral White, Soft White, Warm White, and Candlelight as the ordered labels for the first release.

**Rationale**: The spec asks for tunable warmth but explicitly assumes user-facing terms rather than numeric color temperature. A normalized control supports adjustment without forcing Kelvin values into the UI.

**Alternatives considered**:

- Numeric Kelvin-only warmth: rejected for first release because it is less approachable and was not required by the spec.
- Binary warm/cool toggle: rejected because tunable warmth implies intermediate values.

## Decision 4: Night Mode Representation

**Decision**: Treat night mode as a separate red LED switch with explicit active/inactive text, not as a warmth setting.

**Rationale**: Red LED night mode is functionally different from warm white output. The tile must avoid confusing red LED mode with the warm end of tunable white.

**Alternatives considered**:

- Fold red LED into warmth scale: rejected because it conflates two device modes.
- Use color-only indication: rejected by accessibility requirements and constitution.

## Decision 5: Unsupported and Unavailable Capabilities

**Decision**: Omit unsupported controls by default. Use disabled controls only when the capability is supported but the light is temporarily unavailable or updating.

**Rationale**: Omission keeps compact tiles clear and prevents users from interpreting unsupported capabilities as broken. Disabled controls are appropriate when the feature exists but cannot currently accept input.

**Alternatives considered**:

- Always show all controls disabled when unsupported: rejected because it adds clutter and creates unnecessary explanation burden.
- Show an unsupported warning for each absent capability: rejected because absence is sufficient when the tile status still communicates available capabilities.

## Decision 6: Accessibility Interaction Patterns

**Decision**: Brightness and warmth controls use slider semantics; night mode uses switch semantics; all controls have explicit accessible names and visible 2px amber focus states.

**Rationale**: Slider and switch are the expected semantics for continuous adjustment and binary mode toggling. This aligns with existing `Slider` and `Input.Toggle` patterns in the repo and with the constitution's keyboard-first accessibility rule.

**Alternatives considered**:

- Button-only increment/decrement controls: acceptable as a future enhancement but less direct for the first version.
- Pointer-only custom controls: rejected because keyboard operation is mandatory.

## Decision 7: Visual Treatment

**Decision**: Keep the tile surface in the existing neutral Control Tiles language and use restrained status text plus small tokenized indicators for brightness, warmth, and red LED night mode.

**Rationale**: This preserves the FVS NASA/IBM design language and avoids a consumer smart-home palette. Red LED mode must be identifiable, but it should not turn the entire component into a red decorative surface.

**Alternatives considered**:

- Full-color mode backgrounds: rejected as too decorative and likely to conflict with contrast requirements.
- Icon-only status: rejected because status cannot rely on icons or color alone.
