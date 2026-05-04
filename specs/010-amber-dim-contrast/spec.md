# Feature Specification: Amber Dim Contrast

**Feature Branch**: `010-amber-dim-contrast`  
**Created**: 2026-05-04  
**Status**: Draft  
**Input**: User description: "Update the amber dim color to be as light as possible while still maintaining passing a11y contrast check. Update the signal semantic caption to be correct for light surfaces."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Maximize Readable Amber Dim (Priority: P1)

A design-system viewer can see the dim amber signal color as bright as accessibility allows while still passing contrast requirements on light surfaces.

**Why this priority**: The token must remain usable for live/active semantic text on light backgrounds. If it becomes too light, components using the token can fail accessibility checks.

**Independent Test**: Can be tested by comparing the updated dim amber value against the standard light background surfaces and confirming it passes the required contrast threshold while no lighter amber candidate also passes.

**Acceptance Scenarios**:

1. **Given** the light color tokens are displayed, **When** the dim amber token is viewed as text or semantic signal on the default light background, **Then** the color is the lightest amber value that still passes accessibility contrast.
2. **Given** the elevated light surface is used, **When** the dim amber token appears as normal-sized semantic text, **Then** it passes accessibility contrast on that surface.

---

### User Story 2 - Correct Signal Semantic Caption (Priority: P2)

A design-system viewer can read the signal semantic token caption and understand that dim amber is intended for accessible amber signaling on light surfaces.

**Why this priority**: The current caption can mislead consumers into using the token in the wrong theme context.

**Independent Test**: Can be tested by viewing the Signal Semantic color story and confirming the dim amber caption accurately describes light-surface usage.

**Acceptance Scenarios**:

1. **Given** the Signal Semantic color story is open, **When** the viewer reads the dim amber caption, **Then** the caption identifies the token as amber for light surfaces or accessible amber text on light surfaces.
2. **Given** a consumer compares the regular amber and dim amber captions, **When** they choose a token for live/active text on light backgrounds, **Then** the captions make the accessible choice clear.

### Edge Cases

- If multiple amber values meet the contrast threshold, the selected value is the lightest passing candidate.
- If a candidate passes on the default light background but fails on elevated light surfaces, it is rejected.
- If automated accessibility checks include both light and console themes, the change must not create a new failure in either theme.
- If the caption changes, it must not imply that dim amber is the preferred token for dark surfaces.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The dim amber design token MUST be updated to the lightest amber value that still passes accessibility contrast for normal text on supported light surfaces.
- **FR-002**: The selected dim amber value MUST pass contrast against the default light page background and elevated light surface.
- **FR-003**: The selected dim amber value MUST remain visually recognizable as amber and aligned with the existing signal palette.
- **FR-004**: The regular amber accent token MUST remain unchanged.
- **FR-005**: Any semantic role token that derives from dim amber for light surfaces MUST continue to resolve to the updated accessible amber value.
- **FR-006**: The Signal Semantic color documentation MUST update the dim amber caption to describe its correct light-surface role.
- **FR-007**: The updated caption MUST avoid describing dim amber as a dark-surface token.
- **FR-008**: Accessibility validation MUST confirm that the updated token and caption story produce no new contrast failures.

### Key Entities

- **Dim Amber Token**: The muted amber signal color used where full amber is too light for accessible text on light surfaces.
- **Signal Semantic Caption**: The user-facing description in the color token reference that explains the token's intended role.
- **Light Surface**: A supported light theme background or elevated surface where semantic text and signal labels may appear.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The updated dim amber value achieves at least a 4.5:1 contrast ratio for normal text on the default light page background.
- **SC-002**: The updated dim amber value achieves at least a 4.5:1 contrast ratio for normal text on the elevated light surface.
- **SC-003**: No lighter amber candidate within the selected hue family also passes the required contrast checks on all supported light surfaces.
- **SC-004**: The Signal Semantic story caption for dim amber correctly describes light-surface usage in one concise sentence fragment.
- **SC-005**: Automated accessibility checks report zero new violations for the color token story after the update.

## Assumptions

- WCAG AA contrast for normal text uses a minimum 4.5:1 ratio.
- Supported light surfaces are the default light page background and elevated light surface shown in the design system.
- The change is limited to the dim amber token and its documentation caption; broader palette redesign is out of scope.
- The regular amber token remains the accent/focus/live color where contrast is not used for normal text on light backgrounds.
