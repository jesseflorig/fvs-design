import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  plugins: [storybookTest()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-dev-runtime'],
  },
  test: {
    name: 'storybook',
    server: {
      deps: {
        inline: [/@storybook\//],
      },
    },
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    coverage: {
      provider: 'istanbul',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.{ts,tsx}'],
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
    },
  },
});
