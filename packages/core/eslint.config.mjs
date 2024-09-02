import { eslint } from '@siberiacancode/eslint';

export default eslint({ typescript: true }, {
    rules: {
        'ts/no-namespace': 'off'
    }
});
