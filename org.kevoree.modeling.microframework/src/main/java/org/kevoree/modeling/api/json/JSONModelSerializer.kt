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


class ModelReferenceVisitor(val out : PrintStream) : ModelVisitor() {
    override fun beginVisitRef(refName: String, refType : String) {
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

public open class JSONModelSerializer : ModelSerializer {

    override fun serialize(model: KMFContainer): String? {
        val outstream = ByteArrayOutputStream()
        serialize(model,outstream)
        outstream.close()
        return outstream.toString()
    }

    override public fun serialize(model: KMFContainer, raw: OutputStream) {
        val out = PrintStream(java.io.BufferedOutputStream(raw), false)
        //visitor for printing reference
        val internalReferenceVisitor = ModelReferenceVisitor(out)
        //Visitor for Model naviguation
        var masterVisitor = object : ModelVisitor() {
            var isFirstInRef = true
            override public fun beginVisitElem(elem: KMFContainer){
                if(!isFirstInRef){
                    out.print(",")
                    isFirstInRef = false
                }
                printAttName(elem, out)
                internalReferenceVisitor.alreadyVisited?.clear()
                elem.visit(internalReferenceVisitor, false, false, true)
            }
            override public fun endVisitElem(elem: KMFContainer){
                out.println("}")
                isFirstInRef = false
            }
            override fun beginVisitRef(refName: String, refType : String) {
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
        out.flush();
    }

    fun printAttName(elem: KMFContainer, out: PrintStream) {
        out.print("\n{\"eClass\":\"" + elem.metaClassName() + "\"")
        val attributeVisitor = object : ModelAttributeVisitor {
            public override fun visit(value: Any?, name: String, parent: KMFContainer) {
                if(value != null){
                    out.print(",\"" + name + "\":\"")
                    escapeJson(out,value.toString())
                    out.print("\"")
                }
            }
        }
        elem.visitAttributes(attributeVisitor)
    }

    private fun escapeJson(ostream : java.io.PrintStream, chain : String?) {
        if(chain == null){return;}
        var i = 0
        while(i < chain.size){
            val c = chain.get(i)
            if(c == '"') {
                ostream.print("&quot;")
            } else if(c == '\'') {
                ostream.print("&apos;")
            } else {
                ostream.print(c)
            }
            i = i + 1
        }
    }

}

