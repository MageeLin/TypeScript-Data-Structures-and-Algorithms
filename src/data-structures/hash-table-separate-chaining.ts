import { defaultToString } from "../util";
import LinkedList from "./linked-list";

export default class HashTableSeparateChaining<K, V> {
  protected table: Map<number, LinkedList<{ key: K; value: V }>>;

  constructor(protected toStrFn: (key: K) => string = defaultToString) {
    this.table = new Map();
  }

  /**
   * @description: 哈希函数
   */
  private loseloseHashCode(key: K): number {
    if (typeof key === "number") {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }

  /**
   * @description: 哈希函数封装
   */
  hashCode(key: K): number {
    return this.loseloseHashCode(key);
  }

  /**
   * @description: 更新散列表
   */
  put(key: K, value: V): boolean {
    if (key != null && value != null) {
      const position = this.hashCode(key);

      // 当该hashcode不存在时，先创建一个链表
      if (this.table.get(position) == null) {
        this.table.set(position, new LinkedList<{ key: K; value: V }>());
      }
      // 再给链表push值
      this.table.get(position).push({ key, value });
      return true;
    }
    return false;
  }

  /**
   * @description: 根据键获取值
   */
  get(key: K): V {
    const position = this.hashCode(key);
    const linkedList = this.table.get(position);
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      // 去链表中迭代查找键值对
      while (current != null) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }

  /**
   * @description: 根据键移除值
   */
  remove(key: K): boolean {
    const position = this.hashCode(key);
    const linkedList = this.table.get(position);
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          linkedList.remove(current.element);
          // 关键的一点，当链表为空以后，需要在tabel中删除掉hashcode
          if (linkedList.isEmpty()) {
            this.table.delete(position);
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }

  /**
   * @description: 返回是否为空散列表
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * @description: 散列表的大小
   */
  size(): number {
    let count = 0;
    // 迭代每个链表，累计求和
    for (const [hashCode, linkedList] of this.table) {
      count += linkedList.size();
    }
    return count;
  }

  /**
   * @description: 清空散列表
   */
  clear() {
    this.table.clear();
  }

  /**
   * @description: 返回内部table
   */
  getTable() {
    return this.table;
  }

  /**
   * @description: 替代默认的toString
   */
  toString(): string {
    if (this.isEmpty()) {
      return "";
    }

    let objStringList = [];
    for (const [hashCode, linkedList] of this.table) {
      let node = linkedList.getHead();
      while (node) {
        objStringList.push(`{${node.element.key} => ${node.element.value}}`);
        node = node.next;
      }
    }
    return objStringList.join(",");
  }
}
