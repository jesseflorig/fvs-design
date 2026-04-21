import React from 'react';

export interface EmptyChartProps {
  label: string;
  height: number;
}

export function EmptyChart({ label, height }: EmptyChartProps) {
  return (
    <div
      style={{
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid var(--line)',
        borderRadius: 'var(--r-1)',
        background: 'var(--bg-inset)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--fg-subtle)',
        }}
      >
        {label}
      </span>
    </div>
  );
}
