/**
 * TrackingMap component interface contract
 * Branch: 005-maplibre-tracking
 *
 * This file is the source of truth for the component's public API surface.
 * The implementation must satisfy every prop defined here without extension or omission.
 */

/** Geographic coordinate pair. */
export interface Position {
  /** Latitude in decimal degrees. Valid range: −90 to +90. */
  lat: number;
  /** Longitude in decimal degrees. Valid range: −180 to +180. */
  lng: number;
}

export interface TrackingMapProps {
  /**
   * Current position of the tracked object.
   * - Providing a Position renders the dot + pulse marker at that location.
   * - Providing null hides the marker; the map remains interactive.
   * - Omitting the prop is equivalent to null.
   */
  position?: Position | null;

  /**
   * Map zoom level used when centering on a new position.
   * Range: 1–22. Default: 14.
   */
  zoom?: number;

  /**
   * Optional CSS class applied to the root container div.
   * The container must have an explicit height set by the consumer — the component
   * does not impose a default height.
   */
  className?: string;

  /**
   * Accessible name for the map region element.
   * Defaults to "Live tracking map".
   */
  'aria-label'?: string;
}
