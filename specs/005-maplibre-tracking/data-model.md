# Data Model: Map Tracking Component

**Branch**: `005-maplibre-tracking` | **Date**: 2026-04-20

## Entities

### Position

The core data unit passed into the component. Represents a geographic location at a point in time.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `lat` | `number` | yes | −90 to +90 |
| `lng` | `number` | yes | −180 to +180 |

Out-of-range values are clamped to bounds by MapLibre natively; the component does not throw on invalid input.

### TrackingMapProps

The public props interface for the `TrackingMap` component.

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `position` | `Position \| null` | no | `null` | Tracked object location. Null hides the marker; map still renders. |
| `zoom` | `number` | no | `14` | Initial zoom level (1–22). Re-centering on position change uses this level. |
| `className` | `string` | no | `undefined` | Optional class name for the root container element. |
| `aria-label` | `string` | no | `'Live tracking map'` | Accessible name for the map region. |

### MapState (internal)

The component's internal state — not exposed as props.

| Field | Type | Description |
|-------|------|-------------|
| `mapInstance` | `Map \| null` | MapLibre GL JS `Map` object held in a ref (not state — mutations don't trigger re-render). |
| `markerInstance` | `Marker \| null` | MapLibre `Marker` object, held in a ref. |
| `isLoaded` | `boolean` | True once the map `load` event has fired. |

## State Transitions

```
[mount]
  → initialize Map instance → wait for 'load' event → isLoaded = true
  → if position: add Marker at position

[position prop changes]
  → if isLoaded && position != null: move Marker to new position, flyTo center
  → if isLoaded && position == null: remove Marker (if present)

[unmount]
  → remove Marker (if present)
  → call map.remove() to release WebGL context and event listeners
```

## Validation Rules

- `position.lat` outside [−90, +90]: MapLibre clamps silently; no component error thrown.
- `position.lng` outside [−180, +180]: Same.
- `position === null`: Marker hidden, map still renders. This is a normal state (e.g., signal lost).
- `zoom` outside [1, 22]: Clamped by MapLibre.
- Container with height = 0: MapLibre will log a warning and not initialize WebGL. Component renders an empty div; no crash.
