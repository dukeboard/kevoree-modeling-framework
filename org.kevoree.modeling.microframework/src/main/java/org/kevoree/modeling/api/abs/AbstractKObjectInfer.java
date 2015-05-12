package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KInfer;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.manager.AccessMode;
import org.kevoree.modeling.api.KInferState;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaInferClass;

public abstract class AbstractKObjectInfer extends AbstractKObject implements KInfer {

    public AbstractKObjectInfer(long p_universe, long p_time, long p_uuid, MetaClass p_metaClass, KDataManager p_manager) {
        super(p_universe, p_time, p_uuid, p_metaClass, p_manager);
    }

    public KInferState readOnlyState() {
        KCacheEntry raw = _manager.entry(this, AccessMode.READ);
        if (raw != null) {
            if (raw.get(MetaInferClass.getInstance().getCache().index()) == null) {
                internal_load(raw);
            }
            return (KInferState) raw.get(MetaInferClass.getInstance().getCache().index());
        } else {
            return null;
        }
    }

    public KInferState modifyState() {
        KCacheEntry raw = _manager.entry(this, AccessMode.WRITE);
        if (raw != null) {
            if (raw.get(MetaInferClass.getInstance().getCache().index()) == null) {
                internal_load(raw);
            }
            return (KInferState) raw.get(MetaInferClass.getInstance().getCache().index());
        } else {
            return null;
        }
    }

    private synchronized void internal_load(KCacheEntry raw) {
        if (raw.get(MetaInferClass.getInstance().getCache().index()) == null) {
            KInferState currentState = createEmptyState();
            currentState.load(raw.get(MetaInferClass.getInstance().getRaw().index()).toString());
            raw.set(MetaInferClass.getInstance().getCache().index(), currentState);
        }
    }

    abstract public void train(Object[][] trainingSet, Object[] expectedResultSet, Callback<Throwable> callback);

    abstract public Object infer(Object[] features);

    abstract public Object accuracy(Object[][] testSet, Object[] expectedResultSet);

    abstract public void clear();

    abstract public KInferState createEmptyState();

}
