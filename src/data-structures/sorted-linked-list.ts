import { Compare, defaultCompare, defaultEquals, ICompareFunction, IEqualsFunction } from '../util';
import LinkedList from './linked-list';

// 排序链表也继承自普通链表
export default class SortedLinkedList<T> extends LinkedList<T> {
  constructor(
    protected equalsFn: IEqualsFunction<T> = defaultEquals,
    protected compareFn: ICompareFunction<T> = defaultCompare
  ) {
    super(equalsFn);
  }

  /**
   * @description: 向链表添加一个元素
   * @param {T} element
   */
  push(element: T) {
    if (this.isEmpty()) {
      super.push(element);
    } else {
      const index = this.getIndexNextSortedElement(element);
      super.insert(element, index);
    }
  }

  /**
   * @description: 向链表添加一个元素
   * @param {T} element
   */
  insert(element: T, index: number = 0) {
    if (this.isEmpty()) {
      return super.insert(element, 0);
    }
    index = this.getIndexNextSortedElement(element);
    return super.insert(element, index);
  }

  /**
   * @private
   * @description: 获取元素应该插入的位置
   * @param {T} element
   * @return {Number} index
   */
  private getIndexNextSortedElement(element: T) {
    let current = this.head;
    let i = 0;

    // 迭代比较，通过compareFn比较找到合适位置
    for (; i < this.size() && current; i++) {
      const comp = this.compareFn(element, current.element);
      if (comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }

    return i;
  }
}
