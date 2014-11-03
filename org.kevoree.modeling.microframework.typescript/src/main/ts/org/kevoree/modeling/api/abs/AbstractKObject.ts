///<reference path="../Callback.ts"/>
///<reference path="../InboundReference.ts"/>
///<reference path="../KActionType.ts"/>
///<reference path="../KDimension.ts"/>
///<reference path="../KEvent.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../KView.ts"/>
///<reference path="../ModelAttributeVisitor.ts"/>
///<reference path="../ModelListener.ts"/>
///<reference path="../ModelVisitor.ts"/>
///<reference path="../TraceRequest.ts"/>
///<reference path="../VisitResult.ts"/>
///<reference path="../data/AccessMode.ts"/>
///<reference path="../event/DefaultKEvent.ts"/>
///<reference path="../json/JSONModelSerializer.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../meta/MetaClass.ts"/>
///<reference path="../meta/MetaOperation.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../select/KSelector.ts"/>
///<reference path="../time/TimeTree.ts"/>
///<reference path="../trace/ModelAddTrace.ts"/>
///<reference path="../trace/ModelSetTrace.ts"/>
///<reference path="../trace/ModelTrace.ts"/>
///<reference path="../util/Helper.ts"/>
///<reference path="../../../../../java/util/ArrayList.ts"/>
///<reference path="../../../../../java/util/HashMap.ts"/>
///<reference path="../../../../../java/util/HashSet.ts"/>
///<reference path="../../../../../java/util/List.ts"/>
///<reference path="../../../../../java/util/Map.ts"/>
///<reference path="../../../../../java/util/Set.ts"/>

class AbstractKObject<A extends KObject<any,any>, B extends KView> implements KObject<A, B> {

  public static PARENT_INDEX: number = 0;
  public static INBOUNDS_INDEX: number = 1;
  private _isDirty: boolean = false;
  private _view: B = null;
  private _metaClass: MetaClass = null;
  private _uuid: number = 0;
  private _isDeleted: boolean = false;
  private _isRoot: boolean = false;
  private _now: number = 0;
  private _timeTree: TimeTree = null;
  private _referenceInParent: MetaReference = null;
  private _dimension: KDimension<any,any,any> = null;

  constructor(p_view: B, p_metaClass: MetaClass, p_uuid: number, p_now: number, p_dimension: KDimension<any,any,any>, p_timeTree: TimeTree) {
    this._view = p_view;
    this._metaClass = p_metaClass;
    this._uuid = p_uuid;
    this._now = p_now;
    this._dimension = p_dimension;
    this._timeTree = p_timeTree;
  }

  public isDirty(): boolean {
    return this._isDirty;
  }

  public setDirty(isDirty: boolean): void {
    this._isDirty = isDirty;
  }

  public view(): B {
    return this._view;
  }

  public uuid(): number {
    return this._uuid;
  }

  public metaClass(): MetaClass {
    return this._metaClass;
  }

  public isDeleted(): boolean {
    return this._isDeleted;
  }

  public isRoot(): boolean {
    return this._isRoot;
  }

  public setRoot(isRoot: boolean): void {
    this._isRoot = isRoot;
  }

  public now(): number {
    return this._now;
  }

  public timeTree(): TimeTree {
    return this._timeTree;
  }

  public dimension(): KDimension<any,any,any> {
    return this._dimension;
  }

  public path(callback: Callback<string>): void {
    if (this._isRoot) {
      callback.on("/");
    } else {
      this.parent({on:function(parent: KObject<any,any>){
      if (parent == null) {
        callback.on(null);
      } else {
        parent.path({on:function(parentPath: string){
        callback.on(Helper.path(parentPath, this._referenceInParent, this));
}});
      }
}});
    }
  }

  public parentUuid(): number {
    return <number>this._view.dimension().universe().storage().raw(this, AccessMode.READ)[AbstractKObject.PARENT_INDEX];
  }

  public setParentUuid(parentKID: number): void {
    this._view.dimension().universe().storage().raw(this, AccessMode.WRITE)[AbstractKObject.PARENT_INDEX] = parentKID;
  }

  public parent(callback: Callback<KObject<any,any>>): void {
    var parentKID: number = this.parentUuid();
    if (parentKID == null) {
      callback.on(null);
    } else {
      this._view.lookup(parentKID, callback);
    }
  }

  public set_referenceInParent(_referenceInParent: MetaReference): void {
    this._referenceInParent = _referenceInParent;
  }

  public referenceInParent(): MetaReference {
    return this._referenceInParent;
  }

  public delete(callback: Callback<boolean>): void {
  }

  public select(query: string, callback: Callback<List<KObject<any,any>>>): void {
    KSelector.select(this, query, callback);
  }

  public stream(query: string, callback: Callback<KObject<any,any>>): void {
  }

  public listen(listener: ModelListener): void {
    this.view().dimension().universe().storage().registerListener(this, listener);
  }

  public jump(time: number, callback: Callback<A>): void {
    this.view().dimension().time(time).lookup(this._uuid, {on:function(kObject: KObject<any,any>){
    callback.on(<A>kObject);
}});
  }

  public domainKey(): string {
    var builder: StringBuilder = new StringBuilder();
    var atts: MetaAttribute[] = this.metaAttributes();
    for (var i: number = 0; i < atts.length; i++) {
      var att: MetaAttribute = atts[i];
      if (att.key()) {
        if (builder.length() != 0) {
          builder.append(",");
        }
        builder.append(att.metaName());
        builder.append("=");
        var payload: any = this.get(att);
        if (payload != null) {
          builder.append(payload.toString());
        }
      }
    }
    return builder.toString();
  }

  public get(attribute: MetaAttribute): any {
    return attribute.strategy().extrapolate(this, attribute, this.cachedDependencies(attribute));
  }

  public set(attribute: MetaAttribute, payload: any): void {
    attribute.strategy().mutate(this, attribute, payload, this.cachedDependencies(attribute));
    var event: KEvent = new DefaultKEvent(KActionType.SET, attribute, this, null, payload);
    this.view().dimension().universe().storage().notify(event);
  }

  private cachedDependencies(attribute: MetaAttribute): KObject<any,any>[] {
    var timedDependencies: number[] = attribute.strategy().timedDependencies(this);
    var cachedObjs: KObject<any,any>[] = new Array();
    for (var i: number = 0; i < timedDependencies.length; i++) {
      if (timedDependencies[i] == this.now()) {
        cachedObjs[i] = this;
      } else {
        cachedObjs[i] = this.view().dimension().universe().storage().cacheLookup(this.dimension(), timedDependencies[i], this.uuid());
      }
    }
    return cachedObjs;
  }

  private getCreateOrUpdatePayloadList(obj: KObject<any,any>, payloadIndex: number): any {
    var previous: any = this.view().dimension().universe().storage().raw(obj, AccessMode.WRITE)[payloadIndex];
    if (previous == null) {
      if (payloadIndex == AbstractKObject.INBOUNDS_INDEX) {
        previous = new HashMap<number, number>();
      } else {
        previous = new HashSet<number>();
      }
      this.view().dimension().universe().storage().raw(obj, AccessMode.WRITE)[payloadIndex] = previous;
    }
    return previous;
  }

  private removeFromContainer(param: KObject<any,any>): void {
    if (param != null && param.parentUuid() != null && param.parentUuid() != this._uuid) {
      this.view().lookup(param.parentUuid(), {on:function(parent: KObject<any,any>){
      parent.mutate(KActionType.REMOVE, param.referenceInParent(), param, true);
}});
    }
  }

  public mutate(actionType: KActionType, metaReference: MetaReference, param: KObject<any,any>, setOpposite: boolean): void {
    if (actionType.equals(KActionType.ADD)) {
      if (metaReference.single()) {
        this.mutate(KActionType.SET, metaReference, param, setOpposite);
      } else {
        var previousList: Set<number> = <Set<number>>this.getCreateOrUpdatePayloadList(this, metaReference.index());
        previousList.add(param.uuid());
        if (metaReference.opposite() != null && setOpposite) {
          param.mutate(KActionType.ADD, metaReference.opposite(), this, false);
        }
        if (metaReference.contained()) {
          this.removeFromContainer(param);
          (<AbstractKObject<any,any>>param).set_referenceInParent(metaReference);
          (<AbstractKObject<any,any>>param).setParentUuid(this._uuid);
        }
        var inboundRefs: Map<number, number> = <Map<number, number>>this.getCreateOrUpdatePayloadList(param, AbstractKObject.INBOUNDS_INDEX);
        inboundRefs.put(this.uuid(), metaReference.index());
      }
    } else {
      if (actionType.equals(KActionType.SET)) {
        if (!metaReference.single()) {
          this.mutate(KActionType.ADD, metaReference, param, setOpposite);
        } else {
          if (param == null) {
            this.mutate(KActionType.REMOVE, metaReference, null, setOpposite);
          } else {
            var payload: any[] = this.view().dimension().universe().storage().raw(this, AccessMode.WRITE);
            var previous: any = payload[metaReference.index()];
            if (previous != null) {
              this.mutate(KActionType.REMOVE, metaReference, null, setOpposite);
            }
            payload[metaReference.index()] = param.uuid();
            if (metaReference.contained()) {
              this.removeFromContainer(param);
              (<AbstractKObject<any,any>>param).set_referenceInParent(metaReference);
              (<AbstractKObject<any,any>>param).setParentUuid(this._uuid);
            }
            var inboundRefs: Map<number, number> = <Map<number, number>>this.getCreateOrUpdatePayloadList(param, AbstractKObject.INBOUNDS_INDEX);
            inboundRefs.put(this.uuid(), metaReference.index());
            var self: KObject<any,any> = this;
            if (metaReference.opposite() != null && setOpposite) {
              if (previous != null) {
                this.view().lookup(<number>previous, {on:function(resolved: KObject<any,any>){
                resolved.mutate(KActionType.REMOVE, metaReference.opposite(), self, false);
}});
              }
              param.mutate(KActionType.ADD, metaReference.opposite(), this, false);
            }
          }
        }
      } else {
        if (actionType.equals(KActionType.REMOVE)) {
          if (metaReference.single()) {
            var raw: any[] = this.view().dimension().universe().storage().raw(this, AccessMode.WRITE);
            var previousKid: any = raw[metaReference.index()];
            raw[metaReference.index()] = null;
            if (previousKid != null) {
              var self: KObject<any,any> = this;
              this._view.dimension().universe().storage().lookup(this._view, <number>previousKid, {on:function(resolvedParam: KObject<any,any>){
              if (resolvedParam != null) {
                if (metaReference.contained()) {
                  (<AbstractKObject<any,any>>resolvedParam).set_referenceInParent(null);
                  (<AbstractKObject<any,any>>resolvedParam).setParentUuid(null);
                }
                if (metaReference.opposite() != null && setOpposite) {
                  resolvedParam.mutate(KActionType.REMOVE, metaReference.opposite(), self, false);
                }
                var inboundRefs: Map<number, number> = <Map<number, number>>this.getCreateOrUpdatePayloadList(resolvedParam, AbstractKObject.INBOUNDS_INDEX);
                inboundRefs.remove(this.uuid());
              }
}});
            }
          } else {
            var payload: any[] = this.view().dimension().universe().storage().raw(this, AccessMode.WRITE);
            var previous: any = payload[metaReference.index()];
            if (previous != null) {
              var previousList: Set<number> = <Set<number>>previous;
              if (this.now() != this._now) {
                previousList = new HashSet<number>(previousList);
                payload[metaReference.index()] = previousList;
              }
              previousList.remove(param.uuid());
              if (metaReference.contained()) {
                (<AbstractKObject<any,any>>param).set_referenceInParent(null);
                (<AbstractKObject<any,any>>param).setParentUuid(null);
              }
              if (metaReference.opposite() != null && setOpposite) {
                param.mutate(KActionType.REMOVE, metaReference.opposite(), this, false);
              }
            }
            var inboundRefs: Map<number, number> = <Map<number, number>>this.getCreateOrUpdatePayloadList(param, AbstractKObject.INBOUNDS_INDEX);
            inboundRefs.remove(this.uuid());
          }
        }
      }
    }
    var event: KEvent = new DefaultKEvent(actionType, metaReference, this, null, param);
    this.view().dimension().universe().storage().notify(event);
  }

  public size(metaReference: MetaReference): number {
    return (<Set<any>>this.view().dimension().universe().storage().raw(this, AccessMode.READ)[metaReference.index()]).size();
  }

  public each<C> (metaReference: MetaReference, callback: Callback<C>, end: Callback<Throwable>): void {
    var o: any = this.view().dimension().universe().storage().raw(this, AccessMode.READ)[metaReference.index()];
    if (o == null) {
      if (end != null) {
        end.on(null);
      } else {
        callback.on(null);
      }
    } else {
      if (o instanceof Set) {
        var objs: Set<number> = <Set<number>>o;
        this.view().lookupAll(objs, {on:function(result: List<KObject<any,any>>){
        var endAlreadyCalled: boolean = false;
        try {
          //TODO resolve for-each cycle
          var resolved: KObject<any,any>;
          for (resolved in result) {
            callback.on(<C>resolved);
          }
          endAlreadyCalled = true;
          end.on(null);
        } catch ($ex$) {
          if ($ex$ instanceof Throwable) {
            var t: Throwable = <Throwable>$ex$;
            if (!endAlreadyCalled) {
              end.on(t);
            }
          }
         }
}});
      } else {
        this.view().lookup(<number>o, {on:function(resolved: KObject<any,any>){
        if (callback != null) {
          callback.on(<C>resolved);
        }
        if (end != null) {
          end.on(null);
        }
}});
      }
    }
  }

  public visitAttributes(visitor: ModelAttributeVisitor): void {
    var metaAttributes: MetaAttribute[] = this.metaAttributes();
    for (var i: number = 0; i < metaAttributes.length; i++) {
      visitor.visit(metaAttributes[i], this.get(metaAttributes[i]));
    }
  }

  public metaAttribute(name: string): MetaAttribute {
    for (var i: number = 0; i < this.metaAttributes().length; i++) {
      if (this.metaAttributes()[i].metaName().equals(name)) {
        return this.metaAttributes()[i];
      }
    }
    return null;
  }

  public metaReference(name: string): MetaReference {
    for (var i: number = 0; i < this.metaReferences().length; i++) {
      if (this.metaReferences()[i].metaName().equals(name)) {
        return this.metaReferences()[i];
      }
    }
    return null;
  }

  public metaOperation(name: string): MetaOperation {
    for (var i: number = 0; i < this.metaOperations().length; i++) {
      if (this.metaOperations()[i].metaName().equals(name)) {
        return this.metaOperations()[i];
      }
    }
    return null;
  }

  public visit(visitor: ModelVisitor, end: Callback<Throwable>): void {
    this.internal_visit(visitor, end, false, false, null);
  }

  private internal_visit(visitor: ModelVisitor, end: Callback<Throwable>, deep: boolean, treeOnly: boolean, alreadyVisited: HashSet<number>): void {
    if (alreadyVisited != null) {
      alreadyVisited.add(this.uuid());
    }
    var toResolveds: Set<number> = new HashSet<number>();
    for (var i: number = 0; i < this.metaReferences().length; i++) {
      var reference: MetaReference = this.metaReferences()[i];
      if (!(treeOnly && !reference.contained())) {
        var raw: any[] = this.view().dimension().universe().storage().raw(this, AccessMode.READ);
        var o: any = null;
        if (raw != null) {
          o = raw[reference.index()];
        }
        if (o != null) {
          if (o instanceof Set) {
            var ol: Set<number> = <Set<number>>o;
            //TODO resolve for-each cycle
            var toAdd: number;
            for (toAdd in ol) {
              toResolveds.add(toAdd);
            }
          } else {
            toResolveds.add(<number>o);
          }
        }
      }
    }
    if (toResolveds.isEmpty()) {
      end.on(null);
    } else {
      this.view().lookupAll(toResolveds, {on:function(resolveds: List<KObject<any,any>>){
      var nextDeep: List<KObject<any,any>> = new ArrayList<KObject<any,any>>();
      //TODO resolve for-each cycle
      var resolved: KObject<any,any>;
      for (resolved in resolveds) {
        var result: VisitResult = visitor.visit(resolved);
        if (result.equals(VisitResult.STOP)) {
          end.on(null);
        } else {
          if (deep) {
            if (result.equals(VisitResult.CONTINUE)) {
              if (alreadyVisited == null || !alreadyVisited.contains(resolved.uuid())) {
                nextDeep.add(resolved);
              }
            }
          }
        }
      }
      if (!nextDeep.isEmpty()) {
        var i: number[] = new Array();
        i[0] = 0;
        var next: Callback<Throwable>[] = new Array();
        next[0] = {on:function(throwable: Throwable){
        i[0] = i[0] + 1;
        if (i[0] == nextDeep.size()) {
          end.on(null);
        } else {
          if (treeOnly) {
            nextDeep.get(i[0]).treeVisit(visitor, next[0]);
          } else {
            nextDeep.get(i[0]).graphVisit(visitor, next[0]);
          }
        }
}};
        if (treeOnly) {
          nextDeep.get(i[0]).treeVisit(visitor, next[0]);
        } else {
          nextDeep.get(i[0]).graphVisit(visitor, next[0]);
        }
      } else {
        end.on(null);
      }
}});
    }
  }

  public graphVisit(visitor: ModelVisitor, end: Callback<Throwable>): void {
    this.internal_visit(visitor, end, true, false, new HashSet<number>());
  }

  public treeVisit(visitor: ModelVisitor, end: Callback<Throwable>): void {
    this.internal_visit(visitor, end, true, true, null);
  }

  public toJSON(): string {
    var builder: StringBuilder = new StringBuilder();
    builder.append("{\n");
    builder.append("\t\"" + JSONModelSerializer.KEY_META + "\" : \"");
    builder.append(this.metaClass().metaName());
    builder.append("\",\n");
    builder.append("\t\"" + JSONModelSerializer.KEY_UUID + "\" : \"");
    builder.append(this.uuid());
    if (this.isRoot()) {
      builder.append("\",\n");
      builder.append("\t\"" + JSONModelSerializer.KEY_ROOT + "\" : \"");
      builder.append("true");
    }
    builder.append("\",\n");
    for (var i: number = 0; i < this.metaAttributes().length; i++) {
      var payload: any = this.get(this.metaAttributes()[i]);
      if (payload != null) {
        builder.append("\t");
        builder.append("\"");
        builder.append(this.metaAttributes()[i].metaName());
        builder.append("\":\"");
        builder.append(payload);
        builder.append("\",\n");
      }
    }
    for (var i: number = 0; i < this.metaReferences().length; i++) {
      var raw: any[] = this.view().dimension().universe().storage().raw(this, AccessMode.READ);
      var payload: any = null;
      if (raw != null) {
        payload = raw[this.metaReferences()[i].index()];
      }
      if (payload != null) {
        builder.append("\t");
        builder.append("\"");
        builder.append(this.metaReferences()[i].metaName());
        builder.append("\":");
        if (this.metaReferences()[i].single()) {
          builder.append("\"");
          builder.append(payload);
          builder.append("\"");
        } else {
          var elems: Set<number> = <Set<number>>payload;
          var elemsArr: number[] = elems.toArray(new Array());
          var isFirst: boolean = true;
          builder.append(" [");
          for (var j: number = 0; j < elemsArr.length; j++) {
            if (!isFirst) {
              builder.append(",");
            }
            builder.append("\"");
            builder.append(elemsArr[j]);
            builder.append("\"");
            isFirst = false;
          }
          builder.append("]");
        }
        builder.append(",\n");
      }
    }
    builder.append("}\n");
    return builder.toString();
  }

  public toString(): string {
    return this.toJSON();
  }

  public traces(request: TraceRequest): List<ModelTrace> {
    var traces: List<ModelTrace> = new ArrayList<ModelTrace>();
    if (TraceRequest.ATTRIBUTES_ONLY.equals(request) || TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
      for (var i: number = 0; i < this.metaAttributes().length; i++) {
        var current: MetaAttribute = this.metaAttributes()[i];
        var payload: any = this.get(current);
        if (payload != null) {
          traces.add(new ModelSetTrace(this._uuid, current, payload));
        }
      }
    }
    if (TraceRequest.REFERENCES_ONLY.equals(request) || TraceRequest.ATTRIBUTES_REFERENCES.equals(request)) {
      for (var i: number = 0; i < this.metaReferences().length; i++) {
        var ref: MetaReference = this.metaReferences()[i];
        var raw: any[] = this.view().dimension().universe().storage().raw(this, AccessMode.READ);
        var o: any = null;
        if (raw != null) {
          o = raw[ref.index()];
        }
        if (o instanceof Set) {
          var contents: Set<number> = <Set<number>>o;
          var contentsArr: number[] = contents.toArray(new Array());
          for (var j: number = 0; j < contentsArr.length; j++) {
            traces.add(new ModelAddTrace(this._uuid, ref, contentsArr[j], null));
          }
        } else {
          if (o != null) {
            traces.add(new ModelAddTrace(this._uuid, ref, <number>o, null));
          }
        }
      }
    }
    return traces;
  }

  public inbounds(callback: Callback<InboundReference>, end: Callback<Throwable>): void {
    var rawPayload: any[] = this.view().dimension().universe().storage().raw(this, AccessMode.READ);
    if (rawPayload == null) {
      end.on(new Exception("Object not initialized."));
    } else {
      var payload: any = rawPayload[AbstractKObject.INBOUNDS_INDEX];
      if (payload != null) {
        if (payload instanceof Map) {
          var refs: Map<number, number> = <Map<number, number>>payload;
          var oppositeKids: Set<number> = new HashSet<number>();
          oppositeKids.addAll(refs.keySet());
          this._view.lookupAll(oppositeKids, {on:function(oppositeElements: List<KObject<any,any>>){
          if (oppositeElements != null) {
            //TODO resolve for-each cycle
            var opposite: KObject<any,any>;
            for (opposite in oppositeElements) {
              var inboundRef: number = refs.get(opposite.uuid());
              var metaRef: MetaReference = null;
              var metaReferences: MetaReference[] = opposite.metaReferences();
              for (var i: number = 0; i < metaReferences.length; i++) {
                if (metaReferences[i].index() == inboundRef) {
                  metaRef = metaReferences[i];
                  break;
                }
              }
              if (metaRef != null) {
                var reference: InboundReference = new InboundReference(metaRef, opposite);
                try {
                  callback.on(reference);
                } catch ($ex$) {
                  if ($ex$ instanceof Throwable) {
                    var t: Throwable = <Throwable>$ex$;
                    end.on(t);
                  }
                 }
              } else {
                end.on(new Exception("MetaReference not found with index:" + inboundRef + " in refs of " + opposite.metaClass().metaName()));
              }
            }
            end.on(null);
          } else {
            end.on(new Exception("Could not resolve opposite objects"));
          }
}});
        } else {
          end.on(new Exception("Inbound refs payload is not a cset"));
        }
      } else {
        end.on(null);
      }
    }
  }

  public metaAttributes(): MetaAttribute[] {
    throw "Abstract method";
  }

  public metaReferences(): MetaReference[] {
    throw "Abstract method";
  }

  public metaOperations(): MetaOperation[] {
    throw "Abstract method";
  }

}

