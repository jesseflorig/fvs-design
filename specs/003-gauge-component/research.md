# Research: Gauge Component

**Branch**: `003-gauge-component` | **Date**: 2026-04-20

## Arc Rendering Approach

**Decision**: SVG `stroke-dasharray` / `stroke-dashoffset` on a `<circle>` element.

**Rationale**: This technique renders a precise, resolution-independent arc without importing a charting library. A single `<circle>` with `stroke-dasharray` equal to the circumference and `stroke-dashoffset` proportional to (1 − fill%) produces the correct arc with a single DOM element and no path math. It handles 0% and 100% cleanly without edge cases. Alternative approaches (SVG `<path>` with computed arc endpoints, CSS conic-gradient, canvas) all require more code for no quality benefit.

**Alternatives considered**:
- `<path>` with `arcTo`: Requires trigonometry for start/end points and special-casing for 0%/100%. More fragile.
- CSS `conic-gradient` + clip: Cannot achieve the track (unfilled portion) appearance; limited cross-browser consistency for rounded-free precise arcs.
- Canvas: Correct but requires imperative lifecycle management in React; no accessibility tree.

## Arc Geometry

**Decision**: 270° sweep starting at the lower-left (225° from 3 o'clock / 0°), ending at lower-right (315° from 0°, i.e., −45°). A 90° gap at the bottom.

**Rationale**: 270° sweep is the de-facto gauge convention in instrument panel design (aircraft, automotive, industrial HMI). The bottom gap allows the value label to sit below the arc without overlap. 180° (semicircle) was considered but wastes vertical space and reads as a progress bar rather than a gauge.

**Implementation geometry**:
- `r` = radius (half the SVG viewport minus stroke width)
- `circumference` = `2π × r`
- Usable arc = `circumference × (270 / 360)` = `circumference × 0.75`
- `stroke-dasharray` = `circumference`
- `stroke-dashoffset` = `circumference - (normalizedValue × circumference × 0.75)` + `circumference × 0.25` (the 90° gap offset)
- SVG rotated `−225deg` (or `transform: rotate(135deg)`) so the arc starts at lower-left

## Status Token Mapping

**Decision**: Mirror Badge's `statusColors` map exactly.

```
nominal  → var(--nominal)   // accessible green
live     → var(--live)      // accessible amber
fault    → var(--alert)     // red
info     → var(--info)      // blue
offline  → var(--offline)   // gray
neutral  → var(--fg)        // foreground ink
```

**Rationale**: Reusing the exact same tokens ensures semantic color consistency across Badge, DataTable row highlights, and Gauge. Any future token update propagates to all three components.

## Typography

**Decision**: 
- Value + unit: `var(--font-mono)` (Space Mono), uppercase, letter-spacing `0.08em`, rendered as SVG `<text>` centered in the arc.
- Descriptor label: `var(--font-sans)` (IBM Plex Sans), sentence case, smaller size, below the value.

**Rationale**: Space Mono is the FVS telemetry/data font — all numeric readouts in this system use it. IBM Plex Sans handles non-numeric labels. This mirrors the DataTable convention (mono headers + readable body).

## Size Variants

**Decision**: `size` prop accepting `'sm' | 'md' | 'lg'` mapping to `64 | 128 | 192` px viewport (the SVG `width`/`height`).

**Rationale**: Three named sizes cover the practical use cases (dense dashboard tile, standard card, large focal gauge). A raw numeric size was considered but named variants enforce design system consistency and simplify story documentation.

At `sm` (64px): value label visible, descriptor label hidden (insufficient space).
At `md` (128px): both labels visible.
At `lg` (192px): both labels visible, larger type scale.

## ARIA Pattern

**Decision**: `role="meter"` on a wrapper `<div>`, with `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, and `aria-label`.

**Rationale**: `role="meter"` is the correct ARIA role for a gauge displaying a scalar value within a known range. Screen readers announce "X of Y range" automatically. The SVG itself gets `aria-hidden="true"` since all semantics live on the wrapper. This passes axe-core without violations.

## No Runtime Animation

**Decision**: No CSS transition on the arc stroke. Static render only.

**Rationale**: The FVS constitution forbids bounce/spring motion and specifies "mechanical" animation only. A static arc is the most mechanical option. If a future spec requires animated value updates, a `200ms linear` CSS transition on `stroke-dashoffset` would be the minimal-compliant approach — but that is out of scope here.
