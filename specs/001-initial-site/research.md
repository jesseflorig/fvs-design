# Research: Initial Design System Site

**Branch**: `001-initial-site` | **Date**: 2026-04-19

## 1. Storybook 8 + Vite Builder Setup

**Decision**: Use `@storybook/react-vite` (Storybook 8 with the Vite builder).  
**Rationale**: Storybook 8 is the current stable release. The Vite builder matches the project's Vite 5 build tool, avoids Webpack config overhead, and provides fast HMR for story development. CSF 3 (Component Story Format 3) is the modern default — TypeScript-native, no `storiesOf` legacy API.  
**Alternatives considered**: Storybook 7 (superseded), Webpack builder (heavier, no alignment with Vite), Histoire (Vue-first, React support immature).

---

## 2. FVS Storybook Sidebar Theme

**Decision**: Use `@storybook/theming` → `create` to build a custom FVS sidebar theme.  
**Rationale**: Storybook 8 exposes a documented `create()` API that maps to its internal UI variables. Applying `--fvs-black` as the app background, `--fvs-paper` as text, and `--fvs-amber` as the active/selected accent is sufficient to make the sidebar feel FVS-native without a full custom renderer.  
**Key mappings**:
- `appBg`: `#0A0A0B` (fvs-black)
- `appContentBg`: `#151517` (fvs-ink)
- `colorPrimary`: `#E8A33D` (fvs-amber)
- `colorSecondary`: `#E8A33D`
- `fontBase`: `'IBM Plex Sans', ui-sans-serif`
- `fontCode`: `'Space Mono', ui-monospace`
**Alternatives considered**: CSS injection into `.storybook/manager-head.html` — brittle against Storybook internal class changes.

---

## 3. Token-to-Tailwind Mapping

**Decision**: Extend `tailwind.config.ts` to reference `--fvs-*` CSS custom properties. Tokens defined once in `tokens.css`; Tailwind utilities reference the same variables.  
**Rationale**: CSS custom properties are the runtime source of truth — they respond to `data-theme="console"` overrides. If Tailwind bakes values at build time, theme switching breaks. Referencing variables as `var(--fvs-amber)` in the Tailwind config preserves runtime theming.  
**Pattern**:
```ts
// tailwind.config.ts
colors: {
  'fvs-amber': 'var(--fvs-amber)',
  'fvs-ink': 'var(--fvs-ink)',
  // ...
}
```
**Alternatives considered**: Tailwind CSS Variables plugin (`tw-colors`) — additional dependency without clear gain given the token set is already defined in CSS.

---

## 4. Console Theme Toggle in Storybook

**Decision**: Use `@storybook/addon-themes` with a custom decorator that sets/removes `data-theme="console"` on `document.documentElement`.  
**Rationale**: `addon-themes` provides the toggle UI (toolbar button) and the decorator hook with zero bespoke UI code. The FVS theme system is CSS-attribute-driven (`[data-theme="console"]`), so the decorator only needs a single DOM attribute change — no context, no state management.  
**Implementation**:
```ts
// .storybook/preview.ts
import { withThemeByDataAttribute } from '@storybook/addon-themes';
export const decorators = [
  withThemeByDataAttribute({
    themes: { Light: '', Console: 'console' },
    defaultTheme: 'Light',
    attributeName: 'data-theme',
  }),
];
```
**Alternatives considered**: Custom global toolbar + context API — functional but duplicates what `addon-themes` already provides.

---

## 5. Self-Hosted Font Loading in Storybook

**Decision**: Declare `@font-face` rules for Michroma and Space Mono in `.storybook/preview-head.html`. Font files live in `src/assets/fonts/`. Vite serves them at `/src/assets/fonts/` during dev.  
**Rationale**: Storybook injects `preview-head.html` content into the story iframe's `<head>` — the correct place for font loading. Vite's dev server resolves the paths automatically.  
**Alternatives considered**: Importing font files in `preview.ts` (works with Vite, but `preview-head.html` is the documented approach and avoids bundler coupling).

---

## 6. CSS Variable Resolution Utility

**Decision**: Ship a `resolveToken(varName: string): string` utility that calls `getComputedStyle(document.documentElement).getPropertyValue(varName).trim()`.  
**Rationale**: Token doc pages need to display resolved values (e.g., what `--bg` actually computes to in the current theme). CSS custom properties aren't available at build time — only at runtime via `getComputedStyle`. This utility is called once per render on token doc pages; the performance cost is negligible.  
**Usage**: Token doc story renders → calls `resolveToken('--fvs-amber')` → displays `#E8A33D` alongside the swatch.

---

## 7. Component Variant Pattern

**Decision**: Variants are expressed as TypeScript discriminated unions on props, not separate components. A single `<Button variant="primary" | "secondary" | "ghost" | "accent" | "danger">` covers all cases.  
**Rationale**: Matches the design bundle's approach (all button variants share the same DOM structure, only styles differ). Discriminated union props are fully type-checked and map cleanly to Storybook `argTypes` controls.  
**Disabled state**: Implemented via `disabled` HTML attribute + `aria-disabled` for non-button elements. CSS handles visual state via `[disabled]` selector — not a separate variant.

---

## 8. Lucide React Integration

**Decision**: Use `lucide-react` npm package (not CDN). Import icons as named React components.  
**Rationale**: The design bundle uses Lucide CDN for prototypes; production code prefers tree-shaken npm imports. Named imports (`import { Battery, Thermometer } from 'lucide-react'`) bundle only the icons in use.  
**Icon sizing**: Pass `size` prop (14 | 16 | 20 | 24); never override via CSS width/height (breaks stroke scaling).  
**Alternatives considered**: Lucide CDN (no tree-shaking, not production-appropriate), custom SVG sprite (no icon set delivered yet — flag for when FVS commissions custom icons).

---

## 9. Storybook Sidebar Navigation Structure

**Decision**: Use Storybook's native `title` field hierarchy for story organization. Three top-level groups: `Tokens`, `Components`, `Brand`. Storybook renders these as collapsible sidebar categories automatically.  
**Pattern**:
```ts
// Colors.stories.tsx
export default { title: 'Tokens/Colors' }

// Button.stories.tsx  
export default { title: 'Components/Button' }

// Logo.stories.tsx
export default { title: 'Brand/Logo' }
```
**Alternatives considered**: Storybook category grouping via `storySort` in preview — unnecessary when `title` hierarchy is sufficient.
