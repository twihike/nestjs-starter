module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    // Nest way
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
    'no-useless-constructor': 'off',
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
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js'],
      },
    },
  },
};
