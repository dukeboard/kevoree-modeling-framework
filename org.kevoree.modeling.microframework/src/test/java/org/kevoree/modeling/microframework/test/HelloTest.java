package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.data.MemoryDataStore;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUnivers;
import sun.jvm.hotspot.utilities.Assert;

/**
 * Created by duke on 10/13/14.
 */
public class HelloTest {

    @Test
    public void helloTest() {
        CloudUnivers univers = new CloudUnivers(new MemoryDataStore());
        CloudDimension dimension0 = univers.create();
        Assert.that(dimension0 != null,"Dimension should be created");
        Assert.that(dimension0.key().equals("0"),"Dimension should be created with ID 0");
    }

}
