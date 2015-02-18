package org.kevoree.modeling.databases.websocket;

import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;
import io.undertow.Undertow;
import io.undertow.websockets.WebSocketConnectionCallback;
import io.undertow.websockets.core.AbstractReceiveListener;
import io.undertow.websockets.core.BufferedTextMessage;
import io.undertow.websockets.core.CloseMessage;
import io.undertow.websockets.core.WebSocketChannel;
import io.undertow.websockets.core.WebSockets;
import io.undertow.websockets.spi.WebSocketHttpExchange;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.data.KStore;
import org.kevoree.modeling.api.event.DefaultKBroker;
import org.kevoree.modeling.api.event.DefaultKEvent;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.meta.MetaModel;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static io.undertow.Handlers.websocket;

/**
 * Created by gregory.nain on 10/11/14.
 */
public class WebSocketBroker extends AbstractReceiveListener implements KEventBroker, WebSocketConnectionCallback {

    private KEventBroker _baseBroker;
    private Undertow server;
    private ArrayList<WebSocketChannel> webSocketClients = new ArrayList<>();
    private ArrayList<KEvent> storedEvents = new ArrayList<KEvent>();
    private Map<Long, Map<Integer, Callback>> operationCallbacks = new HashMap<>();

    private MetaModel _metaModel;
    private KStore _store;

    private String _ip;
    private int _port;

    public WebSocketBroker(String ip, int port) {
        this._baseBroker = new DefaultKBroker();
        this._ip = ip;
        this._port = port;
    }

    @Override
    public void setKStore(KStore store) {
        this._store = store;
    }

    @Override
    public void connect(Callback<Throwable> callback) {
        try {
            server = Undertow.builder().addHttpListener(_port, _ip).setHandler(websocket(this)).build();
            server.start();
            if (callback != null) {
                callback.on(null);
            }
        } catch (Throwable e) {
            if (callback != null) {
                callback.on(e);
            }
        }
    }

    @Override
    public void close(Callback<Throwable> callback) {
        try {
            if (server != null) {
                server.stop();
            }
            if (callback != null) {
                callback.on(null);
            }
        } catch (Throwable e) {
            if (callback != null) {
                callback.on(e);
            }
        }
    }

    @Override
    public void registerListener(Object origin, ModelListener listener, Object scope) {
        _baseBroker.registerListener(origin, listener, scope);
    }

    @Override
    public void notify(KEvent p_event) {
        _baseBroker.notify(p_event);
        storedEvents.add(p_event);
    }

    public void notifyOnly(KEvent event) {
        _baseBroker.notify(event);
    }

    public void flush() {
        JsonArray serializedEventList = new JsonArray();
        for (int i = 0; i < storedEvents.size(); i++) {
            serializedEventList.add(storedEvents.get(i).toJSON());
        }
        JsonObject jsonMessage = new JsonObject();
        jsonMessage.add("events", serializedEventList);
        String message = jsonMessage.toString();
        if (server != null) {
            for (int j = 0; j < webSocketClients.size(); j++) {
                WebSockets.sendText(message, webSocketClients.get(j), null);
            }
        }
        storedEvents.clear();
    }

    @Override
    public void setMetaModel(MetaModel p_metaModel) {
        this._metaModel = p_metaModel;
    }

    @Override
    public void sendOperationEvent(KEvent operationEvent) {
        JsonArray serializedEventList = new JsonArray();
        serializedEventList.add(operationEvent.toJSON());

        JsonObject jsonMessage = new JsonObject();
        jsonMessage.add("events", serializedEventList);
        String message = jsonMessage.toString();
        if (server != null) {
            for (int j = 0; j < webSocketClients.size(); j++) {
                WebSockets.sendText(message, webSocketClients.get(j), null);
            }
        }
    }

    @Override
    public void unregister(ModelListener listener) {
        _baseBroker.unregister(listener);
    }


    @Override
    public void onConnect(WebSocketHttpExchange webSocketHttpExchange, WebSocketChannel webSocketChannel) {
        webSocketClients.add(webSocketChannel);
        webSocketChannel.getReceiveSetter().set(this);
        webSocketChannel.resumeReceives();
    }

    @Override
    protected void onFullTextMessage(WebSocketChannel channel, BufferedTextMessage message) throws IOException {
        String messageData = message.getData();
        //forward
        for (int j = 0; j < webSocketClients.size(); j++) {
            WebSocketChannel currentChannel = webSocketClients.get(j);
            if (currentChannel != channel) {
                WebSockets.sendText(messageData, currentChannel, null);
            }
        }

        // Notify locally
        JsonObject jsonMessage = JsonObject.readFrom(messageData);
        JsonArray events = jsonMessage.get("events").asArray();
        for (int i = 0; i < events.size(); i++) {
            KEvent event = DefaultKEvent.fromJSON(events.get(i).asString(), this._metaModel);
            if (event.actionType() == KActionType.CALL
                    || event.actionType() == KActionType.CALL_RESPONSE) {
                _store.operationManager().operationEventReceived(event);
            } else {
                notifyOnly(event);
            }
        }

    }

    @Override
    protected void onCloseMessage(CloseMessage cm, WebSocketChannel channel) {
        super.onCloseMessage(cm, channel);
        webSocketClients.remove(channel);
    }
}
