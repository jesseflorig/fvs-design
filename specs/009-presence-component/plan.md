# Implementation Plan: Presence Component

**Branch**: `009-presence-component` | **Date**: 2026-05-03 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/009-presence-component/spec.md`

## Summary

Add an isolated Presence component that displays a person's avatar and one of three availability states: Present, Near, or Away. Present uses a blue status border with a color avatar, Near uses a yellow/amber status border with a color avatar, and Away uses a grey status border with a subdued black-and-white avatar treatment. The implementation will follow the existing React 18 + TypeScript component-library conventions, use tokenized FVS colors and spacing, provide Storybook stories for all statuses and fallback states, and verify that status is available through accessible text rather than color alone.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: React 18, Tailwind CSS token mapping, Storybook 10, Vitest, Storybook addon-a11y, existing `src/tokens/tokens.css`, existing component/story conventions, provided avatar JPEG fixtures  
**Storage**: N/A - presentational component library, no persistence  
**Testing**: Vitest + Storybook addon-vitest, Storybook addon-a11y, TypeScript typecheck, ESLint, visual review in Storybook for all statuses and compact layout  
**Target Platform**: Browser-rendered Storybook component library  
**Project Type**: Component library  
**Performance Goals**: Presence status changes should not cause visible layout shift; avatar image treatment should apply immediately in Storybook; compact and standard examples should avoid overlap or ambiguous cropping  
**Constraints**: Token-first styling only; 0-8px radii maximum except circular avatar clipping; no decorative gradients or consumer-app styling; status cannot rely on color alone; no persistence, live presence integration, or fetching in this feature; provided avatar fixtures are demo/test assets only  
**Scale/Scope**: One public Presence component, three supported statuses, avatar fallback behavior, Storybook stories using the provided avatar examples, component contract documentation, and focused validation scenarios

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| **I. Engineered Aesthetics** | PASS | The component is a compact instrument-style identity/status element. Blue, amber/yellow, and grey are used as restrained border/status signals, not decorative surfaces; all other treatment remains neutral and tokenized. |
| **II. Token-First Architecture** | PASS | Status borders, subdued Away treatment, spacing, type, radius, and focus treatment will use existing tokens or paired token additions in `tokens.css` and `tailwind.config.ts` if the implementation finds an unavailable status token. |
| **III. Component Isolation via Storybook** | PASS | The feature is delivered as an isolated component with stories for Present, Near, Away, missing avatar fallback, compact display, and mixed-status examples before any page integration. |
| **IV. Content Voice Compliance** | PASS | Status labels are concise user-facing terms from the spec: Present, Near, Away. Any support labels remain technical and understated. |
| **V. Keyboard-First Accessibility** | PASS | The component is primarily presentational and exposes text-accessible status. If the implementation adds any focusable affordance, it must use semantic elements and the amber focus outline. Color is not the only state cue. |

Post-design re-check: all principles remain PASS. The generated model, contract, and quickstart preserve component isolation, token-first styling, restrained signal color use, and accessible status text.

## Project Structure

### Documentation (this feature)

```text
specs/009-presence-component/
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
├── assets/
│   └── jpeg/
│       ├── avatar_carolyn.jpeg
│       ├── avatar_hank.jpeg
│       └── avatar_jesse.jpeg
├── components/
│   └── Presence/
│       ├── Presence.tsx
│       ├── Presence.stories.tsx
│       └── index.ts
└── tokens/
    └── tokens.css
```

**Structure Decision**: Single-project component library. The Presence component should live in its own `src/components/Presence/` directory because it is a reusable identity/status primitive, not a control tile, form input, or page-level feature. Avatar JPEGs remain fixture/demo assets for Storybook and tests.

## Phase 0 Research Summary

- Use a dedicated `Presence` component rather than extending `Badge` or creating only a story-level composition.
- Model status as a strict three-value union: Present, Near, Away.
- Map status visuals to existing signal tokens: Present to the informational blue token, Near to the amber/live token, and Away to the offline grey token.
- Use CSS image filtering for the Away avatar treatment while preserving a readable fallback when images fail.
- Provide visible and accessible status text; do not rely on border color alone.
- Keep sizing stable across statuses and support compact/standard display variants through props or fixed tokenized dimensions.

## Phase 1 Design Summary

- Data model defines `Presence`, `Person`, `PresenceStatus`, `AvatarImage`, `AvatarFallback`, and `PresenceSize`.
- Public contract is documented in `contracts/component-props.md`.
- Quickstart covers Storybook review, status visual validation, missing avatar fallback, accessibility checks, compact layout, and status-change stability.

## Complexity Tracking

No constitution violations or exceptional complexity are required.
