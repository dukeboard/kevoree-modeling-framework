package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;

import java.util.HashMap;

public class MemoryKDataBase implements KDataBase {

    private final HashMap<String, String> backend = new HashMap<String, String>();

    public static boolean DEBUG = false;

    @Override
    public void put(String[][] payloads, Callback<Throwable> callback) {
        for (int i = 0; i < payloads.length; i++) {
            backend.put(payloads[i][0], payloads[i][1]);
            if (DEBUG) {
                System.out.println("PUT " + payloads[i][0] + "->" + payloads[i][1]);
            }
        }
        callback.on(null);
    }

    @Override
    public void get(String[] keys, ThrowableCallback<String[]> callback) {
        String[] values = new String[keys.length];
        for (int i = 0; i < keys.length; i++) {
            values[i] = backend.get(keys[i]);
            if (DEBUG) {
                System.out.println("GET " + keys[i] + "->" + values[i]);
            }
        }
        callback.on(values, null);
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> callback) {
        for (int i = 0; i < keys.length; i++) {
            backend.remove(keys[i]);
        }
        callback.on(null);
    }

    @Override
    public void commit(Callback<Throwable> callback) {
        callback.on(null);//noop
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

}