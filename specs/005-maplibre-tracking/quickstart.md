# Quickstart: Map Tracking Component

**Branch**: `005-maplibre-tracking` | **Date**: 2026-04-20

## Integration Test Scenarios

These scenarios describe how to verify the component is working correctly from the outside. Each can be performed in Storybook.

---

### Scenario 1: Render with a static position

1. Open the `Components/TrackingMap/Default` story in Storybook.
2. Verify the map tiles load within 3 seconds (land, water, roads visible against dark background).
3. Verify an amber dot is visible at the story's fixed coordinate.
4. Verify the dot has a visible pulsing ring animating outward from the dot.
5. Verify the ring animation loops continuously.

**Pass criteria**: Map loads, amber dot visible, ring pulses.

---

### Scenario 2: Null position — no marker

1. Open the `Components/TrackingMap/NoPosition` story.
2. Verify the map tiles load normally.
3. Verify no marker dot is visible anywhere on the map.
4. Verify no JavaScript errors in the browser console.

**Pass criteria**: Map renders, no marker, no errors.

---

### Scenario 3: Live position updates

1. Open the `Components/TrackingMap/Live` story.
2. Verify the marker appears at the initial coordinate.
3. Wait 2 seconds; verify the marker moves to a new coordinate.
4. Verify the map re-centers smoothly on the new coordinate (fly animation).
5. Verify no ghost markers from the previous position remain.

**Pass criteria**: Single marker follows the moving position.

---

### Scenario 4: Pan and zoom

1. Open the `Default` story.
2. Click the map to focus it.
3. Press the `+` key twice; verify the map zooms in.
4. Press the `-` key twice; verify the map zooms out.
5. Press the arrow keys; verify the map pans.
6. Verify the amber dot stays at the correct geographic location throughout.

**Pass criteria**: Keyboard navigation works; marker does not drift.

---

### Scenario 5: Keyboard focus ring

1. Open the `Default` story.
2. Tab to the map container.
3. Verify a 2 px amber (`#E8A33D`) outline appears around the map container.
4. Tab away; verify the outline disappears.

**Pass criteria**: Focus ring visible and amber-colored.

---

### Scenario 6: Accessibility audit

1. Open the `Default` story.
2. Open the Storybook a11y panel (Accessibility tab).
3. Verify zero violations are reported.
4. Verify the map region has an accessible label ("Live tracking map" or custom).

**Pass criteria**: Zero axe violations, accessible name present.

---

## Minimal Usage

```tsx
import { TrackingMap } from './components/TrackingMap';

// Static position
<div style={{ height: 480 }}>
  <TrackingMap position={{ lat: 37.7749, lng: -122.4194 }} />
</div>

// No position (signal lost state)
<div style={{ height: 480 }}>
  <TrackingMap position={null} />
</div>

// Live updates — pass new position object when data changes
<div style={{ height: 480 }}>
  <TrackingMap position={currentPosition} zoom={16} aria-label="Van location" />
</div>
```

## Dependencies to install

```bash
npm install maplibre-gl
npm install --save-dev @types/maplibre-gl
```

CSS import required in the component or its story:

```ts
import 'maplibre-gl/dist/maplibre-gl.css';
```
