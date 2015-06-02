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

    double getInferElem(int index, int arrayIndex, MetaClass metaClass);

    void setInferElem(int index, int arrayIndex, double valueToInsert, MetaClass metaClass);

    void extendInfer(int index, int newSize, MetaClass metaClass);
    /*  */

    int[] modifiedIndexes(MetaClass metaClass);

    void init(MetaClass metaClass);

    int metaClassIndex();

}
