# Research: Chart Components (006-chart-components)

## 1. Chart Library Selection

**Decision**: Recharts  
**Rationale**: Recharts is a composable, React-first charting library built on D3 with SVG output. Its declarative component API pairs naturally with the FVS token system — SVG `stroke`, `fill`, and `font` attributes accept CSS custom property values via inline `style` props. TypeScript support is first-class (`recharts` ships its own types). The `ResponsiveContainer` wrapper handles layout reflow without manual resize observers. `ComposedChart` + `customized` shape API supports histogram bin rendering and box-whisker shapes for the two types without a dedicated primitive.

**Alternatives considered**:
- **Nivo**: Natively supports all 9 chart types including box plot, but uses a JSON theme object for styling — applying dynamic CSS custom property values requires runtime token resolution rather than declarative token usage. More opinionated about layout.
- **Visx**: Maximum SVG control and native box plot support, but is a low-level primitive kit — each chart type requires assembling axes, scales, and shapes manually. The effort multiplies across 9 types.
- **D3 raw**: Full power, no abstraction ceiling — rejected because direct DOM manipulation conflicts with React's rendering model and the cognitive overhead of maintaining 9 fully custom chart implementations is disproportionate.

**Remaining gaps covered by Recharts primitives**:
- **Histogram**: Rendered via `BarChart` with pre-bucketed data and `barCategoryGap={0}` to remove inter-bar spacing. Bucketing logic lives in a utility function beside the component.
- **Box plot**: Rendered via `ComposedChart` with a custom `<BoxPlotShape>` SVG component passed to `customized`. The shape receives the computed quartile and whisker values as props.

---

## 2. Token Integration in SVG Charts

**Decision**: Resolve FVS design tokens at render time via `getComputedStyle` (using the existing `resolve-token.ts` utility) and pass resolved hex/px values to Recharts color and font props.

**Rationale**: Recharts SVG elements accept `stroke`, `fill`, and `fontFamily` as string props — not CSS classes. Tailwind utilities do not apply inside SVG. The existing `lib/resolve-token.ts` already resolves `--fvs-*` CSS custom properties to concrete values at runtime, making it the natural bridge. All color references in chart components will use token names as constants (e.g., `FVS_AMBER`, `FVS_SURFACE`) resolved at mount.

**Alternatives considered**:
- **CSS variables directly on SVG attrs**: Modern SVG does support `fill: var(--fvs-amber)` in inline styles, but Recharts internally passes prop strings to SVG attributes, which does not parse `var()` expressions. Rejected.
- **Hardcoded values**: Violates Constitution Principle II. Not considered.

---

## 3. Accessibility for Charts

**Decision**: Keyboard tooltip navigation via `tabIndex` on chart container + Recharts `<Tooltip>` with `wrapperStyle` for visual focus ring; ARIA labels on chart wrapper elements.

**Rationale**: Recharts does not implement native keyboard navigation for data points, but WCAG 2.1 AA for data visualization is achievable through: (1) an accessible `<title>` and `<desc>` embedded in each chart's SVG, (2) keyboard focus on the chart container that cycles through data values using arrow keys, and (3) ensuring legend toggle buttons are real `<button>` elements with visible focus states.

**Implementation approach**:
- Each chart component wraps its Recharts output in a `<div>` with `role="img"` and `aria-label` carrying a concise chart description.
- Legend items rendered as `<button>` elements with `focus-visible:outline-2 focus-visible:outline-[var(--fvs-amber)]`.
- Color is never the sole differentiator — line/area charts include distinct dash patterns per series for colorblind support.

---

## 4. Box Plot Data Contract

**Decision**: Box plot input accepts pre-computed statistical summaries (min, q1, median, q3, max, outliers[]) rather than raw value arrays.

**Rationale**: Computing quartiles client-side in a presentational component couples data processing to presentation. Consumers with server-side data pipelines will already have summary statistics available. Pre-computed input also keeps the component stateless and testable with simple fixtures.

---

## 5. Histogram Bucketing

**Decision**: Histogram accepts either pre-bucketed data (array of `{label, count}`) or a raw numeric array with a `bins` prop (default: 10). When raw values are provided, Sturges' rule is used as the automatic bin-count fallback.

**Rationale**: Pre-bucketed input matches the box plot pattern and supports server-computed histograms. The raw + `bins` path is a convenience for Storybook stories and client-side use cases. Sturges' rule (`k = ⌈log₂(n) + 1⌉`) is simple and appropriate for the data volumes expected in vehicle telemetry panels.
