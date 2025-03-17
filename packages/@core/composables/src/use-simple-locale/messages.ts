export type Locale = 'en-US' | 'zh-CN'

export const messages: Record<Locale, Record<string, string>> = {
  'en-US': {
    submit: 'submit',
    reset: 'reset'
  },
  'zh-CN': {
    submit: '提交',
    reset: '重置'
  }
}

export const getMessages = (locale: Locale) => messages[locale]
