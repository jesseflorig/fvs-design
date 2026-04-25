import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ControlTileGrid } from './ControlTileGrid';
import { landscapeGridItems, partialRowGridItems, portraitGridItems } from '../fixtures/controlTileExamples';

const meta: Meta<typeof ControlTileGrid> = {
  title: 'Components/ControlTiles/ControlTileGrid',
  component: ControlTileGrid,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--s-7)', background: 'var(--bg)' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    orientation: { control: 'select', options: ['portrait', 'landscape'] },
    gap: { control: 'select', options: ['dense', 'default', 'loose'] },
    padding: { control: 'select', options: ['flush', 'default', 'roomy'] },
  },
};

export default meta;
type Story = StoryObj<typeof ControlTileGrid>;

export const LandscapeUniform: Story = {
  args: {
    orientation: 'landscape',
    items: landscapeGridItems,
    ariaLabel: 'Landscape uniform control tile grid',
  },
  render: (args) => (
    <div style={{ width: 1080 }}>
      <ControlTileGrid {...args} />
    </div>
  ),
};

export const PortraitUniform: Story = {
  args: {
    orientation: 'portrait',
    items: portraitGridItems,
    ariaLabel: 'Portrait uniform control tile grid',
  },
  render: (args) => (
    <div style={{ width: 620 }}>
      <ControlTileGrid {...args} />
    </div>
  ),
};

export const PartialRow: Story = {
  render: () => (
    <div style={{ width: 1080 }}>
      <ControlTileGrid orientation="landscape" items={partialRowGridItems} ariaLabel="Partial row uniform control tile grid" />
    </div>
  ),
};
