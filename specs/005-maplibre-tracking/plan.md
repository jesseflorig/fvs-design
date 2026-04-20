# Implementation Plan: Map Tracking Component

**Branch**: `005-maplibre-tracking` | **Date**: 2026-04-20 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/005-maplibre-tracking/spec.md`

## Summary

A React component that renders a MapLibre GL JS interactive map using OpenFreeMap vector tiles, with a custom HTML marker displaying an amber pulsing dot to indicate live object tracking. The map uses a compact custom dark style JSON to satisfy the FVS Engineered Aesthetics constitution principle. The marker and pulse animation are DOM elements using CSS custom properties for token-compliant color. No React wrapper library — direct `maplibre-gl` API via `useRef`.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)  
**Primary Dependencies**: `maplibre-gl` (direct, no React wrapper), OpenFreeMap tile service  
**Storage**: N/A — component is stateless with respect to persistence  
**Testing**: Storybook visual + a11y (axe); no Vitest unit tests for canvas output  
**Target Platform**: Web browser (Chromium, Firefox, Safari) — WebGL required  
**Project Type**: React component library (design system)  
**Performance Goals**: Map tiles visible within 3 s on broadband; marker position update < 100 ms  
**Constraints**: No API key; offline tile loading not required; single tracked object only  
**Scale/Scope**: Single component, single Storybook story file

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked post-design below.*

### I. Engineered Aesthetics — PASS (with explicit handling)

- Map basemap uses a custom dark style: black land (`#0A0A0B`), near-black water/roads. No consumer-app color palette.
- Pulse animation: CSS `ease-out`, no bounce or spring. Duration 2 s. Mechanical outward ring fade.
- Marker dot: circular (10 px × 10 px, `border-radius: 5px` — within 0–8 px radius guideline at pixel scale).
- Amber dot color: `--fvs-amber` (#E8A33D) — the constitutionally specified "live/active" signal.

### II. Token-First Architecture — PASS (with justified exception)

- Marker dot and pulse ring: all colors via `var(--fvs-amber)` CSS custom property — fully token-compliant.
- Map basemap style JSON: **hardcoded hex values required**. MapLibre's WebGL renderer processes the style JSON in a non-CSS context and cannot resolve CSS custom properties. The hex values used are exact literal values of FVS tokens (documented with cross-references in `mapStyle.ts`). This is a renderer constraint, not a design drift.
- No hardcoded values in component `.tsx` files.

### III. Component Isolation via Storybook — PASS

- Storybook story committed with the component (required).
- Three story variants: `Default`, `NoPosition`, `Live`.
- Stories are the specification for props, variants, and states.

### IV. Content Voice Compliance — PASS

- No labels, buttons, or copy in the component itself.
- Accessible name defaults to `"Live tracking map"` — technical, understated, sentence case.

### V. Keyboard-First Accessibility — PASS

- MapLibre GL JS provides built-in keyboard pan/zoom (arrow keys, +/−, Escape).
- Map container focus ring overridden to 2 px solid `--fvs-amber` at 2 px offset.
- `aria-label` on the map container region element.
- Marker is a visual indicator only (non-interactive) — no focus needed on the dot itself.
- Color is not the sole state differentiator: the pulse animation also signals "live" status.

### Post-Design Re-check — PASS

All constitution principles satisfied. The Token-First exception for MapLibre style JSON is justified and documented.

## Project Structure

### Documentation (this feature)

```text
specs/005-maplibre-tracking/
├── plan.md              ✓ This file
├── research.md          ✓ Phase 0 output
├── data-model.md        ✓ Phase 1 output
├── quickstart.md        ✓ Phase 1 output
├── contracts/
│   └── TrackingMap.props.ts  ✓ Phase 1 output
├── checklists/
│   └── requirements.md  ✓ Spec quality gate
└── tasks.md             ← Phase 2 output (/speckit.tasks — not yet created)
```

### Source Code (repository root)

```text
src/
└── components/
    └── TrackingMap/
        ├── index.ts              # Re-export barrel
        ├── TrackingMap.tsx       # Component implementation
        ├── TrackingMap.stories.tsx  # Storybook stories (Default, NoPosition, Live)
        └── mapStyle.ts           # MapLibre StyleSpecification — dark FVS basemap
```

**Structure decision**: Single component folder, consistent with existing `Button/`, `Gauge/`, `Slider/` layout. No additional directories needed; the map style is co-located as a sibling module.

## Complexity Tracking

No constitution violations requiring justification.
