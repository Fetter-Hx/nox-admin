/*
 * @Author: HX
 * @Date: 2024-09-12 16:03:10
 * @LastEditors: HX
 * @LastEditTime: 2024-09-29 14:57:37
 * @FilePath: \nox-monorepo\internal\lint-configs\eslint-config\src\configs\typescript.ts
 * @Description:
 *
 */
/** typescript eslint */
import type { Linter } from 'eslint'

import { resolveDefault } from '../util'

export async function typescript(): Promise<Linter.Config[]> {
  const [tsplugin, tsparser] = await Promise.all([
    resolveDefault(import('@typescript-eslint/eslint-plugin')),
    resolveDefault(import('@typescript-eslint/parser'))
  ] as const)
  return [
    {
      files: ['**/*.?([cm])[jt]s?(x)'],
      plugins: {
        // @ts-expect-error missing types
        '@typescript-eslint': tsplugin
      },
      languageOptions: {
        parser: tsparser
      },
      rules: {
        ...tsplugin.configs['eslint-recommended'].overrides?.[0].rules,
        ...tsplugin.configs.strict.rules,
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-check': false,
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': 'allow-with-description'
          }
        ],

        // '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': [
          'error',
          {
            allow: ['arrowFunctions', 'functions', 'methods']
          }
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'error',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
          }
        ],
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'unused-imports/no-unused-vars': 'off'
      }
    },
    {
      files: ['**/*.cjs'],
      rules: {
        '@typescript-eslint/no-require-imports': 'off'
      }
    }
  ]
}
