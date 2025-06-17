import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  staticDirs: ['../src'],
  stories: ['./stories/**/*.stories.@(js|ts)'],
  addons: ['@storybook/addon-links'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  typescript: {
    check: true
  }
};

export default config;
