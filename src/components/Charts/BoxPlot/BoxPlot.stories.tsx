import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { fireEvent } from 'storybook/test';
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
  parameters: { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } },
  play: async ({ canvasElement }) => {
    const wrapper = canvasElement.querySelector('.recharts-wrapper') as HTMLElement;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    await fireEvent.mouseMove(wrapper, {
      bubbles: true,
      clientX: rect.left + rect.width * 0.25,
      clientY: rect.top + rect.height * 0.5,
    });
    await new Promise<void>(resolve => setTimeout(resolve, 100));
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
  parameters: { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } },
  play: async ({ canvasElement }) => {
    const wrapper = canvasElement.querySelector('.recharts-wrapper') as HTMLElement;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    await fireEvent.mouseMove(wrapper, {
      bubbles: true,
      clientX: rect.left + rect.width * 0.25,
      clientY: rect.top + rect.height * 0.5,
    });
    await new Promise<void>(resolve => setTimeout(resolve, 100));
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

export const NoUnit: Story = {
  name: 'No y-axis unit (tooltip shows no unit)',
  args: {
    ariaLabel: 'Idle time without unit',
    data: [
      { category: 'Light', min: 2, q1: 5, median: 9, q3: 15, max: 22 },
      { category: 'Heavy', min: 6, q1: 12, median: 18, q3: 26, max: 35 },
    ],
    height: 280,
  },
  parameters: { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } },
  play: async ({ canvasElement }) => {
    const wrapper = canvasElement.querySelector('.recharts-wrapper') as HTMLElement;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    await fireEvent.mouseMove(wrapper, {
      bubbles: true,
      clientX: rect.left + rect.width * 0.25,
      clientY: rect.top + rect.height * 0.5,
    });
    await new Promise<void>(resolve => setTimeout(resolve, 100));
  },
};

export const WithDomain: Story = {
  name: 'With explicit y-axis domain',
  args: {
    ariaLabel: 'Idle time with fixed domain',
    data: [
      { category: 'Light', min: 2, q1: 5, median: 9, q3: 15, max: 22 },
    ],
    yAxis: { domain: [0, 40] },
    height: 280,
  },
};

export const DefaultHeight: Story = {
  name: 'Default height (no height prop)',
  args: {
    ariaLabel: 'Idle time default height',
    data: [
      { category: 'Light', min: 2, q1: 5, median: 9, q3: 15, max: 22 },
    ],
  },
};

export const UniformValues: Story = {
  name: 'All values equal (padding fallback)',
  args: {
    ariaLabel: 'Uniform distribution',
    data: [
      { category: 'Fleet', min: 10, q1: 10, median: 10, q3: 10, max: 10 },
    ],
    height: 280,
  },
};

export const InvariantViolation: Story = {
  name: 'Invariant violation (triggers console.warn in DEV)',
  args: {
    ariaLabel: 'Data with violated ordering invariant',
    data: [
      { category: 'Bad', min: 20, q1: 10, median: 9, q3: 15, max: 22 },
    ],
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
