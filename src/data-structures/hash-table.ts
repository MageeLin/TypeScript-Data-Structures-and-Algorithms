import { defaultToString } from "../util";

export default class HashTable<K, V> {
  protected table: Map<number, V>;

  constructor(protected toStrFn: (key: K) => string = defaultToString) {
    this.table = new Map();
  }

  /**
   * @description: 哈希函数
   */
  private djb2HashCode(key: K): number {
    if (typeof key === "number") {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = hash * 33 + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  }

  /**
   * @description: 计算键的哈希值
   */
  hashCode(key: K): number {
    return this.djb2HashCode(key);
  }

  /**
   * @description: 更新散列表
   */
  put(key: K, value: V): boolean {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      this.table.set(position, value);
      return true;
    }
    return false;
  }

  /**
   * @description: 根据键获取值
   */
  get(key: K): V {
    return this.table.get(this.hashCode(key));
  }

  /**
   * @description: 根据键移除值
   */
  remove(key: K): boolean {
    return this.table.delete(this.hashCode(key));
  }

  /**
   * @description: 返回内部table
   */
  getTable(): Map<number, V> {
    return this.table;
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
    return this.table.size;
  }

  /**
   * @description: 清空散列表
   */
  clear() {
    this.table.clear();
  }

  /**
   * @description: 替代默认的toString
   */
  toString(): string {
    if (this.isEmpty()) {
      return "";
    }
    let objStringList = [];
    for (const [hashCode, value] of this.table) {
      objStringList.push(`{${hashCode} => ${value}}`)
    }
    return objStringList.join(',')
  }
}
