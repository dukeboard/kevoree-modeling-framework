package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.ModelFormat;
import org.kevoree.modeling.api.event.DefaultKEvent;
import org.kevoree.modeling.api.event.ListenerScope;
import org.kevoree.modeling.api.json.JsonFormat;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.operation.DefaultModelSlicer;
import org.kevoree.modeling.api.select.KSelector;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.time.DefaultTimeTree;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.modeling.api.xmi.XmiFormat;

import java.util.ArrayList;
import java.util.List;


/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKView implements KView {

    private long _now;

    private KDimension _dimension;

    protected AbstractKView(long p_now, KDimension p_dimension) {
        this._now = p_now;
        this._dimension = p_dimension;
    }

    @Override
    public long now() {
        return _now;
    }

    @Override
    public KDimension dimension() {
        return _dimension;
    }

    @Override
    public KObject createFQN(String metaClassName) {
        return create(dimension().universe().metaModel().metaClass(metaClassName));
    }

    @Override
    public void setRoot(KObject elem, Callback<Throwable> callback) {
        ((AbstractKObject) elem).set_parent(null, null);
        ((AbstractKObject) elem).setRoot(true);
        dimension().universe().storage().setRoot(elem, callback);
    }

    @Override
    public void select(final String query, final Callback<KObject[]> callback) {
        dimension().universe().storage().getRoot(this, new Callback<KObject>() {
            @Override
            public void on(KObject rootObj) {
                String cleanedQuery = query;
                if (cleanedQuery.equals("/")) {
                    ArrayList<KObject> res = new ArrayList<KObject>();
                    if (rootObj != null) {
                        res.add(rootObj);
                    }
                    callback.on(res.toArray(new KObject[res.size()]));
                } else {
                    if (cleanedQuery.startsWith("/")) {
                        cleanedQuery = cleanedQuery.substring(1);
                    }
                    KSelector.select(rootObj, cleanedQuery, callback);
                }
            }
        });
    }

    @Override
    public void lookup(Long kid, Callback<KObject> callback) {
        dimension().universe().storage().lookup(this, kid, callback);
    }

    @Override
    public void lookupAll(Long[] keys, Callback<KObject[]> callback) {
        dimension().universe().storage().lookupAll(this, keys, callback);
    }

    @Override
    public void stream(String query, Callback<KObject> callback) {

    }

    @Override
    public KObject createProxy(MetaClass clazz, TimeTree timeTree, long key) {
        return internalCreate(clazz, timeTree, key);
    }

    @Override
    public KObject create(MetaClass clazz) {
        KObject newObj = internalCreate(clazz, new DefaultTimeTree().insert(now()), dimension().universe().storage().nextObjectKey());
        if (newObj != null) {
            dimension().universe().storage().initKObject(newObj, this);
            dimension().universe().storage().eventBroker().notify(new DefaultKEvent(KActionType.NEW, newObj, clazz, null));
        }
        return newObj;
    }

    public void listen(ModelListener listener, ListenerScope scope) {
        dimension().universe().storage().eventBroker().registerListener(this, listener, scope);
    }

    protected abstract KObject internalCreate(MetaClass clazz, TimeTree timeTree, long key);

    @Override
    public void slice(List<KObject> elems, Callback<TraceSequence> callback) {
        DefaultModelSlicer.slice(elems, callback);
    }

    @Override
    public ModelFormat json() {
        return new JsonFormat(this);
    }

    public ModelFormat xmi() {
        return new XmiFormat(this);
    }

    @Override
    public boolean equals(Object obj) {
        if (!(obj instanceof AbstractKView)) {
            return false;
        } else {
            AbstractKView casted = (AbstractKView) obj;
            return (casted._now == _now) && _dimension.equals(casted._dimension);
        }
    }

}
