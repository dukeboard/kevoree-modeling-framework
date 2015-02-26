package org.kevoree.modeling.microframework.test.msg;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.data.cache.KContentKey;
import org.kevoree.modeling.api.data.cdn.KContentPutRequest;
import org.kevoree.modeling.api.msg.*;

/**
 * Created by duke on 24/02/15.
 */
public class KMessageTest {

    @Test
    public void test() {

        KEventMessage event = new KEventMessage();
        event.key = KContentKey.createObject(0l, 1l, 2l);
        event.meta = new int[2];
        event.meta[0] = 0;
        event.meta[1] = 1;
        Assert.assertEquals("{\n" +
                "\"type\":\"0\"\n" +
                ",\"key\":\"1/0/1/2\"\n" +
                ",\"values\":[\"0\",\"1\"]\n" +
                "}\n", event.json());
        KMessage parsed = KMessageLoader.load(event.json());
        Assert.assertEquals(parsed.json(), event.json());

        KGetRequest msgGet = new KGetRequest();
        msgGet.id = 0l;
        msgGet.keys = new KContentKey[3];
        msgGet.keys[0] = KContentKey.createObject(0l, 1l, 2l);
        msgGet.keys[1] = KContentKey.createObject(3l, 4l, 5l);
        msgGet.keys[2] = KContentKey.createObject(6l, 7l, 8l);
        Assert.assertEquals("{\n" +
                "\"type\":\"1\"\n" +
                ",\"id\":\"0\"\n" +
                ",\"keys\":[\"1/0/1/2\",\"1/3/4/5\",\"1/6/7/8\"]\n" +
                "}\n",msgGet.json());
        KMessage parsedGet = KMessageLoader.load(msgGet.json());
        Assert.assertEquals(parsedGet.json(), msgGet.json());

        KPutRequest msgPut = new KPutRequest();
        msgPut.id = 0l;
        msgPut.request = new KContentPutRequest(2);
        msgPut.request.put(KContentKey.createObject(0l, 1l, 2l),"hello0");
        msgPut.request.put(KContentKey.createObject(3l, 4l, 5l),"hello1");
        Assert.assertEquals("{\n" +
                "\"type\":\"3\"\n" +
                ",\"id\":\"0\"\n" +
                ",\"keys\":[\"1/0/1/2\",\"1/3/4/5\"]\n" +
                ",\"values\":[\"hello0\",\"hello1\"]\n" +
                "}\n", msgPut.json());
        KMessage parsedPut = KMessageLoader.load(msgPut.json());
        Assert.assertEquals(parsedPut.json(), msgPut.json());

        KOperationCallMessage msgCall = new KOperationCallMessage();
        msgCall.id = 1l;
        msgCall.key = KContentKey.createObject(0l, 1l, 2l);
        msgCall.params = new String[3];
        msgCall.params[0] = "param0";
        msgCall.params[1] = "param1";
        msgCall.params[2] = "param2";
        Assert.assertEquals("{\n" +
                "\"type\":\"5\"\n" +
                ",\"id\":\"1\"\n" +
                ",\"key\":\"1/0/1/2\"\n" +
                ",\"values\":[\"param0\",\"param1\",\"param2\"]\n" +
                "}\n", msgCall.json());

        KMessage parsedCall = KMessageLoader.load(msgCall.json());
        Assert.assertEquals(parsedCall.json(), msgCall.json());

        KOperationResultMessage msgResult = new KOperationResultMessage();
        msgResult.id = 1l;
        msgResult.value = "hello";
        Assert.assertEquals("{\n" +
                "\"type\":\"6\"\n" +
                ",\"id\":\"1\"\n" +
                ",\"value\":\"hello\"\n" +
                "}\n", msgResult.json());

        KMessage parsedResult = KMessageLoader.load(msgResult.json());
        Assert.assertEquals(parsedResult.json(), msgResult.json());


    }

}
