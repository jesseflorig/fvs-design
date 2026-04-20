import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Input, Select, Toggle, Checkbox } from './Input';

const meta: Meta = {
  title: 'Components/Input',
  parameters: { controls: { disable: true } },
};
export default meta;

export const TextField: StoryObj = {
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
