/*
 * @Author: HX
 * @Date: 2024-10-25 16:02:14
 * @LastEditors: HX
 * @LastEditTime: 2024-10-28 09:49:48
 * @FilePath: \nox-monorepo\packages\utils\src\helpers\unmount-global-loading.ts
 * @Description: 移除销毁全局loading
 *
 */
export function unmountGlobalLoading() {
  // 全局loading元素 -- 对应loading.html的loading元素的id
  const loadingElement = document.querySelector('#__app-loading__')

  if (loadingElement) {
    loadingElement.classList.add('hidden')

    // 查找所有需要移除的注入loading的元素  ^=inject代表以inject开头的元素
    const injectLoadingElements = document.querySelectorAll('[data-app-loading^=inject]')

    // 移除销毁loading元素 和所有注入的loading元素 <style> <script>之类的
    loadingElement.addEventListener(
      'transitionend',
      () => {
        loadingElement.remove()
        injectLoadingElements.forEach((el) => {
          el.remove()
        })
      },
      { once: true }
    )
  }
}
