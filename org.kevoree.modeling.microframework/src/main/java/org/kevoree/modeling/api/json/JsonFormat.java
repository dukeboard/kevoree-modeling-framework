package org.kevoree.modeling.api.json;


import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelFormat;
import org.kevoree.modeling.api.abs.AbstractKDeferWrapper;
import org.kevoree.modeling.api.util.Checker;

/**
 * Created by duke on 11/5/14.
 */
public class JsonFormat implements ModelFormat {

    private KView _view;

    public JsonFormat(KView p_view) {
        this._view = p_view;
    }

    @Override
    public KDefer<String> save(KObject model) {
        if (Checker.isDefined(model)) {
            AbstractKDeferWrapper<String> wrapper = new AbstractKDeferWrapper<String>();
            JsonModelSerializer.serialize(model, wrapper.initCallback());
            return wrapper;
        } else {
            throw new RuntimeException("one parameter is null");
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
            throw new RuntimeException("one parameter is null");
        }
    }

}
