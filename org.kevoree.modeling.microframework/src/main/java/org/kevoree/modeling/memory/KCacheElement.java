package org.kevoree.modeling.memory;

import org.kevoree.modeling.meta.MetaModel;

public interface KCacheElement {

    boolean isDirty();

    String serialize(MetaModel metaModel);

    void setClean();

    void setDirty();

    void unserialize(KContentKey key, String payload, MetaModel metaModel) throws Exception;

    int counter();

    void inc();

    void dec();

}
