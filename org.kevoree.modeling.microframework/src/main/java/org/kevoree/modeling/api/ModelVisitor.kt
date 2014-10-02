package org.kevoree.modeling.api

import java.util.HashMap

public abstract class ModelVisitor {

    var visitStopped = false

    fun stopVisit() {
        visitStopped = true
    }

    var visitChildren = true

    var visitReferences = true

    fun noChildrenVisit() {
        visitChildren = false
    }

    fun noReferencesVisit() {
        visitReferences = false
    }

    public abstract fun visit(elem: KObject<*>, refNameInParent: String, parent: KObject<*>)

    var alreadyVisited: HashMap<String, KObject<*>>? = null

    open fun beginVisitElem(elem: KObject<*>) {
    }

    open fun endVisitElem(elem: KObject<*>) {
    }

    open fun beginVisitRef(refName: String, refType: String): Boolean {
        return true;
    }

    open fun endVisitRef(refName: String) {
    }

}