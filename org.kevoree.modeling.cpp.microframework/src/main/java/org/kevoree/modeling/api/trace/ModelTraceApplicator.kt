package org.kevoree.modeling.api.trace

import org.kevoree.modeling.api.util.ActionType
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.KMFFactory

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/08/13
 * Time: 08:54
 */
class ModelTraceApplicator(val targetModel: KMFContainer, val factory: KMFFactory) {

    var pendingObj: KMFContainer? = null
    var pendingParent: KMFContainer? = null
    var pendingParentRefName: String? = null
    var pendingObjPath: String? = null

    private fun tryClosePending(srcPath: String?) {
        if(pendingObj != null && pendingObjPath != srcPath){
            pendingParent!!.reflexiveMutator(ActionType.ADD, pendingParentRefName!!, pendingObj,true,true)
            pendingObj = null
            pendingObjPath = null
            pendingParentRefName = null
            pendingParent = null
        }
    }

    public fun createOrAdd(previousPath: String?, target: KMFContainer, refName: String, potentialTypeName: String?) {
        val targetElem: Any? = if(previousPath != null){
            targetModel.findByPath(previousPath)
        } else {
            null
        }
        if(targetElem != null){
            target.reflexiveMutator(ActionType.ADD, refName, targetElem,true,true)
        } else {
            //add to pending
            pendingObj = factory.create(potentialTypeName!!)
            pendingObjPath = previousPath;
            pendingParentRefName = refName;
            pendingParent = target;
        }
    }

    public fun applyTraceOnModel(traceSeq: TraceSequence) {

        for(trace in traceSeq.traces){
            var target: KMFContainer = targetModel;
            if(trace is ModelAddTrace){
                val castedTrace = trace as ModelAddTrace
                tryClosePending(null);
                if(trace.srcPath != ""){
                    target = targetModel.findByPath(castedTrace.srcPath) as KMFContainer;
                }
                createOrAdd(castedTrace.previousPath, target, castedTrace.refName, castedTrace.typeName)
            }
            if(trace is ModelAddAllTrace){
                val castedTrace = trace as ModelAddAllTrace
                tryClosePending(null);
                var i = 0
                for(path in castedTrace.previousPath!!){
                    createOrAdd(path, target, castedTrace.refName, castedTrace.typeName!!.get(i))
                    i++
                }
            }
            if(trace is ModelRemoveTrace){
                val castedTrace = trace as ModelRemoveTrace
                tryClosePending(trace.srcPath);
                var tempTarget: KMFContainer? = targetModel;
                if(trace.srcPath != ""){
                    tempTarget = targetModel.findByPath(castedTrace.srcPath) as? KMFContainer;
                }
                if(tempTarget != null){
                    //Potentially null if top tree already dropped
                    tempTarget!!.reflexiveMutator(ActionType.REMOVE, castedTrace.refName, targetModel.findByPath(castedTrace.objPath),true,true)
                }
            }
            if(trace is ModelRemoveAllTrace){
                val castedTrace = trace as ModelRemoveAllTrace
                tryClosePending(trace.srcPath);
                var tempTarget: KMFContainer? = targetModel;
                if(trace.srcPath != ""){
                    tempTarget = targetModel.findByPath(castedTrace.srcPath) as? KMFContainer;
                }
                if(tempTarget != null){
                    tempTarget!!.reflexiveMutator(ActionType.REMOVE_ALL, castedTrace.refName, null,true,true)
                }
            }
            if(trace is ModelSetTrace){
                val castedTrace = trace as ModelSetTrace
                tryClosePending(trace.srcPath);
                if(trace.srcPath != "" && castedTrace.srcPath != pendingObjPath){
                    var tempObject = targetModel.findByPath(castedTrace.srcPath)
                    if(tempObject == null){

                        throw Exception("Set Trace source not found for path : " + castedTrace.srcPath + "/ pending " + pendingObjPath + "\n" + trace.toString())
                    }
                    target = tempObject as KMFContainer;
                } else {
                    if(castedTrace.srcPath == pendingObjPath && pendingObj != null){
                        target = pendingObj!!;
                    }
                }
                if(castedTrace.content != null){
                    target.reflexiveMutator(ActionType.SET, castedTrace.refName, castedTrace.content,true,true)
                } else {
                    var targetContentPath: Any? = if(castedTrace.objPath != null){
                        targetModel.findByPath(castedTrace.objPath!!)
                    } else {
                        null
                    };
                    if(targetContentPath != null){
                        target.reflexiveMutator(ActionType.SET, castedTrace.refName, targetContentPath,true,true)
                    } else {
                        if(castedTrace.typeName != null && castedTrace.typeName != ""){
                            createOrAdd(castedTrace.objPath, target, castedTrace.refName, castedTrace.typeName) //must create the pending element
                        } else {
                            target.reflexiveMutator(ActionType.SET, castedTrace.refName, targetContentPath,true,true) //case real null content
                        }
                    }
                }
            }
        }
        tryClosePending(null);
    }

}
