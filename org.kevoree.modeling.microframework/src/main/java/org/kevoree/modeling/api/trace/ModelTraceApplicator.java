package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.util.ActionType;
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
    private String pendingParentRefName = null;
    private String pendingObjPath = null;

    public void setFireEvents(boolean fireEvents) {
        this.fireEvents = fireEvents;
    }

    private void tryClosePending(String srcPath) {
        if (pendingObj != null && !(pendingObjPath.equals(srcPath))) {
            pendingParent.mutate(ActionType.ADD, pendingParentRefName, pendingObj, true, fireEvents);
            pendingObj = null;
            pendingObjPath = null;
            pendingParentRefName = null;
            pendingParent = null;
        }
    }

    public void createOrAdd(String previousPath, KObject target, String refName, String potentialTypeName, Callback<Throwable> callback) {
        if (previousPath != null) {
            targetModel.factory().lookup(previousPath, (targetElem) -> {
                if (targetElem != null) {
                    target.mutate(ActionType.ADD, refName, targetElem, true, fireEvents);
                    callback.on(null);
                } else {
                    if (potentialTypeName == null) {
                        callback.on(new Exception("Unknow typeName for potential path " + previousPath + ", to store in " + refName + ", unconsistency error"));
                    } else {
                        pendingObj = targetModel.factory().createFQN(potentialTypeName);
                        pendingObjPath = previousPath;
                        pendingParentRefName = refName;
                        pendingParent = target;
                        callback.on(null);
                    }
                }
            });
        } else {
            if (potentialTypeName == null) {
                callback.on(new Exception("Unknow typeName for potential path " + previousPath + ", to store in " + refName + ", unconsistency error"));
            } else {
                pendingObj = targetModel.factory().createFQN(potentialTypeName);
                pendingObjPath = previousPath;
                pendingParentRefName = refName;
                pendingParent = target;
                callback.on(null);
            }
        }
    }

    public void applyTraceSequence(final TraceSequence traceSeq, final Callback<Throwable> callback) {
        Helper.forall(traceSeq.traces, (trace, next) -> applyTrace(trace, next), (t) -> {
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
                    createOrAdd(addTrace.getPreviousPath(), resolvedTarget, trace.getRefName(), addTrace.getTypeName(), callback);
                }
            });
        } else if (trace instanceof ModelRemoveTrace) {
            ModelRemoveTrace removeTrace = (ModelRemoveTrace) trace;
            tryClosePending(trace.getSrcPath());
            targetModel.factory().lookup(trace.getSrcPath(), (targetElem) -> {
                if (targetElem != null) {
                    targetModel.factory().lookup(removeTrace.getObjPath(), (remoteObj) -> {
                        targetElem.mutate(ActionType.REMOVE, trace.getRefName(), remoteObj, true, fireEvents);
                        callback.on(null);
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
                        if (setTrace.getContent() != null) {
                            tempObject.mutate(ActionType.SET, setTrace.getRefName(), setTrace.getContent(), true, fireEvents);
                            callback.on(null);
                        } else {
                            if (setTrace.getObjPath() != null) {
                                targetModel.factory().lookup(setTrace.getObjPath(), (targetObj) -> {
                                    if (targetObj != null) {
                                        tempObject.mutate(ActionType.SET, trace.getRefName(), targetObj, true, fireEvents);
                                        callback.on(null);
                                    } else {
                                        if (trace.getTraceType() != null) {
                                            createOrAdd(setTrace.getObjPath(), tempObject, trace.getRefName(), setTrace.getTypeName(), callback); //must create the pending element
                                        } else {
                                            tempObject.mutate(ActionType.SET, trace.getRefName(), null, true, fireEvents); //case real null content
                                            callback.on(null);
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            } else {
                if (pendingObj == null) {
                    callback.on(new Exception("Set Trace source not found for path : " + trace.getSrcPath() + " pending " + pendingObjPath + "\n" + trace.toString()));
                } else {
                    if (setTrace.getContent() != null) {
                        pendingObj.mutate(ActionType.SET, setTrace.getRefName(), setTrace.getContent(), true, fireEvents);
                        callback.on(null);
                    } else {
                        if (setTrace.getObjPath() != null) {
                            targetModel.factory().lookup(setTrace.getObjPath(), (targetObj) -> {
                                if (targetObj != null) {
                                    pendingObj.mutate(ActionType.SET, trace.getRefName(), targetObj, true, fireEvents);
                                    callback.on(null);
                                } else {
                                    if (trace.getTraceType() != null) {
                                        createOrAdd(setTrace.getObjPath(), pendingObj, trace.getRefName(), setTrace.getTypeName(), callback); //must create the pending element
                                    } else {
                                        pendingObj.mutate(ActionType.SET, trace.getRefName(), null, true, fireEvents); //case real null content
                                        callback.on(null);
                                    }
                                }
                            });
                        }
                    }
                }
            }
        } else {
            callback.on(new Exception("Unknow trace "+trace));
        }
    }

}
