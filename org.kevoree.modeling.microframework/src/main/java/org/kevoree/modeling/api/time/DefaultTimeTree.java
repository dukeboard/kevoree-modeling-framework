package org.kevoree.modeling.api.time;

import org.kevoree.modeling.api.time.rbtree.TreeNode;
import org.kevoree.modeling.api.time.rbtree.RBTree;
import org.kevoree.modeling.api.time.rbtree.State;

/**
 * Created by duke on 6/4/14.
 */

/*
 *  domainKey : path
  * */

public class DefaultTimeTree implements TimeTree {

    boolean dirty = true;

    RBTree versionTree = new RBTree();

    @Override
    public void walk(TimeWalker walker) {
        walkAsc(walker);
    }

    @Override
    public void walkAsc(TimeWalker walker) {
        TreeNode elem = versionTree.first();
        while (elem != null) {
            walker.walk(elem.getKey());
            elem = elem.next();
        }
    }

    @Override
    public void walkDesc(TimeWalker walker) {
        TreeNode elem = versionTree.last();
        while (elem != null) {
            walker.walk(elem.getKey());
            elem = elem.previous();
        }
    }

    @Override
    public void walkRangeAsc(TimeWalker walker, long from, long to) {
        long from2 = from;
        long to2 = to;
        if (from > to) {
            from2 = to;
            to2 = from;
        }
        TreeNode elem = versionTree.previousOrEqual(from2);
        while (elem != null) {
            walker.walk(elem.getKey());
            elem = elem.next();
            if (elem != null) {
                if (elem.getKey() >= to2) {
                    return;
                }
            }

        }
    }

    @Override
    public void walkRangeDesc(TimeWalker walker, long from, long to) {
        long from2 = from;
        long to2 = to;
        if (from > to) {
            from2 = to;
            to2 = from;
        }
        TreeNode elem = versionTree.previousOrEqual(to2);
        while (elem != null) {
            walker.walk(elem.getKey());
            elem = elem.previous();
            if (elem != null) {
                if (elem.getKey() <= from2) {
                    walker.walk(elem.getKey());
                    return;
                }
            }
        }
    }

    @Override
    public Long first() {
        TreeNode firstNode = versionTree.first();
        if (firstNode != null) {
            return firstNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public Long last() {
        TreeNode lastNode = versionTree.last();
        if (lastNode != null) {
            return lastNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public Long next(long from) {
        TreeNode nextNode = versionTree.next(from);
        if (nextNode != null) {
            return nextNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public Long previous(long from) {
        TreeNode previousNode = versionTree.previous(from);
        if (previousNode != null) {
            return previousNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public Long resolve(long time) {
        TreeNode previousNode = versionTree.previousOrEqual(time);
        if (previousNode != null) {
            return previousNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public TimeTree insert(long time) {
        versionTree.insert(time, State.EXISTS);
        dirty = true;
        return this;
    }

    @Override
    public TimeTree delete(long time) {
        versionTree.insert(time, State.DELETED);
        dirty = true;
        return this;
    }

    @Override
    public boolean isDirty() {
        return dirty;
    }

    @Override
    public int size() {
        return versionTree.size();
    }

    public void setDirty(boolean state) {
        dirty = state;
    }

    @Override
    public String toString() {
        return versionTree.serialize();
    }

    public void load(String payload) throws Exception {
        versionTree.unserialize(payload);
        dirty = false;
    }

}
