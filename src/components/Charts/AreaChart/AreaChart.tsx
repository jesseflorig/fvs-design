import React from 'react';
import {
  AreaChart as ReAreaChart,
  Area,
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
import type { LineSeries } from '../LineChart/LineChart';

export interface AreaChartProps {
  series: LineSeries[];
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  tooltip?: TooltipConfig;
  seriesColors?: SeriesColor[];
  showLegend?: boolean;
  fillOpacity?: number;
  height?: number;
  ariaLabel: string;
}

function flattenSeries(series: LineSeries[]): Record<string, unknown>[] {
  const map = new Map<string, Record<string, unknown>>();
  for (const s of series) {
    for (const pt of s.data) {
      const key = String(pt.x instanceof Date ? pt.x.toISOString() : pt.x);
      const entry = map.get(key) ?? { x: pt.x };
      entry[s.key] = pt.y;
      map.set(key, entry);
    }
  }
  return Array.from(map.values());
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

export function AreaChart({
  series,
  xAxis,
  yAxis,
  tooltip,
  seriesColors,
  showLegend,
  fillOpacity = 0.25,
  height = 300,
  ariaLabel,
}: AreaChartProps) {
  const allEmpty = series.length === 0 || series.every((s) => s.data.length === 0);
  if (allEmpty) return <EmptyChart label={ariaLabel} height={height} />;

  const data = flattenSeries(series);
  const shouldShowLegend = showLegend ?? series.length > 1;
  const tooltipEnabled = tooltip?.enabled !== false;

  return (
    <div role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <ReAreaChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
          <CartesianGrid
            strokeDasharray="2 4"
            stroke="var(--line-hair)"
            vertical={false}
          />
          <XAxis
            dataKey="x"
            tick={axisTickStyle()}
            tickLine={false}
            axisLine={{ stroke: 'var(--line)' }}
            label={
              xAxis?.label
                ? {
                    value: xAxis.unit ? `${xAxis.label} (${xAxis.unit})` : xAxis.label,
                    position: 'insideBottom',
                    offset: -4,
                    style: { fontFamily: 'var(--font-sans)', fontSize: 11, fill: 'var(--fg-muted)' },
                  }
                : undefined
            }
            tickCount={xAxis?.tickCount}
          />
          <YAxis
            tick={axisTickStyle()}
            tickLine={false}
            axisLine={false}
            tickFormatter={
              yAxis?.unit ? (v: number) => `${v}${yAxis.unit}` : undefined
            }
            label={
              yAxis?.label
                ? {
                    value: yAxis.label,
                    angle: -90,
                    position: 'insideLeft',
                    offset: 8,
                    style: { fontFamily: 'var(--font-sans)', fontSize: 11, fill: 'var(--fg-muted)' },
                  }
                : undefined
            }
            domain={yAxis?.domain}
            tickCount={yAxis?.tickCount}
          />
          {tooltipEnabled && (
            <Tooltip
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              formatter={tooltip?.formatter ? ((v: any, n: any) => tooltip.formatter!(v, n ?? '')) as any : undefined}
              contentStyle={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-1)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--fg)',
              }}
              labelStyle={{ color: 'var(--fg-muted)', marginBottom: 4 }}
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
          {series.map((s, i) => {
            const color = seriesColor(s.key, i, seriesColors);
            return (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label}
                stroke={color}
                fill={color}
                fillOpacity={fillOpacity}
                strokeWidth={1.5}
                strokeDasharray={s.dashPattern}
                dot={false}
                activeDot={{ r: 3, strokeWidth: 0 }}
                connectNulls={false}
              />
            );
          })}
        </ReAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
