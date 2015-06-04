package org.kevoree.modeling.abs;

import org.kevoree.modeling.infer.KInfer;
import org.kevoree.modeling.KCallback;
import org.kevoree.modeling.memory.struct.segment.KMemorySegment;
import org.kevoree.modeling.memory.AccessMode;
import org.kevoree.modeling.infer.KInferState;
import org.kevoree.modeling.memory.manager.KMemoryManager;
import org.kevoree.modeling.meta.KMetaClass;
import org.kevoree.modeling.meta.KMetaInferClass;

public abstract class AbstractKObjectInfer extends AbstractKObject implements KInfer {

    public AbstractKObjectInfer(long p_universe, long p_time, long p_uuid, KMetaClass p_metaClass, KMemoryManager p_manager) {
        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
    }

    public KInferState readOnlyState() {
        KMemorySegment raw = _manager.segment(_universe,_time,_uuid, AccessMode.READ,metaClass());
        if (raw != null) {
            if (raw.get(KMetaInferClass.getInstance().getCache().index(), metaClass()) == null) {
                internal_load(raw);
            }
            return (KInferState) raw.get(KMetaInferClass.getInstance().getCache().index(), metaClass());
        } else {
            return null;
        }
    }

    public KInferState modifyState() {
        KMemorySegment raw = _manager.segment(_universe,_time,_uuid, AccessMode.WRITE,metaClass());
        if (raw != null) {
            if (raw.get(KMetaInferClass.getInstance().getCache().index(), metaClass()) == null) {
                internal_load(raw);
            }
            return (KInferState) raw.get(KMetaInferClass.getInstance().getCache().index(), metaClass());
        } else {
            return null;
        }
    }

    private synchronized void internal_load(KMemorySegment raw) {
        if (raw.get(KMetaInferClass.getInstance().getCache().index(), metaClass()) == null) {
            KInferState currentState = createEmptyState();
            currentState.load(raw.get(KMetaInferClass.getInstance().getRaw().index(), metaClass()).toString());
            raw.set(KMetaInferClass.getInstance().getCache().index(), currentState, metaClass());
        }
    }

    abstract public void train(Object[][] trainingSet, Object[] expectedResultSet, KCallback<Throwable> callback);

    abstract public Object infer(Object[] features);

    abstract public Object accuracy(Object[][] testSet, Object[] expectedResultSet);

    abstract public void clear();

    abstract public KInferState createEmptyState();

}
