import { Compare, defaultCompare, ICompareFunction } from "../util";
import BinarySearchTree from "./binary-search-tree";
import { Node } from "./models/node";

// 平衡因子
enum BalanceFactor {
  UNBALANCED_RIGHT = -2, // 右重
  SLIGHTLY_UNBALANCED_RIGHT = -1, // 轻微右重
  BALANCED = 0, // 平衡
  SLIGHTLY_UNBALANCED_LEFT = 1, // 轻微左重
  UNBALANCED_LEFT = 2 // 右重
}

// 继承了上一节实现的二叉搜索树
export default class AVLTree<T> extends BinarySearchTree<T> {
  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn);
  }

  /**
   * 左左情况: 向右单旋转
   * 左侧子节点的高度大于右侧子节点的高度时，并且左侧子节点也是平衡或左侧较重的，为左左情况
   *
   *       a                           b
   *      / \                         / \
   *     b   c -> rotationLL(a) ->   d   a
   *    / \                             / \
   *   d   e                           e   c
   *
   * @param root Node<T> 旋转前的root节点
   * @returns pivot Node<T> 返回旋转后的root节点(也就是旋转前的pivot)
   */
  private rotationLL(root: Node<T>): Node<T> {
    // 先把pivot拿出来
    const pivot = root.left;
    // root 左侧指向 pivot 的右子
    root.left = pivot.right;
    // pivot 右侧指向 root
    pivot.right = root;
    // 返回 pivot
    return pivot;
  }

  /**
   * 右右情况: 向左单旋转
   * 右侧子节点的高度大于左侧子节点的高度，并且右侧子节点也是平衡或右侧较重的，为右右情况
   *     a                              c
   *    / \                            / \
   *   b   c   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      b   d
   *
   * @param root Node<T> 旋转前的root节点
   * @returns pivot Node<T> 返回旋转后的root节点(也就是旋转前的pivot)
   */
  private rotationRR(root: Node<T>): Node<T> {
    // 先把pivot拿出来
    const pivot = root.right;
    // root 右侧指向 pivot 的左子
    root.right = pivot.left;
    // pivot 左侧指向 root
    pivot.left = root;
    // 返回 pivot
    return pivot;
  }

  /**
   * 左右情况: 先左转子节点后右转
   * 左侧子节点的高度大于右侧子节点的高度，并且左侧子节点右侧较重
   *
   *       a                           a                            e
   *      / \                         / \                         /   \
   *     b   c -> rotationRR(b) ->   e   c -> rotationLL(a) ->   b     a
   *    / \                         / \                         / \   / \
   *   d   e                       b   g                       d   f g   c
   *      / \                     / \
   *     f   g                   d   f
   *
   * @param node Node<T>
   */
  private rotationLR(node: Node<T>): Node<T> {
    // 先把节点左子左转
    node.left = this.rotationRR(node.left);
    // 再把节点本身右转
    return this.rotationLL(node);
  }

  /**
   * 右左情况: 先右转子节点后左转
   * 右侧子节点的高度大于左侧子节点的高度，并且右侧子节点左侧较重
   *
   *       a                           a                            d
   *      / \                         / \                         /   \
   *     b   c -> rotationLL(c) ->   b   d -> rotationRR(a) ->   a     c
   *        / \                         / \                     / \   / \
   *       d   e                       f   c                   b   f g   e
   *      / \                             / \
   *     f   g                           g   e
   *
   * @param node Node<T>
   */
  private rotationRL(node: Node<T>): Node<T> {
    // 先把节点右子右转
    node.right = this.rotationLL(node.right);
    // 再把节点本身左转
    return this.rotationRR(node);
  }

  /**
   * @description: 获取节点高度
   */
  private getNodeHeight(node: Node<T>): number {
    // 基线条件
    if (node == null) {
      return -1;
    }
    // 递归计算
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }

  /**
   * @description: 获取节点的平衡因子
   * @param {Node} node
   */
  private getBalanceFactor(node: Node<T>): BalanceFactor {
    // 左子树重 减去 右子树重
    const heightDifference =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    // 再返回对应的枚举值
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  /**
   * @description: 对节点为根的树进行两层平衡
   * @param {Node} node
   * @return {Node} 返回平衡后的以节点为根的树
   */
  keepBalance(node: Node<T>): Node<T> {
    // 先校验tree是否是平衡的，只有“左重”和“右重”时才需要重新再平衡，
    // “轻微左重”、“轻微右重”、“平衡”的三种状态不需要再平衡
    if (node == null) {
      return node;
    }
    // 校验树是否平衡
    const balanceState = this.getBalanceFactor(node);

    if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
      // 左左情况
      if (
        this.getBalanceFactor(node.left) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.left) ===
          BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      // 左右情况
      else if (
        this.getBalanceFactor(node.left) ===
        BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationLR(node);
      }
    } else if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
      // 右右情况
      if (
        this.getBalanceFactor(node.right) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.right) ===
          BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      // 右左情况
      else if (
        this.getBalanceFactor(node.right) ===
        BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationRL(node);
      }
    }
    return node;
  }

  /**
   * @description: 插入节点的递归方法，递归插入完后，需要校验树是否仍然平衡，若不平衡则需要旋转
   * @param {Node} node 要插入到的节点
   * @param {T} key 要插入的键
   * @return {Node} 为了配合 insert 方法，一定要返回节点
   */
  protected insertNode(node: Node<T>, key: T): Node<T> {
    // 与二叉搜索树的插入方式一致
    if (node == null) {
      return new Node(key);
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node; // 重复的 key
    }
    // 校验树是否平衡
    return this.keepBalance(node);
  }

  /**
   * @description:  删除节点的递归方法，递归完成后也需要再平衡
   * @param {Node} node 要从中删除的节点
   * @param {T} key 要删除的键
   * @return {Node} 同样为了配合remove方法，一定要返回节点
   */
  protected removeNode(node: Node<T>, key: T): Node<T> {
    // 与二叉搜索树的删除方式一致
    if (node == null) {
      return null;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
    } else {
      if (node.left == null && node.right == null) {
        node = null;
      } else if (node.left == null && node.right != null) {
        node = node.right;
      } else if (node.left != null && node.right == null) {
        node = node.left;
      } else {
        const aux = this.minNode(node.right);
        node.key = aux.key;
        node.right = this.removeNode(node.right, aux.key);
      }
    }

    // 校验树是否平衡
    return this.keepBalance(node);
  }
}
