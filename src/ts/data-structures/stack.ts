export default class Stack<T> {
  // 存储的Map
  private items: Map<number, T>;

  //
  constructor() {
    this.items = new Map();
  }

  /**
   * @description: 入栈
   * @param {T} element 要入栈的元素
   */
  push(element: T) {
    this.items.set(this.items.size, element);
  }

  /**
   * @description: 出栈
   * @return {T} 返回出栈的元素
   */
  pop(): T {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items.get(this.items.size - 1);
    this.items.delete(this.items.size - 1);
    return result;
  }

  /**
   * @description: 返回栈顶的元素
   * @return {T}
   */
  peek(): T {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.get(this.items.size - 1);
  }

  /**
   * @description: 返回栈是否为空
   * @return {Boolean}
   */
  isEmpty(): boolean {
    return this.items.size === 0;
  }

  /**
   * @description: 返回栈里的元素个数
   * @return {Number}
   */
  size(): number {
    return this.items.size;
  }

  /**
   * @description: 清空栈
   */
  clear() {
    this.items.clear();
  }

  /**
   * @description: 覆盖Object默认的toString
   * @return {String}
   */
  toString(): string {
    if (this.isEmpty()) {
      return "";
    }
    let result: string = "";
    this.items.forEach((value, key) => {
      result = `${result}${key === 0 ? "" : ","}${value}`;
    });
    return result;
  }
}
