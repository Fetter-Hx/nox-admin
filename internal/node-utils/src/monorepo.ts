/*
 * @Author: HX
 * @Date: 2024-09-26 16:05:45
 * @LastEditors: HX
 * @LastEditTime: 2024-09-29 11:34:14
 * @FilePath: \nox-monorepo\internal\node-utils\src\monorepo.ts
 * @Description: 获取大仓相关信息 使用工具如下
 * @see https://www.npmjs.com/package/@manypkg/get-packages
 * @see https://github.com/sindresorhus/find-up
 *
 */

import { getPackagesSync, getPackages } from '@manypkg/get-packages'
import { findUpSync } from 'find-up'
import { dirname } from 'node:path'

/**
 *  大仓根目录
 *  @param cwd
 */
function getMonorepoRoot(cwd: string = process.cwd()) {
  const lockFile = findUpSync(['pnpm-lock.yaml', 'package-lock.json', 'yarn.lock'], {
    cwd,
    type: 'file'
  })
  return dirname(lockFile ?? '')
}

/**
 * 获取大仓的所有的包
 */
function getMonorepoPackagesSync() {
  const root = getMonorepoRoot()
  return getPackagesSync(root)
}

/**
 * 异步获取大仓的所有包
 */
async function getMonorepoPackages() {
  const root = getMonorepoRoot()
  return await getPackages(root)
}

export { getMonorepoRoot, getMonorepoPackagesSync, getMonorepoPackages }
