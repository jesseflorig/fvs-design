import React, { useId, useRef, useState, useCallback } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SliderProps {
  /** Controlled current value. When provided, component is controlled. */
  value?: number;
  /** Uncontrolled initial value. Used only when `value` is not provided. Default: min */
  defaultValue?: number;
  /** Minimum bound (inclusive). Default: 0 */
  min?: number;
  /** Maximum bound (inclusive). Default: 100 */
  max?: number;
  /** Increment/decrement unit. Default: 1 */
  step?: number;
  /** Fired on every value change (pointer or keyboard). */
  onChange?: (value: number) => void;
  /** Suppresses all interaction. Default: false */
  disabled?: boolean;
  /** Shows numeric value label below track. Default: false */
  showValue?: boolean;
  /** Unit suffix appended to value label when showValue is true. */
  unit?: string;
  /** Field label rendered above track in mono uppercase. */
  label?: string;
  /** Accessible name override when no label prop is provided. */
  'aria-label'?: string;
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function snapToStep(raw: number, min: number, max: number, step: number): number {
  const s = step > 0 ? step : 1;
  const snapped = Math.round((raw - min) / s) * s + min;
  return clamp(snapped, min, max);
}

function computePercentage(value: number, min: number, max: number): number {
  if (min >= max) return 0;
  return clamp(((value - min) / (max - min)) * 100, 0, 100);
}

// ── Styles ────────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--fg-muted)',
};

const fieldWrap: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
};

const valueStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  color: 'var(--fg-muted)',
};

// ── Component ─────────────────────────────────────────────────────────────────

export function Slider({
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  showValue = false,
  unit,
  label,
  'aria-label': ariaLabel,
}: SliderProps) {
  const labelId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState(() =>
    clamp(defaultValue ?? min, min, max)
  );
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const currentValue = value !== undefined ? clamp(value, min, max) : internalValue;
  const percentage = computePercentage(currentValue, min, max);
  const isInteractive = !disabled && min < max;

  const commit = useCallback((raw: number) => {
    const next = snapToStep(raw, min, max, step);
    if (value === undefined) setInternalValue(next);
    onChange?.(next);
  }, [min, max, step, value, onChange]);

  const valueFromPointer = useCallback((clientX: number): number => {
    if (!trackRef.current) return currentValue;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return min + clamp(ratio, 0, 1) * (max - min);
  }, [currentValue, min, max]);

  // ── Pointer handlers on track container ──────────────────────────────────

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    commit(valueFromPointer(e.clientX));
  }, [isInteractive, commit, valueFromPointer]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging || !isInteractive) return;
    commit(valueFromPointer(e.clientX));
  }, [dragging, isInteractive, commit, valueFromPointer]);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    setDragging(false);
    commit(valueFromPointer(e.clientX));
  }, [isInteractive, commit, valueFromPointer]);

  // ── Keyboard handler on thumb ─────────────────────────────────────────────

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive) return;
    const pageStep = (max - min) * 0.1;
    let next: number | null = null;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = currentValue + step; break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = currentValue - step; break;
      case 'End':
        next = max; break;
      case 'Home':
        next = min; break;
      case 'PageUp':
        next = currentValue + pageStep; break;
      case 'PageDown':
        next = currentValue - pageStep; break;
    }

    if (next !== null) {
      e.preventDefault();
      commit(next);
    }
  }, [isInteractive, currentValue, min, max, step, commit]);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div style={fieldWrap}>
      {label && (
        <span id={labelId} style={labelStyle}>{label}</span>
      )}

      {/* Track container — pointer events live here */}
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          position: 'relative',
          height: 20,
          cursor: disabled ? 'not-allowed' : dragging ? 'grabbing' : 'pointer',
          opacity: disabled ? 0.45 : 1,
          userSelect: 'none',
        }}
      >
        {/* Track rail */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 2,
          transform: 'translateY(-50%)',
          background: 'var(--line)',
        }} />

        {/* Track fill */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: `${percentage}%`,
          height: 2,
          transform: 'translateY(-50%)',
          background: 'var(--fg)',
        }} />

        {/* Thumb — keyboard + ARIA live here */}
        <div
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuenow={currentValue}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={unit ? `${currentValue} ${unit}` : String(currentValue)}
          aria-label={label ? undefined : (ariaLabel ?? 'Slider')}
          aria-labelledby={label ? labelId : undefined}
          aria-disabled={disabled}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            position: 'absolute',
            top: '50%',
            left: `${percentage}%`,
            transform: 'translate(-50%, -50%)',
            width: 16,
            height: 16,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--line-strong)',
            borderRadius: 'var(--r-1)',
            cursor: disabled ? 'not-allowed' : dragging ? 'grabbing' : 'grab',
            outline: focused ? '2px solid var(--fvs-amber)' : '2px solid transparent',
            outlineOffset: 2,
            boxSizing: 'border-box',
            zIndex: 1,
          }}
        />
      </div>

      {/* Value label */}
      {showValue && (
        <span style={valueStyle}>
          {currentValue}{unit ?? ''}
        </span>
      )}
    </div>
  );
}
