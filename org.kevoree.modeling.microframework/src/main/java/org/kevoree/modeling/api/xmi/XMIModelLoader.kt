package org.kevoree.modeling.api.xmi

/*
* Author : Gregory Nain (developer.name@uni.lu)
* Date : 30/08/13
*/

import java.io.File
import java.io.FileInputStream
import java.io.StringReader
import java.io.InputStreamReader
import java.io.InputStream
import javax.xml.stream.XMLStreamConstants
import javax.xml.stream.XMLStreamReader
import javax.xml.stream.XMLInputFactory
import org.kevoree.modeling.api.KMFContainer
import org.kevoree.modeling.api.util.ModelAttributeVisitor
import org.kevoree.modeling.api.events.ModelElementListener
import org.kevoree.modeling.api.util.ModelVisitor
import org.kevoree.modeling.api.KMFFactory

public open class XMIModelLoader : org.kevoree.modeling.api.ModelLoader{

    public val LOADER_XMI_LOCAL_NAME : String = "type"
    public val LOADER_XMI_XSI : String = "xsi"

    protected open var factory : KMFFactory? = null

    private fun unescapeXml(src : String) : String {
        var builder : StringBuilder? = null
        var i : Int = 0
        while (i < src.length) {
            val c = src[i]
            if(c == '&') {
                if(builder == null) {
                    builder = StringBuilder(src.substring(0,i))
                }
                if(src[i+1]=='a') {
                    if(src[i+2] == 'm') {
                        builder?.append("&")
                        i = i+5
                    } else if(src[i+2] == 'p') {
                        builder?.append("'")
                        i = i+6
                    } else {
                        System.err.println("Could not unescaped chain:" + src[i] + src[i+1] + src[i+2])
                    }
                } else if(src[i+1]=='q') {
                    builder?.append("\"")
                    i = i+6
                } else if(src[i+1]=='l') {
                    builder?.append("<")
                    i = i+4
                } else if(src[i+1]=='g') {
                    builder?.append(">")
                    i = i+4
                } else {
                    System.err.println("Could not unescaped chain:" + src[i] + src[i+1])
                }
            } else {
                if(builder != null) {
                    builder?.append(c)
                }
                i++
            }
        }
        if(builder != null) {
            return builder.toString()
        } else {
            return src
        }
    }

    override fun loadModelFromString(str: String) : List<KMFContainer>? {
        val stringReader = StringReader(str)
        val factory = XMLInputFactory.newInstance()
        val reader = factory?.createXMLStreamReader(stringReader)
        factory?.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false)
        factory?.setProperty(XMLInputFactory.IS_VALIDATING, false)
        if(reader != null && reader.hasNext()) {
            return deserialize(reader)
        } else {
            System.out.println("Loader::Noting in the String !")
            return null
        }
    }

    override fun loadModelFromStream(inputStream: InputStream) : List<KMFContainer>? {
        val isReader = java.io.BufferedReader(InputStreamReader(inputStream))
        val factory = XMLInputFactory.newInstance()
        val reader = factory?.createXMLStreamReader(isReader)
        factory?.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false)
        factory?.setProperty(XMLInputFactory.IS_VALIDATING, false)
        if(reader != null && reader.hasNext()) {
            return deserialize(reader)
        } else {
            System.out.println("Loader::Noting in the file !")
            return null
        }
    }

    private fun loadObject(ctx : LoadingContext, xmiAddress : String, objectType : String? = null) : KMFContainer {

        val attributesHashmap = java.util.HashMap<String, Boolean>()
        val referencesHashmap = java.util.HashMap<String, String>()

        val elementTagName = ctx.xmiReader!!.getLocalName()

        var modelElem : KMFContainer?
        if(objectType != null) {
            modelElem = factory?.create(objectType)
            if(modelElem == null) {
                var xsiType : String? = null
                for(i in 0.rangeTo(ctx.xmiReader!!.getAttributeCount()-1)){
                    val localName = ctx.xmiReader!!.getAttributeLocalName(i)
                    val xsi = ctx.xmiReader!!.getAttributePrefix(i)
                    if (localName == LOADER_XMI_LOCAL_NAME && xsi==LOADER_XMI_XSI){
                        xsiType = ctx.xmiReader!!.getAttributeValue(i)
                        break
                    }
                }
                if(xsiType != null) {
                    modelElem = factory?.create(xsiType!!.substring(xsiType!!.lastIndexOf(":")+1, xsiType!!.length))
                }
            }

        } else {
            modelElem = factory?.create(elementTagName!!)
        }

        if(modelElem == null) {
            println("Could not create an object for local name " + elementTagName)
        }
        ctx.map.put(xmiAddress.replace(".0",""), modelElem!!)
        //println("Registering " + xmiAddress)

        val attributeVisitor = object : ModelAttributeVisitor {
            public override fun visit(value: Any?, name: String, parent: KMFContainer) {
                attributesHashmap.put(name, true)
            }
        }
        modelElem?.visitAttributes(attributeVisitor)

        var referencesVisitor = object : ModelVisitor() {
            override fun beginVisitRef(refName: String, refType : String) {
                referencesHashmap.put(refName, refType)
            }
            public override fun visit(elem: KMFContainer, refNameInParent: String, parent: KMFContainer) {}
        }
        modelElem?.visit(referencesVisitor, false, true, false)

        for(i in 0.rangeTo(ctx.xmiReader!!.getAttributeCount()-1)) {
            val prefix = ctx.xmiReader!!.getAttributePrefix(i)
            if(prefix==null || prefix.equals("")) {
                val attrName = ctx.xmiReader!!.getAttributeLocalName(i)
                val valueAtt = ctx.xmiReader!!.getAttributeValue(i)
                if( valueAtt != null) {
                    if(attributesHashmap.containsKey(attrName)) {
                        modelElem?.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, attrName!!, (unescapeXml(valueAtt)))
                    } else {
                        for(xmiRef in valueAtt.split(" ")) {
                            var adjustedRef = if(xmiRef.startsWith("#")){xmiRef.substring(1)}else{xmiRef}
                            adjustedRef = if(adjustedRef.startsWith("//")){"/0" + adjustedRef.substring(1)} else { adjustedRef}
                            adjustedRef = adjustedRef.replace(".0","")
                            val ref = ctx.map.get(adjustedRef)
                            if( ref != null) {
                                modelElem?.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, attrName!!, ref)
                            } else {
                                ctx.resolvers.add(XMIResolveCommand(ctx, modelElem!!, org.kevoree.modeling.api.util.ActionType.ADD, attrName!!, adjustedRef))
                            }
                        }
                    }
                }
            }
        }

        var done = false
        while(!done) {
            when(ctx.xmiReader!!.nextTag()){
                XMLStreamConstants.START_ELEMENT -> {
                    val subElemName = ctx.xmiReader!!.getLocalName()
                    val i = ctx.elementsCount.get(xmiAddress + "/@" + subElemName) ?: 0
                    val subElementId = xmiAddress + "/@"+subElemName+"." + i
                    val containedElement = loadObject(ctx, subElementId, referencesHashmap.get(subElemName))
                    modelElem?.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, subElemName!!, containedElement)
                    ctx.elementsCount.put(xmiAddress + "/@" + subElemName,i+1)
                }
                XMLStreamConstants.END_ELEMENT -> {
                    if(ctx.xmiReader!!.getLocalName().equals(elementTagName)){done = true}
                }
                else -> {}
            }
        }
       // println("Loading " + modelElem)
        return modelElem!!
    }



    private fun deserialize(reader : XMLStreamReader): List<KMFContainer> {
        val context = LoadingContext()
        context.xmiReader = reader
        while(reader.hasNext()) {
            val nextTag = reader.next()
            when(nextTag) {
                XMLStreamConstants.START_ELEMENT -> {
                    val localName = reader.getLocalName()
                    if(localName != null) {
                        val loadedRootsSize = context.loadedRoots.size()
                        context.loadedRoots.add(loadObject(context, "/" + loadedRootsSize))

                    } else {
                        System.out.println("Tried to read a tag with null tag_name.")
                    }
                }
                XMLStreamConstants.END_ELEMENT -> {break}
                XMLStreamConstants.END_DOCUMENT -> {break}
                else ->{ /*println("Default case :" + nextTag.toString())*/ }
            }
        }
        for(res in context.resolvers) {
            res.run()
        }
        return context.loadedRoots
    }
}

public class LoadingContext() {

    var xmiReader : XMLStreamReader? = null

    var loadedRoots : java.util.ArrayList<KMFContainer> = java.util.ArrayList<KMFContainer>()

    val map : java.util.HashMap<String, Any> = java.util.HashMap<String, Any>()

    val elementsCount : java.util.HashMap<String, Int> = java.util.HashMap<String, Int>()

    val resolvers : java.util.ArrayList<XMIResolveCommand> = java.util.ArrayList<XMIResolveCommand>()

    val stats : java.util.HashMap<String, Int> = java.util.HashMap<String, Int>()

    val oppositesAlreadySet : java.util.HashMap<String, Boolean> = java.util.HashMap<String, Boolean>()

    public fun isOppositeAlreadySet(localRef : String, oppositeRef : String) : Boolean {
        val res = (oppositesAlreadySet.get(oppositeRef + "_" + localRef) != null || (oppositesAlreadySet.get(localRef + "_" + oppositeRef) != null))
        return res
    }

    public fun storeOppositeRelation(localRef : String, oppositeRef : String) {
        oppositesAlreadySet.put(localRef + "_" + oppositeRef, true)
    }

}


public class XMIResolveCommand(val context : LoadingContext, val target : org.kevoree.modeling.api.KMFContainer, val mutatorType : Int, val refName : String, val ref : String){
    fun run() {
        var referencedElement = context.map.get(ref)
        if(referencedElement != null) {
            target.reflexiveMutator(mutatorType,refName, referencedElement)
            return
        }
        if(ref.equals("/0/") || ref.equals("/")) {
            referencedElement = context.map.get("/0")
            if(referencedElement != null)   {
                target.reflexiveMutator(mutatorType,refName, referencedElement)
                return
            }
        }
        throw Exception("KMF Load error : reference " + ref + " not found in map when trying to  " + mutatorType + " "+refName+"  on " + target.toString())
    }
}