# Quickstart: Amber Dim Contrast

**Branch**: `010-amber-dim-contrast` | **Date**: 2026-05-04

## Scenario 1: Verify Dim Amber Value

1. Open `src/tokens/tokens.css`.
2. Locate `--fvs-amber-dim`.
3. Expected: the token value is `#946421`.
4. Confirm `--fvs-amber` remains `#E8A33D`.

## Scenario 2: Verify Light-Surface Contrast

Use this command from the repository root to calculate the expected ratios:

```bash
node -e 'function h(x){return [parseInt(x.slice(1,3),16),parseInt(x.slice(3,5),16),parseInt(x.slice(5,7),16)]} function s(c){c/=255;return c<=0.04045?c/12.92:Math.pow((c+0.055)/1.055,2.4)} function l(x){const [r,g,b]=h(x).map(s);return .2126*r+.7152*g+.0722*b} function c(a,b){const A=l(a),B=l(b),hi=Math.max(A,B),lo=Math.min(A,B);return ((hi+.05)/(lo+.05)).toFixed(2)} console.log("#946421 on #F2F1EE", c("#946421","#F2F1EE")); console.log("#946421 on #FBFAF7", c("#946421","#FBFAF7"));'
```

1. Calculate contrast for foreground `#946421` against background `#F2F1EE`.
2. Expected: contrast is at least 4.5:1.
3. Calculate contrast for foreground `#946421` against background `#FBFAF7`.
4. Expected: contrast is at least 4.5:1.
5. Confirm the recorded ratios show the value is the lightest passing candidate in the existing dim-amber hue family.

## Scenario 3: Verify Signal Semantic Caption

1. Open `src/stories/tokens/Colors.stories.tsx`.
2. Locate the `--fvs-amber-dim` swatch in the Signal Semantic story.
3. Expected: the caption describes accessible amber text on light surfaces.
4. Expected: the caption does not say the token is for dark surfaces.

## Scenario 4: Verify Token Mapping

1. Open `tailwind.config.ts`.
2. Locate the `fvs-amber-dim` color mapping.
3. Expected: it remains `var(--fvs-amber-dim)`.
4. Expected: no raw hex value is duplicated in the Tailwind config.

## Scenario 5: Repository Validation

```bash
npm run typecheck
npm run lint
npm test
```

Expected: all commands pass after implementation.

## Validation Notes

- 2026-05-04: `#946421` on `#F2F1EE` calculates to 4.53:1.
- 2026-05-04: `#946421` on `#FBFAF7` calculates to 4.90:1.
- 2026-05-04: `--fvs-amber-dim` updated to `#946421`; `--fvs-amber` remains `#E8A33D`.
- 2026-05-04: Signal Semantic caption updated to "accessible amber text on light surfaces".
