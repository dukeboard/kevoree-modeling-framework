package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.data.MemoryDataStore;
import org.kevoree.modeling.microframework.test.cloud.CloudUnivers;

/**
 * Created by duke on 10/13/14.
 */
public class HelloTest {

    @Test
    public void helloTest() {
        CloudUnivers univers = new CloudUnivers(new MemoryDataStore());
    }

}
