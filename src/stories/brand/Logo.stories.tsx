import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import LogoSvg from '@/assets/svg/logo.svg?react';
import MarkSvg from '@/assets/svg/mark.svg?react';
import FaviconSvg from '@/assets/svg/favicon.svg?react';

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
        <LogoSvg aria-label="Fleet Van Systems logotype" style={{ height: 48, color: 'var(--fvs-black)' }} />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>Mark</div>
        <MarkSvg aria-label="Fleet Van Systems mark" style={{ height: 48, color: 'var(--fvs-black)' }} />
      </div>
    </div>
  ),
};

export const OnDark: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--fvs-black)', padding: 48, display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'flex-start' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fvs-steel)', marginBottom: 16 }}>Logotype</div>
        <LogoSvg aria-label="Fleet Van Systems logotype" style={{ height: 48, color: 'var(--fvs-paper)' }} />
      </div>
      <div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fvs-steel)', marginBottom: 16 }}>Mark</div>
        <MarkSvg aria-label="Fleet Van Systems mark" style={{ height: 48, color: 'var(--fvs-paper)' }} />
      </div>
    </div>
  ),
};

export const Favicon: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, display: 'flex', gap: 32, alignItems: 'flex-end' }}>
      {[32, 64].map(size => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <FaviconSvg aria-label="FVS favicon" style={{ width: size, height: size, color: 'var(--fg)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-muted)' }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
};
