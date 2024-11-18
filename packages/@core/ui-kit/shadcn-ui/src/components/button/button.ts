import type { ButtonVariants } from '../../ui'
import type { Component } from 'vue'
import type { AsTag } from 'radix-vue'

export interface NoxButtonProps {
  as?: AsTag | Component
  asChild?: boolean
  class?: any
  disabled?: boolean
  loading?: boolean
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
}
