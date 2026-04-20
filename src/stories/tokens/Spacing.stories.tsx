import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Tokens/Spacing',
  parameters: { controls: { disable: true } },
};
export default meta;

const steps = [
  { token: '--s-1',  px: '2px' },
  { token: '--s-2',  px: '4px' },
  { token: '--s-3',  px: '8px' },
  { token: '--s-4',  px: '12px' },
  { token: '--s-5',  px: '16px' },
  { token: '--s-6',  px: '20px' },
  { token: '--s-7',  px: '24px' },
  { token: '--s-8',  px: '32px' },
  { token: '--s-9',  px: '40px' },
  { token: '--s-10', px: '56px' },
  { token: '--s-11', px: '72px' },
  { token: '--s-12', px: '96px' },
];

export const SpacingScale: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
      {steps.map(({ token, px }) => (
        <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', color: 'var(--fg-muted)', width: 80, flexShrink: 0 }}>
            {token}<br />{px}
          </div>
          <div style={{
            height: 8,
            width: `var(${token})`,
            background: 'var(--fvs-amber)',
            borderRadius: 1,
            minWidth: 2,
          }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-subtle)' }}>
            {px}
          </div>
        </div>
      ))}
    </div>
  ),
};
