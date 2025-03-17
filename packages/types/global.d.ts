import 'vue-router'

import { RouteMeta as IRouteMeta } from '@nox-core/typings'

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RouteMeta extends IRouteMeta {}
}

export {}
