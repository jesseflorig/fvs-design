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
import { bucketize } from './bucketize';
import type { HistogramBucket } from './bucketize';

type HistogramProps = {
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  tooltip?: TooltipConfig;
  color?: FvsToken;
  height?: number;
  ariaLabel: string;
} & (
  | { buckets: HistogramBucket[]; values?: never; bins?: never }
  | { values: number[]; bins?: number; buckets?: never }
);

function axisTickStyle() {
  return {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fill: 'var(--fg-muted)',
    letterSpacing: '0.05em',
  };
}

export function Histogram({
  xAxis,
  yAxis,
  tooltip,
  color = '--fvs-amber',
  height = 300,
  ariaLabel,
  ...rest
}: HistogramProps) {
  const resolved: HistogramBucket[] = 'buckets' in rest && rest.buckets
    ? rest.buckets
    : bucketize((rest as { values: number[]; bins?: number }).values ?? [], (rest as { bins?: number }).bins);

  if (resolved.length === 0) return <EmptyChart label={ariaLabel} height={height} />;

  const fill = tokenToVar(color);
  const tooltipEnabled = tooltip?.enabled !== false;

  return (
    <div role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <ReBarChart
          data={resolved}
          margin={{ top: 8, right: 16, bottom: 8, left: 8 }}
          barCategoryGap={0}
        >
          <CartesianGrid
            strokeDasharray="2 4"
            stroke="var(--line-hair)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tick={axisTickStyle()}
            tickLine={false}
            axisLine={{ stroke: 'var(--line)' }}
            interval="preserveStartEnd"
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
            tick={axisTickStyle()}
            tickLine={false}
            axisLine={false}
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
          <Bar dataKey="count" fill={fill} stroke="var(--bg)" strokeWidth={1} />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}
