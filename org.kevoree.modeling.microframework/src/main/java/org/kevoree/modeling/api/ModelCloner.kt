package org.kevoree.modeling.api

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/08/13
 * Time: 16:53
 */

trait ModelCloner {

    var mainFactory: KMFFactory

    open fun createContext(): MutableMap<KMFContainer, KMFContainer>

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
        val clonedSrc = mainFactory.create(src.metaClassName())!!
        val attributesCloner = object : org.kevoree.modeling.api.util.ModelAttributeVisitor {
            public override fun visit(value: Any?, name: String, parent: org.kevoree.modeling.api.KMFContainer) {
                if(value != null){
                    clonedSrc.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, name, value, false, false)
                }
            }
        }
        src.visitAttributes(attributesCloner);
        return clonedSrc;
    }

    private fun resolveModelElem(src: org.kevoree.modeling.api.KMFContainer, target: org.kevoree.modeling.api.KMFContainer, context: Map<KMFContainer, KMFContainer>, mutableOnly: Boolean) {
        val refResolver = object : org.kevoree.modeling.api.util.ModelVisitor() {
            public override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {
                 if(mutableOnly && elem.isRecursiveReadOnly()){
                     target.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, refNameInParent, elem, false, false)
                 } else {
                     target.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, refNameInParent, context.get(elem), false, false)
                 }
            }
        }
        src.visit(refResolver, false, true, true);
    }

    private fun clone<A : org.kevoree.modeling.api.KMFContainer>(o: A, readOnly: Boolean, mutableOnly: Boolean): A? {
        val context = createContext()
        val clonedObject = cloneModelElem(o);
        context.put(o, clonedObject)
        val cloneGraphVisitor = object : org.kevoree.modeling.api.util.ModelVisitor(){
            override public fun visit(elem: org.kevoree.modeling.api.KMFContainer, refNameInParent: String, parent: org.kevoree.modeling.api.KMFContainer) {
                if(mutableOnly && elem.isRecursiveReadOnly()){
                    noChildrenVisit();
                } else {
                    context.put(elem, cloneModelElem(elem))
                }
            }
        }
        o.visit(cloneGraphVisitor, true, true, false)
        val resolveGraphVisitor = object : org.kevoree.modeling.api.util.ModelVisitor(){
            override public fun visit(elem: org.kevoree.modeling.api.KMFContainer, refNameInParent: String, parent: org.kevoree.modeling.api.KMFContainer) {
                if(mutableOnly && elem.isRecursiveReadOnly()){

                } else {
                    val clonedObj = context.get(elem)!!
                    resolveModelElem(elem, clonedObj, context, mutableOnly)
                    if(readOnly){
                        clonedObj.setInternalReadOnly()
                    }
                }
            }
        }
        o.visit(resolveGraphVisitor, true, true, false)
        resolveModelElem(o, clonedObject, context, mutableOnly)
        if(readOnly){
            clonedObject.setInternalReadOnly()
        }
        return clonedObject as A
    }


}