package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelFormat;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.json.JsonFormat;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.rbtree.LongRBTree;
import org.kevoree.modeling.api.traversal.selector.KSelector;
import org.kevoree.modeling.api.util.Checker;
import org.kevoree.modeling.api.xmi.XmiFormat;

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
    public KDefer<Throwable> setRoot(KObject elem) {
        AbstractKDeferWrapper<Throwable> task = new AbstractKDeferWrapper<Throwable>();
        ((AbstractKObject) elem).set_parent(null, null);
        universe().model().manager().setRoot(elem, task.initCallback());
        return task;
    }

    @Override
    public KDefer<KObject> getRoot() {
        AbstractKDeferWrapper<KObject> task = new AbstractKDeferWrapper<KObject>();
        universe().model().manager().getRoot(this, task.initCallback());
        return task;
    }

    @Override
    public KDefer<KObject[]> select(final String query) {
        final AbstractKDeferWrapper<KObject[]> task = new AbstractKDeferWrapper<KObject[]>();
        if (query == null || query.length() == 0) {
            task.initCallback().on(new KObject[0]);
        } else {
            universe().model().manager().getRoot(this, new Callback<KObject>() {
                @Override
                public void on(KObject rootObj) {
                    if (rootObj == null) {
                        task.initCallback().on(new KObject[0]);
                    } else {
                        String cleanedQuery = query;
                        if (query.length() == 1 && query.charAt(0) == '/') {
                            KObject[] param = new KObject[1];
                            param[0] = rootObj;
                            task.initCallback().on(param);
                        } else {
                            if (cleanedQuery.charAt(0) == '/') {
                                cleanedQuery = cleanedQuery.substring(1);
                            }
                            KSelector.select(rootObj, cleanedQuery, task.initCallback());
                        }
                    }
                }
            });
        }
        return task;
    }

    @Override
    public KDefer<KObject> lookup(long kid) {
        AbstractKDeferWrapper<KObject> task = new AbstractKDeferWrapper<KObject>();
        universe().model().manager().lookup(this, kid, task.initCallback());
        return task;
    }

    @Override
    public KDefer<KObject[]> lookupAll(long[] keys) {
        AbstractKDeferWrapper<KObject[]> task = new AbstractKDeferWrapper<KObject[]>();
        universe().model().manager().lookupAll(this, keys, task.initCallback());
        return task;
    }

    public void internalLookupAll(long[] keys, Callback<KObject[]> callback) {
        universe().model().manager().lookupAll(this, keys, callback);
    }

    public KObject createProxy(MetaClass clazz, long key) {
        //TODO check the radixKey, according to the one created now
        return internalCreate(clazz, key);
    }

    @Override
    public KObject create(MetaClass clazz) {
        if (!Checker.isDefined(clazz)) {
            return null;
        }
        KObject newObj = internalCreate(clazz, universe().model().manager().nextObjectKey());
        if (newObj != null) {
            universe().model().manager().initKObject(newObj, this);
        }
        return newObj;
    }

    protected abstract KObject internalCreate(MetaClass clazz, long key);

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
