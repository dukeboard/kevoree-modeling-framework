package org.kevoree.loader

import java.io.File
import java.io.FileInputStream
import java.io.InputStream
import java.io.ByteArrayInputStream
import java.io.Reader
import java.io.StringReader
import java.io.InputStreamReader
import com.google.gson.stream.JsonReader
import com.google.gson.stream.JsonToken

class JSONModelLoader : org.kevoree.loader.ModelLoader {

    val mainFactory = org.kevoree.factory.MainFactory()

    override fun loadModelFromString(str: String) : List<Any>? {
        return deserialize(ByteArrayInputStream(str.getBytes()))
    }

    override fun loadModelFromPath(file: File) : List<Any>? {
        return loadModelFromStream(FileInputStream(file))
    }

    override fun loadModelFromStream(inputStream: InputStream) : List<Any>? {
        return deserialize(inputStream)
    }

    private fun deserialize(ins : InputStream): List<Any> {
        var reader : JsonReader = JsonReader(ins)
        val context = LoadingContext()
        while(reader.hasNext() && (reader.peek() != JsonToken.END_DOCUMENT)) {
            reader.beginObject()
            val nextKey = reader.nextName()
            if(nextKey.equals("eClass")) {
                val eclassValue = reader.nextString()
                val loadedRootsSize = context.loadedRoots.size()

                when {
                    eclassValue.equals("org.kevoree:ComponentInstance") -> {
                        context.loadedRoots.add(loadComponentInstance(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:ComponentType") -> {
                        context.loadedRoots.add(loadComponentType(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:ContainerNode") -> {
                        context.loadedRoots.add(loadContainerNode(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:ContainerRoot") -> {
                        context.loadedRoots.add(loadContainerRoot(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:PortType") -> {
                        context.loadedRoots.add(loadPortType(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:Port") -> {
                        context.loadedRoots.add(loadPort(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:Namespace") -> {
                        context.loadedRoots.add(loadNamespace(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:Dictionary") -> {
                        context.loadedRoots.add(loadDictionary(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:DictionaryType") -> {
                        context.loadedRoots.add(loadDictionaryType(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:DictionaryAttribute") -> {
                        context.loadedRoots.add(loadDictionaryAttribute(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:DictionaryValue") -> {
                        context.loadedRoots.add(loadDictionaryValue(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:CompositeType") -> {
                        context.loadedRoots.add(loadCompositeType(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:PortTypeRef") -> {
                        context.loadedRoots.add(loadPortTypeRef(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:Wire") -> {
                        context.loadedRoots.add(loadWire(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:ServicePortType") -> {
                        context.loadedRoots.add(loadServicePortType(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:Operation") -> {
                        context.loadedRoots.add(loadOperation(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:Parameter") -> {
                        context.loadedRoots.add(loadParameter(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:TypedElement") -> {
                        context.loadedRoots.add(loadTypedElement(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:MessagePortType") -> {
                        context.loadedRoots.add(loadMessagePortType(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:Repository") -> {
                        context.loadedRoots.add(loadRepository(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:DeployUnit") -> {
                        context.loadedRoots.add(loadDeployUnit(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:TypeLibrary") -> {
                        context.loadedRoots.add(loadTypeLibrary(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:NamedElement") -> {
                        context.loadedRoots.add(loadNamedElement(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:IntegrationPattern") -> {
                        context.loadedRoots.add(loadIntegrationPattern(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:ExtraFonctionalProperty") -> {
                        context.loadedRoots.add(loadExtraFonctionalProperty(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:PortTypeMapping") -> {
                        context.loadedRoots.add(loadPortTypeMapping(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:Channel") -> {
                        context.loadedRoots.add(loadChannel(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:MBinding") -> {
                        context.loadedRoots.add(loadMBinding(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:NodeNetwork") -> {
                        context.loadedRoots.add(loadNodeNetwork(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:NodeLink") -> {
                        context.loadedRoots.add(loadNodeLink(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:NetworkProperty") -> {
                        context.loadedRoots.add(loadNetworkProperty(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:ChannelType") -> {
                        context.loadedRoots.add(loadChannelType(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:TypeDefinition") -> {
                        context.loadedRoots.add(loadTypeDefinition(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:Instance") -> {
                        context.loadedRoots.add(loadInstance(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:LifeCycleTypeDefinition") -> {
                        context.loadedRoots.add(loadLifeCycleTypeDefinition(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:Group") -> {
                        context.loadedRoots.add(loadGroup(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:GroupType") -> {
                        context.loadedRoots.add(loadGroupType(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:NodeType") -> {
                        context.loadedRoots.add(loadNodeType(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:AdaptationPrimitiveType") -> {
                        context.loadedRoots.add(loadAdaptationPrimitiveType(reader, context, "/" + loadedRootsSize))
                    }
                    eclassValue.equals("org.kevoree:AdaptationPrimitiveTypeRef") -> {
                        context.loadedRoots.add(loadAdaptationPrimitiveTypeRef(reader, context, "/" + loadedRootsSize))
                    }
                    else -> { println("Unknown root type '" + eclassValue + "'. Loading of this element aborted.")}
                }
            } else {
                println("Ignored key '" + nextKey + "' while looking for the root element 'eClass'")
            }
            reader.endObject()
        }
        for(res in context.resolvers) {res()}
        return context.loadedRoots
    }

    private fun unescapeJSON(src : String) : String {
        var builder : StringBuilder? = null
        var i : Int = 0
        while (i < src.length) {
            val c = src[i]
            if(c == '&') {
                if(builder == null) {
                    builder = StringBuilder(src.substring(0,i))
                }
                if(src[i+1]=='a') {
                    builder?.append("'")
                    i = i+6
                } else if(src[i+1]=='q') {
                    builder?.append("\"")
                    i = i+6
                } else {
                    println("Could not unescaped chain:" + src[i] + src[i+1])
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

    private fun loadComponentInstance(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.ComponentInstance {

        val modelElem = mainFactory.getKevoreeFactory().createComponentInstance()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "metaData" -> {modelElem.setMetaData(unescapeJSON(reader.nextString()!!))}
                "typeDefinition" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setTypeDefinition(ref as org.kevoree.TypeDefinition)
                    } else {
                        context.resolvers.add({()->
                            var typeDefinitionRef = context.map.get(adjustedRef)
                            var i = 0
                            while(typeDefinitionRef == null && i < context.loadedRoots.size()) {
                                typeDefinitionRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(typeDefinitionRef != null) {
                                modelElem.setTypeDefinition(typeDefinitionRef as org.kevoree.TypeDefinition)
                            } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "dictionary" -> {                                             reader.beginObject()
                    val dictionaryElementId = elementId + "/@dictionary"
                    val loadedElem = loadDictionary(reader, context, dictionaryElementId)
                    modelElem.setDictionary(loadedElem)
                    reader.endObject()
                }
                "provided" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@provided") ?: 0
                        val providedElementId = elementId + "/@provided." + i
                        val loadedElem = loadPort(reader, context, providedElementId)
                        modelElem.addProvided(loadedElem)
                        context.elementsCount.put(elementId + "/@provided",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "required" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@required") ?: 0
                        val requiredElementId = elementId + "/@required." + i
                        val loadedElem = loadPort(reader, context, requiredElementId)
                        modelElem.addRequired(loadedElem)
                        context.elementsCount.put(elementId + "/@required",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "namespace" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setNamespace(ref as org.kevoree.Namespace)
                    } else {
                        context.resolvers.add({()->
                            var namespaceRef = context.map.get(adjustedRef)
                            var i = 0
                            while(namespaceRef == null && i < context.loadedRoots.size()) {
                                namespaceRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(namespaceRef != null) {
                                modelElem.setNamespace(namespaceRef as org.kevoree.Namespace)
                            } else { throw Exception("KMF Load error : Namespace not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in ComponentInstance")}
            }
        }
        return modelElem
    }

    private fun loadComponentType(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.ComponentType {

        val modelElem = mainFactory.getKevoreeFactory().createComponentType()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "factoryBean" -> {modelElem.setFactoryBean(unescapeJSON(reader.nextString()!!))}
                "bean" -> {modelElem.setBean(unescapeJSON(reader.nextString()!!))}
                "nature" -> {modelElem.setNature(unescapeJSON(reader.nextString()!!))}
                "startMethod" -> {modelElem.setStartMethod(unescapeJSON(reader.nextString()!!))}
                "stopMethod" -> {modelElem.setStopMethod(unescapeJSON(reader.nextString()!!))}
                "updateMethod" -> {modelElem.setUpdateMethod(unescapeJSON(reader.nextString()!!))}
                "deployUnits" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addDeployUnits(ref as org.kevoree.DeployUnit)
                        } else {
                            context.resolvers.add({()->
                                var deployUnitsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(deployUnitsRef == null && i < context.loadedRoots.size()) {
                                    deployUnitsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(deployUnitsRef != null) {
                                    modelElem.addDeployUnits(deployUnitsRef as org.kevoree.DeployUnit)
                                } else { throw Exception("KMF Load error : DeployUnit not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "dictionaryType" -> {                                             reader.beginObject()
                    val dictionaryTypeElementId = elementId + "/@dictionaryType"
                    val loadedElem = loadDictionaryType(reader, context, dictionaryTypeElementId)
                    modelElem.setDictionaryType(loadedElem)
                    reader.endObject()
                }
                "superTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addSuperTypes(ref as org.kevoree.TypeDefinition)
                        } else {
                            context.resolvers.add({()->
                                var superTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(superTypesRef == null && i < context.loadedRoots.size()) {
                                    superTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(superTypesRef != null) {
                                    modelElem.addSuperTypes(superTypesRef as org.kevoree.TypeDefinition)
                                } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "required" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@required") ?: 0
                        val requiredElementId = elementId + "/@required." + i
                        val loadedElem = loadPortTypeRef(reader, context, requiredElementId)
                        modelElem.addRequired(loadedElem)
                        context.elementsCount.put(elementId + "/@required",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "integrationPatterns" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@integrationPatterns") ?: 0
                        val integrationPatternsElementId = elementId + "/@integrationPatterns." + i
                        val loadedElem = loadIntegrationPattern(reader, context, integrationPatternsElementId)
                        modelElem.addIntegrationPatterns(loadedElem)
                        context.elementsCount.put(elementId + "/@integrationPatterns",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "extraFonctionalProperties" -> {                                             reader.beginObject()
                    val extraFonctionalPropertiesElementId = elementId + "/@extraFonctionalProperties"
                    val loadedElem = loadExtraFonctionalProperty(reader, context, extraFonctionalPropertiesElementId)
                    modelElem.setExtraFonctionalProperties(loadedElem)
                    reader.endObject()
                }
                "provided" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@provided") ?: 0
                        val providedElementId = elementId + "/@provided." + i
                        val loadedElem = loadPortTypeRef(reader, context, providedElementId)
                        modelElem.addProvided(loadedElem)
                        context.elementsCount.put(elementId + "/@provided",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in ComponentType")}
            }
        }
        return modelElem
    }

    private fun loadContainerNode(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.ContainerNode {

        val modelElem = mainFactory.getKevoreeFactory().createContainerNode()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "metaData" -> {modelElem.setMetaData(unescapeJSON(reader.nextString()!!))}
                "typeDefinition" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setTypeDefinition(ref as org.kevoree.TypeDefinition)
                    } else {
                        context.resolvers.add({()->
                            var typeDefinitionRef = context.map.get(adjustedRef)
                            var i = 0
                            while(typeDefinitionRef == null && i < context.loadedRoots.size()) {
                                typeDefinitionRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(typeDefinitionRef != null) {
                                modelElem.setTypeDefinition(typeDefinitionRef as org.kevoree.TypeDefinition)
                            } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "dictionary" -> {                                             reader.beginObject()
                    val dictionaryElementId = elementId + "/@dictionary"
                    val loadedElem = loadDictionary(reader, context, dictionaryElementId)
                    modelElem.setDictionary(loadedElem)
                    reader.endObject()
                }
                "components" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@components") ?: 0
                        val componentsElementId = elementId + "/@components." + i
                        val loadedElem = loadComponentInstance(reader, context, componentsElementId)
                        modelElem.addComponents(loadedElem)
                        context.elementsCount.put(elementId + "/@components",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "hosts" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addHosts(ref as org.kevoree.ContainerNode)
                        } else {
                            context.resolvers.add({()->
                                var hostsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(hostsRef == null && i < context.loadedRoots.size()) {
                                    hostsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(hostsRef != null) {
                                    modelElem.addHosts(hostsRef as org.kevoree.ContainerNode)
                                } else { throw Exception("KMF Load error : ContainerNode not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "host" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setHost(ref as org.kevoree.ContainerNode)
                    } else {
                        context.resolvers.add({()->
                            var hostRef = context.map.get(adjustedRef)
                            var i = 0
                            while(hostRef == null && i < context.loadedRoots.size()) {
                                hostRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(hostRef != null) {
                                modelElem.setHost(hostRef as org.kevoree.ContainerNode)
                            } else { throw Exception("KMF Load error : ContainerNode not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in ContainerNode")}
            }
        }
        return modelElem
    }

    private fun loadContainerRoot(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.ContainerRoot {

        val modelElem = mainFactory.getKevoreeFactory().createContainerRoot()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "nodes" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@nodes") ?: 0
                        val nodesElementId = elementId + "/@nodes." + i
                        val loadedElem = loadContainerNode(reader, context, nodesElementId)
                        modelElem.addNodes(loadedElem)
                        context.elementsCount.put(elementId + "/@nodes",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "typeDefinitions" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@typeDefinitions") ?: 0
                        val typeDefinitionsElementId = elementId + "/@typeDefinitions." + i
                        val nextKey = reader.nextName()
                        if(nextKey.equals("eClass")) {
                            val eclassValue = reader.nextString()
                            when(eclassValue) {

                                "org.kevoree:NodeType" -> {
                                    val loadedElem = loadNodeType(reader, context, typeDefinitionsElementId)
                                    modelElem.addTypeDefinitions(loadedElem)
                                }
                                "org.kevoree:GroupType" -> {
                                    val loadedElem = loadGroupType(reader, context, typeDefinitionsElementId)
                                    modelElem.addTypeDefinitions(loadedElem)
                                }
                                "org.kevoree:ChannelType" -> {
                                    val loadedElem = loadChannelType(reader, context, typeDefinitionsElementId)
                                    modelElem.addTypeDefinitions(loadedElem)
                                }
                                "org.kevoree:MessagePortType" -> {
                                    val loadedElem = loadMessagePortType(reader, context, typeDefinitionsElementId)
                                    modelElem.addTypeDefinitions(loadedElem)
                                }
                                "org.kevoree:ServicePortType" -> {
                                    val loadedElem = loadServicePortType(reader, context, typeDefinitionsElementId)
                                    modelElem.addTypeDefinitions(loadedElem)
                                }
                                "org.kevoree:ComponentType" -> {
                                    val loadedElem = loadComponentType(reader, context, typeDefinitionsElementId)
                                    modelElem.addTypeDefinitions(loadedElem)
                                }
                                "org.kevoree:CompositeType" -> {
                                    val loadedElem = loadCompositeType(reader, context, typeDefinitionsElementId)
                                    modelElem.addTypeDefinitions(loadedElem)
                                }
                                else -> {
                                    println("Unknown root type '" + eclassValue + "'. Loading aborted.")
                                }
                            }
                        } else {
                            println("Ignored key '" + nextKey + "' while looking for the root element 'eClass'")
                        }
                        context.elementsCount.put(elementId + "/@typeDefinitions",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "repositories" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@repositories") ?: 0
                        val repositoriesElementId = elementId + "/@repositories." + i
                        val loadedElem = loadRepository(reader, context, repositoriesElementId)
                        modelElem.addRepositories(loadedElem)
                        context.elementsCount.put(elementId + "/@repositories",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "dataTypes" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@dataTypes") ?: 0
                        val dataTypesElementId = elementId + "/@dataTypes." + i
                        val nextKey = reader.nextName()
                        if(nextKey.equals("eClass")) {
                            val eclassValue = reader.nextString()
                            when(eclassValue) {

                                "org.kevoree:TypedElement" -> {
                                    val loadedElem = loadTypedElement(reader, context, dataTypesElementId)
                                    modelElem.addDataTypes(loadedElem)
                                }
                                "org.kevoree:DictionaryAttribute" -> {
                                    val loadedElem = loadDictionaryAttribute(reader, context, dataTypesElementId)
                                    modelElem.addDataTypes(loadedElem)
                                }
                                else -> {
                                    println("Unknown root type '" + eclassValue + "'. Loading aborted.")
                                }
                            }
                        } else {
                            println("Ignored key '" + nextKey + "' while looking for the root element 'eClass'")
                        }
                        context.elementsCount.put(elementId + "/@dataTypes",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "libraries" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@libraries") ?: 0
                        val librariesElementId = elementId + "/@libraries." + i
                        val loadedElem = loadTypeLibrary(reader, context, librariesElementId)
                        modelElem.addLibraries(loadedElem)
                        context.elementsCount.put(elementId + "/@libraries",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "hubs" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@hubs") ?: 0
                        val hubsElementId = elementId + "/@hubs." + i
                        val loadedElem = loadChannel(reader, context, hubsElementId)
                        modelElem.addHubs(loadedElem)
                        context.elementsCount.put(elementId + "/@hubs",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "mBindings" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@mBindings") ?: 0
                        val mBindingsElementId = elementId + "/@mBindings." + i
                        val loadedElem = loadMBinding(reader, context, mBindingsElementId)
                        modelElem.addMBindings(loadedElem)
                        context.elementsCount.put(elementId + "/@mBindings",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "deployUnits" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@deployUnits") ?: 0
                        val deployUnitsElementId = elementId + "/@deployUnits." + i
                        val loadedElem = loadDeployUnit(reader, context, deployUnitsElementId)
                        modelElem.addDeployUnits(loadedElem)
                        context.elementsCount.put(elementId + "/@deployUnits",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "nodeNetworks" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@nodeNetworks") ?: 0
                        val nodeNetworksElementId = elementId + "/@nodeNetworks." + i
                        val loadedElem = loadNodeNetwork(reader, context, nodeNetworksElementId)
                        modelElem.addNodeNetworks(loadedElem)
                        context.elementsCount.put(elementId + "/@nodeNetworks",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "groups" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@groups") ?: 0
                        val groupsElementId = elementId + "/@groups." + i
                        val loadedElem = loadGroup(reader, context, groupsElementId)
                        modelElem.addGroups(loadedElem)
                        context.elementsCount.put(elementId + "/@groups",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "adaptationPrimitiveTypes" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@adaptationPrimitiveTypes") ?: 0
                        val adaptationPrimitiveTypesElementId = elementId + "/@adaptationPrimitiveTypes." + i
                        val loadedElem = loadAdaptationPrimitiveType(reader, context, adaptationPrimitiveTypesElementId)
                        modelElem.addAdaptationPrimitiveTypes(loadedElem)
                        context.elementsCount.put(elementId + "/@adaptationPrimitiveTypes",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in ContainerRoot")}
            }
        }
        return modelElem
    }

    private fun loadPortType(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.PortType {

        val modelElem = mainFactory.getKevoreeFactory().createPortType()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "factoryBean" -> {modelElem.setFactoryBean(unescapeJSON(reader.nextString()!!))}
                "bean" -> {modelElem.setBean(unescapeJSON(reader.nextString()!!))}
                "nature" -> {modelElem.setNature(unescapeJSON(reader.nextString()!!))}
                "synchrone" -> {modelElem.setSynchrone(reader.nextBoolean())}
                "deployUnits" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addDeployUnits(ref as org.kevoree.DeployUnit)
                        } else {
                            context.resolvers.add({()->
                                var deployUnitsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(deployUnitsRef == null && i < context.loadedRoots.size()) {
                                    deployUnitsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(deployUnitsRef != null) {
                                    modelElem.addDeployUnits(deployUnitsRef as org.kevoree.DeployUnit)
                                } else { throw Exception("KMF Load error : DeployUnit not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "dictionaryType" -> {                                             reader.beginObject()
                    val dictionaryTypeElementId = elementId + "/@dictionaryType"
                    val loadedElem = loadDictionaryType(reader, context, dictionaryTypeElementId)
                    modelElem.setDictionaryType(loadedElem)
                    reader.endObject()
                }
                "superTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addSuperTypes(ref as org.kevoree.TypeDefinition)
                        } else {
                            context.resolvers.add({()->
                                var superTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(superTypesRef == null && i < context.loadedRoots.size()) {
                                    superTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(superTypesRef != null) {
                                    modelElem.addSuperTypes(superTypesRef as org.kevoree.TypeDefinition)
                                } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in PortType")}
            }
        }
        return modelElem
    }

    private fun loadPort(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.Port {

        val modelElem = mainFactory.getKevoreeFactory().createPort()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "bindings" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addBindings(ref as org.kevoree.MBinding)
                        } else {
                            context.resolvers.add({()->
                                var bindingsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(bindingsRef == null && i < context.loadedRoots.size()) {
                                    bindingsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(bindingsRef != null) {
                                    modelElem.addBindings(bindingsRef as org.kevoree.MBinding)
                                } else { throw Exception("KMF Load error : MBinding not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "portTypeRef" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setPortTypeRef(ref as org.kevoree.PortTypeRef)
                    } else {
                        context.resolvers.add({()->
                            var portTypeRefRef = context.map.get(adjustedRef)
                            var i = 0
                            while(portTypeRefRef == null && i < context.loadedRoots.size()) {
                                portTypeRefRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(portTypeRefRef != null) {
                                modelElem.setPortTypeRef(portTypeRefRef as org.kevoree.PortTypeRef)
                            } else { throw Exception("KMF Load error : PortTypeRef not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in Port")}
            }
        }
        return modelElem
    }

    private fun loadNamespace(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.Namespace {

        val modelElem = mainFactory.getKevoreeFactory().createNamespace()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "childs" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@childs") ?: 0
                        val childsElementId = elementId + "/@childs." + i
                        val loadedElem = loadNamespace(reader, context, childsElementId)
                        modelElem.addChilds(loadedElem)
                        context.elementsCount.put(elementId + "/@childs",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "parent" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setParent(ref as org.kevoree.Namespace)
                    } else {
                        context.resolvers.add({()->
                            var parentRef = context.map.get(adjustedRef)
                            var i = 0
                            while(parentRef == null && i < context.loadedRoots.size()) {
                                parentRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(parentRef != null) {
                                modelElem.setParent(parentRef as org.kevoree.Namespace)
                            } else { throw Exception("KMF Load error : Namespace not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in Namespace")}
            }
        }
        return modelElem
    }

    private fun loadDictionary(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.Dictionary {

        val modelElem = mainFactory.getKevoreeFactory().createDictionary()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "values" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@values") ?: 0
                        val valuesElementId = elementId + "/@values." + i
                        val loadedElem = loadDictionaryValue(reader, context, valuesElementId)
                        modelElem.addValues(loadedElem)
                        context.elementsCount.put(elementId + "/@values",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in Dictionary")}
            }
        }
        return modelElem
    }

    private fun loadDictionaryType(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.DictionaryType {

        val modelElem = mainFactory.getKevoreeFactory().createDictionaryType()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "attributes" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@attributes") ?: 0
                        val attributesElementId = elementId + "/@attributes." + i
                        val loadedElem = loadDictionaryAttribute(reader, context, attributesElementId)
                        modelElem.addAttributes(loadedElem)
                        context.elementsCount.put(elementId + "/@attributes",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "defaultValues" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@defaultValues") ?: 0
                        val defaultValuesElementId = elementId + "/@defaultValues." + i
                        val loadedElem = loadDictionaryValue(reader, context, defaultValuesElementId)
                        modelElem.addDefaultValues(loadedElem)
                        context.elementsCount.put(elementId + "/@defaultValues",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in DictionaryType")}
            }
        }
        return modelElem
    }

    private fun loadDictionaryAttribute(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.DictionaryAttribute {

        val modelElem = mainFactory.getKevoreeFactory().createDictionaryAttribute()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "optional" -> {modelElem.setOptional(reader.nextBoolean())}
                "state" -> {modelElem.setState(reader.nextBoolean())}
                "datatype" -> {modelElem.setDatatype(unescapeJSON(reader.nextString()!!))}
                "fragmentDependant" -> {modelElem.setFragmentDependant(reader.nextBoolean())}
                "genericTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addGenericTypes(ref as org.kevoree.TypedElement)
                        } else {
                            context.resolvers.add({()->
                                var genericTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(genericTypesRef == null && i < context.loadedRoots.size()) {
                                    genericTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(genericTypesRef != null) {
                                    modelElem.addGenericTypes(genericTypesRef as org.kevoree.TypedElement)
                                } else { throw Exception("KMF Load error : TypedElement not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in DictionaryAttribute")}
            }
        }
        return modelElem
    }

    private fun loadDictionaryValue(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.DictionaryValue {

        val modelElem = mainFactory.getKevoreeFactory().createDictionaryValue()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "value" -> {modelElem.setValue(unescapeJSON(reader.nextString()!!))}
                "attribute" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setAttribute(ref as org.kevoree.DictionaryAttribute)
                    } else {
                        context.resolvers.add({()->
                            var attributeRef = context.map.get(adjustedRef)
                            var i = 0
                            while(attributeRef == null && i < context.loadedRoots.size()) {
                                attributeRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(attributeRef != null) {
                                modelElem.setAttribute(attributeRef as org.kevoree.DictionaryAttribute)
                            } else { throw Exception("KMF Load error : DictionaryAttribute not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "targetNode" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setTargetNode(ref as org.kevoree.ContainerNode)
                    } else {
                        context.resolvers.add({()->
                            var targetNodeRef = context.map.get(adjustedRef)
                            var i = 0
                            while(targetNodeRef == null && i < context.loadedRoots.size()) {
                                targetNodeRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(targetNodeRef != null) {
                                modelElem.setTargetNode(targetNodeRef as org.kevoree.ContainerNode)
                            } else { throw Exception("KMF Load error : ContainerNode not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in DictionaryValue")}
            }
        }
        return modelElem
    }

    private fun loadCompositeType(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.CompositeType {

        val modelElem = mainFactory.getKevoreeFactory().createCompositeType()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "factoryBean" -> {modelElem.setFactoryBean(unescapeJSON(reader.nextString()!!))}
                "bean" -> {modelElem.setBean(unescapeJSON(reader.nextString()!!))}
                "nature" -> {modelElem.setNature(unescapeJSON(reader.nextString()!!))}
                "startMethod" -> {modelElem.setStartMethod(unescapeJSON(reader.nextString()!!))}
                "stopMethod" -> {modelElem.setStopMethod(unescapeJSON(reader.nextString()!!))}
                "updateMethod" -> {modelElem.setUpdateMethod(unescapeJSON(reader.nextString()!!))}
                "deployUnits" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addDeployUnits(ref as org.kevoree.DeployUnit)
                        } else {
                            context.resolvers.add({()->
                                var deployUnitsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(deployUnitsRef == null && i < context.loadedRoots.size()) {
                                    deployUnitsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(deployUnitsRef != null) {
                                    modelElem.addDeployUnits(deployUnitsRef as org.kevoree.DeployUnit)
                                } else { throw Exception("KMF Load error : DeployUnit not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "dictionaryType" -> {                                             reader.beginObject()
                    val dictionaryTypeElementId = elementId + "/@dictionaryType"
                    val loadedElem = loadDictionaryType(reader, context, dictionaryTypeElementId)
                    modelElem.setDictionaryType(loadedElem)
                    reader.endObject()
                }
                "superTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addSuperTypes(ref as org.kevoree.TypeDefinition)
                        } else {
                            context.resolvers.add({()->
                                var superTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(superTypesRef == null && i < context.loadedRoots.size()) {
                                    superTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(superTypesRef != null) {
                                    modelElem.addSuperTypes(superTypesRef as org.kevoree.TypeDefinition)
                                } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "required" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@required") ?: 0
                        val requiredElementId = elementId + "/@required." + i
                        val loadedElem = loadPortTypeRef(reader, context, requiredElementId)
                        modelElem.addRequired(loadedElem)
                        context.elementsCount.put(elementId + "/@required",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "integrationPatterns" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@integrationPatterns") ?: 0
                        val integrationPatternsElementId = elementId + "/@integrationPatterns." + i
                        val loadedElem = loadIntegrationPattern(reader, context, integrationPatternsElementId)
                        modelElem.addIntegrationPatterns(loadedElem)
                        context.elementsCount.put(elementId + "/@integrationPatterns",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "extraFonctionalProperties" -> {                                             reader.beginObject()
                    val extraFonctionalPropertiesElementId = elementId + "/@extraFonctionalProperties"
                    val loadedElem = loadExtraFonctionalProperty(reader, context, extraFonctionalPropertiesElementId)
                    modelElem.setExtraFonctionalProperties(loadedElem)
                    reader.endObject()
                }
                "provided" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@provided") ?: 0
                        val providedElementId = elementId + "/@provided." + i
                        val loadedElem = loadPortTypeRef(reader, context, providedElementId)
                        modelElem.addProvided(loadedElem)
                        context.elementsCount.put(elementId + "/@provided",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "childs" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addChilds(ref as org.kevoree.ComponentType)
                        } else {
                            context.resolvers.add({()->
                                var childsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(childsRef == null && i < context.loadedRoots.size()) {
                                    childsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(childsRef != null) {
                                    modelElem.addChilds(childsRef as org.kevoree.ComponentType)
                                } else { throw Exception("KMF Load error : ComponentType not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "wires" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@wires") ?: 0
                        val wiresElementId = elementId + "/@wires." + i
                        val loadedElem = loadWire(reader, context, wiresElementId)
                        modelElem.addWires(loadedElem)
                        context.elementsCount.put(elementId + "/@wires",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in CompositeType")}
            }
        }
        return modelElem
    }

    private fun loadPortTypeRef(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.PortTypeRef {

        val modelElem = mainFactory.getKevoreeFactory().createPortTypeRef()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "optional" -> {modelElem.setOptional(reader.nextBoolean())}
                "noDependency" -> {modelElem.setNoDependency(reader.nextBoolean())}
                "ref" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setRef(ref as org.kevoree.PortType)
                    } else {
                        context.resolvers.add({()->
                            var refRef = context.map.get(adjustedRef)
                            var i = 0
                            while(refRef == null && i < context.loadedRoots.size()) {
                                refRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(refRef != null) {
                                modelElem.setRef(refRef as org.kevoree.PortType)
                            } else { throw Exception("KMF Load error : PortType not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "mappings" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@mappings") ?: 0
                        val mappingsElementId = elementId + "/@mappings." + i
                        val loadedElem = loadPortTypeMapping(reader, context, mappingsElementId)
                        modelElem.addMappings(loadedElem)
                        context.elementsCount.put(elementId + "/@mappings",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in PortTypeRef")}
            }
        }
        return modelElem
    }

    private fun loadWire(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.Wire {

        val modelElem = mainFactory.getKevoreeFactory().createWire()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "ports" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addPorts(ref as org.kevoree.PortTypeRef)
                        } else {
                            context.resolvers.add({()->
                                var portsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(portsRef == null && i < context.loadedRoots.size()) {
                                    portsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(portsRef != null) {
                                    modelElem.addPorts(portsRef as org.kevoree.PortTypeRef)
                                } else { throw Exception("KMF Load error : PortTypeRef not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in Wire")}
            }
        }
        return modelElem
    }

    private fun loadServicePortType(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.ServicePortType {

        val modelElem = mainFactory.getKevoreeFactory().createServicePortType()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "factoryBean" -> {modelElem.setFactoryBean(unescapeJSON(reader.nextString()!!))}
                "bean" -> {modelElem.setBean(unescapeJSON(reader.nextString()!!))}
                "nature" -> {modelElem.setNature(unescapeJSON(reader.nextString()!!))}
                "synchrone" -> {modelElem.setSynchrone(reader.nextBoolean())}
                "interface" -> {modelElem.setInterface(unescapeJSON(reader.nextString()!!))}
                "deployUnits" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addDeployUnits(ref as org.kevoree.DeployUnit)
                        } else {
                            context.resolvers.add({()->
                                var deployUnitsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(deployUnitsRef == null && i < context.loadedRoots.size()) {
                                    deployUnitsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(deployUnitsRef != null) {
                                    modelElem.addDeployUnits(deployUnitsRef as org.kevoree.DeployUnit)
                                } else { throw Exception("KMF Load error : DeployUnit not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "dictionaryType" -> {                                             reader.beginObject()
                    val dictionaryTypeElementId = elementId + "/@dictionaryType"
                    val loadedElem = loadDictionaryType(reader, context, dictionaryTypeElementId)
                    modelElem.setDictionaryType(loadedElem)
                    reader.endObject()
                }
                "superTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addSuperTypes(ref as org.kevoree.TypeDefinition)
                        } else {
                            context.resolvers.add({()->
                                var superTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(superTypesRef == null && i < context.loadedRoots.size()) {
                                    superTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(superTypesRef != null) {
                                    modelElem.addSuperTypes(superTypesRef as org.kevoree.TypeDefinition)
                                } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "operations" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@operations") ?: 0
                        val operationsElementId = elementId + "/@operations." + i
                        val loadedElem = loadOperation(reader, context, operationsElementId)
                        modelElem.addOperations(loadedElem)
                        context.elementsCount.put(elementId + "/@operations",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in ServicePortType")}
            }
        }
        return modelElem
    }

    private fun loadOperation(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.Operation {

        val modelElem = mainFactory.getKevoreeFactory().createOperation()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "parameters" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@parameters") ?: 0
                        val parametersElementId = elementId + "/@parameters." + i
                        val loadedElem = loadParameter(reader, context, parametersElementId)
                        modelElem.addParameters(loadedElem)
                        context.elementsCount.put(elementId + "/@parameters",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "returnType" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setReturnType(ref as org.kevoree.TypedElement)
                    } else {
                        context.resolvers.add({()->
                            var returnTypeRef = context.map.get(adjustedRef)
                            var i = 0
                            while(returnTypeRef == null && i < context.loadedRoots.size()) {
                                returnTypeRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(returnTypeRef != null) {
                                modelElem.setReturnType(returnTypeRef as org.kevoree.TypedElement)
                            } else { throw Exception("KMF Load error : TypedElement not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in Operation")}
            }
        }
        return modelElem
    }

    private fun loadParameter(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.Parameter {

        val modelElem = mainFactory.getKevoreeFactory().createParameter()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "order" -> {modelElem.setOrder(reader.nextInt())}
                "type" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setType(ref as org.kevoree.TypedElement)
                    } else {
                        context.resolvers.add({()->
                            var typeRef = context.map.get(adjustedRef)
                            var i = 0
                            while(typeRef == null && i < context.loadedRoots.size()) {
                                typeRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(typeRef != null) {
                                modelElem.setType(typeRef as org.kevoree.TypedElement)
                            } else { throw Exception("KMF Load error : TypedElement not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in Parameter")}
            }
        }
        return modelElem
    }

    private fun loadTypedElement(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.TypedElement {

        val modelElem = mainFactory.getKevoreeFactory().createTypedElement()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "genericTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addGenericTypes(ref as org.kevoree.TypedElement)
                        } else {
                            context.resolvers.add({()->
                                var genericTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(genericTypesRef == null && i < context.loadedRoots.size()) {
                                    genericTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(genericTypesRef != null) {
                                    modelElem.addGenericTypes(genericTypesRef as org.kevoree.TypedElement)
                                } else { throw Exception("KMF Load error : TypedElement not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in TypedElement")}
            }
        }
        return modelElem
    }

    private fun loadMessagePortType(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.MessagePortType {

        val modelElem = mainFactory.getKevoreeFactory().createMessagePortType()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "factoryBean" -> {modelElem.setFactoryBean(unescapeJSON(reader.nextString()!!))}
                "bean" -> {modelElem.setBean(unescapeJSON(reader.nextString()!!))}
                "nature" -> {modelElem.setNature(unescapeJSON(reader.nextString()!!))}
                "synchrone" -> {modelElem.setSynchrone(reader.nextBoolean())}
                "deployUnits" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addDeployUnits(ref as org.kevoree.DeployUnit)
                        } else {
                            context.resolvers.add({()->
                                var deployUnitsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(deployUnitsRef == null && i < context.loadedRoots.size()) {
                                    deployUnitsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(deployUnitsRef != null) {
                                    modelElem.addDeployUnits(deployUnitsRef as org.kevoree.DeployUnit)
                                } else { throw Exception("KMF Load error : DeployUnit not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "dictionaryType" -> {                                             reader.beginObject()
                    val dictionaryTypeElementId = elementId + "/@dictionaryType"
                    val loadedElem = loadDictionaryType(reader, context, dictionaryTypeElementId)
                    modelElem.setDictionaryType(loadedElem)
                    reader.endObject()
                }
                "superTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addSuperTypes(ref as org.kevoree.TypeDefinition)
                        } else {
                            context.resolvers.add({()->
                                var superTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(superTypesRef == null && i < context.loadedRoots.size()) {
                                    superTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(superTypesRef != null) {
                                    modelElem.addSuperTypes(superTypesRef as org.kevoree.TypeDefinition)
                                } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "filters" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addFilters(ref as org.kevoree.TypedElement)
                        } else {
                            context.resolvers.add({()->
                                var filtersRef = context.map.get(adjustedRef)
                                var i = 0
                                while(filtersRef == null && i < context.loadedRoots.size()) {
                                    filtersRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(filtersRef != null) {
                                    modelElem.addFilters(filtersRef as org.kevoree.TypedElement)
                                } else { throw Exception("KMF Load error : TypedElement not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in MessagePortType")}
            }
        }
        return modelElem
    }

    private fun loadRepository(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.Repository {

        val modelElem = mainFactory.getKevoreeFactory().createRepository()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "url" -> {modelElem.setUrl(unescapeJSON(reader.nextString()!!))}
                "units" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addUnits(ref as org.kevoree.DeployUnit)
                        } else {
                            context.resolvers.add({()->
                                var unitsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(unitsRef == null && i < context.loadedRoots.size()) {
                                    unitsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(unitsRef != null) {
                                    modelElem.addUnits(unitsRef as org.kevoree.DeployUnit)
                                } else { throw Exception("KMF Load error : DeployUnit not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in Repository")}
            }
        }
        return modelElem
    }

    private fun loadDeployUnit(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.DeployUnit {

        val modelElem = mainFactory.getKevoreeFactory().createDeployUnit()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "groupName" -> {modelElem.setGroupName(unescapeJSON(reader.nextString()!!))}
                "unitName" -> {modelElem.setUnitName(unescapeJSON(reader.nextString()!!))}
                "version" -> {modelElem.setVersion(unescapeJSON(reader.nextString()!!))}
                "url" -> {modelElem.setUrl(unescapeJSON(reader.nextString()!!))}
                "hashcode" -> {modelElem.setHashcode(unescapeJSON(reader.nextString()!!))}
                "type" -> {modelElem.setType(unescapeJSON(reader.nextString()!!))}
                "requiredLibs" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addRequiredLibs(ref as org.kevoree.DeployUnit)
                        } else {
                            context.resolvers.add({()->
                                var requiredLibsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(requiredLibsRef == null && i < context.loadedRoots.size()) {
                                    requiredLibsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(requiredLibsRef != null) {
                                    modelElem.addRequiredLibs(requiredLibsRef as org.kevoree.DeployUnit)
                                } else { throw Exception("KMF Load error : DeployUnit not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "targetNodeType" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setTargetNodeType(ref as org.kevoree.NodeType)
                    } else {
                        context.resolvers.add({()->
                            var targetNodeTypeRef = context.map.get(adjustedRef)
                            var i = 0
                            while(targetNodeTypeRef == null && i < context.loadedRoots.size()) {
                                targetNodeTypeRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(targetNodeTypeRef != null) {
                                modelElem.setTargetNodeType(targetNodeTypeRef as org.kevoree.NodeType)
                            } else { throw Exception("KMF Load error : NodeType not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in DeployUnit")}
            }
        }
        return modelElem
    }

    private fun loadTypeLibrary(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.TypeLibrary {

        val modelElem = mainFactory.getKevoreeFactory().createTypeLibrary()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "subTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addSubTypes(ref as org.kevoree.TypeDefinition)
                        } else {
                            context.resolvers.add({()->
                                var subTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(subTypesRef == null && i < context.loadedRoots.size()) {
                                    subTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(subTypesRef != null) {
                                    modelElem.addSubTypes(subTypesRef as org.kevoree.TypeDefinition)
                                } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in TypeLibrary")}
            }
        }
        return modelElem
    }

    private fun loadNamedElement(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.NamedElement {

        val modelElem = mainFactory.getKevoreeFactory().createNamedElement()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in NamedElement")}
            }
        }
        return modelElem
    }

    private fun loadIntegrationPattern(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.IntegrationPattern {

        val modelElem = mainFactory.getKevoreeFactory().createIntegrationPattern()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "extraFonctionalProperties" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@extraFonctionalProperties") ?: 0
                        val extraFonctionalPropertiesElementId = elementId + "/@extraFonctionalProperties." + i
                        val loadedElem = loadExtraFonctionalProperty(reader, context, extraFonctionalPropertiesElementId)
                        modelElem.addExtraFonctionalProperties(loadedElem)
                        context.elementsCount.put(elementId + "/@extraFonctionalProperties",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "portTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addPortTypes(ref as org.kevoree.PortTypeRef)
                        } else {
                            context.resolvers.add({()->
                                var portTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(portTypesRef == null && i < context.loadedRoots.size()) {
                                    portTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(portTypesRef != null) {
                                    modelElem.addPortTypes(portTypesRef as org.kevoree.PortTypeRef)
                                } else { throw Exception("KMF Load error : PortTypeRef not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in IntegrationPattern")}
            }
        }
        return modelElem
    }

    private fun loadExtraFonctionalProperty(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.ExtraFonctionalProperty {

        val modelElem = mainFactory.getKevoreeFactory().createExtraFonctionalProperty()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "portTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addPortTypes(ref as org.kevoree.PortTypeRef)
                        } else {
                            context.resolvers.add({()->
                                var portTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(portTypesRef == null && i < context.loadedRoots.size()) {
                                    portTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(portTypesRef != null) {
                                    modelElem.addPortTypes(portTypesRef as org.kevoree.PortTypeRef)
                                } else { throw Exception("KMF Load error : PortTypeRef not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in ExtraFonctionalProperty")}
            }
        }
        return modelElem
    }

    private fun loadPortTypeMapping(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.PortTypeMapping {

        val modelElem = mainFactory.getKevoreeFactory().createPortTypeMapping()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "beanMethodName" -> {modelElem.setBeanMethodName(unescapeJSON(reader.nextString()!!))}
                "serviceMethodName" -> {modelElem.setServiceMethodName(unescapeJSON(reader.nextString()!!))}
                "paramTypes" -> {modelElem.setParamTypes(unescapeJSON(reader.nextString()!!))}
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in PortTypeMapping")}
            }
        }
        return modelElem
    }

    private fun loadChannel(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.Channel {

        val modelElem = mainFactory.getKevoreeFactory().createChannel()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "metaData" -> {modelElem.setMetaData(unescapeJSON(reader.nextString()!!))}
                "typeDefinition" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setTypeDefinition(ref as org.kevoree.TypeDefinition)
                    } else {
                        context.resolvers.add({()->
                            var typeDefinitionRef = context.map.get(adjustedRef)
                            var i = 0
                            while(typeDefinitionRef == null && i < context.loadedRoots.size()) {
                                typeDefinitionRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(typeDefinitionRef != null) {
                                modelElem.setTypeDefinition(typeDefinitionRef as org.kevoree.TypeDefinition)
                            } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "dictionary" -> {                                             reader.beginObject()
                    val dictionaryElementId = elementId + "/@dictionary"
                    val loadedElem = loadDictionary(reader, context, dictionaryElementId)
                    modelElem.setDictionary(loadedElem)
                    reader.endObject()
                }
                "bindings" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addBindings(ref as org.kevoree.MBinding)
                        } else {
                            context.resolvers.add({()->
                                var bindingsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(bindingsRef == null && i < context.loadedRoots.size()) {
                                    bindingsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(bindingsRef != null) {
                                    modelElem.addBindings(bindingsRef as org.kevoree.MBinding)
                                } else { throw Exception("KMF Load error : MBinding not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in Channel")}
            }
        }
        return modelElem
    }

    private fun loadMBinding(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.MBinding {

        val modelElem = mainFactory.getKevoreeFactory().createMBinding()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "port" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setPort(ref as org.kevoree.Port)
                    } else {
                        context.resolvers.add({()->
                            var portRef = context.map.get(adjustedRef)
                            var i = 0
                            while(portRef == null && i < context.loadedRoots.size()) {
                                portRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(portRef != null) {
                                modelElem.setPort(portRef as org.kevoree.Port)
                            } else { throw Exception("KMF Load error : Port not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "hub" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setHub(ref as org.kevoree.Channel)
                    } else {
                        context.resolvers.add({()->
                            var hubRef = context.map.get(adjustedRef)
                            var i = 0
                            while(hubRef == null && i < context.loadedRoots.size()) {
                                hubRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(hubRef != null) {
                                modelElem.setHub(hubRef as org.kevoree.Channel)
                            } else { throw Exception("KMF Load error : Channel not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in MBinding")}
            }
        }
        return modelElem
    }

    private fun loadNodeNetwork(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.NodeNetwork {

        val modelElem = mainFactory.getKevoreeFactory().createNodeNetwork()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "link" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@link") ?: 0
                        val linkElementId = elementId + "/@link." + i
                        val loadedElem = loadNodeLink(reader, context, linkElementId)
                        modelElem.addLink(loadedElem)
                        context.elementsCount.put(elementId + "/@link",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "initBy" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setInitBy(ref as org.kevoree.ContainerNode)
                    } else {
                        context.resolvers.add({()->
                            var initByRef = context.map.get(adjustedRef)
                            var i = 0
                            while(initByRef == null && i < context.loadedRoots.size()) {
                                initByRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(initByRef != null) {
                                modelElem.setInitBy(initByRef as org.kevoree.ContainerNode)
                            } else { throw Exception("KMF Load error : ContainerNode not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "target" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setTarget(ref as org.kevoree.ContainerNode)
                    } else {
                        context.resolvers.add({()->
                            var targetRef = context.map.get(adjustedRef)
                            var i = 0
                            while(targetRef == null && i < context.loadedRoots.size()) {
                                targetRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(targetRef != null) {
                                modelElem.setTarget(targetRef as org.kevoree.ContainerNode)
                            } else { throw Exception("KMF Load error : ContainerNode not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in NodeNetwork")}
            }
        }
        return modelElem
    }

    private fun loadNodeLink(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.NodeLink {

        val modelElem = mainFactory.getKevoreeFactory().createNodeLink()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "networkType" -> {modelElem.setNetworkType(unescapeJSON(reader.nextString()!!))}
                "estimatedRate" -> {modelElem.setEstimatedRate(reader.nextInt())}
                "lastCheck" -> {modelElem.setLastCheck(unescapeJSON(reader.nextString()!!))}
                "networkProperties" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@networkProperties") ?: 0
                        val networkPropertiesElementId = elementId + "/@networkProperties." + i
                        val loadedElem = loadNetworkProperty(reader, context, networkPropertiesElementId)
                        modelElem.addNetworkProperties(loadedElem)
                        context.elementsCount.put(elementId + "/@networkProperties",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in NodeLink")}
            }
        }
        return modelElem
    }

    private fun loadNetworkProperty(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.NetworkProperty {

        val modelElem = mainFactory.getKevoreeFactory().createNetworkProperty()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "value" -> {modelElem.setValue(unescapeJSON(reader.nextString()!!))}
                "lastCheck" -> {modelElem.setLastCheck(unescapeJSON(reader.nextString()!!))}
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in NetworkProperty")}
            }
        }
        return modelElem
    }

    private fun loadChannelType(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.ChannelType {

        val modelElem = mainFactory.getKevoreeFactory().createChannelType()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "factoryBean" -> {modelElem.setFactoryBean(unescapeJSON(reader.nextString()!!))}
                "bean" -> {modelElem.setBean(unescapeJSON(reader.nextString()!!))}
                "nature" -> {modelElem.setNature(unescapeJSON(reader.nextString()!!))}
                "startMethod" -> {modelElem.setStartMethod(unescapeJSON(reader.nextString()!!))}
                "stopMethod" -> {modelElem.setStopMethod(unescapeJSON(reader.nextString()!!))}
                "updateMethod" -> {modelElem.setUpdateMethod(unescapeJSON(reader.nextString()!!))}
                "lowerBindings" -> {modelElem.setLowerBindings(reader.nextInt())}
                "upperBindings" -> {modelElem.setUpperBindings(reader.nextInt())}
                "lowerFragments" -> {modelElem.setLowerFragments(reader.nextInt())}
                "upperFragments" -> {modelElem.setUpperFragments(reader.nextInt())}
                "deployUnits" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addDeployUnits(ref as org.kevoree.DeployUnit)
                        } else {
                            context.resolvers.add({()->
                                var deployUnitsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(deployUnitsRef == null && i < context.loadedRoots.size()) {
                                    deployUnitsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(deployUnitsRef != null) {
                                    modelElem.addDeployUnits(deployUnitsRef as org.kevoree.DeployUnit)
                                } else { throw Exception("KMF Load error : DeployUnit not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "dictionaryType" -> {                                             reader.beginObject()
                    val dictionaryTypeElementId = elementId + "/@dictionaryType"
                    val loadedElem = loadDictionaryType(reader, context, dictionaryTypeElementId)
                    modelElem.setDictionaryType(loadedElem)
                    reader.endObject()
                }
                "superTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addSuperTypes(ref as org.kevoree.TypeDefinition)
                        } else {
                            context.resolvers.add({()->
                                var superTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(superTypesRef == null && i < context.loadedRoots.size()) {
                                    superTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(superTypesRef != null) {
                                    modelElem.addSuperTypes(superTypesRef as org.kevoree.TypeDefinition)
                                } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in ChannelType")}
            }
        }
        return modelElem
    }

    private fun loadTypeDefinition(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.TypeDefinition {

        val modelElem = mainFactory.getKevoreeFactory().createTypeDefinition()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "factoryBean" -> {modelElem.setFactoryBean(unescapeJSON(reader.nextString()!!))}
                "bean" -> {modelElem.setBean(unescapeJSON(reader.nextString()!!))}
                "nature" -> {modelElem.setNature(unescapeJSON(reader.nextString()!!))}
                "deployUnits" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addDeployUnits(ref as org.kevoree.DeployUnit)
                        } else {
                            context.resolvers.add({()->
                                var deployUnitsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(deployUnitsRef == null && i < context.loadedRoots.size()) {
                                    deployUnitsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(deployUnitsRef != null) {
                                    modelElem.addDeployUnits(deployUnitsRef as org.kevoree.DeployUnit)
                                } else { throw Exception("KMF Load error : DeployUnit not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "dictionaryType" -> {                                             reader.beginObject()
                    val dictionaryTypeElementId = elementId + "/@dictionaryType"
                    val loadedElem = loadDictionaryType(reader, context, dictionaryTypeElementId)
                    modelElem.setDictionaryType(loadedElem)
                    reader.endObject()
                }
                "superTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addSuperTypes(ref as org.kevoree.TypeDefinition)
                        } else {
                            context.resolvers.add({()->
                                var superTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(superTypesRef == null && i < context.loadedRoots.size()) {
                                    superTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(superTypesRef != null) {
                                    modelElem.addSuperTypes(superTypesRef as org.kevoree.TypeDefinition)
                                } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in TypeDefinition")}
            }
        }
        return modelElem
    }

    private fun loadInstance(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.Instance {

        val modelElem = mainFactory.getKevoreeFactory().createInstance()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "metaData" -> {modelElem.setMetaData(unescapeJSON(reader.nextString()!!))}
                "typeDefinition" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setTypeDefinition(ref as org.kevoree.TypeDefinition)
                    } else {
                        context.resolvers.add({()->
                            var typeDefinitionRef = context.map.get(adjustedRef)
                            var i = 0
                            while(typeDefinitionRef == null && i < context.loadedRoots.size()) {
                                typeDefinitionRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(typeDefinitionRef != null) {
                                modelElem.setTypeDefinition(typeDefinitionRef as org.kevoree.TypeDefinition)
                            } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "dictionary" -> {                                             reader.beginObject()
                    val dictionaryElementId = elementId + "/@dictionary"
                    val loadedElem = loadDictionary(reader, context, dictionaryElementId)
                    modelElem.setDictionary(loadedElem)
                    reader.endObject()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in Instance")}
            }
        }
        return modelElem
    }

    private fun loadLifeCycleTypeDefinition(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.LifeCycleTypeDefinition {

        val modelElem = mainFactory.getKevoreeFactory().createLifeCycleTypeDefinition()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "factoryBean" -> {modelElem.setFactoryBean(unescapeJSON(reader.nextString()!!))}
                "bean" -> {modelElem.setBean(unescapeJSON(reader.nextString()!!))}
                "nature" -> {modelElem.setNature(unescapeJSON(reader.nextString()!!))}
                "startMethod" -> {modelElem.setStartMethod(unescapeJSON(reader.nextString()!!))}
                "stopMethod" -> {modelElem.setStopMethod(unescapeJSON(reader.nextString()!!))}
                "updateMethod" -> {modelElem.setUpdateMethod(unescapeJSON(reader.nextString()!!))}
                "deployUnits" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addDeployUnits(ref as org.kevoree.DeployUnit)
                        } else {
                            context.resolvers.add({()->
                                var deployUnitsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(deployUnitsRef == null && i < context.loadedRoots.size()) {
                                    deployUnitsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(deployUnitsRef != null) {
                                    modelElem.addDeployUnits(deployUnitsRef as org.kevoree.DeployUnit)
                                } else { throw Exception("KMF Load error : DeployUnit not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "dictionaryType" -> {                                             reader.beginObject()
                    val dictionaryTypeElementId = elementId + "/@dictionaryType"
                    val loadedElem = loadDictionaryType(reader, context, dictionaryTypeElementId)
                    modelElem.setDictionaryType(loadedElem)
                    reader.endObject()
                }
                "superTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addSuperTypes(ref as org.kevoree.TypeDefinition)
                        } else {
                            context.resolvers.add({()->
                                var superTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(superTypesRef == null && i < context.loadedRoots.size()) {
                                    superTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(superTypesRef != null) {
                                    modelElem.addSuperTypes(superTypesRef as org.kevoree.TypeDefinition)
                                } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in LifeCycleTypeDefinition")}
            }
        }
        return modelElem
    }

    private fun loadGroup(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.Group {

        val modelElem = mainFactory.getKevoreeFactory().createGroup()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "metaData" -> {modelElem.setMetaData(unescapeJSON(reader.nextString()!!))}
                "typeDefinition" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setTypeDefinition(ref as org.kevoree.TypeDefinition)
                    } else {
                        context.resolvers.add({()->
                            var typeDefinitionRef = context.map.get(adjustedRef)
                            var i = 0
                            while(typeDefinitionRef == null && i < context.loadedRoots.size()) {
                                typeDefinitionRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(typeDefinitionRef != null) {
                                modelElem.setTypeDefinition(typeDefinitionRef as org.kevoree.TypeDefinition)
                            } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "dictionary" -> {                                             reader.beginObject()
                    val dictionaryElementId = elementId + "/@dictionary"
                    val loadedElem = loadDictionary(reader, context, dictionaryElementId)
                    modelElem.setDictionary(loadedElem)
                    reader.endObject()
                }
                "subNodes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addSubNodes(ref as org.kevoree.ContainerNode)
                        } else {
                            context.resolvers.add({()->
                                var subNodesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(subNodesRef == null && i < context.loadedRoots.size()) {
                                    subNodesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(subNodesRef != null) {
                                    modelElem.addSubNodes(subNodesRef as org.kevoree.ContainerNode)
                                } else { throw Exception("KMF Load error : ContainerNode not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in Group")}
            }
        }
        return modelElem
    }

    private fun loadGroupType(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.GroupType {

        val modelElem = mainFactory.getKevoreeFactory().createGroupType()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "factoryBean" -> {modelElem.setFactoryBean(unescapeJSON(reader.nextString()!!))}
                "bean" -> {modelElem.setBean(unescapeJSON(reader.nextString()!!))}
                "nature" -> {modelElem.setNature(unescapeJSON(reader.nextString()!!))}
                "startMethod" -> {modelElem.setStartMethod(unescapeJSON(reader.nextString()!!))}
                "stopMethod" -> {modelElem.setStopMethod(unescapeJSON(reader.nextString()!!))}
                "updateMethod" -> {modelElem.setUpdateMethod(unescapeJSON(reader.nextString()!!))}
                "deployUnits" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addDeployUnits(ref as org.kevoree.DeployUnit)
                        } else {
                            context.resolvers.add({()->
                                var deployUnitsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(deployUnitsRef == null && i < context.loadedRoots.size()) {
                                    deployUnitsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(deployUnitsRef != null) {
                                    modelElem.addDeployUnits(deployUnitsRef as org.kevoree.DeployUnit)
                                } else { throw Exception("KMF Load error : DeployUnit not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "dictionaryType" -> {                                             reader.beginObject()
                    val dictionaryTypeElementId = elementId + "/@dictionaryType"
                    val loadedElem = loadDictionaryType(reader, context, dictionaryTypeElementId)
                    modelElem.setDictionaryType(loadedElem)
                    reader.endObject()
                }
                "superTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addSuperTypes(ref as org.kevoree.TypeDefinition)
                        } else {
                            context.resolvers.add({()->
                                var superTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(superTypesRef == null && i < context.loadedRoots.size()) {
                                    superTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(superTypesRef != null) {
                                    modelElem.addSuperTypes(superTypesRef as org.kevoree.TypeDefinition)
                                } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in GroupType")}
            }
        }
        return modelElem
    }

    private fun loadNodeType(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.NodeType {

        val modelElem = mainFactory.getKevoreeFactory().createNodeType()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "factoryBean" -> {modelElem.setFactoryBean(unescapeJSON(reader.nextString()!!))}
                "bean" -> {modelElem.setBean(unescapeJSON(reader.nextString()!!))}
                "nature" -> {modelElem.setNature(unescapeJSON(reader.nextString()!!))}
                "startMethod" -> {modelElem.setStartMethod(unescapeJSON(reader.nextString()!!))}
                "stopMethod" -> {modelElem.setStopMethod(unescapeJSON(reader.nextString()!!))}
                "updateMethod" -> {modelElem.setUpdateMethod(unescapeJSON(reader.nextString()!!))}
                "deployUnits" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addDeployUnits(ref as org.kevoree.DeployUnit)
                        } else {
                            context.resolvers.add({()->
                                var deployUnitsRef = context.map.get(adjustedRef)
                                var i = 0
                                while(deployUnitsRef == null && i < context.loadedRoots.size()) {
                                    deployUnitsRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(deployUnitsRef != null) {
                                    modelElem.addDeployUnits(deployUnitsRef as org.kevoree.DeployUnit)
                                } else { throw Exception("KMF Load error : DeployUnit not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "dictionaryType" -> {                                             reader.beginObject()
                    val dictionaryTypeElementId = elementId + "/@dictionaryType"
                    val loadedElem = loadDictionaryType(reader, context, dictionaryTypeElementId)
                    modelElem.setDictionaryType(loadedElem)
                    reader.endObject()
                }
                "superTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addSuperTypes(ref as org.kevoree.TypeDefinition)
                        } else {
                            context.resolvers.add({()->
                                var superTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(superTypesRef == null && i < context.loadedRoots.size()) {
                                    superTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(superTypesRef != null) {
                                    modelElem.addSuperTypes(superTypesRef as org.kevoree.TypeDefinition)
                                } else { throw Exception("KMF Load error : TypeDefinition not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "managedPrimitiveTypes" -> {                                        reader.beginArray()
                    while(reader.hasNext()) {
                        val xmiRef = reader.nextString()!!
                        val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                        val ref = context.map.get(adjustedRef)
                        if( ref != null) {
                            modelElem.addManagedPrimitiveTypes(ref as org.kevoree.AdaptationPrimitiveType)
                        } else {
                            context.resolvers.add({()->
                                var managedPrimitiveTypesRef = context.map.get(adjustedRef)
                                var i = 0
                                while(managedPrimitiveTypesRef == null && i < context.loadedRoots.size()) {
                                    managedPrimitiveTypesRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                                }

                                if(managedPrimitiveTypesRef != null) {
                                    modelElem.addManagedPrimitiveTypes(managedPrimitiveTypesRef as org.kevoree.AdaptationPrimitiveType)
                                } else { throw Exception("KMF Load error : AdaptationPrimitiveType not found in map ! xmiRef:" + adjustedRef)}
                            })
                        }
                    }
                    reader.endArray()
                }
                "managedPrimitiveTypeRefs" -> {                                         reader.beginArray()
                    while(reader.hasNext()){
                        reader.beginObject()
                        val i = context.elementsCount.get(elementId + "/@managedPrimitiveTypeRefs") ?: 0
                        val managedPrimitiveTypeRefsElementId = elementId + "/@managedPrimitiveTypeRefs." + i
                        val loadedElem = loadAdaptationPrimitiveTypeRef(reader, context, managedPrimitiveTypeRefsElementId)
                        modelElem.addManagedPrimitiveTypeRefs(loadedElem)
                        context.elementsCount.put(elementId + "/@managedPrimitiveTypeRefs",i+1)
                        reader.endObject()
                    }
                    reader.endArray()
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in NodeType")}
            }
        }
        return modelElem
    }

    private fun loadAdaptationPrimitiveType(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.AdaptationPrimitiveType {

        val modelElem = mainFactory.getKevoreeFactory().createAdaptationPrimitiveType()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "name" -> {modelElem.setName(unescapeJSON(reader.nextString()!!))}
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in AdaptationPrimitiveType")}
            }
        }
        return modelElem
    }

    private fun loadAdaptationPrimitiveTypeRef(reader : JsonReader, context : LoadingContext, elementId: String) : org.kevoree.AdaptationPrimitiveTypeRef {

        val modelElem = mainFactory.getKevoreeFactory().createAdaptationPrimitiveTypeRef()
        context.map.put(elementId, modelElem)

        while (reader.hasNext()) {
            val nextName = reader.nextName()
            when(nextName) {
                "maxTime" -> {modelElem.setMaxTime(unescapeJSON(reader.nextString()!!))}
                "ref" -> {                                            val xmiRef = reader.nextString()!!
                    val adjustedRef = if(xmiRef.startsWith("//")){"/0" + xmiRef.substring(1)} else { xmiRef}
                    val ref = context.map.get(adjustedRef)
                    if( ref != null) {
                        modelElem.setRef(ref as org.kevoree.AdaptationPrimitiveType)
                    } else {
                        context.resolvers.add({()->
                            var refRef = context.map.get(adjustedRef)
                            var i = 0
                            while(refRef == null && i < context.loadedRoots.size()) {
                                refRef = (context.loadedRoots.get(i++) as? org.kevoree.container.KMFContainer)?.findByPath(adjustedRef)
                            }

                            if(refRef != null) {
                                modelElem.setRef(refRef as org.kevoree.AdaptationPrimitiveType)
                            } else { throw Exception("KMF Load error : AdaptationPrimitiveType not found in map ! xmiRef:" + adjustedRef)}
                        })
                    }
                }
                "eClass" -> { reader.nextString() }
                else -> {println("Tag unrecognized: " + nextName + " in AdaptationPrimitiveTypeRef")}
            }
        }
        return modelElem
    }



}