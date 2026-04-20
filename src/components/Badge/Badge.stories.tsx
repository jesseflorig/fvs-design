import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    status:  { control: 'select', options: ['nominal', 'live', 'fault', 'info', 'offline', 'neutral'] },
    showDot: { control: 'boolean' },
    solid:   { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, padding: 24, background: 'var(--bg)' }}>
      <Badge status="nominal"  label="Nominal" />
      <Badge status="live"     label="Live · T−00:04" />
      <Badge status="fault"    label="Fault · Bus B" />
      <Badge status="info"     label="Sync" />
      <Badge status="offline"  label="Offline" />
      <Badge status="neutral"  label="94%" showDot={false} />
    </div>
  ),
};

export const Nominal: Story = {
  args: { status: 'nominal', label: 'Nominal', showDot: true, solid: false },
};

export const Live: Story = {
  args: { status: 'live', label: 'Live · T−00:04', showDot: true },
};

export const Fault: Story = {
  args: { status: 'fault', label: 'Fault · Bus B', showDot: true },
};

export const SolidVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 10, padding: 24, background: 'var(--bg)' }}>
      <Badge status="neutral" label="v2.41.0" showDot={false} solid />
      <Badge status="live"    label="ARM"     showDot={false} solid />
    </div>
  ),
};
