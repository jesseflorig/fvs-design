import React from 'react';
import type { BadgeProps } from '../Badge/Badge';
import { Badge } from '../Badge/Badge';

export interface CardProps {
  panelLabel: string;
  statusBadge?: BadgeProps;
  children?: React.ReactNode;
  hover?: boolean;
}

export function Card({ panelLabel, statusBadge, children, hover = false }: CardProps) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--r-2)',
        overflow: 'hidden',
        boxShadow: hover && hovered ? 'var(--shadow-1)' : 'none',
        transition: 'box-shadow var(--dur-fast) var(--ease-std)',
      }}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 14px',
        borderBottom: '1px solid var(--line)',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--fg-muted)',
        }}>
          {panelLabel}
        </span>
        {statusBadge && <Badge {...statusBadge} />}
      </div>
      {children && (
        <div style={{ padding: 14 }}>
          {children}
        </div>
      )}
    </div>
  );
}
