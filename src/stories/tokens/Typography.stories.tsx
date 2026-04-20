import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Tokens/Typography',
  parameters: { controls: { disable: true } },
};
export default meta;

const scaleSteps = [
  { token: '--t-micro',   px: '10px', label: 'MICRO — status pills, system labels' },
  { token: '--t-tiny',    px: '11px', label: 'TINY — dense table cells' },
  { token: '--t-small',   px: '13px', label: 'Small — default UI label / body-small' },
  { token: '--t-body',    px: '15px', label: 'Body — standard paragraph copy' },
  { token: '--t-body-lg', px: '17px', label: 'Body large — lead paragraph' },
  { token: '--t-h4',      px: '20px', label: 'H4 heading' },
  { token: '--t-h3',      px: '26px', label: 'H3 heading' },
  { token: '--t-h2',      px: '34px', label: 'H2 heading' },
  { token: '--t-h1',      px: '44px', label: 'H1 heading' },
  { token: '--t-display', px: '64px', label: 'Display' },
  { token: '--t-hero',    px: '88px', label: 'Hero' },
];

export const TypeScale: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {scaleSteps.map(({ token, px, label }) => (
        <div key={token} style={{ display: 'flex', alignItems: 'baseline', gap: 16, borderBottom: '1px solid var(--line-hair)', padding: '8px 0' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-subtle)', width: 80, flexShrink: 0 }}>
            {px}
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: `var(${token})`, lineHeight: 1.2, color: 'var(--fg)', fontWeight: 400 }}>
            Fleet Van Systems
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-muted)', marginLeft: 'auto', flexShrink: 0 }}>
            {token} · {label}
          </div>
        </div>
      ))}
    </div>
  ),
};

const lineHeights = [
  { token: '--lh-tight',  value: '1.05', sample: 'Mission complete.\nAll systems nominal.' },
  { token: '--lh-snug',   value: '1.2',  sample: 'Battery bank A nominal.\nSoC 94%.' },
  { token: '--lh-normal', value: '1.45', sample: 'Fleet Van Systems builds unified management platforms for modern smart campers.' },
  { token: '--lh-loose',  value: '1.6',  sample: 'Designed for reliability, visibility, and control wherever the road ends.' },
];

export const LineHeights: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {lineHeights.map(({ token, value, sample }) => (
        <div key={token} style={{ borderLeft: '2px solid var(--fvs-amber)', paddingLeft: 16 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', color: 'var(--fg-muted)', marginBottom: 8 }}>
            {token} · {value}
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--t-body)', lineHeight: `var(${token})`, color: 'var(--fg)', whiteSpace: 'pre-line' }}>
            {sample}
          </div>
        </div>
      ))}
    </div>
  ),
};

const trackingValues = [
  { token: '--tr-tight',  value: '-0.02em', label: 'DISPLAY HEADINGS' },
  { token: '--tr-label',  value: '0.12em',  label: 'PANEL LABELS · STATUS' },
  { token: '--tr-data',   value: '0.02em',  label: 'DATA · TELEMETRY' },
];

export const Tracking: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
      {trackingValues.map(({ token, value, label }) => (
        <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-muted)', width: 120, flexShrink: 0 }}>
            {token}<br />{value}
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--t-small)',
            letterSpacing: `var(${token})`,
            textTransform: 'uppercase',
            color: 'var(--fg)',
          }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const FontFamilies: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, display: 'flex', flexDirection: 'column', gap: 0 }}>
      {[
        { label: 'DISPLAY', family: 'var(--font-display)', text: 'FLEET VAN SYSTEMS', size: 'var(--t-h3)', extra: { letterSpacing: '0.04em', textTransform: 'uppercase' as const } },
        { label: 'SANS', family: 'var(--font-sans)', text: 'IBM Plex Sans — Battery state of charge 94%', size: 'var(--t-body)', extra: {} },
        { label: 'MONO', family: 'var(--font-mono)', text: 'Space Mono — +12.48 V · T−00:04 · NOMINAL', size: 'var(--t-body)', extra: { letterSpacing: '0.02em' } },
        { label: 'SERIF', family: 'var(--font-serif)', text: 'IBM Plex Serif — Off-grid, on-mission.', size: 'var(--t-body)', extra: { fontStyle: 'italic' as const } },
      ].map(({ label, family, text, size, extra }) => (
        <div key={label} style={{ padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--fg-muted)', marginBottom: 8 }}>
            {label}
          </div>
          <div style={{ fontFamily: family, fontSize: size, color: 'var(--fg)', ...extra }}>
            {text}
          </div>
        </div>
      ))}
    </div>
  ),
};
