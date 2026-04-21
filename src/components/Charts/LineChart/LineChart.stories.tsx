import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LineChart } from './LineChart';

const meta: Meta<typeof LineChart> = {
  title: 'Components/Charts/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof LineChart>;

const speedData = [
  { x: '08:00', y: 0 },
  { x: '08:05', y: 45 },
  { x: '08:10', y: 72 },
  { x: '08:15', y: 68 },
  { x: '08:20', y: 55 },
  { x: '08:25', y: 80 },
  { x: '08:30', y: 74 },
];

const fuelData = [
  { x: '08:00', y: 100 },
  { x: '08:05', y: 97 },
  { x: '08:10', y: 93 },
  { x: '08:15', y: 89 },
  { x: '08:20', y: 85 },
  { x: '08:25', y: 81 },
  { x: '08:30', y: 76 },
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
    ariaLabel: 'Speed and fuel over time',
    series: [
      { key: 'speed', label: 'Speed', data: speedData },
      { key: 'fuel', label: 'Fuel', data: fuelData, dashPattern: '4 2' },
    ],
    yAxis: { label: 'Value', unit: '%' },
    showLegend: true,
    height: 300,
  },
};

export const Empty: Story = {
  args: {
    ariaLabel: 'No speed data available for this period',
    series: [],
    height: 300,
  },
};

export const NarrowContainer: Story = {
  render: (args) => (
    <div style={{ width: 240 }}>
      <LineChart {...args} />
    </div>
  ),
  args: {
    ariaLabel: 'Speed in narrow container',
    series: [{ key: 'speed', label: 'Speed', data: speedData }],
    height: 200,
  },
};
