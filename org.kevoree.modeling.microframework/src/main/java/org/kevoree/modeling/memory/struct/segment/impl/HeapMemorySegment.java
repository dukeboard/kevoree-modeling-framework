package org.kevoree.modeling.memory.struct.segment.impl;

import org.kevoree.modeling.KConfig;
import org.kevoree.modeling.infer.KInferState;
import org.kevoree.modeling.memory.struct.segment.KMemorySegment;
import org.kevoree.modeling.KContentKey;
import org.kevoree.modeling.memory.manager.impl.JsonRaw;
import org.kevoree.modeling.meta.KMetaClass;
import org.kevoree.modeling.meta.KMetaModel;

public class HeapMemorySegment implements KMemorySegment {

    private Object[] raw;

    private int _counter = 0;

    private int _metaClassIndex = -1;

    private boolean[] _modifiedIndexes = null;

    private boolean _dirty = false;

    private long _timeOrigin;

    public HeapMemorySegment(long p_timeOrigin) {
        this._timeOrigin = p_timeOrigin;
    }

    @Override
    public void init(KMetaClass p_metaClass) {
        this.raw = new Object[p_metaClass.metaElements().length];
        _metaClassIndex = p_metaClass.index();
    }

    @Override
    public int metaClassIndex() {
        return _metaClassIndex;
    }

    @Override
    public long originTime() {
        return _timeOrigin;
    }

    @Override
    public boolean isDirty() {
        return _dirty;
    }

    @Override
    public String serialize(KMetaModel metaModel) {
        return JsonRaw.encode(this, KConfig.NULL_LONG, metaModel.metaClass(_metaClassIndex), false);
    }

    @Override
    public int[] modifiedIndexes(KMetaClass p_metaClass) {
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
    public void setClean(KMetaModel metaModel) {
        _dirty = false;
        _modifiedIndexes = null;
    }

    @Override
    public void setDirty() {
        _dirty = true;
    }

    @Override
    public void unserialize(KContentKey key, String payload, KMetaModel metaModel) throws Exception {
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
    public void free(KMetaModel metaModel) {
        //NOOP
    }

    @Override
    public Object get(int index, KMetaClass p_metaClass) {
        if (raw != null) {
            return raw[index];
        } else {
            return null;
        }
    }

    @Override
    public long[] getRef(int index, KMetaClass p_metaClass) {
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
    public boolean addRef(int index, long newRef, KMetaClass metaClass) {
        if (raw != null) {
            long[] previous = (long[]) raw[index];
            if (previous == null) {
                previous = new long[1];
                previous[0] = newRef;
            } else {
                for (int i = 0; i < previous.length; i++) {
                    if (previous[i] == newRef) {
                        return false;
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
            return true;
        }
        return false;
    }

    @Override
    public boolean removeRef(int index, long newRef, KMetaClass metaClass) {
        if (raw != null) {
            long[] previous = (long[]) raw[index];
            if (previous != null) {
                int indexToRemove = -1;
                for (int i = 0; i < previous.length; i++) {
                    if (previous[i] == newRef) {
                        indexToRemove = i;
                        break;
                    }
                }
                if (indexToRemove != -1) {
                    long[] newArray = new long[previous.length - 1];
                    System.arraycopy(previous, 0, newArray, 0, indexToRemove);
                    System.arraycopy(previous, indexToRemove + 1, newArray, indexToRemove, previous.length - indexToRemove - 1);
                    raw[index] = newArray;
                    if (_modifiedIndexes == null) {
                        _modifiedIndexes = new boolean[raw.length];
                    }
                    _modifiedIndexes[index] = true;
                    _dirty = true;
                }
            }
        }
        return false;
    }

    @Override
    public double[] getInfer(int index, KMetaClass metaClass) {
        if (raw != null) {
            Object previousObj = raw[index];
            if (previousObj != null) {
                try {
                    return (double[]) previousObj;
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
    public double getInferElem(int index, int arrayIndex, KMetaClass metaClass) {
        double[] res = getInfer(index, metaClass);
        if (res != null && arrayIndex > 0 && arrayIndex < res.length) {
            return res[arrayIndex];
        }
        return 0;
    }

    @Override
    public void setInferElem(int index, int arrayIndex, double valueToInsert, KMetaClass metaClass) {
        double[] res = getInfer(index, metaClass);
        if (res != null && arrayIndex > 0 && arrayIndex < res.length) {
            res[arrayIndex] = valueToInsert;
        }
    }

    @Override
    public void extendInfer(int index, int newSize, KMetaClass metaClass) {
        if (raw != null) {
            double[] previous = (double[]) raw[index];
            if (previous == null) {
                previous = new double[newSize];
            } else {
                double[] incArray = new double[newSize];
                System.arraycopy(previous, 0, incArray, 0, previous.length);
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
    public synchronized void set(int index, Object content, KMetaClass p_metaClass) {
        raw[index] = content;
        _dirty = true;
        if (_modifiedIndexes == null) {
            _modifiedIndexes = new boolean[raw.length];
        }
        _modifiedIndexes[index] = true;
    }

    @Override
    public KMemorySegment clone(long newTimeOrigin, KMetaClass p_metaClass) {
        if (raw == null) {
            return new HeapMemorySegment(newTimeOrigin);
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
            HeapMemorySegment clonedEntry = new HeapMemorySegment(newTimeOrigin);
            clonedEntry._dirty = true;
            clonedEntry.raw = cloned;
            clonedEntry._metaClassIndex = _metaClassIndex;
            return clonedEntry;
        }
    }

}
