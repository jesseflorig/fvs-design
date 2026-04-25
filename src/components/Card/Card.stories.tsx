import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { userEvent, within } from 'storybook/test';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Card>;

function BigStat({ value, unit, sub }: { value: string; unit: string; sub: string }) {
  return (
    <>
      <div style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', fontSize: 34, fontWeight: 500, lineHeight: 1, color: 'var(--fg)', letterSpacing: '-0.01em' }}>
        {value}<span style={{ fontSize: 18, color: 'var(--fg-muted)' }}>{unit}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', marginTop: 6 }}>{sub}</div>
      <div style={{ marginTop: 12, height: 6, background: 'var(--fvs-bone)', borderRadius: 1, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: 'var(--fvs-ink)', width: '94%' }} />
      </div>
    </>
  );
}

export const BatteryPanel: Story = {
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', maxWidth: 280 }}>
      <Card panelLabel="BATTERY · BUS A" statusBadge={{ status: 'nominal', label: 'Nominal' }}>
        <BigStat value="94" unit="%" sub="+12.48 V · 18.2 A · est 38h" />
      </Card>
    </div>
  ),
};

export const ClimatePanel: Story = {
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', maxWidth: 280 }}>
      <Card panelLabel="CLIMATE · CABIN" statusBadge={{ status: 'live', label: 'Live' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums', fontSize: 34, fontWeight: 500, lineHeight: 1, color: 'var(--fg)', letterSpacing: '-0.01em' }}>
          21.4<span style={{ fontSize: 18, color: 'var(--fg-muted)' }}>°C</span>
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', marginTop: 6 }}>Target 21.0 · Δ +0.4 · fan 24%</div>
        <div style={{ marginTop: 12, height: 6, background: 'var(--fvs-bone)', borderRadius: 1, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, background: 'var(--fvs-amber)', width: '60%' }} />
        </div>
      </Card>
    </div>
  ),
};

export const EmptyShell: Story = {
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', maxWidth: 280 }}>
      <Card panelLabel="SECTION LABEL" />
    </div>
  ),
};

export const WithHover: Story = {
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', maxWidth: 280 }}>
      <Card panelLabel="HOVER TO SEE SHADOW" hover>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg-muted)' }}>
          Hover this card to see shadow-1 elevation.
        </div>
      </Card>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const label = within(canvasElement).getByText('HOVER TO SEE SHADOW');
    const card = label.closest<HTMLElement>('div[style]') ?? (canvasElement.children[0] as HTMLElement);
    await userEvent.hover(card);
    await userEvent.unhover(card);
  },
};
