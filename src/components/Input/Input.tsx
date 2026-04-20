import React, { useId } from 'react';

// ── Shared label/hint styles ──────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--fg-muted)',
};

const hintStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  color: 'var(--fg-subtle)',
};

const errorStyle: React.CSSProperties = {
  ...hintStyle,
  color: 'var(--alert)',
};

const fieldWrap: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

// ── Input ─────────────────────────────────────────────────────────────────────

export interface InputProps {
  label: string;
  type?: 'text' | 'number';
  value?: string;
  placeholder?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function Input({ label, type = 'text', value, placeholder, hint, error, disabled, onChange }: InputProps) {
  const [focused, setFocused] = React.useState(false);
  const id = useId();
  const hintId = useId();

  return (
    <div style={fieldWrap}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        aria-describedby={hint || error ? hintId : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          lineHeight: '18px',
          color: 'var(--fg)',
          background: 'var(--fvs-white)',
          border: `1px solid ${error ? 'var(--fvs-red)' : focused ? 'var(--fvs-ink)' : 'var(--line)'}`,
          borderRadius: 'var(--r-1)',
          padding: '8px 10px',
          outline: focused ? '2px solid var(--fvs-amber)' : '2px solid transparent',
          outlineOffset: 2,
          transition: 'border-color var(--dur-fast)',
          boxSizing: 'border-box',
          opacity: disabled ? 0.45 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />
      {(hint || error) && (
        <span id={hintId} style={error ? errorStyle : hintStyle}>{error ?? hint}</span>
      )}
    </div>
  );
}

// ── Select ────────────────────────────────────────────────────────────────────

export interface SelectProps {
  label: string;
  options: { value: string; label: string }[];
  value?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

export function Select({ label, options, value, hint, error, disabled, onChange }: SelectProps) {
  const [focused, setFocused] = React.useState(false);
  const id = useId();
  const hintId = useId();

  return (
    <div style={fieldWrap}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
        aria-describedby={hint || error ? hintId : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 13,
          color: 'var(--fg)',
          background: 'var(--fvs-white)',
          border: `1px solid ${focused ? 'var(--fvs-ink)' : 'var(--line)'}`,
          borderRadius: 'var(--r-1)',
          padding: '8px 10px',
          outline: focused ? '2px solid var(--fvs-amber)' : '2px solid transparent',
          outlineOffset: 2,
          opacity: disabled ? 0.45 : 1,
          cursor: disabled ? 'not-allowed' : 'default',
          boxSizing: 'border-box',
        }}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {(hint || error) && (
        <span id={hintId} style={error ? errorStyle : hintStyle}>{error ?? hint}</span>
      )}
    </div>
  );
}

// ── Toggle ────────────────────────────────────────────────────────────────────

export interface ToggleProps {
  label: string;
  checked: boolean;
  onLabel?: string;
  offLabel?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Toggle({ label, checked, onLabel = 'On', offLabel = 'Off', disabled, onChange }: ToggleProps) {
  const labelId = useId();

  return (
    <div style={fieldWrap}>
      <span id={labelId} style={labelStyle}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          role="switch"
          aria-checked={checked}
          aria-labelledby={labelId}
          disabled={disabled}
          onClick={() => onChange?.(!checked)}
          onFocus={(e) => {
            e.currentTarget.style.outline = '2px solid var(--fvs-amber)';
            e.currentTarget.style.outlineOffset = '2px';
          }}
          onBlur={(e) => { e.currentTarget.style.outline = '2px solid transparent'; }}
          style={{
            position: 'relative',
            width: 44,
            height: 22,
            background: checked ? 'var(--fvs-ink)' : 'var(--fvs-white)',
            border: `1px solid ${checked ? 'var(--fvs-ink)' : 'var(--line-strong)'}`,
            borderRadius: 'var(--r-1)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            padding: 0,
            outline: '2px solid transparent',
            outlineOffset: '2px',
            transition: 'background var(--dur-fast), border-color var(--dur-fast)',
            flexShrink: 0,
            opacity: disabled ? 0.45 : 1,
          }}
        >
          <span style={{
            position: 'absolute',
            top: 2,
            left: checked ? 22 : 2,
            width: 18,
            height: 16,
            background: checked ? 'var(--fvs-amber)' : 'var(--fg-subtle)',
            borderRadius: 1,
            transition: 'left var(--dur-fast) var(--ease-std), background var(--dur-fast)',
          }} />
        </button>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: checked ? 'var(--live)' : 'var(--fg-subtle)',
        }}>
          {checked ? onLabel : offLabel}
        </span>
      </div>
    </div>
  );
}

// ── Checkbox ──────────────────────────────────────────────────────────────────

export interface CheckboxProps {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Checkbox({ label, checked, disabled, onChange }: CheckboxProps) {
  const labelId = useId();

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button
        role="checkbox"
        aria-checked={checked}
        aria-labelledby={labelId}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid var(--fvs-amber)';
          e.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(e) => { e.currentTarget.style.outline = '2px solid transparent'; }}
        style={{
          width: 16,
          height: 16,
          border: `1px solid ${checked ? 'var(--fvs-ink)' : 'var(--line-strong)'}`,
          borderRadius: 'var(--r-1)',
          background: checked ? 'var(--fvs-ink)' : 'var(--fvs-white)',
          color: 'var(--fvs-paper)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          padding: 0,
          outline: '2px solid transparent',
          outlineOffset: '2px',
          flexShrink: 0,
          opacity: disabled ? 0.45 : 1,
          fontSize: 11,
          fontWeight: 700,
        }}
      >
        {checked ? '✓' : ''}
      </button>
      <span id={labelId} style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--fg)' }}>
        {label}
      </span>
    </div>
  );
}
