package org.kevoree.modeling.datastore.websocket;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;
import org.kevoree.modeling.api.persistence.DataStore;

import java.net.InetSocketAddress;

/**
 * Created by duke on 6/26/14.
 */
public class DataStoreWebSocket extends WebSocketServer {

    private DataStore wrapped = null;

    private Integer port = null;

    public DataStoreWebSocket(DataStore wrapped, Integer port) {
        super(new InetSocketAddress(port));
        this.wrapped = wrapped;
        this.port = port;
        start();
    }

    @Override
    public void onOpen(WebSocket webSocket, ClientHandshake clientHandshake) {

    }

    @Override
    public void onClose(WebSocket webSocket, int i, String s, boolean b) {

    }

    @Override
    public void onMessage(WebSocket webSocket, String s) {

    }

    @Override
    public void onError(WebSocket webSocket, Exception e) {

    }
}
