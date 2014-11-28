package org.kevoree.modeling.api.event;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.KOperation;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaOperation;

/**
 * Created by gregory.nain on 11/11/14.
 */
public interface KEventBroker {

    void registerListener(Object origin, ModelListener listener, ListenerScope scope);

    void registerOperation(MetaOperation operation, KOperation callback);

    void notify(KEvent event);

    void flush(Long dimensionKey);

    //TODO maybe move into an operation manager
    void call(KObject source, MetaOperation operation, Object[] param, Callback<Object> callback);

}
