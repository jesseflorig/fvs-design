import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ControlTile } from './ControlTile';
import {
  entrySensorProps,
  kitchenLightProps,
  sceneTileProps,
  transitioningShadesProps,
  unavailableCameraProps,
} from '../fixtures/controlTileExamples';

const meta: Meta<typeof ControlTile> = {
  title: 'Components/ControlTiles/ControlTile',
  component: ControlTile,
  tags: ['autodocs'],
  argTypes: {
    controlKind: { control: 'select', options: ['toggle', 'scene', 'summary'] },
    state: { control: 'select', options: ['off', 'on', 'transitioning', 'warning', 'unavailable'] },
    interactive: { control: 'boolean' },
    disabled: { control: 'boolean' },
    selected: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--s-7)', background: 'var(--bg)', maxWidth: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ControlTile>;

export const MinimalToggle: Story = {
  args: kitchenLightProps,
};

export const SummaryWarning: Story = {
  args: entrySensorProps,
};

export const MinimalScene: Story = {
  args: sceneTileProps,
};

export const TransitioningToggle: Story = {
  args: transitioningShadesProps,
};

export const UnavailableToggle: Story = {
  args: unavailableCameraProps,
};

export const StateGallery: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 'var(--fvs-control-tile-gap-default)',
      }}
    >
      <ControlTile {...kitchenLightProps} />
      <ControlTile {...entrySensorProps} />
      <ControlTile {...transitioningShadesProps} />
      <ControlTile {...unavailableCameraProps} />
    </div>
  ),
};
