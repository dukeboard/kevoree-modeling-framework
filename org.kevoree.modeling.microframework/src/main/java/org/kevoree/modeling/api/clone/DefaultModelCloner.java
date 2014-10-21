package org.kevoree.modeling.api.clone;

import org.kevoree.modeling.api.Callback;
import org.kevoree.modeling.api.KView;
import org.kevoree.modeling.api.KObject;
import org.kevoree.modeling.api.ModelCloner;

public class DefaultModelCloner implements ModelCloner {
    private KView factory;

    public DefaultModelCloner(KView factory) {
        this.factory = factory;
    }

    @Override
    public void clone(KObject o, Callback callback) {
        throw new UnsupportedOperationException();
    }

    /*
    private fun createContext(): MutableMap<KObject<*>, KObject<*>> {
        return IdentityHashMap<KObject<*>, KObject<*>>()
    }

    fun clone<A : KObject>(o: A): A? {
        return clone(o, false)
    }

    fun clone<A : KObject>(o: A, readOnly: Boolean): A? {
        return clone(o, readOnly, false)
    }

    private fun cloneModelElem(src: KObject<*>): KObject {
        val clonedSrc = factory.create(src.metaClassName())
        val attributesCloner = object : ModelAttributeVisitor {
            public override fun visit(value: Any?, name: STRING, parent: KObject) {
                if (value != null) {
                    if (value is ArrayList<*>) {
                        val clonedList = ArrayList<Any>()
                        clonedList.addAll(value as Collection<Any>);
                        clonedSrc.reflexiveMutator(ActionType.SET, name, clonedList, false, false)
                    } else {
                        clonedSrc.reflexiveMutator(ActionType.SET, name, value, false, false)
                    }
                }
            }
        }
        src.visitAttributes(attributesCloner);
        return clonedSrc;
    }

    private fun resolveModelElem(src: KObject, target: KObject, context: Map<KObject, KObject>, mutableOnly: Boolean) {
        val refResolver = object : ModelVisitor() {
            public override fun visit(elem: KObject, refNameInParent: STRING, parent: KObject) {
                if (mutableOnly && elem.isRecursiveReadOnly()) {
                    target.reflexiveMutator(ActionType.ADD, refNameInParent, elem, false, false)
                } else {
                    val elemResolved = context.get(elem)
                    if (elemResolved == null) {
                        throw Exception("Cloner error, not self-contain model, the element " + elem.path() + " is contained in the root element")
                    }
                    target.reflexiveMutator(ActionType.ADD, refNameInParent, elemResolved, false, false)
                }
            }
        }
        src.visit(refResolver, false, true, true);
    }

    private fun clone<A : KObject>(o: A, readOnly: Boolean, mutableOnly: Boolean): A? {
        val context = createContext()
        val clonedObject = cloneModelElem(o);
        context.put(o, clonedObject)
        val cloneGraphVisitor = object : ModelVisitor() {
            override public fun visit(elem: KObject, refNameInParent: STRING, parent: KObject) {
                if (mutableOnly && elem.isRecursiveReadOnly()) {
                    noChildrenVisit();
                } else {
                    context.put(elem, cloneModelElem(elem))
                }
            }
        }
        //clone the entire object graph (i.e. object+attributes)
        o.visit(cloneGraphVisitor, true, true, false)
        val resolveGraphVisitor = object : ModelVisitor() {
            override public fun visit(elem: KObject, refNameInParent: STRING, parent: KObject<*>) {
                if (mutableOnly && elem.isRecursiveReadOnly()) {
                    //noChildrenVisit(); TODO check this behavior on partial clone
                } else {
                    val clonedObj = context.get(elem)!!
                    resolveModelElem(elem, clonedObj, context, mutableOnly)
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
    */


}