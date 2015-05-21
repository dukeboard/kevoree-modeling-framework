package org.kevoree.modeling.api.abs;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.KModelFormat;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.json.JsonFormat;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.traversal.selector.KSelector;
import org.kevoree.modeling.api.util.Checker;
import org.kevoree.modeling.api.xmi.XmiFormat;

public abstract class AbstractKView implements KView {

    final protected long _time;

    final protected long _universe;

    final protected KDataManager _manager;

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
    public void setRoot(KObject elem, Callback cb) {
        _manager.setRoot(elem, cb);
    }

    @Override
    public void getRoot(Callback cb) {
        _manager.getRoot(_universe, _time, cb);
    }

    @Override
    public void select(final String query, Callback<KObject[]> cb) {
        if (Checker.isDefined(cb)) {
            if (query == null || query.length() == 0) {
                cb.on(new KObject[0]);
            } else {
                _manager.getRoot(_universe, _time, new Callback<KObject>() {
                    @Override
                    public void on(KObject rootObj) {
                        if (rootObj == null) {
                            cb.on(new KObject[0]);
                        } else {
                            String cleanedQuery = query;
                            if (query.length() == 1 && query.charAt(0) == '/') {
                                KObject[] param = new KObject[1];
                                param[0] = rootObj;
                                cb.on(param);
                            } else {
                                if (cleanedQuery.charAt(0) == '/') {
                                    cleanedQuery = cleanedQuery.substring(1);
                                }
                                KSelector.select(rootObj, cleanedQuery, cb);
                            }
                        }
                    }
                });
            }
        }
    }

    @Override
    public void lookup(long kid, Callback<KObject> cb) {
        _manager.lookup(_universe, _time, kid, cb);
    }

    @Override
    public void lookupAll(long[] keys, Callback<KObject[]> cb) {
        _manager.lookupAllobjects(_universe, _time, keys, cb);
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
    public KModelFormat json() {
        return new JsonFormat(_universe, _time, _manager);
    }

    public KModelFormat xmi() {
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
