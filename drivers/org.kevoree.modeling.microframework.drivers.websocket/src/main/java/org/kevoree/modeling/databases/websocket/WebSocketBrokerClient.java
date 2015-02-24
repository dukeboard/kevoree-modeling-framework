package org.kevoree.modeling.databases.websocket;

import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.drafts.Draft_17;
import org.java_websocket.handshake.ServerHandshake;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.KEventListener;
import org.kevoree.modeling.api.data.manager.KDataManager;
import org.kevoree.modeling.api.util.LocalEventListeners;
import org.kevoree.modeling.api.abs.AbstractKEvent;
import org.kevoree.modeling.api.event.KEventBroker;
import org.kevoree.modeling.api.meta.MetaModel;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 05/01/15.
 */

//TODO REMOVE this class after merge

public class WebSocketBrokerClient implements KEventBroker {

    private WebSocketClient client;
    private KEventBroker _baseBroker;
    private String _ip;
    private int _port;
    private List<KEvent> storedEvents = new ArrayList<KEvent>();

    private MetaModel _metaModel;
    private KDataManager _store;

    public WebSocketBrokerClient(String ip, int port) {
        this._baseBroker = new LocalEventListeners();
        this._ip = ip;
        this._port = port;
    }

    @Override
    public void setKStore(KDataManager store) {
        this._store = store;
    }

    @Override
    public void sendOperationEvent(KEvent operationEvent) {
        JsonArray serializedEventList = new JsonArray();
        serializedEventList.add(operationEvent.toJSON());

        JsonObject jsonMessage = new JsonObject();
        jsonMessage.add("events", serializedEventList);
        String message = jsonMessage.toString();
        if (client != null) {
            client.send(message);
        }
    }

    public void notifyOnly(KEvent event) {
        _baseBroker.notify(event);
    }

    @Override
    public void connect(Callback<Throwable> callback) {
        try {
            client = new WebSocketClient(new URI("ws://" + _ip + ":" + _port), new Draft_17()) {
                @Override
                public void onOpen(ServerHandshake serverHandshake) {
                    System.err.println("Client connected");
                }

                @Override
                public void onMessage(String s) {
                    JsonObject message = JsonObject.readFrom(s);
                    JsonArray events = message.get("events").asArray();
                    for (int i = 0; i < events.size(); i++) {
                        System.out.println(events.get(i).asString());
                        KEvent kEvent = AbstractKEvent.fromJSON(events.get(i).asString(), _metaModel);
                        if (kEvent.actionType() == KActionType.CALL
                                || kEvent.actionType() == KActionType.CALL_RESPONSE) {
                            _store.operationManager().operationEventReceived(kEvent);
                        } else {
                            notifyOnly(kEvent);
                        }
                    }
                }

                @Override
                public void onClose(int i, String s, boolean b) {
                    System.err.println("Client Socket closed");
                }

                @Override
                public void onError(Exception e) {
                    e.printStackTrace();
                }

            };
            client.connect();
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void close(Callback<Throwable> callback) {
        client.close();
        _baseBroker.close(callback);
    }

    @Override
    public void registerListener(Object origin, KEventListener listener, Object scope) {
        this._baseBroker.registerListener(origin, listener, scope);
    }

    @Override
    public void unregister(KEventListener listener) {
        this._baseBroker.unregister(listener);
    }

    @Override
    public void notify(KEvent p_event) {
        _baseBroker.notify(p_event);
        storedEvents.add(p_event);
    }

    @Override
    public void flush() {
        JsonArray serializedEventList = new JsonArray();
        for (int i = 0; i < storedEvents.size(); i++) {
            serializedEventList.add(storedEvents.get(i).toJSON());
        }
        JsonObject jsonMessage = new JsonObject();
        jsonMessage.add("events", serializedEventList);
        String message = jsonMessage.toString();
        client.send(message);
        storedEvents.clear();
    }

    @Override
    public void setMetaModel(MetaModel p_metaModel) {
        this._metaModel = p_metaModel;
    }

}
