import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Brand/Voice',
  parameters: { controls: { disable: true } },
};
export default meta;

export const Guidelines: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, maxWidth: 720, fontFamily: 'var(--font-sans)', color: 'var(--fg)' }}>

      <section style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>Tone</div>
        <p style={{ fontSize: 'var(--t-body)', lineHeight: 'var(--lh-normal)', color: 'var(--fg)' }}>
          Technical, confident, understated. Writes like an engineer who respects your time. Never hype, never exclamation marks. Closer to a NASA flight manual or an IBM technical bulletin than a consumer-app welcome screen.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>Casing rules</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { rule: 'Headlines + UI', example: 'Battery state of charge', note: 'Sentence case' },
            { rule: 'System labels', example: 'NOMINAL · EXT TEMP °C · BUS A', note: 'UPPERCASE + mono + letter-spaced' },
            { rule: 'Status pills', example: 'FAULT · LIVE', note: 'UPPERCASE + mono' },
            { rule: 'Column headers', example: 'CHANNEL · READING · STATUS', note: 'UPPERCASE + mono' },
            { rule: 'Never', example: 'Battery State Of Charge', note: 'No title case anywhere' },
          ].map(({ rule, example, note }) => (
            <div key={rule} style={{ display: 'flex', gap: 16, padding: '9px 0', borderBottom: '1px solid var(--line)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', width: 140, flexShrink: 0 }}>{rule}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.02em', color: 'var(--fg)', flex: 1 }}>{example}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: 'var(--fg-subtle)', width: 200, flexShrink: 0 }}>{note}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>Good examples</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            '"Battery bank A nominal. SoC 94%. Last sync 00:42 UTC."',
            '"Arm perimeter. Confirm."',
            '"Engage climate preset: Overnight."',
            '"Off-grid, on-mission."',
          ].map(text => (
            <div key={text} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--nominal)', padding: '8px 12px', background: 'var(--bg)', borderLeft: '2px solid var(--nominal)', borderRadius: '0 2px 2px 0' }}>
              {text}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>Avoid</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            '"Your journey, amplified." — marketing-ese',
            '"Oops! Something went wrong" — wrong tone',
            '"Let\'s get you set up!" — too casual',
          ].map(text => (
            <div key={text} style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--alert)', padding: '8px 12px', background: 'var(--bg)', borderLeft: '2px solid var(--alert)', borderRadius: '0 2px 2px 0' }}>
              {text}
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>Operative verbs</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['monitor', 'engage', 'arm', 'isolate', 'acknowledge', 'synchronize', 'calibrate', 'reset', 'provision', 'confirm'].map(verb => (
            <span key={verb} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--fg)', border: '1px solid var(--line)', borderRadius: 'var(--r-1)', padding: '4px 8px' }}>
              {verb}
            </span>
          ))}
        </div>
      </section>

      <section>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>Numbers</div>
        <p style={{ fontSize: 'var(--t-body)', lineHeight: 'var(--lh-normal)', color: 'var(--fg)', marginBottom: 0 }}>
          Always monospaced. Always include units. Include sign where relevant: <span style={{ fontFamily: 'var(--font-mono)' }}>+12.4V</span>, <span style={{ fontFamily: 'var(--font-mono)' }}>−3°C</span>, <span style={{ fontFamily: 'var(--font-mono)' }}>94%</span>. Prefer precision over round numbers when data supports it.
        </p>
      </section>

    </div>
  ),
};
