import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { userEvent, within } from 'storybook/test';
import { Input, Select, Toggle, Checkbox } from './Input';

const meta: Meta = {
  title: 'Components/Input',
  tags: ['autodocs'],
  parameters: { controls: { disable: true } },
};
export default meta;

export const TextField: StoryObj = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox');
    await userEvent.click(input);
    await userEvent.tab();
  },
  render: () => {
    const [v, setV] = useState('FVS-0417-Alpha');
    return (
      <div style={{ padding: 24, background: 'var(--bg)', maxWidth: 280 }}>
        <Input
          label="Van identifier"
          value={v}
          hint="Immutable · set at provision"
          onChange={e => setV(e.target.value)}
        />
      </div>
    );
  },
};

export const WithError: StoryObj = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox');
    await userEvent.click(input);
    await userEvent.tab();
  },
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', maxWidth: 280 }}>
      <Input
        label="Van identifier"
        value="FVS-9999"
        error="Identifier not found in registry"
      />
    </div>
  ),
};

export const Disabled: StoryObj = {
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', maxWidth: 280 }}>
      <Input
        label="Van identifier"
        value="FVS-0417-Alpha"
        hint="Read-only — contact ops to change"
        disabled
      />
    </div>
  ),
};

export const SelectField: StoryObj = {
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByRole('combobox');
    await userEvent.click(select);
    await userEvent.tab();
  },
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', maxWidth: 280 }}>
      <Select
        label="Climate preset"
        options={[
          { value: 'overnight', label: 'Overnight · 18°C' },
          { value: 'day',       label: 'Day · 21°C' },
          { value: 'standby',   label: 'Standby · off' },
        ]}
      />
    </div>
  ),
};

export const ToggleField: StoryObj = {
  play: async ({ canvasElement }) => {
    const switches = within(canvasElement).getAllByRole('switch');
    const toggle = switches[0] as HTMLElement;
    toggle.focus();
    await userEvent.click(toggle);
    toggle.blur();
  },
  render: () => {
    const [armed, setArmed] = useState(true);
    const [standby, setStandby] = useState(false);
    return (
      <div style={{ padding: 24, background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Toggle label="Perimeter arming" checked={armed}   onLabel="Armed"   offLabel="Disarmed" onChange={setArmed} />
        <Toggle label="Motion alerts"    checked={standby} onLabel="Active"  offLabel="Standby"  onChange={setStandby} />
      </div>
    );
  },
};

export const CheckboxField: StoryObj = {
  play: async ({ canvasElement }) => {
    const checkboxes = within(canvasElement).getAllByRole('checkbox');
    const checkbox = checkboxes[0] as HTMLElement;
    checkbox.focus();
    await userEvent.click(checkbox);
    checkbox.blur();
  },
  render: () => {
    const [a, setA] = useState(true);
    const [b, setB] = useState(false);
    return (
      <div style={{ padding: 24, background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Checkbox label="Auto-engage at 10%" checked={a} onChange={setA} />
        <Checkbox label="Push to mobile"     checked={b} onChange={setB} />
      </div>
    );
  },
};

export const DisabledToggle: StoryObj = {
  name: 'Disabled Toggle',
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Toggle label="Perimeter arming" checked={true}  onLabel="Armed"   offLabel="Disarmed" disabled />
      <Toggle label="Motion alerts"    checked={false} disabled />
    </div>
  ),
};

export const PlainInput: StoryObj = {
  name: 'Plain Input (no hint or error)',
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', maxWidth: 280 }}>
      <Input label="Van identifier" value="FVS-0417" />
    </div>
  ),
};

export const DisabledCheckbox: StoryObj = {
  name: 'Disabled Checkbox',
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Checkbox label="Auto-engage at 10%" checked={true}  disabled />
      <Checkbox label="Push to mobile"     checked={false} disabled />
    </div>
  ),
};

export const SelectWithError: StoryObj = {
  name: 'Select with error',
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByRole('combobox');
    await userEvent.click(select);
    await userEvent.tab();
  },
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', maxWidth: 280 }}>
      <Select
        label="Climate preset"
        error="Invalid preset selected"
        options={[
          { value: 'overnight', label: 'Overnight · 18°C' },
          { value: 'day',       label: 'Day · 21°C' },
        ]}
      />
    </div>
  ),
};

export const DisabledSelect: StoryObj = {
  name: 'Disabled Select',
  render: () => (
    <div style={{ padding: 24, background: 'var(--bg)', maxWidth: 280 }}>
      <Select
        label="Climate preset"
        hint="Locked — contact ops to change"
        disabled
        options={[
          { value: 'overnight', label: 'Overnight · 18°C' },
          { value: 'day',       label: 'Day · 21°C' },
        ]}
      />
    </div>
  ),
};
