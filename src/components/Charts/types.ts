export type FvsToken = `--fvs-${string}` | `--${string}`;

export interface AxisConfig {
  label?: string;
  unit?: string;
  tickCount?: number;
  domain?: [number, number];
}

export interface TooltipConfig {
  enabled?: boolean;
  formatter?: (value: number, label: string) => string;
}

export interface SeriesColor {
  seriesKey: string;
  token: FvsToken;
}

export const CHART_PALETTE: FvsToken[] = [
  '--fvs-amber',
  '--fvs-blue',
  '--fvs-green',
  '--fvs-red',
  '--fvs-steel',
  '--fvs-slate',
];

export function tokenToVar(token: FvsToken): string {
  return `var(${token})`;
}

export function paletteColor(index: number): string {
  return tokenToVar(CHART_PALETTE[index % CHART_PALETTE.length]);
}
