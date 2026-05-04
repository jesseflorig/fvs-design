# Tasks: Layout Components

**Input**: Design documents from `/specs/011-layout-components/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/component-props.md, quickstart.md

**Tests**: No separate automated test files are required by the spec. Validation is through Storybook stories, Storybook accessibility checks, typecheck, lint, and Vitest.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of Stack, Navbar, and the broader dashboard layout family.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story the task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the Layout component group and shared export surface.

- [X] T001 Create the Layout component directory at `src/components/Layout/`
- [X] T002 [P] Create the Layout barrel export file at `src/components/Layout/index.ts`
- [X] T003 [P] Create the grouped Layout Storybook file at `src/components/Layout/Layout.stories.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared layout vocabulary, token mappings, and reusable dashboard example fixtures.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 Define shared `LayoutGap`, `StackAlign`, `StackJustify`, navigation item, and density types in `src/components/Layout/types.ts`
- [X] T005 Implement shared token maps for gap, alignment, justification, density, and responsive minimum widths in `src/components/Layout/layoutTokens.ts`
- [X] T006 [P] Create reusable smart home dashboard example data for Overview, Rooms, Climate, Lighting, Security, and Energy navigation in `src/components/Layout/layoutExamples.tsx`
- [X] T007 Export shared layout types and token helpers from `src/components/Layout/index.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Arrange Dashboard Content with Stack (Priority: P1) MVP

**Goal**: Provide a Stack layout primitive that arranges dashboard content vertically or horizontally with tokenized spacing, alignment, and optional wrapping.

**Independent Test**: Compose vertical and horizontal dashboard examples with mixed labels, values, icons, actions, and controls; confirm spacing, alignment, and wrapping remain consistent at compact and standard widths.

### Implementation for User Story 1

- [X] T008 [US1] Implement `Stack` with direction, gap, align, justify, wrap, children, and className support in `src/components/Layout/Stack.tsx`
- [X] T009 [US1] Ensure `Stack` uses only shared token maps for gap/alignment styles in `src/components/Layout/Stack.tsx`
- [X] T010 [P] [US1] Add Stack vertical, horizontal, aligned row, and wrapping examples in `src/components/Layout/Layout.stories.tsx`
- [X] T011 [US1] Export `Stack` and its public types from `src/components/Layout/index.ts`
- [X] T012 [US1] Validate quickstart Scenario 1 in `specs/011-layout-components/quickstart.md`

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Navigate Smart Home Dashboards with Navbar (Priority: P2)

**Goal**: Provide a Navbar component for primary smart home dashboard navigation with active, disabled, leading, trailing, and compact behavior.

**Independent Test**: Display a Navbar with Overview, Rooms, Climate, Lighting, Security, and Energy destinations; confirm active state, disabled state, focus, optional actions, and compact behavior are clear and keyboard-accessible.

### Implementation for User Story 2

- [X] T013 [US2] Implement `Navbar` with items, activeId, leading, actions, label, compactBehavior, and keyboard-operable item rendering in `src/components/Layout/Navbar.tsx`
- [X] T014 [US2] Implement active and disabled navigation state treatment with `aria-current`, disabled semantics, and non-color cues in `src/components/Layout/Navbar.tsx`
- [X] T015 [US2] Ensure Navbar focus styling uses visible amber focus treatment and tokenized visual values in `src/components/Layout/Navbar.tsx`
- [X] T016 [P] [US2] Add Navbar stories for active item, disabled item, leading content, trailing actions, and compact overflow in `src/components/Layout/Layout.stories.tsx`
- [X] T017 [US2] Export `Navbar`, `NavigationItem`, and public Navbar types from `src/components/Layout/index.ts`
- [X] T018 [US2] Validate quickstart Scenario 2 in `specs/011-layout-components/quickstart.md`

**Checkpoint**: User Stories 1 and 2 are both functional and independently reviewable.

---

## Phase 5: User Story 3 - Compose Clean Smart Home Dashboard Layouts (Priority: P3)

**Goal**: Provide additional layout primitives for clean smart home dashboard composition: Cluster, DashboardGrid, DashboardShell, Section, and Sidebar.

**Independent Test**: Assemble a smart home dashboard example with lighting, climate, security, presence, and energy areas using the layout primitives; confirm compact and wide examples have no overlap and use layout components for at least 90% of visible groupings.

### Implementation for User Story 3

- [X] T019 [P] [US3] Implement `Cluster` for wrapping inline groups with gap, align, justify, children, and className support in `src/components/Layout/Cluster.tsx`
- [X] T020 [P] [US3] Implement `DashboardGrid` with gap, minItemWidth, columns, children, and className support in `src/components/Layout/DashboardGrid.tsx`
- [X] T021 [P] [US3] Implement `Section` with title, description, actions, children, empty/loading-friendly structure, and className support in `src/components/Layout/Section.tsx`
- [X] T022 [P] [US3] Implement `DashboardShell` with navbar, sidebar, aside, density, children, and semantic main region in `src/components/Layout/DashboardShell.tsx`
- [X] T023 [P] [US3] Implement `Sidebar` with navigation items, collapsed rail mode, custom children, label, active/disabled semantics, and keyboard focus treatment in `src/components/Layout/Sidebar.tsx`
- [X] T024 [US3] Export `Cluster`, `DashboardGrid`, `Section`, `DashboardShell`, `Sidebar`, and related public types from `src/components/Layout/index.ts`
- [X] T025 [US3] Add Cluster, DashboardGrid, Section, Sidebar, DashboardShell, and integrated smart home dashboard composition stories in `src/components/Layout/Layout.stories.tsx`
- [X] T026 [US3] Validate quickstart Scenario 3 and Scenario 4 in `specs/011-layout-components/quickstart.md`

**Checkpoint**: All required layout components and dashboard composition examples are functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Complete accessibility review, compact/wide layout review, and repository validation.

- [X] T027 Review `src/components/Layout/*.tsx` for token-only visual values, 0-8px radii maximum, no decorative styling, and no unnecessary focus stops
- [X] T028 Run Storybook accessibility checks for every Layout story in `src/components/Layout/Layout.stories.tsx`
- [X] T029 Run compact and wide viewport review for Stack, Navbar, DashboardGrid, Sidebar, and integrated dashboard stories in `src/components/Layout/Layout.stories.tsx`
- [X] T030 Run `npm run typecheck`, `npm run lint`, and `npm test` from the repository root
- [X] T031 Update `specs/011-layout-components/quickstart.md` validation notes with completed accessibility, viewport, and command results

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion - MVP slice
- **User Story 2 (Phase 4)**: Depends on Foundational completion and can start after US1 or in parallel if files are coordinated
- **User Story 3 (Phase 5)**: Depends on Foundational completion and benefits from US1/US2 because dashboard stories compose Stack and Navbar
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependency on US2 or US3
- **User Story 2 (P2)**: Can start after Foundational - no dependency on US1, though dashboard composition later uses both
- **User Story 3 (P3)**: Can start after Foundational, but integrated dashboard examples depend on Stack and Navbar for full validation

### Within Each User Story

- Component implementation before story validation
- Accessibility semantics before quickstart validation
- Exports before repository validation
- Integrated dashboard composition after primitives exist

### Parallel Opportunities

- T002 and T003 can run in parallel during Setup
- T006 can run in parallel with shared token helper work after types are decided
- T010 can run after Stack API is stable and in parallel with export work
- T016 can run after Navbar API is stable and in parallel with export work
- T019 through T023 can run in parallel because they write separate component files
- T027 and T029 can run in parallel after all components and stories exist

---

## Parallel Example: User Story 1

```text
Task: "Implement Stack with direction, gap, align, justify, wrap, children, and className support in src/components/Layout/Stack.tsx"
Task: "Add Stack vertical, horizontal, aligned row, and wrapping examples in src/components/Layout/Layout.stories.tsx"
```

## Parallel Example: User Story 2

```text
Task: "Implement Navbar with items, activeId, leading, actions, label, compactBehavior, and keyboard-operable item rendering in src/components/Layout/Navbar.tsx"
Task: "Add Navbar stories for active item, disabled item, leading content, trailing actions, and compact overflow in src/components/Layout/Layout.stories.tsx"
```

## Parallel Example: User Story 3

```text
Task: "Implement Cluster for wrapping inline groups with gap, align, justify, children, and className support in src/components/Layout/Cluster.tsx"
Task: "Implement DashboardGrid with gap, minItemWidth, columns, children, and className support in src/components/Layout/DashboardGrid.tsx"
Task: "Implement Section with title, description, actions, children, empty/loading-friendly structure, and className support in src/components/Layout/Section.tsx"
Task: "Implement DashboardShell with navbar, sidebar, aside, density, children, and semantic main region in src/components/Layout/DashboardShell.tsx"
Task: "Implement Sidebar with navigation items, collapsed rail mode, custom children, label, active/disabled semantics, and keyboard focus treatment in src/components/Layout/Sidebar.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate Stack independently in Storybook
5. Demo if ready

### Incremental Delivery

1. Complete Setup + Foundational
2. Add User Story 1 -> validate Stack layout
3. Add User Story 2 -> validate Navbar navigation
4. Add User Story 3 -> validate dashboard layout family and composition
5. Complete Polish -> validate accessibility, viewport behavior, and repository commands

### Parallel Team Strategy

With multiple developers:

1. Complete shared types and token helpers together
2. Assign one developer to Navbar/Sidebar semantics
3. Assign one developer to Stack/Cluster/Grid primitives
4. Assign one developer to Section/Shell and integrated stories
5. Run final accessibility and viewport validation after integration

---

## Notes

- [P] tasks use different files or can be done without depending on incomplete implementation details.
- Story labels map to the spec user stories for traceability.
- Keep layout components presentational; do not add routing, fetching, persistence, or smart home state ownership.
- Use existing design-system tokens and component patterns.
- Commit after each story or logical group.
