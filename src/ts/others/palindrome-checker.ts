import Deque from "../data-structures/deque";

/**
 * @description: 回文检查器
 * @param {string} aString 待检查的字符串
 * @return {boolean} 返回是否回文
 */
export function palindromeChecker(aString: string): boolean {
  // 检查字符串的合法性
  if (
    aString === undefined ||
    aString === null ||
    (aString !== null && aString.length === 0)
  ) {
    return false;
  }

  // 将字符串小写并剔除空格
  const lowerString: string = aString
    .toLocaleLowerCase()
    .split(" ")
    .join("");

  // 初始化双端队列
  const deque: Deque<string> = new Deque();
  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i));
  }

  // 分别从顶部和底部出队一个元素进行对比
  while (deque.size() > 1) {
    if (deque.removeFront() !== deque.removeBack()) {
      return false;
    }
  }

  return true;
}
