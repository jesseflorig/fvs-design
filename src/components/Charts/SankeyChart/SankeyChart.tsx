import React from 'react';
import { Sankey, Tooltip, ResponsiveContainer } from 'recharts';
import { EmptyChart } from '../EmptyChart/EmptyChart';
import { CHART_PALETTE, tokenToVar } from '../types';
import type { FvsToken } from '../types';

export interface SankeyNode {
  name: string;
  color?: FvsToken;
}

export interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

export interface SankeyChartProps {
  nodes: SankeyNode[];
  links: SankeyLink[];
  colors?: FvsToken[];
  nodeWidth?: number;
  nodePadding?: number;
  height?: number;
  ariaLabel: string;
}

const LABEL_WIDTH = 80;
const LABEL_PAD = 6;

interface NodeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  payload?: { name?: string };
  containerWidth?: number;
  colors: string[];
}

function SankeyNode({ x = 0, y = 0, width = 0, height = 0, index = 0, payload, containerWidth = 0, colors }: NodeProps) {
  const fill = colors[index % colors.length];
  const isRight = x + width > containerWidth / 2;
  const labelX = isRight ? x - LABEL_PAD : x + width + LABEL_PAD;
  const anchor = isRight ? 'end' : 'start';

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={2}
        ry={2}
        opacity={0.9}
      />
      {payload?.name && (
        <text
          x={labelX}
          y={y + height / 2}
          textAnchor={anchor}
          dominantBaseline="middle"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            fill: 'var(--fg-muted)',
            letterSpacing: '0.04em',
          }}
        >
          {payload.name}
        </text>
      )}
    </g>
  );
}

interface LinkProps {
  sourceX?: number;
  sourceY?: number;
  sourceControlX?: number;
  targetX?: number;
  targetY?: number;
  targetControlX?: number;
  linkWidth?: number;
  index?: number;
  payload?: { source?: { index?: number } };
  colors: string[];
}

function SankeyLink({
  sourceX = 0,
  sourceY = 0,
  sourceControlX = 0,
  targetX = 0,
  targetY = 0,
  targetControlX = 0,
  linkWidth = 0,
  payload,
  colors,
}: LinkProps) {
  const sourceIndex = payload?.source?.index ?? 0;
  const fill = colors[sourceIndex % colors.length];

  return (
    <path
      d={`
        M${sourceX},${sourceY - linkWidth / 2}
        C${sourceControlX},${sourceY - linkWidth / 2} ${targetControlX},${targetY - linkWidth / 2} ${targetX},${targetY - linkWidth / 2}
        L${targetX},${targetY + linkWidth / 2}
        C${targetControlX},${targetY + linkWidth / 2} ${sourceControlX},${sourceY + linkWidth / 2} ${sourceX},${sourceY + linkWidth / 2}
        Z
      `}
      fill={fill}
      opacity={0.3}
      stroke={fill}
      strokeWidth={0.5}
      strokeOpacity={0.4}
    />
  );
}

function tooltipStyle() {
  return {
    background: 'var(--bg-elevated)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--r-1)',
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--fg)',
    padding: '6px 10px',
  };
}

export function SankeyChart({
  nodes,
  links,
  colors,
  nodeWidth = 12,
  nodePadding = 20,
  height = 320,
  ariaLabel,
}: SankeyChartProps) {
  if (nodes.length === 0 || links.length === 0) {
    return <EmptyChart label={ariaLabel} height={height} />;
  }

  const palette = (colors ?? CHART_PALETTE).map(tokenToVar);

  const data = { nodes, links };

  return (
    <div role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <Sankey
          data={data}
          nodeWidth={nodeWidth}
          nodePadding={nodePadding}
          margin={{ top: 8, right: LABEL_WIDTH, bottom: 8, left: LABEL_WIDTH }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          node={(props: any) => <SankeyNode {...props} colors={palette} />}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          link={(props: any) => <SankeyLink {...props} colors={palette} />}
        >
          <Tooltip
            contentStyle={tooltipStyle()}
          />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}
