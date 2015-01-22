package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.junit.Assert;
import org.kevoree.modeling.api.util.PathHelper;


/**
 * Created by duke on 10/13/14.
 */
public class PathHelperTest {

    @Test
    public void helperTest() {
        Assert.assertNull(PathHelper.parentPath("/"));
        Assert.assertNull(PathHelper.parentPath(null));
        Assert.assertNull(PathHelper.parentPath(""));
        Assert.assertEquals("/", PathHelper.parentPath("/nodes[name=n0]"));
        Assert.assertEquals("/nodes[name=n0]", PathHelper.parentPath("/nodes[name=n0]/children[name=c4]"));
    }

}
