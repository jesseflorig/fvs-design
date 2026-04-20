# Implementation Plan: Initial Design System Site

**Branch**: `001-initial-site` | **Date**: 2026-04-19 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/001-initial-site/spec.md`

## Summary

Build the Fleet Van Systems design system as a Storybook 8 + React + TypeScript + Tailwind site. The site surfaces all FVS design tokens as standalone browseable sections, six interactive UI components with full variant/state coverage, and a brand section covering logo, typography specimens, iconography usage guide, and voice guidelines. A Storybook theme applies the FVS visual language to the catalog sidebar, and an addon-themes decorator enables live light/console theme switching across all stories.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: React 18, Tailwind CSS 3, Storybook 8 (Vite builder), Lucide React, Vite 5  
**Storage**: N/A — static site, no persistence  
**Testing**: Storybook play functions (interaction tests), manual a11y audit (axe DevTools)  
**Target Platform**: Modern browser (Chrome/Firefox/Safari latest), static export  
**Project Type**: Design system catalog (Storybook site)  
**Performance Goals**: First story render < 2s on local dev; no runtime performance target (reference tool)  
**Constraints**: All FVS token values sourced exclusively from `src/tokens/tokens.css`; no hardcoded hex/px in components  
**Scale/Scope**: ~15 story files (6 component stories + 8 token/brand doc pages); single repo

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Engineered Aesthetics | ✅ PASS | All visual decisions flow from `tokens.css`; preview HTMLs are the pixel reference |
| II. Token-First Architecture | ✅ PASS | `tokens.css` → `tailwind.config.ts` is the single chain; no hardcoded values in components |
| III. Component Isolation via Storybook | ✅ PASS | Every component gets a story before page integration; CSF 3 + TypeScript strict |
| IV. Content Voice Compliance | ✅ PASS | Story labels, knob values, and placeholder text must follow sentence case / UPPER mono rules |
| V. Keyboard-First Accessibility | ✅ PASS | Focus ring (2px solid amber, 2px offset) enforced via Tailwind `focus-visible` utilities; semantic HTML required |

No violations. No Complexity Tracking entry needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-initial-site/
├── plan.md              ← this file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   └── stories.md       ← Phase 1 output — story API contracts
└── tasks.md             ← Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── tokens/
│   ├── tokens.css              # FVS CSS custom properties (source of truth)
│   └── tailwind.config.ts      # Tailwind extension: maps --fvs-* to Tailwind utilities
├── assets/
│   ├── fonts/                  # Self-hosted: Michroma-Regular.ttf, SpaceMono-*.ttf
│   └── svg/                    # logo.svg, mark.svg, favicon.svg, van-blueprint.svg
├── lib/
│   └── resolve-token.ts        # getComputedStyle utility for live token values
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Badge/
│   │   ├── Badge.tsx
│   │   ├── Badge.stories.tsx
│   │   └── index.ts
│   ├── Card/
│   │   ├── Card.tsx
│   │   ├── Card.stories.tsx
│   │   └── index.ts
│   ├── Input/
│   │   ├── Input.tsx
│   │   ├── Input.stories.tsx
│   │   └── index.ts
│   ├── DataTable/
│   │   ├── DataTable.tsx
│   │   ├── DataTable.stories.tsx
│   │   └── index.ts
│   └── Divider/
│       ├── Divider.tsx
│       ├── Divider.stories.tsx
│       └── index.ts
└── stories/
    ├── tokens/
    │   ├── Colors.stories.tsx
    │   ├── Typography.stories.tsx
    │   ├── Spacing.stories.tsx
    │   ├── Radius.stories.tsx
    │   ├── Shadows.stories.tsx
    │   └── Motion.stories.tsx
    └── brand/
        ├── Logo.stories.tsx
        ├── Typography.stories.tsx   # Typeface specimens
        ├── Iconography.stories.tsx
        └── Voice.stories.tsx

.storybook/
├── main.ts                     # Vite builder, addons config
├── preview.ts                  # Import tokens.css; addon-themes decorator
├── preview-head.html           # @font-face declarations for self-hosted fonts
└── theme.ts                    # FVS Storybook sidebar theme (createTheme)
```

**Structure Decision**: Single project. All token, component, and brand stories live under `src/`. The `.storybook/` directory configures Storybook behavior. No monorepo — this is a reference catalog, not a distributed library.
