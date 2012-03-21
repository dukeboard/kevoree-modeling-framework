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


package org.kevoree.tools.ecore.gencode.loader

import org.eclipse.emf.ecore.{EPackage, EClass}
import scala.collection.JavaConversions._
import xml.XML
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
    val pr = new PrintWriter(new File(genDir + "/" + elementType.getName + "Loader.scala"),"utf-8")
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
      pr.println(stringListSubLoaders.mkString("\n\t\textends ", "\n\t\twith ", " {"))
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
    generateResolveElementsMethod(pr, context, elementType)

    pr.println("")
    pr.println("}")

    pr.flush()
    pr.close()
  }

  private def generateContext(elementType: EClass) {
    val packageOfModel = ProcessorHelper.fqn(ctx, modelingPackage)
    val el = new ContextGenerator(genDir, packageOfModel + ".loader", elementType, packageOfModel)
    el.generateContext()
  }

  private def generateSubs(currentType: EClass): List[EClass] = {
    var factory = modelingPackage.getName
    factory = factory.substring(0, 1).toUpperCase + factory.substring(1) + "Factory"

    val packageOfModel = ProcessorHelper.fqn(ctx, modelingPackage)
    val genPackage = packageOfModel + ".loader"

    val context = currentType.getName + "LoadContext"
    //modelingPackage.getEClassifiers.filter(cl => !cl.equals(elementType)).foreach{ ref =>
    var listContainedElementsTypes = List[EClass]()
    currentType.getEAllContainments.foreach {
      ref =>

        if(ref.getEReferenceType != currentType) { //avoid looping in self-containment

          if (!ref.getEReferenceType.isInterface) {
            val el = new BasicElementLoader(ctx, genDir + "/sub/", genPackage + ".sub", ref.getEReferenceType, context, factory, modelingPackage, packageOfModel)
            el.generateLoader()
          } else {
            //System.out.println("ReferenceType of " + ref.getName + " is an interface. Not supported yet.")
            val el = new InterfaceElementLoader(ctx, genDir + "/sub/", genPackage + ".sub", ref.getEReferenceType, context, factory, modelingPackage, packageOfModel)
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

    pr.println("\t\tdef loadModel(str: String) : Option[" + elementType.getName + "] = {")
    pr.println("\t\t\t\tval xmlStream = XML.loadString(str)")
    pr.println("\t\t\t\tval document = NodeSeq fromSeq xmlStream")
    pr.println("\t\t\t\tdocument.headOption match {")
    pr.println("\t\t\t\t\t\tcase Some(rootNode) => Some(deserialize(rootNode))")
    pr.println("\t\t\t\t\t\tcase None => System.out.println(\"" + elementType.getName + "Loader::Noting at the containerRoot !\");None")
    pr.println("\t\t\t\t}")
    pr.println("\t\t}")

    pr.println("\t\tdef loadModel(file: File) : Option[" + elementType.getName + "] = {")
    pr.println("\t\t\t\tloadModel(new FileInputStream(file))")
    pr.println("\t\t}")


    pr.println("\t\tdef loadModel(is: InputStream) : Option[" + elementType.getName + "] = {")
    pr.println("\t\t\t\tval xmlStream = XML.load(is)")
    pr.println("\t\t\t\tval document = NodeSeq fromSeq xmlStream")
    pr.println("\t\t\t\tdocument.headOption match {")
    pr.println("\t\t\t\t\t\tcase Some(rootNode) => Some(deserialize(rootNode))")
    pr.println("\t\t\t\t\t\tcase None => System.out.println(\"" + elementType.getName + "Loader::Noting at the containerRoot !\");None")
    pr.println("\t\t\t\t}")
    pr.println("\t\t}")


  }


  private def generateDeserialize(pr: PrintWriter, context: String, rootContainerName: String, elementType: EClass) {

    var factory = modelingPackage.getName
    factory = factory.substring(0, 1).toUpperCase + factory.substring(1) + "Factory"

    pr.println("\t\tprivate def deserialize(rootNode: NodeSeq): ContainerRoot = {")
    pr.println("\t\t\t\tval context = new " + context)
    pr.println("\t\t\t\tcontext." + rootContainerName + " = " + factory + ".create" + elementType.getName)
    pr.println("\t\t\t\tcontext.xmiContent = rootNode")
    pr.println("\t\t\t\tcontext.map = Map[String, Any]()")
    pr.println("\t\t\t\tcontext.stats = Map[String, Int]()")

    pr.println("\t\t\t\tload" + elementType.getName + "(rootNode, context)")
    pr.println("\t\t\t\tresolveElements(rootNode, context)")
    pr.println("\t\t\t\tcontext." + rootContainerName)

    pr.println("\t\t}")
  }


  private def generateLoadElementsMethod(pr: PrintWriter, context : String, rootContainerName: String, elementType: EClass) {

    pr.println("\t\tprivate def load" + elementType.getName + "(rootNode: NodeSeq, context : " + context + ") {")
    pr.println("")
    elementType.getEAllContainments.foreach {
      ref =>
        pr.println("\t\t\t\tval " + ref.getName + " = load" + ref.getEReferenceType.getName + "(\"/\", rootNode, \"" + ref.getName + "\", context)")
        pr.println("\t\t\t\tcontext." + rootContainerName + ".set" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + ref.getName + ")")
        //        pr.println("\t\t\t\t" + ref.getName + ".foreach{e=>e.eContainer=" + context + "." + rootContainerName + " }")
        pr.println("")
    }
    pr.println("\t\t}")
  }

  private def generateResolveElementsMethod(pr: PrintWriter, context : String, elementType: EClass) {
    //val context = elementType.getName + "LoadContext"
    //val rootContainerName = elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1)
    pr.println("\t\tprivate def resolveElements(rootNode: NodeSeq, context : " + context + ") {")
    elementType.getEAllContainments.foreach {
      ref =>
        pr.println("\t\t\t\tresolve" + ref.getEReferenceType.getName + "(\"/\", rootNode, \"" + ref.getName + "\", context)")
    }
    pr.println("\t\t}")
  }

}