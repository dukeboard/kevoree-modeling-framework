package org.kevoree.modeling.api.data.cdn;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.manager.KDataManager;
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

    void registerListener(long groupId,KObject origin, KEventListener listener);

    void registerMultiListener(long groupId,KUniverse origin, long[] objects, KEventMultiListener listener);

    void unregisterGroup(long groupId);

    void send(KMessage msgs);

    void setManager(KDataManager manager);

}