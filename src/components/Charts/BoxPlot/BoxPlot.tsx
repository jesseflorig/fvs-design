import React from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { EmptyChart } from '../EmptyChart/EmptyChart';
import { tokenToVar } from '../types';
import type { AxisConfig, TooltipConfig, FvsToken } from '../types';

export interface BoxPlotGroup {
  category: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
}

export interface BoxPlotProps {
  data: BoxPlotGroup[];
  xAxis?: AxisConfig;
  yAxis?: AxisConfig;
  tooltip?: TooltipConfig;
  color?: FvsToken;
  strokeColor?: FvsToken;
  height?: number;
  ariaLabel: string;
}

interface ShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  background?: { x: number | null; y: number | null; width: number | null; height: number | null };
  fill?: string;
  stroke?: string;
  min?: number;
  q1?: number;
  median?: number;
  q3?: number;
  max?: number;
  outliers?: number[];
  domainMin?: number;
  domainMax?: number;
  [key: string]: unknown;
}

function BoxShape({
  x = 0,
  width = 40,
  background,
  fill = 'var(--bg-inset)',
  stroke = 'var(--fvs-amber)',
  min = 0,
  q1 = 0,
  median = 0,
  q3 = 0,
  max = 0,
  outliers = [],
  domainMin = 0,
  domainMax = 100,
}: ShapeProps) {
  if (!background || background.y == null || background.height == null) return null;

  const chartTop = background.y as number;
  const chartH = background.height as number;
  const range = domainMax - domainMin;

  function sy(v: number): number {
    return chartTop + ((domainMax - v) / range) * chartH;
  }

  const cx = x + width / 2;
  const boxW = Math.max(width * 0.55, 10);
  const boxX = cx - boxW / 2;

  const yMin = sy(min);
  const yQ1 = sy(q1);
  const yMed = sy(median);
  const yQ3 = sy(q3);
  const yMax = sy(max);

  return (
    <g>
      <line x1={cx} y1={yMin} x2={cx} y2={yQ1} stroke={stroke} strokeWidth={1} />
      <line x1={cx} y1={yQ3} x2={cx} y2={yMax} stroke={stroke} strokeWidth={1} />
      <line x1={cx - boxW * 0.3} y1={yMin} x2={cx + boxW * 0.3} y2={yMin} stroke={stroke} strokeWidth={1} />
      <line x1={cx - boxW * 0.3} y1={yMax} x2={cx + boxW * 0.3} y2={yMax} stroke={stroke} strokeWidth={1} />
      <rect
        x={boxX}
        y={yQ3}
        width={boxW}
        height={Math.abs(yQ1 - yQ3)}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
      <line x1={boxX} y1={yMed} x2={boxX + boxW} y2={yMed} stroke={stroke} strokeWidth={1.5} />
      {outliers.map((v, i) => (
        <circle key={i} cx={cx} cy={sy(v)} r={2.5} fill="none" stroke={stroke} strokeWidth={1} />
      ))}
    </g>
  );
}

function axisTickStyle() {
  return {
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    fill: 'var(--fg-muted)',
    letterSpacing: '0.05em',
  };
}

export function BoxPlot({
  data,
  xAxis,
  yAxis,
  tooltip,
  color = '--bg-inset',
  strokeColor = '--fvs-amber',
  height = 300,
  ariaLabel,
}: BoxPlotProps) {
  if (data.length === 0) return <EmptyChart label={ariaLabel} height={height} />;

  const fill = tokenToVar(color);
  const stroke = tokenToVar(strokeColor);

  const allValues = data.flatMap((d) => [d.min, d.q3, d.max, ...(d.outliers ?? [])]);
  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);
  const padding = (rawMax - rawMin) * 0.1 || 1;
  const domainMin = yAxis?.domain?.[0] ?? Math.floor(rawMin - padding);
  const domainMax = yAxis?.domain?.[1] ?? Math.ceil(rawMax + padding);

  if (import.meta.env.DEV) {
    for (const d of data) {
      if (d.min > d.q1 || d.q1 > d.median || d.median > d.q3 || d.q3 > d.max) {
        console.warn(`[BoxPlot] Data invariant violated for category "${d.category}": expected min ≤ q1 ≤ median ≤ q3 ≤ max`);
      }
    }
  }

  const chartData = data.map((d) => ({
    name: d.category,
    _range: domainMax,
    min: d.min,
    q1: d.q1,
    median: d.median,
    q3: d.q3,
    max: d.max,
    outliers: d.outliers ?? [],
  }));

  const tooltipEnabled = tooltip?.enabled !== false;

  return (
    <div role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <ReBarChart data={chartData} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
          <CartesianGrid strokeDasharray="2 4" stroke="var(--line-hair)" vertical={false} />
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
            domain={[domainMin, domainMax]}
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
          {tooltipEnabled && (
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0]?.payload;
                return (
                  <div
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--line)',
                      borderRadius: 'var(--r-1)',
                      padding: '8px 12px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'var(--fg)',
                      lineHeight: 1.6,
                    }}
                  >
                    <div style={{ color: 'var(--fg-muted)', marginBottom: 4 }}>{d.name}</div>
                    <div>max: {d.max}{yAxis?.unit ?? ''}</div>
                    <div>q3: {d.q3}{yAxis?.unit ?? ''}</div>
                    <div>median: {d.median}{yAxis?.unit ?? ''}</div>
                    <div>q1: {d.q1}{yAxis?.unit ?? ''}</div>
                    <div>min: {d.min}{yAxis?.unit ?? ''}</div>
                    {d.outliers?.length > 0 && <div>outliers: {d.outliers.join(', ')}</div>}
                  </div>
                );
              }}
            />
          )}
          <Bar
            dataKey="_range"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            shape={(props: any) => (
              <BoxShape
                {...(props as ShapeProps)}
                fill={fill}
                stroke={stroke}
                domainMin={domainMin}
                domainMax={domainMax}
              />
            )}
            isAnimationActive={false}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill="transparent" />
            ))}
          </Bar>
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}
