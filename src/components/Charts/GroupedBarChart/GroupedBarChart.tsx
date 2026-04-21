import React from 'react';
import {
  BarChart as ReBarChart,
  Bar,
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
import type { StackedBarCategory, StackedBarSeries } from '../StackedBarChart/StackedBarChart';

export interface GroupedBarChartProps {
  data: StackedBarCategory[];
  series: StackedBarSeries[];
  orientation?: 'vertical' | 'horizontal';
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  tooltip?: TooltipConfig;
  seriesColors?: SeriesColor[];
  showLegend?: boolean;
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

export function GroupedBarChart({
  data,
  series,
  orientation = 'vertical',
  xAxis,
  yAxis,
  tooltip,
  seriesColors,
  showLegend = true,
  height = 300,
  ariaLabel,
}: GroupedBarChartProps) {
  if (data.length === 0) return <EmptyChart label={ariaLabel} height={height} />;

  const chartData = data.map((d) => ({ ...d, name: d.category }));
  const isHorizontal = orientation === 'horizontal';
  const tooltipEnabled = tooltip?.enabled !== false;

  return (
    <div role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <ReBarChart
          data={chartData}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 8, right: 16, bottom: 8, left: 8 }}
        >
          <CartesianGrid
            strokeDasharray="2 4"
            stroke="var(--line-hair)"
            horizontal={!isHorizontal}
            vertical={isHorizontal}
          />
          {isHorizontal ? (
            <>
              <XAxis
                type="number"
                tick={axisTickStyle()}
                tickLine={false}
                axisLine={{ stroke: 'var(--line)' }}
                tickFormatter={yAxis?.unit ? (v: number) => `${v}${yAxis.unit}` : undefined}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={axisTickStyle()}
                tickLine={false}
                axisLine={false}
                width={72}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey="name"
                tick={axisTickStyle()}
                tickLine={false}
                axisLine={{ stroke: 'var(--line)' }}
                label={
                  xAxis?.label
                    ? {
                        value: xAxis.label,
                        position: 'insideBottom' as const,
                        offset: -4,
                        style: { fontFamily: 'var(--font-sans)', fontSize: 11, fill: 'var(--fg-muted)' },
                      }
                    : undefined
                }
              />
              <YAxis
                tick={axisTickStyle()}
                tickLine={false}
                axisLine={false}
                tickFormatter={yAxis?.unit ? (v: number) => `${v}${yAxis.unit}` : undefined}
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
            </>
          )}
          {tooltipEnabled && (
            <Tooltip
              contentStyle={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--r-1)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: 'var(--fg)',
              }}
              cursor={{ fill: 'var(--line-hair)' }}
            />
          )}
          {showLegend && (
            <Legend
              wrapperStyle={{
                fontFamily: 'var(--font-sans)',
                fontSize: 11,
                color: 'var(--fg-muted)',
              }}
            />
          )}
          {series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.label}
              fill={seriesColor(s.key, i, seriesColors)}
              maxBarSize={32}
            />
          ))}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}
