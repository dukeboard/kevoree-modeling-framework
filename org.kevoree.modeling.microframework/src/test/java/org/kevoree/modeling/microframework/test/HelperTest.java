package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.junit.Assert;
import org.kevoree.modeling.api.util.Helper;


/**
 * Created by duke on 10/13/14.
 */
public class HelperTest {

    @Test
    public void helperTest() {
        Assert.assertNull(Helper.parentPath("/"));
        Assert.assertNull(Helper.parentPath(null));
        Assert.assertNull(Helper.parentPath(""));
        Assert.assertEquals("/", Helper.parentPath("/nodes[name=n0]"));
        Assert.assertEquals("/nodes[name=n0]",Helper.parentPath("/nodes[name=n0]/children[name=c4]"));
    }

}
