# Research: Presence Component

**Branch**: `009-presence-component` | **Date**: 2026-05-03

## Decision 1: Dedicated Component

**Decision**: Add a dedicated `Presence` component instead of extending `Badge` or composing avatar/status behavior only inside Storybook.

**Rationale**: The feature has a distinct contract: avatar image, status-specific border treatment, Away image filtering, accessible status text, and avatar fallback behavior. A dedicated component keeps the behavior independently testable and reusable without overloading the existing text-oriented Badge component.

**Alternatives considered**:

- Extend `Badge` with avatar support: rejected because Badge is a compact text/status primitive and does not own image loading or avatar layout.
- Create Storybook-only examples from generic elements: rejected because consumers need a reusable component contract.

## Decision 2: Status Model

**Decision**: Represent presence status as exactly `present`, `near`, or `away`, with user-facing labels Present, Near, and Away.

**Rationale**: The feature defines a closed status set. A strict model prevents ambiguous states and lets the component safely fall back to Away when a consumer passes an unsupported value at runtime.

**Alternatives considered**:

- Open string status values: rejected because they create untestable visual outcomes.
- Reuse existing Badge status names directly: rejected because `nominal`, `live`, and `offline` do not match the user-facing presence vocabulary.

## Decision 3: Token Mapping for Status Color

**Decision**: Map Present to the existing blue information signal, Near to the existing amber/live signal, and Away to the existing grey/offline signal.

**Rationale**: The spec calls for blue, yellow, and grey borders. The project already exposes signal tokens that satisfy those roles while preserving token-first styling and the FVS visual language. Near should use the amber/yellow accent token rather than introducing a decorative yellow palette.

**Alternatives considered**:

- Hardcoded status hex values: rejected by the token-first constitution.
- New component-specific color tokens: deferred unless implementation proves the existing signal tokens do not meet contrast or design needs.

## Decision 4: Away Avatar Treatment

**Decision**: Apply a black-and-white subdued treatment to Away avatars through visual filtering while preserving the same avatar dimensions and crop as Present and Near.

**Rationale**: The feature requires Away to look less available without losing recognizability. Filtering the image keeps the source asset unchanged, avoids duplicate images, and makes state changes consistent.

**Alternatives considered**:

- Maintain separate monochrome avatar assets: rejected because it increases asset burden and can drift from the source avatar.
- Lower opacity only: rejected because the requirement explicitly calls for black and white subdued imagery.

## Decision 5: Avatar Fallback

**Decision**: Provide a stable fallback when the avatar is missing or fails to load, using initials when a display name is available and a neutral placeholder otherwise.

**Rationale**: The spec requires missing avatar handling that does not break layout. Initials preserve identity where possible, and a neutral placeholder keeps the component usable when no name is supplied.

**Alternatives considered**:

- Hide the component when the image fails: rejected because status still needs to be communicated.
- Show browser broken-image UI: rejected because it is visually inconsistent and fails the stable-layout requirement.

## Decision 6: Accessibility Pattern

**Decision**: Expose status through visible or assistive text in addition to border color, and ensure the avatar has an appropriate accessible label or is hidden when redundant.

**Rationale**: The constitution requires that color not be the sole differentiator. Presence status must be understandable for assistive technology and for reviewers who cannot reliably distinguish the border colors.

**Alternatives considered**:

- Border color only: rejected by accessibility requirements.
- Icon-only status: rejected because icons would need text labels anyway and are not required for this feature.

## Decision 7: Sizing and Layout

**Decision**: Support stable compact and standard avatar sizes with tokenized dimensions and no layout changes between status values.

**Rationale**: Presence components are likely to appear in lists, cards, and control surfaces. Stable sizing prevents visual shift when status changes and supports the compact-layout edge case in the spec.

**Alternatives considered**:

- Content-dependent sizing: rejected because names, fallback initials, or status changes could alter layout.
- One fixed size only: rejected because the spec includes compact and standard display assumptions.
