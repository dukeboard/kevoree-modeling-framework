package org.kevoree.modeling.api.time.rbtree;

/**
 * Created by duke on 10/7/14.
 */
public class RBTree {

    public Node root = null;

    private int size = 0;

    public int size() {
        return size;
    }

    public String serialize() {
        StringBuilder builder = new StringBuilder();
        builder.append(size);
        if (root != null) {
            root.serialize(builder);
        }
        return builder.toString();
    }

    /*
     fun serializeBinary() : ByteBuffer {
         var bb = ByteBuffer.allocate(size*13)
         root?.serializeBinary(bb)
         return bb
     }*/


    public void unserialize(String payload) throws Exception {
        if (payload == null || payload.length() == 0) {
            return;
        }
        int i = 0;
        StringBuilder buffer = new StringBuilder();
        char ch = payload.charAt(i);
        while (i < payload.length() && ch != '|') {
            buffer.append(ch);
            i = i + 1;
            ch = payload.charAt(i);
        }
        size = Integer.parseInt(buffer.toString());
        root = new ReaderContext(i, payload).unserialize(true);
    }

    public Node previousOrEqual(long key) {
        Node p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
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
                    Node parent = p.parent;
                    Node ch = p;
                    while (parent != null && ch == parent.left) {
                        ch = parent;
                        parent = parent.parent;
                    }
                    return parent;
                }
            }
        }
        return null;
    }

    public Node nextOrEqual(long key) {
        Node p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
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
                    Node parent = p.parent;
                    Node ch = p;
                    while (parent != null && ch == parent.right) {
                        ch = parent;
                        parent = parent.parent;
                    }
                    return parent;
                }
            }
        }
        return null;
    }

    public Node previous(long key) {
        Node p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
            if (key < p.key) {
                if (p.left != null) {
                    p = p.left;
                } else {
                    return p.previous();
                }
            } else if (key > p.key) {
                if (p.right != null) {
                    p = p.right;
                } else {
                    return p;
                }
            } else {
                return p.previous();
            }
        }
        return null;
    }


    public Node previousWhileNot(long key, State until) {
        Node elm = previousOrEqual(key);
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

    public Node next(long key) {
        Node p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
            if (key < p.key) {
                if (p.left != null) {
                    p = p.left;
                } else {
                    return p;
                }
            } else if (key > p.key) {
                if (p.right != null) {
                    p = p.right;
                } else {
                    return p.next();
                }
            } else {
                return p.next();
            }
        }
        return null;
    }

    public Node nextWhileNot(long key, State until) {
        Node elm = nextOrEqual(key);
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

    public Node first() {
        Node p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
            if (p.left != null) {
                p = p.left;
            } else {
                return p;
            }
        }
        return null;
    }

    public Node last() {
        Node p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
            if (p.right != null) {
                p = p.right;
            } else {
                return p;
            }
        }
        return null;
    }

    public Node firstWhileNot(long key, State until) {
        Node elm = previousOrEqual(key);
        if (elm == null) {
            return null;
        } else if (elm.value.equals(until)) {
            return null;
        }
        Node prev = null;
        do {
            prev = elm.previous();
            if (prev == null || prev.value.equals(until)) {
                return elm;
            } else {
                elm = prev;
            }
        } while (elm != null);
        return prev;
    }

    public Node lastWhileNot(long key, State until) {
        Node elm = previousOrEqual(key);
        if (elm == null) {
            return null;
        } else if (elm.value.equals(until)) {
            return null;
        }
        Node next;
        do {
            next = elm.next();
            if (next == null || next.value.equals(until)) {
                return elm;
            } else {
                elm = next;
            }
        } while (elm != null);
        return next;
    }

    private Node lookupNode(long key) {
        Node n = root;
        if (n == null) {
            return null;
        }
        while (n != null) {
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

    public State lookup(long key) {
        Node n = lookupNode(key);
        if (n == null) {
            return null;
        } else {
            return n.value;
        }
    }

    private void rotateLeft(Node n) {
        Node r = n.right;
        replaceNode(n, r);
        n.right = r.left;
        if (r.left != null) {
            r.left.parent = n;
        }
        r.left = n;
        n.parent = r;
    }

    private void rotateRight(Node n) {
        Node l = n.left;
        replaceNode(n, l);
        n.left = l.right;
        if (l.right != null) {
            l.right.parent = n;
        }
        l.right = n;
        n.parent = l;
    }

    private void replaceNode(Node oldn, Node newn) {
        if (oldn.parent == null) {
            root = newn;
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

    public void insert(long key, State value) {
        Node insertedNode = new Node(key, value, Color.RED, null, null);
        if (root == null) {
            size++;
            root = insertedNode;
        } else {
            Node n = root;
            while (true) {
                if (key == n.key) {
                    n.value = value;
                    //nop size
                    return;
                } else if (key < n.key) {
                    if (n.left == null) {
                        n.left = insertedNode;
                        size++;
                        break;
                    } else {
                        n = n.left;
                    }
                } else {
                    if (n.right == null) {
                        n.right = insertedNode;
                        size++;
                        break;
                    } else {
                        n = n.right;
                    }
                }
            }
            insertedNode.parent = n;
        }
        insertCase1(insertedNode);
    }

    private void insertCase1(Node n) {
        if (n.parent == null) {
            n.color = Color.BLACK;
        } else {
            insertCase2(n);
        }
    }

    private void insertCase2(Node n) {
        if (nodeColor(n.parent) == Color.BLACK) {
            return;
        } else {
            insertCase3(n);
        }
    }

    private void insertCase3(Node n) {
        if (nodeColor(n.uncle()) == Color.RED) {
            n.parent.color = Color.BLACK;
            n.uncle().color = Color.BLACK;
            n.grandparent().color = Color.RED;
            insertCase1(n.grandparent());
        } else {
            insertCase4(n);
        }
    }

    private void insertCase4(Node n_n) {
        Node n = n_n;
        if (n == n.parent.right && n.parent == n.grandparent().left) {
            rotateLeft(n.parent);
            n = n.left;
        } else {
            if (n == n.parent.left && n.parent == n.grandparent().right) {
                rotateRight(n.parent);
                n = n.right;
            }
        }
        insertCase5(n);
    }

    private void insertCase5(Node n) {
        n.parent.color = Color.BLACK;
        n.grandparent().color = Color.RED;
        if (n == n.parent.left && n.parent == n.grandparent().left) {
            rotateRight(n.grandparent());
        } else {
            rotateLeft(n.grandparent());
        }
    }

    public void delete(long key) {
        Node n = lookupNode(key);
        if (n == null) {
            return;
        } else {
            size--;
            if (n.left != null && n.right != null) {
                // Copy domainKey/value from predecessor and then delete it instead
                Node pred = n.left;
                while (pred.right != null) {
                    pred = pred.right;
                }
                n.key = pred.key;
                n.value = pred.value;
                n = pred;
            }
            Node child;
            if (n.right == null) {
                child = n.left;
            } else {
                child = n.right;
            }
            if (nodeColor(n) == Color.BLACK) {
                n.color = nodeColor(child);
                deleteCase1(n);
            }
            replaceNode(n, child);
        }
    }

    private void deleteCase1(Node n) {
        if (n.parent == null) {
            return;
        } else {
            deleteCase2(n);
        }
    }

    private void deleteCase2(Node n) {
        if (nodeColor(n.sibling()) == Color.RED) {
            n.parent.color = Color.RED;
            n.sibling().color = Color.BLACK;
            if (n == n.parent.left) {
                rotateLeft(n.parent);
            } else {
                rotateRight(n.parent);
            }
        }
        deleteCase3(n);
    }

    private void deleteCase3(Node n) {
        if (nodeColor(n.parent) == Color.BLACK && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling().left) == Color.BLACK && nodeColor(n.sibling().right) == Color.BLACK) {
            n.sibling().color = Color.RED;
            deleteCase1(n.parent);
        } else {
            deleteCase4(n);
        }
    }

    private void deleteCase4(Node n) {
        if (nodeColor(n.parent) == Color.RED && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling().left) == Color.BLACK && nodeColor(n.sibling().right) == Color.BLACK) {
            n.sibling().color = Color.RED;
            n.parent.color = Color.BLACK;
        } else {
            deleteCase5(n);
        }
    }

    private void deleteCase5(Node n) {
        if (n == n.parent.left && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling().left) == Color.RED && nodeColor(n.sibling().right) == Color.BLACK) {
            n.sibling().color = Color.RED;
            n.sibling().left.color = Color.BLACK;
            rotateRight(n.sibling());
        } else if (n == n.parent.right && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling().right) == Color.RED && nodeColor(n.sibling().left) == Color.BLACK) {
            n.sibling().color = Color.RED;
            n.sibling().right.color = Color.BLACK;
            rotateLeft(n.sibling());
        }
        deleteCase6(n);
    }

    private void deleteCase6(Node n) {
        n.sibling().color = nodeColor(n.parent);
        n.parent.color = Color.BLACK;
        if (n == n.parent.left) {
            n.sibling().right.color = Color.BLACK;
            rotateLeft(n.parent);
        } else {
            n.sibling().left.color = Color.BLACK;
            rotateRight(n.parent);
        }
    }

    private Color nodeColor(Node n) {
        if (n == null) {
            return Color.BLACK;
        } else {
            return n.color;
        }
    }

}
