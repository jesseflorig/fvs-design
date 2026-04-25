# Implementation Plan: Light Control Tile

**Branch**: `008-light-control-tile` | **Date**: 2026-04-25 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/008-light-control-tile/spec.md`

## Summary

Add a specialized Light Control Tile to the existing Control Tiles category. The component will present a compact, operator-readable light surface with brightness status/control, optional tunable warmth status/control, optional red LED night mode status/control, and explicit availability/update states. The implementation will stay inside the current React 18 + TypeScript design-system stack, reuse existing token and Storybook conventions, and provide focused stories for dimmable-only, tunable, night-mode, unavailable, and transitioning states.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: React 18, Tailwind CSS, Storybook 10, Vitest, Storybook addon-a11y, Lucide React, existing `src/tokens/tokens.css`, existing `src/components/ControlTiles/` patterns, existing `src/components/Slider/Slider.tsx` interaction pattern  
**Storage**: N/A - presentational component library, no persistence  
**Testing**: Vitest + Storybook addon-vitest, Storybook addon-a11y, TypeScript typecheck, ESLint, manual keyboard and compact-layout review in Storybook  
**Target Platform**: Browser-rendered Storybook component library for compact home-control surfaces  
**Project Type**: Component library  
**Performance Goals**: Tile interactions update visible state immediately in Storybook; compact tile layout avoids overlap, ambiguous truncation, and visible layout shift across supported stories  
**Constraints**: Token-first styling only; 0-8px radii maximum; no decorative gradients or consumer-app styling; keyboard-operable brightness, warmth, and night mode controls; status must not rely on color alone; no persistence or device integration in this feature  
**Scale/Scope**: One specialized public component, shared light-control types, Storybook stories and fixtures, contract documentation, and validation scenarios for supported/unsupported capability combinations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| **I. Engineered Aesthetics** | PASS | The tile remains a restrained instrument-style control surface: tokenized neutral surfaces, amber focus/accent, hard radii, quiet linework, and no decorative treatment. Red LED mode is communicated as device state, not as a broad decorative palette change. |
| **II. Token-First Architecture** | PASS | All visual values for spacing, color, radius, typography, focus, and motion will come from existing tokens or scoped feature tokens added to `tokens.css` and `tailwind.config.ts` together if new tokens are required. |
| **III. Component Isolation via Storybook** | PASS | The feature is delivered as an isolated component with stories for each capability and state before any application integration. |
| **IV. Content Voice Compliance** | PASS | Labels use direct, understated control language: brightness, warmth, night mode, red LED, unavailable, updating. System labels remain uppercase mono where appropriate. |
| **V. Keyboard-First Accessibility** | PASS | Brightness and warmth controls follow slider semantics; night mode follows switch semantics; all controls require visible amber focus treatment and accessible names. Color is never the only state indicator. |

Post-design re-check: all principles remain PASS. The generated model, contracts, and quickstart keep the component isolated, token-first, and keyboard-accessible.

## Project Structure

### Documentation (this feature)

```text
specs/008-light-control-tile/
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
│   ├── ControlTiles/
│   │   ├── index.ts
│   │   ├── types.ts
│   │   ├── fixtures/
│   │   │   └── lightControlTileExamples.ts
│   │   └── LightControlTile/
│   │       ├── LightControlTile.tsx
│   │       └── LightControlTile.stories.tsx
│   └── Slider/
│       └── Slider.tsx
├── tokens/
│   └── tokens.css
└── lib/
    └── resolve-token.ts
```

**Structure Decision**: Single-project component library. The Light Control Tile should live under `src/components/ControlTiles/` as a specialized member of that category, not as a generic input or standalone page. Shared light-control data types may live in `ControlTiles/types.ts` unless implementation complexity warrants a local type file.

## Phase 0 Research Summary

- Use a specialized `LightControlTile` rather than overloading the generic `ControlTile`.
- Use bounded percentage values for brightness and a six-stop warmth model ordered Cool White, Daylight, Neutral White, Soft White, Warm White, Candlelight.
- Use native/ARIA slider semantics for brightness and warmth, and switch semantics for red LED night mode.
- Represent unsupported capabilities by omission by default; disabled presentation is reserved for known capabilities that are temporarily unavailable.
- Keep red LED night mode as explicit text/state plus a restrained red indicator, not a full red-themed tile surface.

## Phase 1 Design Summary

- Data model defines `LightControlTile`, `DimmerLevel`, `WarmthSetting`, `NightModeState`, `AvailabilityStatus`, and `LightCapabilitySupport`.
- Public contract is documented in `contracts/component-props.md`.
- Quickstart covers Storybook review, keyboard operation, accessibility checks, unsupported capability behavior, unavailable state, and compact layout validation.

## Complexity Tracking

No constitution violations or exceptional complexity are required.
