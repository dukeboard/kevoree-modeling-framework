package org.kevoree.modeling.memory;

import org.kevoree.modeling.meta.MetaClass;

public interface KCacheElementSegment extends KCacheElement {

    KCacheElementSegment clone(MetaClass metaClass);

    void set(int index, Object content, MetaClass metaClass);

    Object get(int index, MetaClass metaClass);

    //TODO add for primitive

    /* References management */
    long[] getRef(int index, MetaClass metaClass);

    boolean addRef(int index, long newRef, MetaClass metaClass);

    boolean removeRef(int index, long previousRef, MetaClass metaClass);

    /* Extrapolated attributes management */
    double[] getInfer(int index, MetaClass metaClass);

    boolean addInfer(int index, double newElem, MetaClass metaClass);

    boolean removeInfer(int index, double previousElem, MetaClass metaClass);

    int[] modifiedIndexes(MetaClass metaClass);

    void init(MetaClass metaClass);

    int metaClassIndex();

}
