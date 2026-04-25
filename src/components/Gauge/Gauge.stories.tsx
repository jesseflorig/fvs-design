import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Gauge } from './Gauge';

const meta: Meta<typeof Gauge> = {
  title: 'Components/Gauge',
  component: Gauge,
  tags: ['autodocs'],
  argTypes: {
    status: { control: 'select', options: ['nominal', 'live', 'fault', 'info', 'offline', 'neutral'] },
    size:   { control: 'select', options: ['sm', 'md', 'lg'] },
    value:  { control: { type: 'range', min: -200, max: 200 } },
    min:    { control: 'number' },
    max:    { control: 'number' },
    unit:   { control: 'text' },
    label:  { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Gauge>;

// ─── US1: Arc fill proportion ───────────────────────────────────────────────

export const Default: Story = {
  args: { value: 50 },
};

export const Empty: Story = {
  args: { value: 0 },
};

export const Full: Story = {
  args: { value: 100 },
};

export const Clamped: Story = {
  name: 'Clamped (value > max)',
  args: { value: 150 },
};

export const ClampedBelow: Story = {
  name: 'Clamped (value < min)',
  args: { value: -10 },
};

export const AllBoundaries: Story = {
  name: 'All Boundaries',
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24, background: 'var(--bg)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
      <Gauge value={0}   label="Empty"   unit="%" />
      <Gauge value={25}  label="Quarter" unit="%" />
      <Gauge value={50}  label="Half"    unit="%" />
      <Gauge value={75}  label="Three-Q" unit="%" />
      <Gauge value={100} label="Full"    unit="%" />
    </div>
  ),
};

// ─── US2: Semantic status coloring ──────────────────────────────────────────

export const AllStatuses: Story = {
  name: 'All Statuses',
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24, background: 'var(--bg)', flexWrap: 'wrap', alignItems: 'flex-end' }}>
      <Gauge value={80} status="nominal"  label="Nominal"  unit="%" />
      <Gauge value={65} status="live"     label="Live"     unit="MHz" />
      <Gauge value={22} status="fault"    label="Fault"    unit="°C" />
      <Gauge value={44} status="info"     label="Info" />
      <Gauge value={0}  status="offline"  label="Offline" />
      <Gauge value={55} status="neutral"  label="Neutral"  unit="%" />
    </div>
  ),
};

export const StatusNominal: Story = {
  args: { value: 80, status: 'nominal', unit: '%' },
};

export const StatusLive: Story = {
  args: { value: 65, status: 'live', unit: 'MHz' },
};

export const StatusFault: Story = {
  args: { value: 22, status: 'fault', unit: '°C' },
};

export const StatusInfo: Story = {
  args: { value: 44, status: 'info' },
};

export const StatusOffline: Story = {
  args: { value: 0, status: 'offline' },
};

// ─── US3: Value label and unit display ──────────────────────────────────────

export const WithLabel: Story = {
  args: { value: 72, unit: '%', label: 'Battery', status: 'nominal' },
};

export const UnitOnly: Story = {
  name: 'Unit Only (no label)',
  args: { value: 42, unit: '%' },
};

export const NoUnit: Story = {
  name: 'No Unit',
  args: { value: 42 },
};

export const SmallSize: Story = {
  name: 'Small Size (sm)',
  args: { value: 60, size: 'sm' },
};

export const SmallSizeWithLabel: Story = {
  name: 'Small Size — label hidden',
  args: { value: 60, size: 'sm', unit: '%', label: 'Hidden label' },
};

export const LargeSize: Story = {
  name: 'Large Size (lg)',
  args: { value: 60, size: 'lg', unit: '%', label: 'Fuel Level', status: 'nominal' },
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: 32, padding: 24, background: 'var(--bg)', alignItems: 'flex-end' }}>
      <Gauge value={72} size="sm" unit="%" />
      <Gauge value={72} size="md" unit="%" label="Battery" status="nominal" />
      <Gauge value={72} size="lg" unit="%" label="Battery" status="nominal" />
    </div>
  ),
};

export const CustomRange: Story = {
  name: 'Custom Range (−50 to 50)',
  args: { value: 0, min: -50, max: 50, unit: '°C', label: 'Temp' },
};

export const LongLabel: Story = {
  name: 'Long Label (truncation)',
  args: { value: 55, unit: '%', label: 'Auxiliary Power Unit Output', size: 'md' },
};

export const NaNValue: Story = {
  name: 'NaN value (clamps to 0)',
  args: { value: NaN, label: 'Invalid', unit: '%' },
  parameters: {
    a11y: { disable: true },
  },
};
