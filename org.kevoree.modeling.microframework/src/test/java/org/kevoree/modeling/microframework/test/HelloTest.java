package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.KDimension;
import org.kevoree.modeling.api.data.MemoryDataStore;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUnivers;

/**
 * Created by duke on 10/13/14.
 */
public class HelloTest {

    @Test
    public void helloTest() {
        CloudUnivers univers = new CloudUnivers(new MemoryDataStore());
        CloudDimension dimension0 = univers.create();
        System.out.println(dimension0);
    }

}
