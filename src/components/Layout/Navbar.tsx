import React from 'react';
import type { NavbarProps, NavigationItem } from './types';

function renderItemIcon(icon: React.ReactNode) {
  if (!icon) return null;
  return (
    <span aria-hidden="true" style={{ display: 'inline-flex', flex: '0 0 auto' }}>
      {icon}
    </span>
  );
}

function getItemStyle({
  active,
  disabled,
  focused,
}: {
  active: boolean;
  disabled: boolean;
  focused: boolean;
}): React.CSSProperties {
  return {
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--s-2)',
    minHeight: 'var(--s-9)',
    padding: 'var(--s-3) var(--s-4)',
    border: 'var(--s-1) solid transparent',
    borderBottomColor: active ? 'var(--fg)' : 'transparent',
    borderRadius: 'var(--r-1)',
    background: active ? 'var(--bg-inset)' : 'transparent',
    color: disabled ? 'var(--fg-subtle)' : 'var(--fg)',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--t-small)',
    lineHeight: 1,
    fontWeight: active ? 600 : 500,
    textDecoration: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.62 : 1,
    outline: focused ? 'var(--s-1) solid var(--accent)' : 'var(--s-1) solid transparent',
    outlineOffset: 'var(--s-1)',
    boxShadow: active ? 'inset 0 calc(-1 * var(--s-1)) 0 var(--fg)' : 'none',
    whiteSpace: 'nowrap',
  };
}

function renderNavigationItem(
  item: NavigationItem,
  activeId: string | undefined,
  focusedId: string | null,
  setFocusedId: React.Dispatch<React.SetStateAction<string | null>>,
) {
  const active = item.active ?? item.id === activeId;
  const disabled = Boolean(item.disabled);
  const content = (
    <>
      {renderItemIcon(item.icon)}
      <span>{item.label}</span>
      {item.meta && (
        <span
          style={{
            color: 'var(--fg-muted)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--t-micro)',
            letterSpacing: 'var(--tr-data)',
          }}
        >
          {item.meta}
        </span>
      )}
    </>
  );
  const sharedProps = {
    'aria-current': active ? 'page' as const : undefined,
    'aria-disabled': disabled || undefined,
    onFocus: () => setFocusedId(item.id),
    onBlur: () => setFocusedId(null),
    style: getItemStyle({ active, disabled, focused: focusedId === item.id }),
  };

  if (item.href) {
    return (
      <a
        key={item.id}
        {...sharedProps}
        href={disabled ? undefined : item.href}
        tabIndex={disabled ? -1 : undefined}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          item.onSelect?.(item.id);
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      key={item.id}
      {...sharedProps}
      type="button"
      disabled={disabled}
      onClick={() => item.onSelect?.(item.id)}
    >
      {content}
    </button>
  );
}

export function Navbar({
  items,
  activeId,
  leading,
  actions,
  label = 'Primary navigation',
  compactBehavior = 'wrap',
  className,
}: NavbarProps) {
  const [focusedId, setFocusedId] = React.useState<string | null>(null);

  return (
    <nav
      aria-label={label}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--s-4)',
        padding: 'var(--s-3) var(--s-4)',
        border: 'var(--s-1) solid var(--line)',
        borderRadius: 'var(--r-2)',
        background: 'var(--bg-elevated)',
        color: 'var(--fg)',
        minWidth: 0,
      }}
    >
      {leading && (
        <div style={{ flex: '0 0 auto', minWidth: 0 }}>
          {leading}
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flex: '1 1 auto',
          flexWrap: compactBehavior === 'wrap' ? 'wrap' : 'nowrap',
          gap: 'var(--s-2)',
          overflowX: compactBehavior === 'scroll' ? 'auto' : 'visible',
          minWidth: 0,
        }}
      >
        {items.map((item) => renderNavigationItem(item, activeId, focusedId, setFocusedId))}
      </div>
      {actions && (
        <div style={{ flex: '0 0 auto' }}>
          {actions}
        </div>
      )}
    </nav>
  );
}
