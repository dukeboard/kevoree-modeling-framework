package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDefer;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelFormat;
import org.kevoree.modeling.api.abs.AbstractKDeferWrapper;

/**
 * Created by duke on 11/5/14.
 */
public class XmiFormat implements ModelFormat {

    private KView _view;

    public XmiFormat(KView p_view) {
        this._view = p_view;
    }

    @Override
    public KDefer<String> save(KObject model) {
        AbstractKDeferWrapper<String> wrapper = new AbstractKDeferWrapper<String>();
        XMIModelSerializer.save(model, wrapper.initCallback());
        return wrapper;
    }

    public KDefer<String> saveRoot() {
        AbstractKDeferWrapper<String> wrapper = new AbstractKDeferWrapper<String>();
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
    public KDefer<Throwable> load(String payload) {
        AbstractKDeferWrapper<Throwable> wrapper = new AbstractKDeferWrapper<Throwable>();
        XMIModelLoader.load(this._view, payload, wrapper.initCallback());
        return wrapper;
    }
}
