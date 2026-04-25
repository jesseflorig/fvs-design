import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { SankeyChart } from './SankeyChart';

const meta: Meta<typeof SankeyChart> = {
  title: 'Components/Charts/SankeyChart',
  component: SankeyChart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof SankeyChart>;

// Fleet energy flow: source → conversion → use
const energyNodes = [
  { name: 'Grid' },
  { name: 'Solar' },
  { name: 'Charger A' },
  { name: 'Charger B' },
  { name: 'Van 01' },
  { name: 'Van 02' },
  { name: 'Van 03' },
  { name: 'Idle Loss' },
];

const energyLinks = [
  { source: 0, target: 2, value: 420 },
  { source: 1, target: 2, value: 180 },
  { source: 1, target: 3, value: 90 },
  { source: 0, target: 3, value: 160 },
  { source: 2, target: 4, value: 310 },
  { source: 2, target: 5, value: 250 },
  { source: 3, target: 5, value: 90 },
  { source: 3, target: 6, value: 110 },
  { source: 2, target: 7, value: 40 },
  { source: 3, target: 7, value: 50 },
];

export const EnergyFlow: Story = {
  args: {
    ariaLabel: 'Fleet energy flow from sources through chargers to vehicles',
    nodes: energyNodes,
    links: energyLinks,
    height: 340,
  },
};

// Trip stages: origin → route type → destination
const tripNodes = [
  { name: 'Depot' },
  { name: 'Highway' },
  { name: 'Urban' },
  { name: 'Site A' },
  { name: 'Site B' },
  { name: 'Site C' },
];

const tripLinks = [
  { source: 0, target: 1, value: 14 },
  { source: 0, target: 2, value: 8 },
  { source: 1, target: 3, value: 6 },
  { source: 1, target: 4, value: 5 },
  { source: 1, target: 5, value: 3 },
  { source: 2, target: 3, value: 4 },
  { source: 2, target: 5, value: 4 },
];

export const TripRouting: Story = {
  args: {
    ariaLabel: 'Trip routing from depot through route types to destinations',
    nodes: tripNodes,
    links: tripLinks,
    height: 280,
  },
};

export const CustomColors: Story = {
  args: {
    ariaLabel: 'Energy flow with custom color palette',
    nodes: energyNodes,
    links: energyLinks,
    colors: ['--fvs-blue', '--fvs-green', '--fvs-steel'],
    height: 340,
  },
};

export const NarrowNodes: Story = {
  args: {
    ariaLabel: 'Energy flow with narrow nodes',
    nodes: energyNodes,
    links: energyLinks,
    nodeWidth: 6,
    nodePadding: 14,
    height: 300,
  },
};

export const Empty: Story = {
  args: {
    ariaLabel: 'No flow data available',
    nodes: [],
    links: [],
    height: 280,
  },
};
