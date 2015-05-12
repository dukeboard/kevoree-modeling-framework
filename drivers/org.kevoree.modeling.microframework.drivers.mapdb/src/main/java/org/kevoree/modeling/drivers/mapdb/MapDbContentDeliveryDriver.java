package org.kevoree.modeling.drivers.mapdb;

import org.kevoree.modeling.api.*;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.msg.KMessage;

/**
 * Created by duke on 12/05/15.
 */
public class MapDbContentDeliveryDriver implements KContentDeliveryDriver {
    @Override
    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback) {

    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {

    }

    @Override
    public void put(KContentPutRequest request, Callback<Throwable> error) {

    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {

    }

    @Override
    public void connect(Callback<Throwable> callback) {

    }

    @Override
    public void close(Callback<Throwable> callback) {

    }

    @Override
    public void registerListener(long groupId, KObject origin, KEventListener listener) {

    }

    @Override
    public void registerMultiListener(long groupId, KUniverse origin, long[] objects, KEventMultiListener listener) {

    }

    @Override
    public void unregisterGroup(long groupId) {

    }

    @Override
    public void send(KMessage msgs) {

    }

    @Override
    public void setManager(KDataManager manager) {

    }
}
