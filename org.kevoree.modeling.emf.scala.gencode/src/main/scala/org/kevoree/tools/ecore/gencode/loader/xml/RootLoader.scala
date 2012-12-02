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


package org.kevoree.tools.ecore.gencode.loader.xml

import org.eclipse.emf.ecore.{EPackage, EClass}
import scala.collection.JavaConversions._
import java.io._
import org.kevoree.tools.ecore.gencode.{GenerationContext, ProcessorHelper}
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
    val localFile = new File(genDir + "/" + elementType.getName + "Loader.scala")
    val pr = new PrintWriter(localFile,"utf-8")
    //System.out.println("Classifier class:" + cls.getClass)

    generateContext(elementType)
    val subLoaders = generateSubs(elementType)
    val modelPackage = ProcessorHelper.fqn(ctx, modelingPackage)
    val genPackage =  modelPackage + ".loader"

    pr.println("package " + genPackage)
    pr.println()
    pr.println("import java.io.{File, FileInputStream, StringReader, InputStreamReader, InputStream}")
    pr.println("import " + modelPackage + "._" )
    pr.println("import " + genPackage + ".sub._")
    pr.println("import javax.xml.stream.{XMLStreamConstants, XMLStreamReader, XMLInputFactory}")
    pr.println()

    pr.print("object " + elementType.getName + "Loader")

    if (subLoaders.size > 0) {
      var stringListSubLoaders = List[String]()
      subLoaders.foreach(sub => stringListSubLoaders = stringListSubLoaders ++ List(sub.getName + "Loader"))
      pr.println(stringListSubLoaders.mkString("\nextends ", "\nwith ", " {"))
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

    ProcessorHelper.formatScalaSource(localFile)
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

    pr.println("def loadModel(str: String) : Option[" + ProcessorHelper.fqn(ctx,elementType) + "] = {")
    pr.println("val stringReader = new StringReader(str)")
    pr.println("val factory = XMLInputFactory.newInstance()")
    pr.println("val reader = factory.createXMLStreamReader(stringReader)")
    pr.println("factory.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, java.lang.Boolean.FALSE)")
    pr.println("factory.setProperty(XMLInputFactory.IS_VALIDATING, java.lang.Boolean.FALSE)")
    pr.println("if(reader.hasNext) {")
    pr.println("Some(deserialize(reader))")
    pr.println("} else {")
    pr.println("System.out.println(\"" + elementType.getName + "Loader::Noting in the file !\");None")
    pr.println("}")
    pr.println("}")

    pr.println("def loadModel(file: File) : Option[" + ProcessorHelper.fqn(ctx,elementType) + "] = {")
    pr.println("loadModel(new FileInputStream(file))")
    pr.println("}")


    pr.println("def loadModel(is: InputStream) : Option[" + ProcessorHelper.fqn(ctx,elementType) + "] = {")
    pr.println("val isReader = new java.io.BufferedReader(new InputStreamReader(is))")
    pr.println("val factory = XMLInputFactory.newInstance()")
    pr.println("val reader = factory.createXMLStreamReader(isReader)")
    pr.println("factory.setProperty(XMLInputFactory.IS_SUPPORTING_EXTERNAL_ENTITIES, java.lang.Boolean.FALSE)")
    pr.println("factory.setProperty(XMLInputFactory.IS_VALIDATING, java.lang.Boolean.FALSE)")
    pr.println("if(reader.hasNext) {")
    pr.println("Some(deserialize(reader))")
    pr.println("} else {")
    pr.println("System.out.println(\"" + elementType.getName + "Loader::Noting in the file !\");None")
    pr.println("}")
    pr.println("}")


  }


  private def generateDeserialize(pr: PrintWriter, context: String, rootContainerName: String, elementType: EClass) {

    pr.println("private def deserialize(reader : XMLStreamReader): "+ProcessorHelper.fqn(ctx,elementType)+" = {")
    pr.println("val context = new " + context)
    pr.println("context.xmiReader = reader")
    pr.println("do {")
    pr.println("while(reader.hasNext && reader.nextTag() != XMLStreamConstants.START_ELEMENT){}")
    pr.println("if(reader.getLocalName.equalsIgnoreCase(\""+rootContainerName+"\")) {")
    pr.println("load"+ elementType.getName +"(context)")
    pr.println("context.resolvers.foreach{res=>res()}")
    pr.println("}")
    pr.println("}while(context." + rootContainerName + " == null && reader.hasNext)")
    pr.println("")
    pr.println("context." + rootContainerName)

    pr.println("}")
  }


  private def generateLoadElementsMethod(pr: PrintWriter, context : String, rootContainerName: String, elementType: EClass) {

    val ePackageName = elementType.getEPackage.getName
    val factory = ProcessorHelper.fqn(ctx,elementType.getEPackage) + "." + ePackageName.substring(0, 1).toUpperCase + ePackageName.substring(1) + "Factory"

    pr.println("private def load" + elementType.getName + "(context : " + context + ") {")
    pr.println("")
    pr.println("val elementTagName = context.xmiReader.getLocalName")
    pr.println("context." + rootContainerName + " = " + factory + ".create" + elementType.getName)
    pr.println("context.map += (\"/\"->context."+rootContainerName+")")
    pr.println("")
    pr.println("var done = false")
    pr.println("while(!done && context.xmiReader.hasNext) {")
    pr.println("context.xmiReader.nextTag() match {")
    pr.println("case XMLStreamConstants.START_ELEMENT => {")
    pr.println("context.xmiReader.getLocalName match {")

    elementType.getEAllContainments.foreach {refa =>
      pr.println("case \""+refa.getName+"\" => {")
      pr.println("val i = context.elementsCount.getOrElse(\"//@"+refa.getName+"\",0)")
      pr.println("val currentElementId = \"//@"+refa.getName+".\" + i")
      val formattedReferenceName = refa.getName.substring(0, 1).toUpperCase + refa.getName.substring(1)
      if(!refa.isMany) {
        if (!refa.isRequired) {
          pr.println("context." + rootContainerName + ".set" + formattedReferenceName + "(" + refa.getName + ".headOption)")
        } else {
          pr.println("context." + rootContainerName + ".set" + formattedReferenceName + "(" + refa.getName + ".head)")
        }
      } else {
        pr.println("context." + rootContainerName + ".add" + formattedReferenceName + "(load" + refa.getEReferenceType.getName + "Element(currentElementId, context))")
      }
      pr.println("context.elementsCount.update(\"//@"+refa.getName+"\",i+1)")
      pr.println("}") //case
    }


    pr.println("case _@e => System.out.println(\"Tag unrecognized: \" + context.xmiReader.getLocalName + \" in \" + getClass.getSimpleName)")
    pr.println("}") // Match
    pr.println("}") // Case START_ELEMENT
    pr.println("case XMLStreamConstants.END_ELEMENT => {")
    pr.println("if(context.xmiReader.getLocalName.equals(elementTagName)){done = true}")
    pr.println("}") //case END
    pr.println("case _@e => System.out.println(\"Ignored Value:\" + e)")
    pr.println("}") // match
    pr.println("}") // While
    pr.println("}") // Method
    pr.println("")

  }

}