# Research: Map Tracking Component

**Branch**: `005-maplibre-tracking` | **Date**: 2026-04-20

## Decision 1: React + MapLibre GL JS Integration Strategy

**Decision**: Use `maplibre-gl` directly via React `useRef` + `useEffect`, without a React wrapper library.

**Rationale**: The component needs fine-grained lifecycle control: initialize map on mount, update marker on position change, destroy map on unmount. A direct integration is ~150 LOC and has zero additional abstractions. Wrapper libraries (`react-map-gl`, `@vis.gl/react-maplibre`) add meaningful bundle weight and their abstractions don't simplify what this component needs to do.

**Alternatives considered**:
- `@vis.gl/react-maplibre` — React-idiomatic with declarative `<Marker>` components. Rejected: adds ~120 KB bundle weight for a single-component use case; direct imperative API is simpler and more predictable here.
- `react-map-gl` v8 — Same concern as above; also requires coordinating two package versions.

---

## Decision 2: Vector Tile Source and Map Style

**Decision**: Use OpenFreeMap's hosted tile service (`https://tiles.openfreemap.org`) as the vector tile source. Ship a compact inline custom style JSON (≤ 12 layer definitions) rather than loading the full liberty/positron styles.

**Rationale**: The full OpenFreeMap liberty style loads ~60 layer definitions designed for a general-audience basemap. The FVS map component needs a dark instrument-panel aesthetic with minimal visual noise — roads, water, and land only. A custom minimal style achieves this in ~400 lines of JSON and gives us direct color control.

**Style color decisions** (hardcoded hex required — MapLibre style JSON cannot consume CSS custom properties):
| Layer | Hex | FVS token equivalent |
|-------|-----|----------------------|
| Background / land | `#0A0A0B` | `--fvs-black` |
| Water | `#151517` | `--fvs-ink` |
| Roads (minor) | `#2A2A2E` | `--fvs-graphite` |
| Roads (major) | `#3A3A3E` | between graphite and slate |
| Labels | `#8A8A93` | `--fvs-steel` |
| Borders | `#2A2A2E` | `--fvs-graphite` |

**Token-First exception**: MapLibre style JSON is processed by the WebGL renderer and cannot read CSS custom properties. The hardcoded hex values in the style file are the exact values of the corresponding FVS tokens — no drift. This is a renderer constraint, not a design decision. Document in the style file with token cross-references.

**Alternatives considered**:
- Load the full OpenFreeMap liberty style and override colors with `setStyle()` — rejected: triggers a full re-render, and the liberty style has layers we don't need.
- Use a third-party dark tile service (Stadia, MapTiler) — rejected: introduces an API key dependency.
- Self-host OpenFreeMap PMTiles — rejected: outside scope; tile hosting is an infrastructure concern.

---

## Decision 3: Pulse Animation Implementation

**Decision**: Render the tracking marker as a plain HTML `<div>` passed to MapLibre's `Marker` class. Animate the pulse as two DOM elements: a solid inner dot and a transparent expanding ring, both driven by a CSS keyframe animation.

**Rationale**: MapLibre `Marker` accepts any HTMLElement as the marker graphic. DOM-based animation means the pulse uses CSS custom properties for color (token-first compliant), can be paused via `animation-play-state` when the component hides, and is removed automatically when the marker is removed. No WebGL animation API needed.

**Pulse anatomy**:
```
<div class="fvs-tracker">        /* positions the marker */
  <div class="fvs-tracker__ring">  /* pulse ring: scale + fade keyframe */
  <div class="fvs-tracker__dot">   /* solid center dot, always visible */
```

**Animation spec** (mechanical, no bounce per Engineered Aesthetics):
- Duration: 2 s
- Timing: `ease-out`
- Ring: starts at `scale(1) opacity(0.6)`, ends at `scale(3) opacity(0)`
- Dot: static, no transform

**Color**: `--fvs-amber` (`#E8A33D`) — the live/active signal color per constitution.
**Dot size**: 10 px diameter (`border-radius: 5px` — stays within the 0–8 px radius guideline when expressed as a pixel value).

**Alternatives considered**:
- MapLibre animated custom layer (WebGL shader) — rejected: significant complexity, no CSS token access, not maintainable alongside other components.
- SVG `<circle>` with SMIL animation — rejected: SMIL is deprecated in modern browsers; CSS keyframes are the standard.
- `requestAnimationFrame` loop manipulating opacity — rejected: CSS declarative animation is more performant and does not require imperative cleanup.

---

## Decision 4: Map Style File Architecture

**Decision**: Export the style as a `mapStyle.ts` module returning a `StyleSpecification` object (MapLibre's native type). Placed at `src/components/TrackingMap/mapStyle.ts`.

**Rationale**: Keeps the style co-located with the component, typechecked by TypeScript, and trivially replaceable. The `StyleSpecification` type prevents runtime style format errors.

**OpenFreeMap tile source URL**: `https://tiles.openfreemap.org/planet`  
Served as PMTiles over HTTPS; no API key; attribution: `© OpenMapTiles © OpenStreetMap contributors`.

---

## Decision 5: Storybook Integration

**Decision**: Provide two stories: `Default` (static position) and `Live` (position updates on a timer via `useEffect` inside the story's render function). Do not mock the map — stories load real tiles. Vitest integration tests are not applicable for WebGL canvas output; coverage is via visual/a11y review in Storybook.

**Rationale**: MapLibre renders to a WebGL canvas, which cannot be meaningfully unit-tested with jsdom or happy-dom. Storybook with real tile loading is the correct testing surface. The `addon-a11y` axe scan will run on the host DOM (container, marker, controls) — not the canvas internals.

**Storybook decorator requirement**: The map container must have a fixed height (e.g. `height: 480px`) set in the story decorator, since MapLibre requires a non-zero height to initialize WebGL.

---

## Decision 6: Keyboard Accessibility

**Decision**: Rely on MapLibre's built-in keyboard handler for pan/zoom. Override the map container's `:focus-visible` outline to use `--fvs-amber` with 2 px offset. Add `aria-label` to the map container element.

**MapLibre keyboard defaults** (active when the canvas is focused):
- Arrow keys: pan
- `+` / `-`: zoom in / out
- `Shift + Arrow`: rotate
- `Escape`: release keyboard handler

**Rationale**: MapLibre's keyboard handling is well-tested; re-implementing it would introduce bugs. The only FVS-specific work is the focus ring override and the accessible label.
