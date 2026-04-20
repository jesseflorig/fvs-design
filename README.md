# FVS Design System

Component library and design language reference for Fleet Van Systems. Built with Storybook 8, React 18, and TypeScript — the Storybook site is the primary deliverable.

Design language: NASA mission control meets early IBM industrial. Black, off-white, amber. No decoration — whitespace and hairlines do the work.

---

## Quick start

```bash
npm install
npm run storybook        # Dev server → http://localhost:6006
npm run build-storybook  # Static export
npm run typecheck        # tsc --noEmit
npm run mcp              # Storybook MCP server → http://localhost:6007/mcp
```

---

## Components

| Component | Variants / States |
|---|---|
| `Button` | primary · secondary · ghost · accent · danger · icon |
| `Badge` | nominal · live · fault · info · offline · neutral · solid |
| `Card` | panel-header with optional badge and hover state |
| `Input` | text · select · toggle · checkbox |
| `DataTable` | sortable columns, semantic row colors, optional caption |
| `Divider` | hair · standard · strong · double |

## Token reference

| Section | What it covers |
|---|---|
| Colors | Neutral scale, signal palette, role tokens (light + console) |
| Typography | Type scale, line heights, tracking, font families |
| Spacing | 4px base scale |
| Radius | 0–8px range |
| Shadows | 3-tier elevation + console glow |
| Motion | Duration and easing presets |

## Brand

Logo, type specimens (Michroma, Space Mono, IBM Plex Sans/Serif), iconography rules, and voice guidelines.

---

## Design tokens

All values are CSS custom properties defined in `src/tokens/tokens.css`. Two themes:

- **Default** — light, off-white surfaces (`--bg: #F2F1EE`)
- **Console** — dark telemetry mode (`--bg: #0A0A0B`), toggled via `data-theme="console"`

No hardcoded hex, px, or timing values in component code. Token changes propagate everywhere.

---

## Fonts

| Family | Use | Hosting |
|---|---|---|
| Michroma | Display / headlines | Self-hosted `.ttf` in `src/assets/fonts/` |
| Space Mono | Telemetry data, mono labels | Self-hosted `.ttf`, 4 weights |
| IBM Plex Sans | Body, UI | Google Fonts CDN |
| IBM Plex Serif | Long-form | Google Fonts CDN |

---

## Accessibility

WCAG 2.1 AA target. All interactive components are keyboard-operable. Focus state: 2px solid amber (`--accent`) with 2px offset. Color is never the sole differentiator for state.

---

## Storybook MCP

A Model Context Protocol server exposes component documentation to AI tooling.

```bash
npm run mcp   # starts at http://localhost:6007/mcp
```

Requires Storybook running on port 6006. Configured in `.claude/settings.json`.

---

## Development workflow

Features move through discrete phases using the spec-kit framework (`.specify/`):

```
specify → clarify → plan → tasks → analyze → implement
```

Slash commands via Claude Code: `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`, and others. See `CLAUDE.md` for full reference.

---

## Constitution

Five non-negotiable principles govern all design decisions — see `.specify/memory/constitution.md`.

1. **Engineered aesthetics** — Every visual decision traces to the NASA/IBM industrial language.
2. **Token-first architecture** — No hardcoded values anywhere in component code.
3. **Component isolation via Storybook** — Every component has a story before it ships.
4. **Content voice compliance** — Technical, confident, understated. No marketing verbs.
5. **Keyboard-first accessibility** — Semantic HTML, visible focus, WCAG 2.1 AA minimum.

Constitution violations found at analysis are CRITICAL and block implementation.
