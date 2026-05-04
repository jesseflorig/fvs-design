# Implementation Plan: Amber Dim Contrast

**Branch**: `010-amber-dim-contrast` | **Date**: 2026-05-04 | **Spec**: [spec.md](spec.md)  
**Input**: Feature specification from `/specs/010-amber-dim-contrast/spec.md`

## Summary

Update the dim amber signal token so it is as light as possible while preserving WCAG AA contrast for normal text on supported light surfaces, and correct the Signal Semantic color-story caption so the token is documented as accessible amber for light surfaces. Research resolves the new dim amber value to `#946421` using the existing dim-amber hue family and 4.5:1 contrast checks against the light page and elevated surfaces.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode), CSS custom properties  
**Primary Dependencies**: React 18, Storybook 10, Vitest with Storybook addon-a11y, existing `src/tokens/tokens.css`, existing `tailwind.config.ts`, existing `src/stories/tokens/Colors.stories.tsx`, WCAG contrast calculation  
**Storage**: N/A - design token and documentation update, no persistence  
**Testing**: Vitest + Storybook addon-a11y, TypeScript typecheck, ESLint, manual contrast calculation review for `--fvs-amber-dim` on light surfaces  
**Target Platform**: Browser-rendered Storybook design-system catalog  
**Project Type**: Component library / design token catalog  
**Performance Goals**: Token update has no runtime performance impact; Storybook color token story remains responsive and resolves token values immediately  
**Constraints**: Token-first architecture; regular `--fvs-amber` remains unchanged; updated `--fvs-amber-dim` must remain amber and pass at least 4.5:1 contrast against `--fvs-paper` and `--fvs-white`; caption must describe light-surface usage and avoid dark-surface wording  
**Scale/Scope**: One token value in `src/tokens/tokens.css`, existing Tailwind token mapping verification, one Signal Semantic caption in `src/stories/tokens/Colors.stories.tsx`, and validation notes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| **I. Engineered Aesthetics** | PASS | The selected value stays in the existing amber family and preserves the restrained signal palette. |
| **II. Token-First Architecture** | PASS | The visual change is made at the canonical `--fvs-amber-dim` token. Tailwind already maps `fvs-amber-dim` to that CSS variable and will be verified unchanged. |
| **III. Component Isolation via Storybook** | PASS | The user-facing documentation change is isolated in the existing Tokens/Colors Storybook story. |
| **IV. Content Voice Compliance** | PASS | The caption remains concise and technical: accessible amber for light surfaces. |
| **V. Keyboard-First Accessibility** | PASS | This feature directly improves color contrast for semantic text on light surfaces and must not introduce Storybook accessibility violations. |

Post-design re-check: all principles remain PASS. The generated research, data model, contract, and quickstart keep the change token-first, scoped, and accessibility-validated.

## Project Structure

### Documentation (this feature)

```text
specs/010-amber-dim-contrast/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── token-contract.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── tokens/
│   └── tokens.css
└── stories/
    └── tokens/
        └── Colors.stories.tsx

tailwind.config.ts
```

**Structure Decision**: Single-project design-system token update. The token value changes in `src/tokens/tokens.css`; `tailwind.config.ts` should remain a mapping to `var(--fvs-amber-dim)` and be verified, not necessarily edited. The user-facing caption changes in the existing color token story.

## Phase 0 Research Summary

- Use the existing dim-amber hue family and maximize lightness only until contrast would fail.
- Select `#946421` for `--fvs-amber-dim`.
- Validate against both supported light surfaces: `--fvs-paper` (`#F2F1EE`) and `--fvs-white` (`#FBFAF7`).
- Keep `--fvs-amber` unchanged.
- Correct the Signal Semantic caption from dark-surface wording to light-surface accessibility wording.

## Phase 1 Design Summary

- Data model defines Dim Amber Token, Light Surface, Contrast Result, Signal Semantic Caption, and Tailwind Token Mapping.
- Contract documents the required token value, contrast thresholds, unchanged amber token, caption language, and validation commands.
- Quickstart covers contrast verification, Storybook caption review, and repository validation.

## Complexity Tracking

No constitution violations or exceptional complexity are required.
