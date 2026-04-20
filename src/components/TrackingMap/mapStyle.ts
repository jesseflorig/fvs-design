import type { StyleSpecification } from 'maplibre-gl';

// FVS dark basemap style using OpenFreeMap vector tiles (OpenMapTiles schema).
//
// MapLibre's WebGL renderer processes this object outside the CSS cascade, so
// CSS custom properties (var(--fvs-*)) cannot be used here. The hex values
// below are the exact literal values of the corresponding FVS tokens.
//
// Token cross-reference:
//   #0A0A0B  --fvs-black
//   #151517  --fvs-ink
//   #2A2A2E  --fvs-graphite
//   #3A3A3E  between --fvs-graphite and --fvs-slate (no direct token)
//   #8A8A93  --fvs-steel

export const mapStyle: StyleSpecification = {
  version: 8,
  name: 'FVS Dark',
  sources: {
    openmaptiles: {
      type: 'vector',
      url: 'https://tiles.openfreemap.org/planet',
      attribution:
        '© <a href="https://openfreemap.org" target="_blank">OpenFreeMap</a> ' +
        '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
    },
  },
  layers: [
    {
      id: 'background',
      type: 'background',
      paint: { 'background-color': '#0A0A0B' }, // --fvs-black
    },
    {
      id: 'water',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'water',
      paint: { 'fill-color': '#151517' }, // --fvs-ink
    },
    {
      id: 'landcover',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'landcover',
      paint: { 'fill-color': '#0F0F11', 'fill-opacity': 0.6 },
    },
    {
      id: 'building',
      type: 'fill',
      source: 'openmaptiles',
      'source-layer': 'building',
      minzoom: 12,
      paint: {
        'fill-color': '#1A1A1C',
        'fill-outline-color': '#2A2A2E', // --fvs-graphite
      },
    },
    {
      id: 'road-minor',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['match', ['get', 'class'], ['minor', 'service', 'track', 'path'], true, false],
      paint: {
        'line-color': '#2A2A2E', // --fvs-graphite
        'line-width': ['interpolate', ['linear'], ['zoom'], 12, 0.5, 18, 2],
      },
    },
    {
      id: 'road-secondary',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['match', ['get', 'class'], ['secondary', 'tertiary'], true, false],
      paint: {
        'line-color': '#333338',
        'line-width': ['interpolate', ['linear'], ['zoom'], 10, 0.5, 18, 3],
      },
    },
    {
      id: 'road-primary',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'transportation',
      filter: ['match', ['get', 'class'], ['primary', 'trunk', 'motorway'], true, false],
      paint: {
        'line-color': '#3A3A3E', // between --fvs-graphite and --fvs-slate
        'line-width': ['interpolate', ['linear'], ['zoom'], 8, 0.5, 18, 4],
      },
    },
    {
      id: 'boundary-admin',
      type: 'line',
      source: 'openmaptiles',
      'source-layer': 'boundary',
      filter: ['==', ['get', 'admin_level'], 2],
      paint: {
        'line-color': '#2A2A2E', // --fvs-graphite
        'line-width': 0.5,
        'line-dasharray': [4, 2],
      },
    },
  ],
};
