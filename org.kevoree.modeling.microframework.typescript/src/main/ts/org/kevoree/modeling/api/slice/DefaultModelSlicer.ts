///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../ModelSlicer.ts"/>
///<reference path="../ModelVisitor.ts"/>
///<reference path="../TraceRequest.ts"/>
///<reference path="../VisitResult.ts"/>
///<reference path="../trace/ModelAddTrace.ts"/>
///<reference path="../trace/ModelTrace.ts"/>
///<reference path="../trace/TraceSequence.ts"/>
///<reference path="../util/CallBackChain.ts"/>
///<reference path="../util/Helper.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/Collections.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>

class DefaultModelSlicer implements ModelSlicer {

  private internal_prune(elem: KObject<any,any>, traces: JUList<ModelTrace>, cache: JUMap<number, KObject<any,any>>, parentMap: JUMap<number, KObject<any,any>>, callback: Callback<Throwable>): void {
    var parents: JUList<KObject<any,any>> = new JUArrayList<KObject<any,any>>();
    var parentExplorer: Callback<KObject<any,any>>[] = new Array();
    parentExplorer[0] = {on:function(currentParent: KObject<any,any>){
    if (currentParent != null && parentMap.get(currentParent.uuid()) == null && cache.get(currentParent.uuid()) == null) {
      parents.add(currentParent);
      currentParent.parent(parentExplorer[0]);
      callback.on(null);
    } else {
      Collections.reverse(parents);
      var parentsArr: KObject<any,any>[] = parents.toArray(new Array());
      for (var k: number = 0; k < parentsArr.length; k++) {
        var parent: KObject<any,any> = parentsArr[k];
        if (parent.parentUuid() != null) {
          traces.add(new ModelAddTrace(parent.parentUuid(), parent.referenceInParent(), parent.uuid(), parent.metaClass()));
        }
        var toAdd: ModelTrace[] = elem.traces(TraceRequest.ATTRIBUTES_ONLY);
        for (var i: number = 0; i < toAdd.length; i++) {
          traces.add(toAdd[i]);
        }
        parentMap.put(parent.uuid(), parent);
      }
      if (cache.get(elem.uuid()) == null && parentMap.get(elem.uuid()) == null) {
        if (elem.parentUuid() != null) {
          traces.add(new ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid(), elem.metaClass()));
        }
        var toAdd: ModelTrace[] = elem.traces(TraceRequest.ATTRIBUTES_ONLY);
        for (var i: number = 0; i < toAdd.length; i++) {
          traces.add(toAdd[i]);
        }
      }
      cache.put(elem.uuid(), elem);
      elem.graphVisit({visit:function(elem: KObject<any,any>){
      if (cache.get(elem.uuid()) == null) {
        this.internal_prune(elem, traces, cache, parentMap, {on:function(throwable: Throwable){
}});
      }
      return VisitResult.CONTINUE;
}}, {on:function(throwable: Throwable){
      callback.on(null);
}});
    }
}};
    traces.add(new ModelAddTrace(elem.uuid(), null, elem.uuid(), elem.metaClass()));
    elem.parent(parentExplorer[0]);
  }

  public slice(elems: JUList<KObject<any,any>>, callback: Callback<TraceSequence>): void {
    var traces: JUList<ModelTrace> = new JUArrayList<ModelTrace>();
    var tempMap: JUMap<number, KObject<any,any>> = new JUHashMap<number, KObject<any,any>>();
    var parentMap: JUMap<number, KObject<any,any>> = new JUHashMap<number, KObject<any,any>>();
    var elemsArr: KObject<any,any>[] = elems.toArray(new Array());
    Helper.forall(elemsArr, {on:function(obj: KObject<any,any>, next: Callback<Throwable>){
    this.internal_prune(obj, traces, tempMap, parentMap, next);
}}, {on:function(throwable: Throwable){
    var toLinkKeysArr: number[] = tempMap.keySet().toArray(new Array());
    for (var k: number = 0; k < toLinkKeysArr.length; k++) {
      var toLink: KObject<any,any> = tempMap.get(toLinkKeysArr[k]);
      var toAdd: ModelTrace[] = toLink.traces(TraceRequest.REFERENCES_ONLY);
      for (var i: number = 0; i < toAdd.length; i++) {
        traces.add(toAdd[i]);
      }
    }
    callback.on(new TraceSequence().populate(traces));
}});
  }

}

