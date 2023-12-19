const { eslint } = require('@siberiacancode/eslint');

module.exports = {
  ...eslint.node,
  overrides: [
    ...eslint.node.overrides,
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off'
      }
    }
  ]
};
