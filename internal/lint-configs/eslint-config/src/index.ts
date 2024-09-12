import type { Linter } from 'eslint'
import { command, prettier, typescript, ignores } from './configs'

/**
 * eslint配置对象的类型
 */
type FlatConfig = Linter.Config

/**
 * 动态导入的eslint配置
 */
type FlatConfigPromie = FlatConfig | FlatConfig[] | Promise<FlatConfig | FlatConfig[]>

/**
 *
 * @param config 要传入的定制的eslint配置
 */
async function defineEslintConfig(config: FlatConfig[] = []) {
  const configs: FlatConfigPromie[] = [command(), prettier(), typescript(), ignores(), ...config]

  const resolved = await Promise.all(configs)

  return resolved.flat() // 扁平化处理
}

export { defineEslintConfig }
