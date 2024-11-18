<script lang="ts" setup>
  import type { LabelProps } from 'radix-vue'
  import type { HTMLAttributes } from 'vue'
  import { Label } from '../label'
  import { cn } from '@nox-core/shared/utils'
  import { useFormField } from './useFormField'

  const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

  const { error, formItemId } = useFormField()
</script>

<template>
  <Label :class="cn(error && 'text-destructive', props.class)" :for="formItemId">
    <slot></slot>
  </Label>
</template>
