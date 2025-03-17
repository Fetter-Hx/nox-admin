import { createDefu } from 'defu'

// 使用defu库来处理合并对象

export { defu as merge } from 'defu'

/**
 * 自定义合并 特殊处理了值是数组的情况，用更新对象的值替换原始对象的数组值，而不是合并两个数组
 * @see https://github.com/unjs/defu?tab=readme-ov-file#custom-mergernjs/defu
 * @param object destination object
 * @param ...defaults source object
 */
const mergeWithArrayOverride = createDefu((originObj, key, updates) => {
  if (Array.isArray(originObj[key]) && Array.isArray(updates)) {
    originObj[key] = updates
    return true
  }
})

export { mergeWithArrayOverride }
