import React from 'react';
import {
  Home,
  LayoutGrid,
  Thermometer,
  Lightbulb,
  Shield,
  Zap,
  Waves,
  DoorClosed,
} from 'lucide-react';
import type { NavigationItem } from './types';

const iconProps = {
  size: 'var(--s-5)',
  strokeWidth: 1.75,
};

export const dashboardNavigationItems: NavigationItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    href: '#overview',
    icon: <Home {...iconProps} />,
  },
  {
    id: 'rooms',
    label: 'Rooms',
    href: '#rooms',
    icon: <LayoutGrid {...iconProps} />,
    meta: '12',
  },
  {
    id: 'climate',
    label: 'Climate',
    href: '#climate',
    icon: <Thermometer {...iconProps} />,
  },
  {
    id: 'lighting',
    label: 'Lighting',
    href: '#lighting',
    icon: <Lightbulb {...iconProps} />,
  },
  {
    id: 'security',
    label: 'Security',
    href: '#security',
    icon: <Shield {...iconProps} />,
  },
  {
    id: 'energy',
    label: 'Energy',
    href: '#energy',
    icon: <Zap {...iconProps} />,
    disabled: true,
  },
];

export const sidebarNavigationItems: NavigationItem[] = [
  ...dashboardNavigationItems,
  {
    id: 'water',
    label: 'Water',
    href: '#water',
    icon: <Waves {...iconProps} />,
  },
  {
    id: 'entry',
    label: 'Entry',
    href: '#entry',
    icon: <DoorClosed {...iconProps} />,
    meta: 'armed',
  },
];

export const systemSummaries = [
  { label: 'Lighting', value: '18 active', tone: 'Live' },
  { label: 'Climate', value: '71 F', tone: 'Nominal' },
  { label: 'Security', value: 'Armed home', tone: 'Ready' },
  { label: 'Energy', value: '3.2 kW', tone: 'Current' },
];

export const roomRows = [
  { room: 'Kitchen', climate: '70 F', lighting: 'Scene: Prep', security: 'Clear' },
  { room: 'Living Room', climate: '72 F', lighting: 'Dimmed 42%', security: 'Clear' },
  { room: 'Primary', climate: '68 F', lighting: 'Night', security: 'Clear' },
];
