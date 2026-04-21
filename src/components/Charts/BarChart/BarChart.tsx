import React from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { EmptyChart } from '../EmptyChart/EmptyChart';
import { tokenToVar } from '../types';
import type { AxisConfig, TooltipConfig, FvsToken } from '../types';

export interface BarDataPoint {
  category: string;
  value: number;
}

export interface BarChartProps {
  data: BarDataPoint[];
  orientation?: 'vertical' | 'horizontal';
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  tooltip?: TooltipConfig;
  color?: FvsToken;
  height?: number;
  ariaLabel: string;
}

function axisTickStyle() {
  return {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fill: 'var(--fg-muted)',
    letterSpacing: '0.05em',
  };
}

export function BarChart({
  data,
  orientation = 'vertical',
  xAxis,
  yAxis,
  tooltip,
  color = '--fvs-amber',
  height = 300,
  ariaLabel,
}: BarChartProps) {
  if (data.length === 0) return <EmptyChart label={ariaLabel} height={height} />;

  const fill = tokenToVar(color);
  const tooltipEnabled = tooltip?.enabled !== false;
  const isHorizontal = orientation === 'horizontal';

  const chartData = data.map((d) => ({ name: d.category, value: d.value }));

  const xAxisLabel = xAxis?.label
    ? {
        value: xAxis.unit ? `${xAxis.label} (${xAxis.unit})` : xAxis.label,
        position: 'insideBottom' as const,
        offset: -4,
        style: { fontFamily: 'var(--font-sans)', fontSize: 11, fill: 'var(--fg-muted)' },
      }
    : undefined;

  const yAxisLabel = yAxis?.label
    ? {
        value: yAxis.label,
        angle: -90 as const,
        position: 'insideLeft' as const,
        offset: 8,
        style: { fontFamily: 'var(--font-sans)', fontSize: 11, fill: 'var(--fg-muted)' },
      }
    : undefined;

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
                domain={yAxis?.domain}
                tickCount={yAxis?.tickCount}
                label={yAxisLabel}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={axisTickStyle()}
                tickLine={false}
                axisLine={false}
                width={72}
                label={xAxisLabel}
              />
            </>
          ) : (
            <>
              <XAxis
                dataKey="name"
                tick={axisTickStyle()}
                tickLine={false}
                axisLine={{ stroke: 'var(--line)' }}
                label={xAxisLabel}
                tickCount={xAxis?.tickCount}
              />
              <YAxis
                tick={axisTickStyle()}
                tickLine={false}
                axisLine={false}
                tickFormatter={yAxis?.unit ? (v: number) => `${v}${yAxis.unit}` : undefined}
                domain={yAxis?.domain}
                tickCount={yAxis?.tickCount}
                label={yAxisLabel}
              />
            </>
          )}
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
              cursor={{ fill: 'var(--line-hair)' }}
            />
          )}
          <Bar dataKey="value" fill={fill} radius={0} maxBarSize={48} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}
