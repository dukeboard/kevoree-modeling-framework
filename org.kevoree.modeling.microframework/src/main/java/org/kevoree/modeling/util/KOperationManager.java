package org.kevoree.modeling.util;

import org.kevoree.modeling.KObject;
import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KOperation;
import org.kevoree.modeling.meta.MetaOperation;
import org.kevoree.modeling.msg.KMessage;

public interface KOperationManager {

    void registerOperation(MetaOperation operation, KOperation callback, KObject target);

    void call(KObject source, MetaOperation operation, Object[] param, Callback<Object> callback);

    void operationEventReceived(KMessage operationEvent);
}
