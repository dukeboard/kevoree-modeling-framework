package org.kevoree.modeling.api.util

import org.kevoree.modeling.api.KMFContainer
import java.util.HashMap

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

    var alreadyVisited = HashMap<String,KMFContainer>()

    open fun beginVisitElem(elem : KMFContainer){}

    open fun endVisitElem(elem : KMFContainer){}

    open fun beginVisitRef(refName : String){}

    open fun endVisitRef(refName : String){}

}