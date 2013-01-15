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


package org.kevoree.tools.ecore.kotlin.gencode.loader.xml

import org.eclipse.emf.ecore.{EPackage, EClass}
import scala.collection.JavaConversions._
import java.io._
import org.kevoree.tools.ecore.kotlin.gencode.{GenerationContext, ProcessorHelper}
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
    val localFile = new File(genDir + "/" + elementType.getName + "Loader.kt")
    val pr = new PrintWriter(localFile,"utf-8")
    //System.out.println("Classifier class:" + cls.getClass)

    generateContext(elementType)
    val subLoaders = generateSubs(elementType)
    val modelPackage = ProcessorHelper.fqn(ctx, modelingPackage)
    val genPackage =  modelPackage + ".loader"

    pr.println("package " + genPackage + ";")
    pr.println()
    pr.println("import java.io.File")
    pr.println("import java.io.FileInputStream")
    pr.println("import java.io.StringReader")
    pr.println("import java.io.InputStreamReader")
    pr.println("import java.io.InputStream")
    pr.println("import " + modelPackage + ".*" )
    pr.println("import " + genPackage + ".sub.*")
    pr.println("import javax.xml.stream.XMLStreamConstants")
    pr.println("import javax.xml.stream.XMLStreamReader")
    pr.println("import javax.xml.stream.XMLInputFactory")
    pr.println()

    pr.print("object " + elementType.getName + "Loader")

    if (subLoaders.size > 0) {
      var stringListSubLoaders = List[String]()
      subLoaders.foreach(sub => stringListSubLoaders = stringListSubLoaders ++ List(sub.getName + "Loader"))
      pr.println(stringListSubLoaders.mkString(": ", ", ", " {"))
    } else {
      pr.println("{")
    }

    pr.println("")

    val context = elementType.getName + "LoadContext"
    val rootContainerName = elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1)

    generateLoadMethod(pr, elementType)
    pr.println("")
    generateDeserialize(pr, context, rootContainerName, elementType)
    pr.println("")
    generateLoadElementsMethod(pr, context, rootContainerName, elementType)

    pr.println("")
    pr.println("}")

    pr.flush()
    pr.close()

  }

  private def generateContext(elementType: EClass) {
    val packageOfModel = ProcessorHelper.fqn(ctx, modelingPackage)
    val el = new ContextGenerator(ctx, genDir, packageOfModel + ".loader", elementType, packageOfModel)
    el.generateContext()
  }

  private def generateSubs(currentType: EClass): List[EClass] = {

    val packageOfModel = ProcessorHelper.fqn(ctx, modelingPackage)
    val genPackage = packageOfModel + ".loader"

    val context = currentType.getName + "LoadContext"
    //modelingPackage.getEClassifiers.filter(cl => !cl.equals(elementType)).foreach{ ref =>
    var listContainedElementsTypes = List[EClass]()
    currentType.getEAllContainments.foreach {
      ref =>

        if(ref.getEReferenceType != currentType) { //avoid looping in self-containment

          if (!ref.getEReferenceType.isInterface) {
            val el = new BasicElementLoader(ctx, genDir + "/sub/", genPackage + ".sub", ref.getEReferenceType, context, modelingPackage, packageOfModel)
            el.generateLoader()
          } else {
            //System.out.println("ReferenceType of " + ref.getName + " is an interface. Not supported yet.")
            val el = new InterfaceElementLoader(ctx, genDir + "/sub/", genPackage + ".sub", ref.getEReferenceType, context, modelingPackage, packageOfModel)
            el.generateLoader()
          }
          if (!listContainedElementsTypes.contains(ref.getEReferenceType)) {
            listContainedElementsTypes = listContainedElementsTypes ++ List(ref.getEReferenceType)
          }
        }
    }
    listContainedElementsTypes
  }

  private def generateLoadMethod(pr: PrintWriter, elementType: EClass) {

    pr.println("fun loadModel(str: String) : " + ProcessorHelper.fqn(ctx,elementType) + "? {")
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

    pr.println("fun loadModel(file: File) : " + ProcessorHelper.fqn(ctx,elementType) + "? {")
    pr.println("return loadModel(FileInputStream(file))")
    pr.println("}")


    pr.println("fun loadModel(inputStream: InputStream) : " + ProcessorHelper.fqn(ctx,elementType) + "? {")
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


  private def generateDeserialize(pr: PrintWriter, context: String, rootContainerName: String, elementType: EClass) {

    pr.println("private fun deserialize(reader : XMLStreamReader): "+ProcessorHelper.fqn(ctx,elementType)+"? {")
    pr.println("val context = " + context + "(reader)")
    //pr.println("context.xmiReader = reader")
    pr.println("do {")
    pr.println("while(reader.hasNext() && reader.nextTag() != XMLStreamConstants.START_ELEMENT){}")
    pr.println("if(reader.getLocalName()?.equalsIgnoreCase(\""+rootContainerName+"\") as Boolean) {")
    pr.println("load"+ elementType.getName +"(context)")
    pr.println("context.resolvers.forEach{res->res()}")
    pr.println("}")
    pr.println("}while(context." + rootContainerName + " == null && reader.hasNext())")
    pr.println("")
    pr.println("return context." + rootContainerName)

    pr.println("}")
  }


  private def generateLoadElementsMethod(pr: PrintWriter, context : String, rootContainerName: String, elementType: EClass) {

    val ePackageName = elementType.getEPackage.getName
    val factory = ProcessorHelper.fqn(ctx,elementType.getEPackage) + "." + ePackageName.substring(0, 1).toUpperCase + ePackageName.substring(1) + "Factory"

    pr.println("private fun load" + elementType.getName + "(context : " + context + ") {")
    pr.println("")
    pr.println("val elementTagName = context.xmiReader?.getLocalName()")
    pr.println("context." + rootContainerName + " = " + factory + ".create" + elementType.getName + "()")
    pr.println("context.map.put(\"/\", context."+rootContainerName+" as Any)")
    pr.println("")
    pr.println("var done = false")
    pr.println("while(!done && (context.xmiReader?.hasNext() as Boolean)) {")
    pr.println("val nextTag = context.xmiReader?.nextTag()")
    pr.println("when(nextTag){")
    pr.println("XMLStreamConstants.START_ELEMENT -> {")
    pr.println("when(context.xmiReader?.getLocalName()) {")

    elementType.getEAllContainments.foreach {refa =>
      pr.println("\""+refa.getName+"\" -> {")
      pr.println("val i = context.elementsCount.get(\"//@"+refa.getName+"\") ?: 0")
      pr.println("val currentElementId = \"//@"+refa.getName+".\" + i")
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
      pr.println("context.elementsCount.put(\"//@"+refa.getName+"\",i+1)")
      pr.println("}") //case
    }


    pr.println("else -> System.out.println(\"Tag unrecognized: \" + context.xmiReader?.getLocalName() + \" in \" + this.javaClass.getSimpleName())")
    pr.println("}") // Match
    pr.println("}") // Case START_ELEMENT
    pr.println("XMLStreamConstants.END_ELEMENT -> {")
    pr.println("if(context.xmiReader?.getLocalName()?.equals(elementTagName) as Boolean){done = true}")
    pr.println("}") //case END
    pr.println("else -> System.out.println(\"Ignored Value:\" + nextTag)")
    pr.println("}") // match
    pr.println("}") // While
    pr.println("}") // Method
    pr.println("")

  }

}