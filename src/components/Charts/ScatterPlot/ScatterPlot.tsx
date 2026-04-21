import React from 'react';
import {
  ScatterChart as ReScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { EmptyChart } from '../EmptyChart/EmptyChart';
import { paletteColor, tokenToVar } from '../types';
import type { AxisConfig, TooltipConfig, SeriesColor, FvsToken } from '../types';

export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
}

export interface ScatterSeries {
  key: string;
  label: string;
  data: ScatterPoint[];
}

export interface ScatterPlotProps {
  series: ScatterSeries[];
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  tooltip?: TooltipConfig;
  seriesColors?: SeriesColor[];
  showLegend?: boolean;
  dotSize?: number;
  height?: number;
  ariaLabel: string;
}

function seriesColor(key: string, index: number, overrides?: SeriesColor[]): string {
  const override = overrides?.find((c) => c.seriesKey === key);
  return override ? tokenToVar(override.token as FvsToken) : paletteColor(index);
}

function axisTickStyle() {
  return {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fill: 'var(--fg-muted)',
    letterSpacing: '0.05em',
  };
}

export function ScatterPlot({
  series,
  xAxis,
  yAxis,
  tooltip,
  seriesColors,
  showLegend,
  dotSize = 4,
  height = 300,
  ariaLabel,
}: ScatterPlotProps) {
  const allEmpty = series.length === 0 || series.every((s) => s.data.length === 0);
  if (allEmpty) return <EmptyChart label={ariaLabel} height={height} />;

  const shouldShowLegend = showLegend ?? series.length > 1;
  const tooltipEnabled = tooltip?.enabled !== false;

  return (
    <div role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <ReScatterChart margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
          <CartesianGrid
            strokeDasharray="2 4"
            stroke="var(--line-hair)"
          />
          <XAxis
            type="number"
            dataKey="x"
            name={xAxis?.label ?? 'X'}
            tick={axisTickStyle()}
            tickLine={false}
            axisLine={{ stroke: 'var(--line)' }}
            tickFormatter={xAxis?.unit ? (v: number) => `${v}${xAxis.unit}` : undefined}
            domain={xAxis?.domain}
            tickCount={xAxis?.tickCount}
            label={
              xAxis?.label
                ? {
                    value: xAxis.unit ? `${xAxis.label} (${xAxis.unit})` : xAxis.label,
                    position: 'insideBottom' as const,
                    offset: -4,
                    style: { fontFamily: 'var(--font-sans)', fontSize: 11, fill: 'var(--fg-muted)' },
                  }
                : undefined
            }
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yAxis?.label ?? 'Y'}
            tick={axisTickStyle()}
            tickLine={false}
            axisLine={false}
            tickFormatter={yAxis?.unit ? (v: number) => `${v}${yAxis.unit}` : undefined}
            domain={yAxis?.domain}
            tickCount={yAxis?.tickCount}
            label={
              yAxis?.label
                ? {
                    value: yAxis.label,
                    angle: -90 as const,
                    position: 'insideLeft' as const,
                    offset: 8,
                    style: { fontFamily: 'var(--font-sans)', fontSize: 11, fill: 'var(--fg-muted)' },
                  }
                : undefined
            }
          />
          {tooltipEnabled && (
            <Tooltip
              cursor={{ strokeDasharray: '2 4', stroke: 'var(--line)' }}
              contentStyle={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-1)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--fg)',
              }}
            />
          )}
          {shouldShowLegend && (
            <Legend
              wrapperStyle={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                color: 'var(--fg-muted)',
              }}
            />
          )}
          {series.map((s, i) => (
            <Scatter
              key={s.key}
              name={s.label}
              data={s.data}
              fill={seriesColor(s.key, i, seriesColors)}
              r={dotSize}
              fillOpacity={0.8}
            />
          ))}
        </ReScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
