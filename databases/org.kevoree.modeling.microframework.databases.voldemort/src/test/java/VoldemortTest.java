import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.ThrowableCallback;

import java.io.IOException;

/**
 * Created by cyril on 10/02/15.
 */
public class VoldemortTest {

    @Test
    public void test() throws IOException {
/*
        VoldemortDataBase vdb = new VoldemortDataBase("tcp://localhost:6666", "target/voldemortStore");

        String[][] insertPayload = new String[2][2];
        insertPayload[0][0] = "/0";
        insertPayload[0][1] = "/0/payload";
        insertPayload[1][0] = "/1";
        insertPayload[1][1] = "/1/payload";
        vdb.put(insertPayload, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {

            }
        });

        String[] keys = {"/0", "/1"};
        vdb.get(keys, new ThrowableCallback<String[]>() {
            @Override
            public void on(String[] strings, Throwable error) {
                Assert.assertEquals(strings.length, 2);
                Assert.assertEquals(strings[0], "/0/payload");
                Assert.assertEquals(strings[1], "/1/payload");
            }
        });
*/
    }
}
