///<reference path="../../../../junit/Test.ts"/>
///<reference path="../../api/Callback.ts"/>
///<reference path="../../api/data/MemoryKDataBase.ts"/>
///<reference path="../../api/trace/ModelTraceApplicator.ts"/>
///<reference path="../../api/trace/TraceSequence.ts"/>
///<reference path="cloud/CloudDimension.ts"/>
///<reference path="cloud/CloudUniverse.ts"/>
///<reference path="cloud/CloudView.ts"/>
///<reference path="cloud/Element.ts"/>
///<reference path="cloud/Node.ts"/>
// TODO Resolve static imports
///<reference path="../../../../junit/Assert.ts"/>

class CompareTest {

  public diffTest(): void {
    var universe: CloudUniverse = new CloudUniverse(new MemoryKDataBase());
    universe.newDimension({on:function(dimension0: CloudDimension){
    assertNotNull("Dimension should be created", dimension0);
    var t0: CloudView = dimension0.time(0l);
    var node0_0: Node = t0.createNode();
    node0_0.setName("node0_0");
    node0_0.setValue("0_0");
    var node0_1: Node = t0.createNode();
    node0_1.setName("node0_1");
    node0_1.setValue("0_1");
    t0.createModelCompare().diff(node0_0, node0_1, {on:function(traceSequence: TraceSequence){
    assertNotEquals(traceSequence.traces().length, 0);
    assertEquals("[{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"name\",\"val\":\"node0_1\"},\n" + "{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"value\",\"val\":\"0_1\"}]", traceSequence.toString());
}});
    t0.createModelCompare().diff(node0_0, node0_1, {on:function(traceSequence: TraceSequence){
    new ModelTraceApplicator(node0_0).applyTraceSequence(traceSequence, {on:function(throwable: Throwable){
    assertNull(throwable);
    t0.createModelCompare().diff(node0_0, node0_1, {on:function(traceSequence: TraceSequence){
    assertEquals(traceSequence.traces().length, 0);
}});
}});
}});
}});
  }

  public intersectionTest(): void {
    var universe: CloudUniverse = new CloudUniverse(new MemoryKDataBase());
    universe.newDimension({on:function(dimension0: CloudDimension){
    assertNotNull("Dimension should be created", dimension0);
    var t0: CloudView = dimension0.time(0l);
    var node0_0: Node = t0.createNode();
    node0_0.setName("node0_0");
    node0_0.setValue("0_0");
    var node0_1: Node = t0.createNode();
    node0_1.setName("node0_1");
    node0_1.setValue("0_1");
    t0.createModelCompare().intersection(node0_0, node0_1, {on:function(traceSequence: TraceSequence){
    assertEquals(traceSequence.traces().length, 0);
}});
    var node0_2: Node = t0.createNode();
    node0_2.setName("node0_2");
    node0_2.setValue("0_1");
    t0.createModelCompare().intersection(node0_2, node0_1, {on:function(traceSequence: TraceSequence){
    assertEquals(traceSequence.traces().length, 1);
    assertEquals("[{\"type\":\"SET\",\"src\":\"3\",\"meta\":\"value\",\"val\":\"0_1\"}]", traceSequence.toString());
}});
}});
  }

  public unionTest(): void {
    var universe: CloudUniverse = new CloudUniverse(new MemoryKDataBase());
    universe.newDimension({on:function(dimension0: CloudDimension){
    assertNotNull("Dimension should be created", dimension0);
    var t0: CloudView = dimension0.time(0l);
    var node0_0: Node = t0.createNode();
    node0_0.setName("node0_0");
    node0_0.setValue("0_0");
    var elem0_0: Element = t0.createElement();
    elem0_0.setName("elem0_0");
    node0_0.setElement(elem0_0);
    var node0_1: Node = t0.createNode();
    node0_1.setName("node0_1");
    node0_1.setValue("0_1");
    t0.createModelCompare().union(node0_0, node0_1, {on:function(traceSequence: TraceSequence){
    assertEquals("{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"name\",\"val\":\"node0_1\"}", traceSequence.traces()[0].toString());
    assertEquals("{\"type\":\"SET\",\"src\":\"1\",\"meta\":\"value\",\"val\":\"0_1\"}", traceSequence.traces()[1].toString());
    assertEquals("{\"type\":\"ADD\",\"src\":\"1\",\"meta\":\"element\"}", traceSequence.traces()[2].toString());
    new ModelTraceApplicator(node0_0).applyTraceSequence(traceSequence, {on:function(throwable: Throwable){
    node0_0.getElement({on:function(element: Element){
    assertEquals(elem0_0, element);
}});
}});
}});
}});
  }

}

