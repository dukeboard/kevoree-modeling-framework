package org.kevoree.modeling.databases.websocket;

import com.eclipsesource.json.JsonArray;
import io.undertow.websockets.core.AbstractReceiveListener;
import io.undertow.websockets.core.BufferedTextMessage;
import io.undertow.websockets.core.WebSocketChannel;
import io.undertow.websockets.core.WebSockets;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cache.MultiLayeredMemoryCache;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.msg.KAtomicGetRequest;
import org.kevoree.modeling.api.msg.KAtomicGetResult;
import org.kevoree.modeling.api.msg.KEventMessage;
import org.kevoree.modeling.api.msg.KGetRequest;
import org.kevoree.modeling.api.msg.KGetResult;
import org.kevoree.modeling.api.msg.KMessage;
import org.kevoree.modeling.api.msg.KMessageLoader;
import org.kevoree.modeling.api.msg.KPutRequest;
import org.kevoree.modeling.api.msg.KPutResult;
import org.kevoree.modeling.api.util.LocalEventListeners;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.IntUnaryOperator;

/**
 * Created by duke on 24/02/15.
 */
public class WebSocketClient extends AbstractReceiveListener implements KContentDeliveryDriver {

    private UndertowWSClient _client;

    private LocalEventListeners _localEventListeners = new LocalEventListeners();
    private KDataManager _manager;
    private AtomicInteger _atomicInteger = null;

    private Map<Long, ThrowableCallback<String[]>> _getCallbacks = new HashMap<>();
    private Map<Long, Callback<Throwable>> _putCallbacks = new HashMap<>();
    private Map<Long, ThrowableCallback<String>> _atomicGetCallbacks = new HashMap<>();



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
        return _atomicInteger.getAndUpdate(new IntUnaryOperator() {
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
    protected void onFullTextMessage(WebSocketChannel channel, BufferedTextMessage message) throws IOException {
        String data = message.getData();

        ArrayList<KEventMessage> _events = null;
        JsonArray payload = null;

        // parse
        JsonArray messages = JsonArray.readFrom(data);
        for(int i = 0; i < messages.size(); i++) {
            String rawMessage = messages.get(i).asString();
            KMessage msg = KMessageLoader.load(rawMessage);
            switch (msg.type()) {
                case KMessageLoader.GET_RES_TYPE:{
                    KGetResult getResult = (KGetResult) msg;
                    _getCallbacks.remove(getResult.id).on(getResult.values, null);
                }break;
                case KMessageLoader.PUT_RES_TYPE:{
                    KPutResult putResult = (KPutResult) msg;
                    _putCallbacks.remove(putResult.id).on(null);
                }break;
                case KMessageLoader.ATOMIC_OPERATION_RESULT_TYPE:{
                    KAtomicGetResult atomicGetResult = (KAtomicGetResult) msg;
                    _atomicGetCallbacks.remove(atomicGetResult.id).on(atomicGetResult.value, null);
                }break;
                default:{
                    System.err.println("MessageType not supported:" + msg.type());
                }
            }
        }

    }

    @Override
    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback) {
        KAtomicGetRequest atomicGetRequest = new KAtomicGetRequest();
        atomicGetRequest.id = nextKey();
        atomicGetRequest.key = key;
        atomicGetRequest.operation = operation;
        _atomicGetCallbacks.put(atomicGetRequest.id, callback);
        WebSockets.sendText("[" + atomicGetRequest.json() + "]", _client.getChannel(), null);
    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        KGetRequest getRequest = new KGetRequest();
        getRequest.keys = keys;
        getRequest.id = nextKey();
        _getCallbacks.put(getRequest.id, callback);
        WebSockets.sendText("[" + getRequest.json() + "]", _client.getChannel(), null);
    }

    @Override
    public void put(KContentPutRequest request, Callback<Throwable> error) {
        KPutRequest putRequest = new KPutRequest();
        putRequest.request = request;
        putRequest.id = nextKey();
        _putCallbacks.put(putRequest.id, error);
        WebSockets.sendText("[" + putRequest.json() + "]", _client.getChannel(), null);
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {
        //TODO
    }


    @Override
    public void registerListener(Object p_origin, KEventListener p_listener, Object p_scope) {
        _localEventListeners.registerListener(p_origin, p_listener, p_scope);
    }

    @Override
    public void unregister(KEventListener p_listener) {
        _localEventListeners.unregister(p_listener);
    }

    @Override
    public void send(KEventMessage[] msgs) {

        //sendLocal
        fireLocalMessages(msgs);

        //Preparing for remotes
        final JsonArray payload = new JsonArray();
        for(int i = 0; i < msgs.length; i++) {
            payload.add(msgs[i].json());
        }
        WebSockets.sendText(payload.toString(), _client.getChannel(), null);
    }

    @Override
    public void setManager(KDataManager p_manager) {
        this._manager = p_manager;
    }

    private void fireLocalMessages(KEventMessage[] msgs) {
        KContentKey _previousKey = null;
        KView _currentView = null;

        for(int i = 0; i < msgs.length; i++) {
            KContentKey sourceKey = msgs[i].key;
            if(_previousKey == null || sourceKey.part1() != _previousKey.part1() || sourceKey.part2() != _previousKey.part2()) {
                _currentView = _manager.model().universe(sourceKey.part1()).time(sourceKey.part2());
                _previousKey = sourceKey;
            }
            final int tempIndex = i;
            _currentView.lookup(sourceKey.part3()).then(new Callback<KObject>() {
                public void on(KObject kObject) {
                    if (kObject != null) {
                        Meta[] modifiedMetas = new Meta[msgs[tempIndex].meta.length];
                        for(int j = 0; j < msgs[tempIndex].meta.length; j++) {
                            modifiedMetas[tempIndex] = kObject.metaClass().meta(msgs[tempIndex].meta[j]);
                        }
                        _localEventListeners.dispatch(kObject, modifiedMetas);
                    }
                }
            });
        }
    }

}
