package org.kevoree.modeling.api.json

import org.kevoree.modeling.api.KMFContainer
import java.io.PrintStream
import org.kevoree.modeling.api.util.ModelVisitor
import org.kevoree.modeling.api.util.ModelAttributeVisitor
import java.io.OutputStream
import java.util.HashMap
import org.kevoree.modeling.api.ModelSerializer
import java.io.ByteArrayOutputStream

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 11:08
 */

public open class JSONModelSerializer : ModelSerializer {

    override fun serialize(model: KMFContainer): String? {
        val outstream = ByteArrayOutputStream()
        serialize(model,outstream)
        outstream.close()
        return outstream.toString()
    }

    override public fun serialize(model: KMFContainer, raw: OutputStream) {
        val out = PrintStream(raw)
        //visitor for printing reference
        var internalReferenceVisitor = object : ModelVisitor() {
            override public fun beginVisitElem(elem: KMFContainer){}
            override public fun endVisitElem(elem: KMFContainer){}
            override fun beginVisitRef(refName: String) {
                out.print(",\"" + refName + "\":[")
                isFirst = true
            }
            override fun endVisitRef(refName: String) {
                out.print("]")
            }
            var isFirst = true
            public override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {
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
            var isFirstInRef = true
            override public fun beginVisitElem(elem: KMFContainer){
                if(!isFirstInRef){
                    out.print(",")
                    isFirstInRef = false
                }
                printAttName(elem, out)
                elem.visit(internalReferenceVisitor, false, false, true)
            }
            override public fun endVisitElem(elem: KMFContainer){
                out.println("}")
                isFirstInRef = false
            }
            override fun beginVisitRef(refName: String) {
                out.print(",\"" + refName + "\":[")
                isFirstInRef = true
            }
            override fun endVisitRef(refName: String) {
                out.print("]")
                isFirstInRef = false
            }
            public override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {
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
