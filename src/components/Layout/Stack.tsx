import React from 'react';
import { getAlignItems, getJustifyContent, getLayoutGap } from './layoutTokens';
import type { StackProps } from './types';

export function Stack({
  direction = 'vertical',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  children,
  className,
}: StackProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: direction === 'horizontal' ? 'row' : 'column',
        flexWrap: wrap ? 'wrap' : 'nowrap',
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
