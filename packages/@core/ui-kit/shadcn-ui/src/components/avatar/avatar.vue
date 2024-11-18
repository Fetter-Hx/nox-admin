<script setup lang="ts">
  import type { AvatarRootProps, AvatarFallbackProps, AvatarImageProps } from 'radix-vue'

  import { computed } from 'vue'

  import { Avatar, AvatarFallback, AvatarImage } from '../../ui'

  interface Props extends AvatarRootProps, AvatarFallbackProps, AvatarImageProps {
    alt?: string
    class?: any
    dot?: boolean
    dotClass?: any
  }

  defineOptions({
    inheritAttrs: false
  })

  const {
    alt = 'avatar',
    as = 'button',
    class: classes,
    dot = false,
    dotClass = 'bg-green-500'
  } = defineProps<Props>()

  const text = computed(() => alt.slice(-2).toUpperCase())
</script>

<template>
  <div :class="classes" class="relative flex-shrink-0">
    <Avatar :as="as" :class="classes" class="size-full">
      <AvatarImage :alt="alt" :src="src" />
      <AvatarFallback>{{ text }}</AvatarFallback>
    </Avatar>
    <span
      v-if="dot"
      :class="dotClass"
      class="border-background absolute bottom-0 right-0 size-3 rounded-full border-2"
    ></span>
  </div>
</template>
