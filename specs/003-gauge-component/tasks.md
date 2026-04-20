# Tasks: Gauge Component

**Input**: Design documents from `/specs/003-gauge-component/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/gauge-props.md ✅, quickstart.md ✅

**Organization**: Tasks grouped by user story for independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create component directory structure.

- [x] T001 Create `src/components/Gauge/` directory and empty `index.ts` file
- [x] T002 Create `src/components/Gauge/Gauge.tsx` with minimal exported placeholder component

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define shared types and arc geometry utilities used by all user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 Define `GaugeStatus`, `GaugeSize`, and `GaugeProps` TypeScript types in `src/components/Gauge/Gauge.tsx` (matches `contracts/gauge-props.md` interface exactly)
- [x] T004 Implement `normalizeValue(value, min, max)` clamping utility (inline in `Gauge.tsx`) — handles `min === max` and `NaN` cases
- [x] T005 Implement `computeArcOffset(normalizedValue, circumference)` utility (inline in `Gauge.tsx`) — returns `stroke-dashoffset` for 270° sweep
- [x] T006 Define `statusColors` map in `Gauge.tsx` — mirrors Badge's token map: `nominal→var(--nominal)`, `live→var(--live)`, `fault→var(--alert)`, `info→var(--info)`, `offline→var(--offline)`, `neutral→var(--fg)`
- [x] T007 Define `sizeMap` in `Gauge.tsx` — `sm→64`, `md→128`, `lg→192` (viewport px, radius and stroke derived proportionally)

**Checkpoint**: Types, utilities, and token map in place — user story phases can now proceed.

---

## Phase 3: User Story 1 — Display Numeric Value as Visual Gauge (Priority: P1) 🎯 MVP

**Goal**: Render an SVG arc that fills proportionally to a normalized value within [min, max].

**Independent Test**: Render `<Gauge value={0} />`, `<Gauge value={50} />`, `<Gauge value={100} />` and visually confirm empty, half-filled, and fully-filled arc. Confirm `<Gauge value={-10} />` and `<Gauge value={150} />` clamp correctly.

### Implementation for User Story 1

- [x] T008 [US1] Implement SVG arc shell in `src/components/Gauge/Gauge.tsx` — `<svg>` viewport sized by `sizeMap[size]`, rotated 135° so arc starts at lower-left; render unfilled track circle with `stroke="var(--border)"` (or closest muted token) and `fill="none"`
- [x] T009 [US1] Add filled arc `<circle>` in `src/components/Gauge/Gauge.tsx` — `stroke-dasharray=circumference`, `stroke-dashoffset` from `computeArcOffset`, `stroke` from `statusColors[status]`, `fill="none"`, `strokeLinecap="butt"`
- [x] T010 [US1] Wire `value`, `min`, `max` props through `normalizeValue` into arc offset computation in `Gauge.tsx`
- [x] T011 [US1] Add `role="meter"` wrapper `<div>` in `Gauge.tsx` with `aria-valuenow={value}`, `aria-valuemin={min}`, `aria-valuemax={max}`, `aria-label` (falls back to `label` prop then `"Gauge"`); SVG gets `aria-hidden="true"`
- [x] T012 [US1] Create `src/components/Gauge/Gauge.stories.tsx` — add `Default` (`value={50}`), `Empty` (`value={0}`), `Full` (`value={100}`), `Clamped` (`value={150}`) stories; confirm arc fill matches proportion visually

**Checkpoint**: Gauge arc renders correctly at all boundary values. US1 independently complete.

---

## Phase 4: User Story 2 — Semantic Status Coloring (Priority: P2)

**Goal**: Arc fill color reflects the `status` prop using FVS role tokens, defaulting to `neutral`.

**Independent Test**: Render a Gauge for each of the 6 status variants and confirm arc stroke color matches the expected token (compare visually against Badge in the same status). Confirm no-status render uses neutral (foreground ink).

### Implementation for User Story 2

- [x] T013 [US2] Confirm `statusColors` map (T006) is wired to the arc `<circle>` stroke in `Gauge.tsx` — no hardcoded colors; verify each status produces a distinct color
- [x] T014 [P] [US2] Add `StatusNominal` story to `Gauge.stories.tsx` — `value={80} status="nominal" unit="%"`
- [x] T015 [P] [US2] Add `StatusLive` story to `Gauge.stories.tsx` — `value={65} status="live" unit="MHz"`
- [x] T016 [P] [US2] Add `StatusFault` story to `Gauge.stories.tsx` — `value={22} status="fault" unit="°C"`
- [x] T017 [P] [US2] Add `StatusInfo` story to `Gauge.stories.tsx` — `value={44} status="info"`
- [x] T018 [P] [US2] Add `StatusOffline` story to `Gauge.stories.tsx` — `value={0} status="offline"`
- [ ] T019 [US2] Open addon-a11y panel for each status story and confirm zero violations (axe-core passes contrast check for all status colors in both themes) ← manual Storybook verification

**Checkpoint**: All 6 status variants render with correct token colors and pass a11y. US2 independently complete.

---

## Phase 5: User Story 3 — Value Label and Unit Display (Priority: P3)

**Goal**: Render the numeric value and optional unit as a centered monospaced label inside the arc; render an optional descriptor label below.

**Independent Test**: Render `<Gauge value={42} unit="%" label="Battery" />` and confirm "42%" appears in Space Mono centered within/below the arc and "Battery" appears as a secondary line.

### Implementation for User Story 3

- [x] T020 [US3] Add SVG `<text>` value+unit element in `Gauge.tsx` — centered in the SVG viewport, `fontFamily="var(--font-mono)"`, `textAnchor="middle"`, `dominantBaseline="middle"`, size scaled by `sizeMap[size]`; concatenate `value` + `unit` (if provided)
- [x] T021 [US3] Add SVG `<text>` descriptor element in `Gauge.tsx` — `label` prop, `fontFamily="var(--font-sans)"`, smaller font size, positioned below value text; hidden when `size="sm"` or when `label` is undefined
- [x] T022 [US3] Adjust vertical positioning of value text in `Gauge.tsx` so it sits in the open center of the 270° arc without overlapping the stroke
- [x] T023 [US3] Add `WithLabel` story to `Gauge.stories.tsx` — `value={72} unit="%" label="Battery"`
- [x] T024 [P] [US3] Add `SmallSize` story to `Gauge.stories.tsx` — `value={60} size="sm"` (confirm descriptor hidden, value visible)
- [x] T025 [P] [US3] Add `LargeSize` story to `Gauge.stories.tsx` — `value={60} size="lg" unit="%" label="Fuel"`
- [x] T026 [US3] Verify long label edge case in Storybook — render label >20 chars and confirm no SVG overflow; apply `textOverflow` via SVG `<tspan>` clip if needed in `Gauge.tsx`

**Checkpoint**: Value, unit, and label all render correctly at all size presets. US3 independently complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Wire re-exports, verify theme support, and run final quickstart checklist.

- [x] T027 Export `Gauge`, `GaugeProps`, `GaugeStatus`, `GaugeSize` from `src/components/Gauge/index.ts`
- [x] T028 [P] Add `CustomRange` story to `Gauge.stories.tsx` — `value={0} min={-50} max={50} unit="°C"` (verifies negative min handling)
- [ ] T029 Toggle light / console themes in Storybook for all stories — confirm arc track, fill colors, and text all adapt via tokens with no hardcoded values ← manual Storybook verification
- [ ] T030 Run through `quickstart.md` verification checklist in Storybook — confirm all scenarios pass ← manual Storybook verification

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — blocks all user stories
- **US1 (Phase 3)**: Depends on Phase 2 — arc geometry and type foundation
- **US2 (Phase 4)**: Depends on Phase 2 — `statusColors` map must exist; may begin concurrently with US1 after T006/T007 complete
- **US3 (Phase 5)**: Depends on US1 arc being visible (T008–T010) — label position depends on SVG layout
- **Polish (Phase 6)**: Depends on US1 + US2 + US3 complete

### Within Each Story

- T003–T007 (Foundational) must complete before any story begins
- Within US1: T008 → T009 → T010 (sequential arc build-up), then T011 and T012 can overlap
- Within US2: T013 first, then T014–T018 are all parallel, T019 last
- Within US3: T020 → T021 → T022 (sequential layout), then T023–T025 parallel, T026 last

### Parallel Opportunities

- T014–T018 (US2 status stories) are all independent — six stories, one per variant
- T024–T025 (US3 size stories) are independent of each other
- T028 (CustomRange story) is independent of T029–T030

---

## Parallel Example: User Story 2

```
# After T013 is done, launch all six status stories in parallel:
T014: StatusNominal story
T015: StatusLive story
T016: StatusFault story
T017: StatusInfo story
T018: StatusOffline story
# Then T019 (a11y check) after all stories exist
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (types, utilities, token map)
3. Complete Phase 3: User Story 1 (arc fill + ARIA)
4. **STOP and VALIDATE**: Confirm arc fills correctly at 0, 50, 100 and clamped values
5. The Gauge component is usable in neutral status at this point

### Incremental Delivery

1. Setup + Foundational → types and utilities ready
2. US1 → working arc in neutral color (MVP)
3. US2 → full status palette, a11y verified
4. US3 → value/unit labels, size variants
5. Polish → re-exports, theme check, quickstart sign-off

---

## Notes

- [P] tasks = different files, no dependencies between them
- All colors must come from CSS custom properties — no hardcoded hex at any point
- `strokeLinecap="butt"` preserves the industrial aesthetic (no rounded arc ends)
- SVG `<text>` inherits `currentColor` by default — set explicit `fill` to `var(--fg)` to avoid theme issues
- Commit after each checkpoint to allow clean rollback per story
