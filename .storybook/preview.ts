import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/tokens/tokens.css';
import { fvsTheme } from './theme';

const preview: Preview = {
  decorators: [
    withThemeByDataAttribute({
      themes: {
        Light: '',
        Console: 'console',
      },
      defaultTheme: 'Light',
      attributeName: 'data-theme',
    }),
  ],
  parameters: {
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
