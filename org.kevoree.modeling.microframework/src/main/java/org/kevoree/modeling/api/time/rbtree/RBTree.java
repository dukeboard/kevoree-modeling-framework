package org.kevoree.modeling.api.time.rbtree;

/**
 * Created by duke on 10/7/14.
 */
public class RBTree {

    public TreeNode root = null;

    private int _size = 0;

    public int size() {
        return _size;
    }

    public String serialize() {
        StringBuilder builder = new StringBuilder();
        builder.append(_size);
        if (root != null) {
            root.serialize(builder);
        }
        return builder.toString();
    }

    /*
     fun serializeBinary() : ByteBuffer {
         var bb = ByteBuffer.allocate(_size*13)
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
        _size = Integer.parseInt(buffer.toString());
        root = new ReaderContext(i, payload).unserialize(true);
    }

    public TreeNode previousOrEqual(long key) {
        TreeNode p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
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
                    TreeNode parent = p.getParent();
                    TreeNode ch = p;
                    while (parent != null && ch == parent.getLeft()) {
                        ch = parent;
                        parent = parent.getParent();
                    }
                    return parent;
                }
            }
        }
        return null;
    }

    public TreeNode nextOrEqual(long key) {
        TreeNode p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
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
                    TreeNode parent = p.getParent();
                    TreeNode ch = p;
                    while (parent != null && ch == parent.getRight()) {
                        ch = parent;
                        parent = parent.getParent();
                    }
                    return parent;
                }
            }
        }
        return null;
    }

    public TreeNode previous(long key) {
        TreeNode p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
            if (key < p.key) {
                if (p.getLeft() != null) {
                    p = p.getLeft();
                } else {
                    return p.previous();
                }
            } else if (key > p.key) {
                if (p.getRight() != null) {
                    p = p.getRight();
                } else {
                    return p;
                }
            } else {
                return p.previous();
            }
        }
        return null;
    }


    public TreeNode previousWhileNot(long key, State until) {
        TreeNode elm = previousOrEqual(key);
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

    public TreeNode next(long key) {
        TreeNode p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
            if (key < p.key) {
                if (p.getLeft() != null) {
                    p = p.getLeft();
                } else {
                    return p;
                }
            } else if (key > p.key) {
                if (p.getRight() != null) {
                    p = p.getRight();
                } else {
                    return p.next();
                }
            } else {
                return p.next();
            }
        }
        return null;
    }

    public TreeNode nextWhileNot(long key, State until) {
        TreeNode elm = nextOrEqual(key);
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

    public TreeNode first() {
        TreeNode p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
            if (p.getLeft() != null) {
                p = p.getLeft();
            } else {
                return p;
            }
        }
        return null;
    }

    public TreeNode last() {
        TreeNode p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
            if (p.getRight() != null) {
                p = p.getRight();
            } else {
                return p;
            }
        }
        return null;
    }

    public TreeNode firstWhileNot(long key, State until) {
        TreeNode elm = previousOrEqual(key);
        if (elm == null) {
            return null;
        } else if (elm.value.equals(until)) {
            return null;
        }
        TreeNode prev = null;
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

    public TreeNode lastWhileNot(long key, State until) {
        TreeNode elm = previousOrEqual(key);
        if (elm == null) {
            return null;
        } else if (elm.value.equals(until)) {
            return null;
        }
        TreeNode next;
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

    private TreeNode lookupNode(long key) {
        TreeNode n = root;
        if (n == null) {
            return null;
        }
        while (n != null) {
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

    public State lookup(long key) {
        TreeNode n = lookupNode(key);
        if (n == null) {
            return null;
        } else {
            return n.value;
        }
    }

    private void rotateLeft(TreeNode n) {
        TreeNode r = n.getRight();
        replaceNode(n, r);
        n.setRight(r.getLeft());
        if (r.getLeft() != null) {
            r.getLeft().setParent(n);
        }
        r.setLeft(n);
        n.setParent(r);
    }

    private void rotateRight(TreeNode n) {
        TreeNode l = n.getLeft();
        replaceNode(n, l);
        n.setLeft(l.getRight());
        if (l.getRight() != null) {
            l.getRight().setParent(n);
        }
        l.setRight(n);
        ;
        n.setParent(l);
    }

    private void replaceNode(TreeNode oldn, TreeNode newn) {
        if (oldn.getParent() == null) {
            root = newn;
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

    public void insert(long key, State value) {
        TreeNode insertedNode = new TreeNode(key, value, Color.RED, null, null);
        if (root == null) {
            _size++;
            root = insertedNode;
        } else {
            TreeNode n = root;
            while (true) {
                if (key == n.key) {
                    n.value = value;
                    //nop _size
                    return;
                } else if (key < n.key) {
                    if (n.getLeft() == null) {
                        n.setLeft(insertedNode);
                        _size++;
                        break;
                    } else {
                        n = n.getLeft();
                    }
                } else {
                    if (n.getRight() == null) {
                        n.setRight(insertedNode);
                        _size++;
                        break;
                    } else {
                        n = n.getRight();
                    }
                }
            }
            insertedNode.setParent(n);
        }
        insertCase1(insertedNode);
    }

    private void insertCase1(TreeNode n) {
        if (n.getParent() == null) {
            n.color = Color.BLACK;
        } else {
            insertCase2(n);
        }
    }

    private void insertCase2(TreeNode n) {
        if (nodeColor(n.getParent()) == Color.BLACK) {
            return;
        } else {
            insertCase3(n);
        }
    }

    private void insertCase3(TreeNode n) {
        if (nodeColor(n.uncle()) == Color.RED) {
            n.getParent().color = Color.BLACK;
            n.uncle().color = Color.BLACK;
            n.grandparent().color = Color.RED;
            insertCase1(n.grandparent());
        } else {
            insertCase4(n);
        }
    }

    private void insertCase4(TreeNode n_n) {
        TreeNode n = n_n;
        if (n == n.getParent().getRight() && n.getParent() == n.grandparent().getLeft()) {
            rotateLeft(n.getParent());
            n = n.getLeft();
        } else {
            if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getRight()) {
                rotateRight(n.getParent());
                n = n.getRight();
            }
        }
        insertCase5(n);
    }

    private void insertCase5(TreeNode n) {
        n.getParent().color = Color.BLACK;
        n.grandparent().color = Color.RED;
        if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
            rotateRight(n.grandparent());
        } else {
            rotateLeft(n.grandparent());
        }
    }

    public void delete(long key) {
        TreeNode n = lookupNode(key);
        if (n == null) {
            return;
        } else {
            _size--;
            if (n.getLeft() != null && n.getRight() != null) {
                // Copy domainKey/value from predecessor and then delete it instead
                TreeNode pred = n.getLeft();
                while (pred.getRight() != null) {
                    pred = pred.getRight();
                }
                n.key = pred.key;
                n.value = pred.value;
                n = pred;
            }
            TreeNode child;
            if (n.getRight() == null) {
                child = n.getLeft();
            } else {
                child = n.getRight();
            }
            if (nodeColor(n) == Color.BLACK) {
                n.color = nodeColor(child);
                deleteCase1(n);
            }
            replaceNode(n, child);
        }
    }

    private void deleteCase1(TreeNode n) {
        if (n.getParent() == null) {
            return;
        } else {
            deleteCase2(n);
        }
    }

    private void deleteCase2(TreeNode n) {
        if (nodeColor(n.sibling()) == Color.RED) {
            n.getParent().color = Color.RED;
            n.sibling().color = Color.BLACK;
            if (n == n.getParent().getLeft()) {
                rotateLeft(n.getParent());
            } else {
                rotateRight(n.getParent());
            }
        }
        deleteCase3(n);
    }

    private void deleteCase3(TreeNode n) {
        if (nodeColor(n.getParent()) == Color.BLACK && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling().getLeft()) == Color.BLACK && nodeColor(n.sibling().getRight()) == Color.BLACK) {
            n.sibling().color = Color.RED;
            deleteCase1(n.getParent());
        } else {
            deleteCase4(n);
        }
    }

    private void deleteCase4(TreeNode n) {
        if (nodeColor(n.getParent()) == Color.RED && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling().getLeft()) == Color.BLACK && nodeColor(n.sibling().getRight()) == Color.BLACK) {
            n.sibling().color = Color.RED;
            n.getParent().color = Color.BLACK;
        } else {
            deleteCase5(n);
        }
    }

    private void deleteCase5(TreeNode n) {
        if (n == n.getParent().getLeft() && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling().getLeft()) == Color.RED && nodeColor(n.sibling().getRight()) == Color.BLACK) {
            n.sibling().color = Color.RED;
            n.sibling().getLeft().color = Color.BLACK;
            rotateRight(n.sibling());
        } else if (n == n.getParent().getRight() && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling().getRight()) == Color.RED && nodeColor(n.sibling().getLeft()) == Color.BLACK) {
            n.sibling().color = Color.RED;
            n.sibling().getRight().color = Color.BLACK;
            rotateLeft(n.sibling());
        }
        deleteCase6(n);
    }

    private void deleteCase6(TreeNode n) {
        n.sibling().color = nodeColor(n.getParent());
        n.getParent().color = Color.BLACK;
        if (n == n.getParent().getLeft()) {
            n.sibling().getRight().color = Color.BLACK;
            rotateLeft(n.getParent());
        } else {
            n.sibling().getLeft().color = Color.BLACK;
            rotateRight(n.getParent());
        }
    }

    private Color nodeColor(TreeNode n) {
        if (n == null) {
            return Color.BLACK;
        } else {
            return n.color;
        }
    }

}
