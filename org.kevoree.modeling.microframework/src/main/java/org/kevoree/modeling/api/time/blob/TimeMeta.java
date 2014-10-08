package org.kevoree.modeling.api.time.blob;

import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.time.TimeWalker;
import org.kevoree.modeling.api.time.rbtree.Node;
import org.kevoree.modeling.api.time.rbtree.RBTree;

/**
 * Created by duke on 6/4/14.
 */

/*
 *  key : path
  * */

public class TimeMeta implements TimeTree {

    public static final short GO_DOWN_LEFT = 0;
    public static final short GO_DOWN_RIGHT = 1;
    public static final short PROCESS_PREFIX = 2;
    public static final short PROCESS_INFIX = 3;
    public static final short PROCESS_POSTFIX = 4;

    boolean dirty = true;

    RBTree versionTree = new RBTree();

    @Override
    public void walk(TimeWalker walker) {
        walkAsc(walker);
    }

    @Override
    public void walkAsc(TimeWalker walker) {
        Node elem = versionTree.first();
        while (elem != null) {
            walker.walk(elem.getKey());
            elem = elem.next();
        }
    }

    @Override
    public void walkDesc(TimeWalker walker) {
        Node elem = versionTree.last();
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
        Node elem = versionTree.previousOrEqual(from2);
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
        Node elem = versionTree.previousOrEqual(to2);
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
    public long first() {
        Node firstNode = versionTree.first();
        if (firstNode != null) {
            return firstNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public long last() {
        Node lastNode = versionTree.last();
        if (lastNode != null) {
            return lastNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public long next(long from) {
        Node nextNode = versionTree.next(from);
        if (nextNode != null) {
            return nextNode.getKey();
        } else {
            return null;
        }
    }

    @Override
    public long previous(long from) {
        Node previousNode = versionTree.previous(from);
        if (previousNode != null) {
            return previousNode.getKey();
        } else {
            return null;
        }
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