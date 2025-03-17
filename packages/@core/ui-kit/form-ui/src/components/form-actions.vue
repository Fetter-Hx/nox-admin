<script setup lang="ts">
  import { toRaw, unref, computed } from 'vue'
  import { COMPONENT_MAP } from '../config'
  import { injectFormProps } from '../use-form-context'
  import { cn, isFunction } from '@nox-core/shared/utils'
  import { useSimpleLocale } from '@nox-core/composables'

  const { $t } = useSimpleLocale()

  const [rootProps, form] = injectFormProps()

  const submitButtonOptions = computed(() => {
    return {
      content: $t.value('submit'),
      show: true,
      ...unref(rootProps).submitButtonOptions
    }
  })

  const resetButtonOptions = computed(() => {
    return {
      content: $t.value('reset'),
      show: true,
      ...unref(rootProps).resetButtonOptions
    }
  })

  const actionAreaStyle = computed(() => {
    if (!unref(rootProps).actionWrapperClass) {
      return {
        'grid-column': '-2 / -1',
        marginLeft: 'auto'
      }
    }

    return {}
  })

  // 提交表单
  async function handleSubmit(e: Event) {
    e?.preventDefault()
    e?.stopPropagation()
    // 校验表单
    const { valid } = await form.validate()
    if (!valid) {
      return
    }

    const values = toRaw(await unref(rootProps).formApi?.getValues())
    await unref(rootProps).handleSubmit?.(values)
  }

  // 重置表单
  async function handleReset(e: Event) {
    e?.preventDefault()
    e?.stopPropagation()

    const props = unref(rootProps)
    const values = toRaw(await props.formApi?.getValues())

    if (isFunction(props.handleReset)) {
      await props.handleReset(values)
    } else {
      form.resetForm()
    }
  }

  defineExpose({
    handleSubmit,
    handleReset
  })
</script>

<template>
  <div
    :class="cn('col-span-full w-full text-right', rootProps.actionWrapperClass)"
    :style="actionAreaStyle"
  >
    <template v-if="rootProps.actionButtonsReverse">
      <slot name="submit-before"></slot>

      <component
        :is="COMPONENT_MAP.PrimaryButton"
        v-if="submitButtonOptions.show"
        @click="handleSubmit"
        v-bind="submitButtonOptions"
        class="ml-3"
        type="button"
      >
        {{ submitButtonOptions.content }}
      </component>
    </template>

    <slot name="reset-before"></slot>

    <component
      :is="COMPONENT_MAP.DefaultButton"
      v-if="resetButtonOptions.show"
      v-bind="resetButtonOptions"
      @click="handleReset"
      type="button"
      class="ml-3"
    >
      {{ resetButtonOptions.content }}
    </component>

    <template v-if="!rootProps.actionButtonsReverse">
      <slot name="submit-before"></slot>

      <component
        :is="COMPONENT_MAP.PrimaryButton"
        v-if="submitButtonOptions.show"
        @click="handleSubmit"
        v-bind="submitButtonOptions"
        class="ml-3"
        type="button"
      >
        {{ submitButtonOptions.content }}
      </component>
    </template>
  </div>
</template>
