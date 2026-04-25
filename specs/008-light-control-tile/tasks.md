# Tasks: Light Control Tile

**Input**: Design documents from `/specs/008-light-control-tile/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅, quickstart.md ✅

**Tests**: No TDD test files requested. Validation is via Storybook stories, Storybook addon-a11y, Vitest Storybook runner, TypeScript, ESLint, and quickstart scenarios.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the Light Control Tile feature structure and establish local examples without changing behavior yet.

- [x] T001 Create `src/components/ControlTiles/LightControlTile/` for the new specialized light tile component files
- [x] T002 [P] Create placeholder fixture module `src/components/ControlTiles/fixtures/lightControlTileExamples.ts`
- [x] T003 [P] Create placeholder Storybook file `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define the public contract, shared helpers, exports, and base shell required by every user story.

**CRITICAL**: No user story work should begin until the shared component contract and shell are complete.

- [x] T004 Add light tile public types from `specs/008-light-control-tile/contracts/component-props.md` to `src/components/ControlTiles/types.ts`
- [x] T005 Implement shared clamp, percent, warmth-label, and status-summary helpers in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T006 Implement the base `LightControlTile` shell with title, subtitle, primary status, compact tile frame, tokenized styling, and generated accessible summary in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T007 Export `LightControlTile` and its public light-control types from `src/components/ControlTiles/index.ts`
- [x] T008 Add base Storybook metadata, preview-width wrapper, and common args configuration in `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`

**Checkpoint**: The component imports, exports, and renders a non-interactive light tile shell without TypeScript or lint errors.

---

## Phase 3: User Story 1 - Control Light Brightness (Priority: P1) MVP

**Goal**: Users can view and adjust a dimmer level from the tile, including an effectively-off 0% state.

**Independent Test**: Display a light tile at 70%, change brightness to 35%, and confirm the tile shows 35%; display 0% and confirm the status communicates off/effectively off.

### Implementation for User Story 1

- [x] T009 [P] [US1] Add dimmable and effectively-off example props in `src/components/ControlTiles/fixtures/lightControlTileExamples.ts`
- [x] T010 [US1] Render brightness value, brightness status text, and off/effectively-off state handling in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T011 [US1] Add keyboard-operable brightness slider semantics, `aria-valuetext`, focus ring, clamping, and `onBrightnessChange` support in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T012 [US1] Add `Dimmable` and `EffectivelyOff` stories with interactive brightness state in `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`
- [x] T013 [US1] Validate Scenario 1 and Scenario 2 from `specs/008-light-control-tile/quickstart.md` against `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`

**Checkpoint**: User Story 1 is fully functional and testable independently as the MVP.

---

## Phase 4: User Story 2 - Tune Light Warmth (Priority: P2)

**Goal**: Users can view and adjust tunable warmth when supported, while dimmer-only lights omit warmth controls.

**Independent Test**: Display a tunable light, adjust warmth through the six ordered labels, and confirm the updated warmth label; display a dimmer-only light and confirm warmth is absent.

### Implementation for User Story 2

- [x] T014 [P] [US2] Add tunable warmth and dimmer-only example props in `src/components/ControlTiles/fixtures/lightControlTileExamples.ts`
- [x] T015 [US2] Render warmth status and six-stop warmth summary when `capabilities.warmth` is true in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T016 [US2] Add keyboard-operable warmth slider semantics, user-facing warmth `aria-valuetext`, focus ring, normalized clamping, and `onWarmthChange` support in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T017 [US2] Omit warmth controls when `capabilities.warmth` is false in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T018 [US2] Add `TunableWarmth` and `UnsupportedCapabilities` stories with interactive warmth state in `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`
- [x] T019 [US2] Validate Scenario 3 and Scenario 6 from `specs/008-light-control-tile/quickstart.md` against `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`

**Checkpoint**: User Story 2 works independently with US1 brightness still intact.

---

## Phase 5: User Story 3 - Toggle Night Mode (Priority: P3)

**Goal**: Users can turn red LED night mode on and off when supported, and unsupported lights do not expose the control.

**Independent Test**: Display night mode off, toggle it on, confirm red LED mode is active, then toggle it off and confirm normal light status returns.

### Implementation for User Story 3

- [x] T020 [P] [US3] Add night-mode and full-capability example props in `src/components/ControlTiles/fixtures/lightControlTileExamples.ts`
- [x] T021 [US3] Render night mode as red status styling without changing the primary status text in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T022 [US3] Add keyboard-operable night mode switch semantics, `aria-checked`, focus ring, and `onNightModeChange` support in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T023 [US3] Omit night mode controls when `capabilities.nightMode` is false in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T024 [US3] Add `NightMode` and `FullCapability` stories with interactive night mode state in `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`
- [x] T025 [US3] Validate Scenario 4 and Scenario 5 from `specs/008-light-control-tile/quickstart.md` against `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`

**Checkpoint**: User Story 3 works independently and does not confuse red LED mode with warmth.

---

## Phase 6: User Story 4 - Understand Light Availability and Updates (Priority: P4)

**Goal**: Users can distinguish available, updating, and unavailable states, with controls disabled or omitted appropriately.

**Independent Test**: Display updating and unavailable tiles; confirm pending/unavailable status is text-readable and unavailable controls cannot be operated.

### Implementation for User Story 4

- [x] T026 [P] [US4] Add updating and unavailable example props in `src/components/ControlTiles/fixtures/lightControlTileExamples.ts`
- [x] T027 [US4] Render updating and unavailable labels without relying on color alone in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T028 [US4] Disable brightness, warmth, and night mode controls for `status="unavailable"` and prevent unavailable controls from being focusable or operable in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T029 [US4] Ensure `status="updating"` communicates pending state without presenting old and new values as simultaneously final in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T030 [US4] Add `Updating` and `Unavailable` stories in `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`
- [x] T031 [US4] Validate Scenario 7 and Scenario 8 from `specs/008-light-control-tile/quickstart.md` against `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`

**Checkpoint**: All user stories are independently functional and status behavior is clear.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validate accessibility, compact layout, exports, and design-system integration across all stories.

- [x] T032 [P] Add autodocs descriptions and controls for every public prop in `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`
- [x] T033 [P] Review compact 260px preview layout and adjust tokenized spacing only in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T034 [P] Confirm `src/components/ControlTiles/index.ts` exports allow downstream imports of `LightControlTile` and light-control types
- [x] T035 Run `npm run typecheck` and fix any failures in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx`
- [x] T036 Run `npm run lint` and fix any failures in `src/components/ControlTiles/LightControlTile/LightControlTile.tsx` or `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`
- [x] T037 Run `npm test -- --run` and fix any Storybook/a11y failures in `src/components/ControlTiles/LightControlTile/LightControlTile.stories.tsx`
- [x] T038 Execute Scenario 9 and Scenario 10 from `specs/008-light-control-tile/quickstart.md` and document any remaining gaps in `specs/008-light-control-tile/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; start immediately.
- **Foundational (Phase 2)**: Depends on Setup; blocks every user story.
- **User Story 1 (Phase 3)**: Depends on Foundational; MVP.
- **User Story 2 (Phase 4)**: Depends on Foundational and benefits from US1 brightness shell, but remains testable through its own story.
- **User Story 3 (Phase 5)**: Depends on Foundational and can be developed after or alongside US2.
- **User Story 4 (Phase 6)**: Depends on controls from any completed story it validates; do after US1 at minimum and ideally after US1-US3.
- **Polish (Phase 7)**: Depends on desired stories being complete.

### User Story Dependencies

- **US1 (P1)**: Required MVP; no dependency on US2-US4.
- **US2 (P2)**: Requires foundational component shell and brightness-compatible layout; no dependency on US3.
- **US3 (P3)**: Requires foundational component shell; no dependency on US2.
- **US4 (P4)**: Cross-cuts all controls but can validate any completed capability independently.

### Parallel Opportunities

- T002 and T003 can run in parallel after T001.
- T009, T014, T020, and T026 touch the same fixture file and should not run at the same time unless coordinated.
- US2 and US3 component work can run in parallel only if one person owns warmth sections and another owns night mode sections inside `LightControlTile.tsx`.
- Storybook story additions in T018, T024, and T030 all touch the same story file and should be sequenced or carefully merged.
- Polish tasks T032-T034 can run in parallel because they focus on different files or review scopes.

---

## Parallel Example: User Story 2

```text
Task: "T014 [P] [US2] Add tunable warmth and dimmer-only example props in src/components/ControlTiles/fixtures/lightControlTileExamples.ts"
Task: "T015 [US2] Render warmth status and six-stop warmth summary when capabilities.warmth is true in src/components/ControlTiles/LightControlTile/LightControlTile.tsx"
```

These can begin from the same contract, but the final story task T018 should wait until the component behavior exists.

---

## Parallel Example: User Story 3

```text
Task: "T020 [P] [US3] Add night-mode and full-capability example props in src/components/ControlTiles/fixtures/lightControlTileExamples.ts"
Task: "T021 [US3] Render night mode status text that explicitly distinguishes red LED mode from warmth in src/components/ControlTiles/LightControlTile/LightControlTile.tsx"
```

These can begin from the same contract, but T022 and T024 should be sequenced to avoid story and component merge conflicts.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 for dimmer status/control.
3. Stop and validate Scenarios 1 and 2 from `quickstart.md`.
4. Run `npm run typecheck`, `npm run lint`, and `npm test -- --run`.

### Incremental Delivery

1. Add US1 brightness control and validate independently.
2. Add US2 warmth control and validate unsupported capability behavior.
3. Add US3 red LED night mode and validate red LED mode copy and switch semantics.
4. Add US4 updating/unavailable states across completed controls.
5. Complete polish and full quickstart validation.

### Notes

- `[P]` tasks are parallelizable only when they do not edit the same file or depend on unfinished work.
- Story phases are ordered by priority from `spec.md`.
- Keep implementation token-first and Storybook-first.
- Do not add persistence, device pairing, schedules, or backend integration for this feature.
