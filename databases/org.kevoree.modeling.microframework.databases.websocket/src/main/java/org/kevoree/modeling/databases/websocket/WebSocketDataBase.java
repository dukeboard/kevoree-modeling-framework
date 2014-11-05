package org.kevoree.modeling.databases.websocket;

import io.undertow.Undertow;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.KDataBase;

/**
 * Created by duke on 11/5/14.
 */
public class WebSocketDataBase implements KDataBase {

    private KDataBase wrapped = null;

    private Undertow server = null;

    public WebSocketDataBase(){

    }

    public WebSocketDataBase(KDataBase wrapped, int port) {
        this.wrapped = wrapped;
    }

    @Override
    public void get(String[] keys, ThrowableCallback<String[]> callback) {

    }

    @Override
    public void put(String[][] payloads, Callback<Throwable> error) {

    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {

    }

    @Override
    public void commit(Callback<Throwable> error) {

    }

    @Override
    public void close(Callback<Throwable> error) {

    }
}
