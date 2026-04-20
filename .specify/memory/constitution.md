<!--
SYNC IMPACT REPORT
==================
Version change: TEMPLATE → 1.0.0
Added sections: Core Principles (5), Technology Stack, Development Workflow, Governance
Modified principles: (initial ratification — no prior principles)
Templates requiring updates:
  ✅ Reviewed plan-template.md — no incompatible references
  ✅ Reviewed spec-template.md — no incompatible references
  ✅ Reviewed tasks-template.md — no incompatible references
Deferred TODOs:
  - RATIFICATION_DATE set to today (2026-04-19), author unknown — update if needed
-->

# Fleet Van Systems Design System Constitution

## Core Principles

### I. Engineered Aesthetics (NON-NEGOTIABLE)

Every visual decision MUST be traceable to the NASA mission control / early IBM industrial design language. The palette is black/off-white/amber. Radii are 0–8px maximum. Shadows are subtle and cool-gray. Animation is mechanical (no bounce, no spring). Decoration is forbidden — whitespace and hairlines do the work.

Rationale: The brand brief is specific. Drift toward consumer-app conventions (pill buttons, colorful icons, rounded corners, playful motion) must be caught at spec review, not post-implementation.

### II. Token-First Architecture (NON-NEGOTIABLE)

All color, type, spacing, radius, shadow, and motion values MUST be expressed as design tokens (`--fvs-*` CSS custom properties surfaced in `tailwind.config`). No hardcoded hex, px, or timing values in component code. Token names must match the canonical set in `colors_and_type.css`.

Rationale: Token-first ensures a single source of truth across Storybook, the design system site, and any downstream product. A token change propagates everywhere; a hardcoded value creates drift.

### III. Component Isolation via Storybook

Every component MUST have a Storybook story before it is integrated into a page. Stories are the specification — they define props, variants, and states. TypeScript strict mode is required; no `any`, no implicit returns. Components MUST NOT reach outside their own props/context (no prop drilling, no ambient globals).

Rationale: Storybook is the primary deliverable of this repository — the design system site. Components that exist only in page context cannot be reviewed, tested, or reused independently.

### IV. Content Voice Compliance

All copy — labels, headings, placeholder text, error messages, status strings — MUST conform to the FVS voice: technical, confident, understated. Sentence case for headlines and UI. UPPERCASE + mono + letter-spacing for system labels, status pills, column headers. No exclamation marks, no emoji, no marketing verbs (_unlock_, _empower_, _elevate_). Numbers must carry units and sign where relevant.

Rationale: The design system includes content as a first-class component. A mis-toned label corrupts the instrument-panel feel as surely as a rounded button.

### V. Keyboard-First Accessibility

All interactive components MUST be keyboard-operable. Focus states MUST use the 2px solid `--accent` (#E8A33D) outline with 2px offset — no suppressing `:focus-visible`. Semantic HTML is required (`button`, `nav`, `main`, `dialog`, etc.). Color MUST NOT be the sole differentiator for state. Target: WCAG 2.1 AA minimum.

Rationale: The operator using this interface may be in a challenging environment (mobile, gloves, low light). Keyboard-first is also engineering discipline — it means the DOM structure is correct.

## Technology Stack

- **Language:** TypeScript (strict mode, `noImplicitAny: true`, `strictNullChecks: true`)
- **UI:** React 18+ (functional components, hooks only — no class components)
- **Styling:** Tailwind CSS with FVS token extension (`tailwind.config.ts` maps all `--fvs-*` tokens)
- **Component catalog:** Storybook 8+ (CSF 3 format, TypeScript stories)
- **Fonts:** Michroma and Space Mono self-hosted in `src/fonts/`; IBM Plex Sans and IBM Plex Serif via Google Fonts CDN (or self-hosted if CDN is blocked)
- **Icons:** Lucide React (1.5px stroke, inherit color — never filled, never > 24px in product UI)
- **Build:** Vite (dev + library mode for component distribution)

## Development Workflow

- Storybook story committed with every new component — no exceptions.
- Constitution Check MUST run at plan-review: flag any spec element that contradicts a principle above.
- Design tokens changed in `tailwind.config.ts` and `src/tokens/tokens.css` simultaneously — never one without the other.
- Amber (#E8A33D) usage reviewed at PR time: if it appears more than three times on a single screen, it requires justification in the PR description.
- No component ships without at least one accessibility check: tab order, focus visibility, color-contrast ratio (AA).

## Governance

This constitution supersedes all other conventions in this repository. Amendments require:
1. A rationale explaining why a principle must change (not just that it's inconvenient).
2. A migration note covering any existing specs, plans, or tasks that the change affects.
3. A version bump per semantic versioning: MAJOR for principle redefinition or removal, MINOR for new principle or expanded guidance, PATCH for clarifications.

All specs and plans MUST include a Constitution Check section. Any violation found at analysis is CRITICAL and blocks implementation until resolved.

Runtime development guidance lives in `.specify/memory/` and `CLAUDE.md`.

**Version**: 1.0.0 | **Ratified**: 2026-04-19 | **Last Amended**: 2026-04-19
