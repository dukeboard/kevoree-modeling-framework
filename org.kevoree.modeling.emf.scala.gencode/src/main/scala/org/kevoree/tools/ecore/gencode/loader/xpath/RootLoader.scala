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


package org.kevoree.tools.ecore.gencode.loader.xpath

import org.eclipse.emf.ecore.{EReference, EPackage, EClass}
import scala.collection.JavaConversions._
import java.io._
import org.kevoree.tools.ecore.gencode.{GenerationContext, ProcessorHelper}

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

    pr.println("package " + genPackage + ";")
    pr.println()
    pr.println("import xml.{XML,NodeSeq}")
    pr.println("import java.io.{File, FileInputStream, InputStream}")
    pr.println("import " + modelPackage + "._" )
    pr.println("import " + genPackage + ".sub._")
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
    generateResolveElementsMethod(pr, context, rootContainerName, elementType)

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

    //listContainedElementsTypes.foreach(elem => System.out.print(elem.getName + ","))

    listContainedElementsTypes
  }

  private def generateLoadMethod(pr: PrintWriter, elementType: EClass) {

    pr.println("def loadModel(str: String) : Option[" + ProcessorHelper.fqn(ctx,elementType) + "] = {")
    pr.println("val xmlStream = XML.loadString(str)")
    pr.println("val document = NodeSeq fromSeq xmlStream")
    pr.println("document.headOption match {")
    pr.println("case Some(rootNode) => Some(deserialize(rootNode))")
    pr.println("case None => System.out.println(\"" + elementType.getName + "Loader::Noting at the containerRoot !\");None")
    pr.println("}")
    pr.println("}")

    pr.println("")
    pr.println("def loadModel(file: File) : Option[" + ProcessorHelper.fqn(ctx,elementType) + "] = {")
    pr.println("loadModel(new FileInputStream(file))")
    pr.println("}")

    pr.println("")
    pr.println("def loadModel(is: InputStream) : Option[" + ProcessorHelper.fqn(ctx,elementType) + "] = {")
    pr.println("val xmlStream = XML.load(is)")
    pr.println("val document = NodeSeq fromSeq xmlStream")
    pr.println("document.headOption match {")
    pr.println("case Some(rootNode) => Some(deserialize(rootNode))")
    pr.println("case None => System.out.println(\"" + elementType.getName + "Loader::Noting at the containerRoot !\");None")
    pr.println("}")
    pr.println("}")


  }


  private def generateDeserialize(pr: PrintWriter, context: String, rootContainerName: String, elementType: EClass) {

    val ePackageName = elementType.getEPackage.getName
    val factory = ProcessorHelper.fqn(ctx,elementType.getEPackage) + "." + ePackageName.substring(0, 1).toUpperCase + ePackageName.substring(1) + "Factory"


    pr.println("private def deserialize(rootNode: NodeSeq): "+ProcessorHelper.fqn(ctx,elementType)+" = {")
    pr.println("val context = new " + context)
    pr.println("context." + rootContainerName + " = " + factory + ".create" + elementType.getName)
    pr.println("context.xmiContent = rootNode")
    pr.println("context.map += (\"/\"->context."+rootContainerName+")")

    pr.println("load" + elementType.getName + "(rootNode, context)")
    pr.println("resolveElements(rootNode, context)")
    pr.println("context." + rootContainerName)

    pr.println("}")
  }


  private def generateLoadElementsMethod(pr: PrintWriter, context : String, rootContainerName: String, elementType: EClass) {

    pr.println("private def load" + elementType.getName + "(rootNode: NodeSeq, context : " + context + ") {")
    pr.println("")
    elementType.getEAllContainments.foreach {
      refa =>
        val ref = refa.asInstanceOf[EReference]
        pr.println("val " + ref.getName + " = load" + ref.getEReferenceType.getName + "(\"/\", rootNode, \"" + ref.getName + "\", context)")
        if(!ref.isMany) {
          if (!ref.isRequired) {
            pr.println("context." + rootContainerName + ".set" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + ref.getName + ".headOption)")
          } else {
            pr.println("context." + rootContainerName + ".set" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + ref.getName + ".head)")
          }
        } else {
          pr.println("context." + rootContainerName + ".set" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + ref.getName + ".toList)")
        }
        //        pr.println("" + ref.getName + ".foreach{e=>e.eContainer=" + context + "." + rootContainerName + " }")
        pr.println("")
    }

    pr.println("}")
  }

  private def generateResolveElementsMethod(pr: PrintWriter, context : String, rootContainerName: String, elementType: EClass) {
    //val context = elementType.getName + "LoadContext"
    //val rootContainerName = elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1)
    pr.println("private def resolveElements(rootNode: NodeSeq, context : " + context + ") {")
    elementType.getEAllContainments.foreach {
      ref =>
        pr.println("resolve" + ref.getEReferenceType.getName + "(\"/\", rootNode, \"" + ref.getName + "\", context)")
    }


    elementType.getEAllReferences.filter(ref => !elementType.getEAllContainments.contains(ref)).foreach {
      ref =>
        pr.println("(rootNode \\ \"@" + ref.getName + "\").headOption match {")
        pr.println("case Some(head) => {")
        pr.println("head.text.split(\" \").foreach {")
        pr.println("xmiRef =>")
        pr.println("context.map.get(xmiRef) match {")
        var methName: String = ""
        if (ref.getUpperBound == 1) {
          methName = "set"
        } else {
          methName = "add"
        }
        methName += ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
        if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          pr.println("case Some(s: " + ProcessorHelper.fqn(ctx,ref.getEReferenceType) + ") => context." + rootContainerName+"."+ methName + "(Some(s))")
        } else {
          pr.println("case Some(s: " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ") => context." + rootContainerName+"."+ methName + "(s)")
        }


        pr.println("case None => throw new Exception(\"KMF Load error : " + ref.getEReferenceType.getName + " not found in map ! xmiRef:\" + xmiRef)")
        pr.println("}")
        pr.println("}")
        pr.println("}")
        pr.println("case None => //No subtype for this library")
        pr.println("}")
    }
    pr.println("}")
  }

}