import type { HtmlHTMLAttributes } from 'vue'
import type { BaseFormComponentType, FormContext, GenericObject } from './base'
import type { FieldOptions } from 'vee-validate'

/** 允许的componentProps的key */
export type MayComponentPropsKey =
  /** select组件的options */
  | 'options'
  /** 输入框的placeholder */
  | 'placeholder'
  /** 元素的标题 */
  | 'title'
  | keyof HtmlHTMLAttributes
  | (Record<never, never> & string)

export type MayComponentProps = { [K in MayComponentPropsKey]?: any }

/** 表单实例的上下文，通过上下文的一些方法或数据进行一些动态操作 */
export type FormActions = FormContext<GenericObject>

/** componentProps的类型 */
export type ComponentProps =
  | ((value: Partial<Record<string, any>>, action: FormActions) => MayComponentProps)
  | MayComponentProps

/** 表单项的配置项 */
export type FormFieldOptions = Partial<
  {
    /** @see https://vee-validate.logaretm.com/v4/api/configuration#updating-the-config */
    /**
     * 是否在失去焦点时进行验证
     * @default true
     */
    validateOnBlur?: boolean
    /**
     * 是否在值改变时进行验证
     * @default true
     */
    validateOnChange?: boolean
    /**
     * 是否在input event触发时进行验证
     * @default false
     */
    validateOnInput?: boolean
    /**
     * 是否在update:modelValue 触发时进行验证
     * @default true
     */
    validateOnModelUpdate?: boolean
  } & FieldOptions
>

/** 通用公共配置 */
export interface FormCommonConfig {
  /** 所有表单项通用接收props */
  componentProps?: ComponentProps
  /**
   * 所有表单项的控件样式
   * @use `<FormControl :class="cn(controlClass)"></FormControl>`
   */
  controlClass?: string
  /**
   * 所有表单项的禁用状态
   */
  disabled?: boolean
  /**
   * 禁用所有表单项的change事件监听
   * @default true
   */
  disabledOnChangeListener?: boolean
  /**
   * 是否禁用所有表单项的input事件监听
   * @default true
   */
  disabledOnInputListener?: boolean
  /**
   * 所有表单项的空状态值,默认都是undefined，naive-ui的空状态值是null
   */
  emptyStateValue?: null | undefined
  /**
   * 所有表单的字段配置项
   */
  formFieldProps?: FormFieldOptions
  /**
   * 所有表单项的样式（整个FormField整体）
   * @default ''
   * @use `<FormField :class="formItemClass"></FormField>`
   */
  formItemClass?: string
  /**
   * 隐藏所有表单项的label
   * @default false
   */
  hideLabel?: boolean
  /**
   * 隐藏所有表单项的必填标记
   * @default false
   */
  hideRequireMark?: boolean
  /**
   * 所有表单项的label样式
   */
  labelClass?: string
  /**
   * 所有表单项的label宽度
   */
  labelWidth?: number
  /**
   * 所有表单项的model属性名
   * @default 'modelValue'
   */
  modelPropName?: string
  /**
   * 所有表单项的wrapper样式(包含控件主体、表单描述、错误信息等)
   * @use
   * `<div :class="wrapperClass">`
   *    `<FormControl></FormControl>`
   *    `<FormDescription></FormDescription>`
   *    `<FormMessage></FormMessage>`
   * `</div>`
   */
  wrapperClass?: string
}

/** 适配器配置*/
export interface NoxFormAdapterOptions<T extends BaseFormComponentType = BaseFormComponentType> {
  config?: {
    /**
     * 默认v-model绑定的prop属性名
     */
    baseModelPropName?: string
    disabledOnChangeListener?: boolean
    disabledOnInputListener?: boolean
    emptyStateValue?: null | undefined
    /**
     * 组件对应的v-model的属性名 的映射关系
     */
    modelPropNameMap?: Partial<Record<T, any>>
  }
  defineRules?: {
    required?: (
      value: any, // 字段的值
      params: any, // 传入规则的参数
      ctx: any // 正在验证的表单和字段的有用信息
    ) => boolean | string
    selectRequired?: (value: any, params: any, ctx: any) => boolean | string
  }
}
