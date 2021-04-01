export default class Queue<T> {
  private count: number;
  private lowestCount: number;
  private items: Map<number, T>;

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = new Map();
  }

  /**
   * @description: 在count方向（队列底部）入队
   * @param {T} element
   */
  enqueue(element: T): void {
    this.items.set(this.count, element);
    this.count++;
  }

  /**
   * @description: 在lowestCount方向（队列顶部）出队
   * @return {T} element
   */
  dequeue(): T {
    if (this.isEmpty()) {
      return undefined;
    }
    const result: T = this.items.get(this.lowestCount);
    this.items.delete(this.lowestCount);
    this.lowestCount++;
    return result;
  }

  /**
   * @description: 返回队列顶部的元素
   * @return {T} element
   */
  peek(): T {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.get(this.lowestCount);
  }

  /**
   * @description: 返回队列是否为空
   * @return {Boolean}
   */
  isEmpty(): boolean {
    return this.items.size === 0;
  }

  /**
   * @description: 清空队列
   */
  clear(): void {
    this.items = new Map();
    this.count = 0;
    this.lowestCount = 0;
  }

  /**
   * @description: 返回队列元素的数目
   * @return {Number}
   */
  size(): number {
    return this.items.size;
  }

  /**
   * @description: 覆盖Object默认的toString
   * @return {String}
   */
  toString(): string {
    if (this.isEmpty()) {
      return "";
    }
    let objString: string = `${this.items.get(this.lowestCount)}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items.get(i)}`;
    }
    return objString;
  }
}
