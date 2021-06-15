import {
  Compare,
  defaultCompare,
  ICompareFunction,
  reverseCompare,
  swap
} from "../util";

// 最小堆类
export class MinHeap<T> {
  protected heap: T[] = [];

  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {}

  /**
   * @description: 获取左侧子节点的索引
   */
  private getLeftIndex(index: number): number {
    return 2 * index + 1;
  }

  /**
   * @description: 获取右侧子节点的索引
   */
  private getRightIndex(index: number): number {
    return 2 * index + 2;
  }

  /**
   * @description: 获取父节点的索引
   */
  private getParentIndex(index: number): number {
    if (index === 0) {
      return undefined;
    }
    return Math.floor((index - 1) / 2);
  }

  /**
   * @description: 返回堆数组的长度
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * @description: 返回堆是否为空
   */
  isEmpty(): boolean {
    return this.size() <= 0;
  }

  /**
   * @description: 清空堆
   */
  clear() {
    this.heap = [];
  }

  /**
   * @description: 返回堆顶值
   */
  findMinimum(): T {
    return this.isEmpty() ? undefined : this.heap[0];
  }

  /**
   * @description: 给二叉堆插入一个值，并且调用siftUp方法来上移
   */
  insert(value: T): boolean {
    // 校验插入的值
    if (value != null) {
      // 原理就是将插入的值插到最后面，然后逐步向上siftUp，直到合适的位置
      const index = this.heap.length;
      this.heap.push(value);
      // 调用递归siftUp
      this.siftUp(index);
      return true;
    }
    // 如果要插入的值为空，则返回false
    return false;
  }

  /**
   * @description: 上移的递归方法
   */
  private siftUp(index: number): void {
    // 实现的核心就是不断向父节点交换，一直到合适的位置
    let parent = this.getParentIndex(index);
    while (
      index > 0 &&
      this.compareFn(this.heap[parent], this.heap[index]) ===
        Compare.BIGGER_THAN
    ) {
      swap(this.heap, parent, index);
      index = parent;
      parent = this.getParentIndex(index);
    }
  }

  /**
   * @description: 下移的递归方法
   */
  private siftDown(index: number) {
    let element = index;
    // 下移的方法要复杂一些，因为下移要选择左下还是右下
    const left = this.getLeftIndex(index);
    const right = this.getRightIndex(index);
    const size = this.size();

    // 优先向左下移
    if (
      left < size &&
      this.compareFn(this.heap[element], this.heap[left]) ===
        Compare.BIGGER_THAN
    ) {
      element = left;
    }

    // 次之向右下移
    if (
      right < size &&
      this.compareFn(this.heap[element], this.heap[right]) ===
        Compare.BIGGER_THAN
    ) {
      element = right;
    }

    // 交换
    if (index !== element) {
      swap(this.heap, index, element);
      // 继续递归
      this.siftDown(element);
    }
  }

  /**
   * @description: 提取堆顶值，并调用siftDown方法来平衡
   */
  extract() {
    if (this.isEmpty()) {
      return undefined;
    }
    if (this.size() === 1) {
      return this.heap.shift();
    }
    const removedValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.siftDown(0);
    return removedValue;
  }

  /**
   * @description: 将数组堆化，转化为一个二叉堆
   */
  heapify(array: T[]) {
    if (array) {
      this.heap = array;
    }

    // 只需要比较一半就能保证完全堆化
    const maxIndex = Math.floor(this.size() / 2) - 1;

    for (let i = 0; i <= maxIndex; i++) {
      this.siftDown(i);
    }

    return this.heap;
  }

  /**
   * @description: 返回保存二叉堆数据的数组
   */
  getAsArray() {
    return this.heap;
  }
}

// 最小堆就是将compareFn结果反转即可
export class MaxHeap<T> extends MinHeap<T> {
  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn);
    this.compareFn = reverseCompare(compareFn);
  }
}
