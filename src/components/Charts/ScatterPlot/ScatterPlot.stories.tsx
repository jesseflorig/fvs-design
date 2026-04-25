import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ScatterPlot } from './ScatterPlot';

const meta: Meta<typeof ScatterPlot> = {
  title: 'Components/Charts/ScatterPlot',
  component: ScatterPlot,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ScatterPlot>;

const van1Data = [
  { x: 60, y: 8.2 }, { x: 65, y: 7.9 }, { x: 70, y: 7.6 },
  { x: 75, y: 7.3 }, { x: 80, y: 7.0 }, { x: 85, y: 6.8 },
  { x: 90, y: 6.5 }, { x: 95, y: 6.2 }, { x: 100, y: 5.9 },
];

const van2Data = [
  { x: 55, y: 9.1 }, { x: 60, y: 8.7 }, { x: 65, y: 8.4 },
  { x: 70, y: 8.1 }, { x: 75, y: 7.8 }, { x: 80, y: 7.5 },
  { x: 85, y: 7.2 }, { x: 90, y: 6.9 }, { x: 95, y: 6.6 },
];

const largeSeries = Array.from({ length: 60 }, (_, i) => ({
  x: 40 + Math.round(Math.random() * 70),
  y: parseFloat((5 + Math.random() * 5).toFixed(2)),
}));

export const SingleSeries: Story = {
  args: {
    ariaLabel: 'Speed vs. fuel efficiency for Van 001',
    series: [{ key: 'van1', label: 'Van 001', data: van1Data }],
    xAxis: { label: 'Speed', unit: 'km/h' },
    yAxis: { label: 'Fuel efficiency', unit: 'L/100km' },
    height: 300,
  },
};

export const MultiSeries: Story = {
  args: {
    ariaLabel: 'Speed vs. fuel efficiency across fleet',
    series: [
      { key: 'van1', label: 'Van 001', data: van1Data },
      { key: 'van2', label: 'Van 002', data: van2Data },
    ],
    xAxis: { label: 'Speed', unit: 'km/h' },
    yAxis: { label: 'Fuel efficiency', unit: 'L/100km' },
    showLegend: true,
    height: 300,
  },
};

export const LargeDataset: Story = {
  args: {
    ariaLabel: 'Fleet speed vs. efficiency (60 observations)',
    series: [{ key: 'fleet', label: 'Fleet', data: largeSeries }],
    xAxis: { label: 'Speed', unit: 'km/h' },
    yAxis: { label: 'Efficiency', unit: 'L/100km' },
    height: 300,
  },
};

export const WithSeriesColors: Story = {
  args: {
    ariaLabel: 'Speed vs fuel efficiency with custom colors',
    series: [
      { key: 'van1', label: 'Van 001', data: van1Data },
      { key: 'van2', label: 'Van 002', data: van2Data },
    ],
    seriesColors: [
      { seriesKey: 'van1', token: '--fvs-amber' },
      { seriesKey: 'van2', token: '--fvs-blue' },
    ],
    xAxis: { label: 'Speed', unit: 'km/h' },
    yAxis: { label: 'Efficiency', unit: 'L/100km' },
    showLegend: true,
    height: 300,
  },
};

export const EmptyDataSeries: Story = {
  name: 'Empty data in series (not empty series array)',
  args: {
    ariaLabel: 'No data points in series',
    series: [{ key: 'van1', label: 'Van 001', data: [] }],
    height: 300,
  },
};

export const NoAxisLabels: Story = {
  name: 'No axis labels or units',
  args: {
    ariaLabel: 'Speed vs fuel efficiency — no axis labels',
    series: [{ key: 'van1', label: 'Van 001', data: van1Data }],
    height: 300,
  },
};

export const AxisLabelNoUnit: Story = {
  name: 'Axis label without unit (covers xAxis.unit falsy branch)',
  args: {
    ariaLabel: 'Speed vs fuel efficiency — label only',
    series: [{ key: 'van1', label: 'Van 001', data: van1Data }],
    xAxis: { label: 'Speed' },
    yAxis: { label: 'Efficiency' },
    height: 300,
  },
};

export const CustomDotSize: Story = {
  name: 'Custom dot size',
  args: {
    ariaLabel: 'Speed vs fuel efficiency — large dots',
    series: [{ key: 'van1', label: 'Van 001', data: van1Data }],
    dotSize: 8,
    height: 300,
  },
};

export const Empty: Story = {
  args: {
    ariaLabel: 'No scatter data available',
    series: [],
    height: 300,
  },
};

export const DefaultHeight: Story = {
  name: 'Default height (no height prop)',
  args: {
    ariaLabel: 'Speed vs fuel efficiency — default height',
    series: [{ key: 'van1', label: 'Van 001', data: van1Data }],
  },
};
