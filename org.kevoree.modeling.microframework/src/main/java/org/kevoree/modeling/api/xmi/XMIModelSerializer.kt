package org.kevoree.modeling.api.xmi

import org.kevoree.modeling.api.util.ModelVisitor
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.util.ModelAttributeVisitor
import org.kevoree.modeling.api.util.AttConverter

/*
* Author : Gregory Nain
* Date : 02/09/13
*/
class ReferencesVisitor(val ostream: java.io.PrintStream, val addressTable: java.util.HashMap<KMFContainer, String>, val elementsCount: java.util.HashMap<String, Int>, val resourceSet: ResourceSet?) : ModelVisitor() {

    var value: String? = null

    override fun endVisitRef(refName: String) {
        if (value != null) {
            ostream.print(" " + refName + "=\"" + value.toString() + "\"")
            value = null
        }
    }

    public override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {
        var adjustedAddress = resourceSet?.objToAddr(elem)
        if (adjustedAddress == null) {
            adjustedAddress = addressTable.get(elem)
        }
        if (value == null) {
            value = adjustedAddress
        } else {
            value = value!! + " "
            value = value!! + adjustedAddress.toString()
        }
    }
}

class AttributesVisitor(val ostream: java.io.PrintStream, val ignoreGeneratedID: Boolean) : ModelAttributeVisitor {
    public override fun visit(value: Any?, name: String, parent: KMFContainer) {
        if (value != null) {
            if (ignoreGeneratedID && name == "generated_KMF_ID") {
                return
            }
            if (value is String && value == "") {
                return
            }
            ostream.print(" " + name + "=\"")
            if (value is java.util.Date) {
                escapeXml(ostream, "" + value.getTime())
            } else {
                escapeXml(ostream, AttConverter.convFlatAtt(value))
            }
            ostream.print("\"")
        }
    }

    private fun escapeXml(ostream: java.io.PrintStream, chain: String?) {
        if (chain == null) {
            return
        }
        var i = 0
        var max = chain.length
        while (i < max) {
            var c = chain.charAt(i)
            if (c == '"') {
                ostream.print("&quot;")
            } else if (c == '&') {
                ostream.print("&amp;")
            } else if (c == '\'') {
                ostream.print("&apos;")
            } else if (c == '<') {
                ostream.print("&lt;")
            } else if (c == '>') {
                ostream.print("&gt;")
            } else {
                ostream.print(c)
            }
            i = i + 1
        }
    }
}



class ModelSerializationVisitor(val ostream: java.io.PrintStream, val addressTable: java.util.HashMap<org.kevoree.modeling.api.KMFContainer, String>, val elementsCount: java.util.HashMap<String, Int>, val resourceSet: ResourceSet?, ignoreGeneratedID: Boolean) : ModelVisitor() {
    val attributeVisitor = AttributesVisitor(ostream, ignoreGeneratedID)
    val referenceVisitor = ReferencesVisitor(ostream, addressTable, elementsCount, resourceSet)

    public override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {
        ostream.print('<')
        ostream.print(refNameInParent)
        ostream.print(" xsi:type=\"" + formatMetaClassName(elem.metaClassName()) + "\"")
        elem.visitAttributes(attributeVisitor)
        elem.visit(referenceVisitor, false, false, true)
        ostream.println('>')
        elem.visit(this, false, true, false)
        ostream.print("</")
        ostream.print(refNameInParent)
        ostream.print('>')
        ostream.println()
    }

    private fun formatMetaClassName(metaClassName: String): String {
        val lastPoint = metaClassName.lastIndexOf('.')
        val pack = metaClassName.substring(0, lastPoint)
        val cls = metaClassName.substring(lastPoint + 1)
        return pack + ":" + cls
    }
}


class ModelAddressVisitor(val addressTable: java.util.HashMap<KMFContainer, String>, val elementsCount: java.util.HashMap<String, Int>, val packageList: java.util.ArrayList<String>) : ModelVisitor() {
    public override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {

        val parentXmiAddress = addressTable.get(parent)!!
        val i = elementsCount.get(parentXmiAddress + "/@" + refNameInParent) ?: 0
        addressTable.put(elem, parentXmiAddress + "/@" + refNameInParent + "." + i)
        elementsCount.put(parentXmiAddress + "/@" + refNameInParent, i + 1)
        val pack = elem.metaClassName().substring(0, elem.metaClassName().lastIndexOf('.'))
        if (!packageList.contains(pack))
            packageList.add(pack)
    }
}




public class XMIModelSerializer() : org.kevoree.modeling.api.ModelSerializer {

    public var resourceSet: ResourceSet? = null

    public var ignoreGeneratedID: Boolean = false

    override fun serialize(oMS: org.kevoree.modeling.api.KMFContainer): String? {
        val oo = java.io.ByteArrayOutputStream()
        serializeToStream(oMS, oo)
        oo.flush()
        return oo.toString()
    }
    override fun serializeToStream(oMS: org.kevoree.modeling.api.KMFContainer, ostream: java.io.OutputStream) {

        val wt = java.io.PrintStream(java.io.BufferedOutputStream(ostream), false)

        //First Pass for building address table
        val addressTable: java.util.HashMap<org.kevoree.modeling.api.KMFContainer, String> = java.util.HashMap<org.kevoree.modeling.api.KMFContainer, String>()
        val packageList: java.util.ArrayList<String> = java.util.ArrayList<String>()
        addressTable.put(oMS, "/")
        val elementsCount: java.util.HashMap<String, Int> = java.util.HashMap<String, Int>()
        var addressBuilderVisitor = ModelAddressVisitor(addressTable, elementsCount, packageList)
        oMS.visit(addressBuilderVisitor, true, true, false)

        var masterVisitor = ModelSerializationVisitor(wt, addressTable, elementsCount, resourceSet, ignoreGeneratedID)

        wt.println("<?xml version=\"1.0\" encoding=\"UTF-8\"?>")

        wt.print("<" + formatMetaClassName(oMS.metaClassName()).replace(".", "_"))
        wt.print(" xmlns:xsi=\"http://wwww.w3.org/2001/XMLSchema-instance\"")
        wt.print(" xmi:version=\"2.0\"")
        wt.print(" xmlns:xmi=\"http://www.omg.org/XMI\"")

        var index = 0;
        while (index < packageList.size) {
            wt.print(" xmlns:" + packageList.get(index).replace(".", "_") + "=\"http://" + packageList.get(index) + "\"")
            index++
        }

        oMS.visitAttributes(AttributesVisitor(wt, ignoreGeneratedID))
        oMS.visit(ReferencesVisitor(wt, addressTable, elementsCount, resourceSet), false, false, true)
        wt.println(">")

        oMS.visit(masterVisitor, false, true, false)

        wt.println("</" + formatMetaClassName(oMS.metaClassName()).replace(".", "_") + ">")

        wt.flush()
    }

    private fun formatMetaClassName(metaClassName: String): String {
        val lastPoint = metaClassName.lastIndexOf('.')
        val pack = metaClassName.substring(0, lastPoint)
        val cls = metaClassName.substring(lastPoint + 1)
        return pack + ":" + cls
    }


}