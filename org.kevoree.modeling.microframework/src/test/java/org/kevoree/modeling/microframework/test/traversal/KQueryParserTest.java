package org.kevoree.modeling.microframework.test.traversal;

import org.junit.Assert;
import org.junit.Test;
import org.kevoree.modeling.traversal.selector.KQuery;

import java.util.List;

/**
 * Created by duke on 04/02/15.
 */
public class KQueryParserTest {

    @Test
    public void queryParseTest() {
        
        List<KQuery> queryList = KQuery.buildChain("children[*]");
        Assert.assertEquals(queryList.size(), 1);
        Assert.assertEquals(queryList.get(0).relationName, "children");
        Assert.assertEquals(queryList.get(0).params, "*");

        queryList = KQuery.buildChain("children");
        Assert.assertEquals(queryList.size(), 1);
        Assert.assertEquals(queryList.get(0).relationName, "children");
        Assert.assertEquals(queryList.get(0).params, null);

        queryList = KQuery.buildChain("children/children");
        Assert.assertEquals(queryList.size(), 2);
        Assert.assertEquals(queryList.get(0).relationName, "children");
        Assert.assertEquals(queryList.get(0).params, null);
        Assert.assertEquals(queryList.get(1).relationName, "children");
        Assert.assertEquals(queryList.get(1).params, null);

        queryList = KQuery.buildChain("children[*]/children");
        Assert.assertEquals(queryList.size(), 2);
        Assert.assertEquals(queryList.get(0).relationName, "children");
        Assert.assertEquals(queryList.get(0).params, "*");
        Assert.assertEquals(queryList.get(1).relationName, "children");
        Assert.assertEquals(queryList.get(1).params, null);

        queryList = KQuery.buildChain("children/children[*]");
        Assert.assertEquals(queryList.size(), 2);
        Assert.assertEquals(queryList.get(0).relationName, "children");
        Assert.assertEquals(queryList.get(0).params, null);
        Assert.assertEquals(queryList.get(1).relationName, "children");
        Assert.assertEquals(queryList.get(1).params, "*");

        queryList = KQuery.buildChain("children[]/children[*]");
        Assert.assertEquals(queryList.size(), 2);
        Assert.assertEquals(queryList.get(0).relationName, "children");
        Assert.assertEquals(queryList.get(0).params, null);
        Assert.assertEquals(queryList.get(1).relationName, "children");
        Assert.assertEquals(queryList.get(1).params, "*");

        queryList = KQuery.buildChain("children[*/children[*]");
        Assert.assertEquals(queryList.size(), 2);
        Assert.assertEquals(queryList.get(0).relationName, "children");
        Assert.assertEquals(queryList.get(0).params, "*");
        Assert.assertEquals(queryList.get(1).relationName, "children");
        Assert.assertEquals(queryList.get(1).params, "*");

        queryList = KQuery.buildChain("children[]/children[*");
        Assert.assertEquals(queryList.size(), 2);
        Assert.assertEquals(queryList.get(0).relationName, "children");
        Assert.assertEquals(queryList.get(0).params, null);
        Assert.assertEquals(queryList.get(1).relationName, "children");
        Assert.assertEquals(queryList.get(1).params, "*");

        queryList = KQuery.buildChain("childr\\/en[]/children[*");
        Assert.assertEquals(queryList.size(), 2);
        Assert.assertEquals(queryList.get(0).relationName, "childr\\/en");
        Assert.assertEquals(queryList.get(0).params, null);
        Assert.assertEquals(queryList.get(1).relationName, "children");
        Assert.assertEquals(queryList.get(1).params, "*");

    }

}
