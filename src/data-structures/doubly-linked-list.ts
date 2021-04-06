import { defaultEquals, IEqualsFunction } from "../util";
import LinkedList from "./linked-list";
import { DoublyNode } from "./models/linked-list-models";

// 双向链表继承自普通链表
export default class DoublyLinkedList<T> extends LinkedList<T> {
  // 多了一个尾部节点tail，重写了head
  protected head?: DoublyNode<T>;
  protected tail?: DoublyNode<T>;

  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {
    super(equalsFn);
  }

  /**
   * @description: 向双向链表尾部添加一个元素
   * @param {T} element
   */
  push(element: T) {
    const node = new DoublyNode(element);

    if (this.head == null) {
      this.head = node;
      this.tail = node; // 👈 新增
    } else {
      // 👇 修改
      // 添加到尾部，互相交换指针
      this.tail.next = node;
      node.prev = this.tail;
      // 最后把node设为tail
      this.tail = node;
    }
    this.count++;
  }

  /**
   * @description: 在指定索引位置处插入元素
   * @param {T} element 待插入的元素
   * @param {number} index 插入位置索引
   * @return {boolean} 返回是否插入成功
   */
  insert(element: T, index: number): boolean {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this.head;

      // 👇 插入到第一个
      if (index === 0) {
        // 链表为空
        if (this.head == null) {
          this.head = node;
          this.tail = node;
          // 链表不为空
        } else {
          node.next = this.head;
          this.head.prev = node; // NEW
          this.head = node;
        }
        // 👇 插入到最后一个
      } else if (index === this.count) {
        current = this.tail; // {2}
        current.next = node;
        node.prev = current;
        this.tail = node;
        // 👇 普通情况
      } else {
        const previous = this.getNodeAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;

        current.prev = node; // NEW
        node.prev = previous; // NEW
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
  removeAt(index: number): T {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      // 👇 删除第一个
      if (index === 0) {
        this.head = this.head.next;
        // 如果只有一个元素，需要同时调整tail
        if (this.count === 1) {
          this.tail = undefined;
        } else {
          this.head.prev = undefined;
        }
        // 👇 删除最后一个
      } else if (index === this.count - 1) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = undefined;
        // 👇 普通删除
      } else {
        current = this.getNodeAt(index);
        const previous = current.prev;
        const next = current.next;
        previous.next = next;
        next.prev = previous;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  /**
   * @description: 获取链表的最后一个节点
   * @return {Node<T>}
   */
  getTail(): DoublyNode<T> {
    return this.tail;
  }

  /**
   * @description: 清空链表
   */
  clear() {
    super.clear();
    this.tail = undefined;
  }

  /**
   * @description: 从尾向头输出string
   * @return {string}
   */
  inverseToString() {
    if (this.tail == null) {
      return "";
    }
    let objString = `${this.tail.element}`;
    let previous = this.tail.prev;
    while (previous != null) {
      objString = `${objString},${previous.element}`;
      previous = previous.prev;
    }
    return objString;
  }
}
