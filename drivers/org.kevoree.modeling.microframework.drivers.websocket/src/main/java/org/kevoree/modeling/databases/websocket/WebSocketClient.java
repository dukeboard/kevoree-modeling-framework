package org.kevoree.modeling.databases.websocket;

import io.undertow.websockets.core.AbstractReceiveListener;
import io.undertow.websockets.core.WebSockets;
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
import org.kevoree.modeling.api.msg.KGetRequest;
import org.kevoree.modeling.api.msg.KMessage;
import org.kevoree.modeling.api.msg.KPutRequest;
import org.kevoree.modeling.api.util.LocalEventListeners;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.IntUnaryOperator;

/**
 * Created by duke on 24/02/15.
 */
public class WebSocketClient extends AbstractReceiveListener implements KContentDeliveryDriver {

    private UndertowWSClient _client;

    private MultiLayeredMemoryCache _cache = new MultiLayeredMemoryCache();
    private LocalEventListeners localEventListeners = new LocalEventListeners();
    private KDataManager _manager;
    private AtomicInteger atomicInteger = null;

    private Map<Long, ThrowableCallback<String[]>> getCallbacks = new HashMap<>();
    private Map<Long, Callback<Throwable>> putCallbacks = new HashMap<>();



    public WebSocketClient(String url) {
        _client = new UndertowWSClient(url);
    }


    @Override
    public void connect(Callback<Throwable> callback) {
        _client.connect(this);
        callback.on(null);
    }

    @Override
    public void close(Callback<Throwable> callback) {
        _client.close();
        callback.on(null);
    }

    public long nextKey() {
        return atomicInteger.getAndUpdate(new IntUnaryOperator() {
            @Override
            public int applyAsInt(int operand) {
                if (operand == 999) {
                    return 0;
                } else {
                    return operand + 1;
                }
            }
        });
    }


    @Override
    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback) {
        //TODO
    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        KGetRequest getRequest = new KGetRequest();
        getRequest.keys = keys;
        getRequest.id = nextKey();
        getCallbacks.put(getRequest.id, callback);
        WebSockets.sendText("[" + getRequest.json() + "]", _client.getChannel(), null);
    }

    @Override
    public void put(KContentPutRequest request, Callback<Throwable> error) {
        KPutRequest putRequest = new KPutRequest();
        putRequest.request = request;
        putRequest.id = nextKey();
        putCallbacks.put(putRequest.id, error);
        WebSockets.sendText("[" + putRequest.json() + "]", _client.getChannel(), null);
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {
        //TODO
    }



    @Override
    public KCache cache() {
        return _cache;
    }


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


    @Override
    public void setManager(KDataManager p_manager) {
        this._manager = p_manager;
    }
}
