# Implementation Plan: Chart Components

**Branch**: `006-chart-components` | **Date**: 2026-04-21 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/006-chart-components/spec.md`

## Summary

Nine chart components (line, area, vertical/horizontal bar, stacked bar, grouped bar, histogram, scatter plot, box plot) built on **Recharts** with FVS design token integration via runtime token resolution. All components are presentational, Storybook-first, TypeScript-strict, and accessible to WCAG 2.1 AA.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode — `noImplicitAny`, `strictNullChecks`)  
**Primary Dependencies**: React 18, Recharts (to be installed), existing `lib/resolve-token.ts`  
**Storage**: N/A — all components are presentational, no persistence  
**Testing**: Vitest + Storybook addon-vitest for component story tests; axe-core via addon-a11y  
**Target Platform**: Browser (Storybook 8, Vite 6 dev server)  
**Project Type**: Component library  
**Performance Goals**: Charts render without visible jank at 300px–1200px container widths  
**Constraints**: No hardcoded hex/px; all tokens via `--fvs-*`; zero axe critical/serious violations  
**Scale/Scope**: 9 chart components + 1 shared `EmptyChart` + shared types + histogram utility + box plot custom shape

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| **I. Engineered Aesthetics** | PASS | All chart colors route through FVS tokens. No decorative fills, no rounded corners on bars. Grid lines use hairline stroke. Tooltip styled with `--fvs-surface`, `--fvs-border`, Space Mono font. |
| **II. Token-First Architecture** | PASS | All `stroke`, `fill`, and font values resolved from `--fvs-*` tokens at runtime via `resolve-token.ts`. No hardcoded hex. `FvsToken` branded type enforced in all color props. |
| **III. Component Isolation via Storybook** | PASS | Every chart component gets its own Storybook story before integration. Stories are the primary acceptance artifact. TypeScript strict mode enforced. No prop drilling — each component is self-contained. |
| **IV. Content Voice Compliance** | PASS | Axis labels, tooltip text, legend labels, and empty-state captions must use technical/understated voice. No marketing verbs. Units appended with `AxisConfig.unit`. UPPERCASE mono styling applied to axis tick labels via Space Mono token. |
| **V. Keyboard-First Accessibility** | PASS | Chart containers are focusable with amber focus ring. Legend toggle buttons are real `<button>` elements. `ariaLabel` required on all components. Color not sole differentiator — dash patterns used for multi-series. |

Post-design re-check: all principles remain PASS. No violations found. Complexity Tracking section not required.

## Project Structure

### Documentation (this feature)

```text
specs/006-chart-components/
├── plan.md              ← this file
├── research.md          ← library selection, token approach, a11y strategy
├── data-model.md        ← prop shapes and validation rules per chart type
├── quickstart.md        ← 11 integration test scenarios
├── contracts/
│   └── component-props.md   ← TypeScript interfaces for all 9 components
└── tasks.md             ← Phase 2 output (/speckit.tasks — not yet created)
```

### Source Code (repository root)

```text
src/
└── components/
    └── Charts/
        ├── types.ts                          # Shared: FvsToken, AxisConfig, TooltipConfig, SeriesColor
        ├── EmptyChart/
        │   └── EmptyChart.tsx
        ├── LineChart/
        │   ├── LineChart.tsx
        │   └── LineChart.stories.tsx
        ├── AreaChart/
        │   ├── AreaChart.tsx
        │   └── AreaChart.stories.tsx
        ├── BarChart/
        │   ├── BarChart.tsx
        │   └── BarChart.stories.tsx
        ├── StackedBarChart/
        │   ├── StackedBarChart.tsx
        │   └── StackedBarChart.stories.tsx
        ├── GroupedBarChart/
        │   ├── GroupedBarChart.tsx
        │   └── GroupedBarChart.stories.tsx
        ├── Histogram/
        │   ├── Histogram.tsx
        │   ├── Histogram.stories.tsx
        │   └── bucketize.ts                  # Sturges' rule + bin utility
        ├── ScatterPlot/
        │   ├── ScatterPlot.tsx
        │   └── ScatterPlot.stories.tsx
        └── BoxPlot/
            ├── BoxPlot.tsx
            ├── BoxPlot.stories.tsx
            └── BoxPlotShape.tsx              # Custom Recharts SVG shape

**Structure Decision**: Single-project, component library layout. Each chart type in its own subdirectory matching the existing pattern established by `Button/`, `Badge/`, `Card/` etc. Shared types and utilities live at `Charts/` root level.
```

## Key Design Decisions

### Library: Recharts

Recharts provides composable SVG chart primitives with React-first APIs. All 9 chart types are achievable:
- Line, Area, Bar (vertical/horizontal), StackedBar, GroupedBar, Scatter: native Recharts components
- Histogram: `BarChart` with pre-bucketed data + `barCategoryGap={0}` for adjacent bins
- BoxPlot: `ComposedChart` with a custom `BoxPlotShape` SVG component

See `research.md` §1 for full evaluation.

### Token Integration

FVS tokens (`--fvs-*` CSS custom properties) are resolved to concrete values at component mount using `lib/resolve-token.ts`. Resolved values are passed as `stroke`, `fill`, and `fontFamily` props to Recharts SVG elements. This is necessary because Recharts passes prop strings directly to SVG attributes, which do not parse `var()` expressions.

See `research.md` §2 for details.

### Accessibility

- Each chart wrapped in `<div role="img" aria-label={ariaLabel}>` with a required `ariaLabel` prop
- `<svg title>` + `<svg desc>` elements embedded inside each chart
- Legend toggle buttons are `<button>` elements with `focus-visible:outline-2 focus-visible:outline-[var(--fvs-amber)]`
- Multi-series charts use distinct dash patterns per series (not color alone)

See `research.md` §3 for approach.

### Histogram Bucketing

Accepts pre-bucketed `HistogramBucket[]` or raw `number[]` + optional `bins` count. When `values` provided without `bins`, Sturges' rule (`k = ⌈log₂(n) + 1⌉`) determines bin count automatically. Logic isolated in `bucketize.ts`.

See `research.md` §5 for rationale.

### Box Plot Data Contract

Accepts pre-computed statistical summaries (`min`, `q1`, `median`, `q3`, `max`, `outliers?`). No raw array input. Quartile computation is the consumer's responsibility, matching the approach for server-computed statistics pipelines.

See `research.md` §4 for rationale.

## Dependencies to Add

```bash
npm install recharts
npm install --save-dev @types/recharts  # (if not bundled — check after install)
```
