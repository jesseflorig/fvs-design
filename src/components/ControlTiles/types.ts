import type React from 'react';

export type TileControlKind = 'toggle' | 'scene' | 'summary';
export type TileState = 'off' | 'on' | 'transitioning' | 'warning' | 'unavailable';
export type GridOrientation = 'portrait' | 'landscape';
export type LightAvailabilityStatus = 'available' | 'updating' | 'unavailable';
export type LightWarmthLabel = 'Cool White' | 'Daylight' | 'Neutral White' | 'Soft White' | 'Warm White' | 'Candlelight' | 'Red';

export interface LightCapabilitySupport {
  dimmer: boolean;
  warmth: boolean;
  nightMode: boolean;
}

export interface DimmerControlValue {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

export interface WarmthControlValue {
  value: number;
  label: LightWarmthLabel;
  minLabel?: string;
  maxLabel?: string;
}

export interface NightModeValue {
  active: boolean;
  label?: string;
  activeLabel?: string;
  inactiveLabel?: string;
}

export interface LightControlTileProps {
  title: string;
  subtitle?: string;
  status: LightAvailabilityStatus;
  capabilities: LightCapabilitySupport;
  brightness?: DimmerControlValue;
  warmth?: WarmthControlValue;
  nightMode?: NightModeValue;
  updatingLabel?: string;
  unavailableLabel?: string;
  ariaLabel?: string;
  onBrightnessChange?: (value: number) => void;
  onWarmthChange?: (value: number) => void;
  onNightModeChange?: (active: boolean) => void;
}

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
