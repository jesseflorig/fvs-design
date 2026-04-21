import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { AreaChart } from './AreaChart';

const meta: Meta<typeof AreaChart> = {
  title: 'Components/Charts/AreaChart',
  component: AreaChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof AreaChart>;

const speedData = [
  { x: '08:00', y: 0 },
  { x: '08:05', y: 45 },
  { x: '08:10', y: 72 },
  { x: '08:15', y: 68 },
  { x: '08:20', y: 55 },
  { x: '08:25', y: 80 },
  { x: '08:30', y: 74 },
];

const batteryData = [
  { x: '08:00', y: 100 },
  { x: '08:05', y: 96 },
  { x: '08:10', y: 91 },
  { x: '08:15', y: 87 },
  { x: '08:20', y: 83 },
  { x: '08:25', y: 78 },
  { x: '08:30', y: 73 },
];

export const Default: Story = {
  args: {
    ariaLabel: 'Vehicle speed over time',
    series: [{ key: 'speed', label: 'Speed', data: speedData }],
    yAxis: { label: 'Speed', unit: 'km/h' },
    height: 300,
  },
};

export const MultiSeries: Story = {
  args: {
    ariaLabel: 'Speed and battery level over time',
    series: [
      { key: 'speed', label: 'Speed', data: speedData },
      { key: 'battery', label: 'Battery', data: batteryData, dashPattern: '4 2' },
    ],
    yAxis: { label: 'Level', unit: '%' },
    showLegend: true,
    fillOpacity: 0.2,
    height: 300,
  },
};

export const FillOpacity: Story = {
  args: {
    ariaLabel: 'Speed with heavier fill',
    series: [{ key: 'speed', label: 'Speed', data: speedData }],
    fillOpacity: 0.5,
    height: 300,
  },
};

export const Empty: Story = {
  args: {
    ariaLabel: 'No data available for this period',
    series: [],
    height: 300,
  },
};
