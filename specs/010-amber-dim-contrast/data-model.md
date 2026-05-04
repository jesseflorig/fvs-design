# Data Model: Amber Dim Contrast

**Branch**: `010-amber-dim-contrast` | **Date**: 2026-05-04

## Entity: Dim Amber Token

Represents the accessible amber signal color used for light-surface semantic text.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `name` | string | yes | Must remain `--fvs-amber-dim`. |
| `value` | color | yes | Must be `#946421` after implementation. |
| `role` | string | yes | Accessible amber text/signal on light surfaces. |
| `sourceTokenFile` | path | yes | `src/tokens/tokens.css`. |

### Validation Rules

- Value must be lighter than the previous dim amber value while staying in the amber family.
- Value must pass at least 4.5:1 contrast against supported light surfaces.
- Regular `--fvs-amber` must remain unchanged.

## Entity: Light Surface

Represents a supported light theme surface for contrast validation.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `name` | string | yes | Token or human-readable surface name. |
| `value` | color | yes | Surface color used for contrast calculation. |
| `role` | string | yes | Page background or elevated surface. |

### Supported Values

| Name | Value | Role |
|---|---:|---|
| `--fvs-paper` | `#F2F1EE` | Default light page background. |
| `--fvs-white` | `#FBFAF7` | Elevated light surface. |

## Entity: Contrast Result

Represents the measured contrast between dim amber and a light surface.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `foreground` | color | yes | Updated dim amber value. |
| `background` | color | yes | Supported light surface value. |
| `ratio` | number | yes | Must be at least 4.5. |
| `passes` | boolean | yes | True only when `ratio >= 4.5`. |

### Expected Results

| Foreground | Background | Minimum Ratio | Expected |
|---|---:|---:|---|
| `#946421` | `#F2F1EE` | 4.5:1 | Pass |
| `#946421` | `#FBFAF7` | 4.5:1 | Pass |

## Entity: Signal Semantic Caption

Represents the visible documentation caption for dim amber in the color token story.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `tokenName` | string | yes | `--fvs-amber-dim`. |
| `caption` | string | yes | Concise description of light-surface accessible amber role. |
| `storyFile` | path | yes | `src/stories/tokens/Colors.stories.tsx`. |

### Validation Rules

- Caption must not describe dim amber as a dark-surface token.
- Caption must make light-surface accessibility clear.
- Caption should remain concise and fit the existing swatch role style.

## Entity: Tailwind Token Mapping

Represents the utility-layer mapping for dim amber.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `key` | string | yes | `fvs-amber-dim`. |
| `value` | string | yes | Must remain `var(--fvs-amber-dim)`. |
| `configFile` | path | yes | `tailwind.config.ts`. |

### Validation Rules

- Mapping must remain present after implementation.
- Mapping must not duplicate the raw hex value.
