package org.kevoree.modeling.databases.websocket;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KCache;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cache.MultiLayeredMemoryCache;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.msg.KMessage;
import org.kevoree.modeling.api.util.LocalEventListeners;

/**
 * Created by duke on 24/02/15.
 */
public class WebSocketClient implements KContentDeliveryDriver {

    private String _url;

    public WebSocketClient(String url) {
        this._url = url;
    }

    @Override
    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback) {
        //TODO
    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        //TODO
    }

    @Override
    public void put(KContentPutRequest request, Callback<Throwable> error) {
        //TODO
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {
        //TODO
    }

    @Override
    public void connect(Callback<Throwable> callback) {
        //TODO
    }

    @Override
    public void close(Callback<Throwable> callback) {
        //TODO
    }

    private MultiLayeredMemoryCache _cache = new MultiLayeredMemoryCache();

    @Override
    public KCache cache() {
        return _cache;
    }

    private LocalEventListeners localEventListeners = new LocalEventListeners();

    @Override
    public void registerListener(Object p_origin, KEventListener p_listener, Object p_scope) {
        localEventListeners.registerListener(p_origin, p_listener, p_scope);
    }

    @Override
    public void unregister(KEventListener p_listener) {
        localEventListeners.unregister(p_listener);
    }

    @Override
    public void send(KMessage[] msgs) {
        //TODO
    }

    private KDataManager _manager;

    @Override
    public void setManager(KDataManager p_manager) {
        this._manager = p_manager;
    }
}
