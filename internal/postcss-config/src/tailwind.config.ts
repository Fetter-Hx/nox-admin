/*
 * @Author: HX
 * @Date: 2024-10-29 10:27:19
 * @LastEditors: HX
 * @LastEditTime: 2024-11-14 11:12:13
 * @FilePath: \nox-monorepo\internal\postcss-config\src\tailwind.config.ts
 * @Description:
 *
 */
import type { Config } from 'tailwindcss'

import path from 'node:path'

import { getPackagesSync } from '@manypkg/get-packages'
import animate from 'tailwindcss-animate'

import { enterAnimationPlugin } from './plugins/enter'

const { packages } = getPackagesSync(process.cwd())

const tailwindPackages: string[] = []

packages.forEach((pkg) => {
  tailwindPackages.push(pkg.dir)
})

/** shadcnui中用到的颜色 */
const shadcnUiColors = {
  background: {
    DEFAULT: 'hsl(var(--background))',
    deep: 'hsl(var(--background-deep))'
  },
  foreground: {
    DEFAULT: 'hsl(var(--foreground))'
  },
  border: {
    DEFAULT: 'hsl(var(--border))'
  },
  primary: {
    ...createColorsPalette('primary'),
    DEFAULT: 'hsl(var(--primary))'
  },
  destructive: {
    ...createColorsPalette('destructive'),
    DEFAULT: 'hsl(var(--destructive))'
  },
  accent: {
    DEFAULT: 'hsl(var(--accent))',
    foreground: 'hsl(var(--accent-foreground))'
  }
}

export default {
  content: [
    './index.html',
    ...tailwindPackages.map((item) => path.join(item, 'src/**/*.{vue,ts,js,html}'))
  ],
  plugins: [animate, enterAnimationPlugin],
  theme: {
    extend: {
      animation: {
        float: 'float 2s linear infinite',
        'ping-low-small': 'ping-small 2s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      boxShadow: {
        float: `0 6px 16px 0 rgb(0 0 0 / 8%),
        0 3px 6px -4px rgb(0 0 0 / 12%),
        0 9px 28px 8px rgb(0 0 0 / 5%)`
      },
      colors: {
        ...shadcnUiColors
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        'ping-small': {
          '75%,100%': {
            transform: 'scale(1.5)',
            opacity: '0'
          }
        }
      }
    }
  }
} satisfies Config

// 创建调色板 重写并添加自定义颜色
function createColorsPalette(name: string) {
  return {
    50: `hsl(var(--${name}-50))`,
    100: `hsl(var(--${name}-100))`,
    200: `hsl(var(--${name}-200))`,
    300: `hsl(var(--${name}-300))`,
    400: `hsl(var(--${name}-400))`,
    500: `hsl(var(--${name}-500))`,
    600: `hsl(var(--${name}-600))`,
    700: `hsl(var(--${name}-700))`,
    // 前景色
    foreground: `hsl(var(--${name}-foreground))`
  }
}
