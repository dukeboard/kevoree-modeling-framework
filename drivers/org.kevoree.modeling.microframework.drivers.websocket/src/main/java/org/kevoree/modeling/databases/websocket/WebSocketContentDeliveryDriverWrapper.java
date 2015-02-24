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
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;

import static io.undertow.Handlers.websocket;

/**
 * Created by duke on 11/5/14.
 */

//TODO REMOVE this class after merge

public class WebSocketContentDeliveryDriverWrapper extends AbstractReceiveListener implements WebSocketConnectionCallback, KContentDeliveryDriver {

    private KContentDeliveryDriver wrapped = null;

    private Undertow server = null;

    private int port = 8080;

    public WebSocketContentDeliveryDriverWrapper(KContentDeliveryDriver p_wrapped, int p_port) {
        this.wrapped = p_wrapped;
        this.port = p_port;
    }

    private static final String GET_ACTION = "get";

    private static final String PUT_ACTION = "put";

    private static final String REMOVE_ACTION = "remove";

    private static final String COMMIT_ACTION = "commit";



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
                wrapped.get(keys, new ThrowableCallback<String[]>() {
                    @Override
                    public void on(String[] resultPayload, Throwable error) {
                        JsonObject response = new JsonObject();
                        response.add("action", jsonMessage.get("action").asString());
                        response.add("id", jsonMessage.get("id").asInt());
                        if (error != null) {
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
            }
            break;
            case PUT_ACTION: {
                if (jsonMessage.get("value") != null) {
                    JsonArray payload = jsonMessage.get("value").asArray();
                    String[][] payloadList = new String[payload.size()][];
                    for (int i = 0; i < payload.size(); i++) {
                        JsonArray keyValJson = payload.get(i).asArray();
                        String[] keyVal = new String[2];
                        keyVal[0] = keyValJson.get(0).asString();
                        keyVal[1] = keyValJson.get(1).asString();
                        payloadList[i] = keyVal;
                    }
                    wrapped.put(payloadList, new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            JsonObject response = new JsonObject();
                            response.add("action", jsonMessage.get("action").asString());
                            response.add("id", jsonMessage.get("id").asInt());
                            if (throwable != null) {
                                response.add("status", "error");
                                response.add("value", throwable.getMessage());
                            } else {
                                response.add("status", "success");
                                response.add("value", "null");
                            }
                            WebSockets.sendText(response.toString(), channel, null);
                        }
                    });
                }
            }
            break;
            case REMOVE_ACTION: {

            }
            break;
            case COMMIT_ACTION: {

            }
            break;
            default:
                break;
        }
    }

    @Override
    public void get(String[] keys, ThrowableCallback<String[]> callback) {
        if (wrapped != null) {
            wrapped.get(keys, callback);
        }
    }

    @Override
    public void put(String[][] payloads, Callback<Throwable> error) {
        if (wrapped != null) {
            wrapped.put(payloads, error);
        }
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {
        if (wrapped != null) {
            wrapped.remove(keys, error);
        }
    }

    @Override
    public void commit(Callback<Throwable> error) {
        if (wrapped != null) {
            wrapped.commit(error);
        }
    }

}
