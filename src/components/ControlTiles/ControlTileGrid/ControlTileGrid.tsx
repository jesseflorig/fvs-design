import React from 'react';
import { getGapToken, getGridTemplate, getPaddingToken } from '../layout';
import type { ControlTileGridProps } from '../types';

export function ControlTileGrid({
  items,
  orientation,
  columns,
  gap = 'default',
  padding = 'default',
  ariaLabel,
}: ControlTileGridProps) {
  const template = getGridTemplate(orientation);
  const resolvedColumns = columns ?? template.columns;

  return (
    <div
      aria-label={ariaLabel}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${resolvedColumns}, minmax(0, 1fr))`,
        gridAutoRows: 'minmax(var(--fvs-control-tile-min-h), auto)',
        gap: `var(${getGapToken(gap)})`,
        padding: `var(${getPaddingToken(padding)})`,
        background: 'var(--bg)',
        alignItems: 'stretch',
      }}
    >
      {items.map((item) => (
        <div
          key={item.key}
          style={{
            minWidth: 0,
            minHeight: '100%',
          }}
        >
          <div style={{ height: '100%' }}>
            {item.tile}
          </div>
        </div>
      ))}
    </div>
  );
}
