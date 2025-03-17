import { unref, computed, type ComputedRef, useSlots } from 'vue'
import { object, type ZodRawShape } from 'zod'
import type { NoxFormProps, FormActions, ExtendedFormApi } from './types'
import { isString } from '@nox-core/shared/utils'
import { getDefaultsForSchema } from 'zod-defaults'
import { useForm } from 'vee-validate'
import { createContext } from '@nox-core/shadcn-ui'

type ExtendFormProps = NoxFormProps & { formApi: ExtendedFormApi }

// radix-vue的createContext方法
export const [injectFormProps, provideFormProps] =
  createContext<[ComputedRef<ExtendFormProps> | ExtendFormProps, FormActions]>('NoxFormProps')

/**
 * 初始化form 并且获取slots
 */
export function useFormInitial(props: ComputedRef<NoxFormProps> | NoxFormProps) {
  const initialValues = generateInitialValues()
  const form = useForm({
    ...(Object.keys(initialValues)?.length ? { initialValues } : {})
  })

  const slots = useSlots()
  // 获取所有非默认插槽
  const delegatedSlots = computed(() => {
    const resultSlots: string[] = []

    for (const key of Object.keys(slots)) {
      if (key !== 'default') {
        resultSlots.push(key)
      }
    }

    return resultSlots
  })

  /**
   * 获取字段默认值用以useForm初始化
   * @see https://vee-validate.logaretm.com/v4/api/use-form
   */
  function generateInitialValues() {
    const initialValues: Record<string, any> = {}

    const zodObject: ZodRawShape = {}

    ;(unref(props)?.schema ?? []).forEach((item) => {
      if (Reflect.has(item, 'defaultValue')) {
        initialValues[item.fieldName] = item.defaultValue
      } else if (item.rules && !isString(item.rules)) {
        // 如果rules是zod类型则从中获取默认值
        zodObject[item.fieldName] = item.rules
      }
    })

    const schemaInitialValues = getDefaultsForSchema(object(zodObject))

    return { ...initialValues, ...schemaInitialValues }
  }

  return { form, delegatedSlots }
}
