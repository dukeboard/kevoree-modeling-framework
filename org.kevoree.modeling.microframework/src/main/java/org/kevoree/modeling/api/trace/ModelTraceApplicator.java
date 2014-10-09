package org.kevoree.modeling.api.trace;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.util.ActionType;

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

    private void tryClosePending(String srcPath) {
        if (pendingObj != null && !(pendingObjPath.equals(srcPath))) {
            pendingParent.mutate(ActionType.ADD, pendingParentRefName, pendingObj, true, fireEvents);
            pendingObj = null;
            pendingObjPath = null;
            pendingParentRefName = null;
            pendingParent = null;
        }
    }

    public void createOrAdd(String previousPath, KObject target, String refName, String potentialTypeName, Callback<Boolean> callback) throws Exception {
        Object targetElem = null;
        if (previousPath != null) {
            targetElem = targetModel.findByPath(previousPath);
        }

        if (targetElem != null) {
            target.mutate(ActionType.ADD, refName, targetElem, true, fireEvents);
        } else {
            //add to pending
            if (potentialTypeName == null) {
                throw new Exception("Unknow typeName for potential path "+previousPath+", to store in "+refName+", unconsistency error");
            }
            pendingObj = targetModel.factory().create(potentialTypeName);
            pendingObjPath = previousPath;
            pendingParentRefName = refName;
            pendingParent = target;
        }
    }

    public void applyTraceSequence(final TraceSequence traceSeq, final Callback<Throwable> callback) {

        int i = 0;
        Callback<Throwable> next = new Callback<Throwable>(){
            @Override
            public void on(Throwable throwable) {
               if(throwable != null){
                   callback.on(throwable);
                   if()
               }
            }
        };
        for (ModelTrace trace : traceSeq.traces) {

        }
        tryClosePending(null);

    }

    public void applyTrace(ModelTrace trace, Callback<Throwable> callback){
        /*
        KObject target = targetModel;
        if (trace instanceof ModelAddTrace){
            tryClosePending(null);
            if (!trace.getSrcPath().isEmpty()) {
                var resolvedTarget = targetModel.findByPath(trace.srcPath);
                if (resolvedTarget == null) {
                    throw Exception("Add Trace source not found for path : " + trace.srcPath + " pending " + pendingObjPath + "\n" + trace.toString())
                }
                target = resolvedTarget !!
            }
            createOrAdd(trace.previousPath, target, trace.refName, trace.typeName)
        }
        if (trace instanceof ModelAddAllTrace){
            tryClosePending(null);
            var i = 0
            for (path in trace.previousPath !!){
                createOrAdd(path, target, trace.refName, trace.typeName.get(i))
                i++
            }
        }
        if (trace instanceof ModelRemoveTrace){
            tryClosePending(trace.srcPath);
            var tempTarget:KObject ? = targetModel;
            if (trace.srcPath != "") {
                tempTarget = targetModel.findByPath(trace.srcPath) as ? KObject;
            }
            if (tempTarget != null) {
                //Potentially null if top tree already dropped
                tempTarget !!.
                reflexiveMutator(ActionType.REMOVE, trace.refName, targetModel.findByPath(trace.objPath), true, fireEvents)
            }
        }
        if (trace instanceof ModelRemoveAllTrace){
            tryClosePending(trace.srcPath);
            var tempTarget:KObject ? = targetModel;
            if (trace.srcPath != "") {
                tempTarget = targetModel.findByPath(trace.srcPath) as ? KObject;
            }
            if (tempTarget != null) {
                tempTarget !!.reflexiveMutator(ActionType.REMOVE_ALL, trace.refName, null, true, fireEvents)
            }
        }
        if (trace instanceof ModelSetTrace){
            tryClosePending(trace.srcPath);
            if (!trace.getSrcPath().isEmpty() && !trace.getSrcPath().equals(pendingObjPath)) {
                var tempObject = targetModel.findByPath(trace.srcPath);
                if (tempObject == null) {
                    throw Exception("Set Trace source not found for path : " + trace.srcPath + " pending " + pendingObjPath + "\n" + trace.toString())
                }
                target = tempObject as KObject;
            } else {
                if (trace.srcPath == pendingObjPath && pendingObj != null) {
                    target = pendingObj !!;
                }
            }
            if (trace.content != null) {
                target.reflexiveMutator(ActionType.SET, trace.refName, trace.content, true, fireEvents)
            } else {
                Object targetContentPath = null;

                var targetContentPath:Any ? = if (trace.objPath != null) {
                    targetModel.findByPath(trace.objPath)
                } else {
                    null
                } ;
                if (targetContentPath != null) {
                    target.mutate(ActionType.SET, trace.refName, targetContentPath, true, fireEvents);
                } else {
                    if (trace.typeName != null && trace.typeName != "") {
                        createOrAdd(trace.objPath, target, trace.refName, trace.typeName) //must create the pending element
                    } else {
                        target.reflexiveMutator(ActionType.SET, trace.refName, targetContentPath, true, fireEvents) //case real null content
                    }
                }
            }
        }
        */
    }

}
