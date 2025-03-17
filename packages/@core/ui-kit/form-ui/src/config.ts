import { defineRule } from 'vee-validate'
import type { BaseFormComponentType, FormCommonConfig, NoxFormAdapterOptions } from './types'
import { globalShareState } from '@nox-core/shared/global-state'
import { h, type Component } from 'vue'
import { NoxButton, Input as NoxInput, NoxCheckbox } from '@nox-core/shadcn-ui'

// 默认全局表单通用配置
export const DEFAULT_FORM_COMMON_CONFIG: FormCommonConfig = {}

// 默认组件的model prop名称
const DEFAULT_MODEL_PROP_NAME = 'modelValue'

export const COMPONENT_MAP: Record<BaseFormComponentType, Component> = {
  DefaultButton: h(NoxButton, { size: 'sm', variant: 'outline' }),
  PrimaryButton: h(NoxButton, { size: 'sm', variant: 'default' }),
  NoxInput,
  NoxCheckbox
}

export const COMPONENT_BIND_EVENT_MAP: Partial<Record<BaseFormComponentType, string>> = {
  NoxCheckbox: 'checked'
}

export function setupNoxForm<T extends BaseFormComponentType = BaseFormComponentType>(
  options: NoxFormAdapterOptions<T>
) {
  // 配置和规则
  const { config, defineRules } = options

  const { disabledOnChangeListener, disabledOnInputListener, emptyStateValue } = (config ||
    {}) as FormCommonConfig

  Object.assign(DEFAULT_FORM_COMMON_CONFIG, {
    disabledOnChangeListener,
    disabledOnInputListener,
    emptyStateValue
  })

  // 定义验证器
  if (defineRules) {
    for (const key of Object.keys(defineRules)) {
      defineRule(key, defineRules[key as never])
    }
  }

  // v-model 绑定的prop名称
  const baseModelPropName = config?.baseModelPropName ?? DEFAULT_MODEL_PROP_NAME

  // 组件与对应的 model prop名称映射
  const modelPropNameMap = config?.modelPropNameMap as Record<BaseFormComponentType, string>

  const components = globalShareState.getComponents()
  for (const component of Object.keys(components)) {
    const key = component as BaseFormComponentType
    COMPONENT_MAP[key] = components[component]

    // 处理默认不是modelValue的情况
    if (baseModelPropName !== DEFAULT_MODEL_PROP_NAME) {
      COMPONENT_BIND_EVENT_MAP[key] = baseModelPropName
    }

    // 处理特殊组件
    if (modelPropNameMap && modelPropNameMap[key]) {
      COMPONENT_BIND_EVENT_MAP[key] = modelPropNameMap[key]
    }
  }
}
