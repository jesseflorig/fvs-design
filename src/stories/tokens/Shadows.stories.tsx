import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Tokens/Shadows',
  parameters: { controls: { disable: true } },
};
export default meta;

const shadows = [
  { token: '--shadow-1',       label: 'Hover-raised list rows',            dark: false },
  { token: '--shadow-2',       label: 'Menus and popovers',                dark: false },
  { token: '--shadow-3',       label: 'Modal / dialog only',               dark: false },
  { token: '--shadow-inset',   label: 'Pressed controls — metal switch',   dark: false },
  { token: '--shadow-console', label: 'Active telemetry panel (amber glow)',dark: true  },
];

export const ShadowTiers: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 32, display: 'flex', flexWrap: 'wrap', gap: 24 }}>
      {shadows.map(({ token, label, dark }) => (
        <div
          key={token}
          style={{
            background: dark ? '#0A0A0B' : 'var(--bg-elevated)',
            borderRadius: 4,
            padding: '20px 24px',
            width: 200,
            boxShadow: `var(${token})`,
            border: '1px solid var(--line)',
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: dark ? '#E8E7E2' : 'var(--fg)',
            marginBottom: 6,
          }}>
            {token}
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: dark ? '#A8A8AE' : 'var(--fg-muted)' }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  ),
};
