# Data Model: Light Control Tile

**Branch**: `008-light-control-tile` | **Date**: 2026-04-25

## Entity: Light Control Tile

Represents the complete user-facing state and available controls for one light or light group.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `title` | string | yes | Human-readable light or group name. Must not be empty. |
| `subtitle` | string | no | Optional room, circuit, or fixture context. |
| `status` | Availability Status | yes | Controls whether interaction is available. |
| `brightness` | Dimmer Level | yes when dimming supported | Clamped to 0-100. |
| `warmth` | Warmth Setting | no | Present only when warmth tuning is supported. |
| `nightMode` | Night Mode State | no | Present only when red LED night mode is supported. |
| `capabilities` | Light Capability Support | yes | Declares which controls are supported. |
| `ariaLabel` | string | no | Optional summary override for assistive technology. |

### Relationships

- Owns one `DimmerLevel` when dimming is supported.
- Owns zero or one `WarmthSetting`.
- Owns zero or one `NightModeState`.
- Owns one `AvailabilityStatus`.
- Uses `LightCapabilitySupport` to decide which controls are shown or disabled.

## Entity: Dimmer Level

Represents the current light brightness.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `value` | number | yes | Integer percentage from 0 to 100. |
| `min` | number | no | Defaults to 0. Must be less than `max`. |
| `max` | number | no | Defaults to 100. Must be greater than `min`. |
| `step` | number | no | Defaults to 1. Must be positive. |
| `label` | string | no | Defaults to "Brightness" in user-facing UI. |

### State Rules

- `value = 0` communicates off or effectively off.
- `value > 0` communicates active brightness unless availability status overrides interaction.
- Values outside bounds are clamped before display or callback.

## Entity: Warmth Setting

Represents tunable white-light warmth.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `value` | number | yes | Normalized value from 0 to 100. |
| `label` | `Cool White` \| `Daylight` \| `Neutral White` \| `Soft White` \| `Warm White` \| `Candlelight` \| `Red` | yes | User-facing warmth category derived from or supplied with value. `Red` is displayed while red LED night mode is active. |
| `minLabel` | string | no | Default "Cool White". |
| `maxLabel` | string | no | Default "Candlelight". |

### State Rules

- Low-to-high values communicate warmth from Cool White, Daylight, Neutral White, Soft White, Warm White, to Candlelight.
- Active red LED night mode overrides the displayed warmth label to Red and disables warmth adjustment.
- Warmth is omitted when unsupported.

## Entity: Night Mode State

Represents red LED night mode.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `active` | boolean | yes | True means red LED night mode is active. |
| `label` | string | no | Defaults to "Night mode". |
| `activeLabel` | string | no | Defaults to "Red LED". |
| `inactiveLabel` | string | no | Defaults to "Off". |

### State Rules

- Active night mode must explicitly identify red LED mode.
- Inactive night mode must communicate that normal light controls are active.
- Night mode is omitted when unsupported.

## Entity: Availability Status

Represents whether the tile can report current state and accept changes.

### Values

| Value | Meaning | Interaction Rule |
|---|---|---|
| `available` | Current state is known and commands can be sent. | Supported controls are operable. |
| `updating` | A requested change is being applied. | Controls may remain visible but must communicate pending status. |
| `unavailable` | Light cannot currently accept commands. | Controls must not appear operable. |

## Entity: Light Capability Support

Declares which feature controls apply to the light.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `dimmer` | boolean | yes | When false, brightness control is not shown as actionable. |
| `warmth` | boolean | yes | When false, warmth control is omitted or clearly disabled. |
| `nightMode` | boolean | yes | When false, red LED night mode control is omitted or clearly disabled. |

## State Transitions

```text
available -> updating       user changes brightness, warmth, or night mode
updating -> available       change completes and current state is confirmed
available -> unavailable    device stops reporting or cannot accept commands
updating -> unavailable     pending change fails because device becomes unavailable
unavailable -> available    device reports current state again
```

## Validation Rules

- Brightness must always display as a percentage when present.
- Unsupported capabilities must not be shown as primary active controls.
- Unavailable controls must not be focusable or operable.
- Every visible control must have a meaningful accessible name.
- Status text must be sufficient without color.
