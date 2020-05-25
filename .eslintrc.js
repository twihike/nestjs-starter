module.exports = {
  root: true,
  extends: ['@twihike'],
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  overrides: [
    {
      files: ['src/**/*.module.ts'],
      rules: {
        '@typescript-eslint/no-extraneous-class': 'off',
      },
    },
    {
      files: ['src/**/*.entity.ts', 'src/**/*.resolver.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['src/**/*.spec.ts', 'test/**/*.e2e-spec.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      files: ['test/**/*.e2e-spec.ts'],
      rules: {
        'jest/expect-expect': 'off',
      },
    },
  ],
};
