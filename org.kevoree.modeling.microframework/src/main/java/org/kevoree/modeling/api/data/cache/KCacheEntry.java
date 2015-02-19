package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;

/**
 * Created by duke on 26/11/14.
 */
public class KCacheEntry implements KCacheObject {

    public TimeTree timeTree;

    public LongRBTree universeTree;

    public MetaClass metaClass;

    public Object[] raw;

    public boolean _dirty = false;

    @Override
    public boolean isDirty() {
        return _dirty;
    }

    @Override
    public String serialize() {
        return null;
    }

    @Override
    public void setClean() {
        _dirty = false;
    }

    public Object get(int index) {
        return raw[index];
    }

    public synchronized void set(int index, Object content) {
        raw[index] = content;
        _dirty = true;
    }

    

}
