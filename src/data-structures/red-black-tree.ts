import { defaultCompare, ICompareFunction, Compare } from "../util";
import BinarySearchTree from "./binary-search-tree";
import { RedBlackNode, Colors } from "./models/red-black-node";

export default class RedBlackTree<T> extends BinarySearchTree<T> {
  protected root: RedBlackNode<T>;

  constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn);
  }

  /**
   * 右旋
   * 不管是左旋还是右旋，实现的方式和AVL树的左旋右旋类似
   *
   *       a                           c
   *      / \                         / \
   *     c   b -> rotateRight(a) ->   d   a
   *    / \                             / \
   *   d   e                           e   b
   *
   * @param node Node<T>
   */
  private rotateRight(node: RedBlackNode<T>): RedBlackNode<T> {
    const tmp = node.left;
    node.left = tmp.right;
    tmp.right = node;
    tmp.color = node.color;
    node.color = Colors.RED;
    return tmp;
  }

  /**
   * 左旋
   *
   *     b                              d
   *    / \                            / \
   *   a   d   -> rotateLeft(b) ->    b   e
   *      / \                        / \
   *     c   e                      a   c
   *
   * @param node Node<T>
   */
  private rotateLeft(node: RedBlackNode<T>): RedBlackNode<T> {
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

    return this.balance(node);
  }
  /**
   * 移除最小键
   */
  public deleteMin() {
    if (this.root) return;

    // 如果根节点左右均为黑，则把根节点设为红
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
      this.root.color = Colors.RED;

    // 调用删除最小键的递归方法
    this.root = this.deleteMinNode(this.root);
    // 最后把根节点颜色纠正为黑
    if (this.root) this.root.color = Colors.BLACK;
  }

  /**
   * @description: 删除最小键的递归方法
   */
  private deleteMinNode(node: RedBlackNode<T>): RedBlackNode<T> {
    // 基线条件
    if (node.left == null) return null;

    // 如果左右节点均为黑，则调用moveRedLeft
    if (!this.isRed(node.left) && !this.isRed(node.left.left))
      node = this.moveRedLeft(node);

    // 递归调用寻找最小键
    node.left = this.deleteMinNode(node.left);
    // 每次递归后都要平衡节点
    return this.balance(node);
  }

  /**
   * 移除最大键
   */
  public deleteMax() {
    if (!this.root) return;

    // 如果根节点的所有子节点为黑，把根节点设为红
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
      this.root.color = Colors.RED;

    // 调用删除最大节点的递归方法
    this.root = this.deleteMaxNode(this.root);
    // 纠正根节点颜色为黑
    if (this.root) this.root.color = Colors.BLACK;
  }

  /**
   * @description: 删除最大键节点的递归方法
   */
  private deleteMaxNode(node: RedBlackNode<T>): RedBlackNode<T> {
    // 当左子节点为红时，右旋
    if (this.isRed(node.left)) node = this.rotateRight(node);

    // 基线条件
    if (node.right == null) return null;

    // 如果左右节点均为黑，则调用moveRedRight
    if (!this.isRed(node.right) && !this.isRed(node.right.left))
      node = this.moveRedRight(node);

    // 递归调用寻找最大键
    node.right = this.deleteMaxNode(node.right);

    // 每次递归后都要平衡节点
    return this.balance(node);
  }

  /**
   * @description: 删除指定key
   */
  public delete(key: T) {
    // 没有节点时直接返回
    if (!this.search(key)) return;

    // 如果根节点的所有子节点为黑，把根节点设为红
    if (!this.isRed(this.root.left) && !this.isRed(this.root.right))
      this.root.color = Colors.RED;

    // 调用删除节点的递归方法
    this.root = this.deleteNode(this.root, key);
    // 纠正根节点颜色为黑
    if (this.root) this.root.color = Colors.BLACK;
  }

  /**
   * @description: 删除指定节点的递归方法
   */
  private deleteNode(node: RedBlackNode<T>, key: T): RedBlackNode<T> {
    // 如果key比当前节点小
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (!this.isRed(node.left) && !this.isRed(node.left?.left))
        node = this.moveRedLeft(node);
      // 继续递归
      node.left = this.deleteNode(node.left, key);
      //如果key不小于当前节点
    } else {
      if (this.isRed(node.left)) node = this.rotateRight(node);

      // 找到了对应节点并且右子节点为空
      if (
        this.compareFn(key, node.key) === Compare.EQUALS &&
        node.right == null
      )
        return null;

      // 如果左右节点均为黑，则调用moveRedRight
      if (!this.isRed(node.right) && !this.isRed(node.right?.left))
        node = this.moveRedRight(node);

      // 找到了对应节点，并且右侧子节点不为空
      if (this.compareFn(key, node.key) === Compare.EQUALS) {
        const x = this.minNode(node.right);
        node.key = x.key;
        node.right = this.deleteMinNode(node.right);
        // 没有找到继续递归
      } else {
        // 没有找到对应节点，继续递归
        node.right = this.deleteNode(node.right, key);
      }
    }
    // 每次递归后都要平衡节点
    return this.balance(node);
  }

  /**
   * @description: 返回根节点
   */
  getRoot(): RedBlackNode<T> {
    return this.root;
  }

  /**
   * @description: 修正节点颜色
   */
  private flipColors(node: RedBlackNode<T>) {
    node.flipColor();
    node.left.flipColor();
    node.right.flipColor()
  }

  /**
   * @description: 平衡树
   */
  private balance(node: RedBlackNode<T>): RedBlackNode<T> {
    // 核心算法，通过三行判断，来生成一个左倾红黑树
    // 右红左黑，左旋把红链接转到左侧来
    if (this.isRed(node.right) && !this.isRed(node.left))
      node = this.rotateLeft(node);
    // 左红并且左左也红，右旋
    if (this.isRed(node.left) && this.isRed(node.left?.left))
      node = this.rotateRight(node);
    // 不管是旋出来的还是自然插入出来的，只要两红当兄弟，就变色，并把红色向上挪一层（相当于23树中加高一层）
    if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node);
    return node;
  }

  /**
   * @description: 假如节点为红，并且左右为黑，使左或者左的子节点为红
   */
  private moveRedLeft(node: RedBlackNode<T>): RedBlackNode<T> {
    this.flipColors(node);
    if (this.isRed(node.right.left)) {
      node.right = this.rotateRight(node.right);
      node = this.rotateLeft(node);
      this.flipColors(node);
    }
    return node;
  }

  /**
   * @description: 假如节点为红，并且节点的右和右左为黑，则使节点的右或者右的子节点为红
   */
  private moveRedRight(node: RedBlackNode<T>): RedBlackNode<T> {
    this.flipColors(node);
    if (this.isRed(node.left.left)) {
      node = this.rotateLeft(node);
      this.flipColors(node);
    }
    return node;
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
