package org.kevoree.modeling.api.rbtree;

/**
 * Created by duke on 22/05/15.
 */
public interface KLongTree {

    void insert(long key);

    long previousOrEqual(long key);

    long lookup(long key);

}
