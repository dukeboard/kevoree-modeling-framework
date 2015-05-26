package org.kevoree.modeling.api.rbtree;

public interface KLongTree extends KTree {

    void insert(long key);

    long previousOrEqual(long key);

    long lookup(long key);

    void range(long startKey, long endKey, KTreeWalker walker);

    void delete(long key);

}
