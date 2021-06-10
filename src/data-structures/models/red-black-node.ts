import { Node } from "./node";

// 节点颜色枚举值
export enum Colors {
  RED = 0,
  BLACK = 1
}

// 红黑树节点，继承自普通Node
export class RedBlackNode<K> extends Node<K> {
  left: RedBlackNode<K>;
  right: RedBlackNode<K>;
  // 红黑树节点有color特殊属性
  color: Colors;

  constructor(public key: K) {
    super(key);
    // 节点的默认颜色为红色
    this.color = Colors.RED;
  }

  /**
   * @description: 返回节点是否为红色
   */
  isRed(): boolean {
    return this.color === Colors.RED;
  }

  /**
   * @description: 位运算反转节点的颜色
   */
  flipColor() {
    this.color = 1 ^ this.color;
  }
}
