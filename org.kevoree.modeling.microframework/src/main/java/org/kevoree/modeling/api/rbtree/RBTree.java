package org.kevoree.modeling.api.rbtree;

/**
 * Created by duke on 19/02/15.
 */
public interface RBTree {

    public Long first();

    public Long last();

    public Long next(long from);

    public Long previous(long from);

    public Long resolve(long time);

    public int size();

}
