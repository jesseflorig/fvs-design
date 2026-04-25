import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { BoxPlotShape } from './BoxPlotShape';

const meta: Meta<typeof BoxPlotShape> = {
  title: 'Components/Charts/BoxPlotShape',
  component: BoxPlotShape,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof BoxPlotShape>;

export const Default: Story = {
  render: () => (
    <svg width={200} height={200}>
      <BoxPlotShape
        x={80}
        width={40}
        fill="var(--bg-inset)"
        stroke="var(--fvs-amber)"
        min={10}
        q1={25}
        median={40}
        q3={60}
        max={80}
        yMin={0}
        yMax={100}
        chartHeight={200}
      />
    </svg>
  ),
};

export const DefaultPosition: Story = {
  name: 'Default x and width (no x/width props)',
  render: () => (
    <svg width={200} height={200}>
      <BoxPlotShape
        fill="var(--bg-inset)"
        stroke="var(--fvs-amber)"
        min={10}
        q1={25}
        median={40}
        q3={60}
        max={80}
        yMin={0}
        yMax={100}
        chartHeight={200}
      />
    </svg>
  ),
};

export const WithOutliers: Story = {
  render: () => (
    <svg width={200} height={200}>
      <BoxPlotShape
        x={80}
        width={40}
        fill="var(--bg-inset)"
        stroke="var(--fvs-amber)"
        min={10}
        q1={25}
        median={40}
        q3={60}
        max={80}
        outliers={[5, 90, 95]}
        yMin={0}
        yMax={100}
        chartHeight={200}
      />
    </svg>
  ),
};
