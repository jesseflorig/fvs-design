# Tasks: Presence Component

**Input**: Design documents from `/specs/009-presence-component/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/component-props.md, quickstart.md

**Tests**: No separate automated test files are required by the spec. Validation is through Storybook stories, Storybook accessibility checks, typecheck, lint, and Vitest.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each status treatment.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story the task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the component location and confirm demo assets are available.

- [X] T001 Create the Presence component directory at `src/components/Presence/`
- [X] T002 [P] Verify the example avatar fixtures exist at `src/assets/jpeg/avatar_jesse.jpeg`, `src/assets/jpeg/avatar_carolyn.jpeg`, and `src/assets/jpeg/avatar_hank.jpeg`
- [X] T003 [P] Create the component barrel export file at `src/components/Presence/index.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared public contract and base layout that every status story uses.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 Define `PresenceStatus`, `PresenceSize`, `PresencePerson`, and `PresenceProps` in `src/components/Presence/Presence.tsx`
- [X] T005 Implement shared initials fallback, accessible summary, size map, and stable avatar frame helpers in `src/components/Presence/Presence.tsx`
- [X] T006 Implement token-based base styles for layout, avatar frame, fallback, image crop, and status label in `src/components/Presence/Presence.tsx`
- [X] T007 Export `Presence` and its public types from `src/components/Presence/index.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Show Present Presence (Priority: P1) MVP

**Goal**: A viewer can see a person's avatar marked as Present with a blue border, color avatar image, and text-accessible status.

**Independent Test**: Display a valid avatar with Present status and confirm the avatar is full color, the border is blue, and the status is available as text or assistive text.

### Implementation for User Story 1

- [X] T008 [US1] Implement Present status normalization, label, blue token border, and color image treatment in `src/components/Presence/Presence.tsx`
- [X] T009 [US1] Render visible or assistive Present status text so color is not the only status signal in `src/components/Presence/Presence.tsx`
- [X] T010 [P] [US1] Create the Presence Storybook metadata and Present story using `avatar_jesse.jpeg` in `src/components/Presence/Presence.stories.tsx`
- [X] T011 [US1] Add the Present component export coverage to `src/components/Presence/index.ts`
- [X] T012 [US1] Validate the Present story against quickstart Scenario 1 in `specs/009-presence-component/quickstart.md`

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Show Near Presence (Priority: P2)

**Goal**: A viewer can see a person's avatar marked as Near with a yellow/amber border, color avatar image, and status distinct from Present.

**Independent Test**: Display a valid avatar with Near status and confirm the avatar is full color, the border is yellow/amber, and the status is distinguishable from Present without relying only on color.

### Implementation for User Story 2

- [X] T013 [US2] Implement Near status normalization, label, yellow/amber token border, and color image treatment in `src/components/Presence/Presence.tsx`
- [X] T014 [US2] Ensure Near and Present preserve identical avatar dimensions, crop, and layout spacing in `src/components/Presence/Presence.tsx`
- [X] T015 [P] [US2] Add the Near story using `avatar_carolyn.jpeg` in `src/components/Presence/Presence.stories.tsx`
- [X] T016 [US2] Validate the Near story against quickstart Scenario 2 in `specs/009-presence-component/quickstart.md`

**Checkpoint**: User Stories 1 and 2 are both functional and independently reviewable.

---

## Phase 5: User Story 3 - Show Away Presence (Priority: P3)

**Goal**: A viewer can see a person's avatar marked as Away with a grey border and black-and-white subdued avatar image.

**Independent Test**: Display a valid avatar with Away status and confirm the avatar is black and white, visually subdued, grey bordered, still identifiable, and less prominent than Present or Near.

### Implementation for User Story 3

- [X] T017 [US3] Implement Away status normalization, label, grey token border, and black-and-white subdued image treatment in `src/components/Presence/Presence.tsx`
- [X] T018 [US3] Implement unsupported runtime status fallback to Away treatment in `src/components/Presence/Presence.tsx`
- [X] T019 [US3] Implement missing or failed avatar fallback behavior that preserves status border and layout in `src/components/Presence/Presence.tsx`
- [X] T020 [P] [US3] Add Away, Missing Avatar, and unsupported-status fallback stories using `avatar_hank.jpeg` in `src/components/Presence/Presence.stories.tsx`
- [X] T021 [US3] Validate the Away and Missing Avatar stories against quickstart Scenarios 3 and 5 in `specs/009-presence-component/quickstart.md`

**Checkpoint**: All required statuses and fallback behavior are functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Complete comparison stories, accessibility review, and repo validation.

- [X] T022 [P] Add All Statuses, Compact, and Status Label Hidden stories in `src/components/Presence/Presence.stories.tsx`
- [X] T023 Review `src/components/Presence/Presence.tsx` for token-only visual values, 0-8px radii except circular avatar clipping, and no decorative styling
- [X] T024 Run Storybook accessibility checks for every Presence story documented in `src/components/Presence/Presence.stories.tsx`
- [X] T025 Run quickstart Scenario 4, Scenario 6, and Scenario 7 from `specs/009-presence-component/quickstart.md`
- [X] T026 Run `npm run typecheck`, `npm run lint`, and `npm test` from the repository root
- [X] T027 Update `specs/009-presence-component/quickstart.md` validation notes with completed verification results

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion - MVP slice
- **User Story 2 (Phase 4)**: Depends on Foundational completion; safest after US1 because both extend the same component file
- **User Story 3 (Phase 5)**: Depends on Foundational completion; safest after US1 because Away adds fallback and invalid-status behavior to the same component file
- **Polish (Phase 6)**: Depends on selected user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependency on US2 or US3
- **User Story 2 (P2)**: Can start after Foundational, but sequential execution after US1 avoids same-file conflicts in `src/components/Presence/Presence.tsx`
- **User Story 3 (P3)**: Can start after Foundational, but sequential execution after US1 avoids same-file conflicts in `src/components/Presence/Presence.tsx`

### Within Each User Story

- Component behavior before story validation
- Status treatment before comparison stories
- Fallback behavior before Missing Avatar validation
- Story complete before moving to the next priority when working sequentially

### Parallel Opportunities

- T002 and T003 can run in parallel during Setup
- T010 can run after Storybook metadata exists and in parallel with final US1 validation preparation
- T015 can run in parallel with Near visual review if `Presence.stories.tsx` is not being edited by another task
- T020 can run in parallel with Away visual review if `Presence.stories.tsx` is not being edited by another task
- T022 can run in parallel with T023 after all status behavior exists

---

## Parallel Example: User Story 1

```text
Task: "Implement Present status normalization, label, blue token border, and color image treatment in src/components/Presence/Presence.tsx"
Task: "Create the Presence Storybook metadata and Present story using avatar_jesse.jpeg in src/components/Presence/Presence.stories.tsx"
```

## Parallel Example: User Story 2

```text
Task: "Implement Near status normalization, label, yellow/amber token border, and color image treatment in src/components/Presence/Presence.tsx"
Task: "Add the Near story using avatar_carolyn.jpeg in src/components/Presence/Presence.stories.tsx"
```

## Parallel Example: User Story 3

```text
Task: "Implement Away status normalization, label, grey token border, and black-and-white subdued image treatment in src/components/Presence/Presence.tsx"
Task: "Add Away, Missing Avatar, and unsupported-status fallback stories using avatar_hank.jpeg in src/components/Presence/Presence.stories.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate Present independently in Storybook
5. Demo if ready

### Incremental Delivery

1. Complete Setup + Foundational
2. Add User Story 1 -> validate Present -> demo MVP
3. Add User Story 2 -> validate Near independently and against Present
4. Add User Story 3 -> validate Away and fallback behavior
5. Complete Polish -> validate comparison, compact, accessibility, and command checks

### Parallel Team Strategy

With multiple developers:

1. Complete Setup and Foundational together
2. Assign component behavior tasks and story tasks carefully because `Presence.tsx` and `Presence.stories.tsx` are shared files
3. Prefer one developer owning `Presence.tsx` while another prepares Storybook examples
4. Run final validation after merging all status treatments

---

## Notes

- [P] tasks use different files or can be done without depending on incomplete implementation details.
- Story labels map to the spec user stories for traceability.
- Avoid hardcoded visual values in `src/components/Presence/Presence.tsx`; use existing CSS variables or paired token additions only if required.
- Status must remain understandable without color alone.
- Commit after each story or logical group.
