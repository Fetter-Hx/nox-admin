/*
 * @Author: HX
 * @Date: 2024-09-11 11:11:39
 * @LastEditors: HX
 * @LastEditTime: 2024-11-01 10:20:45
 * @FilePath: \nox-monorepo\apps\web-ele\src\main.ts
 * @Description:
 *
 */

import '@nox/styles'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setupI18n } from '@/locales'

import { unmountGlobalLoading } from '@nox/utils'

const app = createApp(App)
await setupI18n(app)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 移除销毁全局loading
unmountGlobalLoading()
