package org.kevoree.modeling.api;

import org.kevoree.modeling.api.events.*

trait KMFContainer {

    fun setRecursiveReadOnly(): Unit
    fun eContainer(): KMFContainer?
    fun isReadOnly(): Boolean
    fun isRecursiveReadOnly(): Boolean
    fun setInternalReadOnly()
    fun delete()
    fun modelEquals(similarObj: KMFContainer?): Boolean
    fun deepModelEquals(similarObj: KMFContainer?): Boolean
    fun getRefInParent(): String?
    fun findByPath(query: String): KMFContainer?
    fun findByID(relationName : String,idP : String) : KMFContainer?
    fun path(): String?
    fun metaClassName(): String
    fun reflexiveMutator(mutatorType: Int, refName: String, value: Any?, setOpposite : Boolean, fireEvent : Boolean)
    fun selectByQuery(query : String) : List<Any>
    fun addModelElementListener(lst : ModelElementListener)
    fun removeModelElementListener(lst : ModelElementListener )
    fun removeAllModelElementListeners()
    fun addModelTreeListener(lst : ModelElementListener)
    fun removeModelTreeListener(lst : ModelElementListener)
    fun removeAllModelTreeListeners()

    fun visit(visitor : org.kevoree.modeling.api.util.ModelVisitor, recursive : Boolean, containedReference : Boolean,nonContainedReference : Boolean)
    fun visitAttributes(visitor : org.kevoree.modeling.api.util.ModelAttributeVisitor)

    fun createTraces(similarObj : org.kevoree.modeling.api.KMFContainer?, isInter : Boolean, isMerge : Boolean, onlyReferences : Boolean, onlyAttributes : Boolean) : List<org.kevoree.modeling.api.trace.ModelTrace>

}