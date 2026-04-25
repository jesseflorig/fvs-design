import React from 'react';
import type { Preview, Decorator } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/tokens/tokens.css';
import { fvsTheme } from './theme';

const withThemeBackground: Decorator = (Story) => (
  <div style={{ background: 'var(--bg)', minHeight: '100%', padding: '24px' }}>
    <Story />
  </div>
);

const preview: Preview = {
  globals: {
    theme: 'Light',
  },
  decorators: [
    withThemeByDataAttribute({
      themes: {
        Light: '',
        Console: 'console',
      },
      defaultTheme: 'Light',
      attributeName: 'data-theme',
    }),
    withThemeBackground,
  ],
  parameters: {
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: [
          'Brand',
          ['Logo', 'Blueprint', 'Typography', 'Iconography', 'Voice'],
          'Components',
          [],
          'Tokens',
          ['Colors', 'Typography', 'Spacing', 'Radius', 'Shadows', 'Motion'],
        ],
      },
    },
    docs: {
      theme: fvsTheme,
    },
  },
};

export default preview;
