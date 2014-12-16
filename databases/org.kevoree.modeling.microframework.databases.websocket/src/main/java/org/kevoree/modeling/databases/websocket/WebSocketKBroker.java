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
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.drafts.Draft_17;
import org.java_websocket.handshake.ServerHandshake;
import org.kevoree.modeling.api.KEvent;
import org.kevoree.modeling.api.ModelListener;
import org.kevoree.modeling.api.event.DefaultKEvent;
import org.kevoree.modeling.api.event.KEventBroker;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static io.undertow.Handlers.websocket;

/**
 * Created by gregory.nain on 10/11/14.
 */
public class WebSocketKBroker extends AbstractReceiveListener implements KEventBroker, WebSocketConnectionCallback {

    private KEventBroker _baseBroker;
    private Undertow server;
    private WebSocketClient client;
    private static final String _ip = "0.0.0.0";
    public static final int DEFAULT_PORT = 23665;
    private ArrayList<WebSocketChannel> webSocketClients = new ArrayList<>();
    private Map<Long, ArrayList<KEvent>> storedEvents = new HashMap<Long, ArrayList<KEvent>>();

    public WebSocketKBroker(KEventBroker baseBroker, boolean master) {
        this(baseBroker, master, _ip, DEFAULT_PORT);
    }

    public WebSocketKBroker(KEventBroker baseBroker, boolean master, String ip, int port) {
        this._baseBroker = baseBroker;
        if(master) {
            server = Undertow.builder().addHttpListener(port, ip).setHandler(websocket(this)).build();
            server.start();
        } else {
            try {
                client = new WebSocketClient(new URI("ws://"+ip+":"+port), new Draft_17()){
                    @Override
                    public void onOpen(ServerHandshake serverHandshake) {
                        System.err.println("Client connected");
                    }

                    @Override
                    public void onMessage(String s) {
                        JsonObject message = JsonObject.readFrom(s);
                        JsonArray events = message.get("events").asArray();
                        for(int i = 0; i < events.size(); i++) {
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
    }

    @Override
    public void registerListener(Object origin, ModelListener listener, Object scope) {
        _baseBroker.registerListener(origin, listener, scope);
    }


    @Override
    public void notify(KEvent event) {
        _baseBroker.notify(event);
        ArrayList<KEvent> dimEvents = storedEvents.get(event.dimension());
        if(dimEvents == null) {
            dimEvents = new ArrayList<KEvent>();
            storedEvents.put(event.dimension(), dimEvents);
        }
        dimEvents.add(event);
    }

    public void notifyOnly(KEvent event) {
        _baseBroker.notify(event);
    }

    public void flush(Long dimensionKey) {
        ArrayList<KEvent> eventList = storedEvents.remove(dimensionKey);
        if(eventList != null) {
            JsonArray serializedEventList = new JsonArray();
            for(int i = 0; i < eventList.size(); i++) {
                serializedEventList.add(eventList.get(i).toJSON());
            }
            JsonObject jsonMessage = new JsonObject();
            jsonMessage.add("dimKey", dimensionKey);
            jsonMessage.add("events", serializedEventList);
            String message = jsonMessage.toString();
            if(server != null) {
                for (int j = 0; j < webSocketClients.size(); j++) {
                    WebSockets.sendText(message, webSocketClients.get(j), null);
                }
            } else {
                client.send(message);
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
        for(int j = 0; j < webSocketClients.size(); j++) {
            WebSocketChannel currentChannel = webSocketClients.get(j);
            if(currentChannel != channel) {
                WebSockets.sendText(messageData, currentChannel, null);
            }
        }

        // Notify locally
        JsonObject jsonMessage = JsonObject.readFrom(messageData);
        JsonArray events = jsonMessage.get("events").asArray();
        for(int i = 0; i < events.size(); i++) {
            KEvent event = DefaultKEvent.fromJSON(events.get(i).asString());
            notifyOnly(event);
        }

    }

    @Override
    protected void onCloseMessage(CloseMessage cm, WebSocketChannel channel) {
        super.onCloseMessage(cm, channel);
        webSocketClients.remove(channel);
    }
}
