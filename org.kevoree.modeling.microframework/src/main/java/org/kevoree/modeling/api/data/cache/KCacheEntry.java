package org.kevoree.modeling.api.data.cache;

import org.kevoree.modeling.api.KInferState;
import org.kevoree.modeling.api.data.manager.JsonRaw;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaModel;
import org.kevoree.modeling.api.rbtree.LongRBTree;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by duke on 26/11/14.
 */
public class KCacheEntry implements KCacheObject {

    public MetaClass metaClass;

    private Object[] raw;

    public boolean[] _modifiedIndexes = null;

    public boolean _dirty = false;

    public void initRaw(int p_size) {
        this.raw = new Object[p_size];
    }

    public void clearRaw() {
        this.raw = null;
    }

    @Override
    public boolean isDirty() {
        return _dirty;
    }

    public int[] modifiedIndexes() {
        if (_modifiedIndexes == null) {
            return new int[0];
        } else {
            int nbModified = 0;
            for (int i = 0; i < _modifiedIndexes.length; i++) {
                if (_modifiedIndexes[i]) {
                    nbModified = nbModified + 1;
                }
            }
            int[] result = new int[nbModified];
            int inserted = 0;
            for (int i = 0; i < _modifiedIndexes.length; i++) {
                if (_modifiedIndexes[i]) {
                    result[inserted] = i;
                    inserted = inserted + 1;
                }
            }
            return result;
        }
    }

    @Override
    public String serialize() {
        return JsonRaw.encode(this, null, metaClass, true, false);
    }

    @Override
    public void setClean() {
        _dirty = false;
        _modifiedIndexes = null;
    }

    @Override
    public void unserialize(KContentKey key, String payload, MetaModel metaModel) throws Exception {
        JsonRaw.decode(payload, key.time(), metaModel, this);
    }

    public Object get(int index) {
        if (raw != null) {
            return raw[index];
        } else {
            return null;
        }
    }

    public synchronized void set(int index, Object content) {
        raw[index] = content;
        _dirty = true;
        if (_modifiedIndexes == null) {
            _modifiedIndexes = new boolean[raw.length];
        }
        _modifiedIndexes[index] = true;
    }

    public int sizeRaw() {
        if (raw != null) {
            return raw.length;
        } else {
            return 0;
        }
    }

    public KCacheEntry clone() {
        if (raw == null) {
            return new KCacheEntry();
        } else {
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
            return clonedEntry;
        }
    }

}
