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

export const NoLegend: Story = {
  args: {
    ariaLabel: 'Event counts without legend',
    data: eventData,
    series: seriesDef,
    showLegend: false,
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
