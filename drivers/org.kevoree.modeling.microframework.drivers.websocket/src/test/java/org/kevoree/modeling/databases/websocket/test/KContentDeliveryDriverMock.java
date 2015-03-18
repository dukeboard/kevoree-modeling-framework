package org.kevoree.modeling.databases.websocket.test;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.msg.KMessage;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.CountDownLatch;

/**
 * Created by duke on 10/03/15.
 */
public class KContentDeliveryDriverMock implements KContentDeliveryDriver {

    public HashMap<String, String> alreadyPut = new HashMap<String, String>();

    @Override
    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback) {
        callback.on("0", null);
    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        String[] values = new String[keys.length];
        for (int i = 0; i < keys.length; i++) {
            values[i] = keys[i].toString();
        }
        callback.on(values, null);
    }

    @Override
    public void put(KContentPutRequest request, Callback<Throwable> error) {
        for (int i = 0; i < request.size(); i++) {
            alreadyPut.put(request.getKey(i).toString(), request.getContent(i));
        }
        error.on(null);
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {

    }

    @Override
    public void connect(Callback<Throwable> callback) {
        callback.on(null);
    }

    @Override
    public void close(Callback<Throwable> callback) {

    }

    @Override
    public void registerListener(KObject origin, KEventListener listener) {

    }

    @Override
    public void unregister(KObject origin, KEventListener listener) {

    }

    @Override
    public void unregisterAll() {

    }

    public ArrayList<KMessage> recMessages = new ArrayList<KMessage>();

    public CountDownLatch msgCounter = new CountDownLatch(1);

    @Override
    public void send(KMessage msgs) {
        recMessages.add(msgs);
        msgCounter.countDown();
    }

    @Override
    public void setManager(KDataManager manager) {

    }
}
