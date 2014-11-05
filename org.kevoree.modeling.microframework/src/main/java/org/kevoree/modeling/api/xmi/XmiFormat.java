package org.kevoree.modeling.api.xmi;

import org.kevoree.modeling.api.*;

/**
 * Created by duke on 11/5/14.
 */
public class XmiFormat implements ModelFormat {

    private KView _view;

    public XmiFormat(KView p_view) {
        this._view = p_view;
    }

    @Override
    public void save(KObject model, ThrowableCallback<String> callback) {
        XMIModelSerializer.save(model, callback);
    }

    @Override
    public void load(String payload, Callback<Throwable> callback) {
        XMIModelLoader.load(this._view, payload, callback);
    }
}
