import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  staticDirs: ['../src'],
  stories: ['./stories/**/*.stories.@(js|ts)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  docs: { autodocs: true },
  typescript: {
    check: true
  }
};

export default config;
