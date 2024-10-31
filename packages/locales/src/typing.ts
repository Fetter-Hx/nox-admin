/*
 * @Author: HX
 * @Date: 2024-10-30 10:20:43
 * @LastEditors: HX
 * @LastEditTime: 2024-10-30 11:05:11
 * @FilePath: \nox-monorepo\packages\locales\src\typing.ts
 * @Description:
 *
 */

/** 支持的语言类型 */
export type SupportedLangsType = 'zh-CN' | 'en-US'

/**
 * 导入语言包的函数
 */
export type ImportLocaleFn = () => Promise<{ default: Record<string, string> }>

/** 加载messages函数 */
export type loadMessagesFn = (
  lang: SupportedLangsType
) => Promise<Record<string, string> | undefined>

/** setup i18n的相关配置选项 */
export interface LocaleSetupOptions {
  /**
   * 默认语言环境
   * @default zh-CN
   */
  defaultLocale?: SupportedLangsType
  /**
   * 加载messages的函数
   * @param lang 语言环境
   */
  loadMessages?: loadMessagesFn
}
