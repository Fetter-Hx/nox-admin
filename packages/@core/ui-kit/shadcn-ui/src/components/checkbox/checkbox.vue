<script setup lang="ts">
  import { type CheckboxRootProps, type CheckboxRootEmits, useForwardPropsEmits } from 'radix-vue'
  import { useId } from 'vue'
  import { Checkbox } from '../../ui/checkbox'

  const props = defineProps<CheckboxRootProps>()
  const emits = defineEmits<CheckboxRootEmits>()

  const forwarded = useForwardPropsEmits(props, emits)
  const id = useId()
  const checked = defineModel<boolean>('checked')
</script>

<template>
  <div class="flex items-center">
    <Checkbox v-bind="forwarded" :id="id" v-model:checked="checked" />
    <label :for="id" class="ml-2 cursor-pointer text-sm"><slot></slot></label>
  </div>
</template>
