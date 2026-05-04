import type React from 'react';
import type {
  DashboardDensity,
  DashboardGridMinItemWidth,
  LayoutGap,
  StackAlign,
  StackJustify,
} from './types';

export const GAP_TOKENS: Record<LayoutGap, string> = {
  none: 'var(--s-0)',
  xs: 'var(--s-2)',
  sm: 'var(--s-3)',
  md: 'var(--s-5)',
  lg: 'var(--s-7)',
  xl: 'var(--s-8)',
};

export const ALIGN_ITEMS: Record<StackAlign, React.CSSProperties['alignItems']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

export const JUSTIFY_CONTENT: Record<StackJustify, React.CSSProperties['justifyContent']> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

export const DENSITY_TOKENS: Record<DashboardDensity, { gap: string; padding: string }> = {
  compact: {
    gap: 'var(--s-4)',
    padding: 'var(--s-4)',
  },
  standard: {
    gap: 'var(--s-6)',
    padding: 'var(--s-6)',
  },
};

export const MIN_ITEM_WIDTHS: Record<DashboardGridMinItemWidth, string> = {
  sm: 'calc(var(--s-12) * 2)',
  md: 'calc(var(--s-12) * 3)',
  lg: 'calc(var(--s-12) * 4)',
};

export function getLayoutGap(gap: LayoutGap = 'md') {
  return GAP_TOKENS[gap] ?? GAP_TOKENS.md;
}

export function getAlignItems(align: StackAlign = 'stretch') {
  return ALIGN_ITEMS[align] ?? ALIGN_ITEMS.stretch;
}

export function getJustifyContent(justify: StackJustify = 'start') {
  return JUSTIFY_CONTENT[justify] ?? JUSTIFY_CONTENT.start;
}

export function getDensityTokens(density: DashboardDensity = 'standard') {
  return DENSITY_TOKENS[density] ?? DENSITY_TOKENS.standard;
}

export function getMinItemWidth(minItemWidth: DashboardGridMinItemWidth = 'md') {
  return MIN_ITEM_WIDTHS[minItemWidth] ?? MIN_ITEM_WIDTHS.md;
}
