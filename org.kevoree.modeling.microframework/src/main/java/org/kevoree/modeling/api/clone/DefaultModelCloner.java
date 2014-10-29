package org.kevoree.modeling.api.clone;

import org.kevoree.modeling.api.*;

public class DefaultModelCloner implements ModelCloner<KObject> {

    private KView factory;

    public DefaultModelCloner(KView factory) {
        this.factory = factory;
    }

    @Override
    public void clone(KObject originalObject, Callback<KObject> callback) {
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