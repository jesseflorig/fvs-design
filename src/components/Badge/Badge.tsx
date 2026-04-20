import React from 'react';

export type BadgeStatus = 'nominal' | 'live' | 'fault' | 'info' | 'offline' | 'neutral';

export interface BadgeProps {
  status?: BadgeStatus;
  label: string;
  showDot?: boolean;
  solid?: boolean;
}

const statusColors: Record<BadgeStatus, string> = {
  nominal: 'var(--fvs-green)',
  live:    'var(--fvs-amber)',
  fault:   'var(--fvs-red)',
  info:    'var(--fvs-blue)',
  offline: 'var(--fvs-steel)',
  neutral: 'var(--fg)',
};

const solidStyles: Partial<Record<BadgeStatus, React.CSSProperties>> = {
  neutral: { background: 'var(--fvs-ink)', color: 'var(--fvs-paper)', borderColor: 'var(--fvs-ink)' },
  live:    { background: 'var(--fvs-amber)', color: 'var(--fvs-black)', borderColor: 'var(--fvs-amber)' },
};

export function Badge({ status = 'neutral', label, showDot = true, solid = false }: BadgeProps) {
  const color = statusColors[status];
  const defaultShowDot = showDot && status !== 'neutral';

  const style: React.CSSProperties = solid && solidStyles[status]
    ? {
        ...solidStyles[status],
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '4px 9px',
        border: '1px solid',
        borderRadius: 'var(--r-1)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        lineHeight: 1,
      }
    : {
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        padding: '4px 9px',
        border: `1px solid ${color}`,
        borderRadius: 'var(--r-1)',
        color,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        lineHeight: 1,
      };

  return (
    <span style={style}>
      {defaultShowDot && (
        <span style={{
          width: 6,
          height: 6,
          borderRadius: 'var(--r-pill)',
          background: 'currentColor',
          flexShrink: 0,
        }} />
      )}
      {label}
    </span>
  );
}
