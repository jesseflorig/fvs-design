import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
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

export const Empty: Story = {
  args: {
    ariaLabel: 'No trip data available',
    data: [],
    height: 280,
  },
};
