package org.kevoree.test

import org.kevoree.modeling.api.KMFContainer
import java.io.PrintStream
import org.kevoree.modeling.api.util.ModelVisitor
import org.kevoree.modeling.api.util.ModelAttributeVisitor
import java.io.OutputStream
import java.util.HashMap

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 11:08
 */

public class JSONModelSerializer {

    public fun serialize(model: KMFContainer, raw: OutputStream) {
        val out = PrintStream(raw)
        //visitor for printing reference
        var internalReferenceVisitor = object : ModelVisitor() {
            var previousRefName: String? = null
            var isFirst = true
            override public fun beginVisitElem(elem: KMFContainer){
                previousRefName = null
                isFirst = true
            }
            override public fun endVisitElem(elem: KMFContainer){
                if(previousRefName != null){
                    out.print("]")
                }
            }
            public override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {
                if(refNameInParent != previousRefName){
                    isFirst = true
                    if(previousRefName != null){
                        out.print("]")
                    }
                    out.print(",\"" + refNameInParent + "\":[")
                    previousRefName = refNameInParent
                }
                if(!isFirst){
                    out.print(",")
                } else {
                    isFirst = false
                }
                out.print("\"" + elem.path() + "\"")
            }
        }
        //Visitor for Model naviguation
        var masterVisitor = object : ModelVisitor() {
            var previousRefName = HashMap<KMFContainer, String>()
            var isFirst = HashMap<KMFContainer, Boolean>()
            override public fun beginVisitElem(elem: KMFContainer){
                printAttName(elem, out)
                elem.visit(internalReferenceVisitor, false, false, true)
            }
            override public fun endVisitElem(elem: KMFContainer){
                if(previousRefName.get(elem.eContainer()) != null){
                    out.print("]")
                }
                out.println("}")
            }
            public override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {
                if(refNameInParent != previousRefName.get(elem.eContainer())){
                    isFirst.put(elem.eContainer()!!, true)
                    if(previousRefName.get(elem.eContainer()) != null){
                        out.print("]")
                    }
                    out.print(",\"" + refNameInParent + "\":[")
                    previousRefName.put(elem.eContainer()!!, refNameInParent)
                }
                if(isFirst.get(elem.eContainer()!!) != true){
                    out.print(",")
                } else {
                    isFirst.put(elem.eContainer()!!, false)
                }
            }
        }
        model.visit(masterVisitor, true, true, false)
    }

    fun printAttName(elem: KMFContainer, out: PrintStream) {
        out.print("\n{\"eClass\":\"" + elem.metaClassName() + "\"")
        var attributeVisitor = object : ModelAttributeVisitor {
            public override fun visit(value: Any?, name: String, parent: KMFContainer) {
                if(value != null){
                    out.print(",\"" + name + "\":\"" + value.toString() + "\"")
                }
            }
        }
        elem.visit(attributeVisitor)
    }

}
/*
fun main(args: Array<String>) {
 val load = JSONModelLoader();
 val model = load.loadModelFromStream(java.io.FileInputStream(java.io.File("/Users/duke/Documents/dev/dukeboard/kevoree-modeling-framework/metamodel/kevoree/org.kevoree.modeling.sample.kevoree.test/src/test/resources/model1.json")))!!.get(0)
 var out = ByteArrayOutputStream()

 JSONModelSerializer().serialize(model as KMFContainer, out)
 out.close()
 val model2relad = load.loadModelFromStream(java.io.ByteArrayInputStream(out.toByteArray()))!!.get(0)

}  */