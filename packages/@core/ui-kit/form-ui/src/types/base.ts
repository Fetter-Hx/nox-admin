export type { FormContext, GenericObject } from 'vee-validate'

/**
 * 表单项可用的组件类型
 */
export type BaseFormComponentType =
  | 'DefaultButton'
  | 'PrimaryButton'
  | 'NoxInput'
  | (Record<never, never> & string)
