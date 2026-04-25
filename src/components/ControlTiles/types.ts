import type React from 'react';

export type TileControlKind = 'toggle' | 'scene' | 'summary';
export type TileState = 'off' | 'on' | 'transitioning' | 'warning' | 'unavailable';
export type GridOrientation = 'portrait' | 'landscape';

export interface ControlTileProps {
  title: string;
  subtitle?: string;
  controlKind?: TileControlKind;
  state: TileState;
  stateLabel: string;
  contextLabel?: string;
  toggleLabel?: string;
  icon?: React.ReactNode;
  interactive?: boolean;
  disabled?: boolean;
  selected?: boolean;
  onToggle?: () => void;
  onPress?: () => void;
  ariaLabel?: string;
}

export interface ControlTileGridItem {
  key: string;
  tile: React.ReactElement<ControlTileProps>;
}

export interface ControlTileGridProps {
  items: ControlTileGridItem[];
  orientation: GridOrientation;
  columns?: number;
  gap?: 'dense' | 'default' | 'loose';
  padding?: 'flush' | 'default' | 'roomy';
  ariaLabel?: string;
}

export interface GridTemplate {
  columns: number;
  gapToken: string;
  paddingToken: string;
}

export type GridTemplatePreset = Record<GridOrientation, GridTemplate>;
