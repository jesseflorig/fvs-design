# fvs-design Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-05-03

## Active Technologies
- TypeScript 5.x (strict mode) + React 18, Tailwind CSS, Storybook 10, Vitest, Lucide React, existing `src/tokens/tokens.css` and `tailwind.config.ts` (007-control-tiles)
- N/A - presentational component library, no persistence (007-control-tiles)
- TypeScript 5.x (strict mode) + React 18, Tailwind CSS, Storybook 10, Vitest, Storybook addon-a11y, Lucide React, existing `src/tokens/tokens.css`, existing `src/components/ControlTiles/` patterns, existing `src/components/Slider/Slider.tsx` interaction pattern (008-light-control-tile)
- TypeScript 5.x (strict mode) + React 18, Tailwind CSS token mapping, Storybook 10, Vitest, Storybook addon-a11y, existing `src/tokens/tokens.css`, existing component/story conventions, provided avatar JPEG fixtures (009-presence-component)
- TypeScript 5.x (strict mode), CSS custom properties + React 18, Storybook 10, Vitest with Storybook addon-a11y, existing `src/tokens/tokens.css`, existing `tailwind.config.ts`, existing `src/stories/tokens/Colors.stories.tsx`, WCAG contrast calculation (010-amber-dim-contrast)
- N/A - design token and documentation update, no persistence (010-amber-dim-contrast)

- TypeScript 5.x (strict mode) + React 18, Tailwind CSS, Storybook 10, Vitest, existing `src/tokens/tokens.css` and `src/lib/resolve-token.ts` (007-control-tiles)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.x (strict mode): Follow standard conventions

## Recent Changes
- 010-amber-dim-contrast: Added TypeScript 5.x (strict mode), CSS custom properties + React 18, Storybook 10, Vitest with Storybook addon-a11y, existing `src/tokens/tokens.css`, existing `tailwind.config.ts`, existing `src/stories/tokens/Colors.stories.tsx`, WCAG contrast calculation
- 009-presence-component: Added TypeScript 5.x (strict mode) + React 18, Tailwind CSS token mapping, Storybook 10, Vitest, Storybook addon-a11y, existing `src/tokens/tokens.css`, existing component/story conventions, provided avatar JPEG fixtures
- 008-light-control-tile: Added TypeScript 5.x (strict mode) + React 18, Tailwind CSS, Storybook 10, Vitest, Storybook addon-a11y, Lucide React, existing `src/tokens/tokens.css`, existing `src/components/ControlTiles/` patterns, existing `src/components/Slider/Slider.tsx` interaction pattern


<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
