package org.kevoree.modeling.api.operation;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KObject;

public class DefaultModelCloner {

    public static <A extends KObject> void clone(final A originalObject, final Callback<A> callback) {
        if (originalObject == null || originalObject.view() == null || originalObject.view().universe() == null) {
            callback.on(null);
        } else {
            originalObject.view().universe().split(new Callback<KUniverse>() {
                @Override
                public void on(KUniverse o) {
                    o.time(originalObject.view().now()).lookup(originalObject.uuid(), new Callback<KObject>() {
                        @Override
                        public void on(KObject clonedObject) {
                            callback.on((A)clonedObject);
                        }
                    });
                }
            });
        }
    }

}