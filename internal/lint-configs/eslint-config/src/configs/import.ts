// import eslint
import type { Linter } from 'eslint'

import { resolveDefault } from '../util'
/**
 * 导入相关的规则配置
 *
 */

export async function importEslintConfig(): Promise<Linter.Config[]> {
  const pluginImport = await resolveDefault(import('eslint-plugin-import-x'))
  return [
    {
      plugins: {
        // @ts-expect-error dynamic import
        import: pluginImport
      },
      rules: {
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-unresolved': 'off',
        'import/no-webpack-loader-syntax': 'error'
      }
    }
  ]
}
