/*
 * @Author: HX
 * @Date: 2024-10-14 10:06:03
 * @LastEditors: HX
 * @LastEditTime: 2024-11-18 13:44:51
 * @FilePath: \nox-monorepo\internal\vite-config\src\config\library.ts
 * @Description: 库类型的vite配置
 *
 */

import type { DefineLibraryConfig } from '../typing'

function defineLibraryConfig(userConfigPromise?: DefineLibraryConfig) {
  return { userConfigPromise }
  // return defineConfig((config) => {
  //   return {}
  // })
}

export { defineLibraryConfig }
