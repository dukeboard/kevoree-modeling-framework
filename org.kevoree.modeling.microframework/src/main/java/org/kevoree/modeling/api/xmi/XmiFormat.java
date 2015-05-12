package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelFormat;
import org.kevoree.modeling.api.abs.AbstractKDeferWrapper;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.manager.KDataManager;

/**
 * Created by duke on 11/5/14.
 */
public class XmiFormat implements ModelFormat {

    private KDataManager _manager;

    private long _universe;

    private long _time;

    public XmiFormat(long p_universe, long p_time, KDataManager p_manager) {
        this._universe = p_universe;
        this._time = p_time;
        this._manager = p_manager;
    }

    @Override
    public KDefer<String> save(KObject model) {
        AbstractKDeferWrapper<String> wrapper = new AbstractKDeferWrapper<String>();
        XMIModelSerializer.save(model, wrapper.initCallback());
        return wrapper;
    }

    public KDefer<String> saveRoot() {
        final AbstractKDeferWrapper<String> wrapper = new AbstractKDeferWrapper<String>();
        _manager.getRoot(_universe, _time, new Callback<KObject>() {
            @Override
            public void on(KObject root) {
                if (root == null) {
                    wrapper.initCallback().on(null);
                } else {
                    XMIModelSerializer.save(root, wrapper.initCallback());
                }
            }
        });
        return wrapper;
    }

    @Override
    public KDefer<Throwable> load(String payload) {
        AbstractKDeferWrapper<Throwable> wrapper = new AbstractKDeferWrapper<Throwable>();
        XMIModelLoader.load(_manager, _universe, _time, payload, wrapper.initCallback());
        return wrapper;
    }
}
