package org.kevoree.modeling.api.util;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KOperation;
import org.kevoree.modeling.api.meta.MetaOperation;


/**
 * Created by gregory.nain on 28/11/14.
 */
public interface KOperationManager {

    void registerOperation(MetaOperation operation, KOperation callback);
    void call(KObject source, MetaOperation operation, Object[] param, Callback<Object> callback);
    public void operationEventReceived(KEvent operationEvent);
}
