import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  staticDirs: ['../src'],
  stories: ['./stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: { autodocs: true },
  webpackFinal: async (config, { configType }) => {
    if (config?.module?.rules) {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              reportFiles: ['../**/**/*.{ts,tsx}']
            }
          }
        ]
      });
    }

    if (config?.resolve?.extensions) config.resolve.extensions.push('.ts', '.tsx');

    return config;
  }
};

export default config;
