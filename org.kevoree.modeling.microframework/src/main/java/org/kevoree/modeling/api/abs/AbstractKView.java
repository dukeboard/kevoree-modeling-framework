package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.ModelFormat;
import org.kevoree.modeling.api.event.DefaultKEvent;
import org.kevoree.modeling.api.json.JsonFormat;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.operation.DefaultModelSlicer;
import org.kevoree.modeling.api.select.KSelector;
import org.kevoree.modeling.api.time.TimeTree;
import org.kevoree.modeling.api.time.DefaultTimeTree;
import org.kevoree.modeling.api.trace.TraceSequence;
import org.kevoree.modeling.api.util.Checker;
import org.kevoree.modeling.api.xmi.XmiFormat;

import java.util.List;


/**
 * Created by duke on 10/10/14.
 */
public abstract class AbstractKView implements KView {

    private long _now;

    private KUniverse _universe;

    protected AbstractKView(long p_now, KUniverse p_universe) {
        this._now = p_now;
        this._universe = p_universe;
    }

    @Override
    public long now() {
        return _now;
    }

    @Override
    public KUniverse universe() {
        return _universe;
    }

    @Override
    public KObject createFQN(String metaClassName) {
        return create(universe().model().metaModel().metaClass(metaClassName));
    }

    @Override
    public void setRoot(KObject elem, Callback<Throwable> callback) {
        ((AbstractKObject) elem).set_parent(null, null);
        ((AbstractKObject) elem).setRoot(true);
        universe().model().storage().setRoot(elem, callback);
    }

    @Override
    public void select(final String query, final Callback<KObject[]> callback) {
        if (callback == null) {
            return;
        }
        if (query == null) {
            callback.on(new KObject[0]);
            return;
        }
        universe().model().storage().getRoot(this, new Callback<KObject>() {
            @Override
            public void on(KObject rootObj) {
                if (rootObj == null) {
                    callback.on(new KObject[0]);
                } else {
                    String cleanedQuery = query;
                    if (cleanedQuery.equals("/")) {
                        KObject[] param = new KObject[1];
                        param[0] = rootObj;
                        callback.on(param);
                    } else {
                        if (cleanedQuery.startsWith("/")) {
                            cleanedQuery = cleanedQuery.substring(1);
                        }
                        KObject[] roots = new KObject[1];
                        roots[0] = rootObj;
                        KSelector.select(rootObj.view(), roots, cleanedQuery, callback);
                    }
                }
            }
        });
    }

    @Override
    public void lookup(Long kid, Callback<KObject> callback) {
        universe().model().storage().lookup(this, kid, callback);
    }

    @Override
    public void lookupAll(Long[] keys, Callback<KObject[]> callback) {
        universe().model().storage().lookupAll(this, keys, callback);
    }

    public KObject createProxy(MetaClass clazz, TimeTree timeTree, long key) {
        //TODO check the radixKey
        return internalCreate(clazz, timeTree, key);
    }

    @Override
    public KObject create(MetaClass clazz) {
        if (!Checker.isDefined(clazz)) {
            return null;
        }
        KObject newObj = internalCreate(clazz, new DefaultTimeTree().insert(now()), universe().model().storage().nextObjectKey());
        if (newObj != null) {
            universe().model().storage().initKObject(newObj, this);
            universe().model().storage().eventBroker().notify(new DefaultKEvent(KActionType.NEW, newObj, clazz, null));
        }
        return newObj;
    }

    public void listen(ModelListener listener) {
        universe().model().storage().eventBroker().registerListener(this, listener, null);
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
        if (!Checker.isDefined(obj)) {
            return false;
        }
        if (!(obj instanceof AbstractKView)) {
            return false;
        } else {
            AbstractKView casted = (AbstractKView) obj;
            return (casted._now == _now) && _universe.equals(casted._universe);
        }
    }

}
