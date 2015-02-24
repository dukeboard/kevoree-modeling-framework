package org.kevoree.modeling.databases.websocket;

import com.eclipsesource.json.JsonArray;
import io.undertow.Undertow;
import io.undertow.websockets.WebSocketConnectionCallback;
import io.undertow.websockets.core.AbstractReceiveListener;
import io.undertow.websockets.core.BufferedTextMessage;
import io.undertow.websockets.core.StreamSourceFrameChannel;
import io.undertow.websockets.core.WebSocketChannel;
import io.undertow.websockets.core.WebSockets;
import io.undertow.websockets.spi.WebSocketHttpExchange;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KCache;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.msg.KGetRequest;
import org.kevoree.modeling.api.msg.KGetResult;
import org.kevoree.modeling.api.msg.KMessage;
import org.kevoree.modeling.api.msg.KMessageLoader;
import org.kevoree.modeling.api.msg.KPutRequest;
import org.kevoree.modeling.api.msg.KPutResult;

import java.io.IOException;
import java.util.ArrayList;

import static io.undertow.Handlers.websocket;

/**
 * Created by duke on 24/02/15.
 */
public class WebSocketWrapper extends AbstractReceiveListener implements KContentDeliveryDriver, WebSocketConnectionCallback {

    private KContentDeliveryDriver wrapped = null;
    private ArrayList<WebSocketChannel> _connectedChannels = new ArrayList<>();

    private Undertow _server = null;
    private String _address = "0.0.0.0";
    private int _port = 8080;

    public WebSocketWrapper(KContentDeliveryDriver p_wrapped, int p_port) {
        this.wrapped = p_wrapped;
        this._port = p_port;
    }


    @Override
    public void connect(Callback<Throwable> callback) {
        if (wrapped != null) {
            _server = Undertow.builder().addHttpListener(_port, _address).setHandler(websocket(this)).build();
            _server.start();
            wrapped.connect(callback);
        } else {
            callback.on(null);
        }
    }

    @Override
    public void close(Callback<Throwable> callback) {
        if (wrapped != null) {
            wrapped.close(new Callback<Throwable>() {
                @Override
                public void on(Throwable throwable) {
                    _server.stop();
                    callback.on(throwable);
                }
            });
        } else {
            callback.on(null);
        }
    }

    public void onConnect(WebSocketHttpExchange webSocketHttpExchange, WebSocketChannel webSocketChannel) {
        webSocketChannel.getReceiveSetter().set(this);
        webSocketChannel.resumeReceives();
        _connectedChannels.add(webSocketChannel);
    }

    @Override
    protected void onClose(WebSocketChannel webSocketChannel, StreamSourceFrameChannel channel) throws IOException {
        _connectedChannels.remove(webSocketChannel);
    }

    @Override
    protected void onFullTextMessage(WebSocketChannel channel, BufferedTextMessage message) throws IOException {
        String data = message.getData();

        ArrayList<KMessage> _events = null;
        JsonArray payload = null;

        // parse
        JsonArray messages = JsonArray.readFrom(data);
        for(int i = 0; i < messages.size(); i++) {
            String rawMessage = messages.get(i).asString();
            KMessage msg = KMessageLoader.load(rawMessage);
            switch (msg.type()) {
                case KMessageLoader.GET_REQ_TYPE:{
                    KGetRequest getRequest = (KGetRequest)msg;
                    wrapped.get(getRequest.keys, new ThrowableCallback<String[]>() {
                        public void on(String[] strings, Throwable error) {
                            if(error == null) {
                                KGetResult getResultMessage = new KGetResult();
                                getResultMessage.id = getRequest.id;
                                getResultMessage.values = strings;
                                WebSockets.sendText(getResultMessage.json(), channel, null);
                            }
                        }
                    });
                }break;
                case KMessageLoader.PUT_REQ_TYPE:{
                    KPutRequest putRequest = (KPutRequest)msg;
                    wrapped.put(putRequest.request, new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            if(throwable == null) {
                                KPutResult putResultMessage = new KPutResult();
                                putResultMessage.id = putRequest.id;
                                WebSockets.sendText(putResultMessage.json(), channel, null);
                            }
                        }
                    });
                }break;
                /*
                case KMessageLoader.OPERATION_CALL_TYPE:{

                }break;
                case KMessageLoader.OPERATION_RESULT_TYPE:{

                }break;
                */
                case KMessageLoader.EVENT_TYPE:{
                    if(_events == null) {
                        _events = new ArrayList<>();
                        payload = new JsonArray();
                    }
                    _events.add(msg);
                    payload.add(rawMessage);
                }break;
                default:{
                    System.err.println("Uh !. MessageType not supported:" + msg.type());
                }
            }
        }

        if(_events != null) {
            KMessage[] msgs = _events.toArray(new KMessage[_events.size()]);
            //send locally
            wrapped.send(msgs);

            //Forward
            ArrayList<WebSocketChannel> channels = new ArrayList<>(_connectedChannels);
            for(int i = 0; i < channels.size();i++) {
                WebSocketChannel chan= channels.get(i);
                if(chan != channel) {
                    WebSockets.sendText(payload.toString(), channel, null);
                }
            }
        }

    }

    @Override
    public void atomicGetMutate(KContentKey key, AtomicOperation operation, ThrowableCallback<String> callback) {
        wrapped.atomicGetMutate(key, operation, callback);
    }

    @Override
    public void get(KContentKey[] keys, ThrowableCallback<String[]> callback) {
        wrapped.get(keys, callback);
    }

    @Override
    public void put(KContentPutRequest request, Callback<Throwable> error) {
        wrapped.put(request, error);
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {
        wrapped.remove(keys, error);
    }

    @Override
    public KCache cache() {
        return wrapped.cache();
    }

    @Override
    public void registerListener(Object origin, KEventListener listener, Object scope) {
        wrapped.registerListener(origin, listener, scope);
    }

    @Override
    public void unregister(KEventListener listener) {
        wrapped.unregister(listener);
    }

    @Override
    public void send(KMessage[] msgs) {

        //send locally
        wrapped.send(msgs);


        //Send to remotes
        final JsonArray payload = new JsonArray();
        for(int i = 0; i < msgs.length; i++) {
            payload.add(msgs[i].json());
        }

        ArrayList<WebSocketChannel> channels = new ArrayList<>(_connectedChannels);
        for(int i = 0; i < channels.size();i++) {
            WebSocketChannel channel = channels.get(i);
            WebSockets.sendText(payload.toString(), channel, null);
        }

    }

    @Override
    public void setManager(KDataManager manager) {
        wrapped.setManager(manager);
    }
}
