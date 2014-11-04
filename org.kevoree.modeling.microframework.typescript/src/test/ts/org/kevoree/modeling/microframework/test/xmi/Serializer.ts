///<reference path="../../../../../junit/Test.ts"/>
///<reference path="../../../api/Callback.ts"/>
///<reference path="../../../api/KObject.ts"/>
///<reference path="../../../api/ThrowableCallback.ts"/>
///<reference path="../../../api/data/MemoryKDataBase.ts"/>
///<reference path="../cloud/CloudDimension.ts"/>
///<reference path="../cloud/CloudUniverse.ts"/>
///<reference path="../cloud/CloudView.ts"/>
///<reference path="../cloud/Node.ts"/>
///<reference path="../cloud/Element.ts"/>

class Serializer {

  public serializeTest(): void {
    var universe: CloudUniverse = new CloudUniverse(new MemoryKDataBase());
    universe.newDimension({on:function(dimension0: CloudDimension){
    var t0: CloudView = dimension0.time(0l);
    var nodeT0: Node = t0.createNode();
    nodeT0.setName("node0");
    t0.setRoot(nodeT0);
    var child0: Element = t0.createElement();
    nodeT0.setElement(child0);
    var nodeT1: Node = t0.createNode();
    nodeT1.setName("n1");
    nodeT0.addChildren(nodeT1);
    t0.lookup(nodeT0.uuid(), {on:function(root: KObject){
    t0.createXMISerializer().serialize(root, {on:function(result: string, error: Throwable){
    if (error != null) {
      error.printStackTrace();
    }
}});
}});
}});
  }

}

