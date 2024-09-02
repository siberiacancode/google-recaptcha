import { eslint } from '@siberiacancode/eslint';

export default eslint({ typescript: true, react: true, jsx: true, 'jsx-a11y': true }, {
    ignores: ["*md"]
});
