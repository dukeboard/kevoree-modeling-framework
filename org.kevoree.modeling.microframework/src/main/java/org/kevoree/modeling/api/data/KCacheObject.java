package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.meta.MetaModel;

public interface KCacheObject {

    boolean isDirty();

    String serialize();

    void setClean();

    void unserialize(KContentKey key, String payload, MetaModel metaModel) throws Exception;

    int counter();

    void inc();

    void dec();

}
