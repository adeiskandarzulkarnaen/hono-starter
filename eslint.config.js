import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{ts}'],
    ignores: ['**/node_modules/**', '**/dist/**', '**/*.test.ts'],
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'linebreak-style': ['error', 'unix'],
      'no-trailing-spaces': 'error',
      'indent': ['error', 2],
      'camelcase': 'error',
      'arrow-parens': ['error', 'always'],
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
      'func-call-spacing': ['error', 'never'],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'prefer-const': 'error',
      'no-var': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'prefer-template': 'error',
      'prefer-arrow-callback': 'error',
    },
  },
];
