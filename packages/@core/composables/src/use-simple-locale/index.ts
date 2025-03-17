import { createSharedComposable } from '@vueuse/core'
import { computed, ref } from 'vue'
import { getMessages, type Locale } from './messages'

export const useSimpleLocale = createSharedComposable(() => {
  const currentLocale = ref<Locale>('zh-CN')

  const setSimpleLocale = (locale: Locale) => {
    currentLocale.value = locale
  }

  const $t = computed(() => {
    const localMessages = getMessages(currentLocale.value)

    return (key: string) => {
      return localMessages[key] || key
    }
  })

  return {
    $t,
    setSimpleLocale,
    currentLocale
  }
})
