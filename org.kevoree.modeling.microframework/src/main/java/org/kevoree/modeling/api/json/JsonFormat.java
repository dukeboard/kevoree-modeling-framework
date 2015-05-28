package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KModelFormat;
import org.kevoree.modeling.api.data.KDataManager;
import org.kevoree.modeling.api.util.Checker;

public class JsonFormat implements KModelFormat {

    public static final String KEY_META = "@class";

    public static final String KEY_UUID = "@uuid";

    public static final String KEY_ROOT = "@root";

    private KDataManager _manager;

    private long _universe;

    private long _time;

    public JsonFormat(long p_universe, long p_time, KDataManager p_manager) {
        this._manager = p_manager;
        this._universe = p_universe;
        this._time = p_time;
    }

    private static final String NULL_PARAM_MSG = "one parameter is null";

    @Override
    public void save(KObject model, Callback<String> cb) {
        if (Checker.isDefined(model) && Checker.isDefined(cb)) {
            JsonModelSerializer.serialize(model, cb);
        } else {
            throw new RuntimeException(NULL_PARAM_MSG);
        }
    }

    @Override
    public void saveRoot(Callback<String> cb) {
        if (Checker.isDefined(cb)) {
            _manager.getRoot(_universe, _time, new Callback<KObject>() {
                @Override
                public void on(KObject root) {
                    if (root == null) {
                        cb.on(null);
                    } else {
                        JsonModelSerializer.serialize(root, cb);
                    }
                }
            });
        }
    }

    @Override
    public void load(String payload, Callback cb) {
        if (Checker.isDefined(payload)) {
            JsonModelLoader.load(_manager, _universe, _time, payload, cb);
        } else {
            throw new RuntimeException(NULL_PARAM_MSG);
        }
    }

}
