# Tasks: Amber Dim Contrast

**Input**: Design documents from `/specs/010-amber-dim-contrast/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/token-contract.md, quickstart.md

**Tests**: No separate automated test files are required by the spec. Validation is through contrast calculation, Storybook token-story review, typecheck, lint, and Vitest.

**Organization**: Tasks are grouped by user story to enable the token contrast change and documentation caption correction to be validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story the task belongs to (US1, US2)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Verification)

**Purpose**: Confirm the affected files and current token mappings before editing.

- [X] T001 Verify `--fvs-amber-dim`, `--fvs-amber`, `--live`, `--fvs-paper`, and `--fvs-white` exist in `src/tokens/tokens.css`
- [X] T002 [P] Verify `fvs-amber-dim` maps to `var(--fvs-amber-dim)` in `tailwind.config.ts`
- [X] T003 [P] Verify the Signal Semantic story contains the `--fvs-amber-dim` swatch in `src/stories/tokens/Colors.stories.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the exact target value and validation command before user-story edits.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 Confirm the target dim amber value `#946421` and contrast ratios from `specs/010-amber-dim-contrast/research.md`
- [X] T005 Create or document a repeatable contrast calculation command for `#946421` on `#F2F1EE` and `#FBFAF7` in `specs/010-amber-dim-contrast/quickstart.md`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Maximize Readable Amber Dim (Priority: P1) MVP

**Goal**: Update the dim amber signal color to the lightest amber value that still passes 4.5:1 contrast on supported light surfaces.

**Independent Test**: Compare `#946421` against `#F2F1EE` and `#FBFAF7`, confirm both ratios are at least 4.5:1, and confirm no lighter candidate in the existing dim-amber hue family also passes.

### Implementation for User Story 1

- [X] T006 [US1] Update `--fvs-amber-dim` from `#8A5E1F` to `#946421` in `src/tokens/tokens.css`
- [X] T007 [US1] Update the `--live` light-theme comment with the new contrast ratio for `#946421` on `--bg` in `src/tokens/tokens.css`
- [X] T008 [US1] Verify `--fvs-amber` remains `#E8A33D` and `--live` still resolves to `var(--fvs-amber-dim)` in `src/tokens/tokens.css`
- [X] T009 [US1] Validate quickstart Scenario 1 and Scenario 2 in `specs/010-amber-dim-contrast/quickstart.md`

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Correct Signal Semantic Caption (Priority: P2)

**Goal**: Correct the Signal Semantic caption so dim amber is documented as accessible amber for light surfaces.

**Independent Test**: View the Signal Semantic story and confirm the `--fvs-amber-dim` caption describes light-surface accessible amber usage and does not mention dark surfaces.

### Implementation for User Story 2

- [X] T010 [US2] Update the `--fvs-amber-dim` Signal Semantic role caption to `accessible amber text on light surfaces` in `src/stories/tokens/Colors.stories.tsx`
- [X] T011 [US2] Verify the `--fvs-amber` Signal Semantic caption remains focused on accent/live active usage in `src/stories/tokens/Colors.stories.tsx`
- [X] T012 [US2] Validate quickstart Scenario 3 in `specs/010-amber-dim-contrast/quickstart.md`

**Checkpoint**: User Stories 1 and 2 are both functional and independently reviewable.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Complete mapping checks, validation commands, and documentation notes.

- [X] T013 [P] Validate quickstart Scenario 4 by confirming `fvs-amber-dim` remains `var(--fvs-amber-dim)` in `tailwind.config.ts`
- [X] T014 Run `npm run typecheck`, `npm run lint`, and `npm test` from the repository root
- [X] T015 Update `specs/010-amber-dim-contrast/quickstart.md` with validation notes and recorded contrast ratios
- [X] T016 Review `src/tokens/tokens.css` and `src/stories/tokens/Colors.stories.tsx` to confirm no dark-surface caption remains for `--fvs-amber-dim`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks both user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion - MVP slice
- **User Story 2 (Phase 4)**: Depends on Foundational completion and can be done independently of US1, but should follow US1 sequentially for a clean review
- **Polish (Phase 5)**: Depends on desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependency on US2
- **User Story 2 (P2)**: Can start after Foundational - no dependency on US1, except final validation should review both together

### Within Each User Story

- Token or caption edit before quickstart validation
- Contrast validation before repository validation
- Story complete before moving to polish

### Parallel Opportunities

- T002 and T003 can run in parallel during Setup
- US1 and US2 edit different files and can proceed in parallel after Foundational if needed
- T013 can run in parallel with final documentation review after both stories are complete

---

## Parallel Example: User Story 1

```text
Task: "Update --fvs-amber-dim from #8A5E1F to #946421 in src/tokens/tokens.css"
Task: "Update the --fvs-amber-dim Signal Semantic role caption to accessible amber text on light surfaces in src/stories/tokens/Colors.stories.tsx"
```

## Parallel Example: User Story 2

```text
Task: "Update the --fvs-amber-dim Signal Semantic role caption to accessible amber text on light surfaces in src/stories/tokens/Colors.stories.tsx"
Task: "Validate quickstart Scenario 4 by confirming fvs-amber-dim remains var(--fvs-amber-dim) in tailwind.config.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate contrast independently
5. Demo if ready

### Incremental Delivery

1. Complete Setup + Foundational
2. Add User Story 1 -> validate amber dim contrast
3. Add User Story 2 -> validate Signal Semantic caption
4. Complete Polish -> validate Tailwind mapping, commands, and notes

### Parallel Team Strategy

With multiple developers:

1. Complete Setup and Foundational together
2. Developer A updates `src/tokens/tokens.css`
3. Developer B updates `src/stories/tokens/Colors.stories.tsx`
4. Run shared validation after both file changes land

---

## Notes

- [P] tasks use different files or can be done without depending on incomplete implementation details.
- Story labels map to the spec user stories for traceability.
- Do not change `--fvs-amber`.
- Do not duplicate raw `#946421` in `tailwind.config.ts`; keep Tailwind mapped to the CSS variable.
- Commit after the token/caption change and validation pass.
