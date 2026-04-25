# Implementation Plan: Control Tiles

**Branch**: `007-control-tiles` | **Date**: 2026-04-25 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/007-control-tiles/spec.md`

## Summary

Refine the `Control Tiles` category into a uniform-footprint, non-overlapping home automation surface with a calmer, more minimal interaction model. The implementation will keep the existing React 18 + TypeScript + Tailwind token stack, but replace the mixed-size tile concept with a single standard tile footprint, explicit toggle-state communication, and layout primitives that guarantee clean portrait and landscape composition on the 5.5-inch 1920x1080 target display.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: React 18, Tailwind CSS, Storybook 10, Vitest, Lucide React, existing `src/tokens/tokens.css` and `tailwind.config.ts`  
**Storage**: N/A - presentational component library, no persistence  
**Testing**: Vitest + Storybook addon-vitest, Storybook addon-a11y, Storybook build validation, manual portrait and landscape story review  
**Target Platform**: Browser-rendered Storybook component library for touch-first home control surfaces  
**Project Type**: Component library  
**Performance Goals**: Uniform tiles reflow between portrait and landscape without visible overlap, clipping, or jank; toggle-state feedback is immediately perceptible on interaction  
**Constraints**: Token-first styling only; 0-8px radii maximum; keyboard-operable interactions; uniform tile footprint; no overlap in any supported grid composition; minimal visual density; clear on/off/transition states; Home-control-inspired calmness without reproducing another product's exact appearance  
**Scale/Scope**: 2 primary public components, shared type contracts, layout utilities, token updates, and Storybook scenarios for status-only, toggleable, unavailable, and responsive grid states

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| **I. Engineered Aesthetics** | PASS | The revised direction reduces density and removes the previous mixed-size dashboard feel, but still stays inside the NASA/IBM system through restrained color, hard edges, minimal decoration, and tokenized linework. The Home-control influence is treated as behavioral and compositional guidance, not as a visual override of the brand system. |
| **II. Token-First Architecture** | PASS | Uniform tile spacing, padding, state surfaces, motion, and layout spacing will remain token-driven in `src/tokens/tokens.css` and surfaced through `tailwind.config.ts`. No hardcoded visual values are required by the revised plan. |
| **III. Component Isolation via Storybook** | PASS | `ControlTile` and `ControlTileGrid` remain Storybook-first artifacts. Revised stories will explicitly cover uniform tile layouts, toggle states, and portrait/landscape behavior before any broader integration. |
| **IV. Content Voice Compliance** | PASS | Tile labels, state names, and control copy remain technical and understated. The revised minimal format reduces copy volume rather than relaxing the voice constraints. |
| **V. Keyboard-First Accessibility** | PASS | The revised plan keeps semantic toggles and buttons, visible amber focus treatment, and non-color state differentiation. The simplified format improves keyboard scanability rather than weakening it. |

Post-design re-check: all principles remain PASS. No constitution violations are introduced by the revised design artifacts below.

## Project Structure

### Documentation (this feature)

```text
specs/007-control-tiles/
├── plan.md                 # This file
├── research.md             # Phase 0 decisions for uniform tiles, toggle states, and layout rules
├── data-model.md           # Phase 1 entity and prop-shape definitions
├── quickstart.md           # Phase 1 usage and validation scenarios
├── contracts/
│   └── component-props.md  # Public component contracts for tile and grid primitives
└── tasks.md                # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Button/
│   ├── Card/
│   ├── Slider/
│   └── ControlTiles/
│       ├── index.ts
│       ├── types.ts
│       ├── layout.ts
│       ├── fixtures/
│       │   └── controlTileExamples.ts
│       ├── ControlTile/
│       │   ├── ControlTile.tsx
│       │   └── ControlTile.stories.tsx
│       └── ControlTileGrid/
│           ├── ControlTileGrid.tsx
│           └── ControlTileGrid.stories.tsx
├── tokens/
│   └── tokens.css
└── lib/
    └── resolve-token.ts
```

**Structure Decision**: Single-project component library. The current `src/components/ControlTiles/` location remains correct, but the implementation direction changes from mixed-size layout support to a single, standard tile footprint with revised grid rules and simplified tile internals.

## Key Design Decisions

### Uniform Tile Footprint

All standard layout composition uses one tile footprint. Variation comes from content density and state expression, not from changing grid span. This keeps composition regular, eliminates the previous mixed-size complexity, and aligns with the revised requirement that layout components must never permit overlap.

### Non-Overlapping Grid Rules

The grid primitive will own placement rules rather than allowing arbitrary span combinations. Portrait and landscape modes may change column count and spacing, but not tile footprint. Layout behavior must guarantee that every tile occupies a distinct cell and that partially filled rows remain visually coherent.

### Minimal Home-Control Presentation

Tiles should read as calm residential controls rather than compact dashboard modules. Status remains first, but the visible information set is reduced to what is necessary: title, state, optional short context, and minimal control affordance. Toggleable devices should make off, on, transitioning, and unavailable states obvious without visual clutter.

### Explicit Toggle State Contract

The tile contract must distinguish passive status from active toggle state. A control tile must be able to communicate inactive, active, transitioning, failed, and unavailable conditions directly on the tile surface, even when the visible control is visually minimal.

### Storybook Acceptance Strategy

Stories will validate:

- minimal status-only tiles
- on/off toggle tiles
- unavailable and warning states
- portrait and landscape uniform-grid layouts
- edge-row behavior and partially filled layouts
- low-clutter compositions that still preserve FVS focus, token, and accessibility rules

## Dependencies to Add

No new runtime or dev dependencies are required. The revised feature continues to use the repository's existing React, Storybook, Tailwind, Vitest, and Lucide stack.
