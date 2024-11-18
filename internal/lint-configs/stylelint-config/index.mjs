/*
 * @Author: HX
 * @Date: 2024-09-18 11:41:46
 * @LastEditors: HX
 * @LastEditTime: 2024-11-07 16:13:16
 * @FilePath: \nox-monorepo\internal\lint-configs\stylelint-config\index.mjs
 * @Description:
 *
 */
/** @type {import('stylelint').Config} */

export default {
  // 继承一些配置
  extends: [
    // 标准的stylelint规则集，提供社区公认的最佳实践规则
    'stylelint-config-standard',
    // CSS属性顺序配置，确保CSS属性按照一定的顺序排列
    'stylelint-config-recess-order'
  ],
  // 忽略以下文件
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.md'],
  plugins: [
    'stylelint-prettier', // stylelint-prettier插件，用于将Prettier的格式化规则集成到stylelint中
    'stylelint-order', // stylelint-order插件，用于检查CSS属性的顺序
    'stylelint-scss' // stylelint-scss插件，引入特定于SCSS语法的lint规则
  ],
  // 指定一些配置应用到特定的文件子集
  overrides: [
    {
      // postcss-html，用于解析识别HTML/VUE文件中的样式
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
      rules: {
        // 伪类的一些规则 这里是忽略对:global和:deep的检查
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['global', 'deep']
          }
        ],
        // 伪元素规则
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted']
          }
        ]
      }
    },
    {
      // postcss-scss，用于解析识别SCSS文件和vue文件中style lang=scss模块内的样式
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
      extends: ['stylelint-config-recommended-scss', 'stylelint-config-recommended-vue/scss']
    }
  ],
  rules: {
    // 启用prettier的规则
    'prettier/prettier': true,
    // css属性排序
    'order/order': [
      [
        'dollar-variables', // scss变量 eg: $color
        'custom-properties', // 自定义css变量 eg: --color
        'at-rules', // @规则 eg: @media
        'declarations', // css声明 eg: display:block
        // 扩展的@规则顺序限制
        {
          name: 'supports',
          type: 'at-rule'
        },
        {
          name: 'media',
          type: 'at-rule'
        },
        {
          name: 'include',
          type: 'at-rule'
        },
        'rules' // 嵌套规则 eg: a { span {} }
      ],
      { severity: 'error' } // 错误级别
    ],
    'no-empty-source': null, // 关闭禁止文件为空的规则
    // 注释后或嵌套规则的首行 则不需要添加空行
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested']
      }
    ],
    'media-feature-range-notation': null, // 关闭媒体查询的范围符号规则
    'scss/operator-no-newline-after': null, // 关闭禁止运算符后换行
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen'] // 忽略tailwind的规则
      }
    ],
    'custom-property-empty-line-before': null // 关闭自定义属性前禁止空行
  }
}
