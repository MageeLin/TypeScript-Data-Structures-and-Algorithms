export default class Dictionary<K, V> {
  private table: Map<K, V>;

  constructor() {
    this.table = new Map();
  }

  /**
   * @description: 设置键值对
   * @param {K} key
   * @param {V} value
   * @return {boolean}
   */
  set(key: K, value: V): boolean {
    this.table.set(key, value);
    return true;
  }

  /**
   * @description: 根据键取值
   * @param {K} key
   * @return {V}
   */
  get(key: K): V {
    return this.table.get(key);
  }

  /**
   * @description: 返回是否有此键
   * @param {K} key
   * @return {boolean}
   */
  hasKey(key: K): boolean {
    return this.table.has(key);
  }

  /**
   * @description: 移除键值对
   * @param {K} key
   * @return {boolean}
   */
  remove(key: K):boolean {
    return this.table.delete(key);
  }

  /**
   * @description: 返回值数组
   * @return {Array<V>}
   */
  values(): V[] {
    return Array.from(this.table.values());
  }

  /**
   * @description: 返回键数组
   * @return {Array<K>}
   */
  keys(): K[] {
    return Array.from(this.table.keys());
  }

  /**
   * @description: 返回键值对数组
   * @return {Array<K, V>}
   */
  keyValues(): [K, V][] {
    return Array.from(this.table.entries());
  }

  /**
   * @description: 迭代整个字典
   * @param {function} callbackFn
   */
  forEach(callbackFn: (key: K, value: V) => any) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      // callbackFn 返回 false 时要终止迭代
      if (callbackFn(valuePairs[i][0], valuePairs[i][1]) === false) {
        break;
      }
    }
  }

  /**
   * @description: 是否为空
   * @return {boolean}
   */
  isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * @description: 字典的大小
   * @return {number}
   */
  size(): number {
    return this.table.size;
  }

  /**
   * @description: 清空字典
   */
  clear() {
    this.table.clear();
  }

  /**
   * @description: 替代默认toString
   * @return {string}
   */
  toString(): string {
    if (this.isEmpty()) {
      return "";
    }

    let objStringList = [];
    // 迭代 table
    for (const [key, value] of this.table) {
      objStringList.push(`[${key}: ${value}]`);
    }
    return objStringList.join(",");
  }
}
