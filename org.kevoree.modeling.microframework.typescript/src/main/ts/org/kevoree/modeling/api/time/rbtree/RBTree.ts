
class RBTree {

  public root: Node = null;
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

  public previousOrEqual(key: number): Node {
    var p: Node = this.root;
    if (p == null) {
      return null;
    }
    while (p != null){
      if (key == p.key) {
        return p;
      }
      if (key > p.key) {
        if (p.right != null) {
          p = p.right;
        } else {
          return p;
        }
      } else {
        if (p.left != null) {
          p = p.left;
        } else {
          var parent: Node = p.parent;
          var ch: Node = p;
          while (parent != null && ch == parent.left){
            ch = parent;
            parent = parent.parent;
          }
          return parent;
        }
      }
    }
    return null;
  }

  public nextOrEqual(key: number): Node {
    var p: Node = this.root;
    if (p == null) {
      return null;
    }
    while (p != null){
      if (key == p.key) {
        return p;
      }
      if (key < p.key) {
        if (p.left != null) {
          p = p.left;
        } else {
          return p;
        }
      } else {
        if (p.right != null) {
          p = p.right;
        } else {
          var parent: Node = p.parent;
          var ch: Node = p;
          while (parent != null && ch == parent.right){
            ch = parent;
            parent = parent.parent;
          }
          return parent;
        }
      }
    }
    return null;
  }

  public previous(key: number): Node {
    var p: Node = this.root;
    if (p == null) {
      return null;
    }
    while (p != null){
      if (key < p.key) {
        if (p.left != null) {
          p = p.left;
        } else {
          return p.previous();
        }
      } else {
        if (key > p.key) {
          if (p.right != null) {
            p = p.right;
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

  public previousWhileNot(key: number, until: State): Node {
    var elm: Node = this.previousOrEqual(key);
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

  public next(key: number): Node {
    var p: Node = this.root;
    if (p == null) {
      return null;
    }
    while (p != null){
      if (key < p.key) {
        if (p.left != null) {
          p = p.left;
        } else {
          return p;
        }
      } else {
        if (key > p.key) {
          if (p.right != null) {
            p = p.right;
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

  public nextWhileNot(key: number, until: State): Node {
    var elm: Node = this.nextOrEqual(key);
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

  public first(): Node {
    var p: Node = this.root;
    if (p == null) {
      return null;
    }
    while (p != null){
      if (p.left != null) {
        p = p.left;
      } else {
        return p;
      }
    }
    return null;
  }

  public last(): Node {
    var p: Node = this.root;
    if (p == null) {
      return null;
    }
    while (p != null){
      if (p.right != null) {
        p = p.right;
      } else {
        return p;
      }
    }
    return null;
  }

  public firstWhileNot(key: number, until: State): Node {
    var elm: Node = this.previousOrEqual(key);
    if (elm == null) {
      return null;
    } else {
      if (elm.value.equals(until)) {
        return null;
      }
    }
    var prev: Node = null;
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

  public lastWhileNot(key: number, until: State): Node {
    var elm: Node = this.previousOrEqual(key);
    if (elm == null) {
      return null;
    } else {
      if (elm.value.equals(until)) {
        return null;
      }
    }
    var next: Node;
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

  private lookupNode(key: number): Node {
    var n: Node = this.root;
    if (n == null) {
      return null;
    }
    while (n != null){
      if (key == n.key) {
        return n;
      } else {
        if (key < n.key) {
          n = n.left;
        } else {
          n = n.right;
        }
      }
    }
    return n;
  }

  public lookup(key: number): State {
    var n: Node = this.lookupNode(key);
    if (n == null) {
      return null;
    } else {
      return n.value;
    }
  }

  private rotateLeft(n: Node): void {
    var r: Node = n.right;
    this.replaceNode(n, r);
    n.right = r.left;
    if (r.left != null) {
      r.left.parent = n;
    }
    r.left = n;
    n.parent = r;
  }

  private rotateRight(n: Node): void {
    var l: Node = n.left;
    this.replaceNode(n, l);
    n.left = l.right;
    if (l.right != null) {
      l.right.parent = n;
    }
    l.right = n;
    n.parent = l;
  }

  private replaceNode(oldn: Node, newn: Node): void {
    if (oldn.parent == null) {
      this.root = newn;
    } else {
      if (oldn == oldn.parent.left) {
        oldn.parent.left = newn;
      } else {
        oldn.parent.right = newn;
      }
    }
    if (newn != null) {
      newn.parent = oldn.parent;
    }
  }

  public insert(key: number, value: State): void {
    var insertedNode: Node = new Node(key, value, Color.RED, null, null);
    if (this.root == null) {
      this.size++;
      this.root = insertedNode;
    } else {
      var n: Node = this.root;
      while (true){
        if (key == n.key) {
          n.value = value;
          return;
        } else {
          if (key < n.key) {
            if (n.left == null) {
              n.left = insertedNode;
              this.size++;
              break;
            } else {
              n = n.left;
            }
          } else {
            if (n.right == null) {
              n.right = insertedNode;
              this.size++;
              break;
            } else {
              n = n.right;
            }
          }
        }
      }
      insertedNode.parent = n;
    }
    this.insertCase1(insertedNode);
  }

  private insertCase1(n: Node): void {
    if (n.parent == null) {
      n.color = Color.BLACK;
    } else {
      this.insertCase2(n);
    }
  }

  private insertCase2(n: Node): void {
    if (this.nodeColor(n.parent) == Color.BLACK) {
      return;
    } else {
      this.insertCase3(n);
    }
  }

  private insertCase3(n: Node): void {
    if (this.nodeColor(n.uncle()) == Color.RED) {
      n.parent.color = Color.BLACK;
      n.uncle().color = Color.BLACK;
      n.grandparent().color = Color.RED;
      this.insertCase1(n.grandparent());
    } else {
      this.insertCase4(n);
    }
  }

  private insertCase4(n_n: Node): void {
    var n: Node = n_n;
    if (n == n.parent.right && n.parent == n.grandparent().left) {
      this.rotateLeft(n.parent);
      n = n.left;
    } else {
      if (n == n.parent.left && n.parent == n.grandparent().right) {
        this.rotateRight(n.parent);
        n = n.right;
      }
    }
    this.insertCase5(n);
  }

  private insertCase5(n: Node): void {
    n.parent.color = Color.BLACK;
    n.grandparent().color = Color.RED;
    if (n == n.parent.left && n.parent == n.grandparent().left) {
      this.rotateRight(n.grandparent());
    } else {
      this.rotateLeft(n.grandparent());
    }
  }

  public delete(key: number): void {
    var n: Node = this.lookupNode(key);
    if (n == null) {
      return;
    } else {
      this.size--;
      if (n.left != null && n.right != null) {
        var pred: Node = n.left;
        while (pred.right != null){
          pred = pred.right;
        }
        n.key = pred.key;
        n.value = pred.value;
        n = pred;
      }
      var child: Node;
      if (n.right == null) {
        child = n.left;
      } else {
        child = n.right;
      }
      if (this.nodeColor(n) == Color.BLACK) {
        n.color = this.nodeColor(child);
        this.deleteCase1(n);
      }
      this.replaceNode(n, child);
    }
  }

  private deleteCase1(n: Node): void {
    if (n.parent == null) {
      return;
    } else {
      this.deleteCase2(n);
    }
  }

  private deleteCase2(n: Node): void {
    if (this.nodeColor(n.sibling()) == Color.RED) {
      n.parent.color = Color.RED;
      n.sibling().color = Color.BLACK;
      if (n == n.parent.left) {
        this.rotateLeft(n.parent);
      } else {
        this.rotateRight(n.parent);
      }
    }
    this.deleteCase3(n);
  }

  private deleteCase3(n: Node): void {
    if (this.nodeColor(n.parent) == Color.BLACK && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().left) == Color.BLACK && this.nodeColor(n.sibling().right) == Color.BLACK) {
      n.sibling().color = Color.RED;
      this.deleteCase1(n.parent);
    } else {
      this.deleteCase4(n);
    }
  }

  private deleteCase4(n: Node): void {
    if (this.nodeColor(n.parent) == Color.RED && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().left) == Color.BLACK && this.nodeColor(n.sibling().right) == Color.BLACK) {
      n.sibling().color = Color.RED;
      n.parent.color = Color.BLACK;
    } else {
      this.deleteCase5(n);
    }
  }

  private deleteCase5(n: Node): void {
    if (n == n.parent.left && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().left) == Color.RED && this.nodeColor(n.sibling().right) == Color.BLACK) {
      n.sibling().color = Color.RED;
      n.sibling().left.color = Color.BLACK;
      this.rotateRight(n.sibling());
    } else {
      if (n == n.parent.right && this.nodeColor(n.sibling()) == Color.BLACK && this.nodeColor(n.sibling().right) == Color.RED && this.nodeColor(n.sibling().left) == Color.BLACK) {
        n.sibling().color = Color.RED;
        n.sibling().right.color = Color.BLACK;
        this.rotateLeft(n.sibling());
      }
    }
    this.deleteCase6(n);
  }

  private deleteCase6(n: Node): void {
    n.sibling().color = this.nodeColor(n.parent);
    n.parent.color = Color.BLACK;
    if (n == n.parent.left) {
      n.sibling().right.color = Color.BLACK;
      this.rotateLeft(n.parent);
    } else {
      n.sibling().left.color = Color.BLACK;
      this.rotateRight(n.parent);
    }
  }

  private nodeColor(n: Node): Color {
    if (n == null) {
      return Color.BLACK;
    } else {
      return n.color;
    }
  }

}

