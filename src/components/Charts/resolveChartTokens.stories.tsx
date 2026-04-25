import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { resolveChartToken, resolveChartTokenMap } from './resolveChartTokens';

const meta: Meta = {
  title: 'Components/Charts/ChartTokens',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
};
export default meta;

export const ResolvedTokens: StoryObj = {
  render: () => {
    const single = resolveChartToken('--fvs-amber');
    const map = resolveChartTokenMap({
      primary: '--fvs-amber',
      muted: '--fg-muted',
    });
    return (
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, padding: 24, background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div>resolveChartToken(&apos;--fvs-amber&apos;): <strong>{single || '(empty in test env)'}</strong></div>
        {Object.entries(map).map(([k, v]) => (
          <div key={k}>{k}: <strong>{v || '(empty in test env)'}</strong></div>
        ))}
      </div>
    );
  },
};
