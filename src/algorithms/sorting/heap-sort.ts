import { Compare, defaultCompare, ICompareFunction, swap } from "../../util";

/**
 * @description: 改造的siftDown方法，多了一个heapSize参数，便于原地排序
 * @param {array} array 要排序的数组
 * @param {number} index 要下沉的元素索引
 * @param {number} heapSize 当前堆的长度（剔除已排序的内容后）
 * @param {ICompareFunction} compareFn 比较大小的方法
 */
function siftDown(
  array: any[],
  index: number,
  heapSize: number,
  compareFn: ICompareFunction<any>
) {
  let largest = index;
  const left = 2 * index + 1;
  const right = 2 * index + 2;

  // 优先向左下移动
  // 与类中siftDown方法最关键的区别就是这个heapSize
  if (
    left < heapSize &&
    compareFn(array[left], array[index]) === Compare.BIGGER_THAN
  ) {
    largest = left;
  }

  // 次之向右下移动
  if (
    right < heapSize &&
    compareFn(array[right], array[largest]) === Compare.BIGGER_THAN
  ) {
    largest = right;
  }

  if (largest !== index) {
    // 交换
    swap(array, index, largest);
    // 继续递归
    siftDown(array, largest, heapSize, compareFn);
  }
}

/**
 * @description: 堆排序
 */
export default function heapSort(array: any[], compareFn = defaultCompare) {
  let heapSize = array.length;

  // 1.首先把除叶子节点外所有的树都规范成二叉堆
  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
    siftDown(array, i, array.length, compareFn);
  }

  // 2.交换堆顶元素和最后的元素，相当于把堆顶元素放到最后面，最后一个元素挪到最前面
  // 然后执行siftDown来重新规范二叉堆
  while (heapSize > 1) {
    swap(array, 0, --heapSize);
    siftDown(array, 0, heapSize, compareFn);
  }
  return array;
}
