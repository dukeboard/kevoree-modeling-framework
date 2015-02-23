package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KTask;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelFormat;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.json.JsonFormat;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.time.rbtree.LongRBTree;
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
    public KTask<Throwable> setRoot(KObject elem) {
        AbstractKTaskWrapper<Throwable> task = new AbstractKTaskWrapper<Throwable>();
        ((AbstractKObject) elem).set_parent(null, null);
        universe().model().manager().setRoot(elem, task.initCallback());
        return task;
    }

    @Override
    public KTask<KObject> getRoot() {
        AbstractKTaskWrapper<KObject> task = new AbstractKTaskWrapper<KObject>();
        universe().model().manager().getRoot(this, task.initCallback());
        return task;
    }

    @Override
    public KTask<KObject[]> select(final String query) {
        AbstractKTaskWrapper<KObject[]> task = new AbstractKTaskWrapper<KObject[]>();
        if (query == null) {
            task.initCallback().on(new KObject[0]);
        }
        universe().model().manager().getRoot(this, new Callback<KObject>() {
            @Override
            public void on(KObject rootObj) {
                if (rootObj == null) {
                    task.initCallback().on(new KObject[0]);
                } else {
                    String cleanedQuery = query;
                    if (cleanedQuery.equals("/")) {
                        KObject[] param = new KObject[1];
                        param[0] = rootObj;
                        task.initCallback().on(param);
                    } else {
                        if (cleanedQuery.startsWith("/")) {
                            cleanedQuery = cleanedQuery.substring(1);
                        }
                        KSelector.select(rootObj, cleanedQuery, task.initCallback());
                    }
                }
            }
        });
        return task;
    }

    @Override
    public KTask<KObject> lookup(Long kid) {
        AbstractKTaskWrapper<KObject> task = new AbstractKTaskWrapper<KObject>();
        universe().model().manager().lookup(this, kid, task.initCallback());
        return task;
    }

    @Override
    public KTask<KObject[]> lookupAll(Long[] keys) {
        AbstractKTaskWrapper<KObject[]> task = new AbstractKTaskWrapper<KObject[]>();
        universe().model().manager().lookupAll(this, keys, task.initCallback());
        return task;
    }

    public KObject createProxy(MetaClass clazz, LongRBTree universeTree, long key) {
        //TODO check the radixKey
        return internalCreate(clazz, universeTree, key);
    }

    @Override
    public KObject create(MetaClass clazz) {
        if (!Checker.isDefined(clazz)) {
            return null;
        }
        LongRBTree newUniverseTree = new LongRBTree();
        newUniverseTree.insert(universe().key(), now());
        KObject newObj = internalCreate(clazz, newUniverseTree, universe().model().manager().nextObjectKey());
        if (newObj != null) {
            universe().model().manager().initKObject(newObj, this);
        }
        return newObj;
    }

    public void listen(KEventListener listener) {
        universe().model().manager().cdn().registerListener(this, listener, null);
    }

    protected abstract KObject internalCreate(MetaClass clazz, LongRBTree universeTree, long key);

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
