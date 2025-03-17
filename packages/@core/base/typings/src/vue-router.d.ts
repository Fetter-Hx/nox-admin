interface RouteMeta {
  /**
   * 当前路由在面包屑中不展示
   * @default false
   */
  hideInBreadcrumb?: boolean
  /**
   * 当前路由在菜单中不显示
   * @default false
   */
  hideInMenu?: boolean
  /**
   * 当前路由在标签页中不展示
   */
  hideInTab?: boolean
  /**
   * 标题
   */
  title: string
}

export type { RouteMeta }
