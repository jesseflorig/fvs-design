import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Histogram } from './Histogram';

const meta: Meta<typeof Histogram> = {
  title: 'Components/Charts/Histogram',
  component: Histogram,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Histogram>;

const preBucketed = [
  { label: '0–20', count: 5 },
  { label: '20–40', count: 18 },
  { label: '40–60', count: 34 },
  { label: '60–80', count: 22 },
  { label: '80–100', count: 9 },
];

const rawSpeeds = [
  12, 18, 24, 31, 35, 42, 47, 51, 55, 59, 63, 67, 71, 74, 78,
  82, 85, 88, 91, 93, 95, 97, 98, 56, 62, 68, 73, 79, 84, 90,
];

export const PreBucketed: Story = {
  args: {
    ariaLabel: 'Distribution of speeds across all trips',
    buckets: preBucketed,
    xAxis: { label: 'Speed', unit: 'km/h' },
    yAxis: { label: 'Frequency' },
    height: 280,
  },
};

export const RawValues: Story = {
  args: {
    ariaLabel: 'Speed distribution (auto-bucketed)',
    values: rawSpeeds,
    xAxis: { label: 'Speed', unit: 'km/h' },
    yAxis: { label: 'Count' },
    height: 280,
  },
};

export const CustomBins: Story = {
  args: {
    ariaLabel: 'Speed distribution with 5 bins',
    values: rawSpeeds,
    bins: 5,
    xAxis: { label: 'Speed', unit: 'km/h' },
    height: 280,
  },
};

export const EmptyValues: Story = {
  name: 'Empty raw values array',
  args: {
    ariaLabel: 'No raw values to bucket',
    values: [],
    height: 280,
  },
};

export const AllSameValues: Story = {
  name: 'All-identical values (single bucket)',
  args: {
    ariaLabel: 'All identical speed readings',
    values: [60, 60, 60, 60, 60],
    xAxis: { label: 'Speed', unit: 'km/h' },
    height: 280,
  },
};

export const Empty: Story = {
  args: {
    ariaLabel: 'No distribution data',
    buckets: [],
    height: 280,
  },
};

export const DefaultHeight: Story = {
  name: 'Default height (no height prop)',
  args: {
    ariaLabel: 'Speed distribution default height',
    buckets: preBucketed,
    xAxis: { label: 'Speed' },
  },
};

export const NoAxisLabels: Story = {
  name: 'No axis labels',
  args: {
    ariaLabel: 'Speed distribution no axis labels',
    buckets: preBucketed,
    height: 280,
  },
};


