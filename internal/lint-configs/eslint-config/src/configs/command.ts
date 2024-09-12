import createCommand from 'eslint-plugin-command/config'
/**
 * @description 引入 eslint-plugin-command 插件
 * @see https://github.com/antfu/eslint-plugin-command 具体使用方法见文档
 */

export async function command() {
  return [
    {
      ...createCommand()
    }
  ]
}
