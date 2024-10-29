/*
 * @Author: HX
 * @Date: 2024-10-28 17:10:50
 * @LastEditors: HX
 * @LastEditTime: 2024-10-29 15:07:11
 * @FilePath: \nox-monorepo\internal\postcss-config\src\index.ts
 * @Description: postcss通用配置文件
 * postcss具有插件自动查找机制 不需要显示引入
 */

import tailwindConfig from './tailwind.config'

export default {
  plugins: {
    // 生产环境使用cssnano进行压缩
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    'postcss-import': {},
    autoprefixer: {},
    // 默认使用的是postcss-nested插件来解开嵌套规则 确保嵌套插件能够理解tailwindcss的一些语法 例如@apply @screen等
    /** @see https://www.npmjs.com/package/@tailwindcss/nesting */
    'tailwindcss/nesting': {},
    // 这里通过postcss配置指定了自定义配置路径 在实际使用的项目中则可以不显示创建tailwind.config.js 但是不推荐
    tailwindcss: { config: tailwindConfig }
  }
}
