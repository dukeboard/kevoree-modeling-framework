package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KConfig;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelFormat;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.json.JsonFormat;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.traversal.selector.KSelector;
import org.kevoree.modeling.api.util.Checker;
import org.kevoree.modeling.api.xmi.XmiFormat;

public abstract class AbstractKView implements KView {

    protected long _time;

    protected long _universe;

    protected KDataManager _manager;

    protected AbstractKView(long p_universe, long _time, KDataManager p_manager) {
        this._universe = p_universe;
        this._time = _time;
        this._manager = p_manager;
    }

    @Override
    public long now() {
        return _time;
    }

    @Override
    public long universe() {
        return _universe;
    }

    @Override
    public KDefer<Throwable> setRoot(KObject elem) {
        AbstractKDeferWrapper<Throwable> task = new AbstractKDeferWrapper<Throwable>();
        ((AbstractKObject) elem).set_parent(KConfig.NULL_LONG, null);
        _manager.setRoot(elem, task.initCallback());
        return task;
    }

    @Override
    public KDefer<KObject> getRoot() {
        AbstractKDeferWrapper<KObject> task = new AbstractKDeferWrapper<KObject>();
        _manager.getRoot(_universe, _time, task.initCallback());
        return task;
    }

    @Override
    public KDefer<KObject[]> select(final String query) {
        final AbstractKDeferWrapper<KObject[]> task = new AbstractKDeferWrapper<KObject[]>();
        if (query == null || query.length() == 0) {
            task.initCallback().on(new KObject[0]);
        } else {
            _manager.getRoot(_universe, _time, new Callback<KObject>() {
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
        _manager.lookup(_universe, _time, kid, task.initCallback());
        return task;
    }

    @Override
    public KDefer<KObject[]> lookupAll(long[] keys) {
        AbstractKDeferWrapper<KObject[]> task = new AbstractKDeferWrapper<KObject[]>();
        _manager.lookupAllobjects(_universe, _time, keys, task.initCallback());
        return task;
    }

    @Override
    public KObject create(MetaClass clazz) {
        return _manager.model().create(clazz, _universe, _time);
    }

    @Override
    public KObject createByName(String metaClassName) {
        return create(_manager.model().metaModel().metaClass(metaClassName));
    }

    @Override
    public ModelFormat json() {
        return new JsonFormat(_universe, _time, _manager);
    }

    public ModelFormat xmi() {
        return new XmiFormat(_universe, _time, _manager);
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
            return casted._time == _time && casted._universe == _universe;
        }
    }

}
