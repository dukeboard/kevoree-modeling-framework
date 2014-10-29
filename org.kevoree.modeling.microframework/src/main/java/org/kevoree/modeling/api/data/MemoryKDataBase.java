package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.abs.AbstractKDataBase;

import java.util.HashMap;

public class MemoryKDataBase extends AbstractKDataBase {

    private final HashMap<String, String> backend = new HashMap<String, String>();

    @Override
    public void put(String[][] payloads, Callback<Throwable> callback) {
        for (int i = 0; i < payloads.length; i++) {
            backend.put(payloads[i][0], payloads[i][1]);
        }
        callback.on(null);
    }

    @Override
    public void get(String[] keys, Callback<String[]> callback, Callback<Throwable> error) {
        String[] values = new String[keys.length];
        for (int i = 0; i < keys.length; i++) {
            values[i] = backend.get(keys[i]);
        }
        callback.on(values);
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
        //noop
    }

    @Override
    public void close(Callback<Throwable> callback) {
        System.out.println("Memory DB Cleared");
        backend.clear();
    }

}