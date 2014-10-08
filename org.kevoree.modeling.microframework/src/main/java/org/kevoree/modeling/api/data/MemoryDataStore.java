package org.kevoree.modeling.api.data;

import org.kevoree.modeling.api.Callback;

import java.util.HashMap;

public class MemoryDataStore extends AbstractDataStore {

    private HashMap<String, String> backend = new HashMap<String, String>();

    @Override
    public void put(String key, String value, Callback<Boolean> callback, Callback<Exception> error) {
        backend.put(key, value);
        callback.on(true);
    }

    @Override
    public void get(String key, Callback<String> callback, Callback<Exception> error) {
        callback.on(backend.get(key));
    }

    @Override
    public void remove(String key, Callback<Boolean> callback, Callback<Exception> error) {
        backend.remove(key);
        callback.on(true);
    }

    @Override
    public void commit(Callback<String> callback, Callback<Exception> error) {
        //noop
    }

    @Override
    public void close(Callback<String> callback, Callback<Exception> error) {
        backend.clear();
    }

}