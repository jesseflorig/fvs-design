# Tasks: Fix All Accessibility Violations

**Input**: Design documents from `/specs/002-fix-a11y-violations/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: Not requested — validation done via Storybook addon-a11y (axe-core) and quickstart scenarios.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup

**Purpose**: Confirm dev environment and establish violation baseline before any fixes are applied.

- [x] T001 Start Storybook (`npm run storybook`) and open the A11y panel — document current axe violation count per component story as baseline

---

## Phase 2: Foundational (Blocking Prerequisite for US3)

**Purpose**: Compute the exact token values needed for color contrast fixes before touching `tokens.css`. This must be done before Phase 5 (US3) but does not block US1 or US2.

**⚠️ CRITICAL for US3**: Phase 5 tasks cannot use the correct hex values until this phase is complete.

- [x] T002 Using a WCAG contrast ratio calculator, compute the darkest value of `--fg-subtle` in the light theme that achieves exactly ≥4.5:1 against `--bg-elevated` (#FBFAF7); record the result in `specs/002-fix-a11y-violations/research.md` under "Resolved Token Values"
- [x] T003 Using a WCAG contrast ratio calculator, compute the lightest value of `--fg-subtle` in the console theme that achieves exactly ≥4.5:1 against `--bg-elevated` (#151517); record the result in `specs/002-fix-a11y-violations/research.md` under "Resolved Token Values"

**Checkpoint**: Token values confirmed — US3 work may now begin. US1 and US2 may proceed immediately in parallel.

---

## Phase 3: User Story 1 — Keyboard Navigation (Priority: P1) 🎯 MVP

**Goal**: Every interactive component receives a visible, amber focus ring on keyboard focus. The base style no longer suppresses the browser's default ring before the JS handler fires.

**Independent Test**: Tab through all Button variants in Storybook — every button shows the 2px amber ring with 2px offset. Zero axe `color-contrast` or `focus-visible` violations in the Button story.

### Implementation for User Story 1

- [x] T004 [US1] In `src/components/Button/Button.tsx`, change the `base` style object: replace `outline: 'none'` with `outline: '2px solid transparent'` and add `outlineOffset: '2px'`
- [x] T005 [US1] In `src/components/Button/Button.tsx`, update the `onBlur` handler: change `e.currentTarget.style.outline = 'none'` to `e.currentTarget.style.outline = '2px solid transparent'`

**Checkpoint**: Open the Button story in Storybook — tab through all variants and confirm the amber ring appears on focus without any flash of a browser-default ring.

---

## Phase 4: User Story 2 — Screen Reader Announcements (Priority: P2)

**Goal**: All components have correct ARIA labels, roles, and associations so screen readers can announce every element accurately. Zero axe label/name/role violations.

**Independent Test**: Run axe in the Storybook A11y panel on Badge, DataTable, and Input stories — zero violations in the "name, role, value" category.

### Implementation for User Story 2 — Badge

- [x] T006 [P] [US2] In `src/components/Badge/Badge.tsx`, add `aria-hidden="true"` to the dot `<span>` (the span with the circle indicator inside Badge)

### Implementation for User Story 2 — DataTable

- [x] T007 [P] [US2] In `src/components/DataTable/DataTable.tsx`, add `scope="col"` to each `<th>` element in the column header row

### Implementation for User Story 2 — Input (all four sub-components in one file)

All five tasks below touch `src/components/Input/Input.tsx` and must be applied sequentially in order.

- [x] T008 [US2] In `src/components/Input/Input.tsx`, add `import { useId } from 'react'` at the top; inside the `Input` function body, add `const id = useId(); const hintId = useId();`; set `htmlFor={id}` on `<label>`, `id={id}` on `<input>`, and `aria-describedby={hint || error ? hintId : undefined}` on `<input>`; add `id={hintId}` to the hint/error `<span>`
- [x] T009 [US2] In `src/components/Input/Input.tsx`, apply the same `useId()` pattern to the `Select` function: add `const id = useId(); const hintId = useId();`; set `htmlFor={id}` on `<label>`, `id={id}` on `<select>`, `aria-describedby={hint || error ? hintId : undefined}` on `<select>`, and `id={hintId}` on the hint/error `<span>`
- [x] T010 [US2] In `src/components/Input/Input.tsx`, inside the `Toggle` function body, add `const labelId = useId();`; add `id={labelId}` to the label `<span>` (the one displaying `{label}` at the top of the Toggle wrapper); add `aria-labelledby={labelId}` to the `<button role="switch">`
- [x] T011 [US2] In `src/components/Input/Input.tsx`, inside the `Checkbox` function body, add `const labelId = useId();`; add `id={labelId}` to the label `<span>` (the one displaying `{label}` next to the checkbox button); add `aria-labelledby={labelId}` to the `<button role="checkbox">`

**Checkpoint**: Open the Input, Badge, and DataTable stories in Storybook — A11y panel MUST show zero violations for each. Inspect the DOM of an Input: `<label>` must have `for` matching `<input id>`. Inspect Toggle: `<button>` must have `aria-labelledby` pointing to the label span's `id`.

---

## Phase 5: User Story 3 — Color Contrast (Priority: P3)

**Goal**: `--fg-subtle` text in both themes achieves ≥4.5:1 contrast ratio. Hint text and Toggle off-state labels pass WCAG AA at all sizes.

**Independent Test**: Open Input story in Storybook (light theme) — A11y panel shows zero color-contrast violations on hint/error text. Switch to console theme — same result.

**Prerequisite**: T002 and T003 (resolved token values) must be complete.

### Implementation for User Story 3

- [x] T012 [US3] In `src/tokens/tokens.css`, in the `:root` block, replace the `--fvs-steel` value used for `--fg-subtle` (or override `--fg-subtle` directly) with the computed value from T002 that achieves ≥4.5:1 on #FBFAF7 — update the inline comment to record the contrast ratio
- [x] T013 [US3] In `src/tokens/tokens.css`, in the `[data-theme="console"]` block, add or update `--fg-subtle` to the computed value from T003 that achieves ≥4.5:1 on #151517 — update the inline comment to record the contrast ratio

**Checkpoint**: Open the Input and Toggle stories in both themes — A11y panel must show zero color-contrast violations on hint text and off-state labels.

---

## Phase 6: Polish & Cross-Cutting Validation

**Purpose**: Full end-to-end sweep confirming all three user stories pass simultaneously in both themes.

- [ ] T014 [P] Open every component story (Button, Badge, Card, Input, DataTable, Divider) with the **light theme** active — A11y panel must show **Violations: 0** for every story; document any remaining violation with component name and axe rule
- [ ] T015 [P] Open every component story with the **console theme** active — A11y panel must show **Violations: 0** for every story; document any remaining violation
- [ ] T016 Execute all nine scenarios in `specs/002-fix-a11y-violations/quickstart.md` manually and confirm each passes

<!-- T014-T016 require manual Storybook validation — run `npm run storybook` to complete -->

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: No code dependencies — start immediately after Phase 1; **blocks Phase 5 only**
- **US1 (Phase 3)**: Can start after Phase 1 — independent of all other phases
- **US2 (Phase 4)**: Can start after Phase 1 — independent of US1 and Phase 2
- **US3 (Phase 5)**: Depends on Phase 2 (T002, T003) — otherwise independent
- **Polish (Phase 6)**: Depends on Phase 3 + 4 + 5 all being complete

### Within Phase 4 (US2)

- T006 [Badge] and T007 [DataTable] are fully parallel — different files
- T008–T011 [Input.tsx] are sequential — same file, must apply in order

### Parallel Opportunities

```bash
# After Phase 1, these can run in parallel:
Task T002: Compute light theme contrast value
Task T003: Compute console theme contrast value
Task T004–T005: Button outline fix (US1)
Task T006: Badge aria-hidden (US2)
Task T007: DataTable scope (US2)

# T008–T011 must run sequentially (same file):
T008 → T009 → T010 → T011 (all in Input.tsx)
```

---

## Parallel Example: User Story 2

```bash
# Launch Badge and DataTable fixes together (different files):
Task: "Add aria-hidden to Badge dot — src/components/Badge/Badge.tsx"
Task: "Add scope=col to DataTable headers — src/components/DataTable/DataTable.tsx"

# Then proceed sequentially through Input.tsx:
Task: T008 → T009 → T010 → T011
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (baseline)
2. Complete T004–T005: Button focus ring fix
3. **STOP and VALIDATE**: Tab through Button story — amber ring visible on all variants
4. Deliver as independent increment

### Incremental Delivery

1. Phase 1 + US1 → Button keyboard nav fixed
2. Phase 4 (US2) → All ARIA label/name/role violations resolved
3. Phase 2 + Phase 5 (US3) → Contrast violations resolved
4. Phase 6 → Full sweep, zero violations both themes

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks
- [Story] label maps each task to a user story for traceability
- T006–T007 are independently parallelizable; T008–T011 are sequential (same file)
- Commit after each phase checkpoint for clean rollback points
- axe violations discovered at Phase 6 that aren't in this task list should be addressed before closing the branch
