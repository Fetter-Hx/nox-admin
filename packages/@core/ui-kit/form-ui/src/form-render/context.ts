import { createContext } from '@nox-core/shadcn-ui'
import type { FormRenderProps } from '../types'
import { computed } from 'vue'

export const [injectFormRenderProps, provideFormRenderProps] =
  createContext<FormRenderProps>('FormRenderProps')

export const useFormContext = () => {
  const formRenderProps = injectFormRenderProps()

  const isVertical = computed(() => formRenderProps.layout === 'vertical')

  const componentMap = computed(() => formRenderProps.componentMap)

  const componentBindEventMap = computed(() => formRenderProps.componentBindEventMap)

  return {
    isVertical,
    componentMap,
    componentBindEventMap
  }
}
