import type { NoxFormProps, BaseFormComponentType, ExtendedFormApi } from './types'

import { h, defineComponent } from 'vue'
import { FormApi } from './form-api'
import NoxUseForm from './nox-use-form.vue'
import { useStore } from '@nox-core/shared/store'

export function useNoxForm<T extends BaseFormComponentType = BaseFormComponentType>(
  options: NoxFormProps<T>
) {
  const api = new FormApi(options)
  const extendedApi = api as never as ExtendedFormApi
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector)
  }
  const Form = defineComponent(
    (props: NoxFormProps, { attrs, slots }) => {
      return () => h(NoxUseForm, { ...props, ...attrs, formApi: extendedApi }, slots)
    },
    {
      inheritAttrs: false,
      name: 'NoxUseForm'
    }
  )

  return [Form, extendedApi] as const
}
