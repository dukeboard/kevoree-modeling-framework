///<reference path="../../../../junit/Test.ts"/>
///<reference path="../../../../junit/Assert.ts"/>
///<reference path="../../api/util/Helper.ts"/>

class HelperTest {

  public helperTest(): void {
    Assert.assertNull(Helper.parentPath("/"));
    Assert.assertNull(Helper.parentPath(null));
    Assert.assertNull(Helper.parentPath(""));
    Assert.assertEquals("/", Helper.parentPath("/nodes[name=n0]"));
    Assert.assertEquals("/nodes[name=n0]", Helper.parentPath("/nodes[name=n0]/children[name=c4]"));
  }

}

