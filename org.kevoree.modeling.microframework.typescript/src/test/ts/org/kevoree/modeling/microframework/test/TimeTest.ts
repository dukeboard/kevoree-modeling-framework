///<reference path="../../../../junit/Assert.ts"/>
///<reference path="../../../../junit/Test.ts"/>
///<reference path="../../api/Callback.ts"/>
///<reference path="../../api/KObject.ts"/>
///<reference path="../../api/data/MemoryKDataBase.ts"/>
///<reference path="cloud/CloudDimension.ts"/>
///<reference path="cloud/CloudUniverse.ts"/>
///<reference path="cloud/CloudView.ts"/>
///<reference path="cloud/Node.ts"/>
///<reference path="cloud/Element.ts"/>

class TimeTest {

  public timeCreationTest(): void {
    var universe: CloudUniverse = new CloudUniverse(new MemoryKDataBase());
    universe.newDimension({on:function(dimension0: CloudDimension){
    Assert.assertNotNull(dimension0);
    var t0: CloudView = dimension0.time(0l);
    Assert.assertNotNull(t0);
    Assert.assertEquals(t0.now(), 0l);
    var t1: CloudView = dimension0.time(1l);
    Assert.assertNotNull(t1);
    Assert.assertEquals(t1.now(), 1l);
}});
  }

  public simpleTimeNavigationTest(): void {
    var universe: CloudUniverse = new CloudUniverse(new MemoryKDataBase());
    universe.newDimension({on:function(dimension0: CloudDimension){
    Assert.assertNotNull(dimension0);
    var t0: CloudView = dimension0.time(0l);
    var node0: Node = t0.createNode();
    var element0: Element = t0.createElement();
    node0.setElement(element0);
    node0.getElement({on:function(element: Element){
    Assert.assertEquals(element, element0);
    Assert.assertEquals(element.now(), t0.now());
}});
    t0.lookup(node0.uuid(), {on:function(kObject: KObject){
    (<Node>kObject).getElement({on:function(element: Element){
    Assert.assertEquals(element, element0);
    Assert.assertEquals(element.now(), t0.now());
}});
}});
}});
  }

  public distortedTimeNavigationTest(): void {
    var universe: CloudUniverse = new CloudUniverse(new MemoryKDataBase());
    universe.newDimension({on:function(dimension0: CloudDimension){
    Assert.assertNotNull(dimension0);
    var t0: CloudView = dimension0.time(0l);
    var node0: Node = t0.createNode();
    node0.getElement({on:function(element: Element){
    Assert.assertNull(element);
}});
    t0.lookup(node0.uuid(), {on:function(kObject: KObject){
    (<Node>kObject).getElement({on:function(element: Element){
    Assert.assertNull(element);
}});
}});
    var t1: CloudView = dimension0.time(1l);
    var elem1: Element = t1.createElement();
    node0.setElement(elem1);
    t0.lookup(node0.uuid(), {on:function(kObject: KObject){
    (<Node>kObject).getElement({on:function(element: Element){
    Assert.assertNull(element);
}});
}});
    t1.lookup(node0.uuid(), {on:function(kObject: KObject){
    (<Node>kObject).getElement({on:function(element: Element){
    Assert.assertNotNull(element);
    Assert.assertEquals(element, elem1);
    Assert.assertEquals(element.now(), t1.now());
}});
}});
}});
  }

  public objectModificationTest(): void {
    var universe: CloudUniverse = new CloudUniverse(new MemoryKDataBase());
    universe.newDimension({on:function(dimension0: CloudDimension){
    Assert.assertNotNull(dimension0);
    var t0: CloudView = dimension0.time(0l);
    var node0: Node = t0.createNode();
    node0.setName("node at 0");
    node0.setValue("0");
    var elem0: Element = t0.createElement();
    node0.setElement(elem0);
    var t1: CloudView = dimension0.time(1l);
    t1.lookup(node0.uuid(), {on:function(kObject: KObject){
    (<Node>kObject).setName("node at 1");
    (<Node>kObject).setValue("1");
}});
    t0.lookup(node0.uuid(), {on:function(kObject: KObject){
    Assert.assertEquals((<Node>kObject).getName(), "node at 0");
    Assert.assertEquals((<Node>kObject).getValue(), "0");
}});
    t1.lookup(node0.uuid(), {on:function(kObject: KObject){
    Assert.assertEquals((<Node>kObject).getName(), "node at 1");
    Assert.assertEquals((<Node>kObject).getValue(), "1");
}});
}});
  }

}

