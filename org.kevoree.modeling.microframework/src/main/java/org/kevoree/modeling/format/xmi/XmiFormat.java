package org.kevoree.modeling.format.xmi;

import org.kevoree.modeling.KObject;
import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KModelFormat;
import org.kevoree.modeling.memory.KDataManager;

public class XmiFormat implements KModelFormat {

    private KDataManager _manager;

    private long _universe;

    private long _time;

    public XmiFormat(long p_universe, long p_time, KDataManager p_manager) {
        this._universe = p_universe;
        this._time = p_time;
        this._manager = p_manager;
    }

    @Override
    public void save(KObject model, Callback<String> cb) {
        XMIModelSerializer.save(model, cb);
    }

    public void saveRoot(Callback<String> cb) {
        _manager.getRoot(_universe, _time, new Callback<KObject>() {
            @Override
            public void on(KObject root) {
                if (root == null) {
                    if (cb != null) {
                        cb.on(null);
                    }
                } else {
                    XMIModelSerializer.save(root, cb);
                }
            }
        });
    }

    @Override
    public void load(String payload, Callback cb) {
        XMIModelLoader.load(_manager, _universe, _time, payload, cb);
    }
}
