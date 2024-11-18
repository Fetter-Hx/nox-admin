/*
 * @Author: HX
 * @Date: 2024-10-15 10:43:09
 * @LastEditors: HX
 * @LastEditTime: 2024-10-21 11:35:20
 * @FilePath: \nox-monorepo\internal\vite-config\src\utils\env.ts
 * @Description: 获取环境变量配置
 *
 */
import type { ApplicationPluginOptions } from '../typing'

import { join } from 'node:path'
import * as fs from 'node:fs/promises'

import dotenv from 'dotenv'

const getString = (val: string | undefined, defaultVal: string) => val ?? defaultVal

const getBoolean = (val: string | undefined) => val === 'true'

/**
 * 获取指定模式下生效的配置文件
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script as string // 获取当前执行的脚本命令
  const reg = /--mode ([\d_a-z]+)/
  const result = reg.exec(script)
  // 如果匹配到了 使用指定mode的env文件
  if (result) {
    const mode = result[1]
    return ['.env', `.env.${mode}`]
  }
  // 默认读取.env.production
  return ['.env', '.env.production']
}

/**
 * 根据指定的env文件获取特定前缀的环境变量
 * @param match 匹配的环境变量前缀
 * @param confFiles env文件列表
 *
 * @note dotenv加载的环境变量的值返回的类型都是string
 */
async function loadEnv<T = Record<string, string>>(match = 'VITE_', confFiles = getConfFiles()) {
  let envConfig = {}

  for (const conFile of confFiles) {
    try {
      // 读取指定配置文件的内容
      const conFileContent = await fs.readFile(join(process.cwd(), conFile), {
        encoding: 'utf-8'
      })
      // dotenv解析 转换成 键值的对象 {key:value,...}
      const parsedEnv = dotenv.parse(conFileContent)
      envConfig = { ...envConfig, ...parsedEnv }
    } catch (error) {
      console.error(`处理解析${conFile}文件出错`, error)
    }
  }
  // 匹配以特定前缀开头的环境变量
  const reg = new RegExp(`^(${match})`)
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key)
    }
  })
  return envConfig as T
}

/**
 * 获取环境变量并转换成正确的类型
 * @param match 匹配的环境变量前缀
 * @param confFiles env文件列表
 * @returns {Object} 转换后的环境变量对象
 */
async function loadAndConvertEnv(
  match = 'VITE_',
  confFiles = getConfFiles()
): Promise<{ base: string } & Partial<ApplicationPluginOptions>> {
  const envConfig = await loadEnv(match, confFiles)
  const { VITE_BASE, VITE_DEVTOOLS, VITE_VISUALIZER } = envConfig

  return {
    base: getString(VITE_BASE, '/'),
    devtools: getBoolean(VITE_DEVTOOLS),
    visualizer: getBoolean(VITE_VISUALIZER)
  }
}

export { loadAndConvertEnv }
