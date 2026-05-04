import React from 'react';
import type { NavigationItem, SidebarProps } from './types';

const visuallyHiddenStyle: React.CSSProperties = {
  position: 'absolute',
  width: 'var(--s-1)',
  height: 'var(--s-1)',
  padding: 0,
  margin: 'calc(-1 * var(--s-1))',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
};

function getItemStyle(active: boolean, disabled: boolean, focused: boolean, collapsed: boolean) {
  return {
    appearance: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: collapsed ? 'center' : 'flex-start',
    gap: 'var(--s-3)',
    width: '100%',
    minHeight: 'var(--s-9)',
    padding: collapsed ? 'var(--s-3)' : 'var(--s-3) var(--s-4)',
    border: 'var(--s-1) solid transparent',
    borderLeftColor: active ? 'var(--fg)' : 'transparent',
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
    boxShadow: active ? 'inset var(--s-1) 0 0 var(--fg)' : 'none',
    whiteSpace: 'nowrap',
  } satisfies React.CSSProperties;
}

function renderSidebarItem({
  item,
  activeId,
  collapsed,
  focusedId,
  setFocusedId,
}: {
  item: NavigationItem;
  activeId?: string;
  collapsed: boolean;
  focusedId: string | null;
  setFocusedId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const active = item.active ?? item.id === activeId;
  const disabled = Boolean(item.disabled);
  const labelStyle = collapsed ? visuallyHiddenStyle : undefined;
  const content = (
    <>
      {item.icon && (
        <span aria-hidden="true" style={{ display: 'inline-flex', flex: '0 0 auto' }}>
          {item.icon}
        </span>
      )}
      <span style={labelStyle}>{item.label}</span>
      {item.meta && !collapsed && (
        <span
          style={{
            marginLeft: 'auto',
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
    'aria-label': collapsed ? item.label : undefined,
    onFocus: () => setFocusedId(item.id),
    onBlur: () => setFocusedId(null),
    style: getItemStyle(active, disabled, focusedId === item.id, collapsed),
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

export function Sidebar({
  items,
  activeId,
  label = 'Secondary navigation',
  collapsed = false,
  children,
  className,
}: SidebarProps) {
  const [focusedId, setFocusedId] = React.useState<string | null>(null);

  return (
    <aside
      aria-label={`${label} panel`}
      className={className}
      style={{
        width: collapsed ? 'var(--s-10)' : 'calc(var(--s-12) * 2)',
        maxWidth: '100%',
        border: 'var(--s-1) solid var(--line)',
        borderRadius: 'var(--r-2)',
        background: 'var(--bg-elevated)',
        padding: 'var(--s-3)',
        color: 'var(--fg)',
      }}
    >
      {items && (
        <nav aria-label={label}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s-2)' }}>
            {items.map((item) => renderSidebarItem({
              item,
              activeId,
              collapsed,
              focusedId,
              setFocusedId,
            }))}
          </div>
        </nav>
      )}
      {children && (
        <div style={{ marginTop: items ? 'var(--s-5)' : 0 }}>
          {children}
        </div>
      )}
    </aside>
  );
}
