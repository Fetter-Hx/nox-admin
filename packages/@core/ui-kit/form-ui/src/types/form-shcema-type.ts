import type { Component } from 'vue'
import type { ZodTypeAny } from 'zod'
import type {
  FormCommonConfig,
  ComponentProps,
  FormActions,
  MayComponentProps
} from './form-common-type'
import type { BaseFormComponentType } from './base'

type RenderComponentContentType = (
  value: Record<string, any>,
  api: FormActions
) => Record<string, any>

type CustomRenderType = (() => Component | string) | string

/** 表单项的规则 */
export type FormShcemaRuleType =
  | 'required'
  | 'selectRequired'
  | null
  | ZodTypeAny // zod表单验证器类型
  | (Record<never, never> & string) // 通过vee-validate进行自定义规则

type FormItemDependenciesCondition<T = boolean | PromiseLike<boolean>> = (
  value: Partial<Record<string, any>>,
  actions: FormActions
) => T

type FormItemDependenciesConditionWithProps = (
  value: Partial<Record<string, any>>,
  actions: FormActions
) => MayComponentProps | PromiseLike<MayComponentProps>

type FormItemDependenciesConditionWithRules = (
  value: Partial<Record<string, any>>,
  actions: FormActions
) => FormShcemaRuleType | PromiseLike<FormShcemaRuleType>

export interface FormItemDependencies {
  /**
   * 组件参数
   */
  componentProps?: FormItemDependenciesConditionWithProps
  /**
   * 是否禁用
   */
  disabled?: boolean | FormItemDependenciesCondition
  /**
   * 是否渲染(dom)
   */
  if?: boolean | FormItemDependenciesCondition
  /**
   * 是否必填
   */
  required?: FormItemDependenciesCondition
  /**
   * 字段验证规则
   */
  rules?: FormItemDependenciesConditionWithRules
  /**
   * 是否显示(css)
   */
  show?: boolean | FormItemDependenciesCondition
  /**
   * 任意触发都执行
   */
  trigger?: FormItemDependenciesCondition<void>
  /**
   * 触发字段
   */
  triggerFields?: string[]
}

/**
 * 表单字段项的配置
 * 继承通用公共配置FormCommonConfig
 * 每个表单项可通过重写FormCommonConfig中的属性来覆盖默认值
 */
export interface FormSchema<T extends BaseFormComponentType = BaseFormComponentType>
  extends FormCommonConfig {
  /** 组件 */
  component: Component | T
  /** 组件的props */
  componentProps?: ComponentProps
  /** 默认值 */
  defaultValue?: any
  /** 依赖 */
  dependencies?: FormItemDependencies
  /** 字段描述 */
  description?: string
  /** 字段名 必填 */
  fieldName: string
  /** 帮助提示信息 */
  help?: string
  /** 标签 */
  label?: string
  /** 自定义组件内部渲染 */
  renderComponentContent?: RenderComponentContentType
  /** 字段规则 */
  rules?: FormShcemaRuleType
  /** 自定义后缀 */
  suffix?: CustomRenderType
}
