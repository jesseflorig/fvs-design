import type { ControlTileGridProps, GridOrientation, GridTemplatePreset } from './types';

export const CONTROL_TILE_GRID_PRESET: GridTemplatePreset = {
  landscape: {
    columns: 4,
    gapToken: '--fvs-control-tile-gap-default',
    paddingToken: '--fvs-control-tile-padding-default',
  },
  portrait: {
    columns: 2,
    gapToken: '--fvs-control-tile-gap-default',
    paddingToken: '--fvs-control-tile-padding-default',
  },
};

const GAP_TOKENS: Record<NonNullable<ControlTileGridProps['gap']>, string> = {
  dense: '--fvs-control-tile-gap-dense',
  default: '--fvs-control-tile-gap-default',
  loose: '--fvs-control-tile-gap-loose',
};

const PADDING_TOKENS: Record<NonNullable<ControlTileGridProps['padding']>, string> = {
  flush: '--fvs-control-tile-padding-flush',
  default: '--fvs-control-tile-padding-default',
  roomy: '--fvs-control-tile-padding-roomy',
};

export function getGridTemplate(orientation: GridOrientation) {
  return CONTROL_TILE_GRID_PRESET[orientation];
}

export function getOrientationColumns(orientation: GridOrientation) {
  return CONTROL_TILE_GRID_PRESET[orientation].columns;
}

export function getGapToken(gap: NonNullable<ControlTileGridProps['gap']> = 'default') {
  return GAP_TOKENS[gap];
}

export function getPaddingToken(padding: NonNullable<ControlTileGridProps['padding']> = 'default') {
  return PADDING_TOKENS[padding];
}
