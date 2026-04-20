import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    value:        { control: 'number' },
    defaultValue: { control: 'number' },
    min:          { control: 'number' },
    max:          { control: 'number' },
    step:         { control: 'number' },
    disabled:     { control: 'boolean' },
    showValue:    { control: 'boolean' },
    unit:         { control: 'text' },
    label:        { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof Slider>;

// ─── US1: Pointer drag / click ───────────────────────────────────────────────

export const Default: Story = {
  args: { defaultValue: 50 },
};

export const MinValue: Story = {
  args: { defaultValue: 0 },
};

export const MaxValue: Story = {
  args: { defaultValue: 100 },
};

// ─── US2: Keyboard navigation ────────────────────────────────────────────────

export const KeyboardNav: Story = {
  name: 'Keyboard Navigation (tab in, use arrow keys)',
  args: { defaultValue: 50, label: 'Volume', step: 5, showValue: true },
};

export const Disabled: Story = {
  args: { value: 60, disabled: true, label: 'Locked', unit: '%', showValue: true },
};

// ─── US3: Value label and unit ───────────────────────────────────────────────

export const WithValueDisplay: Story = {
  args: { defaultValue: 72, showValue: true, unit: '%', label: 'Battery' },
};

export const UnitOnly: Story = {
  name: 'Value + Unit (no field label)',
  args: { defaultValue: 42, showValue: true, unit: '%' },
};

export const NoUnit: Story = {
  name: 'Value Only (no unit)',
  args: { defaultValue: 42, showValue: true },
};

export const NoValueDisplay: Story = {
  name: 'No Value Label',
  args: { defaultValue: 50 },
};

// ─── Polish: Additional variants ─────────────────────────────────────────────

export const WithLabel: Story = {
  args: { defaultValue: 50, label: 'Threshold' },
};

export const StepTen: Story = {
  args: { defaultValue: 50, step: 10, showValue: true, label: 'Volume' },
};

export const CustomRange: Story = {
  name: 'Custom Range (−50 to 50)',
  args: {
    defaultValue: 0,
    min: -50,
    max: 50,
    step: 5,
    unit: '°C',
    showValue: true,
    label: 'Offset',
  },
};

export const FractionalStep: Story = {
  name: 'Fractional Step (0.1)',
  args: { defaultValue: 0.5, min: 0, max: 1, step: 0.1, showValue: true },
};

export const Controlled: Story = {
  name: 'Controlled (external state)',
  render: () => {
    const [v, setV] = useState(25);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24, background: 'var(--bg)' }}>
        <Slider
          value={v}
          onChange={setV}
          min={0}
          max={200}
          step={5}
          label="Offset"
          unit="ms"
          showValue
        />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)' }}>
          External value: {v} ms
        </span>
      </div>
    );
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 24, background: 'var(--bg)', maxWidth: 320 }}>
      <Slider defaultValue={50} label="Default" />
      <Slider defaultValue={72} label="With Value" showValue unit="%" />
      <Slider defaultValue={50} step={10} label="Step 10" showValue />
      <Slider value={60} disabled label="Disabled" showValue unit="%" />
      <Slider defaultValue={0} min={-50} max={50} label="Custom Range" showValue unit="°C" />
    </div>
  ),
};
