# Token Contract: Amber Dim Contrast

**Branch**: `010-amber-dim-contrast` | **Date**: 2026-05-04

## Public Token Contract

### `--fvs-amber-dim`

Accessible amber signal token for semantic text and status labels on light surfaces.

```css
--fvs-amber-dim: #946421;
```

## Contract Rules

- `--fvs-amber-dim` resolves to `#946421`.
- `--fvs-amber` remains `#E8A33D`.
- `--live` in the light theme continues to resolve through `var(--fvs-amber-dim)`.
- `fvs-amber-dim` in Tailwind continues to resolve through `var(--fvs-amber-dim)`.
- The updated dim amber value passes at least 4.5:1 contrast against `#F2F1EE`.
- The updated dim amber value passes at least 4.5:1 contrast against `#FBFAF7`.
- The Signal Semantic caption for `--fvs-amber-dim` describes accessible amber usage on light surfaces.
- The Signal Semantic caption does not describe the token as being for dark surfaces.

## Required Documentation Update

`src/stories/tokens/Colors.stories.tsx` must show the `--fvs-amber-dim` swatch with:

```tsx
role="accessible amber text on light surfaces"
```

Equivalent wording is acceptable only if it clearly communicates accessible amber usage on light surfaces and avoids dark-surface wording.

## Validation Contract

- Run `npm run typecheck`.
- Run `npm run lint`.
- Run `npm test`.
- Record contrast ratios for `#946421` on `#F2F1EE` and `#FBFAF7` in `quickstart.md`.
