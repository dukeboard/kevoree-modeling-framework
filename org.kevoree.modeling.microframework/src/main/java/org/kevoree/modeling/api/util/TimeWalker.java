package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KTask;
import org.kevoree.modeling.api.abs.AbstractKTaskWrapper;
import org.kevoree.modeling.api.rbtree.IndexRBTree;
import org.kevoree.modeling.api.rbtree.TreeNode;

/**
 * Created by gregory.nain on 30/07/2014.
 */
public class TimeWalker {

    private KObject _origin = null;

    public TimeWalker(KObject p_origin) {
        this._origin = p_origin;
    }

    public KTask<Throwable> walk(Callback<Long> walker) {
        return walkAsc(walker);
    }

    public KTask<Throwable> walkAsc(Callback<Long> walker) {
        return internal_walk(walker, true, null, null);
    }

    public KTask<Throwable> walkDesc(Callback<Long> walker) {
        return internal_walk(walker, false, null, null);
    }

    private KTask<Throwable> internal_walk(Callback<Long> walker, boolean asc, Long from, Long to) {
        AbstractKTaskWrapper<Throwable> wrapper = new AbstractKTaskWrapper<Throwable>();
        _origin.view().universe().model().manager().timeTrees(_origin, from, to, new Callback<IndexRBTree[]>() {
            @Override
            public void on(IndexRBTree[] indexRBTrees) {
                long from2 = from;
                long to2 = to;
                if (from > to) {
                    from2 = to;
                    to2 = from;
                }
                for (int i = 0; i < indexRBTrees.length; i++) {
                    TreeNode elem;
                    if (asc) {
                        elem = indexRBTrees[i].previousOrEqual(from2);
                    } else {
                        elem = indexRBTrees[i].previousOrEqual(to2);
                    }
                    while (elem != null) {
                        walker.on(elem.getKey());
                        if (asc) {
                            elem = elem.next();
                        } else {
                            elem = elem.previous();
                        }
                        if (elem != null) {
                            if (elem.getKey() <= from2) {
                                walker.on(elem.getKey());
                            }
                        }
                    }
                }
                wrapper.initCallback().on(null);
            }
        });
        return wrapper;
    }

    public KTask<Throwable> walkRangeAsc(Callback<Long> walker, long from, long to) {
        return internal_walk(walker, true, from, to);
    }

    public KTask<Throwable> walkRangeDesc(Callback<Long> walker, long from, long to) {
        return internal_walk(walker, false, from, to);
    }

}