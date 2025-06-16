import { eslint } from '@siberiacancode/eslint';

export default eslint(
  { typescript: true, react: true, jsx: true },
  {
    name: '@google-recaptcha/react/ignores',
    ignores: ['*md']
  },
  {
    name: '@google-recaptcha/react/rewrites',
    rules: {
      'react/no-context-provider': 'off',
      'ts/ban-ts-comment': 'warn'
    }
  }
);
