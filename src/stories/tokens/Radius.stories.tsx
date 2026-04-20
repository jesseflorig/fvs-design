import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Tokens/Radius',
  parameters: { controls: { disable: true } },
};
export default meta;

const steps = [
  { token: '--r-0', px: '0px',   label: 'Data panels, buttons' },
  { token: '--r-1', px: '2px',   label: 'Badges, inputs' },
  { token: '--r-2', px: '4px',   label: 'Cards (default)' },
  { token: '--r-3', px: '6px',   label: 'Cards (large)' },
  { token: '--r-4', px: '8px',   label: 'Max — never exceed' },
];

export const RadiusScale: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {steps.map(({ token, px, label }) => (
        <div key={token} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 64,
            height: 64,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--line)',
            borderRadius: `var(${token})`,
          }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em', color: 'var(--fg)', lineHeight: 1.4 }}>
              {token}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-muted)' }}>
              {px}
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--fg-subtle)', marginTop: 2 }}>
              {label}
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};
