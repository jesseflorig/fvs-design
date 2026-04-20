import React, { useRef, useState, useEffect } from 'react';
import { Map, Marker, NavigationControl } from 'maplibre-gl';
import type { LngLatLike } from 'maplibre-gl';
import { mapStyle } from './mapStyle';

export interface Position {
  lat: number;
  lng: number;
}

export interface TrackingMapProps {
  /** Current position of the tracked object. Null hides the marker; map still renders. */
  position?: Position | null;
  /** Zoom level used when centering on a position. Default: 14. Range: 1–22. */
  zoom?: number;
  /** Optional CSS class applied to the root container div. */
  className?: string;
  /** Accessible name for the map region. Default: "Live tracking map". */
  'aria-label'?: string;
}

// IDs guard against duplicate injection on hot reload.
const PULSE_STYLE_ID = 'fvs-tracker-keyframes';
const FOCUS_STYLE_ID = 'fvs-tracker-focus';

function injectGlobalStyles(): void {
  if (!document.getElementById(PULSE_STYLE_ID)) {
    const el = document.createElement('style');
    el.id = PULSE_STYLE_ID;
    el.textContent =
      '@keyframes fvs-pulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(3);opacity:0}}';
    document.head.appendChild(el);
  }
  if (!document.getElementById(FOCUS_STYLE_ID)) {
    const el = document.createElement('style');
    el.id = FOCUS_STYLE_ID;
    // Override MapLibre's default focus ring with the FVS amber token.
    el.textContent =
      '.maplibregl-canvas-container:focus-visible{outline:2px solid var(--fvs-amber)!important;outline-offset:2px!important}';
    document.head.appendChild(el);
  }
}

function createPulseMarker(): HTMLElement {
  const container = document.createElement('div');
  Object.assign(container.style, {
    position: 'relative',
    width: '10px',
    height: '10px',
    cursor: 'default',
  });

  // Expanding ring — scales out and fades over 2 s
  const ring = document.createElement('div');
  Object.assign(ring.style, {
    position: 'absolute',
    inset: '0',
    borderRadius: '50%',
    background: 'var(--fvs-amber)',
    animation: 'fvs-pulse 2s ease-out infinite',
    transformOrigin: 'center',
    pointerEvents: 'none',
  });

  // Solid center dot — always visible
  const dot = document.createElement('div');
  Object.assign(dot.style, {
    position: 'absolute',
    inset: '0',
    borderRadius: '5px', // 5px radius on a 10px element — within 0-8px guideline
    background: 'var(--fvs-amber)',
    pointerEvents: 'none',
  });

  container.appendChild(ring);
  container.appendChild(dot);
  return container;
}

export function TrackingMap({
  position = null,
  zoom = 14,
  className,
  'aria-label': ariaLabel = 'Live tracking map',
}: TrackingMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize map on mount; destroy on unmount.
  // Intentionally empty deps — map lifecycle is tied to the component, not to props.
  useEffect(() => {
    if (!containerRef.current) return;

    injectGlobalStyles();

    const map = new Map({
      container: containerRef.current,
      style: mapStyle,
      // Use initial position for first center; subsequent changes handled by the position effect.
      center: position ? [position.lng, position.lat] as LngLatLike : [0, 20],
      zoom: position ? zoom : 2,
    });

    map.addControl(new NavigationControl(), 'bottom-right');
    map.on('load', () => setIsLoaded(true));

    mapRef.current = map;

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;
      setIsLoaded(false);
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update marker and viewport when position changes.
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    const map = mapRef.current;

    if (!position) {
      markerRef.current?.remove();
      markerRef.current = null;
      return;
    }

    const lngLat: LngLatLike = [position.lng, position.lat];

    if (markerRef.current) {
      markerRef.current.setLngLat(lngLat);
    } else {
      markerRef.current = new Marker({ element: createPulseMarker() })
        .setLngLat(lngLat)
        .addTo(map);
    }

    map.flyTo({ center: lngLat, zoom, essential: true });
  }, [position, isLoaded, zoom]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
      role="region"
      aria-label={ariaLabel}
    />
  );
}
