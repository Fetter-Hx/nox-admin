// // 导入了 `globals`全局变量的库模块，该模块提供了一组预定义的全局变量（如 window、document 等），这些变量通常在不同的环境（如浏览器、Node.js）中可用。在 ESLint 配置中，你可以使用这个模块来指定代码所运行的环境，从而定义全局变量。
// import globals from 'globals'
// // 针对 JavaScript 的 ESLint 配置和规则。保持 JavaScript 代码的一致性和质量
// import pluginJs from '@eslint/js'
// // 导入 `typescript-eslint` 插件（ `typescript-eslint/parser` 和 `typescript-eslint/eslint-plugin`）。提供了对 TypeScript 的支持，包括 TS 的解析器和推荐的规则集，用于在 TypeScript 文件中进行 lint 检查。
// import tseslint from 'typescript-eslint'
// // 导入 `eslint-plugin-vue` 插件，提供了 Vue.js 特有 ESLint 规则。确保 Vue 文件（`.vue` 文件）中的代码符合 Vue.js 的最佳实践和代码风格指南
// import pluginVue from 'eslint-plugin-vue'
// import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
// import pluginJsonc from 'eslint-plugin-jsonc'
// import parserJsonc from 'jsonc-eslint-parser'

// export default [
//   { files: ['**/*.{js,mjs,cjs,ts,vue,json}'] },
//   //**文件匹配**：`files`属性指定了哪些文件类型（JavaScript、TypeScript、Vue 文件等）将应用这些规则

//   { languageOptions: { globals: globals.browser } },
//   //1.  **全局变量**：`languageOptions`配置了浏览器环境下的全局变量。

//   // **插件和规则**：
//   pluginJs.configs.recommended,

//   ...tseslint.configs.recommended,
//   // 引入 `typescript-eslint` 插件的推荐规则

//   ...pluginVue.configs['flat/essential'],
//   // 引入`eslint-plugin-vue`插件的基础规则
//   eslintPluginPrettier,
//   {
//     files: ['**/*.vue'],
//     // 针对 Vue 文件配置

//     languageOptions: { parserOptions: { parser: tseslint.parser } }
//     //为`.vue`文件指定了 TypeScript 解析器
//   },
//   {
//     files: ['**/*.json'],
//     languageOptions: { parser: parserJsonc },
//     plugins: {
//       jsonc: pluginJsonc
//     },
//     rules: {
//       'jsonc/no-nan': 'error',
//       'jsonc/no-number-props': 'error',
//       'jsonc/no-numeric-separators': 'error',
//       'jsonc/no-octal': 'error',
//       'jsonc/no-octal-escape': 'error',
//       'jsonc/no-octal-numeric-literals': 'error',
//       'jsonc/no-parenthesized': 'error',
//       'jsonc/no-plus-sign': 'error',
//       'jsonc/no-regexp-literals': 'error',
//       'jsonc/no-sparse-arrays': 'error',
//       'jsonc/no-template-literals': 'error',
//       'jsonc/no-undefined-value': 'error',
//       'jsonc/no-dupe-keys': 'error'
//     }
//   },
//   {
//     rules: {
//       'prettier/prettier': 'warn'
//     }
//   }
// ]
import { defineEslintConfig } from '@nox/eslint-config'

export default defineEslintConfig()
