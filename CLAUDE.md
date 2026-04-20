# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repository Is

This is a **spec-kit design workspace** — a structured environment for feature specification, planning, and implementation using the `.specify/` framework. There is no application code here; the repository is the planning layer for a project called `fvs-design`.

The spec-kit workflow moves features through discrete phases:
1. **Specify** — capture requirements as a technology-agnostic spec
2. **Clarify** — resolve open questions before planning
3. **Plan** — produce design artifacts (data model, contracts, research)
4. **Tasks** — break the plan into an ordered, checkable task list
5. **Analyze** — cross-check spec/plan/tasks for consistency before building
6. **Implement** — execute tasks in dependency order

## Skills (Primary Interface)

All workflow phases are exposed as slash commands via installed skills in `.claude/skills/`:

| Skill | Trigger | What it does |
|---|---|---|
| `speckit-specify` | `/speckit.specify <description>` | Creates feature branch + spec.md from natural language |
| `speckit-clarify` | `/speckit.clarify` | Resolves open questions in the spec |
| `speckit-plan` | `/speckit.plan` | Generates research.md, data-model.md, contracts/ |
| `speckit-tasks` | `/speckit.tasks` | Generates dependency-ordered tasks.md |
| `speckit-analyze` | `/speckit.analyze` | Read-only consistency audit across spec/plan/tasks |
| `speckit-implement` | `/speckit.implement` | Executes tasks.md phase by phase |
| `speckit-checklist` | `/speckit.checklist` | Manages quality checklists |
| `speckit-constitution` | `/speckit.constitution` | Edits project constitution |
| `speckit-taskstoissues` | `/speckit.taskstoissues` | Exports tasks to GitHub issues |

## Architecture

### Feature Directory Layout

Each feature branch gets a directory under `.specify/specs/<branch-name>/`:

```
.specify/specs/<branch>/
  spec.md          — user-facing requirements (technology-agnostic)
  plan.md          — technical design, stack, architecture
  research.md      — resolved unknowns and technology decisions
  data-model.md    — entities, relationships, validation rules
  tasks.md         — ordered implementation checklist
  contracts/       — interface contracts (API endpoints, CLI schemas, etc.)
  quickstart.md    — integration test scenarios
  checklists/      — quality gate checklists
```

### Key Framework Files

- `.specify/memory/constitution.md` — project principles that govern all design decisions; constitution violations are always CRITICAL in analysis
- `.specify/init-options.json` — workspace config (branch numbering mode: `sequential`)
- `.specify/templates/` — templates for all artifact types (plan, spec, tasks, checklist, agent-file)
- `.specify/integrations/claude/` — Claude Code integration; `update-context.sh` keeps CLAUDE.md current

### Scripts

Run from repo root:

```bash
# Create a new feature branch and spec scaffold
.specify/scripts/bash/create-new-feature.sh --json --short-name "my-feature" "Feature description"

# Set up plan template for current branch
.specify/scripts/bash/setup-plan.sh --json

# Validate prerequisites before plan/tasks/implement steps
.specify/scripts/bash/check-prerequisites.sh --json [--require-tasks] [--include-tasks]

# Refresh CLAUDE.md from current plan.md
.specify/integrations/claude/scripts/update-context.sh
```

### Branch Convention

Branches use sequential numbering: `1-short-name`, `2-short-name`, etc. The number is auto-assigned — never pass `--number` manually.

## Constitution

The project constitution is at `.specify/memory/constitution.md` (v1.0.0, ratified 2026-04-19). Five principles: Engineered Aesthetics, Token-First Architecture, Component Isolation via Storybook, Content Voice Compliance, Keyboard-First Accessibility. The constitution is **non-negotiable** — all specs, plans, and task lists must comply with it. Use `/speckit.constitution` to edit it.

## Active Technologies
- TypeScript 5.x (strict mode) + React 18 (useId hook available), Storybook 8 + addon-a11y (axe-core), Tailwind CSS 3 (002-fix-a11y-violations)
- TypeScript 5.x (strict mode) + React 18, Tailwind CSS 3, Storybook 8 + addon-a11y (003-gauge-component)
- TypeScript 5.x (strict mode) + React 18 (useId, useRef, useState, useCallback), Storybook 8 + addon-a11y (004-slider-component)

From `001-initial-site`:

- **TypeScript 5.x** — strict mode (`noImplicitAny`, `strictNullChecks`)
- **React 18** — functional components + hooks only
- **Tailwind CSS 3** — extended with `var(--fvs-*)` CSS custom properties
- **Storybook 8** — `@storybook/react-vite`, CSF 3, TypeScript stories
- **Vite 5** — dev server + static build
- **Lucide React** — tree-shaken icon imports, 1.5px stroke, never filled
- **@storybook/addon-themes** — console theme toggle via `data-theme` attribute
- **@storybook/addon-a11y** — axe-based accessibility checks in stories

Fonts:
- Michroma (display) — self-hosted `.ttf` in `src/assets/fonts/`
- Space Mono (telemetry/data) — self-hosted `.ttf`, 4 weights
- IBM Plex Sans + IBM Plex Serif — Google Fonts CDN (self-hosting is a follow-on task)

## Project Structure

```text
src/
├── tokens/
│   ├── tokens.css              # FVS design tokens — source of truth
│   └── tailwind.config.ts      # Tailwind extension referencing CSS vars
├── assets/
│   ├── fonts/                  # Self-hosted Michroma, Space Mono
│   └── svg/                    # logo.svg, mark.svg, favicon.svg, van-blueprint.svg
├── lib/
│   └── resolve-token.ts        # Runtime CSS var resolver (getComputedStyle)
├── components/
│   ├── Button/                 # variant: primary|secondary|ghost|accent|danger|icon
│   ├── Badge/                  # status: nominal|live|fault|info|offline|neutral
│   ├── Card/                   # panel-header pattern
│   ├── Input/                  # text, select, toggle, checkbox
│   ├── DataTable/              # mono headers, tabular-nums, semantic row colors
│   └── Divider/                # hair|standard|strong|double
└── stories/
    ├── tokens/                 # Colors, Typography, Spacing, Radius, Shadows, Motion
    └── brand/                  # Logo, TypeSpecimens, Iconography, Voice

.storybook/
├── main.ts                     # Vite builder + addons
├── preview.ts                  # Token import, theme decorator, storySort
├── preview-head.html           # @font-face for self-hosted fonts
└── theme.ts                    # FVS sidebar theme (black/amber)
```

## Commands

```bash
npm run storybook          # Start dev server → http://localhost:6006
npm run build-storybook    # Build static export
npm run typecheck          # tsc --noEmit
```

## Code Style

- No hardcoded hex, px, or timing values in component files — all from tokens
- Tailwind utilities preferred over inline `style`; use `style` only for dynamic token values
- `focus-visible:outline-2 focus-visible:outline-[var(--fvs-amber)]` on all interactive elements
- Story `title` hierarchy: `Tokens/X`, `Components/X`, `Brand/X`
- No `any` — use `unknown` + type narrowing when necessary

## Recent Changes
- 004-slider-component: Added TypeScript 5.x (strict mode) + React 18 (useId, useRef, useState, useCallback), Storybook 8 + addon-a11y
- 003-gauge-component: Added TypeScript 5.x (strict mode) + React 18, Tailwind CSS 3, Storybook 8 + addon-a11y
- 002-fix-a11y-violations: Added TypeScript 5.x (strict mode) + React 18 (useId hook available), Storybook 8 + addon-a11y (axe-core), Tailwind CSS 3


**Last updated**: 2026-04-20
