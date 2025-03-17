<script setup lang="ts">
  import type { NoxFormProps, ExtendedFormApi } from './types'
  import { useForwardPriorityValues } from '@nox-core/composables'
  import { useFormInitial, provideFormProps } from './use-form-context'
  import { Form } from './form-render'
  import { DEFAULT_FORM_COMMON_CONFIG, COMPONENT_MAP, COMPONENT_BIND_EVENT_MAP } from './config'
  import FormActions from './components/form-actions.vue'
  import { useDebounceFn } from '@vueuse/core'
  import { cloneDeep } from '@nox-core/shared/utils'
  import { nextTick, onMounted, watch } from 'vue'

  interface Props extends NoxFormProps {
    formApi: ExtendedFormApi
  }

  const props = defineProps<Props>()

  // 传入useNoxForm函数的参数对象
  const state = props.formApi?.useStore?.()

  // 整合props和state，获取整体配置对象 computedRef
  const forward = useForwardPriorityValues(props, state)

  // 表单上下文
  const { form, delegatedSlots } = useFormInitial(forward)

  provideFormProps([forward, form])
  props.formApi?.mount?.(form)

  // enter事件
  function handleKeyDownEnter(event: KeyboardEvent) {
    // 如果不是textarea，阻止默认提交行为
    // 允许textarea默认换行行为
    if (!(event.target instanceof HTMLTextAreaElement)) {
      event.preventDefault()
    }
    if (!forward.value.submitOnEnter || !forward.value.formApi?.isMounted) {
      return
    }

    forward.value.formApi.validateAndSubmitForm()
  }

  // 表单值变化事件
  const handleValuesChangeDebounced = useDebounceFn(async () => {
    forward.value.handleValuesChange?.(cloneDeep(await forward.value.formApi.getValues()))
    forward.value.submitOnChange && forward.value.formApi?.validateAndSubmitForm()
  }, 300)

  onMounted(async () => {
    await nextTick()
    // form.values有初始化过程，等待挂载后再监听
    watch(() => form.values, handleValuesChangeDebounced, { deep: true })
  })
</script>

<template>
  <Form
    @keydown.enter="handleKeyDownEnter"
    v-bind="forward"
    :form="form"
    :global-common-config="DEFAULT_FORM_COMMON_CONFIG"
    :component-map="COMPONENT_MAP"
    :component-bind-event-map="COMPONENT_BIND_EVENT_MAP"
  >
    <template v-for="slotName in delegatedSlots" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps"></slot>
    </template>

    <template #default="slotProps">
      <slot v-bind="slotProps">
        <FormActions v-if="forward.showDefaultActions">
          <template #reset-before="resetSlotProps">
            <slot name="reset-before" v-bind="resetSlotProps"></slot>
          </template>
          <template #submit-before="submitSlotProps">
            <slot name="submit-before" v-bind="submitSlotProps"></slot>
          </template>
        </FormActions>
      </slot>
    </template>
  </Form>
</template>
