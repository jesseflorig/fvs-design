# Component Contract: Light Control Tile

**Branch**: `008-light-control-tile` | **Date**: 2026-04-25

## Public Component

### `LightControlTile`

Specialized control tile for one dimmable light or light group.

```ts
type LightAvailabilityStatus = 'available' | 'updating' | 'unavailable';
type LightWarmthLabel = 'Cool White' | 'Daylight' | 'Neutral White' | 'Soft White' | 'Warm White' | 'Candlelight' | 'Red';

interface LightCapabilitySupport {
  dimmer: boolean;
  warmth: boolean;
  nightMode: boolean;
}

interface DimmerControlValue {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

interface WarmthControlValue {
  value: number;
  label: LightWarmthLabel;
  minLabel?: string;
  maxLabel?: string;
}

interface NightModeValue {
  active: boolean;
  label?: string;
  activeLabel?: string;
  inactiveLabel?: string;
}

interface LightControlTileProps {
  title: string;
  subtitle?: string;
  status: LightAvailabilityStatus;
  capabilities: LightCapabilitySupport;
  brightness?: DimmerControlValue;
  warmth?: WarmthControlValue;
  nightMode?: NightModeValue;
  updatingLabel?: string;
  unavailableLabel?: string;
  ariaLabel?: string;
  onBrightnessChange?: (value: number) => void;
  onWarmthChange?: (value: number) => void;
  onNightModeChange?: (active: boolean) => void;
}
```

## Contract Rules

- `title` is required and must be visible.
- `status` is required and must be represented through text or accessible labels.
- `capabilities.dimmer = true` requires a brightness value for a fully controlled story or usage example.
- `capabilities.warmth = true` enables warmth status/control when `warmth` is supplied.
- `capabilities.nightMode = true` enables red LED night mode status/control when `nightMode` is supplied.
- Unsupported capabilities should be omitted from the visible control set by default.
- `status = 'unavailable'` prevents all controls from being operable.
- `status = 'updating'` communicates a pending state and may keep controls visible if they are not misleading.
- Brightness values are clamped to the effective min/max before display or callbacks.
- Warmth values are normalized from 0 to 100 before display or callbacks, ordered left-to-right as Cool White, Daylight, Neutral White, Soft White, Warm White, Candlelight.
- When red LED night mode is active, the warmth control displays `Red` and is not operable until night mode is disabled.
- `onBrightnessChange`, `onWarmthChange`, and `onNightModeChange` are optional; when omitted, the related control is display-only.
- `ariaLabel` overrides the generated tile summary, but individual controls must still expose meaningful names.

## Required Stories

- **Dimmable**: brightness status and control only.
- **Tunable Warmth**: brightness plus warmth status/control.
- **Night Mode**: brightness plus red LED night mode switch.
- **Full Capability**: brightness, warmth, and night mode together.
- **Updating**: pending state after a control change.
- **Unavailable**: last known values with non-operable controls.
- **Unsupported Capabilities**: dimmer-only light omits warmth and night mode controls.

## Accessibility Contract

- Brightness control exposes slider semantics with current value, min, max, and percentage value text.
- Warmth control exposes slider semantics with current value and user-facing warmth text.
- Night mode uses the design system toggle component with switch semantics and checked state.
- All focusable controls use the visible amber focus ring.
- The tile does not rely on color alone for on/off, red LED, unavailable, or updating states.
