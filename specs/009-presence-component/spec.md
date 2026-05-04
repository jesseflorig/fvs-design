# Feature Specification: Presence Component

**Feature Branch**: `009-presence-component`  
**Created**: 2026-05-03  
**Status**: Draft  
**Input**: User description: "Create a presence component that shows an Avatar and status (Present|Near|Away). Example avatar images are in src/assets/jpeg/avatar_*. Present shows a blue border with color avatar image. Near shows a yellow border with color avatar image. Away shows a grey border with black and white subdued avatar image."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Show Present Presence (Priority: P1)

A viewer can see a person's avatar marked as Present, with a clear blue status border and the avatar shown in full color.

**Why this priority**: Present is the primary active state and establishes the component's core purpose: communicating who is currently available.

**Independent Test**: Can be fully tested by displaying a presence item with a valid avatar and Present status, then confirming the avatar appears in color and the status border is blue.

**Acceptance Scenarios**:

1. **Given** a person has a valid avatar image and status is Present, **When** the presence component is displayed, **Then** the avatar is shown in color with a blue border.
2. **Given** multiple presence components are shown together, **When** one person is Present, **Then** that person's Present treatment is visually distinguishable from Near and Away states.

---

### User Story 2 - Show Near Presence (Priority: P2)

A viewer can see a person's avatar marked as Near, with a clear yellow status border and the avatar shown in full color.

**Why this priority**: Near is a required intermediate status and must be distinguishable from both active and inactive availability.

**Independent Test**: Can be fully tested by displaying a presence item with a valid avatar and Near status, then confirming the avatar appears in color and the status border is yellow.

**Acceptance Scenarios**:

1. **Given** a person has a valid avatar image and status is Near, **When** the presence component is displayed, **Then** the avatar is shown in color with a yellow border.
2. **Given** a viewer compares Present and Near people, **When** both components are visible, **Then** the border colors clearly communicate different statuses without changing avatar clarity.

---

### User Story 3 - Show Away Presence (Priority: P3)

A viewer can see a person's avatar marked as Away, with a grey status border and the avatar shown as black and white with a subdued appearance.

**Why this priority**: Away completes the required status set and communicates reduced availability through both border and avatar treatment.

**Independent Test**: Can be fully tested by displaying a presence item with a valid avatar and Away status, then confirming the avatar appears subdued in black and white and the status border is grey.

**Acceptance Scenarios**:

1. **Given** a person has a valid avatar image and status is Away, **When** the presence component is displayed, **Then** the avatar is shown in a black and white subdued treatment with a grey border.
2. **Given** a viewer scans a list of people, **When** one or more people are Away, **Then** Away people appear less visually prominent than Present or Near people while still remaining identifiable.

### Edge Cases

- If the avatar image is missing or cannot be loaded, the component still communicates the person's status and provides a stable avatar fallback.
- If a status value outside Present, Near, or Away is provided, the component treats it as Away so the person is not incorrectly shown as available.
- If the avatar image has low contrast, the border treatment remains visible enough to identify the status.
- If the component is shown at compact sizes, the avatar and border remain recognizable and do not crop important avatar content.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The component MUST display an avatar image for a person.
- **FR-002**: The component MUST support exactly three presence statuses: Present, Near, and Away.
- **FR-003**: The component MUST show Present with a blue border around the avatar and a full-color avatar image.
- **FR-004**: The component MUST show Near with a yellow border around the avatar and a full-color avatar image.
- **FR-005**: The component MUST show Away with a grey border around the avatar and a black and white subdued avatar image.
- **FR-006**: The component MUST provide a text-accessible status value so the status is available without relying only on color.
- **FR-007**: The component MUST preserve avatar recognizability across all statuses, including the subdued Away treatment.
- **FR-008**: The component MUST handle missing or failed avatar images with a fallback that does not break layout.
- **FR-009**: The component MUST keep its visible shape and spacing stable when the status changes between Present, Near, and Away.
- **FR-010**: The component MUST be demonstrable using provided example avatar images.

### Key Entities

- **Person**: The individual represented by the presence component; includes an avatar image and optional display identity used for accessible labeling.
- **Presence Status**: The person's availability state; one of Present, Near, or Away.
- **Avatar Image**: The visual representation of the person; displayed in color for Present and Near, and black and white subdued for Away.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In visual review, 100% of the three supported statuses are identifiable from the component treatment.
- **SC-002**: At least 9 out of 10 reviewers can correctly distinguish Present, Near, and Away states after viewing example components for 5 seconds.
- **SC-003**: The component remains visually stable with no layout shift when switching a displayed person among all three statuses.
- **SC-004**: Away avatars are consistently perceived as less available than Present and Near avatars in user review.
- **SC-005**: The status remains understandable when color alone is insufficient, verified by the presence of a text-accessible status for every displayed component.

## Assumptions

- The component is part of a presentational design library and does not persist or fetch presence data.
- The component receives a person's avatar image and status from its consumer.
- The example avatar images are used for demonstration and test coverage, not as required production data.
- Present, Near, and Away labels are user-facing terms and should remain consistent wherever the component is demonstrated.
- Compact and standard display sizes are in scope; complex group presence behavior is out of scope for this feature.
