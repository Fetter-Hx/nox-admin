<script setup lang="ts">
  import { Primitive } from 'radix-vue'
  import { computed } from 'vue'

  import { cn } from '@nox-core/shared/utils'

  import type { NoxButtonProps } from './button'
  import { buttonVariants } from '../../ui'
  import { LoaderCircle } from '@nox-core/icons'

  interface Props extends NoxButtonProps {}

  const {
    as = 'button',
    class: classes,
    disabled = false,
    loading = false,
    size = 'default',
    variant = 'default'
  } = defineProps<Props>()

  const isDisabled = computed(() => disabled || loading)
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), classes)"
    :disabled="isDisabled"
  >
    <LoaderCircle v-if="loading" class="mr-2 size-4 flex-shrink-0 animate-spin" />
    <slot></slot>
  </Primitive>
</template>
