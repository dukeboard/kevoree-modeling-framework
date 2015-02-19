package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KInferState;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by duke on 26/11/14.
 */
public class KCacheEntry implements KCacheObject {

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

    public KCacheEntry clone() {
        Object[] cloned = new Object[raw.length];
        for (int i = 0; i < raw.length; i++) {
            Object resolved = raw[i];
            if (resolved != null) {
                if (resolved instanceof Set) {
                    HashSet<Long> clonedSet = new HashSet<Long>();
                    clonedSet.addAll((Set<Long>) resolved);
                    cloned[i] = clonedSet;
                } else if (resolved instanceof List) {
                    ArrayList<Long> clonedList = new ArrayList<Long>();
                    clonedList.addAll((List<Long>) resolved);
                    cloned[i] = clonedList;
                } else if (resolved instanceof KInferState) {
                    cloned[i] = ((KInferState) resolved).cloneState();
                } else {
                    cloned[i] = resolved;
                }
            }
        }
        KCacheEntry clonedEntry = new KCacheEntry();
        clonedEntry._dirty = true;
        clonedEntry.raw = cloned;
        clonedEntry.metaClass = this.metaClass;
        clonedEntry.universeTree = this.universeTree;
        return clonedEntry;
    }

}
