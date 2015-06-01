package org.kevoree.modeling.memory.struct.segment;

import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.KInferState;
import org.kevoree.modeling.memory.KCacheElementSegment;
import org.kevoree.modeling.memory.KContentKey;
import org.kevoree.modeling.memory.manager.JsonRaw;
import org.kevoree.modeling.meta.MetaClass;
import org.kevoree.modeling.meta.MetaModel;
import org.kevoree.modeling.util.ArrayUtils;

public class HeapCacheSegment implements KCacheElementSegment {

    private Object[] raw;

    private int _counter = 0;

    private int _metaClassIndex = -1;

    private boolean[] _modifiedIndexes = null;

    private boolean _dirty = false;

    @Override
    public void init(MetaClass p_metaClass) {
        this.raw = new Object[p_metaClass.metaElements().length];
        _metaClassIndex = p_metaClass.index();
    }

    @Override
    public int metaClassIndex() {
        return _metaClassIndex;
    }

    @Override
    public boolean isDirty() {
        return _dirty;
    }

    @Override
    public String serialize(MetaModel metaModel) {
        return JsonRaw.encode(this, KConfig.NULL_LONG, metaModel.metaClasses()[_metaClassIndex], false);
    }

    @Override
    public int[] modifiedIndexes(MetaClass p_metaClass) {
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
    public void setClean() {
        _dirty = false;
        _modifiedIndexes = null;
    }

    @Override
    public void setDirty() {
        _dirty = true;
    }

    @Override
    public void unserialize(KContentKey key, String payload, MetaModel metaModel) throws Exception {
        JsonRaw.decode(payload, key.time, metaModel, this);
    }

    @Override
    public int counter() {
        return _counter;
    }

    @Override
    public void inc() {
        _counter++;
    }

    @Override
    public void dec() {
        _counter--;
    }

    @Override
    public Object get(int index, MetaClass p_metaClass) {
        if (raw != null) {
            return raw[index];
        } else {
            return null;
        }
    }

    @Override
    public long[] getRef(int index, MetaClass p_metaClass) {
        if (raw != null) {
            Object previousObj = raw[index];
            if (previousObj != null) {
                try {
                    return (long[]) previousObj;
                } catch (Exception e) {
                    e.printStackTrace();
                    raw[index] = null;
                    return null;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public void addRef(int index, long newRef, MetaClass metaClass) {
        if (raw != null) {
            long[] previous = (long[]) raw[index];
            if (previous == null) {
                previous = new long[1];
                previous[0] = newRef;
            } else {
                for (int i = 0; i < previous.length; i++) {
                    if (previous[i] == newRef) {
                        return;
                    }
                }
                long[] incArray = new long[previous.length + 1];
                System.arraycopy(previous, 0, incArray, 0, previous.length);
                incArray[previous.length] = newRef;
                previous = incArray;
            }
            raw[index] = previous;
            if (_modifiedIndexes == null) {
                _modifiedIndexes = new boolean[raw.length];
            }
            _modifiedIndexes[index] = true;
            _dirty = true;
        }
    }

    @Override
    public synchronized void set(int index, Object content, MetaClass p_metaClass) {
        raw[index] = content;
        _dirty = true;
        if (_modifiedIndexes == null) {
            _modifiedIndexes = new boolean[raw.length];
        }
        _modifiedIndexes[index] = true;
    }

    @Override
    public HeapCacheSegment clone(MetaClass p_metaClass) {
        if (raw == null) {
            return new HeapCacheSegment();
        } else {
            Object[] cloned = new Object[raw.length];
            //TODO
            //System.arraycopy(raw,0,cloned,0, raw.length);
            for (int i = 0; i < raw.length; i++) {
                Object resolved = raw[i];
                if (resolved != null) {
                    if (resolved instanceof KInferState) {
                        cloned[i] = ((KInferState) resolved).cloneState();
                    } else {
                        cloned[i] = resolved;
                    }
                }
            }
            HeapCacheSegment clonedEntry = new HeapCacheSegment();
            clonedEntry._dirty = true;
            clonedEntry.raw = cloned;
            clonedEntry._metaClassIndex = _metaClassIndex;
            return clonedEntry;
        }
    }

}
