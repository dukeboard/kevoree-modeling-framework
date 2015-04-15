package org.kevoree.modeling.api.data.cdn;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.msg.KMessage;

public interface KContentDeliveryDriver {

    void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback);

    void get(KContentKey[] keys, ThrowableCallback<String[]> callback);

    void put(KContentPutRequest request, Callback<Throwable> error);

    void remove(String[] keys, Callback<Throwable> error);

    void connect(Callback<Throwable> callback);

    void close(Callback<Throwable> callback);

    void registerListener(long groupId,KObject origin, KEventListener listener);

    void registerMultiListener(long groupId,KUniverse origin, long[] objects, KEventMultiListener listener);

    void unregisterGroup(long groupId);

    void send(KMessage msgs);

    void setManager(KDataManager manager);

}