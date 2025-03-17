/*
 * @Author: HX
 * @Date: 2024-09-11 11:11:39
 * @LastEditors: HX
 * @LastEditTime: 2024-10-31 14:11:38
 * @FilePath: \nox-monorepo\apps\web-ele\vite.config.mts
 * @Description:
 *
 */
import { fileURLToPath } from 'node:url'
import { defineConfig } from '@nox/vite-config'
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
      plugins: [ElementPlus({})]
    }
  }
})
