///<reference path="../Callback.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelAttributeVisitor.ts"/>
///<reference path="../ModelCompare.ts"/>
///<reference path="../ModelVisitor.ts"/>
///<reference path="../VisitResult.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../trace/ModelAddTrace.ts"/>
///<reference path="../trace/ModelRemoveTrace.ts"/>
///<reference path="../trace/ModelSetTrace.ts"/>
///<reference path="../trace/ModelTrace.ts"/>
///<reference path="../trace/TraceSequence.ts"/>
///<reference path="../../../../../java/util/JUArrayList.ts"/>
///<reference path="../../../../../java/util/JUHashMap.ts"/>
///<reference path="../../../../../java/util/JUList.ts"/>
///<reference path="../../../../../java/util/JUMap.ts"/>
///<reference path="../../../../../java/util/JUSet.ts"/>

class DefaultModelCompare implements ModelCompare {

  private _factory: KView = null;

  constructor(p_factory: KView) {
    this._factory = p_factory;
  }

  public diff(origin: KObject<any,any>, target: KObject<any,any>, callback: Callback<TraceSequence>): void {
    this.internal_diff(origin, target, false, false, callback);
  }

  public union(origin: KObject<any,any>, target: KObject<any,any>, callback: Callback<TraceSequence>): void {
    this.internal_diff(origin, target, false, true, callback);
  }

  public intersection(origin: KObject<any,any>, target: KObject<any,any>, callback: Callback<TraceSequence>): void {
    this.internal_diff(origin, target, true, false, callback);
  }

  private internal_diff(origin: KObject<any,any>, target: KObject<any,any>, inter: boolean, merge: boolean, callback: Callback<TraceSequence>): void {
    var traces: JUList<ModelTrace> = new JUArrayList<ModelTrace>();
    var tracesRef: JUList<ModelTrace> = new JUArrayList<ModelTrace>();
    var objectsMap: JUMap<number, KObject<any,any>> = new JUHashMap<number, KObject<any,any>>();
    traces.addAll(this.internal_createTraces(origin, target, inter, merge, false, true));
    tracesRef.addAll(this.internal_createTraces(origin, target, inter, merge, true, false));
    origin.treeVisit({visit:function(elem: KObject<any,any>){
    objectsMap.put(elem.uuid(), elem);
    return VisitResult.CONTINUE;
}}, {on:function(throwable: Throwable){
    if (throwable != null) {
      throwable.printStackTrace();
      callback.on(null);
    } else {
      target.treeVisit({visit:function(elem: KObject<any,any>){
      var childPath: number = elem.uuid();
      if (objectsMap.containsKey(childPath)) {
        if (inter) {
          var currentReference: MetaReference = null;
          traces.add(new ModelAddTrace(elem.parentUuid(), currentReference, elem.uuid(), elem.metaClass()));
        }
        traces.addAll(this.internal_createTraces(objectsMap.get(childPath), elem, inter, merge, false, true));
        tracesRef.addAll(this.internal_createTraces(objectsMap.get(childPath), elem, inter, merge, true, false));
        objectsMap.remove(childPath);
      } else {
        if (!inter) {
          var currentReference: MetaReference = null;
          traces.add(new ModelAddTrace(elem.parentUuid(), currentReference, elem.uuid(), elem.metaClass()));
          traces.addAll(this.internal_createTraces(elem, elem, true, merge, false, true));
          tracesRef.addAll(this.internal_createTraces(elem, elem, true, merge, true, false));
        }
      }
      return VisitResult.CONTINUE;
}}, {on:function(throwable: Throwable){
      if (throwable != null) {
        throwable.printStackTrace();
        callback.on(null);
      } else {
        traces.addAll(tracesRef);
        if (!inter && !merge) {
          var diffChildKeys: number[] = objectsMap.keySet().toArray(new Array());
          for (var i: number = 0; i < diffChildKeys.length; i++) {
            var diffChildKey: number = diffChildKeys[i];
            var diffChild: KObject<any,any> = objectsMap.get(diffChildKey);
            var src: number = diffChild.parentUuid();
            traces.add(new ModelRemoveTrace(src, diffChild.referenceInParent(), diffChild.uuid()));
          }
        }
        callback.on(new TraceSequence().populate(traces));
      }
}});
    }
}});
  }

  public internal_createTraces(current: KObject<any,any>, sibling: KObject<any,any>, inter: boolean, merge: boolean, references: boolean, attributes: boolean): JUList<ModelTrace> {
    var traces: JUList<ModelTrace> = new JUArrayList<ModelTrace>();
    var values: JUMap<MetaAttribute, string> = new JUHashMap<MetaAttribute, string>();
    if (attributes) {
      if (current != null) {
        current.visitAttributes({visit:function(metaAttribute: MetaAttribute, value: any){
        if (value == null) {
          values.put(metaAttribute, null);
        } else {
          values.put(metaAttribute, value.toString());
        }
}});
      }
      if (sibling != null) {
        sibling.visitAttributes({visit:function(metaAttribute: MetaAttribute, value: any){
        var flatAtt2: string = null;
        if (value != null) {
          flatAtt2 = value.toString();
        }
        var flatAtt1: string = values.get(metaAttribute);
        var isEquals: boolean = true;
        if (flatAtt1 == null) {
          if (flatAtt2 == null) {
            isEquals = true;
          } else {
            isEquals = false;
          }
        } else {
          isEquals = flatAtt1.equals(flatAtt2);
        }
        if (isEquals) {
          if (inter) {
            traces.add(new ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
          }
        } else {
          if (!inter) {
            traces.add(new ModelSetTrace(current.uuid(), metaAttribute, flatAtt2));
          }
        }
        values.remove(metaAttribute);
}});
      }
      if (!inter && !merge && !values.isEmpty()) {
        var mettaAttributes: MetaAttribute[] = values.keySet().toArray(new Array());
        for (var i: number = 0; i < mettaAttributes.length; i++) {
          var hashLoopRes: MetaAttribute = mettaAttributes[i];
          traces.add(new ModelSetTrace(current.uuid(), hashLoopRes, null));
          values.remove(hashLoopRes);
        }
      }
    }
    var valuesRef: JUMap<MetaReference, any> = new JUHashMap<MetaReference, any>();
    if (references) {
      for (var i: number = 0; i < current.metaReferences().length; i++) {
        var reference: MetaReference = current.metaReferences()[i];
        var payload: any = current.view().dimension().universe().storage().raw(current, AccessMode.READ)[reference.index()];
        valuesRef.put(reference, payload);
      }
      if (sibling != null) {
        for (var i: number = 0; i < sibling.metaReferences().length; i++) {
          var reference: MetaReference = sibling.metaReferences()[i];
          var payload2: any = sibling.view().dimension().universe().storage().raw(sibling, AccessMode.READ)[reference.index()];
          var payload1: any = valuesRef.get(reference);
          if (reference.single()) {
            var isEquals: boolean = true;
            if (payload1 == null) {
              if (payload2 == null) {
                isEquals = true;
              } else {
                isEquals = false;
              }
            } else {
              isEquals = payload1.equals(payload2);
            }
            if (isEquals) {
              if (inter) {
                if (payload2 != null) {
                  traces.add(new ModelAddTrace(current.uuid(), reference, <number>payload2, null));
                }
              }
            } else {
              if (!inter) {
                traces.add(new ModelAddTrace(current.uuid(), reference, <number>payload2, null));
              }
            }
          } else {
            if (payload1 == null && payload2 != null) {
              var siblingToAdd: number[] = (<JUSet<number>>payload2).toArray(new Array());
              for (var j: number = 0; j < siblingToAdd.length; j++) {
                var siblingElem: number = siblingToAdd[j];
                if (!inter) {
                  traces.add(new ModelAddTrace(current.uuid(), reference, siblingElem, null));
                }
              }
            } else {
              if (payload1 != null) {
                var currentPaths: number[] = (<JUSet<number>>payload1).toArray(new Array());
                for (var j: number = 0; j < currentPaths.length; j++) {
                  var currentPath: number = currentPaths[j];
                  var isFound: boolean = false;
                  if (payload2 != null) {
                    var siblingPaths: JUSet<number> = <JUSet<number>>payload2;
                    isFound = siblingPaths.contains(currentPath);
                  }
                  if (isFound) {
                    if (inter) {
                      traces.add(new ModelAddTrace(current.uuid(), reference, currentPath, null));
                    }
                  } else {
                    if (!inter) {
                      traces.add(new ModelRemoveTrace(current.uuid(), reference, currentPath));
                    }
                  }
                }
              }
            }
          }
          valuesRef.remove(reference);
        }
        if (!inter && !merge && !values.isEmpty()) {
          var metaReferences: MetaReference[] = valuesRef.keySet().toArray(new Array());
          for (var i: number = 0; i < metaReferences.length; i++) {
            var hashLoopRes: MetaReference = metaReferences[i];
            var payload: any = valuesRef.get(hashLoopRes);
            if (payload != null) {
              if (payload instanceof JUSet) {
                var toRemoveSet: number[] = (<JUSet<number>>payload).toArray(new Array());
                for (var j: number = 0; j < toRemoveSet.length; j++) {
                  var toRemovePath: number = toRemoveSet[j];
                  traces.add(new ModelRemoveTrace(current.uuid(), hashLoopRes, toRemovePath));
                }
              } else {
                traces.add(new ModelRemoveTrace(current.uuid(), hashLoopRes, <number>payload));
              }
            }
          }
        }
      }
    }
    return traces;
  }

}

