import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Brand/Typography',
  parameters: { controls: { disable: true } },
};
export default meta;

function SpecimenRow({ size, text, style }: { size: string; text: string; style: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '10px 0', borderBottom: '1px solid var(--line-hair)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-subtle)', width: 96, flexShrink: 0 }}>{size}</div>
      <div style={{ color: 'var(--fg)', ...style }}>{text}</div>
    </div>
  );
}

export const DisplaySpecimen: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>
        Space Mono — Display · Brand · Aerospace
      </div>
      {[
        { token: '--t-h4',      px: '20px' },
        { token: '--t-h3',      px: '26px' },
        { token: '--t-h2',      px: '34px' },
        { token: '--t-h1',      px: '44px' },
        { token: '--t-display', px: '64px' },
        { token: '--t-hero',    px: '88px' },
      ].map(({ token, px }) => (
        <SpecimenRow
          key={token}
          size={`${token} · ${px}`}
          text="FLEET VAN SYSTEMS"
          style={{ fontFamily: 'var(--font-display)', fontSize: `var(${token})`, fontWeight: 400, letterSpacing: '0.04em', textTransform: 'uppercase', lineHeight: 1.05 }}
        />
      ))}
    </div>
  ),
};

export const PlexSansSpecimen: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>
        IBM Plex Sans — UI · Body · Labels
      </div>
      {([300, 400, 500, 600, 700] as const).map(weight => (
        <div key={weight} style={{ padding: '8px 0', borderBottom: '1px solid var(--line-hair)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-subtle)', marginBottom: 4 }}>weight {weight}</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-body)', fontWeight: weight, color: 'var(--fg)' }}>
            Battery state of charge 94% — Off-grid, on-mission.
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-h3)', fontWeight: weight, color: 'var(--fg)', lineHeight: 1.2 }}>
            Fleet Van Systems
          </div>
        </div>
      ))}
    </div>
  ),
};

export const SpaceMonoSpecimen: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>
        Space Mono — Telemetry · Data · Labels
      </div>
      {[
        { size: '--t-tiny', label: '11px', weight: 400 },
        { size: '--t-small', label: '13px', weight: 400 },
        { size: '--t-body', label: '15px', weight: 400 },
        { size: '--t-body', label: '15px bold', weight: 700 },
      ].map(({ size, label, weight }) => (
        <SpecimenRow
          key={`${size}-${weight}`}
          size={`${size} · ${label}`}
          text="+12.48 V · 21.4 °C · NOMINAL · T−00:04"
          style={{ fontFamily: 'var(--font-mono)', fontSize: `var(${size})`, fontWeight: weight, letterSpacing: '0.02em' }}
        />
      ))}
    </div>
  ),
};

export const PlexSerifSpecimen: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>
        IBM Plex Serif — Editorial · Long-form · Callouts
      </div>
      {[
        { size: '--t-body-lg', label: '17px italic', weight: 400, italic: true },
        { size: '--t-body-lg', label: '17px 600', weight: 600, italic: false },
        { size: '--t-h3',      label: '26px italic', weight: 400, italic: true },
        { size: '--t-h3',      label: '26px 600', weight: 600, italic: false },
      ].map(({ size, label, weight, italic }) => (
        <SpecimenRow
          key={`${size}-${weight}-${italic}`}
          size={`${size} · ${label}`}
          text="Off-grid, on-mission."
          style={{ fontFamily: 'var(--font-serif)', fontSize: `var(${size})`, fontWeight: weight, fontStyle: italic ? 'italic' : 'normal' }}
        />
      ))}
    </div>
  ),
};
