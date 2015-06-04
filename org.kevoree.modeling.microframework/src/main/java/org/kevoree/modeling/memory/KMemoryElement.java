package org.kevoree.modeling.memory;

import org.kevoree.modeling.KContentKey;
import org.kevoree.modeling.meta.KMetaModel;

public interface KMemoryElement {

    boolean isDirty();

    String serialize(KMetaModel metaModel);

    void setClean(KMetaModel metaModel);

    void setDirty();

    void unserialize(KContentKey key, String payload, KMetaModel metaModel) throws Exception;

    int counter();

    void inc();

    void dec();

    void free(KMetaModel metaModel);

}
