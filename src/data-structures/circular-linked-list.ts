import { defaultEquals, IEqualsFunction } from '../util';
import LinkedList from './linked-list';
import { Node } from './models/linked-list-models';

// 循环链表也继承自普通链表
export default class CircularLinkedList<T> extends LinkedList<T> {
  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {
    super(equalsFn);
  }

  /**
   * @description: 向链表尾部添加一个元素
   * @param {T} element
   */
  push(element: T) {
    const node = new Node(element);
    let current;

    if (this.head == null) {
      this.head = node;
    } else {
      current = this.getNodeAt(this.size() - 1);
      current.next = node;
    }

    node.next = this.head; // 👈 要记得把最后一个node的next指向head

    this.count++;
  }

  /**
   * @description: 在指定索引位置处插入元素
   * @param {T} element 待插入的元素
   * @param {number} index 插入位置索引
   * @return {boolean} 返回是否插入成功
   */
  insert(element: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;

      if (index === 0) {
        // 👇 插入到第一个时分两种情况
        if (this.head == null) {
          // 没有元素
          this.head = node;
          node.next = this.head; // 👈 特殊
        } else {
          // 已有若干元素
          let tail = this.getNodeAt(this.size() - 1);
          this.head = node;
          node.next = current;
          tail.next = this.head; // 👈 特殊
        }
      } else {
        const previous = this.getNodeAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  /**
   * @description: 移除指定索引位置处的元素
   * @param {number} index 索引
   * @return {T} 返回移除掉的元素
   */
  removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        // 👇 删除第一个时分两种情况
        if (this.size() === 1) {
          // 只有一个元素
          this.head = undefined;
        } else {
          // 有若干个元素
          let tail = this.getNodeAt(this.size() - 1);
          this.head = this.head.next;
          tail.next = this.head; // 👈 next指向head
        }
      } else {
        const previous = this.getNodeAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
}
