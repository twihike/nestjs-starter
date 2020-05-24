module.exports = {
  root: true,
  extends: ['@twihike'],
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  rules: {
    // Nest way
    'import/prefer-default-export': 'off',
    'no-useless-constructor': 'off',
    "@typescript-eslint/no-magic-numbers": "off",
  },
  overrides: [
    {
      files: ['src/**/*.dto.ts'],
      rules: {
        'max-classes-per-file': 'off',
      },
    },
    {
      files: ['src/**/*.spec.ts', 'test/**/*.e2e-spec.ts'],
      env: {
        jest: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
  ],
};
