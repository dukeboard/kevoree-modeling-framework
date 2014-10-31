package org.kevoree.modeling.microframework.test;

import org.junit.Test;
import org.kevoree.modeling.api.util.Helper;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

/**
 * Created by duke on 10/13/14.
 */
public class HelperTest {

    @Test
    public void helperTest() {
        assertNull(Helper.parentPath("/"));
        assertNull(Helper.parentPath(null));
        assertNull(Helper.parentPath(""));
        assertEquals("/",Helper.parentPath("/nodes[name=n0]"));
        assertEquals("/nodes[name=n0]",Helper.parentPath("/nodes[name=n0]/children[name=c4]"));
    }

}
