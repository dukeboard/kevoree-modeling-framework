///<reference path="../../../../../junit/Test.ts"/>
///<reference path="../../../api/Callback.ts"/>
///<reference path="../../../api/ThrowableCallback.ts"/>
///<reference path="../../../api/data/MemoryKDataBase.ts"/>
///<reference path="../cloud/CloudDimension.ts"/>
///<reference path="../cloud/CloudUniverse.ts"/>
///<reference path="../cloud/CloudView.ts"/>
///<reference path="../cloud/Node.ts"/>
// TODO Resolve static imports
///<reference path="../../../../../junit/Assert.ts"/>

class JSONSaveTest {

  public jsonTest(): void {
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
    var result: string[] = new Array();
    time0.createJSONSerializer().serialize(root, {on:function(model: string, err: Throwable){
    result[0] = model;
    if (err != null) {
      err.printStackTrace();
    }
}});
    var payloadResult: string = "[\n" + "{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"1\",\n" + "\t\"@root\" : \"true\",\n" + "\t\"name\" : \"root\",\n" + "\t\"children\" : [\"2\",\"3\"],\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"2\",\n" + "\t\"name\" : \"n1\",\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"3\",\n" + "\t\"name\" : \"n2\",\n" + "}\n" + "]\n";
    assertEquals(result[0], payloadResult);
    var pathN2: string[] = [null];
    n2.path({on:function(p: string){
    pathN2[0] = p;
}});
    assertEquals("/children[name=n2]", pathN2[0]);
    var pathN1: string[] = [null];
    n1.path({on:function(p: string){
    pathN1[0] = p;
}});
    assertEquals("/children[name=n1]", pathN1[0]);
    var pathR: string[] = [null];
    root.path({on:function(p: string){
    pathR[0] = p;
}});
    assertEquals("/", pathR[0]);
}});
  }

}

