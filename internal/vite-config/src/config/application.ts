/*
 * @Author: HX
 * @Date: 2024-10-11 14:26:23
 * @LastEditors: HX
 * @LastEditTime: 2024-10-28 09:58:44
 * @FilePath: \nox-monorepo\internal\vite-config\src\config\application.ts
 * @Description: 应用类型的vite配置
 *
 */
import type { UserConfig } from 'vite'

import type { DefineApplicationConfig } from '../typing'

import { defineConfig, mergeConfig } from 'vite'

import { loadApplicationPlugins } from '../plugins'
import { loadAndConvertEnv } from '../utils/env'
import { getCommonConfig } from './common'

/** 获取应用类型的vite配置 */
function defineApplicationConfig(userConfigPromise?: DefineApplicationConfig) {
  return defineConfig(async (config) => {
    const { command } = config
    const options = await userConfigPromise?.(config)
    const { application = {}, vite = {} } = options || {}
    const { base, ...envConfig } = await loadAndConvertEnv()
    const isBuild = command === 'build'
    // 获取插件
    const plugins = await loadApplicationPlugins({
      i18n: true,
      html: true,
      isBuild,
      injectAppLoading: true,
      ...envConfig,
      ...application
    })

    const applicationConfig: UserConfig = {
      base,
      plugins
    }

    const mergedCommonConfig = mergeConfig(await getCommonConfig(), applicationConfig)

    return mergeConfig(mergedCommonConfig, vite)
  })
}

export { defineApplicationConfig }
