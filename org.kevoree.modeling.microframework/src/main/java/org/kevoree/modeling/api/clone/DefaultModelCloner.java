package org.kevoree.modeling.api.clone;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ModelCloner;

public class DefaultModelCloner implements ModelCloner<KObject> {

    private KView _factory;

    public DefaultModelCloner(KView p_factory) {
        this._factory = p_factory;
    }

    @Override
    public void clone(KObject originalObject, Callback<KObject> callback) {
        if (originalObject == null || originalObject.view() == null || originalObject.view().dimension() == null) {
            callback.on(null);
        } else {
            originalObject.view().dimension().fork(new Callback<KDimension>() {
                @Override
                public void on(KDimension o) {
                    o.time(originalObject.view().now()).lookup(originalObject.uuid(), new Callback<KObject>() {
                        @Override
                        public void on(KObject clonedObject) {
                            callback.on(clonedObject);
                        }
                    });
                }
            });
        }


    }

}