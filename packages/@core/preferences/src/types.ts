interface AppPreferences {
  /** 应用名称 */
  name: string
}

interface LogoPreferences {
  /** 是否启用logo显示 */
  enable: boolean
  /** logo图片地址 */
  url: string
}

interface Preferences {
  /** 应用全局配置 */
  app: AppPreferences
}

export type { AppPreferences, Preferences, LogoPreferences }
