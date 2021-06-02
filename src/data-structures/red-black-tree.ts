import { defaultCompare, ICompareFunction, Compare } from "../util";
import BinarySearchTree from "./binary-search-tree";
import { RedBlackNode, Colors } from "./models/red-black-node";

export default class RedBlackTree<T> extends BinarySearchTree<T> {
  protected root: RedBlackNode<T>;

  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn);
  }

  /**
   * 左左情况: 右旋
   * 不管是左旋还是右旋，实现的方式和AVL树的左旋右旋类似
   * 但是要考虑父节点的变动
   *
   *       a                           c
   *      / \                         / \
   *     c   b -> rotationLL(a) ->   d   a
   *    / \                             / \
   *   d   e                           e   b
   *
   * @param node Node<T>
   */
  private rotationLL(node: RedBlackNode<T>): RedBlackNode<T> {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    tmp.color = node.color;
    node.color = Colors.RED;
    return tmp;
  }

  /**
   * 右右情况: 左旋
   *
   *     b                              d
   *    / \                            / \
   *   a   d   -> rotationRR(b) ->    b   e
   *      / \                        / \
   *     c   e                      a   c
   *
   * @param node Node<T>
   */
  private rotationRR(node: RedBlackNode<T>): RedBlackNode<T> {
    const tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    tmp.color = node.color;
    node.color = Colors.RED;
    return tmp;
  }

  /**
   * @description: 插入键
   */
  insert(key: T) {
    this.root = this.insertNode(this.root, key);
    this.root.color = Colors.BLACK;
  }

  /**
   * @description: 插入键的递归方法
   */
  protected insertNode(node: RedBlackNode<T>, key: T): RedBlackNode<T> {
    // 基线条件，如果插入到空白节点处，就插入一个红节点
    if (node == null) {
      let node = new RedBlackNode(key);
      node.color = Colors.RED;
      return node;
    }

    // 递归点
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      node.key = key;
    }

    // 核心算法，通过三行判断，来生成一个左倾红黑树
    // 右红左黑，左旋把红链接转到左侧来
    if (this.isRed(node.right) && !this.isRed(node.left))
      node = this.rotationRR(node);
    // 左红并且左左也红，右旋
    if (this.isRed(node.left) && this.isRed(node.left?.left))
      node = this.rotationLL(node);
    // 不管是旋出来的还是自然插入出来的，只要两红当兄弟，就变色，并把红色向上挪一层（相当于23树中加高一层）
    if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node);
    return node;
  }


  getRoot() {
    return this.root;
  }

  /**
   * @description:修正节点颜色
   */
  private flipColors(node: RedBlackNode<T>) {
    node.color = Colors.RED;
    node.left.color = Colors.BLACK;
    node.right.color = Colors.BLACK;
  }

  /**
   * @description: 判断节点是否为红色
   */
  private isRed(node: RedBlackNode<T>) {
    // 如果为空，也认为是黑色
    // 这里很重要，相当于树底部全是黑色空节点
    if (!node) {
      return false;
    }
    return node.isRed();
  }
}
