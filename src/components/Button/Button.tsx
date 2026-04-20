import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'danger' | 'icon';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  'aria-label'?: string;
}

const base: React.CSSProperties = {
  fontFamily: 'var(--font-sans)',
  fontSize: 13,
  fontWeight: 500,
  lineHeight: 1,
  letterSpacing: '0.01em',
  borderRadius: 'var(--r-1)',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all var(--dur-fast) var(--ease-std)',
  outline: '2px solid transparent',
  outlineOffset: '2px',
};

const variants: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: 'var(--fvs-ink)',
    color: 'var(--fvs-paper)',
    border: '1px solid var(--fvs-ink)',
    padding: '9px 16px',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--fvs-ink)',
    border: '1px solid var(--fvs-slate)',
    padding: '9px 16px',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--fvs-ink)',
    border: '1px solid transparent',
    padding: '9px 16px',
  },
  accent: {
    background: 'var(--fvs-amber)',
    color: 'var(--fvs-black)',
    border: '1px solid var(--fvs-amber)',
    padding: '8px 14px',
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  danger: {
    background: 'transparent',
    color: 'var(--alert)',
    border: '1px solid var(--alert)',
    padding: '9px 16px',
  },
  icon: {
    width: 34,
    height: 34,
    padding: 0,
    background: 'var(--fvs-white)',
    border: '1px solid var(--line)',
    borderRadius: 'var(--r-1)',
    color: 'var(--fg)',
  },
};

const smOverride: React.CSSProperties = { padding: '6px 12px', fontSize: 12 };

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const style: React.CSSProperties = {
    ...base,
    ...variants[variant],
    ...(size === 'sm' && variant !== 'icon' ? smOverride : {}),
    ...(disabled ? { opacity: 0.45, cursor: 'not-allowed', pointerEvents: 'none' } : {}),
  };

  return (
    <button
      style={style}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseEnter={(e) => {
        if (disabled) return;
        const el = e.currentTarget;
        if (variant === 'primary') { el.style.background = 'var(--fvs-black)'; }
        if (variant === 'secondary') { el.style.background = 'var(--fvs-bone)'; el.style.borderColor = 'var(--fvs-ink)'; }
        if (variant === 'ghost') { el.style.background = 'var(--fvs-bone)'; }
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        const el = e.currentTarget;
        Object.assign(el.style, variants[variant]);
      }}
      onMouseDown={(e) => {
        if (disabled) return;
        e.currentTarget.style.transform = 'scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = '';
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = '2px solid var(--fvs-amber)';
        e.currentTarget.style.outlineOffset = '2px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = '2px solid transparent';
      }}
    >
      {children}
    </button>
  );
}
