# Tasks: Map Tracking Component

**Input**: Design documents from `/specs/005-maplibre-tracking/`  
**Prerequisites**: plan.md ✓, spec.md ✓, research.md ✓, data-model.md ✓, contracts/ ✓

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)

---

## Phase 1: Setup

**Purpose**: Install the `maplibre-gl` dependency and scaffold the component directory.

- [x] T001 Install `maplibre-gl` package: run `npm install maplibre-gl` from repo root; verify it appears in `package.json` dependencies
- [x] T002 Create empty stub files for the component: `src/components/TrackingMap/TrackingMap.tsx`, `src/components/TrackingMap/TrackingMap.stories.tsx`, `src/components/TrackingMap/mapStyle.ts`, `src/components/TrackingMap/index.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core modules that all user story phases depend on — the dark basemap style and the TypeScript interface definitions.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T003 Implement `src/components/TrackingMap/mapStyle.ts` — export a `StyleSpecification` object with a dark FVS basemap using OpenFreeMap tiles (`https://tiles.openfreemap.org/planet` source); include layers for background (`#0A0A0B`), water (`#151517`), roads (`#2A2A2E` / `#3A3A3E`), and labels (`#8A8A93`); annotate each hardcoded hex with its `--fvs-*` token equivalent
- [x] T004 [P] Define `Position` interface and `TrackingMapProps` interface in `src/components/TrackingMap/TrackingMap.tsx` matching `specs/005-maplibre-tracking/contracts/TrackingMap.props.ts` (props: `position?: Position | null`, `zoom?: number`, `className?: string`, `aria-label?: string`)

**Checkpoint**: Foundation ready — basemap style is typed and validated; component props are defined.

---

## Phase 3: User Story 1 — View Live Object Location (Priority: P1) 🎯 MVP

**Goal**: Render an interactive dark-themed map with an amber pulsing dot marker at a given coordinate; handle null position gracefully.

**Independent Test**: Open the `Default` story in Storybook → map tiles load, amber dot visible, pulse ring animates. Open `NoPosition` story → map loads, no marker, no errors.

- [x] T005 [US1] Initialize a MapLibre `Map` instance in `src/components/TrackingMap/TrackingMap.tsx` using `useRef` for the container element and a second ref for the `Map` object; attach in `useEffect` on mount using the `mapStyle` from `mapStyle.ts`; call `map.remove()` on unmount to release the WebGL context
- [x] T006 [US1] Build the pulse marker DOM element in `src/components/TrackingMap/TrackingMap.tsx`: create a container `div` with two children — an inner `div` (10 × 10 px solid dot, `border-radius: 5px`, `background: var(--fvs-amber)`) and an outer `div` (pulse ring starting at same size, CSS `@keyframes` that scales to 3× and fades to opacity 0 over 2 s `ease-out`, infinite loop, `background: var(--fvs-amber)`); inject the animation keyframes via a `<style>` tag appended to `document.head` on mount and removed on unmount
- [x] T007 [US1] Create a MapLibre `Marker` using the pulse DOM element and add it to the map at `position` coordinates when position is non-null; hold the Marker in a ref; when position is null (or becomes null), remove the Marker without affecting the map; guard with `isLoaded` flag set on the map's `load` event
- [x] T008 [US1] Apply FVS keyboard focus ring to the map container in `src/components/TrackingMap/TrackingMap.tsx`: after map initialization, retrieve the map's canvas wrapper via `map.getCanvasContainer()` and set its CSS outline via a scoped inline `<style>` tag — `outline: 2px solid var(--fvs-amber); outline-offset: 2px` on `:focus-visible`; forward the `aria-label` prop (default `'Live tracking map'`) to the container element via `map.getContainer().setAttribute('aria-label', ...)`
- [x] T009 [P] [US1] Write the `Default` story in `src/components/TrackingMap/TrackingMap.stories.tsx`: CSF 3 format, title `'Components/TrackingMap'`; set container height to 480 px in `decorators`; pass a fixed coordinate (e.g. `{ lat: 37.7749, lng: -122.4194 }`) and `zoom={14}`; import `'maplibre-gl/dist/maplibre-gl.css'` at the top of the stories file
- [x] T010 [P] [US1] Write the `NoPosition` story in `src/components/TrackingMap/TrackingMap.stories.tsx`: same decorator; pass `position={null}`; include a `play` function that checks no marker element is present in the DOM

**Checkpoint**: US1 complete — map renders, amber dot with pulse visible, null position handled cleanly, both stories pass a11y scan in Storybook.

---

## Phase 4: User Story 2 — Follow a Moving Object (Priority: P2)

**Goal**: When the `position` prop changes, the marker moves to the new coordinate and the map re-centers; no ghost markers remain.

**Independent Test**: Open the `Live` story → marker starts at coordinate A, moves to coordinate B every 2 s, only one marker visible at any time.

- [x] T011 [US2] Add a `useEffect` in `src/components/TrackingMap/TrackingMap.tsx` that depends on `[position, isLoaded]`: when position is non-null and map is loaded, call `markerRef.current.setLngLat([position.lng, position.lat])` if a marker exists, or create a new one if not; when position becomes null, remove the marker
- [x] T012 [US2] On position change (non-null), call `map.flyTo({ center: [position.lng, position.lat], zoom, essential: true })` in `src/components/TrackingMap/TrackingMap.tsx` so the viewport re-centers smoothly; use the `zoom` prop value for the flyTo zoom level
- [x] T013 [P] [US2] Write the `Live` story in `src/components/TrackingMap/TrackingMap.stories.tsx`: use React `useState` inside a render wrapper to cycle through a small array of coordinates on a `setInterval` (2 s); verify via story name and args that only one marker is visible at each update

**Checkpoint**: US2 complete — single marker follows position changes; map re-centers on each update.

---

## Phase 5: User Story 3 — Pan and Zoom (Priority: P3)

**Goal**: Map supports keyboard and pointer pan/zoom natively; marker remains geographically pinned through viewport changes.

**Independent Test**: Tab to the Default story map container → focus ring appears; press arrow keys → map pans; press +/− → map zooms; marker stays at its coordinate.

- [x] T014 [US3] Add a MapLibre `NavigationControl` (zoom +/− buttons) to the map in `src/components/TrackingMap/TrackingMap.tsx`: `map.addControl(new NavigationControl(), 'bottom-right')`; this exposes zoom buttons for pointer users and complements the keyboard handler; ensure the control is removed by `map.remove()` on unmount (automatic)
- [x] T015 [P] [US3] Update the `Default` story's `play` function in `src/components/TrackingMap/TrackingMap.stories.tsx` to verify the map container has an `aria-label` attribute and the canvas container is reachable via Tab (check `document.activeElement` after calling `.focus()`)

**Checkpoint**: US3 complete — keyboard handler active, zoom controls visible, focus ring confirmed.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T016 [P] Write the barrel export in `src/components/TrackingMap/index.ts`: `export { TrackingMap } from './TrackingMap'; export type { TrackingMapProps, Position } from './TrackingMap';`
- [x] T017 Run `npm run typecheck` from repo root; resolve all TypeScript errors in the `TrackingMap` component and story files
- [ ] T018 Open Storybook (`npm run storybook`) and manually validate all 6 scenarios from `specs/005-maplibre-tracking/quickstart.md`; confirm zero axe violations in the Accessibility tab for all three stories

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1; T003 and T004 can run in parallel with each other
- **Phase 3 (US1)**: Depends on Phase 2 — T005 → T006 → T007 → T008; T009 and T010 can run in parallel after T007
- **Phase 4 (US2)**: Depends on Phase 3 complete — T011 → T012 → T013 (T013 parallel to T012)
- **Phase 5 (US3)**: Depends on Phase 4 — T014 → T015 (T015 parallel to T014)
- **Phase 6 (Polish)**: Depends on all story phases — T016 and T018 can run in parallel; T017 must pass before T018

### Within Phase 3 (US1)

```
T005 (Map init) → T006 (Pulse DOM) → T007 (Marker logic) → T008 (Focus ring)
                                                           ↓
                                               T009 [P] Default story
                                               T010 [P] NoPosition story
```

### Parallel Opportunities Per Phase

```bash
# Phase 2 — run together:
T003: mapStyle.ts
T004: TrackingMapProps types

# Phase 3 — after T007:
T009: Default story
T010: NoPosition story

# Phase 5 — run together:
T014: NavigationControl
T015: play() a11y check

# Phase 6 — run together:
T016: index.ts barrel
T018: quickstart validation (after T017)
```

---

## Implementation Strategy

### MVP First (User Story 1 Only — 6 tasks)

1. Complete Phase 1 (T001–T002) — ~10 min
2. Complete Phase 2 (T003–T004) — ~30 min
3. Complete Phase 3 (T005–T010) — ~2 h
4. **STOP AND VALIDATE**: Both Storybook stories load, amber dot pulses, no a11y violations
5. Ship US1 as a usable component

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready
2. Phase 3 → US1 done → Storybook reviewable (MVP)
3. Phase 4 → US2 done → Live tracking demo-able
4. Phase 5 → US3 done → Keyboard/interaction verified
5. Phase 6 → Typecheck clean, all quickstart scenarios green

---

## Notes

- Import `'maplibre-gl/dist/maplibre-gl.css'` at the top of the stories file — required for MapLibre's default UI (zoom buttons, attribution). The component itself does not import it, keeping the CSS import under consumer control.
- MapLibre's WebGL canvas renders to a `<canvas>` — the a11y axe scan covers the host DOM (container, controls, marker), not the canvas internals.
- The `map.remove()` call in the cleanup effect removes all event listeners, the WebGL context, and all added controls — no manual cleanup needed beyond that.
- The pulse CSS keyframe animation is injected once into `document.head` and keyed by a class name to avoid duplicates on hot reload.
