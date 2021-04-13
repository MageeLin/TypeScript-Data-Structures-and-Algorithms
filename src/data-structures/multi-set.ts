export default class MultiSet<T> {
  private items: Map<T, number>;

  constructor() {
    this.items = new Map();
  }

  /**
   * @description: 如果元素在集合中，返回 true，否则返回 false。
   * @param {T} element
   * @return {boolean}
   */
  has(element: T): boolean {
    return this.items.has(element);
  }

  /**
   * @description: 返回元素的维数，也就是元素的种类数
   * @return {number}
   */
  dimension(): number {
    return this.items.size;
  }

  /**
   * @description: 返回该元素的个数
   * @param {T} element
   * @return {number}
   */
  count(element: T): number {
    return this.items.get(element) ?? 0;
  }

  /**
   * @description: 删除所有的该元素
   * @param {T} element
   * @return {boolean}
   */
  delete(element: T): boolean {
    return this.items.delete(element);
  }

  /**
   * @description: 设置该元素的个数
   * @param {T} element
   * @param {number} count
   * @return {boolean}
   */
  set(element: T, count: number): boolean {
    if (count <= 0) {
      return this.delete(element);
    }
    this.items.set(element, count);
    return true;
  }

  /**
   * @description: 给该元素添加count个
   * @param {T} element
   * @param {number} count
   * @return {boolean}
   */
  add(element: T, count: number = 1): boolean {
    let newCount = this.count(element) + count;
    return this.set(element, newCount);
  }

  /**
   * @description: 给该元素移除count个
   * @param {T} element
   * @param {number} count
   * @return {boolean}
   */
  remove(element: T, count: number = 1): boolean {
    return this.add(element, -count);
  }

  /**
   * @description: 是否为空
   * @return {boolean}
   */
  isEmpty(): boolean {
    return this.dimension() === 0;
  }

  // 👇 以下方法与CustomSet的同名方法实现一致

  /**
   * @description: 返回一个包含集合中所有值（元素）的数组。
   * @return {Array<T>}
   */
  values(): T[] {
    return Array.from(this.items.entries()).reduce((acc, cur) => {
      const [key, value] = cur;
      for (let i = 0; i < value; i++) {
        acc.push(key);
      }
      return acc;
    }, []);
  }

  /**
   * @description: 集合的元素数
   * @return {number}
   */
  size(): number {
    return this.values().length;
  }

  /**
   * @description: 清空集合
   */
  clear() {
    this.items = new Map();
  }

  /**
   * @description: 并集
   * @param {MultiSet} otherSet
   * @return {MultiSet}
   */
  union(otherSet: MultiSet<T>): MultiSet<T> {
    const unionSet = new MultiSet<T>();

    // 迭代两个集合，把元素都add进来
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));

    return unionSet;
  }

  /**
   * @description: 交集
   * @param {MultiSet} otherSet
   * @return {MultiSet}
   */
  intersection(otherSet: MultiSet<T>): MultiSet<T> {
    const intersectionSet = new MultiSet<T>();

    // 在当前集合中过滤掉otherSet中不存在的元素
    this.values()
      .filter(v => otherSet.has(v))
      .forEach(v => {
        intersectionSet.add(v);
      });

    return intersectionSet;
  }

  /**
   * @description: 差集
   * @param {MultiSet} otherSet
   * @return {MultiSet}
   */
  difference(otherSet: MultiSet<T>): MultiSet<T> {
    const differenceSet = new MultiSet<T>();

    // 在当前集合中过滤掉otherSet中也存在的元素
    this.values()
      .filter(v => !otherSet.has(v))
      .forEach(v => {
        differenceSet.add(v);
      });

    return differenceSet;
  }

  /**
   * @description: 是否为子集
   * @param {MultiSet} otherSet
   * @return {boolean}
   */
  isSubsetOf(otherSet: MultiSet<T>): boolean {
    if (this.size() > otherSet.size()) {
      return false;
    }

    let isSubset = true;
    // 判据：当前集合的所有元素在otherSet中都存在
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        isSubset = false;
      }
    });

    return isSubset;
  }

  /**
   * @description: 替换原生toString
   * @return {string}
   */
  toString(): string {
    return `${this.values()}`;
  }
}
