import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { userEvent, fireEvent } from 'storybook/test';
import { BarChart } from './BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Components/Charts/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
  },
};
export default meta;
type Story = StoryObj<typeof BarChart>;

const tripData = [
  { category: 'Mon', value: 230 },
  { category: 'Tue', value: 185 },
  { category: 'Wed', value: 310 },
  { category: 'Thu', value: 274 },
  { category: 'Fri', value: 195 },
];

export const Vertical: Story = {
  args: {
    ariaLabel: 'Distance driven by day of week',
    data: tripData,
    yAxis: { label: 'Distance', unit: 'km' },
    height: 280,
  },
};

export const Horizontal: Story = {
  args: {
    ariaLabel: 'Distance driven by day of week',
    data: tripData,
    orientation: 'horizontal',
    xAxis: { unit: 'km' },
    height: 280,
  },
};

export const CustomColor: Story = {
  args: {
    ariaLabel: 'Distance by day with custom color',
    data: tripData,
    color: '--fvs-blue',
    height: 280,
  },
};

export const HorizontalWithUnit: Story = {
  args: {
    ariaLabel: 'Distance driven — horizontal with unit',
    data: tripData,
    orientation: 'horizontal',
    yAxis: { unit: 'km' },
    height: 280,
  },
};

export const WithTooltipFormatter: Story = {
  args: {
    ariaLabel: 'Distance with tooltip formatter',
    data: tripData,
    tooltip: { formatter: (v: number) => `${v} km` },
    height: 280,
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

export const WithAxisLabels: Story = {
  args: {
    ariaLabel: 'Distance with axis labels',
    data: tripData,
    xAxis: { label: 'Day', unit: 'trips' },
    yAxis: { label: 'Distance', unit: 'km' },
    height: 280,
  },
};

export const XAxisLabelNoUnit: Story = {
  name: 'x-axis label without unit',
  args: {
    ariaLabel: 'Distance with x-axis label no unit',
    data: tripData,
    xAxis: { label: 'Day' },
    height: 280,
  },
};

export const DefaultHeight: Story = {
  name: 'Default height (no height prop)',
  args: {
    ariaLabel: 'Distance with default height',
    data: tripData,
  },
};

export const Empty: Story = {
  args: {
    ariaLabel: 'No trip data available',
    data: [],
    height: 280,
  },
};
