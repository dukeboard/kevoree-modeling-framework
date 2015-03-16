package org.kevoree.modeling.databases.websocket;

import io.undertow.Handlers;
import io.undertow.Undertow;
import io.undertow.server.handlers.resource.ClassPathResourceManager;
import io.undertow.websockets.WebSocketConnectionCallback;
import io.undertow.websockets.core.AbstractReceiveListener;
import io.undertow.websockets.core.BufferedTextMessage;
import io.undertow.websockets.core.StreamSourceFrameChannel;
import io.undertow.websockets.core.WebSocketChannel;
import io.undertow.websockets.core.WebSockets;
import io.undertow.websockets.spi.WebSocketHttpExchange;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.AtomicOperation;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.msg.*;

import java.io.IOException;
import java.util.ArrayList;

import static io.undertow.Handlers.websocket;

/**
 * Created by duke on 24/02/15.
 */
public class WebSocketWrapper extends AbstractReceiveListener implements KContentDeliveryDriver, WebSocketConnectionCallback {

    private KContentDeliveryDriver wrapped = null;
    private ArrayList<WebSocketChannel> _connectedChannels = new ArrayList<WebSocketChannel>();
    private KDataManager _manager;

    private Undertow _server = null;
    private String _address = "0.0.0.0";
    private int _port = 8080;
    private ClassLoader _exposedClassLoader = null;

    public WebSocketWrapper(KContentDeliveryDriver p_wrapped, int p_port) {
        this.wrapped = p_wrapped;
        this._port = p_port;
    }

    public WebSocketWrapper exposeResourcesOf(ClassLoader classLoader) {
        this._exposedClassLoader = classLoader;
        return this;
    }

    @Override
    public void connect(Callback<Throwable> callback) {
        if (wrapped != null) {
            if (_exposedClassLoader != null) {
                _server = Undertow.builder().addHttpListener(_port, _address)
                        .setHandler(Handlers.path().addPrefixPath("/cdn", websocket(this)).addPrefixPath("/", Handlers.resource(new ClassPathResourceManager(_exposedClassLoader))))
                        .build();
            } else {
                _server = Undertow.builder().addHttpListener(_port, _address).setHandler(websocket(this)).build();
            }
            _server.start();
            wrapped.connect(callback);
        } else {
            if (callback != null) {
                callback.on(new Exception("Wrapped must not be null."));
            }
        }
    }

    @Override
    public void close(final Callback<Throwable> callback) {
        if (wrapped != null) {
            wrapped.close(new Callback<Throwable>() {
                @Override
                public void on(Throwable throwable) {
                    _server.stop();
                    callback.on(throwable);
                }
            });
        } else {
            if (callback != null) {
                callback.on(null);
            }
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
    protected void onFullTextMessage(final WebSocketChannel channel, BufferedTextMessage message) throws IOException {
        String payload = message.getData();
        KMessage msg = KMessageLoader.load(payload);
        switch (msg.type()) {
            case KMessageLoader.GET_REQ_TYPE: {
                final KGetRequest getRequest = (KGetRequest) msg;
                wrapped.get(getRequest.keys, new ThrowableCallback<String[]>() {
                    public void on(String[] strings, Throwable error) {
                        if (error == null) {
                            KGetResult getResultMessage = new KGetResult();
                            getResultMessage.id = getRequest.id;
                            getResultMessage.values = strings;
                            WebSockets.sendText(getResultMessage.json(), channel, null);
                        }
                    }
                });
            }
            break;
            case KMessageLoader.PUT_REQ_TYPE: {
                final KPutRequest putRequest = (KPutRequest) msg;
                wrapped.put(putRequest.request, new Callback<Throwable>() {
                    @Override
                    public void on(Throwable throwable) {
                        if (throwable == null) {
                            KPutResult putResultMessage = new KPutResult();
                            putResultMessage.id = putRequest.id;
                            WebSockets.sendText(putResultMessage.json(), channel, null);
                        }
                    }
                });
            }
            break;
            case KMessageLoader.ATOMIC_OPERATION_REQUEST_TYPE: {
                final KAtomicGetRequest atomicGetRequest = (KAtomicGetRequest) msg;
                wrapped.atomicGetMutate(atomicGetRequest.key, atomicGetRequest.operation, new ThrowableCallback<String>() {
                    @Override
                    public void on(String s, Throwable error) {
                        if (error == null) {
                            KAtomicGetResult atomicGetResultMessage = new KAtomicGetResult();
                            atomicGetResultMessage.id = atomicGetRequest.id;
                            atomicGetResultMessage.value = s;
                            WebSockets.sendText(atomicGetResultMessage.json(), channel, null);
                        }
                    }
                });
            }
            break;
            case KMessageLoader.OPERATION_CALL_TYPE:
            case KMessageLoader.OPERATION_RESULT_TYPE: {
                _manager.operationManager().operationEventReceived(msg);
            }
            break;
            case KMessageLoader.EVENTS_TYPE: {
                KEvents events = (KEvents) msg;
                if (_manager != null) {
                    _manager.reload(events.allKeys(), null);
                }
                //local listeners dispatch
                wrapped.send(events);
                //forward to remote listeners
                ArrayList<WebSocketChannel> channels = new ArrayList<>(_connectedChannels);
                for (int i = 0; i < channels.size(); i++) {
                    WebSocketChannel chan = channels.get(i);
                    if (chan != channel) {
                        WebSockets.sendText(payload, chan, null);
                    }
                }
            }
            break;
            default: {
                System.err.println("Uh !. MessageType not supported:" + msg.type());
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
    public void registerListener(KObject p_origin, KEventListener p_listener) {
        wrapped.registerListener(p_origin, p_listener);
    }

    @Override
    public void unregister(KObject p_origin, KEventListener p_listener) {
        wrapped.unregister(p_origin, p_listener);
    }

    @Override
    public void send(KMessage msg) {
        //send locally
        wrapped.send(msg);
        //Send to remotes
        String payload = msg.json();
        for (int i = 0; i < _connectedChannels.size(); i++) {
            WebSocketChannel channel = _connectedChannels.get(i);
            WebSockets.sendText(payload, channel, null);
        }
    }

    @Override
    public void setManager(KDataManager manager) {
        this._manager = manager;
        wrapped.setManager(manager);
    }

}
