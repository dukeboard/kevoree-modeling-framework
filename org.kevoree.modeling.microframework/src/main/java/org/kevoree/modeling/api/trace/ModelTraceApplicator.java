package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KActionType;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.meta.MetaAttribute;
import org.kevoree.modeling.api.meta.MetaClass;
import org.kevoree.modeling.api.meta.MetaReference;
import org.kevoree.modeling.api.util.CallBackChain;
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
    private MetaReference pendingParentRef = null;
    private Long pendingObjKID = null;

    private void tryClosePending(Long srcKID) {
        if (pendingObj != null && !(pendingObjKID.equals(srcKID))) {
            pendingParent.mutate(KActionType.ADD, pendingParentRef, pendingObj, true);
            pendingObj = null;
            pendingObjKID = null;
            pendingParentRef = null;
            pendingParent = null;
        }
    }

    public void createOrAdd(final Long previousPath, final KObject target, final MetaReference reference, final MetaClass metaClass, final Callback<Throwable> callback) {
        if (previousPath != null) {
            targetModel.view().lookup(previousPath, new Callback<KObject>() {
                @Override
                public void on(KObject targetElem) {
                    if (targetElem != null) {
                        target.mutate(KActionType.ADD, reference, targetElem, true);
                        callback.on(null);
                    } else {
                        if (metaClass == null) {
                            callback.on(new Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
                        } else {
                            pendingObj = targetModel.view().createFQN(metaClass.metaName());
                            pendingObjKID = previousPath;
                            pendingParentRef = reference;
                            pendingParent = target;
                            callback.on(null);
                        }
                    }
                }
            });
        } else {
            if (metaClass == null) {
                callback.on(new Exception("Unknow typeName for potential path " + previousPath + ", to store in " + reference.metaName() + ", unconsistency error"));
            } else {
                pendingObj = targetModel.view().createFQN(metaClass.metaName());
                pendingObjKID = previousPath;
                pendingParentRef = reference;
                pendingParent = target;
                callback.on(null);
            }
        }
    }

    public void applyTraceSequence(final TraceSequence traceSeq, final Callback<Throwable> callback) {
        Helper.forall(traceSeq.traces(), new CallBackChain<ModelTrace>() {
            @Override
            public void on(ModelTrace modelTrace, Callback<Throwable> next) {
                applyTrace(modelTrace, next);
            }
        }, new Callback<Throwable>() {
            @Override
            public void on(Throwable throwable) {
                if (throwable != null) {
                    callback.on(throwable);
                } else {
                    tryClosePending(null);
                    callback.on(null);
                }
            }
        });
    }

    public void applyTrace(final ModelTrace trace, final Callback<Throwable> callback) {
        if (trace instanceof ModelAddTrace) {
            final ModelAddTrace addTrace = (ModelAddTrace) trace;
            tryClosePending(null);
            targetModel.view().lookup(trace.getSrcKID(), new Callback<KObject>() {
                @Override
                public void on(KObject resolvedTarget) {
                    if (resolvedTarget == null) {
                        callback.on(new Exception("Add Trace source not found for path : " + trace.getSrcKID() + " pending " + pendingObjKID + "\n" + trace.toString()));
                    } else {
                        createOrAdd(addTrace.getPreviousKID(), resolvedTarget, (MetaReference) trace.getMeta(), addTrace.getMetaClass(), callback);
                    }
                }
            });
        } else if (trace instanceof ModelRemoveTrace) {
            final ModelRemoveTrace removeTrace = (ModelRemoveTrace) trace;
            tryClosePending(trace.getSrcKID());
            targetModel.view().lookup(trace.getSrcKID(), new Callback<KObject>() {
                @Override
                public void on(final KObject targetElem) {
                    if (targetElem != null) {
                        targetModel.view().lookup(removeTrace.getObjKID(), new Callback<KObject>() {
                            @Override
                            public void on(KObject remoteObj) {
                                targetElem.mutate(KActionType.REMOVE, (MetaReference) trace.getMeta(), remoteObj, true);
                                callback.on(null);
                            }
                        });
                    } else {
                        callback.on(null);
                    }
                }
            });
        } else if (trace instanceof ModelSetTrace) {
            final ModelSetTrace setTrace = (ModelSetTrace) trace;
            tryClosePending(trace.getSrcKID());
            if (!trace.getSrcKID().equals(pendingObjKID)) {
                targetModel.view().lookup(trace.getSrcKID(), new Callback<KObject>() {
                    @Override
                    public void on(KObject tempObject) {
                        if (tempObject == null) {
                            callback.on(new Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + pendingObjKID + "\n" + trace.toString()));
                        } else {
                            tempObject.set((MetaAttribute) setTrace.getMeta(), setTrace.getContent());
                            callback.on(null);
                        }
                    }
                });
            } else {
                if (pendingObj == null) {
                    callback.on(new Exception("Set Trace source not found for path : " + trace.getSrcKID() + " pending " + pendingObjKID + "\n" + trace.toString()));
                } else {
                    pendingObj.set((MetaAttribute) setTrace.getMeta(), setTrace.getContent());
                    callback.on(null);
                }
            }
        } else {
            callback.on(new Exception("Unknow trace " + trace));
        }
    }

}
