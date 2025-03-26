import { eslint } from '@siberiacancode/eslint';

export default eslint(
  { typescript: true },
  {
    name: '@google-recaptcha/core/rewrites',
    rules: {
      'ts/no-namespace': 'off',
      'ts/method-signature-style': 'off'
    }
  }
);
