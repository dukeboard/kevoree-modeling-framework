package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.Helper;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 08:54
 */
public class ModelTraceApplicator {

    private KObject targetModel;

    public ModelTraceApplicator(KObject targetModel) {
        this.targetModel = targetModel;
    }

    private KObject pendingObj = null;
    private KObject pendingParent = null;
    private boolean fireEvents = true;
    private MetaReference pendingParentRef = null;
    private Long pendingObjKID = null;

    public void setFireEvents(boolean fireEvents) {
        this.fireEvents = fireEvents;
    }

    private void tryClosePending(Long srcKID) {
        if (pendingObj != null && !(pendingObjKID.equals(srcKID))) {
            pendingParent.mutate(KActionType.ADD, pendingParentRef, pendingObj, true, fireEvents);
            pendingObj = null;
            pendingObjKID = null;
            pendingParentRef = null;
            pendingParent = null;
        }
    }

    public void createOrAdd(Long previousPath, KObject target, MetaReference reference, MetaClass metaClass, Callback<Throwable> callback) {
        if (previousPath != null) {
            targetModel.factory().lookup(previousPath, (targetElem) -> {
                if (targetElem != null) {
                    target.mutate(KActionType.ADD, reference, targetElem, true, fireEvents);
                    callback.on(null);
                } else {
                    if (metaClass == null) {
                        callback.on(new Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
                    } else {
                        pendingObj = targetModel.factory().createFQN(metaClass.metaName());
                        pendingObjKID = previousPath;
                        pendingParentRef = reference;
                        pendingParent = target;
                        callback.on(null);
                    }
                }
            });
        } else {
            if (metaClass == null) {
                callback.on(new Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
            } else {
                pendingObj = targetModel.factory().createFQN(metaClass.metaName());
                pendingObjKID = previousPath;
                pendingParentRef = reference;
                pendingParent = target;
                callback.on(null);
            }
        }
    }

    public void applyTraceSequence(final TraceSequence traceSeq, final Callback<Throwable> callback) {
        Helper.forall(traceSeq.traces(), (trace, next) -> applyTrace(trace, next), (t) -> {
            if (t != null) {
                callback.on(t);
            } else {
                tryClosePending(null);
                callback.on(null);
            }
        });
    }

    public void applyTrace(ModelTrace trace, Callback<Throwable> callback) {
        if (trace instanceof ModelAddTrace) {
            ModelAddTrace addTrace = (ModelAddTrace) trace;
            tryClosePending(null);
            targetModel.factory().lookup(trace.getSrcKID(), (resolvedTarget) -> {
                if (resolvedTarget == null) {
                    callback.on(new Exception("Add Trace source not found for path : " + trace.getSrcKID() + " pending " + pendingObjKID + "\n" + trace.toString()));
                } else {
                    createOrAdd(addTrace.getPreviousKID(), resolvedTarget, (MetaReference) trace.getMeta(), addTrace.getMetaClass(), callback);
                }
            });
        } else if (trace instanceof ModelRemoveTrace) {
            ModelRemoveTrace removeTrace = (ModelRemoveTrace) trace;
            tryClosePending(trace.getSrcKID());
            targetModel.factory().lookup(trace.getSrcKID(), (targetElem) -> {
                if (targetElem != null) {
                    targetModel.factory().lookup(removeTrace.getObjKID(), (remoteObj) -> {
                        targetElem.mutate(KActionType.REMOVE, (MetaReference) trace.getMeta(), remoteObj, true, fireEvents);
                        callback.on(null);
                    });
                } else {
                    callback.on(null);
                }
            });
        } else if (trace instanceof ModelSetTrace) {
            ModelSetTrace setTrace = (ModelSetTrace) trace;
            tryClosePending(trace.getSrcKID());
            if (!trace.getSrcKID().equals(pendingObjKID)) {
                targetModel.factory().lookup(trace.getSrcKID(), (tempObject) -> {
                    if (tempObject == null) {
                        callback.on(new Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + pendingObjKID + "\n" + trace.toString()));
                    } else {
                        tempObject.set((org.kevoree.modeling.api.meta.MetaAttribute) setTrace.getMeta(), setTrace.getContent(), fireEvents);
                        callback.on(null);
                    }
                });
            } else {
                if (pendingObj == null) {
                    callback.on(new Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + pendingObjKID + "\n" + trace.toString()));
                } else {
                    pendingObj.set((org.kevoree.modeling.api.meta.MetaAttribute) setTrace.getMeta(), setTrace.getContent(), fireEvents);
                    callback.on(null);
                }
            }
        } else {
            callback.on(new Exception("Unknow trace " + trace));
        }
    }

}
