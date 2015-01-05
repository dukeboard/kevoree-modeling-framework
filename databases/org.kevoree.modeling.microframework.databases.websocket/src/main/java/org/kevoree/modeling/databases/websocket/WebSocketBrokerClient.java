package org.kevoree.modeling.databases.websocket;

import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.drafts.Draft_17;
import org.java_websocket.handshake.ServerHandshake;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.event.DefaultKBroker;
import org.kevoree.modeling.api.event.DefaultKEvent;
import org.kevoree.modeling.api.event.KEventBroker;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by duke on 05/01/15.
 */
public class WebSocketBrokerClient implements KEventBroker {

    private WebSocketClient client;
    private KEventBroker _baseBroker;
    private String _ip;
    private int _port;
    private Map<Long, ArrayList<KEvent>> storedEvents = new HashMap<Long, ArrayList<KEvent>>();

    public WebSocketBrokerClient(String ip, int port) {
        this._baseBroker = new DefaultKBroker();
        this._ip = ip;
        this._port = port;
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
                        KEvent kEvent = DefaultKEvent.fromJSON(events.get(i).asString());
                        notifyOnly(kEvent);
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
    public void registerListener(Object origin, ModelListener listener, Object scope) {
        this._baseBroker.registerListener(origin, listener, scope);
    }

    @Override
    public void unregister(ModelListener listener) {
        this._baseBroker.unregister(listener);
    }

    @Override
    public void notify(KEvent event) {
        _baseBroker.notify(event);
        ArrayList<KEvent> dimEvents = storedEvents.get(event.dimension());
        if (dimEvents == null) {
            dimEvents = new ArrayList<KEvent>();
            storedEvents.put(event.dimension(), dimEvents);
        }
        dimEvents.add(event);
    }

    @Override
    public void flush(Long dimensionKey) {
        ArrayList<KEvent> eventList = storedEvents.remove(dimensionKey);
        if (eventList != null) {
            JsonArray serializedEventList = new JsonArray();
            for (int i = 0; i < eventList.size(); i++) {
                serializedEventList.add(eventList.get(i).toJSON());
            }
            JsonObject jsonMessage = new JsonObject();
            jsonMessage.add("dimKey", dimensionKey);
            jsonMessage.add("events", serializedEventList);
            String message = jsonMessage.toString();
            client.send(message);
        }
    }

}
