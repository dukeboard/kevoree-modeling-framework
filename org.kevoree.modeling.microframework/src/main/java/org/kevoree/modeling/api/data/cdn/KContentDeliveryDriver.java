package org.kevoree.modeling.api.data.cdn;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KCache;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.msg.KEventMessage;
import org.kevoree.modeling.api.msg.KMessage;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 11:30
 */

public interface KContentDeliveryDriver {

    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback);

    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback);

    public void put(KContentPutRequest request, Callback<Throwable> error);

    public void remove(String[] keys, Callback<Throwable> error);

    public void connect(Callback<Throwable> callback);

    public void close(Callback<Throwable> callback);

    void registerListener(KObject origin, KEventListener listener, boolean subTree);

    void unregister(KObject origin, KEventListener listener, boolean subTree);

    void send(KEventMessage[] msgs);

    void sendOperation(KEventMessage operationMessage);

    void setManager(KDataManager manager);

}