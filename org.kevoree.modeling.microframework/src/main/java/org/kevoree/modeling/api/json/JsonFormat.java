package org.kevoree.modeling.api.json;


import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelFormat;
import org.kevoree.modeling.api.ThrowableCallback;
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
    public void save(KObject model, ThrowableCallback<String> callback) {
        if (Checker.isDefined(model) && Checker.isDefined(callback)) {
            JsonModelSerializer.serialize(model, callback);
        } else {
            throw new RuntimeException("one parameter is null");
        }
    }

    @Override
    public void saveRoot(ThrowableCallback<String> callback) {
        if (Checker.isDefined(callback)) {
            _view.universe().model().storage().getRoot(_view, new Callback<KObject>() {
                @Override
                public void on(KObject root) {
                    if (root == null) {
                        callback.on("", new Exception("Root not set yet !"));
                    } else {
                        JsonModelSerializer.serialize(root, callback);
                    }
                }
            });
        } else {
            throw new RuntimeException("one parameter is null");
        }
    }

    @Override
    public void load(String payload, Callback<Throwable> callback) {
        if (Checker.isDefined(payload) && Checker.isDefined(callback)) {
            JsonModelLoader.load(_view, payload, callback);
        } else {
            throw new RuntimeException("one parameter is null");
        }
    }

}
