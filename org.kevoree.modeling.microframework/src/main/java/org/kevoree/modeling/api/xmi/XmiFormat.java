package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.abs.AbstractKTaskWrapper;
import org.kevoree.modeling.api.util.Checker;

/**
 * Created by duke on 11/5/14.
 */
public class XmiFormat implements ModelFormat {

    private KView _view;

    public XmiFormat(KView p_view) {
        this._view = p_view;
    }

    @Override
    public KTask<String> save(KObject model) {
        AbstractKTaskWrapper<String> wrapper = new AbstractKTaskWrapper<String>();
        XMIModelSerializer.save(model, wrapper.initCallback());
        return wrapper;
    }

    public KTask<String> saveRoot() {
        AbstractKTaskWrapper<String> wrapper = new AbstractKTaskWrapper<String>();
        _view.universe().model().manager().getRoot(_view, new Callback<KObject>() {
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
    public KTask<Throwable> load(String payload) {
        AbstractKTaskWrapper<Throwable> wrapper = new AbstractKTaskWrapper<Throwable>();
        XMIModelLoader.load(this._view, payload, wrapper.initCallback());
        return wrapper;
    }
}
