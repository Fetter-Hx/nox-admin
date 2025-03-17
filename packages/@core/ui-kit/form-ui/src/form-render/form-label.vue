<script setup lang="ts">
  import { FormLabel } from '@nox-core/shadcn-ui'
  import { cn } from '@nox-core/shared/utils'

  interface Props {
    class?: string
    required?: boolean
  }

  const { class: labelClass, required } = defineProps<Props>()
</script>

<template>
  <FormLabel :class="cn('flex items-center', labelClass)">
    <span v-if="required" class="text-destructive mr-[2px]">*</span>
    <slot></slot>
  </FormLabel>
</template>
