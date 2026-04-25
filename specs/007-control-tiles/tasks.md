# Tasks: Control Tiles

**Input**: Design documents from `/specs/007-control-tiles/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No explicit TDD or test-first requirement was specified. Validation work is included through Storybook stories, accessibility review, Storybook build validation, and quickstart scenario coverage.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths below follow the single-project component library structure defined in `plan.md`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Reset the Control Tiles feature surface to the revised uniform-footprint direction

- [X] T001 Audit the current Control Tiles implementation against the revised plan in `src/components/ControlTiles/`
- [X] T002 [P] Update the public category export surface for the revised contracts in `src/components/ControlTiles/index.ts`
- [X] T003 [P] Prepare revised fixture scaffolding for uniform tiles in `src/components/ControlTiles/fixtures/controlTileExamples.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the revised shared contracts, layout rules, and tokens before user story work begins

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 Rewrite shared Control Tile types to the revised contract in `src/components/ControlTiles/types.ts`
- [X] T005 Rewrite layout utilities for uniform, non-overlapping grid templates in `src/components/ControlTiles/layout.ts`
- [X] T006 Update Control Tile spacing, footprint, and state tokens in `src/tokens/tokens.css`
- [X] T007 Update Tailwind token exposure for the revised Control Tile tokens in `tailwind.config.ts`
- [X] T008 Rewrite fixture data to remove mixed-size assumptions and express minimal toggle/status tiles in `src/components/ControlTiles/fixtures/controlTileExamples.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Read Minimal Device Status at a Glance (Priority: P1) 🎯 MVP

**Goal**: Deliver a calm, minimal tile that makes device state readable without secondary navigation

**Independent Test**: Render uniform tiles in Storybook and verify that users can identify title, state, and urgency within the minimal tile format without using any controls.

### Implementation for User Story 1

- [X] T009 [US1] Refactor the base tile surface to a single uniform footprint in `src/components/ControlTiles/ControlTile/ControlTile.tsx`
- [X] T010 [US1] Implement minimal status rendering for off, on, warning, unavailable, and summary states in `src/components/ControlTiles/ControlTile/ControlTile.tsx`
- [X] T011 [US1] Update Storybook scenarios for minimal device and summary tiles in `src/components/ControlTiles/ControlTile/ControlTile.stories.tsx`
- [X] T012 [US1] Update quick-glance fixture examples used by the stories in `src/components/ControlTiles/fixtures/controlTileExamples.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Trigger Common Actions Without Leaving the Grid (Priority: P2)

**Goal**: Add explicit toggle behavior and restrained in-tile controls without breaking the minimal visual model

**Independent Test**: Render interactive toggle tiles in Storybook and verify that users can switch a device state directly from the tile while clearly seeing off, on, transitioning, and unavailable states.

### Implementation for User Story 2

- [X] T013 [US2] Implement the revised toggle interaction contract in `src/components/ControlTiles/ControlTile/ControlTile.tsx`
- [X] T014 [US2] Implement selected, disabled, and transitioning visual states for toggle tiles in `src/components/ControlTiles/ControlTile/ControlTile.tsx`
- [X] T015 [US2] Add keyboard-operable toggle behavior and focus treatment in `src/components/ControlTiles/ControlTile/ControlTile.tsx`
- [X] T016 [US2] Update Storybook scenarios for on, off, transitioning, and unavailable toggles in `src/components/ControlTiles/ControlTile/ControlTile.stories.tsx`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Maintain a Usable Layout Across Orientation Changes (Priority: P3)

**Goal**: Deliver a responsive grid that preserves uniform tile footprint and guarantees non-overlapping placement in portrait and landscape

**Independent Test**: Render the same uniform tile collection in portrait and landscape stories and confirm consistent footprint, non-overlapping placement, predictable order, and coherent partially filled rows.

### Implementation for User Story 3

- [X] T017 [US3] Refactor the grid component to remove per-item size assumptions in `src/components/ControlTiles/ControlTileGrid/ControlTileGrid.tsx`
- [X] T018 [US3] Implement uniform-cell portrait and landscape grid templates with non-overlapping placement guarantees in `src/components/ControlTiles/ControlTileGrid/ControlTileGrid.tsx`
- [X] T019 [US3] Update grid fixtures for uniform-tile portrait and landscape arrangements in `src/components/ControlTiles/fixtures/controlTileExamples.ts`
- [X] T020 [US3] Update Storybook scenarios for uniform-grid, portrait-grid, and partial-row layouts in `src/components/ControlTiles/ControlTileGrid/ControlTileGrid.stories.tsx`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final consistency, accessibility, and documentation work across the revised category

- [X] T021 [P] Refine Control Tile copy and visible labels for minimal residential-control clarity in `src/components/ControlTiles/ControlTile/ControlTile.stories.tsx`
- [X] T022 [P] Run and address Storybook accessibility review for the revised tile component in `src/components/ControlTiles/ControlTile/ControlTile.stories.tsx`
- [X] T023 [P] Run and address Storybook accessibility review for the revised uniform grid in `src/components/ControlTiles/ControlTileGrid/ControlTileGrid.stories.tsx`
- [X] T024 Validate all revised quickstart scenarios against the implemented stories in `specs/007-control-tiles/quickstart.md`
- [X] T025 Update design-system documentation to describe the revised uniform Control Tiles category in `README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion
- **User Story 2 (Phase 4)**: Depends on User Story 1 because toggle behavior builds on the revised minimal tile surface
- **User Story 3 (Phase 5)**: Depends on Foundational completion and uses the revised tile contract for final validation
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependency on other stories
- **User Story 2 (P2)**: Depends on User Story 1's revised minimal tile structure
- **User Story 3 (P3)**: Can begin after Foundational for grid refactor work, but final validation depends on the revised tile contract from US1 and US2

### Within Each User Story

- Shared contracts and layout rules before component refactors
- Base tile surface before toggle behaviors
- Fixture updates before Storybook validation
- Story complete before moving to cross-cutting polish

### Parallel Opportunities

- `T002` and `T003` can run in parallel after `T001`
- `T006` and `T007` can run in parallel after `T004` and `T005`
- `T021`, `T022`, and `T023` can run in parallel during polish

---

## Parallel Example: User Story 1

```bash
# Once the revised tile surface is defined, fixture and story updates can split:
Task: "T011 [US1] Update Storybook scenarios for minimal device and summary tiles in src/components/ControlTiles/ControlTile/ControlTile.stories.tsx"
Task: "T012 [US1] Update quick-glance fixture examples used by the stories in src/components/ControlTiles/fixtures/controlTileExamples.ts"
```

---

## Parallel Example: User Story 3

```bash
# After the grid contract is stabilized, fixture and story work can split:
Task: "T019 [US3] Update grid fixtures for uniform-tile portrait and landscape arrangements in src/components/ControlTiles/fixtures/controlTileExamples.ts"
Task: "T020 [US3] Update Storybook scenarios for uniform-grid, portrait-grid, and partial-row layouts in src/components/ControlTiles/ControlTileGrid/ControlTileGrid.stories.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate minimal status tiles in Storybook as the MVP

### Incremental Delivery

1. Complete Setup + Foundational
2. Add User Story 1 and validate quick-glance minimal tiles
3. Add User Story 2 and validate toggle states and direct control
4. Add User Story 3 and validate portrait/landscape non-overlapping grid behavior
5. Finish with polish and documentation

### Parallel Team Strategy

With multiple developers:

1. One developer rewrites contracts, layout utilities, and tokens
2. One developer refactors `ControlTile` to the new minimal/toggle model
3. One developer refactors `ControlTileGrid` once the uniform layout contract stabilizes

---

## Notes

- [P] tasks = different files, low coupling, or safe parallel sequencing
- [Story] labels map tasks to specific user stories for traceability
- Each user story phase yields a demonstrable Storybook increment
- All tasks include exact file paths and follow the required checklist format
