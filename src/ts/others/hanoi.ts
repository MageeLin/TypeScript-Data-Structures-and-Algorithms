import Stack from "../data-structures/stack";
// 汉诺塔的每根塔的格式定义{name: string, stack: Stack}
interface Tower {
  name: string;
  stack: Stack<number>;
}

// 移动步骤数组的格式定义[Map<towerName:string, plates:string>]
type Moves = Array<Map<string, string>>;

/**
 * @description: 移动盘子递归方法
 * @param {number} plates 需移动的盘子数
 * @param {Tower} source 该次移动的起始塔
 * @param {Tower} helper 该次移动的辅助塔
 * @param {Tower} dest 该次移动的终点塔
 * @param {Moves} moves 截止至上一次移动的步骤数组
 * @return {Moves} 返回本次移动后步骤数组
 */
const hanoiStackRecur = (
  plates: number,
  source: Tower,
  helper: Tower,
  dest: Tower,
  moves: Moves = []
): Moves => {
  // 边角情况处理
  if (plates <= 0) {
    return moves;
  }
  // 基线条件
  if (plates === 1) {
    // 不管是第一步还是最后一步，都只是简单的把最小的盘子从当前回合的起始塔转移到目标塔而已
    dest.stack.push(source.stack.pop());
    const move = new Map<string, string>();
    move.set(source.name, source.stack.toString());
    move.set(helper.name, helper.stack.toString());
    move.set(dest.name, dest.stack.toString());
    moves.push(move);
  } else {
    /**
     * 首先记住，本回合初始状态如下：
     * 起始塔：第 plates 个盘子
     * 辅助塔：前 1 到 plates-1 个盘子
     * 目标塔：没有小于等于 plates 的盘子
     */
    // 本回合之前的任务：把前 1 到 plates-1 个盘子从起始塔挪到辅助塔
    hanoiStackRecur(plates - 1, source, dest, helper, moves);
    // 本回合任务：将当前最大的盘子从本回合的起始塔挪到本回合的目标塔
    dest.stack.push(source.stack.pop());
    // 👇 单纯的记录步骤，给步骤数组添加当前步骤
    const move = new Map<string, string>();
    move.set(source.name, source.stack.toString());
    move.set(helper.name, helper.stack.toString());
    move.set(dest.name, dest.stack.toString());
    moves.push(move);
    // 👆
    // 本回合之后的任务：将前 1 到 plates-1 个盘子从辅助塔挪到目标塔
    hanoiStackRecur(plates - 1, helper, source, dest, moves);
  }
  return moves;
};

/**
 * @description: 汉诺塔算法
 * @param {number} plates 需移动的盘子数
 * @return {Moves} 返回所有的移动步骤数组
 */
export function hanoiStack(plates: number): Moves {
  // 初始化起始塔、辅助塔和终点塔
  const source: Tower = { name: "source", stack: new Stack<number>() };
  const dest: Tower = { name: "dest", stack: new Stack<number>() };
  const helper: Tower = { name: "helper", stack: new Stack<number>() };

  // 给起始塔入栈指定数目的盘子
  for (let i = plates; i > 0; i--) {
    source.stack.push(i);
  }

  // 调用递归方法
  return hanoiStackRecur(plates, source, helper, dest);
}

export function hanoi(
  plates: number,
  source: string,
  helper: string,
  dest: string,
  moves: string[][] = []
) {
  if (plates <= 0) {
    return moves;
  }
  if (plates === 1) {
    moves.push([source, dest]);
  } else {
    hanoi(plates - 1, source, dest, helper, moves);
    moves.push([source, dest]);
    hanoi(plates - 1, helper, source, dest, moves);
  }
  return moves;
}
