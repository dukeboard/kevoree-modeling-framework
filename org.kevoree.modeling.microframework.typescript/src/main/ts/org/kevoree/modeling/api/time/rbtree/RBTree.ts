
class RBTree {

  public root: TreeNode = null;
  private size: number = 0;

  public size(): number {
    return this.size;
  }

  public serialize(): string {
    var builder: StringBuilder = new StringBuilder();
    builder.append(this.size);
    if (this.root != null) {
      this.root.serialize(builder);
    }
    return builder.toString();
  }

  public unserialize(payload: string): void {
    if (payload == null || payload.length() == 0) {
      return;
    }
    var i: number = 0;
    var buffer: StringBuilder = new StringBuilder();
    var ch: string = payload.charAt(i);
    while (i < payload.length() && ch != '|'){
      buffer.append(ch);
      i = i + 1;
      ch = payload.charAt(i);
    }
    this.size = Integer.parseInt(buffer.toString());
    this.root = new ReaderContext(i, payload).unserialize(true);
  }

  public previousOrEqual(key: number): TreeNode {
    var p: TreeNode = this.root;
    if (p == null) {
      return null;
    }
    while (p != null){
      if (key == p.key) {
        return p;
      }
      if (key > p.key) {
        if (p.getRight() != null) {
          p = p.getRight();
        } else {
          return p;
        }
      } else {
        if (p.getLeft() != null) {
          p = p.getLeft();
        } else {
          var parent: TreeNode = p.getParent();
          var ch: TreeNode = p;
          while (parent != null && ch == parent.getLeft()){
            ch = parent;
            parent = parent.getParent();
          }
          return parent;
        }
      }
    }
    return null;
  }

  public nextOrEqual(key: number): TreeNode {
    var p: TreeNode = this.root;
    if (p == null) {
      return null;
    }
    while (p != null){
      if (key == p.key) {
        return p;
      }
      if (key < p.key) {
        if (p.getLeft() != null) {
          p = p.getLeft();
        } else {
          return p;
        }
      } else {
        if (p.getRight() != null) {
          p = p.getRight();
        } else {
          var parent: TreeNode = p.getParent();
          var ch: TreeNode = p;
          while (parent != null && ch == parent.getRight()){
            ch = parent;
            parent = parent.getParent();
          }
          return parent;
        }
      }
    }
    return null;
  }

  public previous(key: number): TreeNode {
    var p: TreeNode = this.root;
    if (p == null) {
      return null;
    }
    while (p != null){
      if (key < p.key) {
        if (p.getLeft() != null) {
          p = p.getLeft();
        } else {
          return p.previous();
        }
      } else {
        if (key > p.key) {
          if (p.getRight() != null) {
            p = p.getRight();
          } else {
            return p;
          }
        } else {
          return p.previous();
        }
      }
    }
    return null;
  }

  public previousWhileNot(key: number, until: State): TreeNode {
    var elm: TreeNode = this.previousOrEqual(key);
    if (elm.value.equals(until)) {
      return null;
    } else {
      if (elm.key == key) {
        elm = elm.previous();
      }
    }
    if (elm == null || elm.value.equals(until)) {
      return null;
    } else {
      return elm;
    }
  }

  public next(key: number): TreeNode {
    var p: TreeNode = this.root;
    if (p == null) {
      return null;
    }
    while (p != null){
      if (key < p.key) {
        if (p.getLeft() != null) {
          p = p.getLeft();
        } else {
          return p;
        }
      } else {
        if (key > p.key) {
          if (p.getRight() != null) {
            p = p.getRight();
          } else {
            return p.next();
          }
        } else {
          return p.next();
        }
      }
    }
    return null;
  }

  public nextWhileNot(key: number, until: State): TreeNode {
    var elm: TreeNode = this.nextOrEqual(key);
    if (elm.value.equals(until)) {
      return null;
    } else {
      if (elm.key == key) {
        elm = elm.next();
      }
    }
    if (elm == null || elm.value.equals(until)) {
      return null;
    } else {
      return elm;
    }
  }

  public first(): TreeNode {
    var p: TreeNode = this.root;
    if (p == null) {
      return null;
    }
    while (p != null){
      if (p.getLeft() != null) {
        p = p.getLeft();
      } else {
        return p;
      }
    }
    return null;
  }

  public last(): TreeNode {
    var p: TreeNode = this.root;
    if (p == null) {
      return null;
    }
    while (p != null){
      if (p.getRight() != null) {
        p = p.getRight();
      } else {
        return p;
      }
    }
    return null;
  }

  public firstWhileNot(key: number, until: State): TreeNode {
    var elm: TreeNode = this.previousOrEqual(key);
    if (elm == null) {
      return null;
    } else {
      if (elm.value.equals(until)) {
        return null;
      }
    }
    var prev: TreeNode = null;
    do {
      prev = elm.previous();
      if (prev == null || prev.value.equals(until)) {
        return elm;
      } else {
        elm = prev;
      }
    } while (elm != null)
    return prev;
  }

  public lastWhileNot(key: number, until: State): TreeNode {
    var elm: TreeNode = this.previousOrEqual(key);
    if (elm == null) {
      return null;
    } else {
      if (elm.value.equals(until)) {
        return null;
      }
    }
    var next: TreeNode;
    do {
      next = elm.next();
      if (next == null || next.value.equals(until)) {
        return elm;
      } else {
        elm = next;
      }
    } while (elm != null)
    return next;
  }

  private lookupNode(key: number): TreeNode {
    var n: TreeNode = this.root;
    if (n == null) {
      return null;
    }
    while (n != null){
      if (key == n.key) {
        return n;
      } else {
        if (key < n.key) {
          n = n.getLeft();
        } else {
          n = n.getRight();
        }
      }
    }
    return n;
  }

  public lookup(key: number): State {
    var n: TreeNode = this.lookupNode(key);
    if (n == null) {
      return null;
    } else {
      return n.value;
    }
  }

  private rotateLeft(n: TreeNode): void {
    var r: TreeNode = n.getRight();
    this.replaceNode(n, r);
    n.setRight(r.getLeft());
    if (r.getLeft() != null) {
      r.getLeft().setParent(n);
    }
    r.setLeft(n);
    n.setParent(r);
  }

  private rotateRight(n: TreeNode): void {
    var l: TreeNode = n.getLeft();
    this.replaceNode(n, l);
    n.setLeft(l.getRight());
    if (l.getRight() != null) {
      l.getRight().setParent(n);
    }
    l.setRight(n);
    n.setParent(l);
  }

  private replaceNode(oldn: TreeNode, newn: TreeNode): void {
    if (oldn.getParent() == null) {
      this.root = newn;
    } else {
      if (oldn == oldn.getParent().getLeft()) {
        oldn.getParent().setLeft(newn);
      } else {
        oldn.getParent().setRight(newn);
      }
    }
    if (newn != null) {
      newn.setParent(oldn.getParent());
    }
  }

  public insert(key: number, value: State): void {
    var insertedNode: TreeNode = new TreeNode(key, value, Color.RED, null, null);
    if (this.root == null) {
      this.size++;
      this.root = insertedNode;
    } else {
      var n: TreeNode = this.root;
      while (true){
        if (key == n.key) {
          n.value = value;
          return;
        } else {
          if (key < n.key) {
            if (n.getLeft() == null) {
              n.setLeft(insertedNode);
              this.size++;
              break;
            } else {
              n = n.getLeft();
            }
          } else {
            if (n.getRight() == null) {
              n.setRight(insertedNode);
              this.size++;
              break;
            } else {
              n = n.getRight();
            }
          }
        }
      }
      insertedNode.setParent(n);
    }
    this.insertCase1(insertedNode);
  }

  private insertCase1(n: TreeNode): void {
    if (n.getParent() == null) {
      n.color = Color.BLACK;
    } else {
      this.insertCase2(n);
    }
  }

  private insertCase2(n: TreeNode): void {
    if (this.nodeColor(n.getParent()) == Color.BLACK) {
      return;
    } else {
      this.insertCase3(n);
    }
  }

  private insertCase3(n: TreeNode): void {
    if (this.nodeColor(n.uncle()) == Color.RED) {
      n.getParent().color = Color.BLACK;
      n.uncle().color = Color.BLACK;
      n.grandparent().color = Color.RED;
      this.insertCase1(n.grandparent());
    } else {
      this.insertCase4(n);
    }
  }

  private insertCase4(n_n: TreeNode): void {
    var n: TreeNode = n_n;
    if (n == n.getParent().getRight() && n.getParent() == n.grandparent().getLeft()) {
      this.rotateLeft(n.getParent());
      n = n.getLeft();
    } else {
      if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getRight()) {
        this.rotateRight(n.getParent());
        n = n.getRight();
      }
    }
    this.insertCase5(n);
  }

  private insertCase5(n: TreeNode): void {
    n.getParent().color = Color.BLACK;
    n.grandparent().color = Color.RED;
    if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
      this.rotateRight(n.grandparent());
    } else {
      this.rotateLeft(n.grandparent());
    }
  }

  public delete(key: number): void {
    var n: TreeNode = this.lookupNode(key);
    if (n == null) {
      return;
    } else {
      this.size--;
      if (n.getLeft() != null && n.getRight() != null) {
        var pred: TreeNode = n.getLeft();
        while (pred.getRight() != null){
          pred = pred.getRight();
        }
        n.key = pred.key;
        n.value = pred.value;
        n = pred;
      }
      var child: TreeNode;
      if (n.getRight() == null) {
        child = n.getLeft();
      } else {
        child = n.getRight();
      }
      if (this.nodeColor(n) == Color.BLACK) {
        n.color = this.nodeColor(child);
        this.deleteCase1(n);
      }
      this.replaceNode(n, child);
    }
  }

  private deleteCase1(n: TreeNode): void {
    if (n.getParent() == null) {
      return;
    } else {
      this.deleteCase2(n);
    }
  }

  private deleteCase2(n: TreeNode): void {
    if (this.nodeColor(n.sibling()) == Color.RED) {
      n.getParent().color = Color.RED;
      n.sibling().color = Color.BLACK;
      if (n == n.getParent().getLeft()) {
        this.rotateLeft(n.getParent());
      } else {
        this.rotateRight(n.getParent());
      }
    }
    this.deleteCase3(n);
  }

  private deleteCase3(n: TreeNode): void {
    if (this.nodeColor(n.getParent()) == Color.BLACK && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().getLeft()) == Color.BLACK && this.nodeColor(n.sibling().getRight()) == Color.BLACK) {
      n.sibling().color = Color.RED;
      this.deleteCase1(n.getParent());
    } else {
      this.deleteCase4(n);
    }
  }

  private deleteCase4(n: TreeNode): void {
    if (this.nodeColor(n.getParent()) == Color.RED && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().getLeft()) == Color.BLACK && this.nodeColor(n.sibling().getRight()) == Color.BLACK) {
      n.sibling().color = Color.RED;
      n.getParent().color = Color.BLACK;
    } else {
      this.deleteCase5(n);
    }
  }

  private deleteCase5(n: TreeNode): void {
    if (n == n.getParent().getLeft() && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().getLeft()) == Color.RED && this.nodeColor(n.sibling().getRight()) == Color.BLACK) {
      n.sibling().color = Color.RED;
      n.sibling().getLeft().color = Color.BLACK;
      this.rotateRight(n.sibling());
    } else {
      if (n == n.getParent().getRight() && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().getRight()) == Color.RED && this.nodeColor(n.sibling().getLeft()) == Color.BLACK) {
        n.sibling().color = Color.RED;
        n.sibling().getRight().color = Color.BLACK;
        this.rotateLeft(n.sibling());
      }
    }
    this.deleteCase6(n);
  }

  private deleteCase6(n: TreeNode): void {
    n.sibling().color = this.nodeColor(n.getParent());
    n.getParent().color = Color.BLACK;
    if (n == n.getParent().getLeft()) {
      n.sibling().getRight().color = Color.BLACK;
      this.rotateLeft(n.getParent());
    } else {
      n.sibling().getLeft().color = Color.BLACK;
      this.rotateRight(n.getParent());
    }
  }

  private nodeColor(n: TreeNode): Color {
    if (n == null) {
      return Color.BLACK;
    } else {
      return n.color;
    }
  }

}

