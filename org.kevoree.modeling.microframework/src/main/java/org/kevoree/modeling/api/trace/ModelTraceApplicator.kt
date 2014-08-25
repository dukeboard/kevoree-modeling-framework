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
    var fireEvents: Boolean = true

    private fun tryClosePending(srcPath: String?) {
        if(pendingObj != null && pendingObjPath != srcPath){
            pendingParent!!.reflexiveMutator(ActionType.ADD, pendingParentRefName!!, pendingObj, true, fireEvents)
            pendingObj = null
            pendingObjPath = null
            pendingParentRefName = null
            pendingParent = null
        }
    }

    public fun createOrAdd(previousPath: String?, target: KMFContainer, refName: String, potentialTypeName: String?) {
        var targetElem: Any? = null
        if(previousPath!=null){
            targetElem = targetModel.findByPath(previousPath)
        }
        if(targetElem != null){
            target.reflexiveMutator(ActionType.ADD, refName, targetElem, true, fireEvents)
        } else {
            //add to pending
            if(potentialTypeName == null){
                throw Exception("Unknow typeName for potential path $previousPath, to store in $refName, unconsistency error")
            }
            pendingObj = factory.create(potentialTypeName)
            pendingObjPath = previousPath;
            pendingParentRefName = refName;
            pendingParent = target;
        }
    }

    public fun applyTraceOnModel(traceSeq: TraceSequence) {
        for(trace in traceSeq.traces){
            var target: KMFContainer = targetModel;
            if(trace is ModelAddTrace){
                tryClosePending(null);
                if(trace.srcPath != ""){
                    var resolvedTarget = targetModel.findByPath(trace.srcPath)
                    if(resolvedTarget==null){
                        throw Exception("Add Trace source not found for path : " + trace.srcPath + " pending " + pendingObjPath + "\n" + trace.toString())
                    }
                    target = resolvedTarget!!
                }
                createOrAdd(trace.previousPath, target, trace.refName, trace.typeName)
            }
            if(trace is ModelAddAllTrace){
                tryClosePending(null);
                var i = 0
                for(path in trace.previousPath!!){
                    createOrAdd(path, target, trace.refName, trace.typeName!!.get(i))
                    i++
                }
            }
            if(trace is ModelRemoveTrace){
                tryClosePending(trace.srcPath);
                var tempTarget: KMFContainer? = targetModel;
                if(trace.srcPath != ""){
                    tempTarget = targetModel.findByPath(trace.srcPath) as? KMFContainer;
                }
                if(tempTarget != null){
                    //Potentially null if top tree already dropped
                    tempTarget!!.reflexiveMutator(ActionType.REMOVE, trace.refName, targetModel.findByPath(trace.objPath), true, fireEvents)
                }
            }
            if(trace is ModelRemoveAllTrace){
                tryClosePending(trace.srcPath);
                var tempTarget: KMFContainer? = targetModel;
                if(trace.srcPath != ""){
                    tempTarget = targetModel.findByPath(trace.srcPath) as? KMFContainer;
                }
                if(tempTarget != null){
                    tempTarget!!.reflexiveMutator(ActionType.REMOVE_ALL, trace.refName, null, true, fireEvents)
                }
            }
            if(trace is ModelSetTrace){
                tryClosePending(trace.srcPath);
                if(trace.srcPath != "" && trace.srcPath != pendingObjPath){
                    var tempObject = targetModel.findByPath(trace.srcPath)
                    if(tempObject == null){
                        throw Exception("Set Trace source not found for path : " + trace.srcPath + " pending " + pendingObjPath + "\n" + trace.toString())
                    }
                    target = tempObject as KMFContainer;
                } else {
                    if(trace.srcPath == pendingObjPath && pendingObj != null){
                        target = pendingObj!!;
                    }
                }
                if(trace.content != null){
                    target.reflexiveMutator(ActionType.SET, trace.refName, trace.content, true, fireEvents)
                } else {
                    var targetContentPath: Any? = if(trace.objPath != null){
                        targetModel.findByPath(trace.objPath)
                    } else {
                        null
                    };
                    if(targetContentPath != null){
                        target.reflexiveMutator(ActionType.SET, trace.refName, targetContentPath, true, fireEvents)
                    } else {
                        if(trace.typeName != null && trace.typeName != ""){
                            createOrAdd(trace.objPath, target, trace.refName, trace.typeName) //must create the pending element
                        } else {
                            target.reflexiveMutator(ActionType.SET, trace.refName, targetContentPath, true, fireEvents) //case real null content
                        }
                    }
                }
            }
        }
        tryClosePending(null);
    }

}
