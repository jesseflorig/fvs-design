import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import { resolveToken } from '../../lib/resolve-token';

const meta: Meta = {
  title: 'Tokens/Colors',
  parameters: { controls: { disable: true } },
};
export default meta;

interface SwatchProps {
  name: string;
  value: string;
  role?: string;
}

function Swatch({ name, value, role }: SwatchProps) {
  const [resolved, setResolved] = useState('');
  useEffect(() => {
    if (value.startsWith('var(')) {
      setResolved(resolveToken(value.slice(4, -1)));
    } else {
      setResolved(value);
    }
  }, [value]);

  const isLight = resolved && (
    resolved === '#FBFAF7' || resolved === '#F2F1EE' || resolved === '#E4E4E2' ||
    resolved === '#C4C4CB'
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: 160 }}>
      <div
        style={{
          width: '100%',
          height: 48,
          background: value,
          border: '1px solid var(--line)',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {resolved && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            letterSpacing: '0.06em',
            color: isLight ? 'var(--fvs-ink)' : 'var(--fvs-paper)',
            opacity: 0.7,
          }}>
            {resolved}
          </span>
        )}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg)', lineHeight: 1.4 }}>
        {name}
      </div>
      {role && (
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--fg-muted)', lineHeight: 1.4 }}>
          {role}
        </div>
      )}
    </div>
  );
}

function SwatchGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, padding: 24, background: 'var(--bg)' }}>
      {children}
    </div>
  );
}

export const NeutralScale: StoryObj = {
  render: () => (
    <SwatchGrid>
      <Swatch name="--fvs-black"   value="#0A0A0B"  role="near-black — chrome, console" />
      <Swatch name="--fvs-ink"     value="#151517"  role="primary ink on light" />
      <Swatch name="--fvs-graphite"value="#2A2A2E"  role="secondary dark surface" />
      <Swatch name="--fvs-slate"   value="#4A4A52"  role="body copy on light" />
      <Swatch name="--fvs-steel"   value="#8A8A93"  role="tertiary / muted labels" />
      <Swatch name="--fvs-fog"     value="#C4C4CB"  role="hairlines, dividers on light" />
      <Swatch name="--fvs-bone"    value="#E4E4E2"  role="subtle fills, rails" />
      <Swatch name="--fvs-paper"   value="#F2F1EE"  role="primary light background" />
      <Swatch name="--fvs-white"   value="#FBFAF7"  role="cards / elevated on light" />
    </SwatchGrid>
  ),
};

export const SignalSemantic: StoryObj = {
  render: () => (
    <SwatchGrid>
      <Swatch name="--fvs-amber"    value="#E8A33D" role="accent — live / active state" />
      <Swatch name="--fvs-amber-dim"value="#8A5E1F" role="amber on dark surfaces" />
      <Swatch name="--fvs-green"    value="#4DA35A" role="nominal / ok" />
      <Swatch name="--fvs-red"      value="#C8402C" role="alert / fault" />
      <Swatch name="--fvs-blue"     value="#3A6EA8" role="informational" />
    </SwatchGrid>
  ),
};

export const RoleTokensLight: StoryObj = {
  render: () => (
    <SwatchGrid>
      <Swatch name="--bg"          value="var(--bg)"          role="page background" />
      <Swatch name="--bg-elevated" value="var(--bg-elevated)" role="cards, elevated surfaces" />
      <Swatch name="--bg-inset"    value="var(--bg-inset)"    role="inset / secondary fills" />
      <Swatch name="--fg"          value="var(--fg)"          role="primary text" />
      <Swatch name="--fg-muted"    value="var(--fg-muted)"    role="secondary text" />
      <Swatch name="--fg-subtle"   value="var(--fg-subtle)"   role="tertiary / disabled text" />
      <Swatch name="--fg-inverse"  value="var(--fg-inverse)"  role="text on dark surfaces" />
      <Swatch name="--line"        value="var(--line)"        role="standard hairline border" />
      <Swatch name="--line-strong" value="var(--line-strong)" role="strong border / divider" />
      <Swatch name="--accent"      value="var(--accent)"      role="active / focus / live" />
      <Swatch name="--nominal"     value="var(--nominal)"     role="ok state" />
      <Swatch name="--alert"       value="var(--alert)"       role="fault / error state" />
    </SwatchGrid>
  ),
};

export const RoleTokensConsole: StoryObj = {
  decorators: [
    (Story) => (
      <div data-theme="console">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <SwatchGrid>
      <Swatch name="--bg"          value="var(--bg)"          role="console background" />
      <Swatch name="--bg-elevated" value="var(--bg-elevated)" role="panel surface" />
      <Swatch name="--bg-inset"    value="var(--bg-inset)"    role="inset surface" />
      <Swatch name="--fg"          value="var(--fg)"          role="primary text" />
      <Swatch name="--fg-muted"    value="var(--fg-muted)"    role="secondary text" />
      <Swatch name="--fg-subtle"   value="var(--fg-subtle)"   role="tertiary text" />
      <Swatch name="--line"        value="var(--line)"        role="border" />
      <Swatch name="--line-strong" value="var(--line-strong)" role="strong border" />
      <Swatch name="--accent"      value="var(--accent)"      role="amber — unchanged in console" />
    </SwatchGrid>
  ),
};
