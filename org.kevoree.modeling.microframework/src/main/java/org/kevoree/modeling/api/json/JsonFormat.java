package org.kevoree.modeling.api.json;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelFormat;
import org.kevoree.modeling.api.abs.AbstractKDeferWrapper;
import org.kevoree.modeling.api.util.Checker;

public class JsonFormat implements ModelFormat {

    public static final String KEY_META = "@meta";

    public static final String KEY_UUID = "@uuid";

    public static final String KEY_ROOT = "@root";

    public static final String PARENT_META = "@parent";

    public static final String PARENT_REF_META = "@ref";

    public static final String INBOUNDS_META = "@inbounds";

    private KView _view;

    public JsonFormat(KView p_view) {
        this._view = p_view;
    }

    private static final String NULL_PARAM_MSG = "one parameter is null";

    @Override
    public KDefer<String> save(KObject model) {
        if (Checker.isDefined(model)) {
            AbstractKDeferWrapper<String> wrapper = new AbstractKDeferWrapper<String>();
            JsonModelSerializer.serialize(model, wrapper.initCallback());
            return wrapper;
        } else {
            throw new RuntimeException(NULL_PARAM_MSG);
        }
    }

    @Override
    public KDefer<String> saveRoot() {
        final AbstractKDeferWrapper<String> wrapper = new AbstractKDeferWrapper<String>();
        _view.universe().model().manager().getRoot(_view, new Callback<KObject>() {
            @Override
            public void on(KObject root) {
                if (root == null) {
                    wrapper.initCallback().on(null);
                } else {
                    JsonModelSerializer.serialize(root, wrapper.initCallback());
                }
            }
        });
        return wrapper;
    }

    @Override
    public KDefer<Throwable> load(String payload) {
        if (Checker.isDefined(payload)) {
            AbstractKDeferWrapper<Throwable> wrapper = new AbstractKDeferWrapper<Throwable>();
            JsonModelLoader.load(_view, payload, wrapper.initCallback());
            return wrapper;
        } else {
            throw new RuntimeException(NULL_PARAM_MSG);
        }
    }

}
