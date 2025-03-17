import type { FormActions, NoxFormProps } from './types'

import { StateHandler } from '@nox-core/shared/utils'
import { Store } from '@nox-core/shared/store'
import { toRaw } from 'vue'

/**
 * 默认初始化数据
 */
function getDefaultState(): NoxFormProps {
  return {
    actionButtonsReverse: false,
    actionWrapperClass: '',
    collapsed: false,
    collapsedRows: 1,
    collapseTriggerResize: false,
    commonConfig: {},
    fieldMappingTime: undefined,
    handleReset: undefined,
    handleSubmit: undefined,
    layout: 'horizontal',
    resetButtonOptions: {},
    schema: [],
    showCollapseButton: false,
    showDefaultActions: true,
    submitButtonOptions: {},
    submitOnChange: false,
    submitOnEnter: false,
    wrapperClass: 'grid-cols-1'
  }
}

export class FormApi {
  // form实例
  public form = {} as FormActions

  // 是否挂载完成
  isMounted = false

  public store: Store<NoxFormProps>

  public state: null | NoxFormProps = null
  stateHandler: StateHandler

  constructor(options: NoxFormProps = {}) {
    const defaultState = getDefaultState()
    const { ...storeState } = options

    this.store = new Store<NoxFormProps>(
      {
        ...defaultState,
        ...storeState
      },
      {
        onUpdate: () => {
          this.updateState()
        }
      }
    )

    this.state = this.store.state
    this.stateHandler = new StateHandler()
  }

  mount(formActions: FormActions) {
    if (!this.isMounted) {
      Object.assign(this.form, formActions)
      this.stateHandler.setConditionTrue()
      this.isMounted = true
    }
  }

  // 获取表单数据
  async getValues() {
    const form = await this.getForm()
    return form.values
  }

  private updateState() {}

  // 获取表单实例
  private async getForm() {
    if (!this.isMounted) {
      // 等待form挂载完成
      await this.stateHandler.waitForCondition()
    }
    if (!this.form?.meta) {
      throw new Error('NoxForm组件未正常挂载')
    }
    return this.form
  }

  // 提交表单
  async submitForm(e?: Event) {
    e?.preventDefault()
    e?.stopPropagation()
    const form = await this.getForm()
    await form.submitForm()
    const rawValues = toRaw(await this.getValues())
    await this.state?.handleSubmit?.(rawValues)

    return rawValues
  }

  async validateAndSubmitForm() {
    const form = await this.getForm()
    const { valid } = await form.validate()
    if (!valid) {
      return
    }

    return await this.submitForm()
  }
}
