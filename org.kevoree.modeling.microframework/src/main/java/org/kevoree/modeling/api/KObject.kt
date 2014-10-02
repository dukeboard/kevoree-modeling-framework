package org.kevoree.modeling.api;

import org.kevoree.modeling.api.events.*
import org.kevoree.modeling.api.util.ActionType
import org.kevoree.modeling.api.time.TimeTree

public trait KObject<out A> {

    fun isDeleted(): Boolean
    fun isRoot(): Boolean
    fun path(): String
    fun metaClassName(): String
    fun referenceInParent(): String?
    fun key(): String?
    fun dimension(): String

    fun delete(callback: Callback<Boolean>)
    fun parent(callback: Callback<KObject<out Any>?>)

    fun modelEquals(similarObj: A): Boolean
    fun deepModelEquals(similarObj: A, callback: Callback<Boolean>)

    fun findByPath(query: String, callback: Callback<KObject<*>?>)
    fun findByID(relationName: String, idP: String, callback: Callback<KObject<*>?>)
    fun select(query: String, callback: Callback<List<KObject<*>>>)
    fun stream(query: String, callback: Callback<KObject<*>>)

    /* Listener management */
    fun addModelElementListener(lst: ModelElementListener)
    fun removeModelElementListener(lst: ModelElementListener)
    fun removeAllModelElementListeners()
    fun addModelTreeListener(lst: ModelElementListener)
    fun removeModelTreeListener(lst: ModelElementListener)
    fun removeAllModelTreeListeners()

    /* Visit API */
    fun visitNotContained(visitor: ModelVisitor)
    fun visitContained(visitor: ModelVisitor)
    fun visitAll(visitor: ModelVisitor)
    fun deepVisitNotContained(visitor: ModelVisitor)
    fun deepVisitContained(visitor: ModelVisitor)
    fun deepVisitAll(visitor: ModelVisitor)
    fun visitAttributes(visitor: ModelAttributeVisitor)

    /* Powerful Trace API, maybe consider to hide TODO */
    fun createTraces(similarObj: A, isInter: Boolean, isMerge: Boolean, onlyReferences: Boolean, onlyAttributes: Boolean): List<org.kevoree.modeling.api.trace.ModelTrace>
    fun toTraces(attributes: Boolean, references: Boolean): List<org.kevoree.modeling.api.trace.ModelTrace>
    fun mutate(mutatorType: ActionType, refName: String, value: Any?, setOpposite: Boolean, fireEvent: Boolean, callback: Callback<Boolean>)
    /* end to clean zone TODO */

    /* Time navigation */
    fun now(): Long
    fun jump(time: Long, callback: Callback<A?>)
    fun timeTree(): TimeTree


}