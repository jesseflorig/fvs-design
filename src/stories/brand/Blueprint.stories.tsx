import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Blueprint, type BlueprintSide } from '@/components/Blueprint';

const meta: Meta<typeof Blueprint> = {
  title: 'Brand/Blueprint',
  component: Blueprint,
  argTypes: {
    side: {
      control: 'select',
      options: ['passenger', 'driver', 'front', 'rear'] satisfies BlueprintSide[],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Blueprint>;

const label: Record<BlueprintSide, string> = {
  passenger: 'Passenger',
  driver: 'Driver',
  front: 'Front',
  rear: 'Rear',
};

export const Default: Story = {
  args: { side: 'driver' },
  render: (args) => (
    <div style={{ background: 'var(--bg)', padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>
        Blueprint — {label[args.side ?? 'driver']}
      </div>
      <Blueprint {...args} style={{ width: '100%', maxWidth: 800, color: 'var(--fg)' }} />
    </div>
  ),
};

export const AllSides: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, display: 'flex', flexDirection: 'column', gap: 40 }}>
      {(['driver', 'passenger', 'front', 'rear'] as BlueprintSide[]).map((side) => (
        <div key={side}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 12 }}>
            {label[side]}
          </div>
          <Blueprint side={side} style={{ width: '100%', maxWidth: 800, color: 'var(--fg)' }} />
        </div>
      ))}
    </div>
  ),
};
