# Quickstart: Layout Components

**Branch**: `011-layout-components` | **Date**: 2026-05-04

## Setup

```bash
npm run storybook
```

Open the Layout component stories in Storybook after implementation.

## Scenario 1: Stack

1. Open the Stack stories.
2. Confirm vertical and horizontal examples use consistent spacing.
3. Confirm alignment options keep mixed labels, values, icons, and actions readable.
4. Confirm wrapped horizontal content preserves readable gaps at compact width.

## Scenario 2: Navbar

1. Open the Navbar story.
2. Confirm items include Overview, Rooms, Climate, Lighting, Security, and Energy.
3. Confirm one item is visibly active and exposed as current.
4. Tab through all enabled navigation items.
5. Expected: focus is visible and disabled items are not operable.
6. Resize to compact width.
7. Expected: active destination remains visible and navigation does not overlap.

## Scenario 3: Additional Layout Primitives

1. Open the DashboardShell, DashboardGrid, Section, Sidebar, and Cluster stories.
2. Confirm each component solves a distinct dashboard layout need.
3. Confirm stories do not rely on decorative page treatments.
4. Confirm empty or loading Section examples preserve layout structure.

## Scenario 4: Smart Home Dashboard Composition

1. Open the integrated dashboard composition story.
2. Confirm the example includes lighting, climate, security, presence, and energy areas.
3. Confirm at least 90% of visible layout groupings use layout components rather than ad hoc wrappers.
4. Review compact and wide viewports.
5. Expected: no text, controls, cards, or navigation items overlap.

## Scenario 5: Accessibility Sweep

1. Run Storybook accessibility checks on all Layout stories.
2. Expected: zero automated accessibility violations.
3. Manually verify active and disabled navigation states are understandable without color alone.

## Scenario 6: Repository Validation

```bash
npm run typecheck
npm run lint
npm test
```

Expected: all commands pass after implementation.

## Validation Notes

- 2026-05-04: Implemented Stack, Cluster, DashboardGrid, DashboardShell, Section, Sidebar, Navbar, shared layout types, token helpers, examples, and grouped Storybook stories.
- 2026-05-04: Reviewed Layout component source for tokenized spacing/color/radius usage, restrained surfaces, and focus only on interactive navigation items.
- 2026-05-04: Storybook accessibility checks pass through `npm test`; duplicate sidebar landmark labels were corrected during validation.
- 2026-05-04: Compact/wide behavior is represented by wrapping Stack/Cluster examples, scroll and wrap Navbar examples, responsive DashboardGrid stories, collapsed Sidebar, and integrated DashboardShell composition.
- 2026-05-04: `npm run typecheck`, `npm run lint`, and `npm test` pass.
