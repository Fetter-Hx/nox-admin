import type { Component, Ref } from 'vue'
import type { BaseFormComponentType, FormContext, GenericObject } from './base'
import type { FormCommonConfig } from './form-common-type'
import type { FormSchema } from './form-shcema-type'
import type { ClassType } from '@nox-core/typings'
import type { NoxButtonProps } from '@nox-core/shadcn-ui'
import type { FormApi } from '../form-api'

/**
 * 决定input 和 lalbel是否在同行
 */
type FormLayout = 'horizontal' | 'vertical'
type BreakPoints = '' | 'sm:' | 'md:' | 'lg:' | 'xl:' | '2xl:'
type GridCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type WrapperClassType = `${BreakPoints}grid-cols-${GridCols}` | (Record<never, never> & string)

export type FieldMappingTime = [string, [string, string], ([string, string] | string)?][]

export interface ActionButtonOptions extends NoxButtonProps {
  [key: string]: any
  content?: string
  show?: boolean
}

export type HandleSubmitFn = (values: Record<string, any>) => Promise<void> | void
export type HandleResetFn = (values: Record<string, any>) => Promise<void> | void

/** 表单渲染props */
export interface FormRenderProps<T extends BaseFormComponentType = BaseFormComponentType> {
  /**
   * 是否折叠表单 开启showCollpaseButton生效
   */
  collapsed?: boolean
  /**
   * 折叠后行数
   * @default 1
   */
  collapsedRows?: number
  /**
   * 是否触发resize事件
   */
  collapseTriggerResize?: boolean
  /**
   * 所有表单项通用配置，子项可以进行重写覆盖
   */
  commonConfig?: FormCommonConfig
  /**
   * 组件v-model事件绑定集合
   */
  componentBindEventMap?: Partial<Record<BaseFormComponentType, string>>
  /**
   * 组件集合
   */
  componentMap: Record<BaseFormComponentType, Component>
  /**
   * 表单实例上下文
   */
  form?: FormContext<GenericObject>
  /**
   * 布局模式
   * @default 'horizontal'
   */
  layout?: FormLayout
  /**
   * 表单schema
   */
  schema?: FormSchema<T>[]
  /**
   * 是否显示展开/折叠按钮
   */
  showCollapseButton?: boolean
  /**
   * 表单的栅格布局
   * @default 'grid-cols-1'
   */
  wrapperClass?: WrapperClassType
}

export interface NoxFormProps<T extends BaseFormComponentType = BaseFormComponentType>
  extends Omit<FormRenderProps<T>, 'componentBindEventMap' | 'componentMap' | 'form'> {
  /**
   * 操作按钮位置是否反转 （提交按钮前置）
   */
  actionButtonsReverse?: boolean
  /**
   * 表单操作区class
   */
  actionWrapperClass?: ClassType
  /**
   * 表单字段映射成时间格式
   */
  fieldMappingTime?: FieldMappingTime
  /**
   * 表单重置回调
   */
  handleReset?: HandleResetFn
  /**
   * 表单提交回调
   */
  handleSubmit?: HandleSubmitFn
  /**
   *
   * 表单值变化回调
   */
  handleValuesChange?: (values: Record<string, any>) => void
  /**
   * 重置按钮配置参数
   */
  resetButtonOptions?: ActionButtonOptions
  /**
   * 提交按钮配置参数
   */
  submitButtonOptions?: ActionButtonOptions
  /**
   * 是否显示默认操作按钮
   */
  showDefaultActions?: boolean
  /**
   * 是否在字段值改变时提交表单
   * @default false
   */
  submitOnChange?: boolean
  /**
   * 是否在回车时提交表单
   */
  submitOnEnter?: boolean
}

export type ExtendedFormApi = FormApi & {
  useStore: <T = NoInfer<NoxFormProps>>(
    selector?: (state: NoInfer<NoxFormProps>) => T
  ) => Readonly<Ref<T>>
}
