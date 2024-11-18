import { defineComponent, h } from 'vue'
import { Icon } from '@iconify/vue'

function createIconifyIcon(icon: string) {
  return defineComponent(
    (props, { attrs }) => {
      return () => h(Icon, { icon, ...props, ...attrs })
    },
    {
      name: `Icon-${icon}`
    }
  )
}

export { createIconifyIcon }
