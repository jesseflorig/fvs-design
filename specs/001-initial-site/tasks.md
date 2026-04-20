# Tasks: Initial Design System Site

**Input**: Design documents from `/specs/001-initial-site/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/stories.md ✅, quickstart.md ✅

**Organization**: Tasks grouped by user story. No test tasks — not requested in spec.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on in-flight tasks)
- **[Story]**: User story label (US1–US4)
- All paths relative to repository root

---

## Phase 1: Setup

**Purpose**: Project initialization, toolchain, and dependencies.

- [x] T001 Initialize npm project — create `package.json` with name `fvs-design`, `"type": "module"`, scripts: `storybook`, `build-storybook`, `typecheck`
- [x] T002 Install production dependencies: `react`, `react-dom`, `lucide-react`
- [x] T003 [P] Install dev dependencies: `typescript`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`
- [x] T004 [P] Install Storybook 8 + addons: `storybook`, `@storybook/react-vite`, `@storybook/addon-essentials`, `@storybook/addon-themes`, `@storybook/addon-a11y`
- [x] T005 Create `tsconfig.json` — strict mode, `noImplicitAny: true`, `strictNullChecks: true`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `include: ["src"]`
- [x] T006 [P] Create `postcss.config.js` — `tailwindcss` + `autoprefixer` plugins
- [x] T007 [P] Create `vite.config.ts` — `@vitejs/plugin-react`, resolve `src` alias

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Design tokens, assets, Storybook config, and shared utilities that ALL user stories depend on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T008 Copy FVS font files from design bundle into `src/assets/fonts/` — `Michroma-Regular.ttf`, `SpaceMono-Regular.ttf`, `SpaceMono-Bold.ttf`, `SpaceMono-Italic.ttf`, `SpaceMono-BoldItalic.ttf`
- [x] T009 [P] Copy FVS SVG assets from design bundle into `src/assets/svg/` — `logo.svg`, `mark.svg`, `favicon.svg`, `van-blueprint.svg`
- [x] T010 Create `src/tokens/tokens.css` — copy verbatim from design bundle `colors_and_type.css`; this is the token source of truth
- [x] T011 Create `tailwind.config.ts` — extend `colors`, `fontFamily`, `spacing`, `borderRadius`, `boxShadow`, `transitionDuration`, `transitionTimingFunction` with `var(--fvs-*)` references per `research.md § 3`
- [x] T012 Create `.storybook/main.ts` — `@storybook/react-vite` builder; addons: `@storybook/addon-essentials`, `@storybook/addon-themes`, `@storybook/addon-a11y`; stories glob: `src/**/*.stories.@(ts|tsx)`
- [x] T013 Create `.storybook/theme.ts` — FVS Storybook sidebar theme via `@storybook/theming` `create()`: `appBg: '#0A0A0B'`, `appContentBg: '#151517'`, `colorPrimary: '#E8A33D'`, `colorSecondary: '#E8A33D'`, `fontBase`, `fontCode`, `brandTitle: 'Fleet Van Systems'`, `brandImage: '/src/assets/svg/mark.svg'`
- [x] T014 Create `.storybook/preview-head.html` — `@font-face` declarations for Michroma and all 4 Space Mono weights pointing to `/src/assets/fonts/`; Google Fonts `<link>` for IBM Plex Sans + IBM Plex Serif
- [x] T015 Create `.storybook/preview.ts` — import `../src/tokens/tokens.css`; apply `withThemeByAttribute` decorator from `@storybook/addon-themes` with themes `{ Light: '', Console: 'console' }`, `attributeName: 'data-theme'`; configure `storySort`: Tokens → Components → Brand; apply FVS Storybook theme from `./theme`
- [x] T016 Create `src/lib/resolve-token.ts` — export `resolveToken(varName: string): string` using `getComputedStyle(document.documentElement).getPropertyValue(varName).trim()`

**Checkpoint**: Run `npm run storybook` — Storybook opens, sidebar uses FVS black/amber theme, no stories yet. Theme toolbar shows Light/Console toggle.

---

## Phase 3: User Story 1 — Token Reference (Priority: P1) 🎯 MVP

**Goal**: A developer can browse all FVS design tokens (colors, type, spacing, shadows, motion) as standalone doc pages with visual demonstrations and resolved values.

**Independent Test**: Open Storybook → Tokens section. Verify all 6 token categories render with correct values. Switch to Console theme — verify role token values update.

- [x] T017 [P] [US1] Create `src/stories/tokens/Colors.stories.tsx` — title: `Tokens/Colors`; exports: `NeutralScale` (9 swatches), `SignalSemantic` (5 swatches), `RoleTokensLight` (12 role tokens with resolved values via `resolveToken`), `RoleTokensConsole` (same tokens, renders correctly under console theme)
- [x] T018 [P] [US1] Create `src/stories/tokens/Typography.stories.tsx` — title: `Tokens/Typography`; exports: `TypeScale` (--t-micro through --t-hero as live text), `LineHeights` (all --lh-* as paragraph blocks), `Tracking` (all --tr-* as UPPERCASE labels), `FontFamilies` (4 rows: display/sans/mono/serif at --t-body)
- [x] T019 [P] [US1] Create `src/stories/tokens/Spacing.stories.tsx` — title: `Tokens/Spacing`; export: `SpacingScale` (--s-1 through --s-12 as labeled horizontal bars)
- [x] T020 [P] [US1] Create `src/stories/tokens/Radius.stories.tsx` — title: `Tokens/Radius`; export: `RadiusScale` (--r-0 through --r-4 as filled squares with radius applied)
- [x] T021 [P] [US1] Create `src/stories/tokens/Shadows.stories.tsx` — title: `Tokens/Shadows`; export: `ShadowTiers` (--shadow-1/2/3/inset/console, each on a card with use-case label; `--shadow-console` demo on dark background)
- [x] T022 [P] [US1] Create `src/stories/tokens/Motion.stories.tsx` — title: `Tokens/Motion`; exports: `Durations` (click-triggered animation for each --dur-*), `Easings` (side-by-side comparison of all --ease-* curves); no auto-play

**Checkpoint**: All 6 token sections browseable. Color swatches correct. Console theme toggle updates role token values. Fonts render correctly from local assets.

---

## Phase 4: User Story 2 — Component Browsing (Priority: P2)

**Goal**: A developer can view all 6 UI components in all variants and states, interact with them, and confirm the FVS visual language — including keyboard focus rings.

**Independent Test**: Open each component in Storybook, tab through with keyboard, verify amber focus ring. Switch to Console theme — verify component adapts.

- [x] T023 [P] [US2] Create `src/components/Button/Button.tsx` — props per `data-model.md ButtonProps`; variants: primary, secondary, ghost, accent, danger, icon; `focus-visible` outline 2px solid `var(--fvs-amber)` with 2px offset; `scale(0.98)` on active; transition 120ms `var(--ease-std)`
- [x] T024 [P] [US2] Create `src/components/Button/Button.stories.tsx` — title: `Components/Button`; exports per `contracts/stories.md`: `AllVariants`, `Primary`, `Secondary`, `Ghost`, `Accent`, `Danger`, `Icon`, `Disabled`; argTypes for variant, size, disabled
- [x] T025 [P] [US2] Create `src/components/Badge/Badge.tsx` — props per `data-model.md BadgeProps`; status colors: nominal=green, live=amber, fault=red, info=blue, offline=steel; dot + mono uppercase label; 2px border-radius; solid variant
- [x] T026 [P] [US2] Create `src/components/Badge/Badge.stories.tsx` — title: `Components/Badge`; exports: `AllStatuses`, `Nominal`, `Live`, `Fault`, `SolidVariants`
- [x] T027 [P] [US2] Create `src/components/Card/Card.tsx` — props per `data-model.md CardProps`; panel-header pattern: mono uppercase label + optional badge in header, 1px `--line` separator, body slot; 4px radius; 1px `--line` border; hover: `--shadow-1`
- [x] T028 [P] [US2] Create `src/components/Card/Card.stories.tsx` — title: `Components/Card`; exports: `BatteryPanel`, `ClimatePanel`, `EmptyShell`, `WithHover`; content matches design bundle `cards.html` pixel reference
- [x] T029 [P] [US2] Create `src/components/Input/Input.tsx` — covers text `<Input>`, `<Select>`, `<Toggle>`, `<Checkbox>`; all with mono uppercase label, optional hint/error; focus ring: `0 0 0 2px var(--fvs-paper), 0 0 0 4px var(--fvs-amber)`; disabled state; props per `data-model.md InputProps`
- [x] T030 [P] [US2] Create `src/components/Input/Input.stories.tsx` — title: `Components/Input`; exports: `TextField`, `WithError`, `Disabled`, `SelectField`, `ToggleField`, `CheckboxField`; content matches design bundle `forms.html`
- [x] T031 [P] [US2] Create `src/components/DataTable/DataTable.tsx` — props per `data-model.md DataTableProps`; mono font, tabular-nums; UPPERCASE headers 10px 0.12em tracking; 1px `--line-strong` header bottom border; 1px `--line` row separators; row hover background; statusColor applies nominal/fault/live colors
- [x] T032 [P] [US2] Create `src/components/DataTable/DataTable.stories.tsx` — title: `Components/DataTable`; exports: `TelemetryReadings` (matches design bundle `table.html`), `AllColumnAlignments`
- [x] T033 [P] [US2] Create `src/components/Divider/Divider.tsx` — props per `data-model.md DividerProps`; four weights: hair, standard, strong, double; all using CSS custom properties
- [x] T034 [P] [US2] Create `src/components/Divider/Divider.stories.tsx` — title: `Components/Divider`; export: `AllWeights` (all 4 variants in a stack with labels)
- [x] T035 [US2] Create barrel exports — `src/components/Button/index.ts`, `Badge/index.ts`, `Card/index.ts`, `Input/index.ts`, `DataTable/index.ts`, `Divider/index.ts`

**Checkpoint**: All 6 components browseable. Keyboard focus ring visible (amber, 2px, 2px offset) on every interactive element. Components adapt to console theme.

---

## Phase 5: User Story 3 — Brand & Typography Reference (Priority: P3)

**Goal**: A new contributor can learn the FVS brand: logo usage, all four typeface specimens, iconography rules with curated icons, and voice/content guidelines.

**Independent Test**: Open Brand section. Verify logo renders on light and dark. Verify all 4 typefaces render at scale. Verify curated icon grid + usage rules. Verify voice guidelines with good/avoid examples.

- [x] T036 [P] [US3] Create `src/stories/brand/Logo.stories.tsx` — title: `Brand/Logo`; exports: `OnLight` (logotype + mark on paper bg), `OnDark` (same on black bg), `Favicon` (favicon SVG at 32px + 64px), `VanBlueprint` (van-blueprint.svg full width)
- [x] T037 [P] [US3] Create `src/stories/brand/TypeSpecimens.stories.tsx` — title: `Brand/Typography`; exports: `MichromaSpecimen` (--t-h4 through --t-hero, UPPERCASE), `PlexSansSpecimen` (weights 300–700 at --t-body + --t-h3), `SpaceMonoSpecimen` (regular + bold at --t-tiny/small/body), `PlexSerifSpecimen` (400 italic + 600 at --t-body-lg + --t-h3)
- [x] T038 [P] [US3] Create `src/stories/brand/Iconography.stories.tsx` — title: `Brand/Iconography`; exports: `UsageRules` (formatted doc: stroke 1.5px, sizes 14/16/20/24px, inherit color, never filled, never >24px), `CuratedSet` (20 domain icons from contracts/stories.md at all 4 sizes in a grid)
- [x] T039 [P] [US3] Create `src/stories/brand/Voice.stories.tsx` — title: `Brand/Voice`; export: `Guidelines` (casing rules table, good/avoid examples from spec README, operative verbs list, number formatting rules)

**Checkpoint**: FVS mark visible in Storybook sidebar. All 4 typefaces render with their correct font-face. Icon grid shows 20 icons × 4 sizes. Voice guidelines page matches README content.

---

## Phase 6: User Story 4 — Console Theme Verification (Priority: P4)

**Goal**: Every token section and component correctly reflects `data-theme="console"` overrides when the theme toggle is activated.

**Independent Test**: Switch to Console theme — all surface/text/border colors update, focus rings remain amber, WCAG AA contrast holds.

- [x] T040 [US4] Audit `Colors.stories.tsx` — verify `RoleTokensConsole` story explicitly renders under console theme; add a `decorators` override to force `data-theme="console"` on that specific story if the global toolbar isn't sufficient
- [x] T041 [US4] Audit all component stories — open each in console theme and verify no hardcoded light-only values remain; fix any Tailwind utilities that baked color values instead of referencing CSS vars
- [x] T042 [US4] Verify focus ring in console theme — tab through `Button`, `Input`, `Toggle`, `Checkbox` under console theme; confirm `var(--fvs-amber)` resolves to `#E8A33D` in both themes (amber is not overridden in the console theme block)
- [x] T043 [US4] Run contrast check — use browser DevTools or axe on the `TelemetryReadings` story in both themes; confirm all text/background combos meet WCAG 2.1 AA (4.5:1 normal, 3:1 large/bold); document any borderline cases

**Checkpoint**: Theme toggle works on every story. No visual regressions between themes. Axe reports 0 critical violations in both light and console themes.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final quality pass across all stories.

- [x] T044 [P] Validate `storySort` order in `.storybook/preview.ts` — confirm sidebar displays: Tokens (Colors → Typography → Spacing → Radius → Shadows → Motion) → Components (Badge → Button → Card → DataTable → Divider → Input) → Brand (Iconography → Logo → TypeSpecimens → Voice)
- [x] T045 [P] Run `npm run typecheck` — resolve all TypeScript errors; no `any` types
- [x] T046 Run quickstart.md scenarios 1–6 manually; record pass/fail for each; fix any failures before marking complete
- [x] T047 [P] Verify `src/assets/fonts/` loads correctly — open Network tab, confirm Michroma + Space Mono requests return 200 from localhost (not external CDN)
- [x] T048 Run `npm run build-storybook` — confirm static export builds without errors; verify `storybook-static/` output is correct

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion — **blocks all user stories**
- **Phase 3 (US1)**: Depends on Phase 2 only; all 6 token story tasks (T017–T022) are parallel
- **Phase 4 (US2)**: Depends on Phase 2 only; all component pairs (T023/T024, T025/T026, etc.) are parallel; T035 depends on T023–T034
- **Phase 5 (US3)**: Depends on Phase 2 only; all 4 brand story tasks (T036–T039) are parallel
- **Phase 6 (US4)**: Depends on Phases 3 + 4 + 5 being complete (must verify all stories)
- **Phase 7 (Polish)**: Depends on Phase 6 completion

### User Story Dependencies

- **US1 (P1)**: Can start immediately after Phase 2 — no story dependencies
- **US2 (P2)**: Can start immediately after Phase 2 — no story dependencies; parallels US1
- **US3 (P3)**: Can start immediately after Phase 2 — no story dependencies; parallels US1+US2
- **US4 (P4)**: Depends on US1 + US2 + US3 being complete (verification pass over all stories)

### Within Each Phase

- Component `.tsx` and `.stories.tsx` files are shown as separate tasks for clarity but can be written together
- No test-first constraint (tests not requested in spec)
- Commit after each phase checkpoint

---

## Parallel Execution Example: Phase 4 (US2 Components)

All 6 component pairs can be built simultaneously:

```
Parallel batch:
  T023 Button.tsx          T025 Badge.tsx          T027 Card.tsx
  T024 Button.stories.tsx  T026 Badge.stories.tsx  T028 Card.stories.tsx

Parallel batch:
  T029 Input.tsx           T031 DataTable.tsx       T033 Divider.tsx
  T030 Input.stories.tsx   T032 DataTable.stories   T034 Divider.stories.tsx

Sequential:
  T035 Barrel exports (depends on T023–T034)
```

---

## Implementation Strategy

### MVP (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational — **critical, blocks everything**
3. Complete Phase 3: US1 Token Reference (T017–T022, all parallel)
4. **STOP and VALIDATE**: Storybook opens, all 6 token sections render, console theme toggle works on color tokens
5. Token reference is immediately usable as a standalone design reference

### Incremental Delivery

1. Phase 1 + Phase 2 → Storybook running with FVS theme (foundation)
2. Phase 3 (US1) → Token reference complete → **first shippable increment**
3. Phase 4 (US2) → Component catalog complete → second increment
4. Phase 5 (US3) → Brand reference complete → third increment
5. Phase 6 (US4) + Phase 7 → Console theme verified, polish done → **full release**

---

## Notes

- [P] tasks touch different files and have no dependency on in-flight tasks at the same phase level
- Design bundle preview HTMLs (`cards.html`, `buttons.html`, etc.) are pixel references — match them visually in component implementation
- `tokens.css` is **never modified** — it is copied verbatim and treated as read-only source of truth
- No hardcoded hex, px, or timing values in any `src/components/` or `src/stories/` file
- Amber focus ring (`var(--fvs-amber)`, 2px solid, 2px offset) is required on every interactive element — this is a constitution-level requirement
