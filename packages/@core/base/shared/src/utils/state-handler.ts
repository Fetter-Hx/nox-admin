export class StateHandler {
  #condition: boolean = false
  #resolveCondition: (() => void) | null = null
  #rejectCondition: (() => void) | null = null

  // 失败
  setConditionFalse() {
    this.#condition = false
    if (this.#rejectCondition) {
      this.#rejectCondition()
    }
  }

  // 成功
  setConditionTrue() {
    this.#condition = true
    if (this.#resolveCondition) {
      this.#resolveCondition()
    }
  }

  // 等待
  waitForCondition(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.#condition) {
        return resolve()
      }
      this.#resolveCondition = resolve
      this.#rejectCondition = reject
    })
  }

  // 重置
  reset() {
    this.#condition = false
    this.#clearPromises()
  }

  #clearPromises() {
    this.#resolveCondition = null
    this.#rejectCondition = null
  }
}
