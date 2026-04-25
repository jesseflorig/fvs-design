import React from 'react';
import type { ControlTileProps, TileState } from '../types';

const stateSurface: Record<TileState, { background: string; border: string; accent: string; chip: string }> = {
  off: {
    background: 'var(--bg-elevated)',
    border: 'var(--line)',
    accent: 'var(--fg-muted)',
    chip: 'var(--bg)',
  },
  on: {
    background: 'color-mix(in srgb, var(--bg-elevated) 86%, var(--accent) 14%)',
    border: 'var(--accent)',
    accent: 'var(--fg)',
    chip: 'color-mix(in srgb, var(--accent) 22%, var(--bg-elevated) 78%)',
  },
  transitioning: {
    background: 'color-mix(in srgb, var(--bg-elevated) 84%, var(--info) 16%)',
    border: 'var(--info)',
    accent: 'var(--fg)',
    chip: 'color-mix(in srgb, var(--info) 20%, var(--bg-elevated) 80%)',
  },
  warning: {
    background: 'color-mix(in srgb, var(--bg-elevated) 84%, var(--alert) 16%)',
    border: 'var(--alert)',
    accent: 'var(--fg)',
    chip: 'color-mix(in srgb, var(--alert) 18%, var(--bg-elevated) 82%)',
  },
  unavailable: {
    background: 'color-mix(in srgb, var(--bg-elevated) 92%, var(--offline) 8%)',
    border: 'var(--offline)',
    accent: 'var(--fg-subtle)',
    chip: 'var(--bg)',
  },
};

function ControlTileFrame({
  interactive,
  disabled,
  onPress,
  ariaLabel,
  children,
  state,
}: {
  interactive: boolean;
  disabled?: boolean;
  onPress?: () => void;
  ariaLabel?: string;
  children: React.ReactNode;
  state: TileState;
}) {
  const surface = stateSurface[state];
  const commonStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    minHeight: 'var(--fvs-control-tile-min-h)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 'var(--fvs-control-tile-section-gap)',
    padding: 'var(--fvs-control-tile-padding-y) var(--fvs-control-tile-padding-x)',
    border: '1px solid',
    borderColor: surface.border,
    borderRadius: 'var(--r-3)',
    background: surface.background,
    boxShadow: 'var(--shadow-hair)',
    color: 'var(--fg)',
    textAlign: 'left',
    transition: 'background var(--dur-fast) var(--ease-std), border-color var(--dur-fast) var(--ease-std), transform var(--dur-fast) var(--ease-std)',
  };

  if (interactive) {
    return (
      <button
        type="button"
        onClick={disabled ? undefined : onPress}
        disabled={disabled}
        aria-label={ariaLabel}
        style={{ ...commonStyle, cursor: disabled ? 'not-allowed' : 'pointer' }}
        onFocus={(event) => {
          event.currentTarget.style.outline = '2px solid var(--accent)';
          event.currentTarget.style.outlineOffset = '2px';
        }}
        onBlur={(event) => {
          event.currentTarget.style.outline = '2px solid transparent';
        }}
        onMouseDown={(event) => {
          if (!disabled) event.currentTarget.style.transform = 'translateY(1px)';
        }}
        onMouseUp={(event) => {
          event.currentTarget.style.transform = '';
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.transform = '';
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <div aria-label={ariaLabel} style={commonStyle}>
      {children}
    </div>
  );
}

function ToggleRail({
  selected,
  disabled,
  state,
  toggleLabel,
}: {
  selected?: boolean;
  disabled?: boolean;
  state: TileState;
  toggleLabel?: string;
}) {
  const active = Boolean(selected || state === 'on' || state === 'transitioning');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--fvs-control-tile-control-gap)',
        minHeight: 'var(--fvs-control-tile-toggle-height)',
        padding: 'var(--s-2) var(--s-3)',
        borderRadius: 'var(--r-pill)',
        background: disabled ? 'var(--bg)' : active ? 'var(--accent)' : 'var(--bg)',
        border: '1px solid',
        borderColor: disabled ? 'var(--line)' : active ? 'var(--accent)' : 'var(--line)',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--t-micro)',
          letterSpacing: 'var(--tr-label)',
          textTransform: 'uppercase',
          color: disabled ? 'var(--fg-subtle)' : active ? 'var(--fvs-black)' : 'var(--fg-muted)',
        }}
      >
        {toggleLabel ?? 'Toggle'}
      </span>
      <span
        aria-hidden="true"
        style={{
          width: 26,
          height: 14,
          display: 'inline-flex',
          alignItems: 'center',
          padding: 1,
          borderRadius: 'var(--r-pill)',
          background: active ? 'rgba(10, 10, 11, 0.22)' : 'var(--line)',
          justifyContent: active ? 'flex-end' : 'flex-start',
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: 'var(--r-pill)',
            background: active ? 'var(--fvs-black)' : 'var(--bg-elevated)',
          }}
        />
      </span>
    </div>
  );
}

export function ControlTile({
  title,
  subtitle,
  controlKind = 'summary',
  state,
  stateLabel,
  contextLabel,
  toggleLabel,
  icon,
  interactive = false,
  disabled = false,
  selected = false,
  onToggle,
  onPress,
  ariaLabel,
}: ControlTileProps) {
  const surface = stateSurface[state];
  const action = onToggle ?? onPress;
  const isInteractive = interactive && Boolean(action) && !disabled;

  return (
    <ControlTileFrame
      interactive={isInteractive}
      disabled={disabled}
      onPress={action}
      ariaLabel={ariaLabel}
      state={state}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fvs-control-tile-section-gap)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--s-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)', minWidth: 0 }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--t-body)',
                lineHeight: 'var(--lh-snug)',
                color: 'var(--fg)',
                fontWeight: 500,
              }}
            >
              {title}
            </span>
            {subtitle ? (
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'var(--t-small)',
                  lineHeight: 'var(--lh-normal)',
                  color: 'var(--fg-muted)',
                }}
              >
                {subtitle}
              </span>
            ) : null}
          </div>
          {icon ? (
            <span
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: surface.accent,
                flexShrink: 0,
              }}
            >
              {icon}
            </span>
          ) : null}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-3)' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--t-h3)',
              lineHeight: 'var(--lh-tight)',
              color: surface.accent,
              fontWeight: 500,
            }}
          >
            {stateLabel}
          </span>

          {contextLabel ? (
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--t-small)',
                lineHeight: 'var(--lh-normal)',
                color: disabled ? 'var(--fg-subtle)' : 'var(--fg-muted)',
                maxWidth: '26ch',
              }}
            >
              {contextLabel}
            </span>
          ) : null}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--fvs-control-tile-control-gap)' }}>
        {(controlKind === 'toggle' || controlKind === 'scene') ? (
          <ToggleRail
            selected={selected}
            disabled={disabled}
            state={state}
            toggleLabel={toggleLabel}
          />
        ) : null}

        {state === 'transitioning' ? (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--t-micro)',
              letterSpacing: 'var(--tr-label)',
              textTransform: 'uppercase',
              color: 'var(--fg-muted)',
            }}
          >
            Updating
          </span>
        ) : null}
      </div>
    </ControlTileFrame>
  );
}
