package org.kevoree.modeling.api.rbtree;

import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.meta.MetaModel;

/**
 * Created by duke on 10/7/14.
 */
public class IndexRBTree implements KCacheObject {

    private TreeNode root = null;

    private int _size = 0;

    private boolean _dirty = false;

    private static final int LOOKUP_CACHE_SIZE = 3;

    public int size() {
        return _size;
    }

    private Long[] _previousOrEqualsCacheKeys = null;
    private TreeNode[] _previousOrEqualsCacheValues = null;
    private int _nextCacheElem;

    /* Cache management */
    private TreeNode tryPreviousOrEqualsCache(long key) {
        if (_previousOrEqualsCacheKeys != null && _previousOrEqualsCacheValues != null) {
            for (int i = 0; i < LOOKUP_CACHE_SIZE; i++) {
                if (_previousOrEqualsCacheKeys[i] != null && key == _previousOrEqualsCacheKeys[i]) {
                    return _previousOrEqualsCacheValues[i];
                }
            }
            return null;
        } else {
            return null;
        }
    }

    private void resetCache() {
        _previousOrEqualsCacheKeys = null;
        _previousOrEqualsCacheValues = null;
        _nextCacheElem = 0;
    }

    private synchronized void putInPreviousOrEqualsCache(long key, TreeNode resolved) {
        if (_previousOrEqualsCacheKeys == null || _previousOrEqualsCacheValues == null) {
            _previousOrEqualsCacheKeys = new Long[LOOKUP_CACHE_SIZE];
            _previousOrEqualsCacheValues = new TreeNode[LOOKUP_CACHE_SIZE];
            _nextCacheElem = 0;
        } else if (_nextCacheElem == LOOKUP_CACHE_SIZE) {
            _nextCacheElem = 0;
        }
        _previousOrEqualsCacheKeys[_nextCacheElem] = key;
        _previousOrEqualsCacheValues[_nextCacheElem] = resolved;
        _nextCacheElem++;
    }

    @Override
    public boolean isDirty() {
        return this._dirty;
    }

    @Override
    public void setClean() {
        this._dirty = false;
    }

    public String serialize() {
        StringBuilder builder = new StringBuilder();
        builder.append(_size);
        if (root != null) {
            root.serialize(builder);
        }
        return builder.toString();
    }

    @Override
    public String toString() {
        return serialize();
    }

    @Override
    public void unserialize(KContentKey key, String payload, MetaModel metaModel) throws Exception {
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
        TreeReaderContext ctx = new TreeReaderContext();
        ctx.index = i;
        ctx.payload = payload;
        root = TreeNode.unserialize(ctx);
        resetCache();
    }

    public TreeNode previousOrEqual(long key) {
        TreeNode cachedVal = tryPreviousOrEqualsCache(key);
        if (cachedVal != null) {
            return cachedVal;
        }
        TreeNode p = root;
        if (p == null) {
            return null;
        }
        while (p != null) {
            if (key == p.key) {
                putInPreviousOrEqualsCache(key, p);
                return p;
            }
            if (key > p.key) {
                if (p.getRight() != null) {
                    p = p.getRight();
                } else {
                    putInPreviousOrEqualsCache(key, p);
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
                    putInPreviousOrEqualsCache(key, parent);
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

    public synchronized void insert(long key) {
        resetCache();
        this._dirty = true;
        TreeNode insertedNode = new TreeNode(key, Color.RED, null, null);
        if (root == null) {
            _size++;
            root = insertedNode;
        } else {
            TreeNode n = root;
            while (true) {
                if (key == n.key) {
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
