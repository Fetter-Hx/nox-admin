import type { RouteRecordRaw } from 'vue-router'

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@nox/constants'

import { AuthPageLayout } from '@/layouts'
import { $t } from '@/locales'

/** 全局404 */
const fallbackNotFoundRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: 'FallbackNotFound',
  meta: {
    hideInMenu: true,
    hideInBreadcrumb: true,
    hideInTab: true,
    title: '404'
  },
  component: () => import('@/views/core/fallback/not-found.vue')
}

/** 基本核心路由 必须存在 */
const coreRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    meta: {
      title: 'Root'
    },
    redirect: DEFAULT_HOME_PATH
  },
  {
    path: '/auth',
    name: 'Authentication',
    meta: {
      title: 'Authentication'
    },
    component: AuthPageLayout,
    redirect: LOGIN_PATH,
    children: [
      {
        path: 'login',
        name: 'Login',
        meta: {
          title: $t('common.login')
        },
        component: () => import('@/views/core/authentication/login.vue')
      }
    ]
  }
]

export { fallbackNotFoundRoute, coreRoutes }
