///<reference path="../../../../junit/Assert.ts"/>
///<reference path="../../../../junit/Test.ts"/>
///<reference path="../../api/Callback.ts"/>
///<reference path="../../api/KEvent.ts"/>
///<reference path="../../api/ModelVisitor.ts"/>
///<reference path="../../api/VisitResult.ts"/>
///<reference path="../../api/KObject.ts"/>
///<reference path="../../api/ModelListener.ts"/>
///<reference path="../../api/data/AccessMode.ts"/>
///<reference path="../../api/data/MemoryKDataBase.ts"/>
///<reference path="cloud/CloudDimension.ts"/>
///<reference path="cloud/CloudUniverse.ts"/>
///<reference path="cloud/CloudView.ts"/>
///<reference path="cloud/Node.ts"/>
///<reference path="cloud/Element.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>

class HelloTest {

  public helloTest(): void {
    var univers: CloudUniverse = new CloudUniverse(new MemoryKDataBase());
    univers.listen({on:function(evt: KEvent){
    System.err.println(evt);
}});
    univers.newDimension({on:function(dimension0: CloudDimension){
    Assert.assertNotNull(dimension0);
    var t0: CloudView = dimension0.time(0);
    Assert.assertNotNull(t0);
    Assert.assertEquals(t0.now(), 0);
    var nodeT0: Node = t0.createNode();
    Assert.assertNotNull(nodeT0);
    Assert.assertNotNull(nodeT0.uuid());
    Assert.assertNull(nodeT0.getName());
    Assert.assertEquals("name=", nodeT0.domainKey());
    nodeT0.setName("node0");
    Assert.assertEquals("node0", nodeT0.getName());
    Assert.assertEquals("name=node0", nodeT0.domainKey());
    Assert.assertEquals(0, nodeT0.now());
    var child0: Element = t0.createElement();
    Assert.assertNotNull(child0.timeTree());
    Assert.assertTrue(child0.timeTree().last().equals(0));
    Assert.assertTrue(child0.timeTree().first().equals(0));
    var nodeT1: Node = t0.createNode();
    nodeT1.setName("n1");
    nodeT0.addChildren(nodeT1);
    var refs: JUMap<number, number> = <JUMap<number, number>>t0.dimension().universe().storage().raw(nodeT1, AccessMode.READ)[1];
    Assert.assertTrue(refs.containsKey(nodeT0.uuid()));
    var i: number[] = [0];
    nodeT0.eachChildren({on:function(n: Node){
    i[0]++;
}}, null);
    Assert.assertEquals(1, i[0]);
    var nodeT3: Node = t0.createNode();
    nodeT3.setName("n3");
    nodeT1.addChildren(nodeT3);
    i[0] = 0;
    var j: number[] = [0];
    nodeT0.visit({visit:function(elem: KObject){
    i[0]++;
    return VisitResult.CONTINUE;
}}, {on:function(t: Throwable){
    j[0]++;
}});
    Assert.assertEquals(1, i[0]);
    Assert.assertEquals(1, j[0]);
    i[0] = 0;
    j[0] = 0;
    nodeT1.visit({visit:function(elem: KObject){
    i[0]++;
    return VisitResult.CONTINUE;
}}, {on:function(t: Throwable){
    j[0]++;
}});
    Assert.assertEquals(1, i[0]);
    Assert.assertEquals(1, j[0]);
    i[0] = 0;
    j[0] = 0;
    nodeT3.visit({visit:function(elem: KObject){
    i[0]++;
    return VisitResult.CONTINUE;
}}, {on:function(t: Throwable){
    j[0]++;
}});
    Assert.assertEquals(0, i[0]);
    Assert.assertEquals(1, j[0]);
    i[0] = 0;
    j[0] = 0;
    nodeT0.treeVisit({visit:function(elem: KObject){
    i[0]++;
    return VisitResult.CONTINUE;
}}, {on:function(t: Throwable){
    j[0]++;
}});
    Assert.assertEquals(2, i[0]);
    Assert.assertEquals(1, j[0]);
    i[0] = 0;
    j[0] = 0;
    nodeT0.graphVisit({visit:function(elem: KObject){
    i[0]++;
    return VisitResult.CONTINUE;
}}, {on:function(t: Throwable){
    j[0]++;
}});
    Assert.assertEquals(2, i[0]);
    Assert.assertEquals(1, j[0]);
    i[0] = 0;
    j[0] = 0;
    nodeT0.graphVisit({visit:function(elem: KObject){
    i[0]++;
    return VisitResult.CONTINUE;
}}, {on:function(t: Throwable){
    j[0]++;
}});
    Assert.assertEquals(2, i[0]);
    Assert.assertEquals(1, j[0]);
    System.err.println(nodeT0);
}});
  }

}

