# Data Model: Presence Component

**Branch**: `009-presence-component` | **Date**: 2026-05-03

## Entity: Presence

Represents the complete displayed state for one person in the presence component.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `person` | Person | yes | Supplies identity and avatar information. |
| `status` | Presence Status | yes | One of Present, Near, or Away. Unsupported runtime values fall back to Away treatment. |
| `size` | Presence Size | no | Defaults to standard. Compact and standard sizes must keep the same shape across statuses. |
| `showStatusLabel` | boolean | no | Defaults to a label strategy that keeps status text accessible; visible label may be optional when assistive text is present. |
| `ariaLabel` | string | no | Optional override for the generated accessible summary. |

### Relationships

- Owns one `Person`.
- Owns one `PresenceStatus`.
- Uses zero or one `AvatarFallback` when `AvatarImage` is unavailable.

## Entity: Person

Represents the individual shown by the presence component.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `name` | string | no | Used for accessible labeling and fallback initials when available. |
| `avatar` | Avatar Image | no | Preferred visual representation for the person. |

### Validation Rules

- If `name` is supplied, it must be used in the accessible summary unless `ariaLabel` overrides it.
- If both `name` and avatar are missing, the component must still render a stable neutral fallback and status.

## Entity: Presence Status

Represents the person's availability state.

### Values

| Value | User-facing Label | Visual Rule |
|---|---|---|
| `present` | Present | Blue border with color avatar image. |
| `near` | Near | Yellow/amber border with color avatar image. |
| `away` | Away | Grey border with black-and-white subdued avatar image. |

### State Rules

- Present and Near preserve full-color avatar treatment.
- Away applies the subdued black-and-white treatment.
- Status changes must not alter the component's dimensions, spacing, or avatar crop.
- Status must be available through text, not only through color.

## Entity: Avatar Image

Represents the image shown for the person.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `src` | string | yes | Image source for the avatar. |
| `alt` | string | no | May be empty when the component already provides equivalent accessible identity text. |

### Validation Rules

- Avatar images must use the same crop and dimensions for Present, Near, and Away.
- Image load failure activates `AvatarFallback` without changing component dimensions.
- Away treatment must preserve enough facial detail for the person to remain identifiable.

## Entity: Avatar Fallback

Represents the visual shown when no avatar image is available or image loading fails.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `initials` | string | no | Derived from the person's name when available. |
| `label` | string | yes | Accessible description of the fallback identity/status. |

### Validation Rules

- Fallback appearance must remain neutral and tokenized.
- Fallback must inherit the same status border rules as image avatars.
- Fallback must not show broken-image browser UI.

## Entity: Presence Size

Represents supported display scale.

### Values

| Value | Meaning | Validation / Notes |
|---|---|---|
| `compact` | Small presence display for dense lists or controls. | Avatar and border remain recognizable. |
| `standard` | Default presence display. | Supports clear avatar recognition and status reading. |

## Validation Rules

- Exactly three statuses are supported: Present, Near, Away.
- Every rendered presence component must communicate status without relying on color alone.
- Border treatment and avatar treatment must match the status matrix.
- Missing avatar handling must preserve layout and status visibility.
- No live data fetching or persistence is part of this feature.
