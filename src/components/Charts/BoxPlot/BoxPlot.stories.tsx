import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BoxPlot } from './BoxPlot';

const meta: Meta<typeof BoxPlot> = {
  title: 'Components/Charts/BoxPlot',
  component: BoxPlot,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof BoxPlot>;

export const Default: Story = {
  args: {
    ariaLabel: 'Idle time distribution by vehicle category',
    data: [
      { category: 'Light', min: 2, q1: 5, median: 9, q3: 15, max: 22 },
      { category: 'Medium', min: 4, q1: 8, median: 14, q3: 20, max: 28 },
      { category: 'Heavy', min: 6, q1: 12, median: 18, q3: 26, max: 35 },
    ],
    xAxis: { label: 'Vehicle category' },
    yAxis: { label: 'Idle time', unit: ' min' },
    height: 320,
  },
};

export const WithOutliers: Story = {
  args: {
    ariaLabel: 'Idle time with outlier observations',
    data: [
      { category: 'Light', min: 2, q1: 5, median: 9, q3: 15, max: 22, outliers: [28, 31] },
      { category: 'Medium', min: 4, q1: 8, median: 14, q3: 20, max: 28, outliers: [36] },
      { category: 'Heavy', min: 6, q1: 12, median: 18, q3: 26, max: 35, outliers: [42] },
    ],
    yAxis: { label: 'Idle time', unit: ' min' },
    height: 320,
  },
};

export const SingleGroup: Story = {
  args: {
    ariaLabel: 'Single vehicle category box plot',
    data: [
      { category: 'Fleet avg', min: 5, q1: 10, median: 16, q3: 22, max: 30, outliers: [38, 41] },
    ],
    yAxis: { label: 'Duration', unit: ' min' },
    height: 280,
  },
};

export const Empty: Story = {
  args: {
    ariaLabel: 'No distribution data available',
    data: [],
    height: 280,
  },
};
