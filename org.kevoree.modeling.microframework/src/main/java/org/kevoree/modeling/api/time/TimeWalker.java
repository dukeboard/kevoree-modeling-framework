package org.kevoree.modeling.api.time;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.time.rbtree.IndexRBTree;
import org.kevoree.modeling.api.time.rbtree.TreeNode;

/**
 * Created by gregory.nain on 30/07/2014.
 */
public class TimeWalker {

    private IndexRBTree versionTree;

    public void walk(Callback<Long> walker) {
        walkAsc(walker);
    }

    public void walkAsc(Callback<Long> walker) {
        TreeNode elem = versionTree.first();
        while (elem != null) {
            walker.on(elem.getKey());
            elem = elem.next();
        }
    }

    public void walkDesc(Callback<Long> walker) {
        TreeNode elem = versionTree.last();
        while (elem != null) {
            walker.on(elem.getKey());
            elem = elem.previous();
        }
    }

    public void walkRangeAsc(Callback<Long> walker, long from, long to) {
        long from2 = from;
        long to2 = to;
        if (from > to) {
            from2 = to;
            to2 = from;
        }
        TreeNode elem = versionTree.previousOrEqual(from2);
        while (elem != null) {
            walker.on(elem.getKey());
            elem = elem.next();
            if (elem != null) {
                if (elem.getKey() >= to2) {
                    return;
                }
            }
        }
    }

    public void walkRangeDesc(Callback<Long> walker, long from, long to) {
        long from2 = from;
        long to2 = to;
        if (from > to) {
            from2 = to;
            to2 = from;
        }
        TreeNode elem = versionTree.previousOrEqual(to2);
        while (elem != null) {
            walker.on(elem.getKey());
            elem = elem.previous();
            if (elem != null) {
                if (elem.getKey() <= from2) {
                    walker.on(elem.getKey());
                    return;
                }
            }
        }
    }

    // public void walk(long timePoint);
}