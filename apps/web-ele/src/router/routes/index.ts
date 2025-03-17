import type { RouteRecordRaw } from 'vue-router'

import { fallbackNotFoundRoute, coreRoutes } from './core'

const routes: RouteRecordRaw[] = [...coreRoutes, fallbackNotFoundRoute]

export { routes }
