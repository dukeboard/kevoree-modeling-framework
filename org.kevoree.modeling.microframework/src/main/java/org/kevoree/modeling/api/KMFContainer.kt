package org.kevoree.modeling.api;

import org.kevoree.modeling.api.events.*
import org.kevoree.modeling.api.util.ModelVisitor

trait KMFContainer {

    fun setRecursiveReadOnly(): Unit
    fun eContainer(): KMFContainer?
    fun isReadOnly(): Boolean
    fun isRecursiveReadOnly(): Boolean
    fun setInternalReadOnly()
    fun delete()
    fun modelEquals(similarObj: Any?): Boolean
    fun deepModelEquals(similarObj: Any?): Boolean
    fun getRefInParent(): String?
    fun findByPath(query: String): Any?
    fun path(): String?
    fun metaClassName(): String
    fun reflexiveMutator(mutatorType: Int, refName: String, value: Any?, noOpposite : Boolean = false)
    fun containedElementsList(): List<Any>

    fun selectByQuery(query : String) : List<Any>

    fun addModelElementListener(lst : ModelElementListener)
    fun removeModelElementListener(lst : ModelElementListener )
    fun removeAllModelElementListeners()
    fun addModelTreeListener(lst : ModelElementListener)
    fun removeModelTreeListener(lst : ModelElementListener)
    fun removeAllModelTreeListeners()


    fun findByPath<A>(query : String, clazz : Class<A>) : A?
    fun containedElements() : Iterable<KMFContainer>
    fun containedAllElements() : Iterable<KMFContainer>

    fun visit(visitor : org.kevoree.modeling.api.util.ModelVisitor, recursive : Boolean, onlyContainedRef : Boolean)

}