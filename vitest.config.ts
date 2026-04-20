import { defineConfig, mergeConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import viteConfig from './vite.config';

export default mergeConfig(viteConfig, defineConfig({
  plugins: [storybookTest()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-dev-runtime'],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
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
}));
