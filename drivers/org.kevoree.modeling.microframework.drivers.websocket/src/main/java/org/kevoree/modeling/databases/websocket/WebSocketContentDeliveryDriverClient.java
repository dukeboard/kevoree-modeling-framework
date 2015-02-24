package org.kevoree.modeling.databases.websocket;

import com.eclipsesource.json.JsonArray;
import com.eclipsesource.json.JsonObject;
import io.undertow.util.StringWriteChannelListener;
import io.undertow.websockets.client.WebSocketClient;
import io.undertow.websockets.core.*;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.cdn.KContentDeliveryDriver;
import org.xnio.BufferAllocator;
import org.xnio.ByteBufferSlicePool;
import org.xnio.OptionMap;
import org.xnio.Options;
import org.xnio.Pool;
import org.xnio.Xnio;
import org.xnio.XnioWorker;

import java.io.IOException;
import java.net.URI;
import java.nio.ByteBuffer;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.IntUnaryOperator;

/**
 * Created by duke on 16/01/15.
 */

//TODO REMOVE this class after merge
/*
public class WebSocketContentDeliveryDriverClient implements KContentDeliveryDriver {

    private static XnioWorker worker = null;
    private Pool<ByteBuffer> buffer = null;
    private WebSocketChannel webSocketChannel = null;
    private String url = null;
    private Object[] callbacks = null;
    private AtomicInteger atomicInteger = null;

    public WebSocketContentDeliveryDriverClient(String _url) {
        this.url = _url;
        callbacks = new Object[1000];
        atomicInteger = new AtomicInteger(0);
    }

    public int nextKey() {
        return atomicInteger.getAndUpdate(new IntUnaryOperator() {
            @Override
            public int applyAsInt(int operand) {
                if (operand == 999) {
                    return 0;
                } else {
                    return operand + 1;
                }
            }
        });
    }

    @Override
    public void get(String[] keys, ThrowableCallback<String[]> callback) {
        if (webSocketChannel == null) {
            callback.on(new String[keys.length], new Exception("Disconnected WebSocket"));
        } else {
            int nextKey = nextKey();
            if (callbacks[nextKey] != null) {
                System.err.println("WARN: PENDING CALLBACK " + callbacks[nextKey]);
            }
            callbacks[nextKey] = callback;
            JsonObject putMessage = new JsonObject();
            putMessage.set("action", "get");
            putMessage.set("id", nextKey);
            JsonArray values = new JsonArray();
            for (int i = 0; i < keys.length; i++) {
                values.add(keys[i]);
            }
            putMessage.set("value", values);
            String serialized = putMessage.toString();
            try {
                StreamSinkFrameChannel sendChannel = webSocketChannel.send(WebSocketFrameType.TEXT, serialized.length());
                StringWriteChannelListener listener = new StringWriteChannelListener(serialized);
                listener.setup(sendChannel);
            } catch (IOException e) {
                callback.on(new String[keys.length], e);
            }
        }
    }

    @Override
    public void put(String[][] payloads, Callback<Throwable> error) {
        if (webSocketChannel == null) {
            error.on(new Exception("Disconnected WebSocket"));
        } else {
            int nextKey = nextKey();
            if (callbacks[nextKey] != null) {
                System.err.println("WARN: PENDING CALLBACK " + callbacks[nextKey]);
            }
            callbacks[nextKey] = error;
            JsonObject putMessage = new JsonObject();
            putMessage.set("action", "put");
            putMessage.set("id", nextKey);
            JsonArray values = new JsonArray();
            for (int i = 0; i < payloads.length; i++) {
                JsonArray subValues = new JsonArray();
                for (int j = 0; j < payloads[i].length; j++) {
                    subValues.add(payloads[i][j]);
                }
                values.add(subValues);
            }
            putMessage.set("value", values);
            String serialized = putMessage.toString();
            try {
                StreamSinkFrameChannel sendChannel = webSocketChannel.send(WebSocketFrameType.TEXT, serialized.length());
                StringWriteChannelListener listener = new StringWriteChannelListener(serialized);
                listener.setup(sendChannel);
            } catch (IOException e) {
                error.on(e);
            }
        }
    }

    @Override
    public void remove(String[] keys, Callback<Throwable> error) {
        //TODO
        error.on(null);
    }

    @Override
    public void commit(Callback<Throwable> error) {
        //TODO
        error.on(null);
    }

    @Override
    public void connect(Callback<Throwable> callback) {
        try {
            if (worker == null) {
                Xnio xnio = Xnio.getInstance(io.undertow.websockets.client.WebSocketClient.class.getClassLoader());
                worker = xnio.createWorker(OptionMap.builder()
                        .set(Options.WORKER_IO_THREADS, 2)
                        .set(Options.CONNECTION_HIGH_WATER, 1000000)
                        .set(Options.CONNECTION_LOW_WATER, 1000000)
                        .set(Options.WORKER_TASK_CORE_THREADS, 30)
                        .set(Options.WORKER_TASK_MAX_THREADS, 30)
                        .set(Options.TCP_NODELAY, true)
                        .set(Options.CORK, true)
                        .getMap());
                buffer = new ByteBufferSlicePool(BufferAllocator.BYTE_BUFFER_ALLOCATOR, 1024, 1024);
                webSocketChannel = WebSocketClient.connect(worker, buffer, OptionMap.EMPTY, new URI(url), WebSocketVersion.V13).get();
                webSocketChannel.getReceiveSetter().set(new AbstractReceiveListener() {
                    @Override
                    protected void onFullTextMessage(WebSocketChannel channel, BufferedTextMessage message) throws IOException {
                        try {
                            String data = message.getData();
                            JsonObject parsed = JsonObject.readFrom(data);
                            if (parsed.get("id") != null) {
                                Object callback = callbacks[parsed.get("id").asInt()];
                                if (callback != null) {
                                    if (callback instanceof Callback) {
                                        ((Callback) callback).on(null);
                                    } else if (callback instanceof ThrowableCallback) {
                                        JsonArray arr = parsed.get("value").asArray();
                                        String[] result = new String[arr.size()];
                                        for (int i = 0; i < arr.size(); i++) {
                                            try {
                                                if(arr.get(i).isNull()) {
                                                    result[i] = null;
                                                } else {
                                                    result[i] = arr.get(i).asString();
                                                }
                                            } catch (Exception e) {
                                                e.printStackTrace();
                                            }
                                        }
                                        ((ThrowableCallback) callback).on(result, null);
                                    }
                                }
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    }

                    @Override
                    protected void onError(WebSocketChannel channel, Throwable error) {
                        super.onError(channel, error);
                        error.printStackTrace();
                    }
                });
                webSocketChannel.resumeReceives();
                callback.on(null);
            } else {
                //already connected
            }
        } catch (Exception e) {
            callback.on(e);
            try {
                worker.shutdown();
            } catch (Exception e2) {
                //noop
            } finally {
                worker = null;
                buffer = null;
                webSocketChannel = null;
            }
        }
    }

    @Override
    public void close(Callback<Throwable> callback) {
        try {
            if (webSocketChannel != null) {
                webSocketChannel.sendClose();
            }
            if (worker != null) {
                worker.shutdown();
            }
            callback.on(null);
        } catch (IOException e) {
            callback.on(e);
        }
    }
}
*/