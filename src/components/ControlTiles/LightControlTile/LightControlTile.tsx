import React, { useCallback, useId, useRef, useState } from 'react';
import { Lightbulb, ThermometerSun } from 'lucide-react';
import { Toggle } from '../../Input';
import type {
  DimmerControlValue,
  LightAvailabilityStatus,
  LightControlTileProps,
  LightWarmthLabel,
  WarmthControlValue,
} from '../types';

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function snapToStep(raw: number, min: number, max: number, step: number) {
  const safeStep = step > 0 ? step : 1;
  const snapped = Math.round((raw - min) / safeStep) * safeStep + min;
  return clamp(snapped, min, max);
}

function normalizeRange(value: number, min: number, max: number) {
  if (max <= min) return 0;
  return clamp(((value - min) / (max - min)) * 100, 0, 100);
}

function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

const warmthLabels: LightWarmthLabel[] = ['Cool White', 'Daylight', 'Neutral White', 'Soft White', 'Warm White', 'Candlelight'];

function deriveWarmthLabel(value: number): LightWarmthLabel {
  const index = Math.round(clamp(value, 0, 100) / 20);
  return warmthLabels[index] ?? 'Neutral White';
}

function resolveBrightness(brightness?: DimmerControlValue) {
  const min = brightness?.min ?? 0;
  const max = brightness?.max ?? 100;
  const step = brightness?.step ?? 1;
  const safeMax = max > min ? max : min + 1;
  const value = snapToStep(brightness?.value ?? min, min, safeMax, step);

  return {
    label: brightness?.label ?? 'Brightness',
    min,
    max: safeMax,
    step,
    value,
    percentage: normalizeRange(value, min, safeMax),
  };
}

function resolveWarmth(warmth?: WarmthControlValue) {
  const value = clamp(warmth?.value ?? 50, 0, 100);
  const label = warmth?.label ?? deriveWarmthLabel(value);

  return {
    label,
    value,
    minLabel: warmth?.minLabel ?? 'Cool White',
    maxLabel: warmth?.maxLabel ?? 'Candlelight',
  };
}

function getAvailabilityLabel(status: LightAvailabilityStatus, updatingLabel?: string, unavailableLabel?: string) {
  if (status === 'updating') return updatingLabel ?? 'Updating';
  if (status === 'unavailable') return unavailableLabel ?? 'Unavailable';
  return 'Available';
}

function getPrimaryStatus({
  status,
  brightness,
  updatingLabel,
  unavailableLabel,
}: {
  status: LightAvailabilityStatus;
  brightness?: ReturnType<typeof resolveBrightness>;
  updatingLabel?: string;
  unavailableLabel?: string;
}) {
  if (status !== 'available') return getAvailabilityLabel(status, updatingLabel, unavailableLabel);
  if (brightness && brightness.value <= brightness.min) return 'Off';
  return 'On';
}

function buildStatusSummary({
  title,
  subtitle,
  status,
  brightness,
  warmth,
  nightModeActive,
  updatingLabel,
  unavailableLabel,
}: {
  title: string;
  subtitle?: string;
  status: LightAvailabilityStatus;
  brightness?: ReturnType<typeof resolveBrightness>;
  warmth?: ReturnType<typeof resolveWarmth>;
  nightModeActive: boolean;
  updatingLabel?: string;
  unavailableLabel?: string;
}) {
  const parts = [title];
  if (subtitle) parts.push(subtitle);
  parts.push(getAvailabilityLabel(status, updatingLabel, unavailableLabel));
  if (brightness) parts.push(`${brightness.label} ${formatPercent(brightness.value)}`);
  if (warmth) parts.push(`Warmth ${warmth.label}`);
  if (nightModeActive) parts.push('Night mode red LED active');
  return parts.join(', ');
}

const tileStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  minHeight: 'var(--fvs-control-tile-min-h)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--s-4)',
  padding: 'var(--fvs-control-tile-padding-y) var(--fvs-control-tile-padding-x)',
  border: '1px solid var(--line)',
  borderRadius: 'var(--r-3)',
  background: 'var(--bg-elevated)',
  boxShadow: 'var(--shadow-hair)',
  color: 'var(--fg)',
};

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--t-micro)',
  letterSpacing: 'var(--tr-label)',
  textTransform: 'uppercase',
  color: 'var(--fg-muted)',
};

const valueStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--t-tiny)',
  letterSpacing: 'var(--tr-data)',
  color: 'var(--fg-muted)',
};

const iconContainerStyle: React.CSSProperties = {
  display: 'inline-flex',
  width: 18,
  height: 18,
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--fg-muted)',
  flexShrink: 0,
};

interface TileSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  valueText: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  onChange?: (value: number) => void;
}

function TileSlider({ label, value, min, max, step, valueText, disabled = false, icon, onChange }: TileSliderProps) {
  const labelId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const percentage = normalizeRange(value, min, max);
  const interactive = !disabled && Boolean(onChange) && max > min;

  const commit = useCallback((raw: number) => {
    if (!interactive) return;
    onChange?.(snapToStep(raw, min, max, step));
  }, [interactive, max, min, onChange, step]);

  const valueFromPointer = useCallback((clientX: number) => {
    if (!trackRef.current) return value;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return min + clamp(ratio, 0, 1) * (max - min);
  }, [max, min, value]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const pageStep = (max - min) * 0.1;
    let next: number | null = null;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = value + step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = value - step;
        break;
      case 'Home':
        next = min;
        break;
      case 'End':
        next = max;
        break;
      case 'PageUp':
        next = value + pageStep;
        break;
      case 'PageDown':
        next = value - pageStep;
        break;
    }

    if (next !== null) {
      event.preventDefault();
      commit(next);
    }
  }, [commit, interactive, max, min, step, value]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--s-3)' }}>
        <span id={labelId} style={{ ...labelStyle, display: 'inline-flex', alignItems: 'center', gap: 'var(--s-2)' }}>
          {icon ? <span aria-hidden="true" style={iconContainerStyle}>{icon}</span> : null}
          {label}
        </span>
        <span style={valueStyle}>{valueText}</span>
      </div>
      <div
        ref={trackRef}
        onPointerDown={(event) => {
          if (!interactive) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          setDragging(true);
          commit(valueFromPointer(event.clientX));
        }}
        onPointerMove={(event) => {
          if (!dragging) return;
          commit(valueFromPointer(event.clientX));
        }}
        onPointerUp={(event) => {
          if (!interactive) return;
          setDragging(false);
          commit(valueFromPointer(event.clientX));
        }}
        onPointerCancel={() => setDragging(false)}
        style={{
          position: 'relative',
          height: 18,
          cursor: interactive ? (dragging ? 'grabbing' : 'pointer') : 'not-allowed',
          opacity: disabled ? 0.45 : 1,
          userSelect: 'none',
        }}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 2,
          transform: 'translateY(-50%)',
          background: 'var(--line)',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: `${percentage}%`,
          height: 2,
          transform: 'translateY(-50%)',
          background: 'var(--fg)',
        }} />
        <div
          role="slider"
          tabIndex={interactive ? 0 : -1}
          aria-valuenow={Math.round(value)}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={valueText}
          aria-labelledby={labelId}
          aria-disabled={!interactive}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            position: 'absolute',
            top: '50%',
            left: `${percentage}%`,
            transform: 'translate(-50%, -50%)',
            width: 14,
            height: 14,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--line-strong)',
            borderRadius: 'var(--r-1)',
            cursor: interactive ? (dragging ? 'grabbing' : 'grab') : 'not-allowed',
            outline: focused ? '2px solid var(--accent)' : '2px solid transparent',
            outlineOffset: 2,
            boxSizing: 'border-box',
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}

export function LightControlTile({
  title,
  subtitle,
  status,
  capabilities,
  brightness,
  warmth,
  nightMode,
  updatingLabel,
  unavailableLabel,
  ariaLabel,
  onBrightnessChange,
  onWarmthChange,
  onNightModeChange,
}: LightControlTileProps) {
  const resolvedBrightness = capabilities.dimmer && brightness ? resolveBrightness(brightness) : undefined;
  const nightModeSupported = capabilities.nightMode ? nightMode : undefined;
  const nightModeActive = Boolean(nightModeSupported?.active);
  const baseWarmth = capabilities.warmth && warmth ? resolveWarmth(warmth) : undefined;
  const resolvedWarmth = baseWarmth
    ? { ...baseWarmth, label: nightModeActive ? 'Red' as const : baseWarmth.label }
    : undefined;
  const unavailable = status === 'unavailable';
  const updating = status === 'updating';
  const primaryStatus = getPrimaryStatus({
    status,
    brightness: resolvedBrightness,
    updatingLabel,
    unavailableLabel,
  });
  const generatedLabel = buildStatusSummary({
    title,
    subtitle,
    status,
    brightness: resolvedBrightness,
    warmth: resolvedWarmth,
    nightModeActive,
    updatingLabel,
    unavailableLabel,
  });

  return (
    <section aria-label={ariaLabel ?? generatedLabel} style={tileStyle}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--s-4)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)', minWidth: 0 }}>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--t-body)',
            lineHeight: 'var(--lh-snug)',
            fontWeight: 500,
            color: 'var(--fg)',
            overflowWrap: 'anywhere',
          }}>
            {title}
          </span>
          {subtitle ? (
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--t-small)',
              lineHeight: 'var(--lh-normal)',
              color: 'var(--fg-muted)',
              overflowWrap: 'anywhere',
            }}>
              {subtitle}
            </span>
          ) : null}
        </div>
        <span aria-hidden="true" style={{ ...iconContainerStyle, color: nightModeActive ? 'var(--alert)' : 'var(--fg-muted)' }}>
          <Lightbulb size={18} strokeWidth={1.5} />
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--t-h4)',
          lineHeight: 'var(--lh-tight)',
          color: unavailable ? 'var(--fg-subtle)' : nightModeActive ? 'var(--alert)' : 'var(--fg)',
          fontWeight: 500,
        }}>
          {primaryStatus}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-micro)',
          letterSpacing: 'var(--tr-label)',
          textTransform: 'uppercase',
          color: updating ? 'var(--live)' : unavailable ? 'var(--fg-subtle)' : 'var(--fg-muted)',
        }}>
          {getAvailabilityLabel(status, updatingLabel, unavailableLabel)}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-4)', marginTop: 'auto' }}>
        {resolvedBrightness ? (
          <TileSlider
            label={resolvedBrightness.label}
            value={resolvedBrightness.value}
            min={resolvedBrightness.min}
            max={resolvedBrightness.max}
            step={resolvedBrightness.step}
            valueText={formatPercent(resolvedBrightness.value)}
            disabled={unavailable}
            icon={<Lightbulb size={16} strokeWidth={1.5} />}
            onChange={onBrightnessChange}
          />
        ) : null}

        {resolvedWarmth ? (
          <TileSlider
            label="Warmth"
            value={resolvedWarmth.value}
            min={0}
            max={100}
            step={20}
            valueText={resolvedWarmth.label}
            disabled={unavailable || nightModeActive}
            icon={<ThermometerSun size={16} strokeWidth={1.5} />}
            onChange={onWarmthChange}
          />
        ) : null}

        {nightModeSupported ? (
          <Toggle
            checked={nightModeSupported.active}
            label={nightModeSupported.label ?? 'Night mode'}
            onLabel={nightModeSupported.activeLabel ?? 'Red LED'}
            offLabel={nightModeSupported.inactiveLabel ?? 'Off'}
            activeTone="alert"
            disabled={unavailable}
            onChange={onNightModeChange}
          />
        ) : null}
      </div>
    </section>
  );
}
