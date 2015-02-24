package org.kevoree.modeling.microframework.test.msg;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.data.cache.KContentKey;
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


        KGetKeysRequest msgGet = new KGetKeysRequest();
        msgGet.id = 0;
        msgGet.keys = new KContentKey[3];
        msgGet.keys[0] = KContentKey.createObject(0l, 1l, 2l);
        msgGet.keys[1] = KContentKey.createObject(3l, 4l, 5l);
        msgGet.keys[2] = KContentKey.createObject(6l, 7l, 8l);

        Assert.assertEquals("{\n" +
                "\"type\":\"1\"\n" +
                ",\"id\":\"0\"\n" +
                ",\"values\":[\"1/0/1/2\",\"1/3/4/5\",\"1/6/7/8\"]\n" +
                "}\n",msgGet.json());

        KMessage parsedGet = KMessageLoader.load(msgGet.json());
        Assert.assertEquals(parsedGet.json(), msgGet.json());

        KPutRequest msgPut = new KPutRequest();
        msgPut.id = 0;
        msgGet.keys = new KContentKey[3];
        msgGet.keys[0] = KContentKey.createObject(0l, 1l, 2l);
        msgGet.keys[1] = KContentKey.createObject(3l, 4l, 5l);
        msgGet.keys[2] = KContentKey.createObject(6l, 7l, 8l);

        Assert.assertEquals("{\n" +
                "\"type\":\"1\"\n" +
                ",\"id\":\"0\"\n" +
                ",\"values\":[\"1/0/1/2\",\"1/3/4/5\",\"1/6/7/8\"]\n" +
                "}\n",msgGet.json());

        KMessage parsedGet = KMessageLoader.load(msgGet.json());
        Assert.assertEquals(parsedGet.json(), msgGet.json());


    }

}
