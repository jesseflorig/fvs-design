import { create } from 'storybook/theming';

export const fvsTheme = create({
  base: 'dark',

  brandTitle: 'Fleet Van Systems',
  brandImage: '/src/assets/svg/mark.svg',
  brandUrl: '/',

  // App chrome
  appBg:        '#0A0A0B',
  appContentBg: '#151517',
  appBorderColor: '#2A2A2E',
  appBorderRadius: 2,

  // Accent
  colorPrimary:   '#E8A33D',
  colorSecondary: '#E8A33D',

  // Typography
  fontBase: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
  fontCode: "'Space Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace",

  // Text
  textColor:       '#E8E7E2',
  textMutedColor:  '#6A6A72',
  textInverseColor:'#0A0A0B',

  // Toolbar
  barTextColor:        '#A8A8AE',
  barHoverColor:       '#E8E7E2',
  barSelectedColor:    '#E8A33D',
  barBg:               '#0A0A0B',

  // Input
  inputBg:           '#1E1E22',
  inputBorder:       '#2A2A2E',
  inputTextColor:    '#E8E7E2',
  inputBorderRadius: 2,
});
