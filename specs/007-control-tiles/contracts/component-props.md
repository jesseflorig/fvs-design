# Component Contracts: Control Tiles (007-control-tiles)

These contracts define the revised public TypeScript interfaces for the Control Tiles category. They reflect the uniform-footprint, non-overlapping layout model and explicit toggle-state behavior.

---

## Shared Types

```typescript
type TileControlKind = 'toggle' | 'scene' | 'summary';

type TileState = 'off' | 'on' | 'transitioning' | 'warning' | 'unavailable';

type GridOrientation = 'portrait' | 'landscape';
```

---

## `ControlTile`

```typescript
interface ControlTileProps {
  title: string;
  subtitle?: string;
  controlKind?: TileControlKind;
  state: TileState;
  stateLabel: string;
  contextLabel?: string;
  toggleLabel?: string;
  icon?: React.ReactNode;
  interactive?: boolean;
  disabled?: boolean;
  selected?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
  ariaLabel?: string;
}
```

Contract notes:
- The component no longer exposes tile size variants.
- `state` is required and must always be visible in the rendered tile.
- `toggleLabel` is required when `controlKind="toggle"` and the tile is interactive.
- `selected` reflects the visually active or toggled state for minimal controls.

---

## `ControlTileGrid`

```typescript
interface ControlTileGridItem {
  key: string;
  tile: React.ReactElement<ControlTileProps>;
}

interface ControlTileGridProps {
  items: ControlTileGridItem[];
  orientation: GridOrientation;
  columns?: number;
  gap?: 'dense' | 'default' | 'loose';
  padding?: 'flush' | 'default' | 'roomy';
  ariaLabel?: string;
}
```

Contract notes:
- The grid accepts only uniform tile items; no per-item size override exists in the revised contract.
- `orientation` changes layout density but not tile footprint.
- The grid contract guarantees non-overlapping placement for all supported item collections.

---

## `layout.ts`

```typescript
interface GridTemplate {
  columns: number;
  gapToken: string;
  paddingToken: string;
}

type GridTemplatePreset = Record<GridOrientation, GridTemplate>;
```

Contract notes:
- The layout utility no longer exposes mixed tile span presets.
- The preset is responsible only for orientation-specific column and spacing behavior.

---

## Expected File Locations

| Item | Source path |
|---|---|
| `ControlTile` | `src/components/ControlTiles/ControlTile/ControlTile.tsx` |
| `ControlTileGrid` | `src/components/ControlTiles/ControlTileGrid/ControlTileGrid.tsx` |
| Shared types | `src/components/ControlTiles/types.ts` |
| Shared layout preset | `src/components/ControlTiles/layout.ts` |
| Public exports | `src/components/ControlTiles/index.ts` |
| Story fixtures | `src/components/ControlTiles/fixtures/controlTileExamples.ts` |
