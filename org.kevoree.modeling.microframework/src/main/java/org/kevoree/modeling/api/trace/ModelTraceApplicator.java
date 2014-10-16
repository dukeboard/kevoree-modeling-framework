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
    private String pendingObjPath = null;

    public void setFireEvents(boolean fireEvents) {
        this.fireEvents = fireEvents;
    }

    private void tryClosePending(String srcPath) {
        if (pendingObj != null && !(pendingObjPath.equals(srcPath))) {
            pendingParent.mutate(KActionType.ADD, pendingParentRef, pendingObj, true, fireEvents, null);
            pendingObj = null;
            pendingObjPath = null;
            pendingParentRef = null;
            pendingParent = null;
        }
    }

    public void createOrAdd(String previousPath, KObject target, MetaReference reference, MetaClass metaClass, Callback<Throwable> callback) {
        if (previousPath != null) {
            targetModel.factory().lookup(previousPath, (targetElem) -> {
                if (targetElem != null) {
                    target.mutate(KActionType.ADD, reference, targetElem, true, fireEvents, callback);
                } else {
                    if (metaClass == null) {
                        callback.on(new Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
                    } else {
                        pendingObj = targetModel.factory().createFQN(metaClass.metaName());
                        pendingObjPath = previousPath;
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
                pendingObjPath = previousPath;
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
            targetModel.factory().lookup(trace.getSrcPath(), (resolvedTarget) -> {
                if (resolvedTarget == null) {
                    callback.on(new Exception("Add Trace source not found for path : " + trace.getSrcPath() + " pending " + pendingObjPath + "\n" + trace.toString()));
                } else {
                    createOrAdd(addTrace.getPreviousPath(), resolvedTarget, (MetaReference) trace.getMeta(), addTrace.getMetaClass(), callback);
                }
            });
        } else if (trace instanceof ModelRemoveTrace) {
            ModelRemoveTrace removeTrace = (ModelRemoveTrace) trace;
            tryClosePending(trace.getSrcPath());
            targetModel.factory().lookup(trace.getSrcPath(), (targetElem) -> {
                if (targetElem != null) {
                    targetModel.factory().lookup(removeTrace.getObjPath(), (remoteObj) -> {
                        targetElem.mutate(KActionType.REMOVE, (MetaReference) trace.getMeta(), remoteObj, true, fireEvents, callback);
                    });
                } else {
                    callback.on(null);
                }
            });
        } else if (trace instanceof ModelSetTrace) {
            ModelSetTrace setTrace = (ModelSetTrace) trace;
            tryClosePending(trace.getSrcPath());
            if (!trace.getSrcPath().equals(pendingObjPath)) {
                targetModel.factory().lookup(trace.getSrcPath(), (tempObject) -> {
                    if (tempObject == null) {
                        callback.on(new Exception("Set Trace source not found for path : " + trace.getSrcPath() + " pending " + pendingObjPath + "\n" + trace.toString()));
                    } else {
                        tempObject.set((org.kevoree.modeling.api.meta.MetaAttribute) setTrace.getMeta(), setTrace.getContent(), fireEvents);
                        callback.on(null);
                    }
                });
            } else {
                if (pendingObj == null) {
                    callback.on(new Exception("Set Trace source not found for path : " + trace.getSrcPath() + " pending " + pendingObjPath + "\n" + trace.toString()));
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
