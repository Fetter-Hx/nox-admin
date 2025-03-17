import type { ComputedRef, Ref } from 'vue'

import { computed, getCurrentInstance, unref } from 'vue'

import { kebabToCamelCase, getFirstNotNullOrUndefined } from '@nox-core/shared/utils'

/**
 * 依次从props 和 state 中获取值
 * @param key
 * @param props
 * @param state
 */
export function usePriorityValue<
  T extends Record<string, any>,
  S extends Record<string, any>,
  K extends keyof T = keyof T
>(key: K, props: T, state: Readonly<Ref<NoInfer<S>> | undefined>) {
  const instance = getCurrentInstance() // 当前组件实例

  const value = computed((): T[K] => {
    // props 无论是否传入都会有默认值 , 所以真正的value会被影响
    // 例如 props没有设置字段a 那么props里的字段a默认值false 那么就会应用false 而不是实际传入的 ccoptions的字段a的值
    // 所以这里通过instance获取原始props是否有值判断是否传入
    const rawProps = (instance?.vnode?.props || {}) as T

    const standardRawProps = {} as T
    for (const [key, value] of Object.entries(rawProps)) {
      // 原始props的key采用的是kebab-case 这里需要转为camelCase
      standardRawProps[kebabToCamelCase(key) as K] = value as T[K]
    }

    const propsKey = standardRawProps?.[key] === undefined ? undefined : props[key]

    return getFirstNotNullOrUndefined(propsKey, state?.value?.[key as keyof S]) as T[K]
  })

  return value
}

/**
 * 批量获取props 和 state 中的值 并集中在一个computed中
 * @param props
 * @param state
 */
export function useForwardPriorityValues<
  T extends Record<string, any>,
  S extends Ref<Record<string, any>> = Readonly<Ref<NoInfer<T>, NoInfer<T>>>
>(props: T, state: S) {
  const computedResult: { [K in keyof T]: ComputedRef<T[K]> } = {} as never

  ;(Object.keys(props) as (keyof T)[]).forEach((key) => {
    computedResult[key] = usePriorityValue(key as keyof typeof props, props, state)
  })

  return computed(() => {
    const unwrapResult: Record<string, any> = {}
    Object.keys(props).forEach((key) => {
      unwrapResult[key] = unref(computedResult[key])
    })
    return unwrapResult as { [K in keyof T]: T[K] }
  })
}
