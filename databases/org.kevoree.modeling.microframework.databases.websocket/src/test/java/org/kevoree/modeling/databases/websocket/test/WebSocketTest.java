package org.kevoree.modeling.databases.websocket.test;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;
import org.kevoree.modeling.api.data.MemoryKDataBase;
import org.kevoree.modeling.databases.websocket.WebSocketDataBaseClient;
import org.kevoree.modeling.databases.websocket.WebSocketDataBaseWrapper;

/**
 * Created by duke on 05/01/15.
 */
public class WebSocketTest {

    @Test
    public void test() throws InterruptedException {

        final String[] result = new String[1];

        WebSocketDataBaseWrapper wrapper = new WebSocketDataBaseWrapper(new MemoryKDataBase(), 8080);
        wrapper.connect(new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    throwable.printStackTrace();
                } else {
                    WebSocketDataBaseClient client = new WebSocketDataBaseClient("http://localhost:8080");
                    client.connect(new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            if (throwable != null) {
                                throwable.printStackTrace();
                            }
                        }
                    });

                    String[][] payload = new String[1][2];
                    payload[0][0] = "key";
                    payload[0][1] = "val";
                    client.put(payload, new Callback<Throwable>() {
                        @Override
                        public void on(Throwable throwable) {
                            if (throwable != null) {
                                throwable.printStackTrace();
                            }
                            String[] val = new String[1];
                            val[0] = "key";
                            client.get(val, new ThrowableCallback<String[]>() {
                                @Override
                                public void on(String[] strings, Throwable error) {
                                    if (error != null) {
                                        error.printStackTrace();
                                    }
                                    result[0] = strings[0];
                                }
                            });

                        }
                    });

                }
            }
        });
        Thread.sleep(1000);
        Assert.assertTrue(result[0].equals("val"));
    }

}
