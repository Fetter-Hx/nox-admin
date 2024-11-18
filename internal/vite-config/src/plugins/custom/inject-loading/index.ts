/*
 * @Author: HX
 * @Date: 2024-10-24 14:42:02
 * @LastEditors: HX
 * @LastEditTime: 2024-10-24 17:11:32
 * @FilePath: \nox-monorepo\internal\vite-config\src\plugins\custom\inject-loading\index.ts
 * @Description: 自定义的注入loading到项目的vite插件
 *
 */
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { PluginOption } from 'vite'

/**
 * @param loadingTemplate loading的html模板文件
 * 生成loading注入到项目
 */
async function viteInjectLoadingPlugin(
  loadingTemplate = 'loading.html'
): Promise<PluginOption | undefined> {
  const loadingHtml = await getLoadingByHtmlTemplate(loadingTemplate)

  if (!loadingHtml) {
    return
  }

  return {
    name: 'vite:inject-loading', // 插件名称 唯一
    enforce: 'pre', // 插件应用顺序
    transformIndexHtml: {
      order: 'pre', // 处理Html之前应用
      handler(html) {
        const reg = /(<body\s*[^>]*>)/
        html = html.replace(reg, `$1${loadingHtml}`)
        return html
      }
    }
  }
}

/**
 * 获取loading的html模板
 * @param loadingTemplate loading的html模板文件
 */
async function getLoadingByHtmlTemplate(loadingTemplate: string) {
  // 从运行的项目中获取html模板文件
  let appLoadingPath = join(process.cwd(), loadingTemplate)
  // 如果不存在,则使用默认的default-loading.html
  if (!fs.existsSync(appLoadingPath)) {
    const __dirname = fileURLToPath(new URL('.', import.meta.url))
    appLoadingPath = join(__dirname, 'default-loading.html')
  }

  return await fsp.readFile(appLoadingPath, 'utf-8')
}

export { viteInjectLoadingPlugin }
