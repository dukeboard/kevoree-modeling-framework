package org.kevoree.modeling.api.data.cache;

/**
 * Created by duke on 18/02/15.
 */
public interface KCacheObject {

    public boolean isDirty();

    public String serialize();

    public void setClean();

}
