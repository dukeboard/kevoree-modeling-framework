package org.kevoree.modeling.api.json

import org.kevoree.modeling.api.KObject
import java.io.PrintStream
import org.kevoree.modeling.api.util.ModelVisitor
import org.kevoree.modeling.api.util.ModelAttributeVisitor
import java.io.OutputStream
import org.kevoree.modeling.api.ModelSerializer
import java.io.ByteArrayOutputStream
import org.kevoree.modeling.api.util.AttConverter

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 28/08/13
 * Time: 11:08
 */


class ModelReferenceVisitor(val out: PrintStream) : ModelVisitor() {
    override fun beginVisitRef(refName: String, refType: String): Boolean {
        out.print(",\"" + refName + "\":[")
        isFirst = true
        return true
    }
    override fun endVisitRef(refName: String) {
        out.print("]")
    }
    var isFirst = true
    public override fun visit(elem: KObject, refNameInParent: String, parent: KObject) {
        if (!isFirst) {
            out.print(",")
        } else {
            isFirst = false
        }
        out.print("\"" + elem.path() + "\"")
    }
}

public class JSONModelSerializer() : ModelSerializer {

    override fun serialize(model: KObject): String? {
        val outstream = ByteArrayOutputStream()
        serializeToStream(model, outstream)
        outstream.close()
        return outstream.toString()
    }

    override public fun serializeToStream(model: KObject, raw: OutputStream) {
        val out = PrintStream(java.io.BufferedOutputStream(raw), false)
        //visitor for printing reference
        val internalReferenceVisitor = ModelReferenceVisitor(out)
        //Visitor for Model naviguation
        var masterVisitor = object : ModelVisitor() {
            var isFirstInRef = true
            override public fun beginVisitElem(elem: KObject) {
                if (!isFirstInRef) {
                    out.print(",")
                    isFirstInRef = false
                }
                printAttName(elem, out)
                internalReferenceVisitor.alreadyVisited?.clear()
                elem.visit(internalReferenceVisitor, false, false, true)
            }
            override public fun endVisitElem(elem: KObject) {
                out.println("}")
                isFirstInRef = false
            }
            override fun beginVisitRef(refName: String, refType: String): Boolean {
                out.print(",\"" + refName + "\":[")
                isFirstInRef = true
                return true
            }
            override fun endVisitRef(refName: String) {
                out.print("]")
                isFirstInRef = false
            }
            public override fun visit(elem: KObject, refNameInParent: String, parent: KObject) {
            }
        }
        model.visit(masterVisitor, true, true, false)
        out.flush();
    }

    fun printAttName(elem: KObject, out: PrintStream) {
        var isRoot = ""
        if (elem.path().equals("/")) {
            isRoot = "root:"
        }
        out.print("\n{\"class\":\"" + isRoot + elem.metaClassName() + "@" + elem.internalGetKey() + "\"")
        val attributeVisitor = object : ModelAttributeVisitor {
            public override fun visit(value: Any?, name: String, parent: KObject) {
                if (value != null) {
                    out.print(",\"" + name + "\":\"")
                    if (value is java.util.Date) {
                        JSONString.encode(out, "" + value.getTime())
                    } else {
                        JSONString.encode(out, AttConverter.convFlatAtt(value))
                    }
                    out.print("\"")
                }
            }
        }
        elem.visitAttributes(attributeVisitor)
    }

}

