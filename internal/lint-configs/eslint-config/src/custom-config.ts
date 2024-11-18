import type { Linter } from 'eslint'

// 补充一些针对性的规则
const customConfig: Linter.Config[] = [
  // shadcn-ui的组件是通过命令行自动生成的 取消一些规则限制
  {
    files: ['packages/@core/ui-kit/shadcn-ui/**/**'],
    rules: {
      'vue/require-default-prop': 'off'
    }
  }
]

export { customConfig }
