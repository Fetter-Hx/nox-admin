/*
 * @Author: HX
 * @Date: 2024-10-30 16:14:36
 * @LastEditors: HX
 * @LastEditTime: 2024-10-31 14:40:37
 * @FilePath: \nox-monorepo\packages\locales\src\index.ts
 * @Description:
 *
 */
import { i18n, loadLocalesMapFromDir, setupI18n } from './i18n'

const $t = i18n.global.t

export { $t, setupI18n, loadLocalesMapFromDir }

export { type LocaleSetupOptions, type SupportedLangsType } from './typing'

export { useI18n } from 'vue-i18n'
