import { Colors } from './../../src/data-structures/models/red-black-node';
import 'mocha';
import { expect } from 'chai';
import { RedBlackTree } from '../../src/index';

describe('RedBlackTree', () => {
  let tree: RedBlackTree<number>;

  beforeEach(() => {
    tree = new RedBlackTree<number>();
  });

  it('starts empty', () => {
    expect(tree.getRoot()).to.equal(undefined);
  });

  it('inserts elements in the RedBlackTree', () => {
    expect(tree.getRoot()).to.equal(undefined);

    let node;

    tree.insert(1);
    assertNode(tree.getRoot(), 1, Colors.BLACK);

    tree.insert(2);
    assertNode(tree.getRoot(), 2, Colors.BLACK);
    assertNode(tree.getRoot().left, 1, Colors.RED);

    tree.insert(3);
    assertNode(tree.getRoot(), 2, Colors.BLACK);
    assertNode(tree.getRoot().left, 1, Colors.BLACK);
    assertNode(tree.getRoot().right, 3, Colors.BLACK);

    tree.insert(4);
    assertNode(tree.getRoot(), 2, Colors.BLACK);
    assertNode(tree.getRoot().left, 1, Colors.BLACK);
    assertNode(tree.getRoot().right, 4, Colors.BLACK);
    assertNode(tree.getRoot().right.left, 3, Colors.RED);

    tree.insert(5);
    assertNode(tree.getRoot(), 4, Colors.BLACK);
    assertNode(tree.getRoot().left, 2, Colors.RED);
    assertNode(tree.getRoot().right, 5, Colors.BLACK);
    assertNode(tree.getRoot().left.left, 1, Colors.BLACK);
    assertNode(tree.getRoot().left.right, 3, Colors.BLACK);

    tree.insert(6);
    assertNode(tree.getRoot(), 4, Colors.BLACK);
    assertNode(tree.getRoot().left, 2, Colors.RED);
    assertNode(tree.getRoot().right, 6, Colors.BLACK);
    assertNode(tree.getRoot().left.left, 1, Colors.BLACK);
    assertNode(tree.getRoot().left.right, 3, Colors.BLACK);
    assertNode(tree.getRoot().right.left, 5, Colors.RED);

    tree.insert(7);
    assertNode(tree.getRoot(), 4, Colors.BLACK);
    assertNode(tree.getRoot().left, 2, Colors.BLACK);
    assertNode(tree.getRoot().right, 6, Colors.BLACK);
    assertNode(tree.getRoot().left.left, 1, Colors.BLACK);
    assertNode(tree.getRoot().left.right, 3, Colors.BLACK);
    assertNode(tree.getRoot().right.left, 5, Colors.BLACK);
    assertNode(tree.getRoot().right.right, 7, Colors.BLACK);

    tree.insert(8);
    assertNode(tree.getRoot(), 4, Colors.BLACK);
    assertNode(tree.getRoot().left, 2, Colors.BLACK);
    assertNode(tree.getRoot().right, 6, Colors.BLACK);
    assertNode(tree.getRoot().left.left, 1, Colors.BLACK);
    assertNode(tree.getRoot().left.right, 3, Colors.BLACK);
    assertNode(tree.getRoot().right.left, 5, Colors.BLACK);
    assertNode(tree.getRoot().right.right, 8, Colors.BLACK);
    assertNode(tree.getRoot().right.right.left, 7, Colors.RED);

    tree.insert(9);
    assertNode(tree.getRoot(), 4, Colors.BLACK);
    assertNode(tree.getRoot().left, 2, Colors.BLACK);
    assertNode(tree.getRoot().right, 8, Colors.BLACK);
    assertNode(tree.getRoot().left.left, 1, Colors.BLACK);
    assertNode(tree.getRoot().left.right, 3, Colors.BLACK);
    assertNode(tree.getRoot().right.left, 6, Colors.RED);
    assertNode(tree.getRoot().right.right, 9, Colors.BLACK);
    assertNode(tree.getRoot().right.left.left, 5, Colors.BLACK);
    assertNode(tree.getRoot().right.left.right, 7, Colors.BLACK);

    tree.insert(10);
    assertNode(tree.getRoot(), 4, Colors.BLACK);
    assertNode(tree.getRoot().left, 2, Colors.BLACK);
    assertNode(tree.getRoot().right, 8, Colors.BLACK);
    assertNode(tree.getRoot().left.left, 1, Colors.BLACK);
    assertNode(tree.getRoot().left.right, 3, Colors.BLACK);
    assertNode(tree.getRoot().right.left, 6, Colors.RED);
    assertNode(tree.getRoot().right.right, 10, Colors.BLACK);
    assertNode(tree.getRoot().right.left.left, 5, Colors.BLACK);
    assertNode(tree.getRoot().right.left.right, 7, Colors.BLACK);
    assertNode(tree.getRoot().right.right.left, 9, Colors.RED);

  });

  function assertNode(node, key, color) {
    expect(node.color).to.equal(color);
    expect(node.key).to.equal(key);
  }
});
