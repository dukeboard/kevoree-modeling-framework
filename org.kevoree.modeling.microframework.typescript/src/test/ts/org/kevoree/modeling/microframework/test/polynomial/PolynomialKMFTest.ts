///<reference path="../../../../../junit/Test.ts"/>
///<reference path="../../../api/Callback.ts"/>
///<reference path="../../../api/KObject.ts"/>
///<reference path="../../../api/data/MemoryKDataBase.ts"/>
///<reference path="../../../api/time/TimeWalker.ts"/>
///<reference path="../cloud/CloudDimension.ts"/>
///<reference path="../cloud/CloudUniverse.ts"/>
///<reference path="../cloud/CloudView.ts"/>
///<reference path="../cloud/Element.ts"/>
///<reference path="../cloud/Node.ts"/>
///<reference path="../../../../../../java/util/Random.ts"/>
// TODO Resolve static imports
///<reference path="../../../../../junit/Assert.ts"/>

class PolynomialKMFTest {

  public test(): void {
    var dataBase: MemoryKDataBase = new MemoryKDataBase();
    var universe: CloudUniverse = new CloudUniverse(dataBase);
    universe.newDimension({on:function(dimension0: CloudDimension){
    var t0: CloudView = dimension0.time(0l);
    var node: Node = t0.createNode();
    node.setName("n0");
    t0.setRoot(node);
    var element: Element = t0.createElement();
    element.setName("e0");
    node.setElement(element);
    element.setValue(0l);
    for (var i: number = 1; i <= 10000; i++) {
      var finalI: number = i;
      dimension0.time(finalI).lookup(element.uuid(), {on:function(kObject: KObject){
      var casted: Element = <Element>kObject;
      casted.setValue(<number>new Random().nextInt(100000));
}});
    }
    System.out.println(element.timeTree().size());
}});
  }

}

