import { eslint } from '@siberiacancode/eslint';

export default eslint(
  { typescript: true, react: true, jsx: true },
  {
    name: '@google-recaptcha/react/ignores',
    ignores: ['*md']
  }
);
