///<reference path="../../../../junit/Test.ts"/>
///<reference path="../../api/util/Helper.ts"/>
// TODO Resolve static imports
///<reference path="../../../../junit/Assert.ts"/>
// TODO Resolve static imports
///<reference path="../../../../junit/Assert.ts"/>
// TODO Resolve static imports
///<reference path="../../../../junit/Assert.ts"/>

class HelperTest {

  public helperTest(): void {
    assertNull(Helper.parentPath("/"));
    assertNull(Helper.parentPath(null));
    assertNull(Helper.parentPath(""));
    assertEquals("/", Helper.parentPath("/nodes[name=n0]"));
    assertEquals("/nodes[name=n0]", Helper.parentPath("/nodes[name=n0]/children[name=c4]"));
  }

}

