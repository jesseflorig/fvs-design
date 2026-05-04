import React from 'react';
import { getAlignItems, getJustifyContent, getLayoutGap } from './layoutTokens';
import type { ClusterProps } from './types';

export function Cluster({
  gap = 'sm',
  align = 'center',
  justify = 'start',
  children,
  className,
}: ClusterProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: getLayoutGap(gap),
        alignItems: getAlignItems(align),
        justifyContent: getJustifyContent(justify),
        minWidth: 0,
      }}
    >
      {children}
    </div>
  );
}
