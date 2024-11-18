/*
 * @Author: HX
 * @Date: 2024-10-11 11:31:43
 * @LastEditors: HX
 * @LastEditTime: 2024-10-24 16:41:26
 * @FilePath: \nox-monorepo\internal\vite-config\src\typing.ts
 * @Description:
 *
 */
import type { ConfigEnv, UserConfig, PluginOption } from 'vite'
import type { PluginOptions as DtsPluginOptions } from 'vite-plugin-dts'

/**
 * 根据条件判断是否需要加载插件
 */
interface ConditionPlugin {
  // 判断条件
  condition?: boolean
  // 插件
  plugins: () => PluginOption[] | PromiseLike<PluginOption[]>
}

/** 通用插件配置选项 */
interface CommonPluginOptions {
  /** 是否开启vue devtools */
  devtools?: boolean
  /** 环境变量 */
  env?: Record<string, any>
  /** 是否构建 */
  isBuild?: boolean
  /** 模式 */
  mode?: string
  /** 开启打包可视化依赖分析 */
  visualizer?: boolean
}

/** 应用的插件配置选项 */
interface ApplicationPluginOptions extends CommonPluginOptions {
  /**
   * 是否启用@intlify/unplugin-vue-i18n插件
   * @see https://www.npmjs.com/package/@intlify/unplugin-vue-i18n
   */
  i18n?: boolean
  /**
   * 是否启用vite-plugin-html插件
   * @see https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
   */
  html?: boolean
  /** 是否注入全局app loading */
  injectAppLoading?: boolean
}

/** 库的插件配置选项 */
interface LibraryPluginOptions extends CommonPluginOptions {
  /** 是否开启dts输出 */
  dts?: boolean | DtsPluginOptions
}

/** 应用的总配置项 */
type DefineApplicationConfig = (config: ConfigEnv) => Promise<{
  application?: ApplicationPluginOptions
  vite?: UserConfig
}>

/** 库的总配置项 */
type DefineLibraryConfig = (config: ConfigEnv) => Promise<{
  library?: LibraryPluginOptions
  vite?: UserConfig
}>

type DefineConfig = DefineApplicationConfig | DefineLibraryConfig

export type {
  ConditionPlugin,
  CommonPluginOptions,
  ApplicationPluginOptions,
  LibraryPluginOptions,
  DefineConfig,
  DefineApplicationConfig,
  DefineLibraryConfig
}
