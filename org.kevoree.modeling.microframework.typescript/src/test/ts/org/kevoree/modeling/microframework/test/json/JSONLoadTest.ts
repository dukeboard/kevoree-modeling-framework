///<reference path="../../../../../junit/Test.ts"/>
///<reference path="../../../api/Callback.ts"/>
///<reference path="../../../api/KObject.ts"/>
///<reference path="../../../api/ModelLoader.ts"/>
///<reference path="../../../api/data/MemoryKDataBase.ts"/>
///<reference path="../cloud/CloudDimension.ts"/>
///<reference path="../cloud/CloudUniverse.ts"/>
///<reference path="../cloud/CloudView.ts"/>

class JSONLoadTest {

  public jsonTest(): void {
    var universe: CloudUniverse = new CloudUniverse(new MemoryKDataBase());
    universe.newDimension({on:function(dimension0: CloudDimension){
    var time0: CloudView = dimension0.time(0l);
    var loader: ModelLoader = time0.createJSONLoader();
    loader.load("[\n" + "{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"1\",\n" + "\t\"name\":\"root\",\n" + "\t\"children\": [\"2\",\"3\"],\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"2\",\n" + "\t\"name\":\"n1\",\n" + "}\n" + ",{\n" + "\t\"@meta\" : \"org.kevoree.modeling.microframework.test.cloud.Node\",\n" + "\t\"@uuid\" : \"3\",\n" + "\t\"name\":\"n2\",\n" + "}\n" + "]", {on:function(res: Throwable){
    time0.lookup(1l, {on:function(r: KObject){
    System.err.println(r);
}});
}});
}});
  }

}

