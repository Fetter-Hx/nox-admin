/*
 * @Author: HX
 * @Date: 2024-09-24 11:26:58
 * @LastEditors: HX
 * @LastEditTime: 2024-09-29 15:06:37
 * @FilePath: \nox-monorepo\internal\lint-configs\commitlint-config\index.cjs
 * @Description:
 *
 */

const { execSync } = require('node:child_process')

const { getMonorepoPackagesSync } = require('@nox/node-utils')

const { packages } = getMonorepoPackagesSync()

// precomputed scope 自动获取scope的示例
const scopeComplete = execSync('git status --porcelain || true')
  .toString()
  .trim()
  .split('\n')
  .find((r) => ~r.indexOf('M  src'))
  ?.replace(/(\/)/g, '%%')
  ?.match(/src%%((\w|-)*)/)?.[1]
  ?.replace(/s$/, '')

// 允许设置的scope
const allowedScopes = [
  ...packages.map((pkg) => pkg.packageJson.name),
  'project',
  'style',
  'lint',
  'ci',
  'dev',
  'deploy',
  'other'
]

/**
 * @type {import('czg').UserConfig}
 */
const userConfig = {
  // 扩展继承一些共享配置
  extends: ['@commitlint/config-conventional'],
  /**
   * 使用commitlint-plugin-function-rules插件
   * @see https://github.com/vidavidorra/commitlint-plugin-function-rules
   */
  plugins: ['commitlint-plugin-function-rules'],

  /** @see https://cz-git.qbb.sh/zh/config/show */

  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: '选择关联issue前缀（可选）:',
      customFooterPrefix: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    // prettier-ignore
    types: [
      { value: "build", name: "构建:     📦️  构建流程、外部依赖变更（如升级 npm 包、修改 vite 配置等）", emoji: ":package:" },
      { value: "chore", name: "其他:     🛠️  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", emoji: ":hammer:" },
      { value: "ci", name: "集成:     ⚙️  修改 CI 配置、脚本", emoji: ":ferris_wheel:" },
      { value: "docs", name: "文档:     📝  文档变更(更新README文件，或者注释)", emoji: ":memo:" },
      { value: "feat", name: "特性:     ✨  新增功能", emoji: ":sparkles:" },
      { value: "fix", name: "修复:     🐛  修复缺陷", emoji: ":bug:" },
      { value: "perf", name: "性能:     🚀  性能优化", emoji: ":zap:" },
      { value: "refactor", name: "重构:     🔄  代码重构（不修复错误也不添加特性的代码更改）", emoji: ":recycle:" },
      { value: "style", name: "格式:     🌈  代码格式（空格、格式化、缺失的分号等）", emoji: ":lipstick:" },
      { value: "test", name: "测试:     🧪  添加疏漏测试或已有测试改动", emoji: ":white_check_mark:" },
      { value: "revert", name: "回退:     ↩️  回滚 commit", emoji: ":rewind:" }
    ],
    useEmoji: true,
    emojiAlign: 'center',
    // defaultScope 搭配 scopes或者scope-enum使用  defaultScope 与 scopes 选择范围列表项中的 value 相匹配就会进行星标置顶操作
    defaultScope: scopeComplete,
    customScopesAlign: scopeComplete ? 'bottom' : 'top'
  },
  rules: {
    /** @see https://commitlint.js.org/reference/rules.html */

    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    // 下面使用function-rules/scope-enum 来校验scope,所以这里禁用commitlint的scope-enum规则以避免未定义的行为
    'scope-enum': [0],
    'function-rules/scope-enum': [
      2,
      'always',
      (parsed) => {
        if (!parsed.scope || allowedScopes.includes(parsed.scope)) {
          return [true]
        }

        return [false, `scope must be one of [${allowedScopes.join(', ')}]`]
      }
    ],
    'header-max-length': [2, 'always', 108],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'style',
        'docs',
        'test',
        'refactor',
        'build',
        'ci',
        'chore',
        'revert',
        'types',
        'release'
      ]
    ]
  }
}

module.exports = userConfig
