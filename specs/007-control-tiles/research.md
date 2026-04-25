# Research: Control Tiles (007-control-tiles)

## 1. Uniform Footprint Strategy

**Decision**: Use a single standard tile footprint for all default layout composition rather than multiple tile spans or mixed-size arrangements.

**Rationale**: The revised specification explicitly requires uniform tile sizing and non-overlapping layouts. A shared footprint removes the layout instability introduced by mixed spans and supports the calmer, more residential control feel the revision requests. It also simplifies scan order and makes portrait/landscape reflow more predictable on the small 5.5-inch target display.

**Alternatives considered**:
- **Mixed semantic sizes (`compact`, `wide`, `feature`)**: Previously planned, but now conflicts directly with the revised requirement for uniform tile size.
- **Optional feature tiles that span more cells**: Still increases layout complexity and raises overlap and clipping risk, especially in portrait mode.
- **Freeform consumer-defined spans**: Rejected because it shifts responsibility for overlap safety to consumers and makes layout guarantees impossible.

---

## 2. Layout Safety and Non-Overlap

**Decision**: The grid component owns placement and only accepts uniform tile items, with orientation changing column count and spacing but not cell size.

**Rationale**: The revised spec requires that layout components guarantee non-overlapping placement. Allowing arbitrary row or column spans would force the implementation either to reject many layouts or to support more complex packing rules than the feature needs. A uniform-cell grid is the safest and clearest option.

**Alternatives considered**:
- **Masonry or auto-placement with varied spans**: Too unpredictable for a touch-first control surface.
- **Absolute-positioned layout helpers**: Impossible to justify under the new non-overlap requirement.
- **Consumer-provided placement coordinates**: Flexible, but too error-prone for a design-system component intended to encode safe layout behavior.

**Chosen baseline**:
- **Landscape**: higher column count, same tile footprint
- **Portrait**: lower column count, same tile footprint
- **Placement model**: one tile per grid cell, no spanning in standard usage

---

## 3. Minimal Home-Control-Inspired Formatting

**Decision**: Interpret the Apple Home-control reference as guidance toward visual calm, direct toggles, and reduced information density rather than as a requirement to mimic another product's appearance.

**Rationale**: The FVS constitution still governs aesthetics. The revision clearly asks for a calmer and more minimal tile model, so the right move is to adopt the behavioral strengths of mature residential controls: concise labels, immediate state readout, visible toggle affordance, and restrained hierarchy. This can be done without abandoning the repo's black/off-white/amber brand language.

**Alternatives considered**:
- **Literal Home-app visual mimicry**: Conflicts with the constitution and creates brand drift.
- **Keeping the earlier dashboard-like tile density**: Conflicts with the revised request for a more minimal format.
- **Removing all control affordances for minimalism**: Would weaken the direct-manipulation goal of the feature.

---

## 4. Toggle State Model

**Decision**: Model toggle behavior explicitly with `off`, `on`, `transitioning`, `warning`, and `unavailable` state language visible on the tile.

**Rationale**: The revised feature now calls out toggle states specifically. A tile must be able to communicate both current device state and interaction result without requiring a detail view. This is especially important for lights, outlets, switches, scenes, and similar home-control objects.

**Alternatives considered**:
- **Reuse only generic status tones (`normal`, `active`, `warning`, `unavailable`)**: Too abstract for clear residential toggle behavior.
- **Binary `on/off` only**: Too limited; does not account for shade movement, scene activation, or network lag.
- **Icon-only toggle state**: Rejected because state cannot rely on iconography or color alone.

---

## 5. Minimal Control Surface Rules

**Decision**: Keep visible controls to a single dominant toggle or action affordance per tile in the default model, with grouped-room and scene tiles still preserving the same footprint and minimal density.

**Rationale**: The revised spec prioritizes minimal format and uniform sizing. Multiple side-by-side controls within one tile quickly undermine both. A single dominant affordance with concise state feedback fits the revised direction better and still supports core home automation use cases.

**Alternatives considered**:
- **Multiple always-visible actions per tile**: Too dense for the uniform footprint.
- **Action strip plus badges plus metrics**: Too close to the older dashboard concept.
- **No explicit control affordance, only whole-tile tap**: Works for some devices, but weakens clarity for unavailable or transitional states.
