import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ['**/dist', '**/.eslintrc.cjs'],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'eslint-config-prettier',
      'prettier'
    )
  ),
  {
    plugins: {
      'react-refresh': reactRefresh,
      import: fixupPluginRules(_import),
      react,
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      prettier,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
    },

    rules: {
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
          allowExportNames: ['meta', 'links', 'headers', 'loader', 'action'],
        },
      ],

      '@typescript-eslint/no-explicit-any': 'off',
      'prefer-const': 'off',
      'array-callback-return': 'off',
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/naming-convention': 'off',

      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      // 'no-restricted-imports': [
      //   'error',
      //   {
      //     patterns: ['.*'],
      //   },
      // ],

      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/no-cycle': 'off',
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object'],

          pathGroups: [
            {
              pattern:
                '{commons,components,constants,helpers,hooks,languages,libs,pages,redux,services,types,utils}/**/*',
              group: 'internal',
              position: 'before',
            },
          ],

          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
          },
        },
      ],

      'import/no-unused-modules': [
        'off',
        {
          unusedExports: true,
          ignoreExports: ['src/pages', 'src/languages'],
        },
      ],

      'max-classes-per-file': 'off',
      'no-console': 'warn',
    },
  },
];
