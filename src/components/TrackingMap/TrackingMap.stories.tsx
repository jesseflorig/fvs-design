import 'maplibre-gl/dist/maplibre-gl.css';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { TrackingMap } from './TrackingMap';
import type { Position } from './TrackingMap';

const meta: Meta<typeof TrackingMap> = {
  title: 'Components/TrackingMap',
  component: TrackingMap,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: 480, width: '100%' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    zoom: { control: { type: 'range', min: 1, max: 22, step: 1 } },
    'aria-label': { control: 'text' },
  },
};
export default meta;
type Story = StoryObj<typeof TrackingMap>;

// ─── US1: View live object location ─────────────────────────────────────────

export const Default: Story = {
  name: 'Default (static position)',
  args: {
    position: { lat: 37.7749, lng: -122.4194 },
    zoom: 14,
  },
};

export const NoPosition: Story = {
  name: 'No Position (signal lost)',
  args: {
    position: null,
  },
};

// ─── US2: Follow a moving object ─────────────────────────────────────────────

const LIVE_COORDS: Position[] = [
  { lat: 37.7749, lng: -122.4194 }, // San Francisco
  { lat: 37.7850, lng: -122.4050 }, // ~1.5 km NE
  { lat: 37.7650, lng: -122.4300 }, // ~1.5 km SW
  { lat: 37.7800, lng: -122.4400 }, // ~1.8 km W
];

export const Live: Story = {
  name: 'Live (position updates every 2 s)',
  render: () => {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
      const id = setInterval(() => setIdx((i) => (i + 1) % LIVE_COORDS.length), 2000);
      return () => clearInterval(id);
    }, []);

    return (
      <TrackingMap
        position={LIVE_COORDS[idx]}
        zoom={14}
        aria-label="Live van tracking"
      />
    );
  },
};

// ─── US3: Pan and zoom / accessibility ───────────────────────────────────────

export const AccessibilityCheck: Story = {
  name: 'Accessibility (aria-label, focus ring)',
  args: {
    position: { lat: 37.7749, lng: -122.4194 },
    zoom: 14,
    'aria-label': 'Van location map',
  },
};
