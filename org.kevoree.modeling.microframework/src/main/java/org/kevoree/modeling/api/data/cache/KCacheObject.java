package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.meta.MetaModel;

/**
 * Created by duke on 18/02/15.
 */
public interface KCacheObject {

    public boolean isDirty();

    public String serialize();

    public void setClean();

    public void unserialize(KContentKey key, String payload, MetaModel metaModel) throws Exception;

    public int counter();

    public void inc();

    public void dec();

}
