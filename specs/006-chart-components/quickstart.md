# Quickstart / Integration Test Scenarios: Chart Components (006-chart-components)

## Scenario 1: Line Chart — Time-Series Telemetry

```tsx
import { LineChart } from '@/components/Charts/LineChart/LineChart';

const speedData = [
  { x: new Date('2026-04-01T08:00'), y: 0 },
  { x: new Date('2026-04-01T08:05'), y: 45 },
  { x: new Date('2026-04-01T08:10'), y: 72 },
  { x: new Date('2026-04-01T08:15'), y: 68 },
  { x: new Date('2026-04-01T08:20'), y: 55 },
];

<LineChart
  ariaLabel="Vehicle speed over time on April 1st route"
  series={[{ key: 'speed', label: 'Speed', data: speedData }]}
  yAxis={{ label: 'Speed', unit: 'km/h' }}
  height={300}
/>
```

**Expected**: A single amber line traces the speed curve; Y-axis labeled "Speed (km/h)"; no legend (single series).

---

## Scenario 2: Area Chart — Multi-Series Comparison

```tsx
import { AreaChart } from '@/components/Charts/AreaChart/AreaChart';

<AreaChart
  ariaLabel="Fuel and battery levels over trip duration"
  series={[
    { key: 'fuel', label: 'Fuel', data: fuelData },
    { key: 'battery', label: 'Battery', data: batteryData, dashPattern: '4 2' },
  ]}
  fillOpacity={0.2}
  yAxis={{ label: 'Level', unit: '%' }}
  showLegend
  height={300}
/>
```

**Expected**: Two filled areas in different FVS colors; legend visible; second series uses dashed stroke for colorblind differentiation.

---

## Scenario 3: Bar Chart — Vertical and Horizontal

```tsx
import { BarChart } from '@/components/Charts/BarChart/BarChart';

const tripData = [
  { category: 'Mon', value: 230 },
  { category: 'Tue', value: 185 },
  { category: 'Wed', value: 310 },
];

// Vertical
<BarChart ariaLabel="Distance driven by day of week" data={tripData} height={240} />

// Horizontal
<BarChart ariaLabel="Distance driven by day of week" data={tripData} orientation="horizontal" height={240} />
```

**Expected**: Both orientations render correctly; bars use `--fvs-amber` fill; axes are labeled.

---

## Scenario 4: Stacked Bar Chart — Event Types by Zone

```tsx
import { StackedBarChart } from '@/components/Charts/StackedBarChart/StackedBarChart';

const data = [
  { category: 'Zone A', alerts: 4, warnings: 7, info: 12 },
  { category: 'Zone B', alerts: 1, warnings: 3, info: 8 },
];

<StackedBarChart
  ariaLabel="Event counts by type and zone"
  data={data}
  series={[
    { key: 'alerts', label: 'Alerts' },
    { key: 'warnings', label: 'Warnings' },
    { key: 'info', label: 'Info' },
  ]}
  showLegend
  height={280}
/>
```

**Expected**: Three stacked segments per category bar; legend shows color-coded series labels.

---

## Scenario 5: Grouped Bar Chart — Same Data, Side-by-Side

```tsx
import { GroupedBarChart } from '@/components/Charts/GroupedBarChart/GroupedBarChart';

<GroupedBarChart
  ariaLabel="Event counts by type and zone"
  data={data}
  series={[
    { key: 'alerts', label: 'Alerts' },
    { key: 'warnings', label: 'Warnings' },
    { key: 'info', label: 'Info' },
  ]}
  showLegend
  height={280}
/>
```

**Expected**: Three side-by-side bars within each category group; legend visible.

---

## Scenario 6: Histogram — Speed Distribution

```tsx
import { Histogram } from '@/components/Charts/Histogram/Histogram';

// Pre-bucketed
<Histogram
  ariaLabel="Distribution of speeds across all trips"
  buckets={[
    { label: '0–20', count: 5 },
    { label: '20–40', count: 18 },
    { label: '40–60', count: 34 },
    { label: '60–80', count: 22 },
    { label: '80–100', count: 9 },
  ]}
  xAxis={{ label: 'Speed', unit: 'km/h' }}
  yAxis={{ label: 'Frequency' }}
  height={260}
/>

// Raw values (auto-bucketed into 10 bins)
<Histogram
  ariaLabel="Distribution of speeds across all trips"
  values={rawSpeedValues}
  bins={10}
  xAxis={{ label: 'Speed', unit: 'km/h' }}
  height={260}
/>
```

**Expected**: Adjacent bars with no gaps; bucket boundaries align with X-axis ticks.

---

## Scenario 7: Scatter Plot — Speed vs. Fuel Efficiency

```tsx
import { ScatterPlot } from '@/components/Charts/ScatterPlot/ScatterPlot';

<ScatterPlot
  ariaLabel="Speed vs. fuel efficiency across all trips"
  series={[
    {
      key: 'van1',
      label: 'Van 001',
      data: [{ x: 60, y: 8.2 }, { x: 75, y: 7.8 }, { x: 90, y: 6.9 }],
    },
    {
      key: 'van2',
      label: 'Van 002',
      data: [{ x: 55, y: 9.1 }, { x: 70, y: 8.5 }, { x: 85, y: 7.2 }],
    },
  ]}
  xAxis={{ label: 'Speed', unit: 'km/h' }}
  yAxis={{ label: 'Fuel efficiency', unit: 'L/100km' }}
  showLegend
  height={300}
/>
```

**Expected**: Two dot clusters in distinct FVS colors; legend identifies each van.

---

## Scenario 8: Box Plot — Idle Time Distribution

```tsx
import { BoxPlot } from '@/components/Charts/BoxPlot/BoxPlot';

<BoxPlot
  ariaLabel="Idle time distribution by vehicle category"
  data={[
    { category: 'Light', min: 2, q1: 5, median: 9, q3: 15, max: 22, outliers: [28, 31] },
    { category: 'Medium', min: 4, q1: 8, median: 14, q3: 20, max: 28 },
    { category: 'Heavy', min: 6, q1: 12, median: 18, q3: 26, max: 35, outliers: [42] },
  ]}
  xAxis={{ label: 'Vehicle category' }}
  yAxis={{ label: 'Idle time', unit: 'min' }}
  height={300}
/>
```

**Expected**: Three box-whisker shapes; outliers rendered as isolated dots; median line visible inside each box.

---

## Scenario 9: Empty State

```tsx
<LineChart
  ariaLabel="No data available for this period"
  series={[]}
  height={300}
/>
```

**Expected**: Empty state placeholder occupies 300px height; caption reads "No data available for this period"; no error thrown.

---

## Scenario 10: Narrow Container Responsiveness

Mount any chart inside a `200px`-wide container:

```tsx
<div style={{ width: 200 }}>
  <BarChart ariaLabel="Test narrow" data={tripData} height={200} />
</div>
```

**Expected**: Chart reflows to fit 200px width; labels truncate or rotate rather than overflow; no horizontal scrollbar introduced.

---

## Scenario 11: Keyboard Accessibility

1. Tab to a chart container.
2. Verify a visible amber focus ring appears on the container.
3. Tab to each legend toggle button and press Space/Enter to hide/show a series.
4. Verify the chart updates without a mouse.

**Expected**: Full interaction operable by keyboard; no focus trap.
