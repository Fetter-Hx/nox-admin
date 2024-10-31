/*
 * @Author: HX
 * @Date: 2024-10-29 18:21:47
 * @LastEditors: HX
 * @LastEditTime: 2024-10-31 11:15:59
 * @FilePath: \nox-monorepo\packages\locales\src\i18n.ts
 * @Description:
 *
 */
import { unref, type App } from 'vue'

import type {
  SupportedLangsType,
  LocaleSetupOptions,
  ImportLocaleFn,
  loadMessagesFn
} from './typing'

import { type Locale, createI18n } from 'vue-i18n'

let loadMessages: loadMessagesFn

// 获取语言模块
const modules = import.meta.glob('./langs/**/*.json')

const i18n = createI18n({
  locale: '',
  legacy: false, // 启用composition api
  messages: {},
  globalInjection: true // 全局注入属性和方法
})

const localesMap = loadLocalesMapFromDir(/\.\/langs\/([^/]+)\/(.+)\.json$/, modules)

/**
 * 根据正则表达式和模块对象 获取最终的可用locales的映射对象
 * @param regexp 匹配文件的正则表达式 捕获locale 和 fineName
 * @param modules 模块对象
 * @returns key对应语言环境 value是一个异步函数，返回包含对应语言环境的messages的对象
 *
 * 例如：
 * {
 *   'zh-CN': async () => ({ default:{ common:{ hello: '你好' } } }),
 *   'en-US': async () => ({ default:{ common:{ hello: 'Hello'} } })
 * }
 */
function loadLocalesMapFromDir(regexp: RegExp, modules: Record<string, () => Promise<unknown>>) {
  // 未处理的原始的locales 对象 { zh-CN: { common: () => import('./langs/zh-CN/common.json') } }
  const localesRaw: Record<Locale, Record<string, () => Promise<unknown>>> = {}
  // 处理好的locales 映射对象
  const localesMap: Record<Locale, ImportLocaleFn> = {}
  for (const path in modules) {
    // ./langs/zh-CN/common.json
    const match = path.match(regexp)
    if (match) {
      const [_, locale, fileName] = match
      if (locale && fileName) {
        if (!localesRaw[locale]) {
          localesRaw[locale] = {}
        }

        if (modules[path]) {
          localesRaw[locale][fileName] = modules[path]
        }
      }
    }
  }

  // 处理localesRaw 得到 localesMap
  for (const [locale, files] of Object.entries(localesRaw)) {
    localesMap[locale] = async () => {
      const messages: Record<string, any> = {}
      for (const [fileName, importFn] of Object.entries(files)) {
        messages[fileName] = ((await importFn()) as any)?.default
      }
      return { default: messages }
    }
  }

  return localesMap
}

/**
 * 设置i18n实例的locale 、html的lang属性
 * @param locale
 */
function setI18nLocale(locale: Locale) {
  i18n.global.locale.value = locale
  document.querySelector('html')?.setAttribute('lang', locale)
}

/**
 * 加载对应locale的messages
 * @param lang
 */
async function loadLocaleMessages(lang: SupportedLangsType) {
  // locale是个ref 这里解引用获取值
  if (unref(i18n.global.locale) === lang) {
    return setI18nLocale(lang)
  }

  const messages = await localesMap[lang]?.()

  if (messages?.default) {
    i18n.global.setLocaleMessage(lang, messages.default)
  }

  // 这里是app应用自定义的扩展配置
  const mergeMessages = await loadMessages(lang)
  i18n.global.mergeLocaleMessage(lang, mergeMessages)
  return setI18nLocale(lang)
}

/**
 * 安装i18n插件
 * @param app vue实例
 * @param options 配置项
 */
async function setupI18n(app: App, options: LocaleSetupOptions = {}) {
  const { defaultLocale = 'zh-CN' } = options // 默认设置语言为中文
  // app可以自定义对国际化进行扩展配置
  loadMessages = options.loadMessages || (async () => ({}))
  app.use(i18n)
  await loadLocaleMessages(defaultLocale)
}

export { i18n, loadLocalesMapFromDir, setupI18n }
