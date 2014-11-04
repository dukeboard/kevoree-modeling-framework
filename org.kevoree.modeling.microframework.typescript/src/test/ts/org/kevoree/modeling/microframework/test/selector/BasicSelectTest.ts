///<reference path="../../../../../junit/Test.ts"/>
///<reference path="../../../api/Callback.ts"/>
///<reference path="../../../api/KObject.ts"/>
///<reference path="../../../api/data/MemoryKDataBase.ts"/>
///<reference path="../cloud/CloudDimension.ts"/>
///<reference path="../cloud/CloudUniverse.ts"/>
///<reference path="../cloud/CloudView.ts"/>
///<reference path="../cloud/Node.ts"/>
// TODO Resolve static imports
///<reference path="../../../../../junit/Assert.ts"/>

class BasicSelectTest {

  public selectTest(): void {
    var dataBase: MemoryKDataBase = new MemoryKDataBase();
    var universe: CloudUniverse = new CloudUniverse(dataBase);
    universe.newDimension({on:function(dimension0: CloudDimension){
    var t0: CloudView = dimension0.time(0);
    var node: Node = t0.createNode();
    node.setName("n0");
    t0.setRoot(node);
    var node2: Node = t0.createNode();
    node2.setName("n1");
    node.addChildren(node2);
    var node3: Node = t0.createNode();
    node3.setName("n2");
    node2.addChildren(node3);
    var node4: Node = t0.createNode();
    node4.setName("n4");
    node3.addChildren(node4);
    var node5: Node = t0.createNode();
    node5.setName("n5");
    node3.addChildren(node5);
    t0.select("children[]", {on:function(selecteds: KObject[]){
    assertEquals(1, selecteds.length);
    assertEquals(node2, selecteds[0]);
}});
    t0.select("children[name=*]", {on:function(selecteds: KObject[]){
    assertEquals(1, selecteds.length);
    assertEquals(node2, selecteds[0]);
}});
    t0.select("children[name=n*]", {on:function(selecteds: KObject[]){
    assertEquals(1, selecteds.length);
    assertEquals(node2, selecteds[0]);
}});
    t0.select("children[name=n1]", {on:function(selecteds: KObject[]){
    assertEquals(1, selecteds.length);
    assertEquals(node2, selecteds[0]);
}});
    t0.select("children[name=!n1]", {on:function(selecteds: KObject[]){
    assertEquals(0, selecteds.length);
}});
    t0.select("children[name!=n1]", {on:function(selecteds: KObject[]){
    assertEquals(0, selecteds.length);
}});
    t0.select("children[name=n1]/children[name=n2]", {on:function(selecteds: KObject[]){
    assertEquals(1, selecteds.length);
    assertEquals(node3, selecteds[0]);
}});
    t0.select("/children[name=n1]/children[name=n2]", {on:function(selecteds: KObject[]){
    assertEquals(1, selecteds.length);
    assertEquals(node3, selecteds[0]);
}});
    node.select("children[name=n1]/children[name=n2]", {on:function(selecteds: KObject[]){
    assertEquals(1, selecteds.length);
    assertEquals(node3, selecteds[0]);
}});
    node.select("/children[name=n1]/children[name=n2]", {on:function(selecteds: KObject[]){
    assertEquals(0, selecteds.length);
}});
    node.select("children[name=n1]/children[name=n2]/children[name=*]", {on:function(selecteds: KObject[]){
    assertEquals(2, selecteds.length);
}});
}});
  }

}

