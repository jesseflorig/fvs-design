import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const AllWeights: Story = {
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', maxWidth: 480 }}>
      {(['hair', 'standard', 'strong', 'double'] as const).map(w => (
        <div key={w}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-muted)', textTransform: 'uppercase', marginBottom: 0 }}>{w}</div>
          <Divider weight={w} />
        </div>
      ))}
    </div>
  ),
};
