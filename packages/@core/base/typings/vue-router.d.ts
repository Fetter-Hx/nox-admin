import type { RouteMeta as IRouteMeta } from '@nox-core/typings'

import 'vue-router'

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface RouteMeta extends IRouteMeta {}
}
