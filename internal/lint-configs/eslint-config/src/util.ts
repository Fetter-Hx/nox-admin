/**
 * 支持异步/同步两种返回值
 */
export type Awaitable<T> = T | Promise<T>

/**
 *
 * @param {Awaitable<T>} m 传入的模块 可能是一个Promise异步模块 或者是一个同步模块
 * @returns {Promise<T extends {default:infer U}? U:T>} 如果模块有`default`导出 则返回 `default`，否则返回整个模块。
 */
export async function resolveDefault<T>(
  m: Awaitable<T>
): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  return (resolved as any).default ?? resolved
}
