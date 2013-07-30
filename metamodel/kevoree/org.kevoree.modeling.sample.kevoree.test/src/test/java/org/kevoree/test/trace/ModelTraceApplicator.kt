package org.kevoree.test.trace

import org.kevoree.container.KMFContainer
import org.kevoree.trace.ModelRemoveAllTrace
import org.kevoree.trace.ModelAddTrace
import org.kevoree.trace.ModelRemoveTrace
import org.kevoree.trace.ModelTrace
import org.kevoree.trace.ModelSetTrace
import org.kevoree.trace.ModelAddAllTrace
import org.kevoree.util.ActionType
import org.kevoree.impl.DefaultKevoreeFactory

/**
 * Created by duke on 25/07/13.
 */

public class ModelTraceApplicator(val targetModel: KMFContainer) {

    var factory = DefaultKevoreeFactory();
    var pendingObj: KMFContainer? = null
    var pendingParent: KMFContainer? = null
    var pendingParentRefName: String? = null
    var pendingObjPath: String? = null

    private fun tryClosePending(srcPath: String) {
        if(pendingObj != null && pendingObjPath != srcPath){
            pendingParent!!.reflexiveMutator(ActionType.ADD, pendingParentRefName!!, pendingObj)
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
            target.reflexiveMutator(ActionType.ADD, refName, targetElem)
        } else {
            //add to pending
            pendingObj = factory.create(potentialTypeName!!)
            pendingObjPath = previousPath;
            pendingParentRefName = refName;
            pendingParent = target;
        }
    }

    public fun applyTraceOnModel(traces: List<ModelTrace>) {
        println("Apply -----")
        for(trace in traces){
            println(trace)
        }
        println("-----")

        for(trace in traces){
            var target: KMFContainer = targetModel;
            if(trace is ModelAddTrace){
                val castedTrace = trace as ModelAddTrace
                tryClosePending(trace.srcPath);
                if(trace.srcPath != ""){
                    target = targetModel.findByPath(castedTrace.srcPath) as KMFContainer;
                }
                createOrAdd(castedTrace.previousPath, target, castedTrace.refName, castedTrace.typeName)
            }
            if(trace is ModelAddAllTrace){
                val castedTrace = trace as ModelAddAllTrace
                tryClosePending(trace.srcPath);
                var i = 0
                for(path in castedTrace.previousPath!!){
                    createOrAdd(path, target, castedTrace.refName, castedTrace.typeName!!.get(i))
                    i++
                }
            }
            if(trace is ModelRemoveTrace){
                val castedTrace = trace as ModelRemoveTrace
                tryClosePending(trace.srcPath);
                if(trace.srcPath != ""){
                    target = targetModel.findByPath(castedTrace.srcPath) as KMFContainer;
                }
                target.reflexiveMutator(ActionType.REMOVE, castedTrace.refName, targetModel.findByPath(castedTrace.objPath))
            }
            if(trace is ModelRemoveAllTrace){
                val castedTrace = trace as ModelRemoveAllTrace
                tryClosePending(trace.srcPath);
                if(trace.srcPath != ""){
                    target = targetModel.findByPath(castedTrace.srcPath) as KMFContainer;
                }
                target.reflexiveMutator(ActionType.REMOVE_ALL, castedTrace.refName, null)
            }
            if(trace is ModelSetTrace){
                val castedTrace = trace as ModelSetTrace
                tryClosePending(trace.srcPath);
                if(trace.srcPath != "" && castedTrace.srcPath != pendingObjPath){
                    target = targetModel.findByPath(castedTrace.srcPath) as KMFContainer;
                } else {
                    if(castedTrace.srcPath == pendingObjPath && pendingObj != null){
                        target = pendingObj!!;
                    }
                }
                if(castedTrace.content != null){
                    target.reflexiveMutator(ActionType.SET, castedTrace.refName, castedTrace.content)
                } else {
                    var targetContentPath : Any? = if(castedTrace.objPath != null){targetModel.findByPath(castedTrace.objPath!!)} else {null};
                    if(targetContentPath != null){
                        target.reflexiveMutator(ActionType.SET, castedTrace.refName, targetContentPath)
                    } else {
                        if(castedTrace.typeName != null && castedTrace.typeName != ""){
                            createOrAdd(castedTrace.objPath, target, castedTrace.refName, castedTrace.typeName) //must create the pending element
                        } else {
                            target.reflexiveMutator(ActionType.SET, castedTrace.refName, targetContentPath) //case real null content
                        }
                    }
                }
            }
        }
        tryClosePending("#Fake#Path");
    }


}