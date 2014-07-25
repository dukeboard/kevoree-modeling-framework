package org.kevoree.modeling.api.xmi

import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.util.ModelAttributeVisitor
import org.kevoree.modeling.api.util.ModelVisitor
import org.kevoree.modeling.api.KMFFactory
import java.io.InputStream
import org.kevoree.modeling.api.util.ByteConverter
import org.kevoree.modeling.api.util.ActionType
import java.util.HashMap

/*
* Author : Gregory Nain
* Date : 30/08/13
*/
public class XMIModelLoader(val factory: KMFFactory) : org.kevoree.modeling.api.ModelLoader {

    public var resourceSet: ResourceSet? = null

    public val LOADER_XMI_LOCAL_NAME: String = "type"
    public val LOADER_XMI_XSI: String = "xsi"
    public val LOADER_XMI_NS_URI: String = "nsURI"

    private val attributesHashmap = java.util.HashMap<String, java.util.HashMap<String, Boolean>>()
    private val referencesHashmap = java.util.HashMap<String, java.util.HashMap<String, String>>()

    private var namedElementSupportActivated: Boolean = false

    public fun activateSupportForNamedElements(activate: Boolean) {
        namedElementSupportActivated = activate
    }

    private val attributeVisitor = object : ModelAttributeVisitor {
        public override fun visit(value: Any?, name: String, parent: KMFContainer) {
            attributesHashmap.getOrPut(parent.metaClassName()) { java.util.HashMap<String, Boolean>() }.put(name, true)
        }
    }

    private val referencesVisitor = object : ModelVisitor() {

        var refMap: java.util.HashMap<String, String>? = null

        override fun beginVisitElem(elem: KMFContainer) {
            refMap = referencesHashmap.getOrPut(elem.metaClassName()) { java.util.HashMap<String, String>() }
        }
        override fun endVisitElem(elem: KMFContainer) {
            refMap = null
        }
        override fun beginVisitRef(refName: String, refType: String): Boolean {
            refMap!!.put(refName, refType)
            return true
        }
        public override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {
        }
    }

    private fun unescapeXml(src: String): String {
        var builder: StringBuilder? = null
        var i: Int = 0
        while (i < src.length) {
            val c = src[i]
            if (c == '&') {
                if (builder == null) {
                    builder = StringBuilder()
                    builder!!.append(src.substring(0, i))
                }
                if (src[i + 1] == 'a') {
                    if (src[i + 2] == 'm') {
                        builder?.append("&")
                        i = i + 5
                    } else if (src[i + 2] == 'p') {
                        builder?.append("'")
                        i = i + 6
                    } else {
                        println("Could not unescaped chain:" + src[i] + src[i + 1] + src[i + 2])
                    }
                } else if (src[i + 1] == 'q') {
                    builder?.append("\"")
                    i = i + 6
                } else if (src[i + 1] == 'l') {
                    builder?.append("<")
                    i = i + 4
                } else if (src[i + 1] == 'g') {
                    builder?.append(">")
                    i = i + 4
                } else {
                    println("Could not unescaped chain:" + src[i] + src[i + 1])
                }
            } else {
                if (builder != null) {
                    builder?.append(c)
                }
                i++
            }
        }
        if (builder != null) {
            return builder.toString()
        } else {
            return src
        }
    }

    override fun loadModelFromString(str: String): List<KMFContainer>? {
        val reader = XmlParser(ByteConverter.byteArrayInputStreamFromString(str))
        if (reader.hasNext()) {
            return deserialize(reader)
        } else {
            println("Loader::Nothing in the String !")
            return null
        }

    }

    override fun loadModelFromStream(inputStream: InputStream): List<KMFContainer>? {
        val reader = XmlParser(inputStream)
        if (reader.hasNext()) {
            return deserialize(reader)
        } else {
            println("Loader::Nothing in the file !")
            return null
        }
    }

    private fun loadObject(ctx: LoadingContext, xmiAddress: String, objectType: String? = null): KMFContainer {
        val elementTagName = ctx.xmiReader!!.getLocalName()

        var modelElem: KMFContainer?
        if (objectType != null) {
            modelElem = factory?.create(objectType)

            if (modelElem == null) {
                var xsiType: String? = null
                for (i in 0.rangeTo(ctx.xmiReader!!.getAttributeCount() - 1)) {
                    val localName = ctx.xmiReader!!.getAttributeLocalName(i)
                    val xsi = ctx.xmiReader!!.getAttributePrefix(i)
                    if (localName == LOADER_XMI_LOCAL_NAME && xsi == LOADER_XMI_XSI) {
                        xsiType = ctx.xmiReader!!.getAttributeValue(i)
                        break
                    }
                }
                if (xsiType != null) {
                    var realTypeName = xsiType?.substring(0, xsiType!!.lastIndexOf(":"))
                    var realName = xsiType!!.substring(xsiType!!.lastIndexOf(":") + 1, xsiType!!.length)
                    modelElem = factory?.create(realTypeName + "." + realName)
                }
            }

        } else {
            modelElem = factory?.create(elementTagName)
        }

        if (modelElem == null) {
            println("Could not create an object for local name " + elementTagName)
        }

        ctx.map.put(xmiAddress, modelElem!!)
        //ctx.map.put(xmiAddress.replace(".0",""), modelElem!!)
        //println("Registering " + xmiAddress)



        /* Preparation of maps */
        if (!attributesHashmap.containsKey(modelElem!!.metaClassName())) {
            modelElem?.visitAttributes(attributeVisitor)
        }
        val elemAttributesMap = attributesHashmap.get(modelElem!!.metaClassName())!!

        if (!referencesHashmap.containsKey(modelElem!!.metaClassName())) {
            modelElem?.visit(referencesVisitor, false, true, false)
        }
        val elemReferencesMap = referencesHashmap.get(modelElem!!.metaClassName())!!


        /* Read attributes and References */
        for (i in 0.rangeTo(ctx.xmiReader!!.getAttributeCount() - 1)) {
            val prefix = ctx.xmiReader!!.getAttributePrefix(i)
            if (prefix == null || prefix.equals("")) {
                val attrName = ctx.xmiReader!!.getAttributeLocalName(i).trim()
                val valueAtt = ctx.xmiReader!!.getAttributeValue(i).trim()
                if ( valueAtt != null) {
                    if (elemAttributesMap.containsKey(attrName)) {
                        modelElem?.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, attrName, (unescapeXml(valueAtt)), false, false)
                        if (namedElementSupportActivated && attrName.equals("name")) {
                            val parent = ctx.map.get(xmiAddress.substring(0, xmiAddress.lastIndexOf("/")))
                            for (entry in ctx.map.entrySet().toList()) {
                                if (entry.value == parent) {
                                    val refT = entry.key + "/" + unescapeXml(valueAtt)
                                    ctx.map.put(refT, modelElem!!)
                                }
                            }
                        }
                    } else {
                        //reference, can be remote
                        if (!valueAtt.startsWith("#") && !valueAtt.startsWith("/")) {
                            if (resourceSet != null) {
                                val previousLoadedRef = resourceSet!!.resolveObject(valueAtt)
                                if (previousLoadedRef != null) {
                                    modelElem?.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, attrName, previousLoadedRef, true, false)
                                } else {
                                    throw Exception("Unresolve NsURI based XMI reference " + valueAtt)
                                }
                            } else {
                                throw Exception("Bad XMI reference " + valueAtt)
                            }
                        } else {
                            for (xmiRef in valueAtt.split(" ")) {
                                var adjustedRef = if (xmiRef.startsWith("#")) {
                                    xmiRef.substring(1)
                                } else {
                                    xmiRef
                                }
                                adjustedRef = if (adjustedRef.startsWith("//")) {
                                    "/0" + adjustedRef.substring(1)
                                } else {
                                    adjustedRef
                                }
                                adjustedRef = adjustedRef.replace(".0", "")
                                val ref = ctx.map.get(adjustedRef)
                                if ( ref != null) {
                                    modelElem?.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, attrName, ref, true, false)
                                } else {
                                    ctx.resolvers.add(XMIResolveCommand(ctx, modelElem!!, org.kevoree.modeling.api.util.ActionType.ADD, attrName, adjustedRef, resourceSet))
                                }
                            }
                        }
                    }
                }
            }
        }

        var done = false
        while (!done) {
            when (ctx.xmiReader!!.next()) {
                Token.START_TAG -> {
                    val subElemName = ctx.xmiReader!!.getLocalName()
                    val i = ctx.elementsCount.get(xmiAddress + "/@" + subElemName) ?: 0
                    val subElementId = xmiAddress + "/@" + subElemName + (if (i != 0) {
                        "." + i
                    } else {
                        ""
                    })
                    val containedElement = loadObject(ctx, subElementId, elemReferencesMap.get(subElemName))
                    modelElem?.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, subElemName!!, containedElement, true, false)
                    ctx.elementsCount.put(xmiAddress + "/@" + subElemName, i + 1)
                }
                Token.END_TAG -> {
                    if (ctx.xmiReader!!.getLocalName().equals(elementTagName)) {
                        done = true
                    }
                }
                else -> {
                }
            }
        }
        // println("Loading " + modelElem)
        return modelElem!!
    }


    private fun deserialize(reader: XmlParser): List<KMFContainer> {
        var nsURI: String? = null
        val context = LoadingContext()
        context.xmiReader = reader
        while (reader.hasNext()) {
            val nextTag = reader.next()
            when (nextTag) {
                Token.START_TAG -> {
                    val localName = reader.getLocalName()
                    if (localName != null) {
                        val loadedRootsSize = context.loadedRoots.size()


                        val ns = HashMap<String, String>()

                        for (i in 0.rangeTo(context.xmiReader!!.getAttributeCount() - 1)) {
                            val localName = context.xmiReader!!.getAttributeLocalName(i)
                            val localValue = context.xmiReader!!.getAttributeValue(i)
                            if (localName == LOADER_XMI_NS_URI) {
                                nsURI = localValue
                            }
                            ns.put(localName, localValue)
                        }

                        val xsiType = reader.tagPrefix
                        var realTypeName = ns.get(xsiType)
                        if (realTypeName == null) {
                            realTypeName = xsiType
                        }
                        context.loadedRoots.add(loadObject(context, "/" + loadedRootsSize, "$xsiType.$localName"))

                    } else {
                        println("Tried to read a tag with null tag_name.")
                    }
                }
                Token.END_TAG -> {
                    break
                }
                Token.END_DOCUMENT -> {
                    break
                }
                else -> {
                    /*println("Default case :" + nextTag.toString())*/
                }
            }
        }
        for (res in context.resolvers) {
            res.run()
        }
        if (resourceSet != null && nsURI != null) {
            resourceSet!!.registerXmiAddrMappedObjects(nsURI!!, context.map)
        }
        return context.loadedRoots
    }
}

public class LoadingContext() {

    var xmiReader: XmlParser? = null

    var loadedRoots: java.util.ArrayList<KMFContainer> = java.util.ArrayList<KMFContainer>()

    val map: java.util.HashMap<String, KMFContainer> = java.util.HashMap<String, KMFContainer>()

    val elementsCount: java.util.HashMap<String, Int> = java.util.HashMap<String, Int>()

    val resolvers: java.util.ArrayList<XMIResolveCommand> = java.util.ArrayList<XMIResolveCommand>()

    val stats: java.util.HashMap<String, Int> = java.util.HashMap<String, Int>()

    val oppositesAlreadySet: java.util.HashMap<String, Boolean> = java.util.HashMap<String, Boolean>()

    public fun isOppositeAlreadySet(localRef: String, oppositeRef: String): Boolean {
        val res = (oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null))
        return res
    }

    public fun storeOppositeRelation(localRef: String, oppositeRef: String) {
        oppositesAlreadySet.put(localRef + "_" + oppositeRef, true)
    }

}


public class XMIResolveCommand(val context: LoadingContext, val target: org.kevoree.modeling.api.KMFContainer, val mutatorType: ActionType, val refName: String, val ref: String, val resourceSet: ResourceSet?) {
    fun run() {
        var referencedElement = context.map.get(ref)
        if (referencedElement != null) {
            target.reflexiveMutator(mutatorType, refName, referencedElement, true, false)
            return
        }
        if (ref.equals("/0/") || ref.equals("/")) {
            referencedElement = context.map.get("/0")
            if (referencedElement != null) {
                target.reflexiveMutator(mutatorType, refName, referencedElement, true, false)
                return
            }
        }
        if (resourceSet != null) {
            referencedElement = resourceSet.resolveObject(ref)
            if (referencedElement != null) {
                target.reflexiveMutator(mutatorType, refName, referencedElement, true, false)
                return
            }
        }

        throw Exception("KMF Load error : reference " + ref + " not found in map when trying to  " + mutatorType + " " + refName + "  on " + target.metaClassName() + "(path:" + target.path() + ")")
    }
}