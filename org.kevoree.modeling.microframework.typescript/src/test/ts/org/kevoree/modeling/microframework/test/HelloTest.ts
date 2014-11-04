///<reference path="../../../../junit/Test.ts"/>
//TODO Resolve multi-import
///<reference path="../../api/"/>
///<reference path="../../api/data/AccessMode.ts"/>
///<reference path="../../api/data/KStore.ts"/>
///<reference path="../../api/data/MemoryKDataBase.ts"/>
///<reference path="cloud/CloudDimension.ts"/>
///<reference path="cloud/CloudUniverse.ts"/>
///<reference path="cloud/CloudView.ts"/>
///<reference path="cloud/Element.ts"/>
///<reference path="cloud/Node.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>
// TODO Resolve static imports
///<reference path="../../../../junit/Assert.ts"/>

class HelloTest {

  public helloTest(): void {
    var univers: CloudUniverse = new CloudUniverse(new MemoryKDataBase());
    univers.listen({on:function(evt: KEvent){
    System.err.println(evt);
}});
    univers.newDimension({on:function(dimension0: CloudDimension){
    assertNotNull("Dimension should be created", dimension0);
    var t0: CloudView = dimension0.time(0l);
    assertNotNull("Time0 should be created", t0);
    assertEquals("Time0 should be created with time 0", t0.now(), 0l);
    var nodeT0: Node = t0.createNode();
    assertNotNull(nodeT0);
    assertNotNull(nodeT0.uuid());
    assertNull(nodeT0.getName());
    assertEquals("name=", nodeT0.domainKey());
    nodeT0.setName("node0");
    assertEquals("node0", nodeT0.getName());
    assertEquals("name=node0", nodeT0.domainKey());
    assertEquals(0l, nodeT0.now());
    var child0: Element = t0.createElement();
    assertNotNull(child0.timeTree());
    assertTrue(child0.timeTree().last().equals(0l));
    assertTrue(child0.timeTree().first().equals(0l));
    var nodeT1: Node = t0.createNode();
    nodeT1.setName("n1");
    nodeT0.addChildren(nodeT1);
    var refs: JUMap<number, number> = <JUMap<number, number>>t0.dimension().universe().storage().raw(nodeT1, AccessMode.READ)[1];
    assertTrue(refs.containsKey(nodeT0.uuid()));
    var i: number[] = {0};
    nodeT0.eachChildren({on:function(n: Node){
    i[0]++;
}}, null);
    assertEquals(1, i[0]);
    var nodeT3: Node = t0.createNode();
    nodeT3.setName("n3");
    nodeT1.addChildren(nodeT3);
    i[0] = 0;
    var j: number[] = {0};
    nodeT0.visit({visit:function(elem: KObject){
    i[0]++;
    return VisitResult.CONTINUE;
}}, {on:function(t: Throwable){
    j[0]++;
}});
    assertEquals(1, i[0]);
    assertEquals(1, j[0]);
    i[0] = 0;
    j[0] = 0;
    nodeT1.visit({visit:function(elem: KObject){
    i[0]++;
    return VisitResult.CONTINUE;
}}, {on:function(t: Throwable){
    j[0]++;
}});
    assertEquals(1, i[0]);
    assertEquals(1, j[0]);
    i[0] = 0;
    j[0] = 0;
    nodeT3.visit({visit:function(elem: KObject){
    i[0]++;
    return VisitResult.CONTINUE;
}}, {on:function(t: Throwable){
    j[0]++;
}});
    assertEquals(0, i[0]);
    assertEquals(1, j[0]);
    i[0] = 0;
    j[0] = 0;
    nodeT0.treeVisit({visit:function(elem: KObject){
    i[0]++;
    return VisitResult.CONTINUE;
}}, {on:function(t: Throwable){
    j[0]++;
}});
    assertEquals(2, i[0]);
    assertEquals(1, j[0]);
    i[0] = 0;
    j[0] = 0;
    nodeT0.graphVisit({visit:function(elem: KObject){
    i[0]++;
    return VisitResult.CONTINUE;
}}, {on:function(t: Throwable){
    j[0]++;
}});
    assertEquals(2, i[0]);
    assertEquals(1, j[0]);
    i[0] = 0;
    j[0] = 0;
    nodeT0.graphVisit({visit:function(elem: KObject){
    i[0]++;
    return VisitResult.CONTINUE;
}}, {on:function(t: Throwable){
    j[0]++;
}});
    assertEquals(2, i[0]);
    assertEquals(1, j[0]);
    System.err.println(nodeT0);
}});
  }

}

