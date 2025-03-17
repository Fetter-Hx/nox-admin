/*
 * @Author: HX
 * @Date: 2024-11-04 10:34:31
 * @LastEditors: HX
 * @LastEditTime: 2024-11-04 10:56:09
 * @FilePath: \nox-monorepo\packages\@core\base\shared\src\utils\cn.ts
 * @Description: shadcn-ui用到的cn函数
 *
 */
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export { cn }
