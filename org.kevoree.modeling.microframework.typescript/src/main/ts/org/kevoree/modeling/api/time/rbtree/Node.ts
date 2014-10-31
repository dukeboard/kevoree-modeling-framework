
class Node {

  public static BLACK_DELETE: string = '0';
  public static BLACK_EXISTS: string = '1';
  public static RED_DELETE: string = '2';
  public static RED_EXISTS: string = '3';
  public key: number = 0;
  public value: State = null;
  public color: Color = null;
  public left: Node = null;
  public right: Node = null;
  public parent: Node = null;

  public getKey(): number {
    return this.key;
  }

  constructor(key: number, value: State, color: Color, left: Node, right: Node) {
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

  public grandparent(): Node {
    if (this.parent != null) {
      return this.parent.parent;
    } else {
      return null;
    }
  }

  public sibling(): Node {
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

  public uncle(): Node {
    if (this.parent != null) {
      return this.parent.sibling();
    } else {
      return null;
    }
  }

  public getLeft(): Node {
    return this.left;
  }

  public setLeft(left: Node): void {
    this.left = left;
  }

  public getRight(): Node {
    return this.right;
  }

  public setRight(right: Node): void {
    this.right = right;
  }

  public getParent(): Node {
    return this.parent;
  }

  public setParent(parent: Node): void {
    this.parent = parent;
  }

  public serialize(builder: StringBuilder): void {
    builder.append("|");
    if (this.value == State.DELETED) {
      if (this.color == Color.BLACK) {
        builder.append(Node.BLACK_DELETE);
      } else {
        builder.append(Node.RED_DELETE);
      }
    } else {
      if (this.color == Color.BLACK) {
        builder.append(Node.BLACK_EXISTS);
      } else {
        builder.append(Node.RED_EXISTS);
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

  public next(): Node {
    var p: Node = this;
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

  public previous(): Node {
    var p: Node = this;
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

