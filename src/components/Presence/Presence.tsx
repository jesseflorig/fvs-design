import React, { useState } from 'react';

export type PresenceStatus = 'present' | 'near' | 'away';
export type PresenceSize = 'compact' | 'standard';

export interface PresencePerson {
  name?: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

export interface PresenceProps {
  person: PresencePerson;
  status: PresenceStatus;
  size?: PresenceSize;
  showStatusLabel?: boolean;
  ariaLabel?: string;
  className?: string;
}

const statusConfig: Record<PresenceStatus, {
  label: string;
  color: string;
  imageFilter: string;
  imageOpacity: number;
}> = {
  present: {
    label: 'Present',
    color: 'var(--info)',
    imageFilter: 'none',
    imageOpacity: 1,
  },
  near: {
    label: 'Near',
    color: 'var(--live)',
    imageFilter: 'none',
    imageOpacity: 1,
  },
  away: {
    label: 'Away',
    color: 'var(--offline)',
    imageFilter: 'grayscale(1) contrast(0.86)',
    imageOpacity: 0.62,
  },
};

const sizeConfig: Record<PresenceSize, {
  frame: string;
  image: string;
  label: string;
  gap: string;
  border: string;
}> = {
  compact: {
    frame: 'calc(var(--s-9) + var(--s-1))',
    image: 'calc(var(--s-8) + var(--s-1))',
    label: 'var(--t-micro)',
    gap: 'var(--s-2)',
    border: 'var(--s-1)',
  },
  standard: {
    frame: 'var(--s-10)',
    image: 'calc(var(--s-9) + var(--s-3) - var(--s-1))',
    label: 'var(--t-tiny)',
    gap: 'var(--s-3)',
    border: 'var(--s-1)',
  },
};

function normalizeStatus(status: PresenceStatus): PresenceStatus {
  return status in statusConfig ? status : 'away';
}

function getInitials(name?: string) {
  if (!name) return '';
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function getAccessibleLabel({
  ariaLabel,
  name,
  statusLabel,
}: {
  ariaLabel?: string;
  name?: string;
  statusLabel: string;
}) {
  if (ariaLabel) return ariaLabel;
  return name ? `${name}, ${statusLabel}` : `Presence status: ${statusLabel}`;
}

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

export function Presence({
  person,
  status,
  size = 'standard',
  showStatusLabel = true,
  ariaLabel,
  className,
}: PresenceProps) {
  const normalizedStatus = normalizeStatus(status);
  const config = statusConfig[normalizedStatus];
  const sizes = sizeConfig[size] ?? sizeConfig.standard;
  const [imageFailed, setImageFailed] = useState(false);
  const initials = getInitials(person.name);
  const hasAvatar = Boolean(person.avatarSrc) && !imageFailed;
  const accessibleLabel = getAccessibleLabel({
    ariaLabel,
    name: person.name,
    statusLabel: config.label,
  });

  const rootStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: sizes.gap,
    color: 'var(--fg)',
    verticalAlign: 'middle',
  };

  const frameStyle: React.CSSProperties = {
    width: sizes.frame,
    height: sizes.frame,
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `${sizes.border} solid ${config.color}`,
    borderRadius: 'var(--r-pill)',
    background: 'var(--bg-elevated)',
    boxShadow: 'var(--shadow-hair)',
    flex: '0 0 auto',
  };

  const imageStyle: React.CSSProperties = {
    width: sizes.image,
    height: sizes.image,
    display: 'block',
    objectFit: 'cover',
    borderRadius: 'var(--r-pill)',
    filter: config.imageFilter,
    opacity: config.imageOpacity,
  };

  const fallbackStyle: React.CSSProperties = {
    width: sizes.image,
    height: sizes.image,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--r-pill)',
    background: 'var(--bg-inset)',
    color: 'var(--fg-muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: size === 'compact' ? 'var(--t-micro)' : 'var(--t-small)',
    letterSpacing: 'var(--tr-data)',
    lineHeight: 1,
    filter: 'none',
    opacity: 1,
    userSelect: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--s-2)',
    fontFamily: 'var(--font-mono)',
    fontSize: sizes.label,
    letterSpacing: 'var(--tr-label)',
    textTransform: 'uppercase',
    color: config.color,
    lineHeight: 1,
    whiteSpace: 'nowrap',
  };

  const indicatorStyle: React.CSSProperties = {
    width: 'calc(var(--s-3) - var(--s-1))',
    height: 'calc(var(--s-3) - var(--s-1))',
    borderRadius: 'var(--r-pill)',
    background: 'currentColor',
    flex: '0 0 auto',
  };

  return (
    <span className={className} style={rootStyle} aria-label={accessibleLabel}>
      <span style={frameStyle} aria-hidden="true">
        {hasAvatar ? (
          <img
            src={person.avatarSrc}
            alt=""
            style={imageStyle}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span style={fallbackStyle}>{initials || '--'}</span>
        )}
      </span>
      <span style={showStatusLabel ? labelStyle : visuallyHiddenStyle}>
        <span aria-hidden="true" style={indicatorStyle} />
        {config.label}
      </span>
    </span>
  );
}
