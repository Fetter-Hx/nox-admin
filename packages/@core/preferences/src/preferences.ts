import type { Preferences } from './types'

import { defaultPreferences } from './config'

class PreferencesManager {
  /** 初始preferences配置 */
  private initialPreferences: Preferences = defaultPreferences
}

export { PreferencesManager }
