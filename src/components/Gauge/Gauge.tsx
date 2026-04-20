import React from 'react';

export type GaugeStatus = 'nominal' | 'live' | 'fault' | 'info' | 'offline' | 'neutral';
export type GaugeSize   = 'sm' | 'md' | 'lg';

export interface GaugeProps {
  /** Current value to display. Clamped to [min, max]. */
  value: number;
  /** Lower bound. Default: 0 */
  min?: number;
  /** Upper bound. Default: 100 */
  max?: number;
  /** Semantic status driving arc fill color. Default: 'neutral' */
  status?: GaugeStatus;
  /** Unit suffix appended to the value label (e.g. "%", "°C"). */
  unit?: string;
  /** Secondary descriptor label rendered below the value. Hidden at 'sm' size. */
  label?: string;
  /** Viewport size preset. Default: 'md' */
  size?: GaugeSize;
  /** Accessible name override. Falls back to label prop, then "Gauge". */
  'aria-label'?: string;
}

const statusColors: Record<GaugeStatus, string> = {
  nominal: 'var(--nominal)',
  live:    'var(--live)',
  fault:   'var(--alert)',
  info:    'var(--info)',
  offline: 'var(--offline)',
  neutral: 'var(--fg)',
};

const sizeConfig = {
  sm: { vp: 64,  r: 25, sw: 5,  valueSize: 13, labelSize: 0  },
  md: { vp: 128, r: 52, sw: 10, valueSize: 26, labelSize: 11 },
  lg: { vp: 192, r: 80, sw: 14, valueSize: 38, labelSize: 14 },
} satisfies Record<GaugeSize, { vp: number; r: number; sw: number; valueSize: number; labelSize: number }>;

function normalizeValue(value: number, min: number, max: number): number {
  if (min >= max || isNaN(value)) return 0;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

function truncateLabel(text: string, maxChars: number): string {
  return text.length > maxChars ? text.slice(0, maxChars - 1) + '…' : text;
}

export function Gauge({
  value,
  min = 0,
  max = 100,
  status = 'neutral',
  unit,
  label,
  size = 'md',
  'aria-label': ariaLabel,
}: GaugeProps) {
  const { vp, r, sw, valueSize, labelSize } = sizeConfig[size];
  const cx = vp / 2;
  const cy = vp / 2;

  const circumference = 2 * Math.PI * r;
  const arcLength = circumference * 0.75; // 270° sweep

  const normalized = normalizeValue(value, min, max);
  const filled = normalized * arcLength;

  // Two-value dasharray: visible segment then invisible remainder
  const trackDash = `${arcLength} ${circumference - arcLength}`;
  const fillDash  = `${filled} ${circumference - filled}`;

  // Rotate so the arc gap sits at the bottom (gap between ~4:30 and ~7:30)
  const rotation = `rotate(135 ${cx} ${cy})`;

  const fillColor   = statusColors[status];
  const valueText   = `${value}${unit ?? ''}`;
  const accessibleName = ariaLabel ?? label ?? 'Gauge';
  const valueText_a11y = unit ? `${value} ${unit}` : String(value);

  const hasLabel = !!label && size !== 'sm';
  // Shift value text up when descriptor is present
  const valueY = hasLabel ? cy - (labelSize + 6) / 2 : cy;
  const labelY = cy + valueSize * 0.55 + 4;

  // Max chars that fit inside the arc's inner diameter
  const maxLabelChars = size === 'lg' ? 17 : 14;
  const displayLabel = hasLabel ? truncateLabel(label, maxLabelChars) : undefined;

  return (
    <div
      role="meter"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-label={accessibleName}
      aria-valuetext={valueText_a11y}
      style={{ display: 'inline-block', lineHeight: 0 }}
    >
      <svg
        width={vp}
        height={vp}
        viewBox={`0 0 ${vp} ${vp}`}
        aria-hidden="true"
      >
        {/* Track arc — muted full 270° background */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--line)"
          strokeWidth={sw}
          strokeDasharray={trackDash}
          strokeLinecap="butt"
          transform={rotation}
        />
        {/* Fill arc — value-proportional, status-colored */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={fillColor}
          strokeWidth={sw}
          strokeDasharray={fillDash}
          strokeLinecap="butt"
          transform={rotation}
        />
        {/* Value + unit label */}
        <text
          x={cx}
          y={valueY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--fg)"
          fontFamily="var(--font-mono)"
          fontSize={valueSize}
          letterSpacing="0.02em"
        >
          {valueText}
        </text>
        {/* Descriptor label — hidden at sm size */}
        {hasLabel && displayLabel && (
          <text
            x={cx}
            y={labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="var(--fg-muted)"
            fontFamily="var(--font-sans)"
            fontSize={labelSize}
          >
            {displayLabel}
          </text>
        )}
      </svg>
    </div>
  );
}
