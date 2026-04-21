import React from 'react';

export interface BoxPlotShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  background?: { x: number; y: number; width: number; height: number };
  fill: string;
  stroke: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
  outliers?: number[];
  yMin: number;
  yMax: number;
  chartHeight: number;
}

function scaleY(
  value: number,
  yMin: number,
  yMax: number,
  chartHeight: number,
  topMargin = 8,
  bottomMargin = 8
): number {
  const usable = chartHeight - topMargin - bottomMargin;
  const ratio = (yMax - value) / (yMax - yMin);
  return topMargin + ratio * usable;
}

export function BoxPlotShape({
  x = 0,
  width = 40,
  fill,
  stroke,
  min,
  q1,
  median,
  q3,
  max,
  outliers = [],
  yMin,
  yMax,
  chartHeight,
}: BoxPlotShapeProps) {
  const cx = x + width / 2;
  const boxW = Math.max(width * 0.6, 12);
  const boxX = cx - boxW / 2;

  const sy = (v: number) => scaleY(v, yMin, yMax, chartHeight);

  const yMin_ = sy(min);
  const yQ1 = sy(q1);
  const yMed = sy(median);
  const yQ3 = sy(q3);
  const yMax_ = sy(max);

  return (
    <g>
      {/* whisker: min to q1 */}
      <line x1={cx} y1={yMin_} x2={cx} y2={yQ1} stroke={stroke} strokeWidth={1} />
      {/* whisker: q3 to max */}
      <line x1={cx} y1={yQ3} x2={cx} y2={yMax_} stroke={stroke} strokeWidth={1} />
      {/* whisker caps */}
      <line x1={cx - boxW * 0.3} y1={yMin_} x2={cx + boxW * 0.3} y2={yMin_} stroke={stroke} strokeWidth={1} />
      <line x1={cx - boxW * 0.3} y1={yMax_} x2={cx + boxW * 0.3} y2={yMax_} stroke={stroke} strokeWidth={1} />
      {/* box body: q1 to q3 */}
      <rect
        x={boxX}
        y={yQ3}
        width={boxW}
        height={Math.abs(yQ1 - yQ3)}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
      {/* median line */}
      <line x1={boxX} y1={yMed} x2={boxX + boxW} y2={yMed} stroke={stroke} strokeWidth={1.5} />
      {/* outlier dots */}
      {outliers.map((v, i) => (
        <circle key={i} cx={cx} cy={sy(v)} r={2.5} fill="none" stroke={stroke} strokeWidth={1} />
      ))}
    </g>
  );
}
