package org.kevoree.modeling.api.data.cdn;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KCache;
import org.kevoree.modeling.api.data.cache.KContentKey;

import java.util.HashMap;

public class MemoryKContentDeliveryDriver implements KContentDeliveryDriver {

    private final HashMap<String, String> backend = new HashMap<String, String>();

    public static boolean DEBUG = false;

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        String[] values = new String[keys.length];
        for (int i = 0; i < keys.length; i++) {
            values[i] = backend.get(keys[i].toString());
            if (DEBUG) {
                System.out.println("GET " + keys[i] + "->" + values[i]);
            }
        }
        if (callback != null) {
            callback.on(values, null);
        }
    }

    @Override
    public void put(KContentPutRequest p_request, Callback<Throwable> p_callback) {
        for (int i = 0; i < p_request.size(); i++) {
            backend.put(p_request.getKey(i).toString(), p_request.getContent(i));
            if (DEBUG) {
                System.out.println("PUT " + p_request.getKey(i).toString() + "->" + p_request.getContent(i));
            }
        }
        if (p_callback != null) {
            p_callback.on(null);
        }
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> callback) {
        for (int i = 0; i < keys.length; i++) {
            backend.remove(keys[i]);
        }
        if (callback != null) {
            callback.on(null);
        }
    }

    @Override
    public void commit(Callback<Throwable> callback) {
        if (callback != null) {
            callback.on(null);//noop
        }
    }

    @Override
    public void connect(Callback<Throwable> callback) {
        if (callback != null) {
            callback.on(null);
        }
    }

    @Override
    public void close(Callback<Throwable> callback) {
        backend.clear();
    }

    @Override
    public KCache cache() {
        return null;
    }

}