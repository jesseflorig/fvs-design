import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { LightControlTile } from './LightControlTile';
import type { LightControlTileProps, LightWarmthLabel } from '../types';
import {
  dimmableLightProps,
  dimmerOnlyLightProps,
  effectivelyOffLightProps,
  fullCapabilityLightProps,
  nightModeLightProps,
  tunableWarmthLightProps,
  unavailableLightProps,
  updatingLightProps,
} from '../fixtures/lightControlTileExamples';

const LIGHT_TILE_PREVIEW_WIDTH = 260;

function warmthLabelFromValue(value: number): LightWarmthLabel {
  if (value < 10) return 'Cool White';
  if (value < 30) return 'Daylight';
  if (value < 50) return 'Neutral White';
  if (value < 70) return 'Soft White';
  if (value < 90) return 'Warm White';
  return 'Candlelight';
}

function InteractiveLightTile({ args }: { args: LightControlTileProps }) {
  const [brightness, setBrightness] = React.useState(args.brightness?.value ?? 0);
  const [warmth, setWarmth] = React.useState(args.warmth?.value ?? 50);
  const [nightMode, setNightMode] = React.useState(args.nightMode?.active ?? false);

  return (
    <LightControlTile
      {...args}
      brightness={args.brightness ? { ...args.brightness, value: brightness } : undefined}
      warmth={args.warmth ? { ...args.warmth, value: warmth, label: warmthLabelFromValue(warmth) } : undefined}
      nightMode={args.nightMode ? { ...args.nightMode, active: nightMode } : undefined}
      onBrightnessChange={args.status === 'unavailable' ? undefined : setBrightness}
      onWarmthChange={args.status === 'unavailable' ? undefined : setWarmth}
      onNightModeChange={args.status === 'unavailable' ? undefined : setNightMode}
    />
  );
}

const meta: Meta<typeof LightControlTile> = {
  title: 'Components/ControlTiles/LightControlTile',
  component: LightControlTile,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--s-7)', background: 'var(--bg)', maxWidth: LIGHT_TILE_PREVIEW_WIDTH }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Visible light or light-group name.',
    },
    subtitle: {
      control: 'text',
      description: 'Optional room, fixture, or last-update context.',
    },
    status: {
      control: 'select',
      options: ['available', 'updating', 'unavailable'],
      description: 'Availability state that controls status text and operability.',
    },
    capabilities: {
      control: 'object',
      description: 'Supported light capabilities: dimmer, warmth, and red LED night mode.',
    },
    brightness: {
      control: 'object',
      description: 'Dimmer value and bounds, displayed as a percentage.',
    },
    warmth: {
      control: 'object',
      description: 'Normalized warmth value and six-stop color temperature label.',
    },
    nightMode: {
      control: 'object',
      description: 'Red LED night mode active state and labels.',
    },
    updatingLabel: {
      control: 'text',
      description: 'Label used when status is updating.',
    },
    unavailableLabel: {
      control: 'text',
      description: 'Label used when status is unavailable.',
    },
    ariaLabel: {
      control: 'text',
      description: 'Optional accessible summary override for the tile.',
    },
    onBrightnessChange: {
      action: 'brightness changed',
      description: 'Called when the brightness slider changes.',
    },
    onWarmthChange: {
      action: 'warmth changed',
      description: 'Called when the warmth slider changes.',
    },
    onNightModeChange: {
      action: 'night mode changed',
      description: 'Called when the red LED night mode switch changes.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LightControlTile>;

export const Dimmable: Story = {
  args: dimmableLightProps,
  render: (args) => <InteractiveLightTile args={args} />,
};

export const EffectivelyOff: Story = {
  args: effectivelyOffLightProps,
  render: (args) => <InteractiveLightTile args={args} />,
};

export const TunableWarmth: Story = {
  args: tunableWarmthLightProps,
  render: (args) => <InteractiveLightTile args={args} />,
};

export const UnsupportedCapabilities: Story = {
  args: dimmerOnlyLightProps,
  render: (args) => <InteractiveLightTile args={args} />,
};

export const NightMode: Story = {
  args: nightModeLightProps,
  render: (args) => <InteractiveLightTile args={args} />,
};

export const FullCapability: Story = {
  args: fullCapabilityLightProps,
  render: (args) => <InteractiveLightTile args={args} />,
};

export const Updating: Story = {
  args: updatingLightProps,
  render: (args) => <InteractiveLightTile args={args} />,
};

export const Unavailable: Story = {
  args: unavailableLightProps,
  render: (args) => <InteractiveLightTile args={args} />,
};
