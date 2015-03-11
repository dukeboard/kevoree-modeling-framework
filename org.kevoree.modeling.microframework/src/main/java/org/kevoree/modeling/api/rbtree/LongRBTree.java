package org.kevoree.modeling.api.rbtree;

import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.meta.MetaModel;

/**
 * Created by duke on 10/7/14.
 */
public class LongRBTree implements KCacheObject {

    private LongTreeNode root = null;

    private int _size = 0;

    public int size() {
        return _size;
    }

    public boolean _dirty = false;

    @Override
    public String toString() {
        return serialize();
    }

    @Override
    public boolean isDirty() {
        return _dirty;
    }

    public String serialize() {
        StringBuilder builder = new StringBuilder();
        builder.append(_size);
        if (root != null) {
            root.serialize(builder);
        }
        return builder.toString();
    }

    private Long[] _previousOrEqualsCacheKeys = null;
    private LongTreeNode[] _previousOrEqualsCacheValues = null;
    private int _nextCacheElem;

    private Long[] _lookupCacheKeys = null;
    private LongTreeNode[] _lookupCacheValues = null;
    private int _lookupCacheElem;

    /* Cache management */
    private synchronized LongTreeNode tryPreviousOrEqualsCache(long key) {
        if (_previousOrEqualsCacheKeys != null && _previousOrEqualsCacheValues != null) {
            for (int i = 0; i < KConfig.TREE_CACHE_SIZE; i++) {
                if (_previousOrEqualsCacheKeys[i] != null && key == _previousOrEqualsCacheKeys[i]) {
                    return _previousOrEqualsCacheValues[i];
                }
            }
        }
        return null;
    }

    private synchronized LongTreeNode tryLookupCache(long key) {
        if (_lookupCacheKeys != null && _lookupCacheValues != null) {
            for (int i = 0; i < KConfig.TREE_CACHE_SIZE; i++) {
                if (_lookupCacheKeys[i] != null && key == _lookupCacheKeys[i]) {
                    return _lookupCacheValues[i];
                }
            }
        }
        return null;
    }

    private void resetCache() {
        _previousOrEqualsCacheKeys = null;
        _previousOrEqualsCacheValues = null;
        _lookupCacheKeys = null;
        _lookupCacheValues = null;
        _nextCacheElem = 0;
        _lookupCacheElem = 0;
    }

    private void putInPreviousOrEqualsCache(long key, LongTreeNode resolved) {
        if (_previousOrEqualsCacheKeys == null || _previousOrEqualsCacheValues == null) {
            _previousOrEqualsCacheKeys = new Long[KConfig.TREE_CACHE_SIZE];
            _previousOrEqualsCacheValues = new LongTreeNode[KConfig.TREE_CACHE_SIZE];
            _nextCacheElem = 0;
        } else if (_nextCacheElem == KConfig.TREE_CACHE_SIZE) {
            _nextCacheElem = 0;
        }
        _previousOrEqualsCacheKeys[_nextCacheElem] = key;
        _previousOrEqualsCacheValues[_nextCacheElem] = resolved;
        _nextCacheElem++;
    }

    private void putInLookupCache(long key, LongTreeNode resolved) {
        if (_lookupCacheKeys == null || _lookupCacheValues == null) {
            _lookupCacheKeys = new Long[KConfig.TREE_CACHE_SIZE];
            _lookupCacheValues = new LongTreeNode[KConfig.TREE_CACHE_SIZE];
            _lookupCacheElem = 0;
        } else if (_lookupCacheElem == KConfig.TREE_CACHE_SIZE) {
            _lookupCacheElem = 0;
        }
        _lookupCacheKeys[_lookupCacheElem] = key;
        _lookupCacheValues[_lookupCacheElem] = resolved;
        _lookupCacheElem++;
    }

    @Override
    public void setClean() {
        this._dirty = false;
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
        ctx.buffer = new char[20];
        root = LongTreeNode.unserialize(ctx);
        _dirty = false;
        resetCache();
    }

    public LongTreeNode lookup(long key) {
        LongTreeNode n = tryLookupCache(key);
        if (n != null) {
            return n;
        }
        n = root;
        if (n == null) {
            return null;
        }
        while (n != null) {
            if (key == n.key) {
                putInLookupCache(key, n);
                return n;
            } else {
                if (key < n.key) {
                    n = n.getLeft();
                } else {
                    n = n.getRight();
                }
            }
        }
        putInLookupCache(key, null);
        return n;
    }

    public LongTreeNode previousOrEqual(long key) {
        LongTreeNode p = tryPreviousOrEqualsCache(key);
        if (p != null) {
            return p;
        }
        p = root;
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
                    LongTreeNode parent = p.getParent();
                    LongTreeNode ch = p;
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

    public LongTreeNode nextOrEqual(long key) {
        LongTreeNode p = root;
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
                    LongTreeNode parent = p.getParent();
                    LongTreeNode ch = p;
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

    public LongTreeNode previous(long key) {
        LongTreeNode p = root;
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

    public LongTreeNode next(long key) {
        LongTreeNode p = root;
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

    public LongTreeNode first() {
        LongTreeNode p = root;
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

    public LongTreeNode last() {
        LongTreeNode p = root;
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

    private void rotateLeft(LongTreeNode n) {
        LongTreeNode r = n.getRight();
        replaceNode(n, r);
        n.setRight(r.getLeft());
        if (r.getLeft() != null) {
            r.getLeft().setParent(n);
        }
        r.setLeft(n);
        n.setParent(r);
    }

    private void rotateRight(LongTreeNode n) {
        LongTreeNode l = n.getLeft();
        replaceNode(n, l);
        n.setLeft(l.getRight());
        if (l.getRight() != null) {
            l.getRight().setParent(n);
        }
        l.setRight(n);
        ;
        n.setParent(l);
    }

    private void replaceNode(LongTreeNode oldn, LongTreeNode newn) {
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

    public synchronized void insert(long key, long value) {
        resetCache();
        _dirty = true;
        LongTreeNode insertedNode = new LongTreeNode(key, value, Color.RED, null, null);
        if (root == null) {
            _size++;
            root = insertedNode;
        } else {
            LongTreeNode n = root;
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

    private void insertCase1(LongTreeNode n) {
        if (n.getParent() == null) {
            n.color = Color.BLACK;
        } else {
            insertCase2(n);
        }
    }

    private void insertCase2(LongTreeNode n) {
        if (nodeColor(n.getParent()) == Color.BLACK) {
            return;
        } else {
            insertCase3(n);
        }
    }

    private void insertCase3(LongTreeNode n) {
        if (nodeColor(n.uncle()) == Color.RED) {
            n.getParent().color = Color.BLACK;
            n.uncle().color = Color.BLACK;
            n.grandparent().color = Color.RED;
            insertCase1(n.grandparent());
        } else {
            insertCase4(n);
        }
    }

    private void insertCase4(LongTreeNode n_n) {
        LongTreeNode n = n_n;
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

    private void insertCase5(LongTreeNode n) {
        n.getParent().color = Color.BLACK;
        n.grandparent().color = Color.RED;
        if (n == n.getParent().getLeft() && n.getParent() == n.grandparent().getLeft()) {
            rotateRight(n.grandparent());
        } else {
            rotateLeft(n.grandparent());
        }
    }

    public void delete(long key) {
        LongTreeNode n = lookup(key);
        if (n == null) {
            return;
        } else {
            _size--;
            if (n.getLeft() != null && n.getRight() != null) {
                // Copy domainKey/value from predecessor and done delete it instead
                LongTreeNode pred = n.getLeft();
                while (pred.getRight() != null) {
                    pred = pred.getRight();
                }
                n.key = pred.key;
                n.value = pred.value;
                n = pred;
            }
            LongTreeNode child;
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

    private void deleteCase1(LongTreeNode n) {
        if (n.getParent() == null) {
            return;
        } else {
            deleteCase2(n);
        }
    }

    private void deleteCase2(LongTreeNode n) {
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

    private void deleteCase3(LongTreeNode n) {
        if (nodeColor(n.getParent()) == Color.BLACK && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling().getLeft()) == Color.BLACK && nodeColor(n.sibling().getRight()) == Color.BLACK) {
            n.sibling().color = Color.RED;
            deleteCase1(n.getParent());
        } else {
            deleteCase4(n);
        }
    }

    private void deleteCase4(LongTreeNode n) {
        if (nodeColor(n.getParent()) == Color.RED && nodeColor(n.sibling()) == Color.BLACK && nodeColor(n.sibling().getLeft()) == Color.BLACK && nodeColor(n.sibling().getRight()) == Color.BLACK) {
            n.sibling().color = Color.RED;
            n.getParent().color = Color.BLACK;
        } else {
            deleteCase5(n);
        }
    }

    private void deleteCase5(LongTreeNode n) {
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

    private void deleteCase6(LongTreeNode n) {
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

    private Color nodeColor(LongTreeNode n) {
        if (n == null) {
            return Color.BLACK;
        } else {
            return n.color;
        }
    }

}
