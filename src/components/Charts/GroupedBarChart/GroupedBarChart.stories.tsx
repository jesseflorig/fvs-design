import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { GroupedBarChart } from './GroupedBarChart';

const meta: Meta<typeof GroupedBarChart> = {
  title: 'Components/Charts/GroupedBarChart',
  component: GroupedBarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof GroupedBarChart>;

const eventData = [
  { category: 'Zone A', alerts: 4, warnings: 7, info: 12 },
  { category: 'Zone B', alerts: 1, warnings: 3, info: 8 },
  { category: 'Zone C', alerts: 6, warnings: 9, info: 5 },
  { category: 'Zone D', alerts: 2, warnings: 4, info: 15 },
];

const seriesDef = [
  { key: 'alerts', label: 'Alerts' },
  { key: 'warnings', label: 'Warnings' },
  { key: 'info', label: 'Info' },
];

export const Default: Story = {
  args: {
    ariaLabel: 'Event counts grouped by type and zone',
    data: eventData,
    series: seriesDef,
    showLegend: true,
    height: 300,
  },
};

export const Horizontal: Story = {
  args: {
    ariaLabel: 'Event counts grouped — horizontal',
    data: eventData,
    series: seriesDef,
    orientation: 'horizontal',
    showLegend: true,
    height: 320,
  },
};

export const HorizontalWithUnit: Story = {
  args: {
    ariaLabel: 'Event counts grouped — horizontal with unit',
    data: eventData,
    series: seriesDef,
    orientation: 'horizontal',
    yAxis: { unit: ' events' },
    height: 320,
  },
};

export const NoLegend: Story = {
  args: {
    ariaLabel: 'Event counts without legend',
    data: eventData,
    series: seriesDef,
    showLegend: false,
    height: 300,
  },
};

export const DefaultLegend: Story = {
  name: 'Default legend (no showLegend prop)',
  args: {
    ariaLabel: 'Event counts with default legend',
    data: eventData,
    series: seriesDef,
    height: 300,
  },
};

export const WithSeriesColors: Story = {
  args: {
    ariaLabel: 'Event counts with custom series colors',
    data: eventData,
    series: seriesDef,
    seriesColors: [
      { seriesKey: 'alerts', token: '--fvs-amber' },
      { seriesKey: 'warnings', token: '--fvs-blue' },
    ],
    height: 300,
  },
};

export const WithAxisLabels: Story = {
  args: {
    ariaLabel: 'Event counts with axis labels',
    data: eventData,
    series: seriesDef,
    xAxis: { label: 'Zone' },
    yAxis: { label: 'Count', unit: 'events' },
    showLegend: true,
    height: 300,
  },
};

export const Empty: Story = {
  args: {
    ariaLabel: 'No event data available',
    data: [],
    series: seriesDef,
    height: 300,
  },
};

export const DefaultHeight: Story = {
  name: 'Default height (no height prop)',
  args: {
    ariaLabel: 'Event counts with default height',
    data: eventData,
    series: seriesDef,
  },
};
