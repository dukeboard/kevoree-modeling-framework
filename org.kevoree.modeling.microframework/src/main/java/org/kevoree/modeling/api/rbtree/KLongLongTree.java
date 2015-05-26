package org.kevoree.modeling.api.rbtree;

public interface KLongLongTree extends KTree {

    void insert(long key, long value);

    long previousOrEqualValue(long key);

    long lookupValue(long key);

}
