import React from 'react';
import { getDensityTokens } from './layoutTokens';
import type { DashboardShellProps } from './types';

export function DashboardShell({
  navbar,
  sidebar,
  aside,
  density = 'standard',
  children,
  className,
}: DashboardShellProps) {
  const densityTokens = getDensityTokens(density);

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateRows: navbar ? 'auto minmax(0, 1fr)' : 'minmax(0, 1fr)',
        gap: densityTokens.gap,
        minWidth: 0,
        background: 'var(--bg)',
        color: 'var(--fg)',
      }}
    >
      {navbar && <div>{navbar}</div>}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: [
            sidebar ? 'minmax(min-content, max-content)' : '',
            'minmax(0, 1fr)',
            aside ? 'minmax(min-content, calc(var(--s-12) * 3))' : '',
          ].filter(Boolean).join(' '),
          gap: densityTokens.gap,
          alignItems: 'start',
          minWidth: 0,
        }}
      >
        {sidebar && <div>{sidebar}</div>}
        <main
          style={{
            minWidth: 0,
            padding: densityTokens.padding,
          }}
        >
          {children}
        </main>
        {aside && (
          <aside
            aria-label="Dashboard details"
            style={{
              minWidth: 0,
              padding: densityTokens.padding,
            }}
          >
            {aside}
          </aside>
        )}
      </div>
    </div>
  );
}
