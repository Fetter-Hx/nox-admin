/*
 * @Author: HX
 * @Date: 2024-10-11 15:32:40
 * @LastEditors: HX
 * @LastEditTime: 2024-11-18 13:42:55
 * @FilePath: \nox-monorepo\internal\vite-config\src\plugins\index.ts
 * @Description:
 *
 */
import type { PluginOption } from 'vite'

import type { ConditionPlugin, CommonPluginOptions, ApplicationPluginOptions } from '../typing'

import viteVue from '@vitejs/plugin-vue' // 提供 Vue 3 单文件组件支持。
import viteVueDevTools from 'vite-plugin-vue-devtools' // Vue Devtools
import viteVueI18nPlugin from '@intlify/unplugin-vue-i18n/vite' // 自动加载和优化国际化（vue-i18n）支持的vite插件
import { createHtmlPlugin as viteHtmlPlugin } from 'vite-plugin-html' // vite html插件 提供EJS模板能力 html压缩能力等等
import { visualizer as viteVisualizerPlugin } from 'rollup-plugin-visualizer' // 生成可视化打包报告，展示项目各个模块大小和依赖关系
// import viteDtsPlugin from "vite-plugin-dts" // 帮助用于库模式在 .ts(x)或.vue源文件中自动生成类型声明文件
import { viteInjectLoadingPlugin } from './custom/inject-loading' // 自定义vite插件，用于注入全局loading

/**
 * 获取满足条件的 vite 插件
 * @param conditionPlugins
 */
async function loadConditionPlugins(conditionPlugins: ConditionPlugin[]) {
  const plugins: PluginOption[] = []
  for (const conditionPlugin of conditionPlugins) {
    // 筛选满足条件的插件
    if (conditionPlugin.condition) {
      const realPlugins = await conditionPlugin.plugins()
      plugins.push(...realPlugins)
    }
  }
  return plugins.flat()
}

/**
 * 根据条件获取通用的 vite 插件
 * @param options
 */
async function loadCommonPlugins(options: CommonPluginOptions): Promise<ConditionPlugin[]> {
  const { devtools, isBuild, visualizer } = options
  return [
    {
      condition: true,
      plugins: () => [
        viteVue({
          features: {
            // 如果 vue 版本是3.5+ 这里就不需要显式开启了
            propsDestructure: true
          }
        })
      ]
    },
    {
      condition: !isBuild && devtools,
      plugins: () => [viteVueDevTools()]
    },
    {
      condition: isBuild && visualizer,
      plugins: () => [
        viteVisualizerPlugin({
          filename: './node_modules/.cache/visualizer/stats.html',
          gzipSize: true,
          open: true
        })
      ]
    }
  ]
}

/**
 * 根据条件获取应用类型的 vite 插件
 * @param options
 */
async function loadApplicationPlugins(options: ApplicationPluginOptions): Promise<PluginOption[]> {
  const { i18n, html, injectAppLoading, ...commonOptions } = options
  // 获取通用插件
  const commonPlugins = await loadCommonPlugins(commonOptions)
  // 获取最终满足条件的插件
  return await loadConditionPlugins([
    ...commonPlugins,
    {
      condition: i18n,
      plugins: () => [viteVueI18nPlugin() as PluginOption]
    },
    // 因为viteInjectLoadingPlugin里面的模板使用了<%= VITE_APP_TITLE %>
    // 这里一定要保证 viteInjectLoadingPlugin 在 viteHtmlPlugin 之前  否则会导致解析错误
    {
      condition: injectAppLoading,
      plugins: async () => [await viteInjectLoadingPlugin()]
    },
    {
      condition: html,
      plugins: () => [viteHtmlPlugin({ minify: true })]
    }
  ])
}

// async function loadLibraryPlugins(options: LibraryPluginOptions): Promise<PluginOption[]> {
//   const {dts} = options
// }

export { loadApplicationPlugins }
