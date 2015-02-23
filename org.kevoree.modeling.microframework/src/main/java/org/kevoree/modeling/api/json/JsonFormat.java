package org.kevoree.modeling.api.json;


import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.abs.AbstractKTaskWrapper;
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
    public KTask<String> save(KObject model) {
        if (Checker.isDefined(model)) {
            AbstractKTaskWrapper<String> wrapper = new AbstractKTaskWrapper<String>();
            JsonModelSerializer.serialize(model, wrapper.initCallback());
            return wrapper;
        } else {
            throw new RuntimeException("one parameter is null");
        }
    }

    @Override
    public KTask<String> saveRoot() {
        AbstractKTaskWrapper<String> wrapper = new AbstractKTaskWrapper<String>();
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
    public KTask<Throwable> load(String payload) {
        if (Checker.isDefined(payload)) {
            AbstractKTaskWrapper<Throwable> wrapper = new AbstractKTaskWrapper<Throwable>();
            JsonModelLoader.load(_view, payload, wrapper.initCallback());
            return wrapper;
        } else {
            throw new RuntimeException("one parameter is null");
        }
    }

}
