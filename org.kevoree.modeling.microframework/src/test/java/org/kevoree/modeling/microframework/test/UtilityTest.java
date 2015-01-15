package org.kevoree.modeling.microframework.test;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.microframework.test.cloud.CloudDimension;
import org.kevoree.modeling.microframework.test.cloud.CloudUniverse;
import org.kevoree.modeling.microframework.test.cloud.CloudView;
import org.kevoree.modeling.microframework.test.cloud.Node;

/**
 * Created by duke on 15/01/15.
 */
public class UtilityTest {

    @Test
    public void utilityTest() {

        CloudUniverse universe = new CloudUniverse();
        universe.connect(null);
        CloudDimension dimension = universe.newDimension();
        CloudView factory = dimension.time(0l);
        Node n = factory.createNode();
        n.setName("n");
        factory.setRoot(n, null);
        Node n2 = factory.createNode();
        n2.setName("n2");
        n.addChildren(n2);

        Node n3 = factory.createNode();
        n3.setName("n3");

        Assert.assertTrue(n.referencesWith(n2).length>0);
        Assert.assertTrue(n2.referencesWith(n).length==0);

        Assert.assertTrue(n.referencesWith(n3).length==0);
        Assert.assertTrue(n3.referencesWith(n).length==0);

    }

}
