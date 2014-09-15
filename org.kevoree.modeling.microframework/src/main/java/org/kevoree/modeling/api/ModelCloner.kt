package org.kevoree.modeling.api

import java.util.ArrayList

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 16:53
 */

public class ModelCloner(val factory: KMFFactory) {

    fun createContext(): MutableMap<KMFContainer, KMFContainer> {
        return java.util.IdentityHashMap<org.kevoree.modeling.api.KMFContainer, org.kevoree.modeling.api.KMFContainer>()
    }

    fun clone<A : org.kevoree.modeling.api.KMFContainer>(o: A): A? {
        return clone(o, false)
    }

    fun clone<A : org.kevoree.modeling.api.KMFContainer>(o: A, readOnly: Boolean): A? {
        return clone(o, readOnly, false)
    }

    fun cloneMutableOnly<A : org.kevoree.modeling.api.KMFContainer>(o: A, readOnly: Boolean): A? {
        return clone(o, readOnly, true)
    }

    private fun cloneModelElem(src: org.kevoree.modeling.api.KMFContainer): org.kevoree.modeling.api.KMFContainer {
        val clonedSrc = factory.create(src.metaClassName())!!
        val attributesCloner = object : org.kevoree.modeling.api.util.ModelAttributeVisitor {
            public override fun visit(value: Any?, name: String, parent: org.kevoree.modeling.api.KMFContainer) {
                if (value != null) {
                    if (value is ArrayList<*>) {
                        val clonedList = ArrayList<Any>()
                        clonedList.addAll(value as Collection<Any>);
                        clonedSrc.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, name, clonedList, false, false)
                    } else {
                        clonedSrc.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, name, value, false, false)
                    }
                }
            }
        }
        src.visitAttributes(attributesCloner);
        return clonedSrc;
    }

    private fun resolveModelElem(src: org.kevoree.modeling.api.KMFContainer, target: org.kevoree.modeling.api.KMFContainer, context: Map<KMFContainer, KMFContainer>, mutableOnly: Boolean) {
        val refResolver = object : org.kevoree.modeling.api.util.ModelVisitor() {
            public override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {
                if (mutableOnly && elem.isRecursiveReadOnly()) {
                    target.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, refNameInParent, elem, false, false)
                } else {
                    val elemResolved = context.get(elem)
                    if (elemResolved == null) {
                        throw Exception("Cloner error, not self-contain model, the element " + elem.path() + " is contained in the root element")
                    }
                    target.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, refNameInParent, elemResolved, false, false)
                }
            }
        }
        src.visit(refResolver, false, true, true);
    }

    private fun clone<A : org.kevoree.modeling.api.KMFContainer>(o: A, readOnly: Boolean, mutableOnly: Boolean): A? {
        val context = createContext()
        val clonedObject = cloneModelElem(o);
        context.put(o, clonedObject)
        val cloneGraphVisitor = object : org.kevoree.modeling.api.util.ModelVisitor() {
            override public fun visit(elem: org.kevoree.modeling.api.KMFContainer, refNameInParent: String, parent: org.kevoree.modeling.api.KMFContainer) {
                if (mutableOnly && elem.isRecursiveReadOnly()) {
                    noChildrenVisit();
                } else {
                    context.put(elem, cloneModelElem(elem))
                }
            }
        }
        //clone the entire object graph (i.e. object+attributes)
        o.visit(cloneGraphVisitor, true, true, false)
        val resolveGraphVisitor = object : org.kevoree.modeling.api.util.ModelVisitor() {
            override public fun visit(elem: org.kevoree.modeling.api.KMFContainer, refNameInParent: String, parent: org.kevoree.modeling.api.KMFContainer) {
                if (mutableOnly && elem.isRecursiveReadOnly()) {
                    //noChildrenVisit(); TODO check this behavior on partial clone
                } else {
                    val clonedObj = context.get(elem)!!
                    resolveModelElem(elem, clonedObj, context, mutableOnly)
                    if (readOnly) {
                        clonedObj.setInternalReadOnly()
                    }
                }
            }
        }
        //resolve root references first
        resolveModelElem(o, clonedObject, context, mutableOnly)
        //copy graph references
        o.visit(resolveGraphVisitor, true, true, false)
        if (readOnly) {
            clonedObject.setInternalReadOnly()
        }
        if (o.isRoot()) {
            factory.root(clonedObject)
        }
        return clonedObject as A
    }


}