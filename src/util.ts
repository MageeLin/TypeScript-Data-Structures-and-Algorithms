// 规定自定义Compare的类型
export type ICompareFunction<T> = (a: T, b: T) => number;

// 规定了自定义相等比较函数的类型
export type IEqualsFunction<T> = (a: T, b: T) => boolean;

export type IDiffFunction<T> = (a: T, b: T) => number;

export const DOES_NOT_EXIST = -1;

// 比较结果的枚举值
export enum Compare {
  LESS_THAN = -1,
  BIGGER_THAN = 1,
  EQUALS = 0
}

export function lesserEquals<T>(a: T, b: T, compareFn: ICompareFunction<T>) {
  const comp = compareFn(a, b);
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

export function biggerEquals<T>(a: T, b: T, compareFn: ICompareFunction<T>) {
  const comp = compareFn(a, b);
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

/**
 * @description: 默认的大小比较函数
 * @param {T} a
 * @param {T} b
 * @return {Compare} 返回 -1 0 1 代表 小于 等于 大于
 */
export function defaultCompare<T>(a: T, b: T): Compare {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

/**
 * @description: 默认的相等比较函数，三等比较
 * @param {T} a
 * @param {T} b
 * @return {boolean} 返回a、b是否相等
 */
export function defaultEquals<T>(a: T, b: T): boolean {
  return a === b;
}

/**
 * @description: 将item转换为字符串
 */
export function defaultToString(item: any): string {
  // 对于 null undefined和字符串的处理
  if (item === null) {
    return 'NULL';
  } else if (item === undefined) {
    return 'UNDEFINED';
  } else if (typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  // 其他情况时调用数据结构自带的 toString 方法
  return item.toString();
}

export function swap(array: any[], a: number, b: number) {
  /* const temp = array[a];
  array[a] = array[b];
  array[b] = temp; */
  [array[a], array[b]] = [array[b], array[a]];
}

export function reverseCompare<T>(compareFn: ICompareFunction<T>): ICompareFunction<T> {
  return (a, b) => compareFn(b, a);
}

export function defaultDiff<T>(a: T, b: T): number {
  return Number(a) - Number(b);
}
