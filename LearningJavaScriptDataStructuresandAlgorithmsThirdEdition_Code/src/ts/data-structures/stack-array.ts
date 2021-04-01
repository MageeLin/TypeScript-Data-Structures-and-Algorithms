export default class StackArray<T> {
  // 存储的Array
  private items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * @description: 入栈
   * @param {T} element 要入栈的元素
   */
  push(element: T) {
    this.items.push(element);
  }

  /**
   * @description: 出栈
   * @return {T} 返回出栈的元素
   */
  pop(): T {
    return this.items.pop();
  }

  /**
   * @description: 返回栈顶的元素
   * @return {T}
   */
  peek(): T {
    return this.items[this.items.length - 1];
  }

  /**
   * @description: 返回栈是否为空
   * @return {Boolean}
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * @description: 返回栈里的元素个数
   * @return {Number}
   */
  size(): number {
    return this.items.length;
  }

  /**
   * @description: 清空栈
   */
  clear() {
    this.items = [];
  }

  /**
   * @description: 覆盖Object默认的toString
   * @return {String}
   */
  toString(): string {
    return this.items.toString();
  }
}
