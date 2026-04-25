# Quickstart / Validation Scenarios: Control Tiles (007-control-tiles)

## Scenario 1: Minimal Toggle Tile

```tsx
<ControlTile
  title="Kitchen lights"
  controlKind="toggle"
  state="on"
  stateLabel="On"
  contextLabel="Ceiling"
  toggleLabel="Turn off"
  interactive
  selected
  onToggle={() => {}}
/>
```

**Expected**: The tile reads as a calm, minimal control. `On` is the primary read, and the toggle affordance is visible without competing with the state.

---

## Scenario 2: Minimal Status Tile

```tsx
<ControlTile
  title="Entry sensor"
  controlKind="summary"
  state="warning"
  stateLabel="Open"
  contextLabel="Detected 12 min ago"
/>
```

**Expected**: The tile communicates the warning state immediately without requiring any secondary control surface.

---

## Scenario 3: Transitioning Toggle

```tsx
<ControlTile
  title="Hallway shades"
  controlKind="toggle"
  state="transitioning"
  stateLabel="Closing"
  contextLabel="Moving to 30%"
  toggleLabel="Pause"
  interactive
  onToggle={() => {}}
/>
```

**Expected**: The tile clearly communicates that the device is neither fully off nor fully on, and the transitional state remains obvious in the minimal format.

---

## Scenario 4: Landscape Uniform Grid

```tsx
<ControlTileGrid
  orientation="landscape"
  items={[
    { key: '1', tile: <ControlTile {...kitchenLightProps} /> },
    { key: '2', tile: <ControlTile {...entrySensorProps} /> },
    { key: '3', tile: <ControlTile {...thermostatSummaryProps} /> },
    { key: '4', tile: <ControlTile {...sceneTileProps} /> },
  ]}
/>
```

**Expected**: All tiles use the same footprint, align to a regular grid, and do not overlap.

---

## Scenario 5: Portrait Uniform Grid

```tsx
<ControlTileGrid
  orientation="portrait"
  items={[
    { key: '1', tile: <ControlTile {...kitchenLightProps} /> },
    { key: '2', tile: <ControlTile {...entrySensorProps} /> },
    { key: '3', tile: <ControlTile {...thermostatSummaryProps} /> },
    { key: '4', tile: <ControlTile {...sceneTileProps} /> },
  ]}
/>
```

**Expected**: The same tiles reflow to the portrait template while preserving uniform footprint, scan order, and non-overlapping placement.

---

## Scenario 6: Partially Filled Row

```tsx
<ControlTileGrid
  orientation="landscape"
  items={[
    { key: '1', tile: <ControlTile {...kitchenLightProps} /> },
    { key: '2', tile: <ControlTile {...entrySensorProps} /> },
    { key: '3', tile: <ControlTile {...sceneTileProps} /> },
  ]}
/>
```

**Expected**: The final row remains visually coherent without overlap, stretching, or irregular tile footprints.

---

## Scenario 7: Unavailable Toggle

```tsx
<ControlTile
  title="Garage camera"
  controlKind="toggle"
  state="unavailable"
  stateLabel="Offline"
  contextLabel="Last update 08:14"
  toggleLabel="Unavailable"
  interactive={false}
  disabled
/>
```

**Expected**: The tile remains minimal and understandable, with unavailable state communicated without relying only on color.

---

## Scenario 8: Keyboard Validation

1. Tab to the first interactive tile.
2. Verify a visible amber focus ring appears.
3. Trigger the tile using Enter or Space.
4. Verify the tile communicates the updated or transitioning state clearly.
5. Confirm the same interaction works in both portrait and landscape stories.

**Expected**: All interactive paths remain keyboard-operable and the revised minimal format does not reduce state clarity.
