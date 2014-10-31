
class TreeNode {

  public static BLACK_DELETE: string = '0';
  public static BLACK_EXISTS: string = '1';
  public static RED_DELETE: string = '2';
  public static RED_EXISTS: string = '3';
  public key: number = 0;
  public value: State = null;
  public color: Color = null;
  private left: TreeNode = null;
  private right: TreeNode = null;
  private parent: TreeNode = null;

  public getKey(): number {
    return this.key;
  }

  constructor(key: number, value: State, color: Color, left: TreeNode, right: TreeNode) {
    this.key = key;
    this.value = value;
    this.color = color;
    this.left = left;
    this.right = right;
    if (left != null) {
      left.parent = this;
    }
    if (right != null) {
      right.parent = this;
    }
    this.parent = null;
  }

  public grandparent(): TreeNode {
    if (this.parent != null) {
      return this.parent.parent;
    } else {
      return null;
    }
  }

  public sibling(): TreeNode {
    if (this.parent == null) {
      return null;
    } else {
      if (this == this.parent.left) {
        return this.parent.right;
      } else {
        return this.parent.left;
      }
    }
  }

  public uncle(): TreeNode {
    if (this.parent != null) {
      return this.parent.sibling();
    } else {
      return null;
    }
  }

  public getLeft(): TreeNode {
    return this.left;
  }

  public setLeft(left: TreeNode): void {
    this.left = left;
  }

  public getRight(): TreeNode {
    return this.right;
  }

  public setRight(right: TreeNode): void {
    this.right = right;
  }

  public getParent(): TreeNode {
    return this.parent;
  }

  public setParent(parent: TreeNode): void {
    this.parent = parent;
  }

  public serialize(builder: StringBuilder): void {
    builder.append("|");
    if (this.value == State.DELETED) {
      if (this.color == Color.BLACK) {
        builder.append(TreeNode.BLACK_DELETE);
      } else {
        builder.append(TreeNode.RED_DELETE);
      }
    } else {
      if (this.color == Color.BLACK) {
        builder.append(TreeNode.BLACK_EXISTS);
      } else {
        builder.append(TreeNode.RED_EXISTS);
      }
    }
    builder.append(this.key);
    if (this.left == null && this.right == null) {
      builder.append("%");
    } else {
      if (this.left != null) {
        this.left.serialize(builder);
      } else {
        builder.append("#");
      }
      if (this.right != null) {
        this.right.serialize(builder);
      } else {
        builder.append("#");
      }
    }
  }

  public next(): TreeNode {
    var p: TreeNode = this;
    if (p.right != null) {
      p = p.right;
      while (p.left != null){
        p = p.left;
      }
      return p;
    } else {
      if (p.parent != null) {
        if (p == p.parent.left) {
          return p.parent;
        } else {
          while (p.parent != null && p == p.parent.right){
            p = p.parent;
          }
          return p.parent;
        }
      } else {
        return null;
      }
    }
  }

  public previous(): TreeNode {
    var p: TreeNode = this;
    if (p.left != null) {
      p = p.left;
      while (p.right != null){
        p = p.right;
      }
      return p;
    } else {
      if (p.parent != null) {
        if (p == p.parent.right) {
          return p.parent;
        } else {
          while (p.parent != null && p == p.parent.left){
            p = p.parent;
          }
          return p.parent;
        }
      } else {
        return null;
      }
    }
  }

}

