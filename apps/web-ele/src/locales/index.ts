import type { LocaleSetupOptions, SupportedLangsType } from '@nox/locales'
import { ref, type App } from 'vue'
import type { Language } from 'element-plus/es/locale'

import { $t, setupI18n as coreSetupI18n, loadLocalesMapFromDir } from '@nox/locales'

import elZhLocale from 'element-plus/es/locale/lang/zh-cn'
import elEnLocale from 'element-plus/es/locale/lang/en'

const elementLocale = ref<Language>(elZhLocale)

const modules = import.meta.glob('./langs/**/*.json')

// 从langs下获取一些定义好的语言包  比如与页面、业务相关的语言包
const localesMap = loadLocalesMapFromDir(/\.\/langs\/([^/]+)\/(.+)\.json$/, modules)

/**
 * 加载应用特有的messages语言包
 * @param lang 语言环境
 */
async function loadMessages(lang: SupportedLangsType) {
  const [appLocaleMessages] = await Promise.all([
    localesMap[lang]?.(),
    loadThirdPartyMessages(lang)
  ])
  return appLocaleMessages?.default
}

/**
 * 加载第三方组件库语言包
 */
async function loadThirdPartyMessages(lang: SupportedLangsType) {
  await loadElementLocale(lang)
}

/**
 * 加载element-plus的语言包
 */
async function loadElementLocale(lang: SupportedLangsType) {
  switch (lang) {
    case 'zh-CN':
      elementLocale.value = elZhLocale
      break
    case 'en-US':
      elementLocale.value = elEnLocale
      break
  }
}

/**
 * 安装i18n插件
 * @param app
 */
async function setupI18n(app: App, options: LocaleSetupOptions = {}) {
  await coreSetupI18n(app, {
    defaultLocale: 'zh-CN',
    loadMessages,
    ...options
  })
}

export { elementLocale, setupI18n, $t }
