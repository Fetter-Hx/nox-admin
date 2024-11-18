<script setup lang="ts">
  import type { TooltipContentProps } from 'radix-vue'

  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui'

  interface Props {
    delayDuration?: number // 延迟
    side?: TooltipContentProps['side'] // 内容的渲染方向
    contentClass?: any
  }

  const { delayDuration = 0, side = 'right' } = defineProps<Props>()
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration">
    <Tooltip>
      <TooltipTrigger as-child>
        <slot name="trigger"></slot>
      </TooltipTrigger>
      <TooltipContent :side="side" class="bg-accent" :class="contentClass">
        <slot></slot>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
