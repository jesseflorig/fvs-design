# Component Contract: Layout Components

**Branch**: `011-layout-components` | **Date**: 2026-05-04

## Public Components

### `Stack`

```ts
type StackDirection = 'vertical' | 'horizontal';
type LayoutGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

interface StackProps {
  direction?: StackDirection;
  gap?: LayoutGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  children: React.ReactNode;
}
```

### `Cluster`

```ts
interface ClusterProps {
  gap?: LayoutGap;
  align?: StackAlign;
  justify?: StackJustify;
  children: React.ReactNode;
}
```

### `Navbar`

```ts
interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  meta?: string;
  active?: boolean;
  disabled?: boolean;
  onSelect?: (id: string) => void;
}

interface NavbarProps {
  items: NavigationItem[];
  activeId?: string;
  leading?: React.ReactNode;
  actions?: React.ReactNode;
  label?: string;
  compactBehavior?: 'wrap' | 'scroll';
}
```

### `Sidebar`

```ts
interface SidebarProps {
  items?: NavigationItem[];
  label?: string;
  collapsed?: boolean;
  children?: React.ReactNode;
}
```

### `DashboardShell`

```ts
interface DashboardShellProps {
  navbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  aside?: React.ReactNode;
  density?: 'compact' | 'standard';
  children: React.ReactNode;
}
```

### `DashboardGrid`

```ts
interface DashboardGridProps {
  gap?: LayoutGap;
  minItemWidth?: 'sm' | 'md' | 'lg';
  columns?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
}
```

### `Section`

```ts
interface SectionProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}
```

## Contract Rules

- Layout gaps and spacing must resolve to design-system spacing tokens.
- Layout components do not fetch data, own routing, or manage smart home state.
- Navbar and Sidebar interactive items expose semantic navigation and visible focus.
- Active navigation items use `aria-current` when representing the current page or view.
- Active and disabled navigation states must be understandable without color alone.
- Disabled items must not call selection handlers.
- DashboardShell must preserve the order of navigation, sidebar, main content, and aside regions.
- DashboardGrid must prevent child overlap in compact and wide examples.
- Section must expose a visible title and preserve action/content alignment.

## Required Stories

- **Stack**: vertical, horizontal, aligned row, and wrapping examples.
- **Cluster**: wrapping controls/status metadata example.
- **Navbar**: primary dashboard destinations, active state, disabled state, leading content, trailing actions, compact overflow.
- **Sidebar**: expanded and rail-style examples.
- **DashboardGrid**: responsive card/control layout.
- **Section**: title, description, actions, and empty/loading examples.
- **Dashboard Composition**: smart home dashboard using lighting, climate, security, presence, and energy areas.

## Accessibility Contract

- Navbar and Sidebar use navigation semantics with accessible labels.
- Keyboard users can reach and activate enabled navigation items.
- Focus is visible and uses the design-system amber focus treatment.
- Active state is exposed programmatically and visually without relying on color alone.
- Layout-only components do not introduce unnecessary focus stops.
