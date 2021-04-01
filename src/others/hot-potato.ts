import Queue from "../data-structures/queue";

/**
 * @param {Array<T>} elimitated 失败者数组
 * @param {T} winner 胜利者
 */
interface HotPotatoResult<T> {
  elimitated: Array<T>;
  winner: T;
}

/**
 * @description: 击鼓传花算法
 * @param {Array<T>} 传花的元素数组
 * @param {number} 每次传花的次数
 * @return {HotPotatoResult<T>} 返回算法结果
 */
export function hotPotato<T>(
  elementsList: Array<T>,
  num: number
): HotPotatoResult<T> {
  const queue: Queue<T> = new Queue();
  const elimitatedList: Array<T> = [];

  // 初始化队列
  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i]);
  }

  while (queue.size() > 1) {
    // 循环队列旋转固定num次数
    for (let i = 0; i < num; i++) {
      // 元素出队的同时又入队，形成循环队列
      queue.enqueue(queue.dequeue());
    }
    // 被抽中的元素则被出队淘汰
    elimitatedList.push(queue.dequeue());
  }

  return {
    elimitated: elimitatedList,
    winner: queue.dequeue()
  };
}
