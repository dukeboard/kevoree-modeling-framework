package org.kevoree.modeling.api.util

import org.kevoree.modeling.api.KMFContainer

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 26/08/13
 * Time: 08:36
 */

public abstract class ModelVisitor {

    var visitStopped = false

    fun stopVisit(){
        visitStopped = true
    }

    var visitChildren = true

    fun noChildrenVisit(){
        visitChildren = true
    }

    public abstract fun visit(elem : KMFContainer, refNameInParent : String, parent : KMFContainer)

}