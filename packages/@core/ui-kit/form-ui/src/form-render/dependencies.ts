import { useFormValues } from 'vee-validate'
import type { FormShcemaRuleType, FormItemDependencies, MayComponentProps } from '../types'
import { injectFormRenderProps } from './context'
import { computed, ref, watch } from 'vue'
import { isBoolean, isFunction } from '@nox-core/shared/utils'

/**
 * 根据当前字段的依赖动态返回一些配置
 * @param getDependencies 获取依赖配置
 * @returns
 */
export default function useDependencies(getDependencies: () => FormItemDependencies | undefined) {
  const values = useFormValues()

  const formRenderProps = injectFormRenderProps()

  // eslint-disable-next-line
  const formApi = formRenderProps.form!

  const isIf = ref(true)
  const isDisabled = ref(false)
  const isShow = ref(true)
  const isRequired = ref(false)
  const dynamicRules = ref<FormShcemaRuleType>()
  const dynamicComponentProps = ref<MayComponentProps>({})

  // 触发字段的值的集合数组
  const triggerFiledValues = computed(() => {
    const triggerFields = getDependencies()?.triggerFields ?? []
    return triggerFields.map((fieldName) => {
      return values.value[fieldName]
    })
  })

  const resetConditionState = () => {
    isIf.value = true
    isDisabled.value = false
    isShow.value = true
    isRequired.value = false
    dynamicRules.value = undefined
    dynamicComponentProps.value = {}
  }

  // 监听触发字段的值 和 依赖配置的变化
  watch(
    [triggerFiledValues, getDependencies],
    async ([_values, dependencies]) => {
      if (!dependencies || !dependencies?.triggerFields?.length) {
        return
      }
      resetConditionState()

      const { if: whenIf, show, componentProps, disabled, required, rules, trigger } = dependencies

      // 表单的{key:value}对象
      const formValues = values.value

      // 如果if为false，不渲染dom，也不执行后续判断
      if (isFunction(whenIf)) {
        isIf.value = await whenIf(formValues, formApi)
        if (!isIf.value) return
      } else if (isBoolean(whenIf)) {
        isIf.value = whenIf
        if (!isIf.value) return
      }

      // 如果show为false，隐藏字段，也不执行后续判断
      if (isFunction(show)) {
        isShow.value = await show(formValues, formApi)
        if (!isShow.value) return
      } else if (isBoolean(show)) {
        isShow.value = show
        if (!isShow.value) return
      }

      if (isFunction(componentProps)) {
        dynamicComponentProps.value = await componentProps(formValues, formApi)
      }

      if (isFunction(disabled)) {
        isDisabled.value = await disabled(formValues, formApi)
      } else if (isBoolean(disabled)) {
        isDisabled.value = disabled
      }

      if (isFunction(required)) {
        isRequired.value = await required(formValues, formApi)
      }

      if (isFunction(rules)) {
        dynamicRules.value = await rules(formValues, formApi)
      }

      if (isFunction(trigger)) {
        await trigger(formValues, formApi)
      }
    },
    {
      immediate: true,
      deep: true
    }
  )

  return {
    isIf,
    isShow,
    isDisabled,
    isRequired,
    dynamicRules,
    dynamicComponentProps
  }
}
