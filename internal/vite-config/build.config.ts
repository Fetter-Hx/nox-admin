/*
 * @Author: HX
 * @Date: 2024-10-14 11:34:52
 * @LastEditors: HX
 * @LastEditTime: 2024-10-14 15:45:23
 * @FilePath: \nox-monorepo\internal\vite-config\build.config.ts
 * @Description:
 *
 */
import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  declaration: true,
  entries: ['src/index']
})
