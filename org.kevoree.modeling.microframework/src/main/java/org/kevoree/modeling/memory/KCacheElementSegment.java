package org.kevoree.modeling.memory;

import org.kevoree.modeling.meta.MetaClass;

public interface KCacheElementSegment extends KCacheElement {

    KCacheElementSegment clone(MetaClass metaClass);

    void set(int index, Object content, MetaClass metaClass);

    long[] getRef(int index, MetaClass metaClass);

    Object get(int index, MetaClass metaClass);

    int[] modifiedIndexes(MetaClass metaClass);

    void init(MetaClass metaClass);

    int metaClassIndex();

}
