# Data Model: Control Tiles (007-control-tiles)

## Shared Enums

### `TileControlKind`

```text
TileControlKind =
  | "toggle"
  | "scene"
  | "summary"
```

Rules:
- `toggle` tiles represent directly switchable devices.
- `scene` tiles represent a commandable mode or preset.
- `summary` tiles may be informative first and optionally drill into detail without changing the uniform footprint.

---

### `TileState`

```text
TileState =
  | "off"
  | "on"
  | "transitioning"
  | "warning"
  | "unavailable"
```

Rules:
- Every tile must expose exactly one visible state.
- `transitioning` must be visibly distinct from both `off` and `on`.
- `warning` and `unavailable` must remain understandable without relying on color alone.

---

### `GridOrientation`

```text
GridOrientation =
  | "portrait"
  | "landscape"
```

---

## Entities

### `ControlTileModel`

```text
ControlTileModel {
  id: string
  title: string
  subtitle?: string
  controlKind: TileControlKind
  state: TileState
  stateLabel: string
  contextLabel?: string
  toggleLabel?: string
  interactive: boolean
  disabled?: boolean
  icon?: string
}
```

Rules:
- `title` and `stateLabel` are always visible.
- `contextLabel` is optional and must remain short enough for the minimal format.
- `toggleLabel` is required for interactive `toggle` tiles.
- The model preserves one uniform visual footprint regardless of content type.

Relationships:
- Rendered within a `GridCellModel`

---

### `GridCellModel`

```text
GridCellModel {
  tileId: string
  row: number
  column: number
}
```

Rules:
- A cell contains exactly one tile.
- No two tiles may occupy the same row and column coordinates.
- Standard layout components generate these positions implicitly; consumers should not need to place them manually for basic use.

---

### `GridTemplateModel`

```text
GridTemplateModel {
  orientation: GridOrientation
  columns: number
  gapToken: string
  paddingToken: string
}
```

Rules:
- The template changes by orientation, not by tile size.
- Both portrait and landscape templates use the same underlying tile footprint.

---

### `ToggleFeedbackModel`

```text
ToggleFeedbackModel {
  requestedState?: "off" | "on"
  displayState: TileState
  pending: boolean
  failed: boolean
}
```

Rules:
- `pending=true` implies `displayState="transitioning"` until the next stable state is known.
- Failed toggles must preserve the last known stable state context while surfacing the failed request.

---

### `SpacingScale`

```text
SpacingScale {
  gridGap: string
  tilePadding: string
  tileInternalGap: string
}
```

Rules:
- All values reference existing or newly introduced `--fvs-*` spacing tokens.
- Spacing supports portrait and landscape layouts without changing the tile footprint itself.
