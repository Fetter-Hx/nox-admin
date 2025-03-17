/**
 * 全局共享复用的变量、组件、配置等
 */

interface ComponentsState {
  [key: string]: any
}

class GlobalShareState {
  #components: ComponentsState = {}

  public setComponents(value: ComponentsState) {
    this.#components = value
  }

  public getComponents(): ComponentsState {
    return this.#components
  }
}

export const globalShareState = new GlobalShareState()
