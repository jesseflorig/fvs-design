import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  BatteryCharging, Battery, Thermometer, Zap, Wifi, WifiOff,
  Lock, Unlock, Shield, AlertTriangle, CheckCircle, XCircle,
  Activity, Gauge, MapPin, RefreshCw, Settings, Power, Signal, Clock,
} from 'lucide-react';

const meta: Meta = {
  title: 'Brand/Iconography',
  parameters: { controls: { disable: true } },
};
export default meta;

const icons = [
  { Icon: BatteryCharging, name: 'battery-charging' },
  { Icon: Battery,         name: 'battery' },
  { Icon: Thermometer,     name: 'thermometer' },
  { Icon: Zap,             name: 'zap' },
  { Icon: Wifi,            name: 'wifi' },
  { Icon: WifiOff,         name: 'wifi-off' },
  { Icon: Lock,            name: 'lock' },
  { Icon: Unlock,          name: 'unlock' },
  { Icon: Shield,          name: 'shield' },
  { Icon: AlertTriangle,   name: 'alert-triangle' },
  { Icon: CheckCircle,     name: 'check-circle' },
  { Icon: XCircle,         name: 'x-circle' },
  { Icon: Activity,        name: 'activity' },
  { Icon: Gauge,           name: 'gauge' },
  { Icon: MapPin,          name: 'map-pin' },
  { Icon: RefreshCw,       name: 'refresh-cw' },
  { Icon: Settings,        name: 'settings' },
  { Icon: Power,           name: 'power' },
  { Icon: Signal,          name: 'signal' },
  { Icon: Clock,           name: 'clock' },
];

const sizes = [14, 16, 20, 24] as const;

export const UsageRules: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24, maxWidth: 640 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 24 }}>
        Iconography rules
      </div>
      {[
        { rule: 'Library', value: 'Lucide React (MIT) — stroke-only, never filled' },
        { rule: 'Stroke weight', value: '1.5px — matches instrumentation aesthetic' },
        { rule: 'Color', value: 'Inherit currentColor — never hardcoded. Amber only inside active telemetry panel.' },
        { rule: 'Sizes', value: '14px inline with text · 16px buttons · 20px nav · 24px section headers' },
        { rule: 'Max size', value: '24px in product UI — never larger' },
        { rule: 'No emoji', value: 'No emoji or unicode dingbats anywhere in the product' },
      ].map(({ rule, value }) => (
        <div key={rule} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--fg-muted)', width: 120, flexShrink: 0 }}>{rule}</div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg)', lineHeight: 1.5 }}>{value}</div>
        </div>
      ))}
    </div>
  ),
};

export const CuratedSet: StoryObj = {
  render: () => (
    <div style={{ background: 'var(--bg)', padding: 24 }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--fg-muted)', marginBottom: 16 }}>
        Curated domain icons — 4 sizes (14 · 16 · 20 · 24px)
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 0 }}>
        {/* Header row */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-subtle)', padding: '6px 16px 6px 0', borderBottom: '1px solid var(--line-strong)' }}>Icon</div>
        <div style={{ display: 'flex', gap: 32, borderBottom: '1px solid var(--line-strong)', padding: '6px 0' }}>
          {sizes.map(s => (
            <div key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-subtle)', width: 32, textAlign: 'center' }}>{s}px</div>
          ))}
        </div>
        {/* Icon rows */}
        {icons.map(({ Icon, name }) => (
          <React.Fragment key={name}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-muted)', padding: '10px 16px 10px 0', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center' }}>
              {name}
            </div>
            <div style={{ display: 'flex', gap: 32, borderBottom: '1px solid var(--line)', padding: '10px 0', alignItems: 'center' }}>
              {sizes.map(s => (
                <div key={s} style={{ width: 32, display: 'flex', justifyContent: 'center', color: 'var(--fg)' }}>
                  <Icon size={s} strokeWidth={1.5} />
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  ),
};
