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
///<reference path="../../../../../java/util/ArrayList.ts"/>
///<reference path="../../../../../java/util/Collections.ts"/>
///<reference path="../../../../../java/util/HashMap.ts"/>
///<reference path="../../../../../java/util/List.ts"/>
///<reference path="../../../../../java/util/Map.ts"/>

class DefaultModelSlicer implements ModelSlicer {

  private internal_prune(elem: KObject<any,any>, traces: List<ModelTrace>, cache: Map<number, KObject>, parentMap: Map<number, KObject>, callback: Callback<Throwable>): void {
    var parents: List<KObject> = new ArrayList<KObject>();
    var parentExplorer: Callback<KObject>[] = new Array();
    parentExplorer[0] = 
      public on(currentParent: KObject): void {
        if (currentParent != null && parentMap.get(currentParent.uuid()) == null && cache.get(currentParent.uuid()) == null) {
          parents.add(currentParent);
          currentParent.parent(parentExplorer[0]);
          callback.on(null);
        } else {
          Collections.reverse(parents);
          //TODO resolve for-each cycle
          var parent: KObject;
          for (parent in parents) {
            if (parent.parentUuid() != null) {
              traces.add(new ModelAddTrace(parent.parentUuid(), parent.referenceInParent(), parent.uuid(), parent.metaClass()));
            }
            traces.addAll(elem.traces(TraceRequest.ATTRIBUTES_ONLY));
            parentMap.put(parent.uuid(), parent);
          }
          if (cache.get(elem.uuid()) == null && parentMap.get(elem.uuid()) == null) {
            if (elem.parentUuid() != null) {
              traces.add(new ModelAddTrace(elem.parentUuid(), elem.referenceInParent(), elem.uuid(), elem.metaClass()));
            }
            traces.addAll(elem.traces(TraceRequest.ATTRIBUTES_ONLY));
          }
          cache.put(elem.uuid(), elem);
          elem.graphVisit(
            public visit(elem: KObject): VisitResult {
              if (cache.get(elem.uuid()) == null) {
                this.internal_prune(elem, traces, cache, parentMap, 
                  public on(throwable: Throwable): void {
                  }

);
              }
              return VisitResult.CONTINUE;
            }

, 
            public on(throwable: Throwable): void {
              callback.on(null);
            }

);
        }
      }

;
    traces.add(new ModelAddTrace(elem.uuid(), null, elem.uuid(), elem.metaClass()));
    elem.parent(parentExplorer[0]);
  }

  public slice(elems: List<KObject>, callback: Callback<TraceSequence>): void {
    var traces: List<ModelTrace> = new ArrayList<ModelTrace>();
    var tempMap: Map<number, KObject> = new HashMap<number, KObject>();
    var parentMap: Map<number, KObject> = new HashMap<number, KObject>();
    var elemsArr: KObject[] = elems.toArray(new Array());
    Helper.forall(elemsArr, 
      public on(obj: KObject, next: Callback<Throwable>): void {
        this.internal_prune(obj, traces, tempMap, parentMap, next);
      }

, 
      public on(throwable: Throwable): void {
        //TODO resolve for-each cycle
        var toLinkKey: number;
        for (toLinkKey in tempMap.keySet()) {
          var toLink: KObject = tempMap.get(toLinkKey);
          traces.addAll(toLink.traces(TraceRequest.REFERENCES_ONLY));
        }
        callback.on(new TraceSequence().populate(traces));
      }

);
  }

}

