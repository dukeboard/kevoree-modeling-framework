package org.kevoree.modeling.api.rbtree;

import org.kevoree.modeling.api.KConfig;

public class FlatIndexRBTree {

    private long[] _back = null;
    private long _root_index = -1;
    private int _size = 0;
    private int _threshold;
    private float loadFactor;

    public FlatIndexRBTree() {
        _back = new long[_size * SIZE_NODE];
        loadFactor = KConfig.CACHE_LOAD_FACTOR;
        _threshold = (int) (_size * loadFactor);
    }

    public int size() {
        return _size;
    }

    private static final int SIZE_NODE = 5;

    private long left(long currentIndex) {
        if (currentIndex == -1) {
            return -1;
        }
        return _back[(int) currentIndex];
    }

    private void setLeft(long currentIndex, long paramIndex) {
        _back[(int) currentIndex] = paramIndex;
    }

    private long right(long currentIndex) {
        if (currentIndex == -1) {
            return -1;
        }
        return _back[(int) currentIndex + 1];
    }

    private void setRight(long currentIndex, long paramIndex) {
        _back[(int) currentIndex + 1] = paramIndex;
    }

    private long parent(long currentIndex) {
        if (currentIndex == -1) {
            return -1;
        }
        return _back[(int) currentIndex + 2];
    }

    private void setParent(long currentIndex, long paramIndex) {
        _back[(int) currentIndex + 2] = paramIndex;
    }

    private long key(long currentIndex) {
        if (currentIndex == -1) {
            return -1;
        }
        return _back[(int) currentIndex + 3];
    }

    private void setKey(long currentIndex, long paramIndex) {
        _back[(int) currentIndex + 3] = paramIndex;
    }

    private long color(long currentIndex) {
        if (currentIndex == -1) {
            return -1;
        }
        return _back[(int) currentIndex + 4];
    }

    private void setColor(long currentIndex, long paramIndex) {
        _back[(int) currentIndex + 4] = paramIndex;
    }

    public long grandParent(long currentIndex) {
        if (currentIndex == -1) {
            return -1;
        }
        if (parent(currentIndex) != -1) {
            return parent(parent(currentIndex));
        } else {
            return -1;
        }
    }

    public long sibling(long currentIndex) {
        if (parent(currentIndex) == -1) {
            return -1;
        } else {
            if (currentIndex == left(parent(currentIndex))) {
                return right(parent(currentIndex));
            } else {
                return left(parent(currentIndex));
            }
        }
    }

    public long uncle(long currentIndex) {
        if (parent(currentIndex) != -1) {
            return sibling(parent(currentIndex));
        } else {
            return -1;
        }
    }


    /*
    public synchronized Long previousOrEqual(long key) {
        long p = _root_index;
        if (p == -1) {
            return null;
        }
        while (p != -1) {
            if (key == key(p)) {
                return p;
            }
            if (key > key(p)) {
                if (right(p) != -1) {
                    p = right(p);
                } else {
                    return p;
                }
            } else {
                if (left(p) != -1) {
                    p = left(p);
                } else {
                    long parent = parent(p);
                    long ch = p;
                    while (parent != -1 && ch == left(parent)) {
                        ch = parent;
                        parent = parent(parent);
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
    }*/

    /* Time never use direct lookup, sadly for performance, anyway this method is private to ensure the correctness of caching mechanism */
    public Long lookup(long key) {
        long n = _root_index;
        if (n == -1) {
            return null;
        }
        while (n != -1) {
            if (key == key(n)) {
                return key(n);
            } else {
                if (key < key(n)) {
                    n = left(n);
                } else {
                    n = right(n);
                }
            }
        }
        return n;
    }

    private void rotateLeft(long n) {
        long r = right(n);
        replaceNode(n, r);
        setRight(n, left(r));
        if (left(r) != -1) {
            setParent(left(r), n);
        }
        setLeft(r, n);
        setParent(n, r);
    }

    private void rotateRight(long n) {
        long l = left(n);
        replaceNode(n, l);
        setLeft(n, right(l));
        if (right(l) != -1) {
            setParent(right(l), n);
        }
        setRight(l, n);
        setParent(n, l);
    }

    private void replaceNode(long oldn, long newn) {
        if (parent(oldn) == -1) {
            _root_index = newn;
        } else {
            if (oldn == left(parent(oldn))) {
                setLeft(parent(oldn), newn);
            } else {
                setRight(parent(oldn), newn);
            }
        }
        if (newn != -1) {
            setParent(newn, parent(oldn));
        }
    }

    public synchronized void insert(long key) {

        if ((_size + 1) > _threshold) {
            int length = (_size == 0 ? 1 : _size << 1);
            long[] new_back = new long[length * SIZE_NODE];
            System.arraycopy(_back, 0, new_back, 0, _size * SIZE_NODE);
            _threshold = (int) (_size * loadFactor);
            _back = new_back;
        }

        long insertedNode = (_size) * SIZE_NODE;
        if (_size == 0) {
            _size = 1;
            setKey(insertedNode, key);
            setColor(insertedNode, 0);
            setLeft(insertedNode, -1);
            setRight(insertedNode, -1);
            setParent(insertedNode, -1);

            _root_index = insertedNode;
        } else {
            long n = _root_index;
            while (true) {
                if (key == key(n)) {
                    //nop _size
                    return;
                } else if (key < key(n)) {
                    if (left(n) == -1) {

                        setKey(insertedNode, key);
                        setColor(insertedNode, 0);
                        setLeft(insertedNode, -1);
                        setRight(insertedNode, -1);
                        setParent(insertedNode, -1);

                        setLeft(n, insertedNode);

                        _size++;
                        break;
                    } else {
                        n = left(n);
                    }
                } else {
                    if (right(n) == -1) {

                        setKey(insertedNode, key);
                        setColor(insertedNode, 0);
                        setLeft(insertedNode, -1);
                        setRight(insertedNode, -1);
                        setParent(insertedNode, -1);

                        setRight(n, insertedNode);

                        _size++;
                        break;
                    } else {
                        n = right(n);
                    }
                }
            }

            setParent(insertedNode, n);
        }
        insertCase1(insertedNode);
    }

    private void insertCase1(long n) {
        if (parent(n) == -1) {
            setColor(n, 1);
        } else {
            insertCase2(n);
        }
    }

    private void insertCase2(long n) {
        if (nodeColor(parent(n)) == true) {
            return;
        } else {
            insertCase3(n);
        }
    }

    private void insertCase3(long n) {
        if (nodeColor(uncle(n)) == false) {
            setColor(parent(n), 1);
            setColor(uncle(n), 1);
            setColor(grandParent(n), 0);
            insertCase1(grandParent(n));
        } else {
            insertCase4(n);
        }
    }

    private void insertCase4(long n_n) {
        long n = n_n;
        if (n == right(parent(n)) && parent(n) == left(grandParent(n))) {
            rotateLeft(parent(n));
            n = left(n);
        } else {
            if (n == left(parent(n)) && parent(n) == right(grandParent(n))) {
                rotateRight(parent(n));
                n = right(n);
            }
        }
        insertCase5(n);
    }

    private void insertCase5(long n) {
        setColor(parent(n), 1);
        setColor(grandParent(n), 0);
        if (n == left(parent(n)) && parent(n) == left(grandParent(n))) {
            rotateRight(grandParent(n));
        } else {
            rotateLeft(grandParent(n));
        }
    }

    /*
    public void delete(long key) {
        TreeNode n = lookup(key);
        if (n == null) {
            return;
        } else {
            _size--;
            if (n.getLeft() != null && n.getRight() != null) {
                // Copy domainKey/value from predecessor and done delete it instead
                TreeNode pred = n.getLeft();
                while (pred.getRight() != null) {
                    pred = pred.getRight();
                }
                n.key = pred.key;
                n = pred;
            }
            TreeNode child;
            if (n.getRight() == null) {
                child = n.getLeft();
            } else {
                child = n.getRight();
            }
            if (nodeColor(n) == true) {
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
        if (nodeColor(n.sibling()) == false) {
            n.getParent().color = false;
            n.sibling().color = true;
            if (n == n.getParent().getLeft()) {
                rotateLeft(n.getParent());
            } else {
                rotateRight(n.getParent());
            }
        }
        deleteCase3(n);
    }

    private void deleteCase3(TreeNode n) {
        if (nodeColor(n.getParent()) == true && nodeColor(n.sibling()) == true && nodeColor(n.sibling().getLeft()) == true && nodeColor(n.sibling().getRight()) == true) {
            n.sibling().color = false;
            deleteCase1(n.getParent());
        } else {
            deleteCase4(n);
        }
    }

    private void deleteCase4(TreeNode n) {
        if (nodeColor(n.getParent()) == false && nodeColor(n.sibling()) == true && nodeColor(n.sibling().getLeft()) == true && nodeColor(n.sibling().getRight()) == true) {
            n.sibling().color = false;
            n.getParent().color = true;
        } else {
            deleteCase5(n);
        }
    }

    private void deleteCase5(TreeNode n) {
        if (n == n.getParent().getLeft() && nodeColor(n.sibling()) == true && nodeColor(n.sibling().getLeft()) == false && nodeColor(n.sibling().getRight()) == true) {
            n.sibling().color = false;
            n.sibling().getLeft().color = true;
            rotateRight(n.sibling());
        } else if (n == n.getParent().getRight() && nodeColor(n.sibling()) == true && nodeColor(n.sibling().getRight()) == false && nodeColor(n.sibling().getLeft()) == true) {
            n.sibling().color = false;
            n.sibling().getRight().color = true;
            rotateLeft(n.sibling());
        }
        deleteCase6(n);
    }

    private void deleteCase6(TreeNode n) {
        n.sibling().color = nodeColor(n.getParent());
        n.getParent().color = true;
        if (n == n.getParent().getLeft()) {
            n.sibling().getRight().color = true;
            rotateLeft(n.getParent());
        } else {
            n.sibling().getLeft().color = true;
            rotateRight(n.getParent());
        }
    }*/


    private boolean nodeColor(long n) {
        if (n == -1) {
            return true;
        } else {
            return color(n) == 1;
        }
    }

    public String serialize() {
        StringBuilder builder = new StringBuilder();
        builder.append(_size);
        if (_root_index != -1) {
            node_serialize(builder, _root_index);
        }
        return builder.toString();
    }

    public void node_serialize(StringBuilder builder, long current) {
        builder.append("|");
        if (nodeColor(current) == true) {
            builder.append(TreeNode.BLACK);
        } else {
            builder.append(TreeNode.RED);
        }
        builder.append(key(current));
        if (left(current) == -1 && right(current) == -1) {
            builder.append("%");
        } else {
            if (left(current) != -1) {
                node_serialize(builder, left(current));
            } else {
                builder.append("#");
            }
            if (right(current) != -1) {
                node_serialize(builder, right(current));
            } else {
                builder.append("#");
            }
        }
    }

}
