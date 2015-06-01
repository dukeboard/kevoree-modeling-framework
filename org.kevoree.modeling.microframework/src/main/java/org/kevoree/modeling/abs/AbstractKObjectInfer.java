package org.kevoree.modeling.abs;

import org.kevoree.modeling.KInfer;
import org.kevoree.modeling.Callback;
import org.kevoree.modeling.memory.struct.segment.HeapCacheSegment;
import org.kevoree.modeling.memory.AccessMode;
import org.kevoree.modeling.KInferState;
import org.kevoree.modeling.memory.KDataManager;
import org.kevoree.modeling.meta.MetaClass;
import org.kevoree.modeling.meta.MetaInferClass;

public abstract class AbstractKObjectInfer extends AbstractKObject implements KInfer {

    public AbstractKObjectInfer(long p_universe, long p_time, long p_uuid, MetaClass p_metaClass, KDataManager p_manager) {
        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
    }

    public KInferState readOnlyState() {
        HeapCacheSegment raw = _manager.segment(this, AccessMode.READ);
        if (raw != null) {
            if (raw.get(MetaInferClass.getInstance().getCache().index(), metaClass()) == null) {
                internal_load(raw);
            }
            return (KInferState) raw.get(MetaInferClass.getInstance().getCache().index(), metaClass());
        } else {
            return null;
        }
    }

    public KInferState modifyState() {
        HeapCacheSegment raw = _manager.segment(this, AccessMode.WRITE);
        if (raw != null) {
            if (raw.get(MetaInferClass.getInstance().getCache().index(), metaClass()) == null) {
                internal_load(raw);
            }
            return (KInferState) raw.get(MetaInferClass.getInstance().getCache().index(), metaClass());
        } else {
            return null;
        }
    }

    private synchronized void internal_load(HeapCacheSegment raw) {
        if (raw.get(MetaInferClass.getInstance().getCache().index(), metaClass()) == null) {
            KInferState currentState = createEmptyState();
            currentState.load(raw.get(MetaInferClass.getInstance().getRaw().index(), metaClass()).toString());
            raw.set(MetaInferClass.getInstance().getCache().index(), currentState, metaClass());
        }
    }

    abstract public void train(Object[][] trainingSet, Object[] expectedResultSet, Callback<Throwable> callback);

    abstract public Object infer(Object[] features);

    abstract public Object accuracy(Object[][] testSet, Object[] expectedResultSet);

    abstract public void clear();

    abstract public KInferState createEmptyState();

}
