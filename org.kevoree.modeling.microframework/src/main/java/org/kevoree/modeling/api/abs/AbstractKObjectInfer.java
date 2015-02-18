package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KInfer;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.data.AccessMode;
import org.kevoree.modeling.api.KInferState;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaInferClass;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;

/**
 * Created by duke on 09/12/14.
 */
public abstract class AbstractKObjectInfer extends AbstractKObject implements KInfer {

    public AbstractKObjectInfer(KView p_view, long p_uuid, TimeTree p_timeTree, LongRBTree p_universeTree, MetaClass p_metaClass) {
        super(p_view, p_uuid, p_timeTree, p_universeTree, p_metaClass);
    }

    public KInferState readOnlyState() {
        Object[] raw = view().universe().model().storage().raw(this, AccessMode.READ);
        if (raw != null) {
            if (raw[MetaInferClass.getInstance().getCache().index()] == null) {
                internal_load(raw);
            }
            return (KInferState) raw[MetaInferClass.getInstance().getCache().index()];
        } else {
            return null;
        }
    }

    public KInferState modifyState() {
        Object[] raw = view().universe().model().storage().raw(this, AccessMode.WRITE);
        if (raw != null) {
            if (raw[MetaInferClass.getInstance().getCache().index()] == null) {
                internal_load(raw);
            }
            return (KInferState) raw[MetaInferClass.getInstance().getCache().index()];
        } else {
            return null;
        }
    }

    private synchronized void internal_load(Object[] raw) {
        if (raw[MetaInferClass.getInstance().getCache().index()] == null) {
            KInferState currentState = createEmptyState();
            currentState.load(raw[MetaInferClass.getInstance().getRaw().index()].toString());
            raw[MetaInferClass.getInstance().getCache().index()] = currentState;
        }
    }

    abstract public void train(Object[][] trainingSet, Object[] expectedResultSet, Callback<Throwable> callback);

    abstract public Object infer(Object[] features);

    abstract public Object accuracy(Object[][] testSet, Object[] expectedResultSet);

    abstract public void clear();

    abstract public KInferState createEmptyState();

}
