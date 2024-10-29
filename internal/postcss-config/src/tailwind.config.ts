/*
 * @Author: HX
 * @Date: 2024-10-29 10:27:19
 * @LastEditors: HX
 * @LastEditTime: 2024-10-29 14:46:40
 * @FilePath: \nox-monorepo\internal\postcss-config\src\tailwind.config.ts
 * @Description:
 *
 */
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,html}'],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config
