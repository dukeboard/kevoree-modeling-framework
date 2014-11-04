///<reference path="../../../../junit/Test.ts"/>
///<reference path="../../api/Callback.ts"/>
///<reference path="../../api/ModelCompare.ts"/>
///<reference path="../../api/data/MemoryKDataBase.ts"/>
///<reference path="cloud/CloudDimension.ts"/>
///<reference path="cloud/CloudUniverse.ts"/>
///<reference path="cloud/CloudView.ts"/>
///<reference path="cloud/Node.ts"/>

class TraceTest {

  public traceTest(): void {
    var universe: CloudUniverse = new CloudUniverse(new MemoryKDataBase());
    universe.newDimension({on:function(dimension0: CloudDimension){
    var time0: CloudView = dimension0.time(0);
    var root: Node = time0.createNode();
    time0.setRoot(root);
    root.setName("root");
    var n1: Node = time0.createNode();
    n1.setName("n1");
    var n2: Node = time0.createNode();
    n2.setName("n2");
    root.addChildren(n1);
    root.addChildren(n2);
    var compare: ModelCompare = time0.createModelCompare();
}});
  }

}

