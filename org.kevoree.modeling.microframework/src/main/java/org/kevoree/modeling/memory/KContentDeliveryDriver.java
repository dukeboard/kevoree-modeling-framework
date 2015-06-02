package org.kevoree.modeling.memory;

import org.kevoree.modeling.Callback;
import org.kevoree.modeling.KEventListener;
import org.kevoree.modeling.KEventMultiListener;
import org.kevoree.modeling.KObject;
import org.kevoree.modeling.KUniverse;
import org.kevoree.modeling.ThrowableCallback;
import org.kevoree.modeling.memory.cdn.AtomicOperation;
import org.kevoree.modeling.memory.cdn.KContentPutRequest;
import org.kevoree.modeling.msg.KMessage;

public interface KContentDeliveryDriver {

    void get(KContentKey[] keys, ThrowableCallback<String[]> callback);

    void atomicGetIncrement(KContentKey key, ThrowableCallback<Short> cb);

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