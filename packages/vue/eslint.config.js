import { eslint } from '@siberiacancode/eslint';

export default eslint(
  {
    typescript: true,
    vue: true
  },
  {
    name: '@google-recaptcha/vue/md',
    files: ['**/*.md'],
    rules: {
      'style/max-len': 'off'
    }
  },
  {
    name: '@google-recaptcha/vue/docs',
    files: ['**/src/**/*.ts'],
    rules: {
      'regexp/no-super-linear-backtracking': 'off'
    }
  }
);
