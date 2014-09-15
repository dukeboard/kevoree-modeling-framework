package org.kevoree.modeling.api;

import org.kevoree.modeling.api.events.*
import org.kevoree.modeling.api.util.ActionType

trait KMFContainer {

    fun setRecursiveReadOnly(): Unit
    fun eContainer(): KMFContainer?
    fun isReadOnly(): Boolean
    fun isRecursiveReadOnly(): Boolean
    fun setInternalReadOnly()
    fun delete()
    fun isDeleted(): Boolean
    fun modelEquals(similarObj: KMFContainer?): Boolean
    fun deepModelEquals(similarObj: KMFContainer?): Boolean
    fun getRefInParent(): String?
    fun findByPath(query: String): KMFContainer?
    fun findByID(relationName: String, idP: String): KMFContainer?
    fun path(): String
    fun metaClassName(): String
    fun reflexiveMutator(mutatorType: ActionType, refName: String, value: Any?, setOpposite: Boolean, fireEvent: Boolean)
    fun select(query: String): List<KMFContainer>
    fun addModelElementListener(lst: ModelElementListener)
    fun removeModelElementListener(lst: ModelElementListener)
    fun removeAllModelElementListeners()
    fun addModelTreeListener(lst: ModelElementListener)
    fun removeModelTreeListener(lst: ModelElementListener)
    fun removeAllModelTreeListeners()

    fun visit(visitor: org.kevoree.modeling.api.util.ModelVisitor, recursive: Boolean, containedReference: Boolean, nonContainedReference: Boolean)

    fun visitNotContained(visitor: org.kevoree.modeling.api.util.ModelVisitor)
    fun visitContained(visitor: org.kevoree.modeling.api.util.ModelVisitor)
    fun visitReferences(visitor: org.kevoree.modeling.api.util.ModelVisitor)

    fun deepVisitNotContained(visitor: org.kevoree.modeling.api.util.ModelVisitor)
    fun deepVisitContained(visitor: org.kevoree.modeling.api.util.ModelVisitor)
    fun deepVisitReferences(visitor: org.kevoree.modeling.api.util.ModelVisitor)


    fun visitAttributes(visitor: org.kevoree.modeling.api.util.ModelAttributeVisitor)

    fun createTraces(similarObj: org.kevoree.modeling.api.KMFContainer?, isInter: Boolean, isMerge: Boolean, onlyReferences: Boolean, onlyAttributes: Boolean): List<org.kevoree.modeling.api.trace.ModelTrace>
    fun toTraces(attributes: Boolean, references: Boolean): List<org.kevoree.modeling.api.trace.ModelTrace>

    fun internalGetKey(): String?

    fun isRoot() : Boolean

}