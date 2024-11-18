<script lang="ts" setup>
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@nox-core/shared/utils'
  import { useFormField } from './useFormField'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  const { formDescriptionId } = useFormField()
</script>

<template>
  <p :id="formDescriptionId" :class="cn('text-muted-foreground text-sm', props.class)">
    <slot></slot>
  </p>
</template>
