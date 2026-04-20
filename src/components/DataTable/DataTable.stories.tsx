import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DataTable } from './DataTable';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof DataTable>;

export const TelemetryReadings: Story = {
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)' }}>
      <DataTable
        columns={[
          { key: 'channel', header: 'Channel' },
          { key: 'reading', header: 'Reading' },
          { key: 'delta',   header: 'Δ', align: 'right' },
          { key: 'status',  header: 'Status' },
          { key: 'sync',    header: 'Sync' },
        ]}
        rows={[
          { channel: 'BUS A · BATT', reading: '+12.48 V', delta: '+0.02', status: 'NOMINAL', sync: 'T−00:04' },
          { channel: 'BUS B · BATT', reading: '+11.82 V', delta: '−0.31', status: 'FAULT',   sync: 'T−00:04' },
          { channel: 'CABIN TEMP',   reading: '21.4 °C',  delta: '+0.4',  status: 'LIVE',    sync: 'T−00:00' },
          { channel: 'ARRAY · 400W', reading: '312 W',    delta: '+18',   status: 'NOMINAL', sync: 'T−00:04' },
        ]}
      />
    </div>
  ),
};

export const AllColumnAlignments: Story = {
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)' }}>
      <DataTable
        caption="Alignment demonstration"
        columns={[
          { key: 'label',  header: 'Label' },
          { key: 'value',  header: 'Value', align: 'right' },
          { key: 'delta',  header: 'Δ',     align: 'right' },
          { key: 'status', header: 'Status' },
        ]}
        rows={[
          { label: 'Solar array', value: '312 W',    delta: '+18',   status: 'NOMINAL' },
          { label: 'Battery A',   value: '+12.48 V', delta: '+0.02', status: 'NOMINAL' },
          { label: 'Battery B',   value: '+11.82 V', delta: '−0.31', status: 'FAULT'   },
        ]}
      />
    </div>
  ),
};
