# Data Model: Layout Components

**Branch**: `011-layout-components` | **Date**: 2026-05-04

## Entity: Stack

One-dimensional layout primitive for consistent directional spacing.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `direction` | `vertical` \| `horizontal` | no | Defaults to vertical. |
| `gap` | spacing option | no | Uses design-system spacing scale. |
| `align` | alignment option | no | Supports start, center, end, stretch, baseline where appropriate. |
| `justify` | distribution option | no | Supports common distribution values. |
| `wrap` | boolean | no | Allows horizontal content to wrap. |
| `children` | content | yes | Any dashboard content. |

### Validation Rules

- Spacing must be tokenized.
- Direction changes must not require consumers to write custom spacing wrappers.
- Wrapped horizontal stacks must preserve readable gaps.

## Entity: Cluster

Inline wrapping group for related controls, status chips, metadata, and compact action rows.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `gap` | spacing option | no | Uses design-system spacing scale. |
| `align` | alignment option | no | Aligns mixed inline content. |
| `justify` | distribution option | no | Controls row distribution. |
| `children` | content | yes | Related inline items. |

## Entity: Navbar

Top-level dashboard navigation.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `items` | Navigation Item[] | yes | At least one item. |
| `activeId` | string | no | Identifies active item when item does not self-identify. |
| `leading` | content | no | Brand, home name, or dashboard context. |
| `actions` | content | no | Optional trailing actions. |
| `label` | string | no | Accessible navigation label. |
| `compactBehavior` | option | no | Handles overflow without hiding the active destination. |

### Validation Rules

- Active item must be indicated without relying on color alone.
- Disabled items must not appear operable.
- Keyboard focus must be visible on interactive items.

## Entity: Navigation Item

One destination or action within Navbar or Sidebar.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `id` | string | yes | Stable item identifier. |
| `label` | string | yes | Visible destination label. |
| `href` | string | no | Destination when used as a link. |
| `icon` | content | no | Optional supporting icon. |
| `meta` | string | no | Optional understated metadata. |
| `active` | boolean | no | Marks current destination. |
| `disabled` | boolean | no | Marks unavailable destination. |

## Entity: DashboardShell

Page frame for smart home dashboard composition.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `navbar` | content | no | Top navigation region. |
| `sidebar` | content | no | Optional side navigation or context. |
| `main` | content | yes | Primary dashboard content. |
| `aside` | content | no | Optional status or detail region. |
| `density` | density option | no | Supports compact and standard dashboard density. |

## Entity: DashboardGrid

Responsive layout grid for dashboard panels and controls.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `gap` | spacing option | no | Uses design-system spacing scale. |
| `minItemWidth` | size option | no | Determines responsive column behavior. |
| `columns` | number or preset | no | Optional explicit column behavior. |
| `children` | content | yes | Cards, sections, controls, or summary panels. |

## Entity: Section

Dashboard region with title, optional description, actions, and content.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `title` | string | yes | Visible section title. |
| `description` | string | no | Understated supporting copy. |
| `actions` | content | no | Optional actions. |
| `children` | content | yes | Section content. |

## Entity: Sidebar

Secondary navigation or persistent context rail.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `items` | Navigation Item[] | no | Secondary destinations. |
| `label` | string | no | Accessible navigation label. |
| `collapsed` | boolean | no | Rail-style presentation. |
| `children` | content | no | Optional custom context content. |

## Entity: Dashboard Composition Example

Storybook example demonstrating clean smart home dashboard layout.

### Fields

| Field | Type | Required | Validation / Notes |
|---|---|---:|---|
| `areas` | list | yes | Includes lighting, climate, security, presence, and energy. |
| `viewports` | list | yes | Compact and wide review states. |
| `customWrappers` | count | yes | Should be minimal and measured against success criteria. |
