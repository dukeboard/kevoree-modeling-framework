package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KOperation;
import org.kevoree.modeling.api.meta.MetaOperation;
import org.kevoree.modeling.api.msg.KMessage;


/**
 * Created by gregory.nain on 28/11/14.
 */
public interface KOperationManager {

    void registerOperation(MetaOperation operation, KOperation callback, KObject target);

    void call(KObject source, MetaOperation operation, Object[] param, Callback<Object> callback);

    public void operationEventReceived(KMessage operationEvent);
}
