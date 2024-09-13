// prettier eslint
import type { Linter } from 'eslint'

import { resolveDefault } from '../util'

export async function prettier(): Promise<Linter.Config[]> {
  const [pluginPrettier, pluginPrettierRecommended] = await Promise.all([
    resolveDefault(import('eslint-plugin-prettier')),
    resolveDefault(import('eslint-plugin-prettier/recommended'))
  ] as const)
  return [
    {
      plugins: {
        prettier: pluginPrettier
      },
      ...pluginPrettierRecommended,
      rules: {
        'prettier/prettier': 'warn'
      }
    }
  ]
}
