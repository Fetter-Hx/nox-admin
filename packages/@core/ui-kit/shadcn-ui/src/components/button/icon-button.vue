<script setup lang="ts">
  import type { NoxButtonProps } from './button'
  import type { ButtonVariants } from '../../ui'

  import { cn } from '@nox-core/shared/utils'
  import NoxButton from './button.vue'
  import { computed, useSlots } from 'vue'
  import { NoxTooltip } from '../tooltip'

  interface Props extends NoxButtonProps {
    onClick?: () => void
    variant?: ButtonVariants['variant']
    tooltip?: string
    tooltipSide?: 'top' | 'right' | 'bottom' | 'left'
    tooltipContentClass?: any
  }

  const {
    onClick = () => {},
    class: classes,
    disabled = false,
    variant = 'icon',
    tooltip = '',
    tooltipSide = 'bottom'
  } = defineProps<Props>()

  const slots = useSlots()
  const showTooltip = computed(() => !!slots.tooltip || !!tooltip)
</script>

<template>
  <NoxButton
    v-if="!showTooltip"
    size="icon"
    @click="onClick"
    :class="cn('rounded-full', classes)"
    :disabled="disabled"
    :variant="variant"
  >
    <slot></slot>
  </NoxButton>

  <NoxTooltip v-else :side="tooltipSide" :content-class="tooltipContentClass">
    <template #trigger>
      <NoxButton
        size="icon"
        @click="onClick"
        :class="cn('rounded-full', classes)"
        :disabled="disabled"
        :variant="variant"
      >
        <slot></slot>
      </NoxButton>
    </template>
    <slot v-if="slots.tooltip" name="tooltip"></slot>
    <template v-else>{{ tooltip }}</template>
  </NoxTooltip>
</template>
