<script setup lang="ts">
  import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
    NoxRenderContent
  } from '@nox-core/shadcn-ui'
  import FormLabel from './form-label.vue'
  import type { FormSchema, MayComponentProps } from '../types'
  import { computed } from 'vue'
  import useDependencies from './dependencies'
  import { cn, isFunction, isString } from '@nox-core/shared/utils'
  import type { ZodType } from 'zod'
  import { toTypedSchema } from '@vee-validate/zod'
  import { injectFormRenderProps, useFormContext } from './context'
  import { useFormValues } from 'vee-validate'

  interface Props extends FormSchema {}

  const {
    commonComponentProps,
    component,
    componentProps,
    disabled,
    emptyStateValue,
    fieldName,
    label,
    labelClass,
    labelWidth,
    modelPropName,
    renderComponentContent,
    rules,
    dependencies,
    formFieldProps
  } = defineProps<Props & { commonComponentProps: MayComponentProps }>()

  const { isVertical, componentMap, componentBindEventMap } = useFormContext()
  const formRenderProps = injectFormRenderProps()
  const values = useFormValues()
  const formApi = formRenderProps.form

  // 当前字段渲染的组件
  const FieldComponent = computed(() => {
    const finalComponent = isString(component) ? componentMap.value[component] : component
    if (!finalComponent) {
      console.warn(`组件${component}未注册`)
    }

    return finalComponent
  })

  const { dynamicComponentProps, isIf, isShow, dynamicRules, isRequired, isDisabled } =
    useDependencies(() => dependencies)

  // 组件props参数
  const computedProps = computed(() => {
    const finalComponentProps = isFunction(componentProps)
      ? componentProps(values.value, formApi!)
      : componentProps

    return {
      ...commonComponentProps,
      ...finalComponentProps,
      ...dynamicComponentProps.value
    }
  })

  // 自定义渲染内容
  const customContentRender = computed(() => {
    if (!isFunction(renderComponentContent)) {
      return {}
    }
    return renderComponentContent(values.value, formApi!)
  })

  const renderContentKey = computed(() => {
    return Object.keys(customContentRender.value)
  })

  const labelStyle = computed(() => {
    return labelClass?.includes('w-') || isVertical.value ? {} : { width: `${labelWidth}px` }
  })

  const visible = computed(() => {
    return isIf.value && isShow.value
  })

  const shouldDisabled = computed(() => {
    return isDisabled.value || disabled || computedProps.value?.disabled
  })

  // 当前传入的或动态依赖计算的字段规则
  const currentRules = computed(() => {
    return dynamicRules.value || rules
  })

  // 是否必填
  const shouldRequired = computed(() => {
    // 若不显示 则不校验
    if (!visible.value) {
      return false
    }

    // 若无规则,根据依赖的动态判断
    if (!currentRules.value) {
      return isRequired.value
    }

    if (isRequired.value) {
      return true
    }

    if (isString(currentRules.value)) {
      return ['required', 'selectRequired'].includes(currentRules.value)
    }

    let isOptional = currentRules?.value?.isOptional?.()

    // 如果具有默认值，则zod会默认是非必填的，即isOptional是true，这时需要判断innerType是否要求必填
    const typeName = currentRules?.value?._def?.typeName
    if (typeName === 'ZodDefault') {
      const innerType = currentRules?.value?._def?.innerType
      if (innerType) {
        isOptional = innerType?.isOptional?.()
      }
    }

    return !isOptional
  })

  // 最终传递给FormField组件的规则
  const fielddRules = computed(() => {
    if (!visible.value) {
      return null
    }

    let rules = currentRules.value

    if (!rules) {
      return isRequired.value ? 'required' : null
    }

    if (isString(rules)) {
      return rules
    }

    const isOptional = !shouldRequired.value
    // 对于包装过的zod规则，进行解包，获取原始的规则，例如 promise、optional、nullabled、branch方法都会对原zod规则进行包装
    // 但是这里要排除isOptional为true的情况，因为这个时候不应该解包，解包后会导致字段可选失效，也就是设置了optional但是还会要求字段必填
    if (!isOptional) {
      const unwrappedRules = (rules as any)?.unwrap?.()
      if (unwrappedRules) {
        rules = unwrappedRules
      }
    }

    // 通过@vee-validate/zod 提供的toTypedSchema方法，将zod规则转换为vee-validate可解析识别的规则
    return toTypedSchema(rules as ZodType)
  })

  const fieldProps = computed(() => {
    const rules = fielddRules.value
    return {
      keepValue: true, // 卸载时仍保留字段值
      label,
      ...(rules ? { rules } : {}),
      ...(formFieldProps as Record<string, any>)
    }
  })

  // 若modelpropName不是默认的modelValue 重写绑定的modelprop名和对应的事件
  function fieldBindEvent(slotProps: Record<string, any>) {
    const modelValue = slotProps.componentField.modelValue
    const handler = slotProps.componentField['onUpdate:modelValue']

    // 绑定的modelprop属性名
    const bindEventField =
      modelPropName || (isString(component) ? componentBindEventMap.value?.[component] : null)

    const value = modelValue

    if (bindEventField) {
      return {
        [bindEventField]: value === undefined ? emptyStateValue : value,
        [`onUpdate:${bindEventField}`]: handler
      }
    }
  }

  function createComponentProps(slotProps: Record<string, any>) {
    const bindEvents = fieldBindEvent(slotProps)

    const binds = {
      ...slotProps.componentField,
      ...computedProps.value,
      ...bindEvents
    }
    return binds
  }
</script>

<template>
  <FormField v-if="isIf" v-bind="fieldProps" v-slot="slotProps" :name="fieldName">
    <FormItem
      v-show="isShow"
      v-bind="$attrs"
      class="flex"
      :class="cn('pb-6', { 'flex-col': isVertical, 'flex-row items-center': !isVertical })"
    >
      <FormLabel
        v-if="!hideLabel"
        :class="
          cn(
            'flex leading-6',
            {
              'mr-2 flex-shrink-0 justify-end': !isVertical,
              'mb-1 flex-row': isVertical
            },
            labelClass
          )
        "
        :style="labelStyle"
        :required="shouldRequired && !hideRequireMark"
      >
        <template v-if="label">
          <span>{{ label }}</span>
        </template>
      </FormLabel>

      <div :class="cn('relative flex w-full items-center', wrapperClass)">
        <FormControl :class="cn(controlClass)">
          <slot
            v-bind="{ ...slotProps, ...createComponentProps(slotProps), disabled: shouldDisabled }"
          >
            <component
              :is="FieldComponent"
              :disabled="shouldDisabled"
              v-bind="createComponentProps(slotProps)"
            >
              <template v-for="name in renderContentKey" :key="name" #[name]="renderSlotProps">
                <NoxRenderContent
                  :content="customContentRender[name]"
                  v-bind="{ ...renderSlotProps, $formContext: slotProps }"
                />
              </template>
            </component>
          </slot>
        </FormControl>
        <!-- 自定义后缀内容 -->
        <div v-if="suffix" class="ml-1">
          <NoxRenderContent :content="suffix" />
        </div>
        <FormDescription v-if="description">
          <NoxRenderContent :content="description" />
        </FormDescription>
        <Transition name="slide-up">
          <FormMessage class="absolute -bottom-[22px]" />
        </Transition>
      </div>
    </FormItem>
  </FormField>
</template>
