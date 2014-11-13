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
public class WebSocketDataBase extends AbstractReceiveListener implements KDataBase, WebSocketConnectionCallback {

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
        webSocketChannel.getReceiveSetter().set(this);
        webSocketChannel.resumeReceives();
    }

    @Override
    protected void onFullTextMessage(WebSocketChannel channel, BufferedTextMessage message) {
        String data = message.getData();
        JsonObject jsonMessage = JsonObject.readFrom(data);
        switch (jsonMessage.get("action").asString()) {
            case GET_ACTION: {
                JsonArray payload = jsonMessage.get("value").asArray();
                String[] keys = new String[payload.size()];
                for (int i = 0; i < payload.size(); i++) {
                    keys[i] = payload.get(i).asString();
                }
                get(keys, new ThrowableCallback<String[]>() {
                    @Override
                    public void on(String[] resultPayload, Throwable error) {
                        JsonObject response = new JsonObject();
                        response.add("action", jsonMessage.get("action").asString());
                        if(error != null) {
                            response.add("status", "error");
                            response.add("value", error.getMessage());
                        } else {
                            response.add("status", "success");
                            JsonArray result = new JsonArray();
                            for (int i = 0; i < resultPayload.length; i++) {
                                result.add(resultPayload[i]);
                            }
                            response.add("value", result);
                        }
                        WebSockets.sendText(response.toString(), channel, null);
                    }
                });
            } break;
            case PUT_ACTION: {
                JsonArray payload = jsonMessage.get("value").asArray();
                String[][] payloadList = new String[payload.size()][];
                for (int i = 0; i < payload.size(); i++) {
                    JsonArray keyValJson = payload.get(i).asArray();
                    String[] keyVal = new String[2];
                    keyVal[0] = keyValJson.get(0).asString();
                    keyVal[1] = keyValJson.get(1).asString();
                    payloadList[i]=keyVal;
                }
                put(payloadList, new Callback<Throwable>() {
                    @Override
                    public void on(Throwable throwable) {
                        JsonObject response = new JsonObject();
                        response.add("action", jsonMessage.get("action").asString());
                        if(throwable != null) {
                            response.add("status", "error");
                            response.add("value", throwable.getMessage());
                        } else {
                            response.add("status", "success");
                            response.add("value", "null");
                        }
                        WebSockets.sendText(response.toString(), channel, null);
                    }
                });

            } break;
            case REMOVE_ACTION:{

            } break;
            case COMMIT_ACTION: {

            } break;
            default:
                break;
        }
    }
}
