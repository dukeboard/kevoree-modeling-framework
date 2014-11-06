package org.kevoree.modeling.databases.websocket;

import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;
import io.undertow.Undertow;
import io.undertow.websockets.WebSocketConnectionCallback;
import io.undertow.websockets.core.AbstractReceiveListener;
import io.undertow.websockets.core.BufferedTextMessage;
import io.undertow.websockets.core.WebSocketChannel;
import io.undertow.websockets.core.WebSockets;
import io.undertow.websockets.spi.WebSocketHttpExchange;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.KDataBase;

import static io.undertow.Handlers.websocket;

/**
 * Created by duke on 11/5/14.
 */
public class WebSocketDataBase implements KDataBase, WebSocketConnectionCallback {

    private KDataBase wrapped = null;

    private Undertow server = null;

    public WebSocketDataBase(KDataBase wrapped, int port) {
        this.wrapped = wrapped;
        Undertow server = Undertow.builder().addHttpListener(port, "0.0.0.0").setHandler(websocket(this)).build();
        server.start();
    }

    private static final String GET_ACTION = "get";

    @Override
    public void get(String[] keys, ThrowableCallback<String[]> callback) {
        wrapped.get(keys, callback);
    }

    private static final String PUT_ACTION = "put";

    @Override
    public void put(String[][] payloads, Callback<Throwable> error) {
        wrapped.put(payloads, error);
    }

    private static final String REMOVE_ACTION = "remove";

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {
        wrapped.remove(keys, error);
    }

    private static final String COMMIT_ACTION = "commit";

    @Override
    public void commit(Callback<Throwable> error) {
        wrapped.commit(error);
    }

    @Override
    public void close(Callback<Throwable> error) {
        wrapped.close(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                server.stop();
                error.on(throwable);
            }
        });
    }

    @Override
    public void onConnect(WebSocketHttpExchange webSocketHttpExchange, WebSocketChannel webSocketChannel) {
        webSocketChannel.getReceiveSetter().set(new AbstractReceiveListener() {

            @Override
            protected void onFullTextMessage(WebSocketChannel channel, BufferedTextMessage message) {
                JsonObject jsonMessage = JsonObject.readFrom(message.getData());
                switch (jsonMessage.get("action").asString()) {
                    case GET_ACTION:
                        JsonArray payload = jsonMessage.get("value").asArray();
                        String[] keys = new String[payload.size()];
                        for (int i = 0; i < payload.size(); i++) {
                            keys[i] = payload.get(i).asString();
                        }
                        get(keys, new ThrowableCallback<String[]>() {
                            @Override
                            public void on(String[] resultPayload, Throwable error) {
                                JsonArray result = new JsonArray();
                                for (int i = 0; i < resultPayload.length; i++) {
                                    result.add(resultPayload[i]);
                                }
                                WebSockets.sendText(result.asString(), channel, null);
                            }
                        });
                        break;
                    case PUT_ACTION:
                        break;
                    case REMOVE_ACTION:
                        break;
                    case COMMIT_ACTION:
                        break;
                    default:
                        break;
                }
            }

        });
        webSocketChannel.resumeReceives();
    }
}
