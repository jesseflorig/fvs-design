# Implementation Plan: Layout Components

**Branch**: `011-layout-components` | **Date**: 2026-05-04 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/011-layout-components/spec.md`

## Summary

Add a layout component family for clean smart home dashboards. The required primitives are `Stack` for tokenized directional spacing and `Navbar` for primary dashboard navigation. The plan also includes recommended dashboard layout components: `DashboardShell`, `DashboardGrid`, `Section`, `Sidebar`/navigation rail, and `Cluster` for inline wrapping groups. Implementation will follow the existing React 18 + TypeScript + Storybook component-library conventions, keep visual decisions token-first, and provide Storybook examples that compose lighting, climate, security, presence, and energy dashboard content without one-off layout wrappers.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: React 18, Storybook 10, Vitest, Storybook addon-a11y, Lucide React, existing `src/tokens/tokens.css`, existing `tailwind.config.ts`, existing component/story conventions, existing Button/Card/Badge/Presence/ControlTiles examples  
**Storage**: N/A - presentational component library, no persistence  
**Testing**: Vitest + Storybook addon-vitest, Storybook addon-a11y, TypeScript typecheck, ESLint, manual keyboard and compact/wide layout review in Storybook  
**Target Platform**: Browser-rendered Storybook component library for smart home dashboard surfaces  
**Project Type**: Component library  
**Performance Goals**: Layout examples render without visible layout shift; compact and wide examples avoid overlap; navigation remains usable with 6 primary destinations and optional actions  
**Constraints**: Token-first styling only; 0-8px radii maximum; no decorative gradients or consumer-app styling; Navbar interactive items are keyboard-operable with visible amber focus; active/disabled navigation states cannot rely on color alone; no data integration in this feature  
**Scale/Scope**: One `Layout` component group with Stack, Cluster, DashboardGrid, DashboardShell, Section, Sidebar/Rail, Navbar, Storybook stories, public contracts, and smart home dashboard composition examples

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| **I. Engineered Aesthetics** | PASS | Layout components provide restrained structure: whitespace, hairlines, tokenized spacing, and compact dashboard hierarchy. No decorative surfaces or marketing composition. |
| **II. Token-First Architecture** | PASS | Spacing, radii, borders, focus, typography, and responsive gaps must use existing tokens or paired token additions if planning reveals a missing canonical token. |
| **III. Component Isolation via Storybook** | PASS | Each layout primitive will have Storybook examples, plus an integrated smart home dashboard composition story. |
| **IV. Content Voice Compliance** | PASS | Navigation and section labels use understated dashboard language such as Overview, Rooms, Climate, Lighting, Security, Energy. |
| **V. Keyboard-First Accessibility** | PASS | Navbar and Sidebar/Rail use semantic navigation, keyboard-operable items, visible amber focus, and non-color active/disabled cues. Layout-only primitives avoid adding unnecessary interactive behavior. |

Post-design re-check: all principles remain PASS. The generated research, data model, contracts, and quickstart keep the components token-first, isolated, keyboard-accessible where interactive, and suited to operational smart home dashboards.

## Project Structure

### Documentation (this feature)

```text
specs/011-layout-components/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── component-props.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Layout/
│   │   ├── Stack.tsx
│   │   ├── Cluster.tsx
│   │   ├── DashboardGrid.tsx
│   │   ├── DashboardShell.tsx
│   │   ├── Section.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Navbar.tsx
│   │   ├── Layout.stories.tsx
│   │   └── index.ts
│   ├── Button/
│   ├── Card/
│   ├── Badge/
│   ├── Presence/
│   └── ControlTiles/
└── tokens/
    └── tokens.css
```

**Structure Decision**: Single-project component library. Layout primitives should live together under `src/components/Layout/` because they form a cohesive composition system and share spacing/alignment vocabulary. One grouped Storybook file is acceptable for layout primitives because the examples need to show composition across components.

## Phase 0 Research Summary

- Implement a small layout family rather than only Stack/Navbar, because clean dashboard composition needs page frame, grid, sections, side navigation, and inline grouping.
- Use `Stack` for one-dimensional layout and `Cluster` for wrapping inline groups rather than overloading one component.
- Use `DashboardGrid` for responsive dashboard card/control placement, with tokenized gap and minimum tile width options.
- Use `DashboardShell` to frame Navbar, optional Sidebar/Rail, main content, and optional aside/status region.
- Use semantic navigation for Navbar/Sidebar and expose active state through `aria-current`, text/structural cues, and tokenized borders or markers.
- Keep layout primitives low-level and presentational; they do not fetch data, manage routing, or own smart home state.

## Phase 1 Design Summary

- Data model defines Stack, Cluster, Navbar, NavigationItem, DashboardShell, DashboardGrid, Section, Sidebar, and DashboardCompositionExample.
- Public contract is documented in `contracts/component-props.md`.
- Quickstart covers Stack, Navbar keyboard navigation, responsive dashboard composition, empty/loading sections, compact/wide layout review, and accessibility checks.

## Complexity Tracking

No constitution violations or exceptional complexity are required.
