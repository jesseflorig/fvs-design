# Component Contracts: Chart Components (006-chart-components)

These contracts define the TypeScript prop interfaces for all nine chart components. They serve as the authoritative reference for implementation and Storybook story authoring.

---

## Shared Branded Type

```typescript
type FvsToken = `--fvs-${string}`;
```

All color props accept only `FvsToken` values — no raw hex or Tailwind class names.

---

## Shared Interfaces

```typescript
interface AxisConfig {
  label?: string;
  unit?: string;
  tickCount?: number;
  domain?: [number, number];
}

interface TooltipConfig {
  enabled?: boolean;
  formatter?: (value: number, label: string) => string;
}

interface SeriesColor {
  seriesKey: string;
  token: FvsToken;
}
```

---

## LineChart

```typescript
interface LineChartDataPoint {
  x: number | string | Date;
  y: number;
}

interface LineSeries {
  key: string;
  label: string;
  data: LineChartDataPoint[];
  dashPattern?: string; // SVG stroke-dasharray
}

interface LineChartProps {
  series: LineSeries[];
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  tooltip?: TooltipConfig;
  seriesColors?: SeriesColor[];
  showLegend?: boolean;
  height?: number;
  ariaLabel: string;
}
```

---

## AreaChart

```typescript
interface AreaChartProps extends LineChartProps {
  fillOpacity?: number; // 0–1, default 0.25
}
```

---

## BarChart

```typescript
interface BarDataPoint {
  category: string;
  value: number;
}

interface BarChartProps {
  data: BarDataPoint[];
  orientation?: 'vertical' | 'horizontal';
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  tooltip?: TooltipConfig;
  color?: FvsToken;
  height?: number;
  ariaLabel: string;
}
```

---

## StackedBarChart

```typescript
interface StackedBarSeries {
  key: string;
  label: string;
}

type StackedBarCategory = {
  category: string;
} & Record<string, number>;

interface StackedBarChartProps {
  data: StackedBarCategory[];
  series: StackedBarSeries[];
  orientation?: 'vertical' | 'horizontal';
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  tooltip?: TooltipConfig;
  seriesColors?: SeriesColor[];
  showLegend?: boolean;
  height?: number;
  ariaLabel: string;
}
```

---

## GroupedBarChart

```typescript
// Same contract as StackedBarChart — only visual rendering differs
type GroupedBarChartProps = StackedBarChartProps;
```

---

## Histogram

```typescript
interface HistogramBucket {
  label: string;
  count: number;
}

type HistogramProps = {
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  tooltip?: TooltipConfig;
  color?: FvsToken;
  height?: number;
  ariaLabel: string;
} & (
  | { buckets: HistogramBucket[]; values?: never; bins?: never }
  | { values: number[]; bins?: number; buckets?: never }
);
```

---

## ScatterPlot

```typescript
interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
}

interface ScatterSeries {
  key: string;
  label: string;
  data: ScatterPoint[];
}

interface ScatterPlotProps {
  series: ScatterSeries[];
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  tooltip?: TooltipConfig;
  seriesColors?: SeriesColor[];
  showLegend?: boolean;
  dotSize?: number;
  height?: number;
  ariaLabel: string;
}
```

---

## BoxPlot

```typescript
interface BoxPlotGroup {
  category: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
}

interface BoxPlotProps {
  data: BoxPlotGroup[];
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  tooltip?: TooltipConfig;
  color?: FvsToken;
  strokeColor?: FvsToken;
  height?: number;
  ariaLabel: string;
}
```

---

## EmptyChart (internal)

```typescript
interface EmptyChartProps {
  label: string;   // Shown as caption text
  height: number;
}
```

Rendered by all chart components when their primary data array is empty.

---

## File Locations

| Component | Source path |
|---|---|
| `LineChart` | `src/components/Charts/LineChart/LineChart.tsx` |
| `AreaChart` | `src/components/Charts/AreaChart/AreaChart.tsx` |
| `BarChart` | `src/components/Charts/BarChart/BarChart.tsx` |
| `StackedBarChart` | `src/components/Charts/StackedBarChart/StackedBarChart.tsx` |
| `GroupedBarChart` | `src/components/Charts/GroupedBarChart/GroupedBarChart.tsx` |
| `Histogram` | `src/components/Charts/Histogram/Histogram.tsx` |
| `ScatterPlot` | `src/components/Charts/ScatterPlot/ScatterPlot.tsx` |
| `BoxPlot` | `src/components/Charts/BoxPlot/BoxPlot.tsx` |
| `EmptyChart` | `src/components/Charts/EmptyChart/EmptyChart.tsx` |
| Shared types | `src/components/Charts/types.ts` |
| Histogram util | `src/components/Charts/Histogram/bucketize.ts` |
| Box plot shape | `src/components/Charts/BoxPlot/BoxPlotShape.tsx` |
