///<reference path="../../../../junit/Test.ts"/>
///<reference path="../../../../junit/Assert.ts"/>
///<reference path="../../api/time/rbtree/TreeNode.ts"/>
///<reference path="../../api/time/rbtree/RBTree.ts"/>
///<reference path="../../api/time/rbtree/State.ts"/>
///<reference path="../../../../../java/util/LinkedList.ts"/>
///<reference path="../../../../../java/util/Queue.ts"/>

class RBTreeTest {

  public nextTest(): void {
    var MIN: number = 0;
    var MAX: number = 99;
    for (var j: number = MIN; j <= MAX; j++) {
      var tree: RBTree = new RBTree();
      for (var i: number = MIN; i <= j; i++) {
        if ((i % 3) == 0) {
          tree.insert(i, State.DELETED);
        } else {
          tree.insert(i, State.EXISTS);
        }
      }
      for (var i: number = MIN; i < j - 1; i++) {
        Assert.assertTrue(tree.next(i).getKey() == i + 1);
      }
      Assert.assertTrue(tree.next(j) == null);
    }
  }

  private printTree(root: TreeNode): void {
    var queue: Queue<TreeNode> = new LinkedList<TreeNode>();
    queue.add(root);
    queue.add(null);
    while (!queue.isEmpty()){
      var current: TreeNode = queue.poll();
      while (current != null){
        System.out.print("| " + current.getKey() + " ");
        if (current.getLeft() != null) {
          queue.add(current.getLeft());
        }
        if (current.getRight() != null) {
          queue.add(current.getRight());
        }
        current = queue.poll();
      }
      System.out.println();
      if (!queue.isEmpty()) {
        queue.add(null);
      }
    }
  }

  public previousTest(): void {
    var MIN: number = 0;
    var MAX: number = 99;
    for (var j: number = MIN + 1; j <= MAX; j++) {
      var tree: RBTree = new RBTree();
      for (var i: number = MIN; i <= j; i++) {
        if ((i % 7) == 0) {
          tree.insert(i, State.DELETED);
        } else {
          tree.insert(i, State.EXISTS);
        }
      }
      for (var i: number = j; i > MIN; i--) {
        Assert.assertTrue(tree.previous(i).getKey() == i - 1);
      }
      Assert.assertTrue(tree.previous(MIN) == null);
    }
  }

  public nextWhileNotTest(): void {
    var tree: RBTree = new RBTree();
    for (var i: number = 0; i <= 6; i++) {
      tree.insert(i, State.EXISTS);
    }
    tree.insert(8, State.DELETED);
    tree.insert(10, State.EXISTS);
    tree.insert(11, State.EXISTS);
    tree.insert(13, State.EXISTS);
    for (var i: number = 0; i < 5; i++) {
      Assert.assertTrue(tree.nextWhileNot(i, State.DELETED).getKey() == (i + 1));
    }
    Assert.assertTrue(tree.nextWhileNot(5, State.DELETED) != null && tree.nextWhileNot(5, State.DELETED).getKey() == 6);
    Assert.assertNull(tree.nextWhileNot(6, State.DELETED));
    Assert.assertNull(tree.nextWhileNot(7, State.DELETED));
    Assert.assertNull(tree.nextWhileNot(8, State.DELETED));
    Assert.assertTrue(tree.nextWhileNot(9, State.DELETED) != null && tree.nextWhileNot(9, State.DELETED).getKey() == 10);
    Assert.assertTrue(tree.nextWhileNot(10, State.DELETED) != null && tree.nextWhileNot(10, State.DELETED).getKey() == 11);
  }

  public previousWhileNotTest(): void {
    var tree: RBTree = new RBTree();
    for (var i: number = 0; i <= 6; i++) {
      tree.insert(i, State.EXISTS);
    }
    tree.insert(8, State.DELETED);
    tree.insert(10, State.EXISTS);
    tree.insert(11, State.EXISTS);
    tree.insert(13, State.EXISTS);
    Assert.assertTrue(tree.previousWhileNot(14, State.DELETED) != null && tree.previousWhileNot(14, State.DELETED).getKey() == 13);
    Assert.assertTrue(tree.previousWhileNot(13, State.DELETED) != null && tree.previousWhileNot(13, State.DELETED).getKey() == 11);
    Assert.assertTrue(tree.previousWhileNot(12, State.DELETED) != null && tree.previousWhileNot(12, State.DELETED).getKey() == 11);
    Assert.assertTrue(tree.previousWhileNot(11, State.DELETED) != null && tree.previousWhileNot(11, State.DELETED).getKey() == 10);
    Assert.assertNull(tree.previousWhileNot(10, State.DELETED));
    Assert.assertNull(tree.previousWhileNot(9, State.DELETED));
    Assert.assertNull(tree.previousWhileNot(8, State.DELETED));
    Assert.assertTrue(tree.previousWhileNot(7, State.DELETED) != null && tree.previousWhileNot(7, State.DELETED).getKey() == 6);
    Assert.assertTrue(tree.previousWhileNot(6, State.DELETED) != null && tree.previousWhileNot(6, State.DELETED).getKey() == 5);
  }

  public firstTest(): void {
    var MIN: number = 0;
    var MAX: number = 99;
    for (var j: number = MIN + 1; j <= MAX; j++) {
      var tree: RBTree = new RBTree();
      for (var i: number = MIN; i <= j; i++) {
        if ((i % 3) == 0) {
          tree.insert(i, State.DELETED);
        } else {
          tree.insert(i, State.EXISTS);
        }
      }
      Assert.assertTrue(tree.first().getKey() == MIN);
    }
  }

  public lastTest(): void {
    var MIN: number = 0;
    var MAX: number = 99;
    for (var j: number = MIN + 1; j <= MAX; j++) {
      var tree: RBTree = new RBTree();
      for (var i: number = MIN; i <= j; i++) {
        if ((i % 3) == 0) {
          tree.insert(i, State.DELETED);
        } else {
          tree.insert(i, State.EXISTS);
        }
      }
      Assert.assertTrue(tree.last().getKey() == j);
    }
  }

  public firstWhileNot(): void {
    var tree: RBTree = new RBTree();
    for (var i: number = 0; i <= 6; i++) {
      tree.insert(i, State.EXISTS);
    }
    tree.insert(8, State.DELETED);
    tree.insert(10, State.EXISTS);
    tree.insert(11, State.EXISTS);
    tree.insert(13, State.EXISTS);
    Assert.assertTrue(tree.firstWhileNot(14, State.DELETED).getKey() == 10);
    Assert.assertTrue(tree.firstWhileNot(13, State.DELETED).getKey() == 10);
    Assert.assertTrue(tree.firstWhileNot(12, State.DELETED).getKey() == 10);
    Assert.assertTrue(tree.firstWhileNot(11, State.DELETED).getKey() == 10);
    Assert.assertTrue(tree.firstWhileNot(10, State.DELETED).getKey() == 10);
    Assert.assertNull(tree.firstWhileNot(9, State.DELETED));
    Assert.assertNull(tree.firstWhileNot(8, State.DELETED));
    Assert.assertTrue(tree.firstWhileNot(7, State.DELETED).getKey() == 0);
    Assert.assertTrue(tree.firstWhileNot(6, State.DELETED).getKey() == 0);
  }

  public lastWhileNot(): void {
    var tree: RBTree = new RBTree();
    for (var i: number = 0; i <= 6; i++) {
      tree.insert(i, State.EXISTS);
    }
    tree.insert(8, State.DELETED);
    tree.insert(10, State.EXISTS);
    tree.insert(11, State.EXISTS);
    tree.insert(13, State.EXISTS);
    Assert.assertTrue(tree.lastWhileNot(0, State.DELETED).getKey() == 6);
    Assert.assertTrue(tree.lastWhileNot(5, State.DELETED).getKey() == 6);
    Assert.assertTrue(tree.lastWhileNot(6, State.DELETED).getKey() == 6);
    Assert.assertTrue(tree.lastWhileNot(7, State.DELETED).getKey() == 6);
    Assert.assertNull(tree.lastWhileNot(8, State.DELETED));
    Assert.assertNull(tree.lastWhileNot(9, State.DELETED));
    Assert.assertTrue(tree.lastWhileNot(10, State.DELETED).getKey() == 13);
    Assert.assertTrue(tree.lastWhileNot(11, State.DELETED).getKey() == 13);
    Assert.assertTrue(tree.lastWhileNot(12, State.DELETED).getKey() == 13);
    Assert.assertTrue(tree.lastWhileNot(13, State.DELETED).getKey() == 13);
    Assert.assertTrue(tree.lastWhileNot(14, State.DELETED).getKey() == 13);
  }

  public previousOrEqualTest(): void {
    var tree: RBTree = new RBTree();
    for (var i: number = 0; i <= 6; i++) {
      tree.insert(i, State.EXISTS);
    }
    tree.insert(8, State.DELETED);
    tree.insert(10, State.EXISTS);
    tree.insert(11, State.EXISTS);
    tree.insert(13, State.EXISTS);
    Assert.assertNull(tree.previousOrEqual(-1));
    Assert.assertEquals(tree.previousOrEqual(0).getKey(), 0);
    Assert.assertEquals(tree.previousOrEqual(1).getKey(), 1);
    Assert.assertEquals(tree.previousOrEqual(7).getKey(), 6);
    Assert.assertEquals(tree.previousOrEqual(8).getKey(), 8);
    Assert.assertEquals(tree.previousOrEqual(9).getKey(), 8);
    Assert.assertEquals(tree.previousOrEqual(10).getKey(), 10);
    Assert.assertEquals(tree.previousOrEqual(13).getKey(), 13);
    Assert.assertEquals(tree.previousOrEqual(14).getKey(), 13);
  }

  public nextOrEqualTest(): void {
    var tree: RBTree = new RBTree();
    for (var i: number = 0; i <= 6; i++) {
      tree.insert(i, State.EXISTS);
    }
    tree.insert(8, State.DELETED);
    tree.insert(10, State.EXISTS);
    tree.insert(11, State.EXISTS);
    tree.insert(13, State.EXISTS);
    Assert.assertTrue(tree.nextOrEqual(-1).getKey() == 0);
    Assert.assertTrue(tree.nextOrEqual(0).getKey() == 0);
    Assert.assertTrue(tree.nextOrEqual(1).getKey() == 1);
    Assert.assertTrue(tree.nextOrEqual(7).getKey() == 8);
    Assert.assertTrue(tree.nextOrEqual(8).getKey() == 8);
    Assert.assertTrue(tree.nextOrEqual(9).getKey() == 10);
    Assert.assertTrue(tree.nextOrEqual(10).getKey() == 10);
    Assert.assertTrue(tree.nextOrEqual(13).getKey() == 13);
    Assert.assertNull(tree.nextOrEqual(14));
  }

}

