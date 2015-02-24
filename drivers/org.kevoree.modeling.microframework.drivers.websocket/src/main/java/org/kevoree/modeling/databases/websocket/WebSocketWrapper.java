package org.kevoree.modeling.databases.websocket;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KCache;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.msg.KMessage;

/**
 * Created by duke on 24/02/15.
 */
public class WebSocketWrapper implements KContentDeliveryDriver {

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
    public KCache cache() {
        return null;
    }

    @Override
    public void registerListener(Object origin, KEventListener listener, Object scope) {

    }

    @Override
    public void unregister(KEventListener listener) {

    }

    @Override
    public void send(KMessage[] msgs) {

    }

    @Override
    public void setManager(KDataManager manager) {

    }
}
