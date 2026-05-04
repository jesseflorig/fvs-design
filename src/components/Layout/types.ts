import React from 'react';

export type StackDirection = 'vertical' | 'horizontal';
export type LayoutGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type CompactBehavior = 'wrap' | 'scroll';
export type DashboardDensity = 'compact' | 'standard';
export type DashboardGridMinItemWidth = 'sm' | 'md' | 'lg';
export type DashboardGridColumns = 1 | 2 | 3 | 4;

export interface StackProps {
  direction?: StackDirection;
  gap?: LayoutGap;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface ClusterProps {
  gap?: LayoutGap;
  align?: StackAlign;
  justify?: StackJustify;
  children: React.ReactNode;
  className?: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  meta?: string;
  active?: boolean;
  disabled?: boolean;
  onSelect?: (id: string) => void;
}

export interface NavbarProps {
  items: NavigationItem[];
  activeId?: string;
  leading?: React.ReactNode;
  actions?: React.ReactNode;
  label?: string;
  compactBehavior?: CompactBehavior;
  className?: string;
}

export interface SidebarProps {
  items?: NavigationItem[];
  activeId?: string;
  label?: string;
  collapsed?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface DashboardShellProps {
  navbar?: React.ReactNode;
  sidebar?: React.ReactNode;
  aside?: React.ReactNode;
  density?: DashboardDensity;
  children: React.ReactNode;
  className?: string;
}

export interface DashboardGridProps {
  gap?: LayoutGap;
  minItemWidth?: DashboardGridMinItemWidth;
  columns?: DashboardGridColumns;
  children: React.ReactNode;
  className?: string;
}

export interface SectionProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  loading?: boolean;
  className?: string;
}
