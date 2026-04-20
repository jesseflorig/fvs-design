# Data Model: Initial Design System Site

**Branch**: `001-initial-site` | **Date**: 2026-04-19

> This design system site has no persistent storage. The "data model" describes the structural types used in story files and token doc pages — shapes that govern how information is rendered.

---

## DesignToken

Represents a single named visual decision from `tokens.css`. Used by token doc pages to render swatches, rulers, and demo elements.

```ts
interface DesignToken {
  name: string;          // CSS variable name, e.g. '--fvs-amber'
  value: string;         // Raw declared value, e.g. '#E8A33D' or 'var(--fvs-amber)'
  resolvedValue?: string // Runtime-resolved value (via getComputedStyle) for var() references
  category: TokenCategory;
  semanticRole?: string; // Human-readable role, e.g. 'accent — live/active state'
  consoleValue?: string; // Override value in [data-theme="console"] context
}

type TokenCategory =
  | 'color-neutral'
  | 'color-signal'
  | 'color-role'
  | 'typography-family'
  | 'typography-scale'
  | 'typography-tracking'
  | 'typography-leading'
  | 'spacing'
  | 'radius'
  | 'shadow'
  | 'motion-duration'
  | 'motion-easing';
```

**Validation rules**:
- `name` MUST begin with `--fvs-` (primitive) or `--` (role alias); no unnamespaced custom properties.
- `value` MUST match the declared value in `tokens.css` exactly — no paraphrasing.
- `resolvedValue` is computed at render time; never hardcoded.
- `consoleValue` is required for all role tokens (those defined inside `[data-theme="console"]`).

**Lifecycle**: Static — defined at build time from `tokens.css`. No mutations.

---

## ButtonProps

Props contract for the `<Button>` component.

```ts
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger' | 'icon';
  size?: 'sm' | 'md';         // default: 'md'
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;      // required when variant='icon'
}
```

**Validation rules**:
- `aria-label` MUST be provided when `variant='icon'` (no visible text label).
- `children` for `variant='accent'` MUST be uppercase text (enforced by CSS `text-transform`; enforce in story usage as a convention).
- `size='sm'` reduces padding only; font size remains 13px.

---

## BadgeProps

Props contract for the `<Badge>` status pill component.

```ts
interface BadgeProps {
  status: 'nominal' | 'live' | 'fault' | 'info' | 'offline' | 'neutral';
  label: string;              // Rendered uppercase via CSS; supply sentence-case value
  showDot?: boolean;          // default: true for nominal/live/fault/info
  solid?: boolean;            // default: false; true = filled background variant
}
```

**Validation rules**:
- `label` MUST NOT contain emoji or punctuation other than `·` (mid-dot separator).
- `solid` MUST only be used with `status='neutral'` (ink fill) or for `ARM` state (amber fill) — not with semantic statuses.

---

## CardProps

Props contract for the `<Card>` panel-header component.

```ts
interface CardProps {
  panelLabel: string;         // UPPERCASE mono label shown in card header
  statusBadge?: BadgeProps;   // Optional badge in header right slot
  children: React.ReactNode;  // Card body content
  hover?: boolean;            // default: false; adds --shadow-1 on hover
}
```

**Validation rules**:
- `panelLabel` MUST be uppercase (CSS enforces; convention required in story values).
- Header and body are always separated by a 1px `--line` border — no exceptions.

---

## InputProps

Props contract for the `<Input>` text field component.

```ts
interface InputProps {
  label: string;              // Mono uppercase label above input
  type?: 'text' | 'number';  // default: 'text'
  value?: string;
  placeholder?: string;
  hint?: string;              // Mono micro text below input
  error?: string;             // Error message — replaces hint when present
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
```

**Select, Toggle, Checkbox** follow the same label/hint/error/disabled pattern.
- `<Select>` accepts `options: { value: string; label: string }[]`.
- `<Toggle>` accepts `checked: boolean` + `onLabel` / `offLabel` strings.
- `<Checkbox>` accepts `checked: boolean` + `label: string`.

**Validation rules**:
- `error` and `hint` are mutually exclusive in display (error takes precedence).
- Focus ring: `0 0 0 2px var(--fvs-paper), 0 0 0 4px var(--fvs-amber)` — matches design bundle exactly.

---

## DataTableProps

Props contract for the `<DataTable>` component.

```ts
interface DataTableColumn {
  key: string;
  header: string;             // Rendered uppercase mono; supply as-is
  align?: 'left' | 'right';  // default: 'left'; use 'right' for numeric columns
  statusColor?: 'nominal' | 'fault' | 'live'; // Applies semantic color to cell value
}

interface DataTableProps {
  columns: DataTableColumn[];
  rows: Record<string, string>[];
  caption?: string;
}
```

**Validation rules**:
- All numeric values in `rows` MUST include units (e.g., `'+12.48 V'`, `'21.4 °C'`).
- `align='right'` columns MUST use tabular-nums rendering (`font-variant-numeric: tabular-nums`).
- Row hover state is applied via CSS only — no JavaScript state needed.

---

## DividerProps

Props contract for the `<Divider>` rule component.

```ts
interface DividerProps {
  weight?: 'hair' | 'standard' | 'strong' | 'double'; // default: 'standard'
}
```

**Mapping to CSS**:
- `hair`: `border-top: 1px solid var(--line-hair)`
- `standard`: `border-top: 1px solid var(--line)`
- `strong`: `border-top: 1px solid var(--line-strong)`
- `double`: `border-top: 3px double var(--line-strong)`

---

## Theme

Represents a Storybook theme context. Not a persisted entity — state held by `addon-themes`.

```ts
type ThemeName = 'Light' | 'Console';

interface ThemeConfig {
  name: ThemeName;
  dataAttributeValue: string; // '' for Light, 'console' for Console
}
```

**State transitions**:
- `Light → Console`: sets `data-theme="console"` on `document.documentElement`
- `Console → Light`: removes `data-theme` attribute
- No partial or intermediate states.

---

## TokenDocPage (structural)

Shape used internally by token doc story pages to render a section.

```ts
interface TokenDocSection {
  title: string;
  tokens: DesignToken[];
  renderAs: 'swatch' | 'ruler' | 'shadow-card' | 'type-specimen' | 'motion-demo';
}
```
