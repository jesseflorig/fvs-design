# Research: Layout Components

**Branch**: `011-layout-components` | **Date**: 2026-05-04

## Decision 1: Layout Family Scope

**Decision**: Deliver a layout family containing Stack, Cluster, DashboardGrid, DashboardShell, Section, Sidebar, and Navbar.

**Rationale**: Stack and Navbar satisfy the explicit request, but clean smart home dashboards also need repeatable page framing, grid placement, section hierarchy, secondary navigation, and inline wrapping groups. Including these primitives prevents dashboard stories from relying on one-off wrapper styles.

**Alternatives considered**:

- Only implement Stack and Navbar: rejected because it would leave dashboard composition under-specified and force custom wrappers for grids, sections, and page frames.
- Implement a full application shell with data/state behavior: rejected because the feature is a design-system layout layer, not a smart home app.

## Decision 2: Stack and Cluster Separation

**Decision**: Use `Stack` for one-dimensional directional layout and `Cluster` for wrapping inline groups.

**Rationale**: Stack excels at predictable vertical or horizontal spacing. Cluster covers dense groups of controls, status chips, and metadata that need wrapping. Keeping them separate avoids a single component with too many behavioral modes.

**Alternatives considered**:

- One universal layout component: rejected because props would become ambiguous and harder to document.
- Rely on raw flex styles in stories: rejected because the feature goal is reusable layout components.

## Decision 3: Navbar Interaction Pattern

**Decision**: Navbar exposes semantic navigation items with active, disabled, optional icon, optional metadata, leading content, and trailing actions.

**Rationale**: Smart home dashboards need top-level navigation with active state and contextual actions. Active state should be understandable through `aria-current`, text/structure, and tokenized marker treatment, not color alone.

**Alternatives considered**:

- Tabs-only navigation: rejected because dashboard navigation may link to pages or modes, not just tab panels.
- Icon-only navigation: rejected because labels are needed for clarity and accessibility.

## Decision 4: Dashboard Shell and Sidebar

**Decision**: DashboardShell frames the page with Navbar, optional Sidebar/Rail, main content, and optional aside/status region.

**Rationale**: Smart home dashboards commonly need persistent navigation plus dense operational content. A shell provides a repeatable frame without dictating device data or page routing.

**Alternatives considered**:

- Navbar-only page frame: rejected because larger dashboards often need secondary room navigation or persistent context.
- Full app layout with routing: rejected because navigation behavior should remain consumer-owned.

## Decision 5: DashboardGrid

**Decision**: DashboardGrid arranges cards, control tiles, summaries, and sections with tokenized gaps and responsive column behavior.

**Rationale**: Dashboards need predictable density across wall tablet, desktop, and phone widths. A grid primitive reduces custom layout wrappers and supports review against overlap and scanability requirements.

**Alternatives considered**:

- Reuse ControlTileGrid for all dashboard layout: rejected because ControlTileGrid is specialized for control tiles and should not become the page-level grid for all dashboard content.
- Fixed column count only: rejected because responsive dashboards need compact and wide behavior.

## Decision 6: Section Component

**Decision**: Section groups related dashboard content with title, optional description, optional actions, and content slot.

**Rationale**: Smart home dashboards need calm section hierarchy for rooms, device groups, alerts, and energy summaries. Section provides consistent header spacing and actions without using decorative cards for every region.

**Alternatives considered**:

- Use Card for every region: rejected because page sections should not become nested cards or overly framed surfaces.
- Heading-only sections: rejected because actions and descriptions are common dashboard needs.

## Decision 7: Stories and Examples

**Decision**: Provide primitive examples plus an integrated smart home dashboard story covering lighting, climate, security, presence, and energy.

**Rationale**: Layout components are only useful if composition is demonstrated. The integrated example validates the "90% no custom spacing wrappers" success criterion and helps catch compact/wide overlap.

**Alternatives considered**:

- Primitive-only stories: rejected because they do not prove dashboard composition.
- Full marketing landing page: rejected because the dashboard should be the primary usable experience.
