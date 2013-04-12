/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * Fouquet Francois
 * Nain Gregory
 */
/**
 * Licensed under the GNU LESSER GENERAL PUBLIC LICENSE, Version 3, 29 June 2007;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * 	http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Authors:
 * 	Fouquet Francois
 * 	Nain Gregory
 */


package org.kevoree.modeling.kotlin.generator.loader.xml

import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore.{EEnum, EPackage, EClass}
import scala.collection.JavaConversions._
import java.io._
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}
import javax.xml.stream.{XMLInputFactory, XMLStreamConstants}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 25/09/11
 * Time: 14:20
 */


class RootLoader(ctx : GenerationContext, genDir: String, modelingPackage: EPackage) {

  def generateLoader(elementType: EClass, elementNameInParent: String) {

    ProcessorHelper.checkOrCreateFolder(genDir)
    val localFile = new File(genDir + "/XMIModelLoader.kt")
    ctx.loaderPrintWriter = new PrintWriter(localFile,"utf-8")
    val pr = ctx.loaderPrintWriter

    generateContext(elementType)
    val genPackage =  ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".loader"

    pr.println("package " + genPackage + ";")
    pr.println()
    pr.println("import java.io.File")
    pr.println("import java.io.FileInputStream")
    pr.println("import java.io.StringReader")
    pr.println("import java.io.InputStreamReader")
    pr.println("import java.io.InputStream")
    //pr.println("import " + genPackage + ".sub.*")
    pr.println("import javax.xml.stream.XMLStreamConstants")
    pr.println("import javax.xml.stream.XMLStreamReader")
    pr.println("import javax.xml.stream.XMLInputFactory")
    pr.println()

    pr.print("class XMIModelLoader : " +  ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".loader.ModelLoader" )

    // if (subLoaders.size > 0) {
    //   var stringListSubLoaders = List[String]()
    //   subLoaders.foreach(sub => stringListSubLoaders = stringListSubLoaders ++ List(sub.getName + "Loader"))
    //   pr.println(stringListSubLoaders.mkString(": ", ", ", " {"))
    // } else {
    pr.println("{")
    // }

    pr.println("")
    //TODO: REMOVE NEXT LiNE AFTER DEBUG
    pr.println("var debug : Boolean = false")
    pr.println("")
    pr.println("")
    pr.println("")
    val rootContainerName = elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1)


    generateFactorySetter(pr)
    pr.println("")
    generateUnescapeXmlMathod(pr)
    generateLoadMethod(pr, elementType)
    pr.println("")
    generateDeserialize(pr, rootContainerName, elementType)
    pr.println("")
    generateLoadElementsMethod(pr, rootContainerName, elementType)

    pr.println("")
    generateSubs(elementType)

    pr.println("")
    pr.println("}")

    pr.flush()
    pr.close()

  }

  private def generateContext(elementType: EClass) {
    val el = new ContextGenerator(ctx, elementType)
    el.generateContext()
  }


  private def generateUnescapeXmlMathod(pr : PrintWriter) {
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("templates/LoaderUnescapeXML.vm")
    val ctxV = new VelocityContext()
    template.merge(ctxV,pr)
  }


  private def generateSubs(currentType: EClass): List[EClass] = {

    //val genPackage = ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".loader"

    //val context = "LoadContext"
    //modelingPackage.getEClassifiers.filter(cl => !cl.equals(elementType)).foreach{ ref =>
    var listContainedElementsTypes = List[EClass]()
    currentType.getEAllContainments.foreach {
      ref =>

        if(ref.getEReferenceType != currentType) { //avoid looping in self-containment

          if (!ref.getEReferenceType.isInterface && !ref.getEReferenceType.isAbstract) {
            val el = new BasicElementLoader(ctx, ref.getEReferenceType)
            el.generateLoader()
          } else {
            //System.out.println("ReferenceType of " + ref.getName + " is an interface. Not supported yet.")
            val el = new InterfaceElementLoader(ctx, ref.getEReferenceType)
            el.generateLoader()
          }
          if (!listContainedElementsTypes.contains(ref.getEReferenceType)) {
            listContainedElementsTypes = listContainedElementsTypes ++ List(ref.getEReferenceType)
          }
        }
    }
    listContainedElementsTypes
  }


  private def generateFactorySetter(pr: PrintWriter) {
    pr.println("private var mainFactory : " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".factory.MainFactory = "+ ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".factory.MainFactory()")
    ctx.packageFactoryMap.values().foreach{factoryFqn =>
      //val factoryPackage = factoryFqn.substring(0, factoryFqn.lastIndexOf("."))
      val factoryName = factoryFqn.substring(factoryFqn.lastIndexOf(".") + 1)
      pr.println("fun set"+factoryName+"(fct : " + factoryFqn + ") { mainFactory.set"+factoryName+ "(fct)}")
      //pr.println("fun get"+factoryName+"() : "+factoryFqn+" { return mainFactory.get"+factoryName+ "()}")
    }

  }

  private def generateLoadMethod(pr: PrintWriter, elementType: EClass) {

    pr.println("override fun loadModelFromString(str: String) : List<" + ProcessorHelper.fqn(ctx,elementType) + ">? {")
    pr.println("val stringReader = StringReader(str)")
    pr.println("val factory = XMLInputFactory.newInstance()")
    pr.println("val reader = factory?.createXMLStreamReader(stringReader)")
    pr.println("factory?.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false)")
    pr.println("factory?.setProperty(XMLInputFactory.IS_VALIDATING, false)")
    pr.println("if(reader != null && reader.hasNext()) {")
    pr.println("return deserialize(reader)")
    pr.println("} else {")
    pr.println("System.out.println(\"" + elementType.getName + "Loader::Noting in the file !\")")
    pr.println("return null")
    pr.println("}")
    pr.println("}")

    pr.println("override fun loadModelFromPath(file: File) : List<" + ProcessorHelper.fqn(ctx,elementType) + ">? {")
    pr.println("return loadModelFromStream(FileInputStream(file))")
    pr.println("}")


    pr.println("override fun loadModelFromStream(inputStream: InputStream) : List<" + ProcessorHelper.fqn(ctx,elementType) + ">? {")
    pr.println("val isReader = java.io.BufferedReader(InputStreamReader(inputStream))")
    pr.println("val factory = XMLInputFactory.newInstance()")
    pr.println("val reader = factory?.createXMLStreamReader(isReader)")
    pr.println("factory?.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, false)")
    pr.println("factory?.setProperty(XMLInputFactory.IS_VALIDATING, false)")
    pr.println("if(reader != null && reader.hasNext()) {")
    pr.println("return deserialize(reader)")
    pr.println("} else {")
    pr.println("System.out.println(\"" + elementType.getName + "Loader::Noting in the file !\")")
    pr.println("return null")
    pr.println("}")
    pr.println("}")


  }


  private def generateDeserialize(pr: PrintWriter, rootContainerName: String, elementType: EClass) {

    pr.println("private fun deserialize(reader : XMLStreamReader): List<"+ProcessorHelper.fqn(ctx,elementType)+"> {")

    pr.println("val context = LoadingContext()")
    pr.println("context.xmiReader = reader")
    //pr.println("context.factory = this.factory")
    pr.println("while(reader.hasNext()) {")
    pr.println("val nextTag = reader.next()")
    pr.println("when(nextTag) {")
    pr.println("XMLStreamConstants.START_ELEMENT -> {")
    pr.println("val localName = reader.getLocalName()")
    pr.println("if(localName != null && localName.contains(\""+rootContainerName.substring(0, 1).toUpperCase + rootContainerName.substring(1)+"\")) {")
    pr.println("load"+ elementType.getName +"(context)")
    pr.println("if(context."+ rootContainerName +" != null) {")
    pr.println("context.loaded_" + rootContainerName + ".add(context." + rootContainerName + "!!)")
    pr.println("}")

    pr.println("}")
    pr.println("}") // START_ELEMENT
    pr.println("XMLStreamConstants.END_ELEMENT -> {break}")
    pr.println("XMLStreamConstants.END_DOCUMENT -> {break}")
    pr.println("else ->{println(\"Default case :\" + nextTag.toString())}")

    pr.println("}")//When
    pr.println("}")//while

    pr.println("for(res in context.resolvers) {res()}")

    pr.println("return context.loaded_" + rootContainerName)

    pr.println("}")
  }


  private def generateLoadElementsMethod(pr: PrintWriter, rootContainerName: String, elementType: EClass) {

    val ePackageName = elementType.getEPackage.getName
    //val factory = ProcessorHelper.fqn(ctx,elementType.getEPackage) + "." + ePackageName.substring(0, 1).toUpperCase + ePackageName.substring(1) + "Factory"

    pr.println("private fun load" + elementType.getName + "(context : LoadingContext) {")
    pr.println("")
    pr.println("val elementTagName = context.xmiReader!!.getLocalName()")
    pr.println("val loaded"+rootContainerName+"Size = context.loaded_"+rootContainerName+".size()")
    pr.println("context." + rootContainerName + " = mainFactory.get"+ePackageName.substring(0, 1).toUpperCase + ePackageName.substring(1)+"Factory().create" + elementType.getName + "()")
    pr.println("context.map.put(\"/\" + loaded"+rootContainerName+"Size, context."+rootContainerName+"!!)")
    pr.println("")

    val references = elementType.getEAllReferences.filter(ref => !ref.isContainment)
    if (elementType.getEAllAttributes.size() > 0 || references.size > 0) {

      pr.println("val modelElem = context." + rootContainerName + "!!")
      pr.println("for(i in 0.rangeTo(context.xmiReader!!.getAttributeCount()-1)) {")
      pr.println("val prefix = context.xmiReader!!.getAttributePrefix(i)")
      pr.println("if(prefix==null || prefix.equals(\"\")) {")
      pr.println("val attrName = context.xmiReader!!.getAttributeLocalName(i)")
      pr.println("val valueAtt = context.xmiReader!!.getAttributeValue(i)")
      pr.println("if( valueAtt != null) {")
      pr.println("when(attrName){")
      pr.println("")
      elementType.getEAllAttributes.foreach {
        att =>

          val methName = "set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1)
          pr.println("\"" + att.getName + "\" -> {")
          val FQattTypeName = ProcessorHelper.fqn(ctx,att.getEAttributeType)

          if (att.getEAttributeType.isInstanceOf[EEnum]) {
            pr.println("modelElem." + methName + "(" + FQattTypeName + ".valueOf(valueAtt))")
          }
          else {
            val attTypeName = ProcessorHelper.convertType(att.getEAttributeType)
            attTypeName match {
              case "String" => {
                pr.println("modelElem." + methName + "(unescapeXml(valueAtt))")
              }
              case "Boolean" | "Double" | "Int"  => {
                pr.println("modelElem." + methName + "(valueAtt.to"+attTypeName+"())")
              }
              case "Any" => {
                pr.println("modelElem." + methName + "(valueAtt as " + attTypeName + ")")
              }
              case _@_type => {
                pr.println("modelElem." + methName + "(valueAtt.to" + _type + "() as " + attTypeName + ")")
              }
            }
          }


          pr.println("}")
          pr.println("")

      }
      references.foreach {
        ref =>

          var methName: String = ""
          if (ref.getUpperBound == 1) {
            methName = "set"
          } else {
            methName = "add"
          }
          methName += ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)

          pr.println("\"" + ref.getName + "\" -> {")

          pr.println("for(xmiRef in valueAtt.split(\" \")) {")
          pr.println("val adjustedRef = if(xmiRef.startsWith(\"//\")){\"/0\" + xmiRef.substring(1)} else { xmiRef}")
          pr.println("val ref = context.map.get(adjustedRef)")
          pr.println("if( ref != null) {")
          pr.println("modelElem." + methName + "(ref as " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ")")
          pr.println("} else {")
          pr.println("context.resolvers.add({()->")
          pr.println("val " + ref.getName + "Ref = context.map.get(adjustedRef)")
          pr.println("if(" + ref.getName + "Ref != null) {")
          pr.println("modelElem." + methName + "(" + ref.getName + "Ref as " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ")")
          pr.println("} else { throw Exception(\"KMF Load error : " + ref.getEReferenceType.getName + " not found in map ! xmiRef:\" + adjustedRef)}")
          pr.println("})") //Closure
          pr.println("}") // Else
          pr.println("}") // For
          pr.println("}") // Case
        // pr.println("}")
      }
      pr.println("else->{System.err.println(\"" + elementType.getName + ">>AttributeName not in cases:\" + attrName) }")
      pr.println("}") // when
      pr.println(" }") // if value att not null
      pr.println(" }") // if prefix != null
      pr.println(" }") // For


      pr.println("")

    }


    pr.println("var done = false")
    pr.println("while(!done && (context.xmiReader!!.hasNext())) {")
    pr.println("val nextTag = context.xmiReader!!.nextTag()")
    pr.println("when(nextTag){")
    pr.println("XMLStreamConstants.START_ELEMENT -> {")
    pr.println("when(context.xmiReader!!.getLocalName()) {")

    elementType.getEAllContainments.foreach {refa =>
      pr.println("\""+refa.getName+"\" -> {")
      pr.println("val i = context.elementsCount.get(\"/\"+ loaded"+rootContainerName+"Size + \"/@"+refa.getName+"\") ?: 0")
      pr.println("val currentElementId = \"/\" + loaded"+rootContainerName+"Size + \"/@"+refa.getName+".\" + i")
      val formattedReferenceName = refa.getName.substring(0, 1).toUpperCase + refa.getName.substring(1)
      if(!refa.isMany) {
        if (!refa.isRequired) {
          pr.println("context." + rootContainerName + "?.set" + formattedReferenceName + "(Some(load" + refa.getEReferenceType.getName + "Element(currentElementId, context)))")
        } else {
          pr.println("context." + rootContainerName + "?.set" + formattedReferenceName + "(load" + refa.getEReferenceType.getName + "Element(currentElementId, context))")
        }
      } else {
        pr.println("context." + rootContainerName + "?.add" + formattedReferenceName + "(load" + refa.getEReferenceType.getName + "Element(currentElementId, context))")
      }
      pr.println("context.elementsCount.put(\"/\"+ loaded"+rootContainerName+"Size+\"/@"+refa.getName+"\",i+1)")
      pr.println("}") //case
    }


    pr.println("else -> System.out.println(\"Tag unrecognized: \" + context.xmiReader!!.getLocalName() + \" in "+elementType.getName+"\")")
    pr.println("}") // Match
    pr.println("}") // Case START_ELEMENT
    pr.println("XMLStreamConstants.END_ELEMENT -> {")
    pr.println("if(context.xmiReader!!.getLocalName()?.equals(elementTagName) as Boolean){done = true}")
    pr.println("}") //case END
    pr.println("else -> System.out.println(\"Ignored Value:\" + nextTag)")
    pr.println("}") // match
    pr.println("}") // While
    pr.println("}") // Method
    pr.println("")

  }

}