package org.kevoree.modeling.api.persistence

import org.kevoree.modeling.api.KMFContainer
import java.util.ArrayList
import org.kevoree.modeling.api.util.ModelVisitor

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 06/11/2013
 * Time: 10:47
 */

class Batch : ModelVisitor() {

    override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {
        if(elem is KMFContainerProxy){
            if(!elem.isResolved){
                noChildrenVisit() //TODO check with the nex API to stop non containeds visit as well
            } else {
                elements.add(elem)
            }
        } else {
            elements.add(elem)
        }
    }

    val elements: MutableList<KMFContainer> = ArrayList<KMFContainer>()

    fun addElement(e: KMFContainer): Batch {
        elements.add(e)
        return this;
    }

    fun addElementAndRecheable(e: KMFContainer): Batch {
        elements.add(e)
        e.visit(this, true, true, true)
        return this;
    }

}
