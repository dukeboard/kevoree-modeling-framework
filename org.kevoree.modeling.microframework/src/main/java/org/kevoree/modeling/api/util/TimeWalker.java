package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.abs.AbstractKDeferWrapper;
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

    public KDefer<Throwable> walk(Callback<Long> walker) {
        return walkAsc(walker);
    }

    public KDefer<Throwable> walkAsc(Callback<Long> walker) {
        return internal_walk(walker, true);
    }

    public KDefer<Throwable> walkDesc(Callback<Long> walker) {
        return internal_walk(walker, false);
    }

    private KDefer<Throwable> internal_walk(final Callback<Long> walker, final boolean asc) {
        final AbstractKDeferWrapper<Throwable> wrapper = new AbstractKDeferWrapper<Throwable>();
        _origin.view().universe().model().manager().timeTrees(_origin, null, null, new Callback<IndexRBTree[]>() {
            @Override
            public void on(IndexRBTree[] indexRBTrees) {
                for (int i = 0; i < indexRBTrees.length; i++) {
                    TreeNode elem;
                    if (asc) {
                        elem = indexRBTrees[i].first();
                    } else {
                        elem = indexRBTrees[i].last();
                    }
                    while (elem != null) {
                        walker.on(elem.getKey());
                        if (asc) {
                            elem = elem.next();
                        } else {
                            elem = elem.previous();
                        }
                    }
                }
                wrapper.initCallback().on(null);
            }
        });
        return wrapper;
    }

    private KDefer<Throwable> internal_walk_range(final Callback<Long> walker, final boolean asc, final Long from, final Long to) {
        final AbstractKDeferWrapper<Throwable> wrapper = new AbstractKDeferWrapper<Throwable>();
        _origin.view().universe().model().manager().timeTrees(_origin, from, to, new Callback<IndexRBTree[]>() {
            @Override
            public void on(IndexRBTree[] indexRBTrees) {
                Long from2 = from;
                Long to2 = to;
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

    public KDefer<Throwable> walkRangeAsc(Callback<Long> walker, long from, long to) {
        return internal_walk_range(walker, true, from, to);
    }

    public KDefer<Throwable> walkRangeDesc(Callback<Long> walker, long from, long to) {
        return internal_walk_range(walker, false, from, to);
    }

}