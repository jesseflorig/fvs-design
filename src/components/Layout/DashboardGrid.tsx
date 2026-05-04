import React from 'react';
import { getLayoutGap, getMinItemWidth } from './layoutTokens';
import type { DashboardGridProps } from './types';

export function DashboardGrid({
  gap = 'md',
  minItemWidth = 'md',
  columns,
  children,
  className,
}: DashboardGridProps) {
  const template = columns
    ? `repeat(${columns}, minmax(0, 1fr))`
    : `repeat(auto-fit, minmax(min(100%, ${getMinItemWidth(minItemWidth)}), 1fr))`;

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: template,
        gap: getLayoutGap(gap),
        alignItems: 'stretch',
        minWidth: 0,
      }}
    >
      {children}
    </div>
  );
}
