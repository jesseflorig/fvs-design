import type { LightControlTileProps } from '../types';

export const dimmableLightProps: LightControlTileProps = {
  title: 'Kitchen lights',
  subtitle: 'Ceiling circuit',
  status: 'available',
  capabilities: {
    dimmer: true,
    warmth: false,
    nightMode: false,
  },
  brightness: {
    value: 70,
    label: 'Brightness',
  },
  ariaLabel: 'Kitchen lights ceiling circuit available brightness 70 percent',
};

export const effectivelyOffLightProps: LightControlTileProps = {
  ...dimmableLightProps,
  title: 'Entry light',
  subtitle: 'Vestibule',
  brightness: {
    value: 0,
    label: 'Brightness',
  },
  ariaLabel: 'Entry light vestibule available brightness 0 percent off',
};

export const tunableWarmthLightProps: LightControlTileProps = {
  title: 'Dining pendant',
  subtitle: 'Table zone',
  status: 'available',
  capabilities: {
    dimmer: true,
    warmth: true,
    nightMode: false,
  },
  brightness: {
    value: 58,
    label: 'Brightness',
  },
  warmth: {
    value: 24,
    label: 'Daylight',
  },
  ariaLabel: 'Dining pendant table zone available brightness 58 percent warmth Daylight',
};

export const dimmerOnlyLightProps: LightControlTileProps = {
  title: 'Porch sconce',
  subtitle: 'Exterior',
  status: 'available',
  capabilities: {
    dimmer: true,
    warmth: false,
    nightMode: false,
  },
  brightness: {
    value: 42,
    label: 'Brightness',
  },
  ariaLabel: 'Porch sconce exterior available brightness 42 percent',
};

export const nightModeLightProps: LightControlTileProps = {
  title: 'Hall night light',
  subtitle: 'Lower hall',
  status: 'available',
  capabilities: {
    dimmer: true,
    warmth: false,
    nightMode: true,
  },
  brightness: {
    value: 18,
    label: 'Brightness',
  },
  nightMode: {
    active: false,
    label: 'Night mode',
    activeLabel: 'On',
    inactiveLabel: 'Off',
  },
  ariaLabel: 'Hall night light lower hall available brightness 18 percent night mode off',
};

export const fullCapabilityLightProps: LightControlTileProps = {
  title: 'Bedroom lamp',
  subtitle: 'Left side',
  status: 'available',
  capabilities: {
    dimmer: true,
    warmth: true,
    nightMode: true,
  },
  brightness: {
    value: 46,
    label: 'Brightness',
  },
  warmth: {
    value: 52,
    label: 'Soft White',
  },
  nightMode: {
    active: true,
    label: 'Night mode',
    activeLabel: 'On',
    inactiveLabel: 'Off',
  },
  ariaLabel: 'Bedroom lamp left side available brightness 46 percent warmth Soft White night mode red LED active',
};

export const updatingLightProps: LightControlTileProps = {
  ...fullCapabilityLightProps,
  title: 'Studio rail',
  subtitle: 'Work bench',
  status: 'updating',
  updatingLabel: 'Updating',
  brightness: {
    value: 64,
    label: 'Brightness',
  },
  warmth: {
    value: 78,
    label: 'Warm White',
  },
  nightMode: {
    active: false,
    label: 'Night mode',
    activeLabel: 'On',
    inactiveLabel: 'Off',
  },
  ariaLabel: 'Studio rail work bench updating brightness 64 percent warmth Warm White night mode off',
};

export const unavailableLightProps: LightControlTileProps = {
  ...fullCapabilityLightProps,
  title: 'Garage strip',
  subtitle: 'Last update 08:14',
  status: 'unavailable',
  unavailableLabel: 'Unavailable',
  brightness: {
    value: 31,
    label: 'Brightness',
  },
  warmth: {
    value: 18,
    label: 'Daylight',
  },
  nightMode: {
    active: false,
    label: 'Night mode',
    activeLabel: 'On',
    inactiveLabel: 'Off',
  },
  ariaLabel: 'Garage strip unavailable last update 08 14 brightness 31 percent warmth Daylight night mode off',
};
