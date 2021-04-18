import { defaultToString } from "../util";

export default class HashTableLinearProbing<K, V> {
  protected table: Map<number, { key: K; value: V }>;

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

      if (this.table.get(position) == null) {
        // 当hashcode位置为空时，可以直接添加
        this.table.set(position, { key, value });
      } else {
        // 否则需要迭代查找最近的空位置再添加
        let index = position + 1;
        while (this.table.get(index) != null) {
          index++;
        }
        this.table.set(index, { key, value });
      }
      return true;
    }
    return false;
  }

  /**
   * @description: 根据键获取值
   */
  get(key: K): V {
    const position = this.hashCode(key);

    if (this.table.get(position) != null) {
      // 如果查到的hashcode位置就是要查的key，则直接返回
      if (this.table.get(position).key === key) {
        return this.table.get(position).value;
      }
      // 否则需要迭代着向下查找
      let index = position + 1;
      while (
        this.table.get(index) != null &&
        this.table.get(index).key !== key
      ) {
        index++;
      }
      if (this.table.get(index) != null && this.table.get(index).key === key) {
        return this.table.get(position).value;
      }
    }
    // 最后也没查到，就返回undefined
    return undefined;
  }

  /**
   * @description: 根据键移除值
   */
  remove(key: K): boolean {
    const position = this.hashCode(key);

    if (this.table.get(position) != null) {
      // 同理，如果hashcode对应位置就是要查的key，则直接删除
      if (this.table.get(position).key === key) {
        this.table.delete(position);
        // 删除后处理副作用
        this.verifyRemoveSideEffect(key, position);
        return true;
      }
      // 同理，如果hashcode对应的位置不是要查的key，就迭代查到
      let index = position + 1;
      while (
        this.table.get(index) != null &&
        this.table.get(index).key !== key
      ) {
        index++;
      }
      if (this.table.get(index) != null && this.table.get(index).key === key) {
        this.table.delete(index);
        // 同样在删除后处理副作用
        this.verifyRemoveSideEffect(key, index);
        return true;
      }
    }
    return false;
  }

  /**
   * @description: 处理移除键值对后的副作用
   */
  private verifyRemoveSideEffect(key: K, removedPosition: number) {
    const hash = this.hashCode(key);
    let index = removedPosition + 1;
    // 迭代着处理后面的每一个键值对
    while (this.table.get(index) != null) {
      const posHash = this.hashCode(this.table.get(index).key);
      // 挨个向前挪动，关键点在于，hashcode值比较小的键值对尽量先向前补位
      // 详细的说：如果当前元素的 hash 值小于或等于原始的 hash 值
      // 或者当前元素的 hash 值小于或等于 removedPosition（也就是上一个被移除 key 的 hash 值），
      // 表示我们需要将当前元素移动至 removedPosition 的位置
      if (posHash <= hash || posHash <= removedPosition) {
        this.table.set(removedPosition, this.table.get(index));
        this.table.delete(index);
        removedPosition = index;
      }
      index++;
    }
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
   * @description: 返回内部table
   */
  getTable(): Map<number, { key: K; value: V }> {
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
    for (const [hashCode, { key, value }] of this.table) {
      objStringList.push(`{${key} => ${value}}`);
    }
    return objStringList.join(",");
  }
}
