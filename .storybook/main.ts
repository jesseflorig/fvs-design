import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-vitest'
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  features: {
    componentsManifest: true,
  },
};

export default config;
