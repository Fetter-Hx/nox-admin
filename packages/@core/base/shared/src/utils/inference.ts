import { isString, isFunction, isObject } from '@vue/shared'

function getFirstNotNullOrUndefined<T>(...values: (null | undefined | T)[]): T | undefined {
  for (const value of values) {
    if (value !== null && value !== undefined) {
      return value
    }
  }
  return undefined
}

/**
 * 判断值是否为布尔类型
 * @param value
 * @returns 如果值是布尔类型返回true，否则返回false
 */
function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export { getFirstNotNullOrUndefined, isString, isFunction, isObject, isBoolean }
