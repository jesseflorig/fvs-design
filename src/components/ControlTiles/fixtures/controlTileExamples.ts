import React from 'react';
import {
  Camera,
  CameraOff,
  DoorOpen,
  Home,
  LampDesk,
  MoonStar,
  Thermometer,
  VenetianMask,
} from 'lucide-react';
import { ControlTile } from '../ControlTile/ControlTile';
import type { ControlTileGridItem, ControlTileProps } from '../types';

const iconProps = {
  size: 18,
  strokeWidth: 1.5,
};

function icon(node: React.ElementType) {
  return React.createElement(node, iconProps);
}

function tile(props: ControlTileProps) {
  return React.createElement(ControlTile, props);
}

export const kitchenLightProps: ControlTileProps = {
  title: 'Kitchen lights',
  controlKind: 'toggle',
  state: 'on',
  stateLabel: 'On',
  contextLabel: 'Ceiling',
  toggleLabel: 'Turn off',
  icon: icon(LampDesk),
  interactive: true,
  selected: true,
  onToggle: () => {},
  ariaLabel: 'Kitchen lights on ceiling',
};

export const entrySensorProps: ControlTileProps = {
  title: 'Entry sensor',
  controlKind: 'summary',
  state: 'warning',
  stateLabel: 'Open',
  contextLabel: 'Detected 12 min ago',
  icon: icon(DoorOpen),
  ariaLabel: 'Entry sensor open detected 12 minutes ago',
};

export const thermostatSummaryProps: ControlTileProps = {
  title: 'Hall climate',
  controlKind: 'summary',
  state: 'off',
  stateLabel: 'Idle',
  contextLabel: '21 C target',
  icon: icon(Thermometer),
  ariaLabel: 'Hall climate idle 21 C target',
};

export const sceneTileProps: ControlTileProps = {
  title: 'Evening scene',
  controlKind: 'scene',
  state: 'off',
  stateLabel: 'Ready',
  contextLabel: 'Lights and shades',
  toggleLabel: 'Run scene',
  icon: icon(MoonStar),
  interactive: true,
  onPress: () => {},
  ariaLabel: 'Evening scene ready lights and shades',
};

export const transitioningShadesProps: ControlTileProps = {
  title: 'Hallway shades',
  controlKind: 'toggle',
  state: 'transitioning',
  stateLabel: 'Closing',
  contextLabel: 'Moving to 30%',
  toggleLabel: 'Pause',
  icon: icon(VenetianMask),
  interactive: true,
  selected: true,
  onToggle: () => {},
  ariaLabel: 'Hallway shades closing to 30 percent',
};

export const unavailableCameraProps: ControlTileProps = {
  title: 'Garage camera',
  controlKind: 'toggle',
  state: 'unavailable',
  stateLabel: 'Offline',
  contextLabel: 'Last update 08:14',
  toggleLabel: 'Unavailable',
  icon: icon(CameraOff),
  disabled: true,
  interactive: false,
  ariaLabel: 'Garage camera offline last update 08 14',
};

export const activeCameraProps: ControlTileProps = {
  title: 'Drive camera',
  controlKind: 'toggle',
  state: 'on',
  stateLabel: 'Recording',
  contextLabel: 'Live now',
  toggleLabel: 'Turn off',
  icon: icon(Camera),
  interactive: true,
  selected: true,
  onToggle: () => {},
  ariaLabel: 'Drive camera recording live now',
};

export const homeSummaryProps: ControlTileProps = {
  title: 'Living room',
  controlKind: 'summary',
  state: 'on',
  stateLabel: 'Comfort',
  contextLabel: '4 devices online',
  icon: icon(Home),
  ariaLabel: 'Living room comfort four devices online',
};

export const landscapeGridItems: ControlTileGridItem[] = [
  { key: 'kitchen', tile: tile(kitchenLightProps) },
  { key: 'entry', tile: tile(entrySensorProps) },
  { key: 'thermostat', tile: tile(thermostatSummaryProps) },
  { key: 'scene', tile: tile(sceneTileProps) },
  { key: 'camera', tile: tile(activeCameraProps) },
  { key: 'living', tile: tile(homeSummaryProps) },
];

export const portraitGridItems: ControlTileGridItem[] = [
  { key: 'kitchen', tile: tile(kitchenLightProps) },
  { key: 'entry', tile: tile(entrySensorProps) },
  { key: 'scene', tile: tile(sceneTileProps) },
  { key: 'shades', tile: tile(transitioningShadesProps) },
];

export const partialRowGridItems: ControlTileGridItem[] = [
  { key: 'kitchen', tile: tile(kitchenLightProps) },
  { key: 'entry', tile: tile(entrySensorProps) },
  { key: 'scene', tile: tile(sceneTileProps) },
];
