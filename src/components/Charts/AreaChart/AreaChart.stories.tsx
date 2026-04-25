import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { userEvent, fireEvent, within } from 'storybook/test';
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

export const WithTooltipFormatter: Story = {
  args: {
    ariaLabel: 'Speed with tooltip formatter',
    series: [{ key: 'speed', label: 'Speed', data: speedData }],
    yAxis: { label: 'Speed', unit: 'km/h' },
    tooltip: { formatter: (v: number) => [`${v} km/h`, 'Speed'] },
    height: 300,
  },
  parameters: { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } },
  play: async ({ canvasElement }) => {
    const wrapper = canvasElement.querySelector('.recharts-wrapper') as HTMLElement;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    await fireEvent.mouseMove(wrapper, {
      bubbles: true,
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
    });
    await new Promise<void>(resolve => setTimeout(resolve, 50));
  },
};

export const Empty: Story = {
  args: {
    ariaLabel: 'No data available for this period',
    series: [],
    height: 300,
  },
};

export const WithSeriesColors: Story = {
  args: {
    ariaLabel: 'Speed with custom series color',
    series: [{ key: 'speed', label: 'Speed', data: speedData }],
    seriesColors: [{ seriesKey: 'speed', token: '--fvs-blue' }],
  },
};

export const WithXAxisLabel: Story = {
  name: 'With x-axis label and unit',
  args: {
    ariaLabel: 'Speed with x-axis label and unit',
    series: [{ key: 'speed', label: 'Speed', data: speedData }],
    xAxis: { label: 'Time', unit: 'hrs' },
    height: 300,
  },
};

export const WithXAxisLabelNoUnit: Story = {
  name: 'With x-axis label (no unit)',
  args: {
    ariaLabel: 'Speed with x-axis label only',
    series: [{ key: 'speed', label: 'Speed', data: speedData }],
    xAxis: { label: 'Time' },
    height: 300,
  },
};

export const WithDateSeries: Story = {
  name: 'Date x-values',
  args: {
    ariaLabel: 'Speed with date x-axis',
    series: [{
      key: 'speed',
      label: 'Speed',
      data: [
        { x: new Date('2024-01-01T08:00:00'), y: 45 },
        { x: new Date('2024-01-01T08:05:00'), y: 72 },
        { x: new Date('2024-01-01T08:10:00'), y: 68 },
      ],
    }],
    height: 300,
  },
};
