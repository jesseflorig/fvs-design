import React from 'react';
import { Stack } from './Stack';
import type { SectionProps } from './types';

export function Section({
  title,
  description,
  actions,
  children,
  loading = false,
  className,
}: SectionProps) {
  return (
    <section
      className={className}
      aria-busy={loading || undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--s-4)',
        minWidth: 0,
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--s-4)',
          minWidth: 0,
        }}
      >
        <Stack gap="xs">
          <h2
            style={{
              margin: 0,
              color: 'var(--fg)',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--t-h4)',
              lineHeight: 'var(--lh-snug)',
              fontWeight: 500,
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              style={{
                margin: 0,
                color: 'var(--fg-muted)',
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--t-small)',
                lineHeight: 'var(--lh-normal)',
              }}
            >
              {description}
            </p>
          )}
        </Stack>
        {actions && (
          <div style={{ flex: '0 0 auto' }}>
            {actions}
          </div>
        )}
      </header>
      <div style={{ minWidth: 0 }}>
        {children}
      </div>
    </section>
  );
}
