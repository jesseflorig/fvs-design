import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EmptyChart } from './EmptyChart';

const meta: Meta<typeof EmptyChart> = {
  title: 'Components/Charts/EmptyChart',
  component: EmptyChart,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof EmptyChart>;

export const Default: Story = {
  args: { label: 'No data available', height: 300 },
};

export const Tall: Story = {
  args: { label: 'No data for this period', height: 480 },
};

export const Short: Story = {
  args: { label: 'No data', height: 160 },
};
