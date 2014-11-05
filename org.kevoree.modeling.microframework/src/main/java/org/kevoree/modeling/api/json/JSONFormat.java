package org.kevoree.modeling.api.json;


import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelFormat;
import org.kevoree.modeling.api.ThrowableCallback;

/**
 * Created by duke on 11/5/14.
 */
public class JsonFormat implements ModelFormat {

    private KView _view;

    public JsonFormat(KView p_view) {
        this._view = p_view;
    }

    @Override
    public void save(KObject model, ThrowableCallback<String> callback) {
        JsonModelSerializer.serialize(model, callback);
    }

    @Override
    public void load(String payload, Callback<Throwable> callback) {
        JsonModelLoader.load(_view, payload, callback);
    }
}
