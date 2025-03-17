<script setup lang="ts">
  import { computed } from 'vue'
  import type { FormCommonConfig, FormRenderProps, FormSchema } from '../types'
  import { Form } from '@nox-core/shadcn-ui'
  import { cn, mergeWithArrayOverride } from '@nox-core/shared/utils'
  import FormField from './form-field.vue'
  import { provideFormRenderProps } from './context'

  interface Props extends FormRenderProps {}

  const props = defineProps<{ globalCommonConfig?: FormCommonConfig } & Props>()

  provideFormRenderProps(props)

  const {
    // collapsedRows = 1,
    commonConfig = {},
    wrapperClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
    form,
    globalCommonConfig = {},
    schema
  } = props

  // 如果传入了表单上下文说明是用组合式api进行构建表单 ，那么就用form作为根 而不是Form高阶组件
  const formComponent = computed(() => (form ? 'form' : Form))

  // 表单schema
  const computedSchema = computed(
    (): ({
      commonComponentProps: Record<string, any>
      formFieldProps: Record<string, any>
    } & Omit<FormSchema, 'formFieldProps'>)[] => {
      const {
        componentProps = {},
        controlClass = '',
        disabled,
        disabledOnChangeListener = true,
        disabledOnInputListener = true,
        emptyStateValue = undefined,
        formFieldProps = {},
        formItemClass = '',
        hideLabel = false,
        hideRequireMark = false,
        labelClass = '',
        labelWidth = 100,
        modelPropName = '',
        wrapperClass = ''
      } = mergeWithArrayOverride(commonConfig, globalCommonConfig)

      return (schema || []).map((schemaItem) => {
        return {
          disabled,
          disabledOnChangeListener,
          disabledOnInputListener,
          emptyStateValue,
          hideLabel,
          hideRequireMark,
          labelWidth,
          modelPropName,
          wrapperClass,
          ...schemaItem,
          commonComponentProps: componentProps,
          controlClass: cn(controlClass, schemaItem.controlClass),
          formFieldProps: {
            ...formFieldProps,
            ...schemaItem.formFieldProps
          },
          formItemClass: cn('flex-shrink-0', formItemClass, schemaItem.formItemClass),
          labelClass: cn(labelClass, schemaItem.labelClass)
        }
      })
    }
  )
</script>

<template>
  <component :is="formComponent">
    <div :class="wrapperClass" class="grid">
      <template v-for="cShema in computedSchema" :key="cShema.fieldName">
        <FormField v-bind="cShema" :class="cShema.formItemClass" :rules="cShema.rules">
          <template #default="slotProps">
            <slot v-bind="slotProps" :name="cShema.fieldName"></slot>
          </template>
        </FormField>
      </template>
      <slot></slot>
    </div>
  </component>
</template>
