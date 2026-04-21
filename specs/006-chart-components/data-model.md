# Data Model: Chart Components (006-chart-components)

## Shared Types

### `SeriesColor`

Maps a series key to an FVS token name. Resolved at render time via `resolve-token.ts`.

```
SeriesColor {
  seriesKey: string       // Must match a key in the dataset series array
  token: string           // e.g. "--fvs-amber", "--fvs-cyan", "--fvs-red"
}
```

Default color assignment cycles through a canonical FVS chart palette (defined in tokens) if `seriesColors` is not provided.

---

### `AxisConfig`

Shared axis configuration for both x and y axes.

```
AxisConfig {
  label?: string          // Human-readable axis label
  unit?: string           // Appended to tick values (e.g. "km/h", "°C")
  tickCount?: number      // Suggested number of ticks (renderer may adjust)
  domain?: [min, max]     // Explicit domain bounds; defaults to data extent
}
```

---

### `TooltipConfig`

Controls tooltip appearance and content.

```
TooltipConfig {
  enabled?: boolean       // Default true
  formatter?: (value: number, label: string) => string  // Custom value display
}
```

---

## Line Chart

**Component**: `LineChart`

```
LineChartDataPoint {
  x: number | string | Date   // X-axis value (often a timestamp)
  y: number                   // Y-axis value
}

LineSeries {
  key: string                 // Unique identifier for this series
  label: string               // Display name in legend/tooltip
  data: LineChartDataPoint[]
  dashPattern?: string        // SVG stroke-dasharray (for colorblind differentiation)
}

LineChartProps {
  series: LineSeries[]        // One or more series
  xAxis?: AxisConfig
  yAxis?: AxisConfig
  tooltip?: TooltipConfig
  seriesColors?: SeriesColor[]
  showLegend?: boolean        // Default true when series.length > 1
  height?: number             // Container height in px; default 300
  ariaLabel: string           // Accessible chart description (required)
}
```

---

## Area Chart

**Component**: `AreaChart`

Same as `LineChartProps` with one additional field:

```
AreaChartProps extends LineChartProps {
  fillOpacity?: number        // 0–1; default 0.25
}
```

---

## Bar Chart

**Component**: `BarChart`

Supports vertical and horizontal orientation via a single prop.

```
BarDataPoint {
  category: string            // X-axis label (vertical) or Y-axis label (horizontal)
  value: number
}

BarChartProps {
  data: BarDataPoint[]
  orientation?: "vertical" | "horizontal"   // Default "vertical"
  xAxis?: AxisConfig
  yAxis?: AxisConfig
  tooltip?: TooltipConfig
  color?: string              // FVS token name; default "--fvs-amber"
  height?: number             // Default 300
  ariaLabel: string
}
```

---

## Stacked Bar Chart

**Component**: `StackedBarChart`

```
StackedBarCategory {
  category: string            // X-axis label
  [seriesKey: string]: number | string  // One numeric value per series
}

StackedBarSeries {
  key: string
  label: string
}

StackedBarChartProps {
  data: StackedBarCategory[]
  series: StackedBarSeries[]  // Defines rendering order and legend labels
  orientation?: "vertical" | "horizontal"
  xAxis?: AxisConfig
  yAxis?: AxisConfig
  tooltip?: TooltipConfig
  seriesColors?: SeriesColor[]
  showLegend?: boolean        // Default true
  height?: number             // Default 300
  ariaLabel: string
}
```

---

## Grouped Bar Chart

**Component**: `GroupedBarChart`

Same shape as `StackedBarChartProps` — only the visual rendering differs (side-by-side vs. stacked).

```
GroupedBarChartProps = StackedBarChartProps
```

---

## Histogram

**Component**: `Histogram`

Accepts either pre-bucketed data or a raw numeric array.

```
HistogramBucket {
  label: string               // e.g. "0–10", "10–20"
  count: number
}

HistogramProps {
  // Option A: pre-bucketed
  buckets?: HistogramBucket[]

  // Option B: raw values (auto-bucketed)
  values?: number[]
  bins?: number               // Number of bins; default: Sturges' rule

  xAxis?: AxisConfig
  yAxis?: AxisConfig
  tooltip?: TooltipConfig
  color?: string              // FVS token name; default "--fvs-amber"
  height?: number             // Default 300
  ariaLabel: string
}
```

Constraint: exactly one of `buckets` or `values` must be provided.

---

## Scatter Plot

**Component**: `ScatterPlot`

```
ScatterPoint {
  x: number
  y: number
  label?: string              // Optional per-point label for tooltip
}

ScatterSeries {
  key: string
  label: string
  data: ScatterPoint[]
}

ScatterPlotProps {
  series: ScatterSeries[]
  xAxis?: AxisConfig
  yAxis?: AxisConfig
  tooltip?: TooltipConfig
  seriesColors?: SeriesColor[]
  showLegend?: boolean        // Default true when series.length > 1
  dotSize?: number            // Dot radius in px; default 4
  height?: number             // Default 300
  ariaLabel: string
}
```

---

## Box Plot

**Component**: `BoxPlot`

Accepts pre-computed statistical summaries — no raw value arrays.

```
BoxPlotGroup {
  category: string            // X-axis label for this group
  min: number                 // Whisker lower bound (typically 1.5 × IQR)
  q1: number                  // First quartile
  median: number
  q3: number                  // Third quartile
  max: number                 // Whisker upper bound
  outliers?: number[]         // Values outside whisker bounds
}

BoxPlotProps {
  data: BoxPlotGroup[]
  xAxis?: AxisConfig
  yAxis?: AxisConfig
  tooltip?: TooltipConfig
  color?: string              // FVS token name for box fill; default "--fvs-surface-2"
  strokeColor?: string        // FVS token name for box stroke; default "--fvs-amber"
  height?: number             // Default 300
  ariaLabel: string
}
```

---

## Validation Rules

- `ariaLabel` is required on all chart components — TypeScript will enforce this.
- `series` arrays must contain at least one item; empty series renders an empty state.
- `HistogramProps` requires exactly one of `buckets` or `values` — enforced with a TypeScript discriminated union.
- `BoxPlotGroup.min ≤ q1 ≤ median ≤ q3 ≤ max` — validated at runtime in development mode (console warning, no throw).
- Token names in `color`, `strokeColor`, and `seriesColors` must begin with `--fvs-` — enforced via TypeScript branded type (`FvsToken = \`--fvs-${string}\``).

---

## Empty State

All chart components render an `EmptyChart` placeholder when their primary data prop is an empty array. The placeholder uses FVS tokens for text and border, displays the `ariaLabel` as a visible caption, and occupies the same height as the populated chart.
