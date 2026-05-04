# Research: Amber Dim Contrast

**Branch**: `010-amber-dim-contrast` | **Date**: 2026-05-04

## Decision 1: Selected Dim Amber Value

**Decision**: Update `--fvs-amber-dim` from `#8A5E1F` to `#946421`.

**Rationale**: `#946421` is the lightest value found by increasing lightness within the existing dim-amber hue/saturation family while preserving at least 4.5:1 contrast against both supported light surfaces:

| Surface | Hex | Contrast with `#946421` |
|---|---:|---:|
| Default light page background | `#F2F1EE` | 4.53:1 |
| Elevated light surface | `#FBFAF7` | 4.90:1 |

The current value `#8A5E1F` is darker than necessary, with contrast of 5.02:1 against the page background and 5.44:1 against the elevated surface.

**Alternatives considered**:

- Keep `#8A5E1F`: rejected because it is not as light as possible while passing contrast.
- Use regular amber `#E8A33D`: rejected because it is too light for normal text on light surfaces.
- Introduce a new amber token: rejected because the existing token already serves the role and the requested change is scoped to dim amber.

## Decision 2: Contrast Target

**Decision**: Use WCAG AA normal-text contrast of at least 4.5:1 as the passing threshold.

**Rationale**: The token is used for semantic text/status treatments on light surfaces, including small mono labels. Normal-text contrast is the stricter and safer target for this design system.

**Alternatives considered**:

- Use 3:1 large-text contrast: rejected because the token appears in small labels and status text.
- Optimize only for the default page background: rejected because elevated light surfaces are also supported in the design system.

## Decision 3: Light Surface Set

**Decision**: Validate against `--fvs-paper` (`#F2F1EE`) and `--fvs-white` (`#FBFAF7`).

**Rationale**: These are the primary light theme page and elevated surfaces defined by the token system. A token intended for accessible amber on light surfaces must work on both.

**Alternatives considered**:

- Validate against all neutral swatches: rejected as broader than the requested role.
- Validate only through automated Storybook checks: rejected because the spec requires proving that no lighter candidate passes, which needs explicit contrast calculation.

## Decision 4: Caption Language

**Decision**: Change the Signal Semantic caption for `--fvs-amber-dim` to describe light-surface usage, for example "accessible amber text on light surfaces".

**Rationale**: The current caption says "amber on dark surfaces", which conflicts with the token's role as `--live` in the light theme. The new caption should steer consumers toward the accessible text role without implying this token is preferred for dark surfaces.

**Alternatives considered**:

- "amber on light surfaces": acceptable but less precise about accessibility.
- "live / active text": acceptable, but it omits the light-surface distinction requested by the user.

## Decision 5: Tailwind Mapping

**Decision**: Keep the existing Tailwind mapping for `fvs-amber-dim` as `var(--fvs-amber-dim)` and verify it remains present.

**Rationale**: The constitution requires tokens to be surfaced in Tailwind. The mapping already references the CSS variable, so changing the CSS token value updates all Tailwind usage without a config value change.

**Alternatives considered**:

- Hardcode `#946421` in `tailwind.config.ts`: rejected because it would create duplicate sources of truth.
- Remove the Tailwind mapping: rejected because downstream consumers may already use it.
