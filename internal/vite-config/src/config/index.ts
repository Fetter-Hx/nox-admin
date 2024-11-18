/*
 * @Author: HX
 * @Date: 2024-10-10 17:45:41
 * @LastEditors: HX
 * @LastEditTime: 2024-10-14 15:46:21
 * @FilePath: \nox-monorepo\internal\vite-config\src\config\index.ts
 * @Description:
 *
 */
import type { DefineConfig } from '../typing'

import { join } from 'node:path'
import { existsSync } from 'node:fs'

import { defineApplicationConfig } from './application'
import { defineLibraryConfig } from './library'

export * from './application'
export * from './library'

/**
 * 用于配置的类型
 */
type ConfigType = 'application' | 'library' | 'auto'

function defineConfig(userConfigPromise?: DefineConfig, type: ConfigType = 'auto') {
  let projectType = type
  // 如果是自动模式，则根据包是否存在index.html判断是应用类型还是库类型
  if (type === 'auto') {
    const htmlPath = join(process.cwd(), 'index.html')
    projectType = existsSync(htmlPath) ? 'application' : 'library'
  }

  switch (projectType) {
    case 'application': {
      return defineApplicationConfig(userConfigPromise)
    }
    case 'library': {
      return defineLibraryConfig(userConfigPromise)
    }
    default: {
      throw new Error(`不支持的项目类型:${projectType}`)
    }
  }
}

export { defineConfig }
