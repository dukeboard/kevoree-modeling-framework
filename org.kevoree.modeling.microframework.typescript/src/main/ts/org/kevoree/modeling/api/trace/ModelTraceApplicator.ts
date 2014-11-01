///<reference path="../Callback.ts"/>
///<reference path="../KActionType.ts"/>
///<reference path="../KObject.ts"/>
///<reference path="../meta/Meta.ts"/>
///<reference path="../meta/MetaAttribute.ts"/>
///<reference path="../meta/MetaClass.ts"/>
///<reference path="../meta/MetaReference.ts"/>
///<reference path="../util/CallBackChain.ts"/>
///<reference path="../util/Helper.ts"/>

class ModelTraceApplicator {

  private targetModel: KObject<any,any> = null;
  private pendingObj: KObject<any,any> = null;
  private pendingParent: KObject<any,any> = null;
  private pendingParentRef: MetaReference = null;
  private pendingObjKID: number = null;

  constructor(targetModel: KObject<any,any>) {
    this.targetModel = targetModel;
  }

  private tryClosePending(srcKID: number): void {
    if (this.pendingObj != null && !(this.pendingObjKID.equals(srcKID))) {
      this.pendingParent.mutate(KActionType.ADD, this.pendingParentRef, this.pendingObj, true);
      this.pendingObj = null;
      this.pendingObjKID = null;
      this.pendingParentRef = null;
      this.pendingParent = null;
    }
  }

  public createOrAdd(previousPath: number, target: KObject<any,any>, reference: MetaReference, metaClass: MetaClass, callback: Callback<Throwable>): void {
    if (previousPath != null) {
      this.targetModel.view().lookup(previousPath, {on:function(targetElem: KObject){
      if (targetElem != null) {
        target.mutate(KActionType.ADD, reference, targetElem, true);
        callback.on(null);
      } else {
        if (metaClass == null) {
          callback.on(new Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
        } else {
          this.pendingObj = this.targetModel.view().createFQN(metaClass.metaName());
          this.pendingObjKID = previousPath;
          this.pendingParentRef = reference;
          this.pendingParent = target;
          callback.on(null);
        }
      }
}});
    } else {
      if (metaClass == null) {
        callback.on(new Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
      } else {
        this.pendingObj = this.targetModel.view().createFQN(metaClass.metaName());
        this.pendingObjKID = previousPath;
        this.pendingParentRef = reference;
        this.pendingParent = target;
        callback.on(null);
      }
    }
  }

  public applyTraceSequence(traceSeq: TraceSequence, callback: Callback<Throwable>): void {
    Helper.forall(traceSeq.traces(), {on:function(modelTrace: ModelTrace, next: Callback<Throwable>){
    this.applyTrace(modelTrace, next);
}}, {on:function(throwable: Throwable){
    if (throwable != null) {
      callback.on(throwable);
    } else {
      this.tryClosePending(null);
      callback.on(null);
    }
}});
  }

  public applyTrace(trace: ModelTrace, callback: Callback<Throwable>): void {
    if (trace instanceof ModelAddTrace) {
      var addTrace: ModelAddTrace = <ModelAddTrace>trace;
      this.tryClosePending(null);
      this.targetModel.view().lookup(trace.getSrcKID(), {on:function(resolvedTarget: KObject){
      if (resolvedTarget == null) {
        callback.on(new Exception("Add Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
      } else {
        this.createOrAdd(addTrace.getPreviousKID(), resolvedTarget, <MetaReference>trace.getMeta(), addTrace.getMetaClass(), callback);
      }
}});
    } else {
      if (trace instanceof ModelRemoveTrace) {
        var removeTrace: ModelRemoveTrace = <ModelRemoveTrace>trace;
        this.tryClosePending(trace.getSrcKID());
        this.targetModel.view().lookup(trace.getSrcKID(), {on:function(targetElem: KObject){
        if (targetElem != null) {
          this.targetModel.view().lookup(removeTrace.getObjKID(), {on:function(remoteObj: KObject){
          targetElem.mutate(KActionType.REMOVE, <MetaReference>trace.getMeta(), remoteObj, true);
          callback.on(null);
}});
        } else {
          callback.on(null);
        }
}});
      } else {
        if (trace instanceof ModelSetTrace) {
          var setTrace: ModelSetTrace = <ModelSetTrace>trace;
          this.tryClosePending(trace.getSrcKID());
          if (!trace.getSrcKID().equals(this.pendingObjKID)) {
            this.targetModel.view().lookup(trace.getSrcKID(), {on:function(tempObject: KObject){
            if (tempObject == null) {
              callback.on(new Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
            } else {
              tempObject.set(<MetaAttribute>setTrace.getMeta(), setTrace.getContent());
              callback.on(null);
            }
}});
          } else {
            if (this.pendingObj == null) {
              callback.on(new Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + this.pendingObjKID + "\n" + trace.toString()));
            } else {
              this.pendingObj.set(<MetaAttribute>setTrace.getMeta(), setTrace.getContent());
              callback.on(null);
            }
          }
        } else {
          callback.on(new Exception("Unknow trace " + trace));
        }
      }
    }
  }

}

