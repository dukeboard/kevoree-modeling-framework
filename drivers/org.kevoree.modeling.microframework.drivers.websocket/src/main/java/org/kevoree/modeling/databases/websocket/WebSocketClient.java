package org.kevoree.modeling.databases.websocket;

import com.eclipsesource.json.JsonArray;
import io.undertow.websockets.core.AbstractReceiveListener;
import io.undertow.websockets.core.BufferedTextMessage;
import io.undertow.websockets.core.WebSocketChannel;
import io.undertow.websockets.core.WebSockets;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.KUniverse;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.abs.AbstractKView;
import org.kevoree.modeling.api.data.cache.KCacheEntry;
import org.kevoree.modeling.api.data.cache.KCacheObject;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.manager.Index;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.meta.Meta;
import org.kevoree.modeling.api.msg.KAtomicGetRequest;
import org.kevoree.modeling.api.msg.KAtomicGetResult;
import org.kevoree.modeling.api.msg.KEventMessage;
import org.kevoree.modeling.api.msg.KGetRequest;
import org.kevoree.modeling.api.msg.KGetResult;
import org.kevoree.modeling.api.msg.KMessage;
import org.kevoree.modeling.api.msg.KMessageLoader;
import org.kevoree.modeling.api.msg.KPutRequest;
import org.kevoree.modeling.api.msg.KPutResult;
import org.kevoree.modeling.api.rbtree.LongRBTree;
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

        ArrayList<KEventMessage> messagesToSendLocally = new ArrayList<>();
        ArrayList<KContentKey> keysToReload = new ArrayList<>();

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
                case KMessageLoader.EVENT_TYPE:{
                    keysToReload.add(((KEventMessage)msg).key);
                    messagesToSendLocally.add((KEventMessage)msg);
                }break;
                default:{
                    System.err.println("MessageType not supported:" + msg.type());
                }
            }
        }

        if(messagesToSendLocally.size() > 0) {
            this._manager.reload(keysToReload.toArray(new KContentKey[keysToReload.size()]), new Callback<Object[]>() {
                @Override
                public void on(Object[] objects) {
                    HashMap<KEventMessage, KCacheEntry> messagesToFire = new HashMap<>();
                    for (int i = 0; i < objects.length; i++) {
                        if (objects[i] instanceof KCacheEntry) {
                            messagesToFire.put(messagesToSendLocally.get(i), (KCacheEntry) objects[i]);
                        }
                    }
                    WebSocketClient.this.fireLocalMessages(messagesToFire.keySet().toArray(new KEventMessage[messagesToFire.size()]), messagesToFire.values().toArray(new KCacheEntry[messagesToFire.size()]));
                }
            });
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

        final JsonArray payload = new JsonArray();
        HashMap<KEventMessage, KCacheEntry> messagesToFire = new HashMap<>();
        for(int i = 0; i < msgs.length; i++) {
            payload.add(msgs[i].json());
            KContentKey key = msgs[i].key;
            if (key.universe() != null && key.time() != null && key.obj() != null) {
                //this is a KObject key...
                KCacheObject relevantEntry = _manager.cache().get(key);
                if (relevantEntry instanceof KCacheEntry) {
                    messagesToFire.put(msgs[i], (KCacheEntry)relevantEntry);
                }
            }
        }
        fireLocalMessages(messagesToFire.keySet().toArray(new KEventMessage[messagesToFire.size()]), messagesToFire.values().toArray(new KCacheEntry[messagesToFire.size()]));
        WebSockets.sendText(payload.toString(), _client.getChannel(), null);
    }

    @Override
    public void setManager(KDataManager p_manager) {
        this._manager = p_manager;
    }

    private void fireLocalMessages(KEventMessage[] msgs, KCacheEntry[] cacheEntries) {
        HashMap<Long, KUniverse> universe = new HashMap<Long, KUniverse>();
        HashMap<String, KView> views = new HashMap<String, KView>();
        for (int i = 0; i < msgs.length; i++) {
            KContentKey key = msgs[i].key;
            KCacheEntry entry = cacheEntries[i];
            LongRBTree universeTree = (LongRBTree) _manager.cache().get(KContentKey.createUniverseTree(key.obj()));
            //Ok we have to create the corresponding proxy...
            KUniverse universeSelected = null;
            universeSelected = universe.get(key.universe());
            if (universeSelected == null) {
                universeSelected = _manager.model().universe(key.universe());
                universe.put(key.universe(), universeSelected);
            }
            KView tempView = views.get(key.universe() + "/" + key.time());
            if (tempView == null) {
                tempView = universeSelected.time(key.time());
                views.put(key.universe() + "/" + key.time(), tempView);
            }
            KObject resolved = ((AbstractKView) tempView).createProxy(entry.metaClass, universeTree, key.obj());
            Meta[] metas = new Meta[msgs[i].meta.length];
            for (int j = 0; j < msgs[i].meta.length; j++) {
                if (msgs[i].meta[j] >= Index.RESERVED_INDEXES) {
                    metas[j] = resolved.metaClass().meta(msgs[i].meta[j]);
                }
            }
            _localEventListeners.dispatch(resolved, metas);
        }
    }

}
