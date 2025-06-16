import { eslint } from '@siberiacancode/eslint';

export default eslint(
  {
    typescript: true,
    react: true,
    jsx: true,
    next: true
  },
  {
    name: '@google-recaptcha/docs/rewrites',
    rules: {
      'ts/ban-ts-comment': 'warn'
    }
  }
);
