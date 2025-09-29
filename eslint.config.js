import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    '@tanstack/query',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error', // Prettier 규칙 위반시 ESLint 에러
    'react/react-in-jsx-scope': 'off', // React 17+ 불필요
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    react: { version: 'detect' },
  },
});
