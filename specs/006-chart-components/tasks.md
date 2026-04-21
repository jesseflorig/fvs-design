# Tasks: Chart Components

**Input**: Design documents from `/specs/006-chart-components/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓, quickstart.md ✓

**Tests**: Not requested in spec — no test tasks generated.

**Organization**: Tasks grouped by user story. Each user story phase is independently testable via Storybook.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no blocking dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- All file paths are relative to repository root

---

## Phase 1: Setup

**Purpose**: Install Recharts and establish the Charts directory scaffold.

- [x] T001 Install `recharts` dependency — run `npm install recharts` from repo root (Recharts v2+ bundles its own TypeScript types; no `@types/recharts` needed)
- [x] T002 Create directory scaffold `src/components/Charts/` with subdirectories: `EmptyChart/`, `LineChart/`, `AreaChart/`, `BarChart/`, `StackedBarChart/`, `GroupedBarChart/`, `Histogram/`, `ScatterPlot/`, `BoxPlot/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared types, token resolution utility, and EmptyChart must be complete before any chart component can be built.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 Create shared chart types in `src/components/Charts/types.ts` — define `FvsToken` branded type, `AxisConfig`, `TooltipConfig`, `SeriesColor` interfaces per `contracts/component-props.md`
- [x] T004 [P] Create chart color resolver utility `src/components/Charts/resolveChartTokens.ts` — wraps `lib/resolve-token.ts` to resolve one or more `FvsToken` values to concrete hex strings at call time; used by all chart components at mount
- [x] T005 [P] Create `EmptyChart` component in `src/components/Charts/EmptyChart/EmptyChart.tsx` and its story `EmptyChart.stories.tsx` — renders a labeled placeholder (ariaLabel as caption, FVS-token border and text) at the chart's configured height; used by all chart components when primary data is empty

**Checkpoint**: Shared types, token resolver, and EmptyChart are ready — user story phases can now begin.

---

## Phase 3: User Story 1 — Trend and Time-Series Visualization (Priority: P1) 🎯 MVP

**Goal**: Deliver `LineChart` and `AreaChart` components, each with Storybook stories, passing axe-core checks, and responsive at 200px–1200px.

**Independent Test**: Mount `LineChart` and `AreaChart` in Storybook with a static time-series dataset; verify FVS tokens applied, axes labeled, tooltip on hover, legend when series > 1, and empty state on empty series array.

- [x] T006 [P] [US1] Create `LineChart` component in `src/components/Charts/LineChart/LineChart.tsx` — implement `LineChartProps` from `contracts/component-props.md`; use Recharts `<LineChart>` + `<ResponsiveContainer>`; resolve colors via `resolveChartTokens`; render `EmptyChart` when `series` is empty; include focusable container with `role="img"` and `aria-label`
- [x] T007 [P] [US1] Create `LineChart` stories in `src/components/Charts/LineChart/LineChart.stories.tsx` — stories: Default (single series), MultiSeries (two series with dash pattern), Empty (series=[]), NarrowContainer (200px wrapper); verify light + dark theme via Storybook theme toggle
- [x] T008 [P] [US1] Create `AreaChart` component in `src/components/Charts/AreaChart/AreaChart.tsx` — implement `AreaChartProps` (extends `LineChartProps` with `fillOpacity`); use Recharts `<AreaChart>`; same accessibility and empty-state pattern as `LineChart`
- [x] T009 [P] [US1] Create `AreaChart` stories in `src/components/Charts/AreaChart/AreaChart.stories.tsx` — stories: Default, MultiSeries (two filled areas + distinct dash patterns), Empty, FillOpacity (custom fillOpacity value)

**Checkpoint**: User Story 1 fully functional — `LineChart` and `AreaChart` visible in Storybook, both themes, accessible, responsive.

---

## Phase 4: User Story 2 — Comparative Category Visualization (Priority: P2)

**Goal**: Deliver `BarChart` (vertical + horizontal), `StackedBarChart`, and `GroupedBarChart` with Storybook stories and a11y compliance.

**Independent Test**: Mount all three bar chart variants in Storybook with a categorical dataset; verify correct bar layout per orientation, color-coded segments for multi-series charts, legend toggle (keyboard-operable), and empty state on empty data.

- [x] T010 [P] [US2] Create `BarChart` component in `src/components/Charts/BarChart/BarChart.tsx` — implement `BarChartProps` with `orientation` prop (`"vertical"` | `"horizontal"`, default `"vertical"`); use Recharts `<BarChart>` with axis swap for horizontal; resolve `color` token; render `EmptyChart` when `data` is empty
- [x] T011 [P] [US2] Create `BarChart` stories in `src/components/Charts/BarChart/BarChart.stories.tsx` — stories: Vertical (default), Horizontal, Empty, CustomColor (non-default FVS token)
- [x] T012 [P] [US2] Create `StackedBarChart` component in `src/components/Charts/StackedBarChart/StackedBarChart.tsx` — implement `StackedBarChartProps`; use Recharts `<BarChart>` with `stackId` on each `<Bar>`; render legend as `<button>` elements with amber focus ring; render `EmptyChart` when `data` is empty
- [x] T013 [P] [US2] Create `StackedBarChart` stories in `src/components/Charts/StackedBarChart/StackedBarChart.stories.tsx` — stories: Default (3 series), Horizontal, NoLegend, Empty
- [x] T014 [P] [US2] Create `GroupedBarChart` component in `src/components/Charts/GroupedBarChart/GroupedBarChart.tsx` — implement `GroupedBarChartProps` (same shape as `StackedBarChartProps`); use Recharts `<BarChart>` without `stackId`; reuse series color and legend patterns from `StackedBarChart`
- [x] T015 [P] [US2] Create `GroupedBarChart` stories in `src/components/Charts/GroupedBarChart/GroupedBarChart.stories.tsx` — stories: Default (3 series grouped), Horizontal, NoLegend, Empty

**Checkpoint**: User Story 2 fully functional — all bar chart variants in Storybook, both themes, legend keyboard-operable.

---

## Phase 5: User Story 3 — Distribution and Correlation Visualization (Priority: P3)

**Goal**: Deliver `Histogram`, `ScatterPlot`, and `BoxPlot` with Storybook stories and a11y compliance.

**Independent Test**: Mount all three statistical chart types in Storybook with representative datasets; verify histogram bins are adjacent (no gaps), scatter dots positioned correctly, box-whisker structure accurate, and all components handle empty data gracefully.

- [x] T016 [P] [US3] Create histogram bucketing utility in `src/components/Charts/Histogram/bucketize.ts` — exports `bucketize(values: number[], bins?: number): HistogramBucket[]`; implements Sturges' rule (`k = Math.ceil(Math.log2(n) + 1)`) when `bins` is omitted; returns `{ label: string, count: number }[]`
- [x] T017 [US3] Create `Histogram` component in `src/components/Charts/Histogram/Histogram.tsx` — implement discriminated union `HistogramProps` (`buckets` OR `values`+`bins`); call `bucketize` when `values` provided; use Recharts `<BarChart>` with `barCategoryGap={0}` for adjacent bins; render `EmptyChart` when buckets resolve to empty
- [x] T018 [P] [US3] Create `Histogram` stories in `src/components/Charts/Histogram/Histogram.stories.tsx` — stories: PreBucketed (explicit buckets), RawValues (numeric array, auto-bucketed), CustomBins (bins=5), Empty
- [x] T019 [P] [US3] Create `ScatterPlot` component in `src/components/Charts/ScatterPlot/ScatterPlot.tsx` — implement `ScatterPlotProps`; use Recharts `<ScatterChart>` with one `<Scatter>` per series; resolve per-series colors; render legend as `<button>` elements; render `EmptyChart` when all series are empty
- [x] T020 [P] [US3] Create `ScatterPlot` stories in `src/components/Charts/ScatterPlot/ScatterPlot.stories.tsx` — stories: SingleSeries, MultiSeries (two vans), Empty, LargeDataset (50+ points)
- [x] T021 [P] [US3] Create `BoxPlotShape` custom SVG component in `src/components/Charts/BoxPlot/BoxPlotShape.tsx` — renders a box-and-whisker at given SVG coordinates; accepts `x`, `y`, `width`, `height`, `min`, `q1`, `median`, `q3`, `max`, `outliers`, `fill`, `stroke` props; draws: vertical whisker line (min→max), box rect (q1→q3), median line, outlier dots
- [x] T022 [US3] Create `BoxPlot` component in `src/components/Charts/BoxPlot/BoxPlot.tsx` — implement `BoxPlotProps`; use Recharts `<ComposedChart>` with a `<Bar customizedShape={BoxPlotShape}>` passing pre-computed quartile values; resolve `color` and `strokeColor` tokens; render `EmptyChart` when `data` is empty; warn in dev if `min > q1` or other invariants violated
- [x] T023 [P] [US3] Create `BoxPlot` stories in `src/components/Charts/BoxPlot/BoxPlot.stories.tsx` — stories: Default (3 categories), WithOutliers, SingleGroup, Empty

**Checkpoint**: User Story 3 fully functional — all statistical charts in Storybook, both themes, empty states verified.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Barrel export, accessibility audit, responsive verification, and quickstart validation.

- [x] T024 [P] Create barrel export `src/components/Charts/index.ts` — re-export all nine chart components and shared types from `Charts/types.ts` for clean consumer imports
- [x] T025 [P] Run axe-core accessibility audit on all chart stories via Storybook addon-a11y — fix any critical or serious violations (focus visibility, color contrast, missing ARIA labels, non-button legend toggles)
- [x] T026 [P] Verify responsive behavior across all chart stories — confirm no layout breaks or overflow at 200px container width; confirm correct reflow at 400px, 800px, 1200px using Storybook viewport addon
- [x] T027 Run the 11 quickstart.md integration scenarios manually in Storybook — check each scenario against its Expected outcome; document any deviations as follow-on tasks

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — **BLOCKS all user stories**
- **User Stories (Phases 3–5)**: All depend on Phase 2 completion; phases 3–5 can proceed in parallel after Phase 2
- **Polish (Phase 6)**: Depends on all desired user story phases being complete

### User Story Dependencies

- **US1 (P1)**: Starts after Phase 2 — no dependency on US2 or US3
- **US2 (P2)**: Starts after Phase 2 — no dependency on US1 or US3
- **US3 (P3)**: Starts after Phase 2 — no dependency on US1 or US2

### Within Each User Story

- `resolveChartTokens.ts` and `EmptyChart` (Phase 2) must exist before any component is started
- Within US3: `bucketize.ts` (T016) must complete before `Histogram.tsx` (T017); `BoxPlotShape.tsx` (T021) must complete before `BoxPlot.tsx` (T022)
- Stories committed with their component — never separated

### Parallel Opportunities

**Phase 2**: T004 and T005 can run in parallel (different files, both depend only on T003 types)

**Phase 3 (US1)**: T006 and T008 are parallel (LineChart and AreaChart are independent components)

**Phase 4 (US2)**: T010, T012, T014 are parallel (three independent components)

**Phase 5 (US3)**: T016, T019, T021 are parallel starting points; T017 follows T016; T020 follows T019; T022 follows T021

**Phase 6**: T024, T025, T026 are fully parallel; T027 runs after all three

---

## Parallel Example: User Story 2

```
Start all three in parallel after Phase 2:
  Task T010: BarChart.tsx + T011: BarChart.stories.tsx
  Task T012: StackedBarChart.tsx + T013: StackedBarChart.stories.tsx
  Task T014: GroupedBarChart.tsx + T015: GroupedBarChart.stories.tsx
```

## Parallel Example: User Story 3

```
Start in parallel after Phase 2:
  Thread A: T016 (bucketize.ts) → T017 (Histogram.tsx) → T018 (Histogram.stories.tsx)
  Thread B: T019 (ScatterPlot.tsx) → T020 (ScatterPlot.stories.tsx)
  Thread C: T021 (BoxPlotShape.tsx) → T022 (BoxPlot.tsx) → T023 (BoxPlot.stories.tsx)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T002)
2. Complete Phase 2: Foundational (T003–T005)
3. Complete Phase 3: User Story 1 (T006–T009)
4. **STOP and VALIDATE**: Verify LineChart and AreaChart in Storybook — light + dark themes, tooltip, legend, empty state, narrow container
5. Demonstrate MVP before continuing to Phase 4

### Incremental Delivery

1. Setup + Foundational → base infrastructure ready
2. US1 (LineChart + AreaChart) → time-series MVP
3. US2 (BarChart family) → adds comparison charts
4. US3 (Histogram + ScatterPlot + BoxPlot) → completes statistical suite
5. Polish → axe-clean, responsive, fully documented

### Parallel Team Strategy

With multiple developers after Phase 2:
- Developer A: US1 (T006–T009)
- Developer B: US2 (T010–T015)
- Developer C: US3 (T016–T023)

All three stories integrate through shared `types.ts` and `EmptyChart` only — no cross-story file conflicts.

---

## Notes

- [P] tasks operate on different files and have no blocking dependencies between them
- [Story] label traces each task to its user story for scope control
- Storybook story is always committed with its component (Constitution III — no exceptions)
- `ariaLabel` is a required prop on all components — TypeScript will fail without it
- All color values use `FvsToken` branded type — no raw hex accepted at compile time
- `resolve-token.ts` already exists at `src/lib/resolve-token.ts`; `resolveChartTokens.ts` is a thin wrapper
- Recharts `<ResponsiveContainer>` handles layout reflow — no manual resize observers needed
- Stop at any phase checkpoint to validate independently before continuing
