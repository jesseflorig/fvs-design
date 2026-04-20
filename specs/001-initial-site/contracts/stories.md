# Story Contracts: Initial Design System Site

**Branch**: `001-initial-site` | **Date**: 2026-04-19

These contracts define the Storybook story structure for every story file. Each entry specifies: the story file path, the `title` (sidebar location), which named exports must exist, and the required `play` function behavior where applicable.

---

## Token Stories

### `src/stories/tokens/Colors.stories.tsx`

**title**: `Tokens/Colors`

| Named Export | Description |
|---|---|
| `NeutralScale` | Renders --fvs-black through --fvs-white as a horizontal row of labeled swatches |
| `SignalSemantic` | Renders --fvs-amber, --fvs-green, --fvs-red, --fvs-blue as swatches with role labels |
| `RoleTokensLight` | Renders all --bg, --fg, --line, --accent, etc. in light theme with resolved values |
| `RoleTokensConsole` | Same tokens rendered under console theme; must show overridden values |

**Requirements**: Each swatch shows: CSS variable name, raw value, resolved value, semantic role. Switching the theme toolbar rerenders `RoleTokensConsole` with updated values.

---

### `src/stories/tokens/Typography.stories.tsx`

**title**: `Tokens/Typography`

| Named Export | Description |
|---|---|
| `TypeScale` | All --t-micro through --t-hero values rendered as live text with size labels |
| `LineHeights` | All --lh-* values shown as paragraph blocks with visible leading |
| `Tracking` | All --tr-* values shown as UPPERCASE LABELS with tracking applied |
| `FontFamilies` | Four rows: --font-display, --font-sans, --font-mono, --font-serif at --t-body |

**Requirements**: `TypeScale` must render each step using the token value (not a hardcoded px in the story). Font name shown as `Space Mono`, not the CSS variable.

---

### `src/stories/tokens/Spacing.stories.tsx`

**title**: `Tokens/Spacing`

| Named Export | Description |
|---|---|
| `SpacingScale` | --s-1 through --s-12 shown as horizontal bars with px value label |

---

### `src/stories/tokens/Radius.stories.tsx`

**title**: `Tokens/Radius`

| Named Export | Description |
|---|---|
| `RadiusScale` | --r-0 through --r-4 shown as filled squares with corner radii applied |

---

### `src/stories/tokens/Shadows.stories.tsx`

**title**: `Tokens/Shadows`

| Named Export | Description |
|---|---|
| `ShadowTiers` | --shadow-1, --shadow-2, --shadow-3, --shadow-inset, --shadow-console each on a card |

**Requirements**: Each card displays the shadow name and its intended use case (from the README). `--shadow-console` demo must be visible — requires a dark background even in light theme.

---

### `src/stories/tokens/Motion.stories.tsx`

**title**: `Tokens/Motion`

| Named Export | Description |
|---|---|
| `Durations` | --dur-fast, --dur-med, --dur-slow: animated box slides across on click |
| `Easings` | --ease-std, --ease-in, --ease-out: same animation, easing compared side by side |

**Requirements**: Clicking the demo element triggers the animation. No auto-play. Uses CSS `transition` with the token values applied via inline style.

---

## Component Stories

### `src/components/Button/Button.stories.tsx`

**title**: `Components/Button`

| Named Export | Description |
|---|---|
| `AllVariants` | All 6 variants (primary, secondary, ghost, accent, danger, icon) in a single row |
| `Primary` | Primary variant, argTypes controls for size + disabled |
| `Secondary` | Secondary variant, argTypes controls |
| `Ghost` | Ghost variant |
| `Accent` | Accent variant (mono uppercase label, amber fill) |
| `Danger` | Danger variant (red border, red text) |
| `Icon` | Icon variant with aria-label; renders a Lucide refresh icon at 16px |
| `Disabled` | Primary in disabled state |

**play function requirements**:
- `Primary`: tab to button, verify focus ring is visible (`toHaveFocus`, check `outline` is `2px solid`).

---

### `src/components/Badge/Badge.stories.tsx`

**title**: `Components/Badge`

| Named Export | Description |
|---|---|
| `AllStatuses` | nominal, live, fault, info, offline, neutral in a row |
| `Nominal` | argTypes: label, showDot, solid |
| `Live` | With animated content (e.g., "LIVE · T−00:04") |
| `Fault` | With "FAULT · BUS B" label |
| `SolidVariants` | Ink-fill (version number) and amber-fill (ARM) solid badges |

---

### `src/components/Card/Card.stories.tsx`

**title**: `Components/Card`

| Named Export | Description |
|---|---|
| `BatteryPanel` | panelLabel="BATTERY · BUS A", nominal badge, big numeric body (matches preview) |
| `ClimatePanel` | panelLabel="CLIMATE · CABIN", live badge, temperature reading |
| `EmptyShell` | Card with panelLabel only, no body content |
| `WithHover` | hover=true; shows shadow-1 on hover |

---

### `src/components/Input/Input.stories.tsx`

**title**: `Components/Input`

| Named Export | Description |
|---|---|
| `TextField` | Default text input with label, placeholder, hint |
| `WithError` | Same input with error message (hint replaced) |
| `Disabled` | Disabled text input |
| `SelectField` | `<Select>` with two climate preset options |
| `ToggleField` | Toggle in on and off states side by side |
| `CheckboxField` | Checked and unchecked checkboxes |

**play function requirements**:
- `TextField`: focus input, verify amber focus ring (`box-shadow` contains `var(--fvs-amber)` resolved value).

---

### `src/components/DataTable/DataTable.stories.tsx`

**title**: `Components/DataTable`

| Named Export | Description |
|---|---|
| `TelemetryReadings` | 4-row table matching the preview (BUS A, BUS B, CABIN TEMP, ARRAY) |
| `AllColumnAlignments` | Table demonstrating left and right-aligned numeric columns |

---

### `src/components/Divider/Divider.stories.tsx`

**title**: `Components/Divider`

| Named Export | Description |
|---|---|
| `AllWeights` | hair, standard, strong, double rendered in a stack with labels |

---

## Brand Stories

### `src/stories/brand/Logo.stories.tsx`

**title**: `Brand/Logo`

| Named Export | Description |
|---|---|
| `OnLight` | Primary logotype + standalone mark on paper background |
| `OnDark` | Same on ink/black background |
| `Favicon` | Favicon SVG at 32px and 64px |
| `VanBlueprint` | van-blueprint.svg at full width |

---

### `src/stories/brand/Iconography.stories.tsx`

**title**: `Brand/Iconography`

| Named Export | Description |
|---|---|
| `UsageRules` | FVS iconography rules as a formatted doc page (stroke weight, sizes, no fill, no color) |
| `CuratedSet` | ~20 domain-relevant Lucide icons at all 4 sizes (14, 16, 20, 24px) in a grid |

**Curated icon list** (domain-relevant to FVS product):  
`battery-charging`, `battery`, `thermometer`, `zap`, `wifi`, `wifi-off`, `lock`, `unlock`, `shield`, `alert-triangle`, `check-circle`, `x-circle`, `activity`, `gauge`, `map-pin`, `refresh-cw`, `settings`, `power`, `signal`, `clock`

---

### `src/stories/brand/Voice.stories.tsx`

**title**: `Brand/Voice`

| Named Export | Description |
|---|---|
| `Guidelines` | Voice rules doc page: casing rules, good/avoid examples table, operative verbs list |

---

### `src/stories/brand/TypeSpecimens.stories.tsx`

**title**: `Brand/Typography`

| Named Export | Description |
|---|---|
| `MichromaSpecimen` | Michroma at all scale steps (--t-h4 through --t-hero) |
| `PlexSansSpecimen` | IBM Plex Sans weights 300–700 at --t-body and --t-h3 |
| `SpaceMonoSpecimen` | Space Mono regular and bold at --t-tiny, --t-small, --t-body |
| `PlexSerifSpecimen` | IBM Plex Serif 400 italic and 600 at --t-body-lg and --t-h3 |

---

## Storybook Config Contracts

### `.storybook/main.ts`

Required addons:
- `@storybook/addon-essentials` (controls, actions, docs, viewport)
- `@storybook/addon-themes`
- `@storybook/addon-a11y`

Builder: `@storybook/react-vite`

### `.storybook/preview.ts`

Required:
- Import `../src/tokens/tokens.css`
- `withThemeByAttribute` decorator from `@storybook/addon-themes`
- `storySort`: Tokens before Components before Brand; alphabetical within each group

### `.storybook/theme.ts`

Required custom theme values (via `@storybook/theming` → `create`):
- `appBg: '#0A0A0B'`
- `appContentBg: '#151517'`
- `colorPrimary: '#E8A33D'`
- `colorSecondary: '#E8A33D'`
- `fontBase: "'IBM Plex Sans', ui-sans-serif"`
- `fontCode: "'Space Mono', ui-monospace"`
- `brandTitle: 'Fleet Van Systems'`
- `brandImage: '../src/assets/svg/mark.svg'`
