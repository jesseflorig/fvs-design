import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta = {
  title: 'Brand/Logo',
  parameters: { controls: { disable: true } },
};
export default meta;

export const OnLight: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--fvs-paper)', padding: 48, display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>Logotype</div>
        <img src="/src/assets/svg/logo.svg" alt="Fleet Van Systems logotype" style={{ height: 48 }} />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>Mark</div>
        <img src="/src/assets/svg/mark.svg" alt="Fleet Van Systems mark" style={{ height: 48 }} />
      </div>
    </div>
  ),
};

export const OnDark: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--fvs-black)', padding: 48, display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6A6A72', marginBottom: 16 }}>Logotype</div>
        <img src="/src/assets/svg/logo.svg" alt="Fleet Van Systems logotype" style={{ height: 48 }} />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6A6A72', marginBottom: 16 }}>Mark</div>
        <img src="/src/assets/svg/mark.svg" alt="Fleet Van Systems mark" style={{ height: 48 }} />
      </div>
    </div>
  ),
};

export const Favicon: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, display: 'flex', gap: 32, alignItems: 'flex-end' }}>
      {[32, 64].map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <img src="/src/assets/svg/favicon.svg" alt="FVS favicon" style={{ width: size, height: size }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-muted)' }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};

export const VanBlueprint: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>
        Blueprint — placeholder for editorial / instruction imagery
      </div>
      <img src="/src/assets/svg/van-blueprint.svg" alt="FVS van blueprint" style={{ width: '100%', maxWidth: 800 }} />
    </div>
  ),
};
