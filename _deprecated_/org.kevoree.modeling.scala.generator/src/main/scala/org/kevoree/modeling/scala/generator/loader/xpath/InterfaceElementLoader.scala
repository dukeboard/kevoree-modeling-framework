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


package org.kevoree.modeling.scala.generator.loader.xpath

import org.eclipse.emf.ecore.{EPackage, EClass}
import java.io.{PrintWriter, File}
import org.kevoree.modeling.scala.generator.{GenerationContext, ProcessorHelper}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 29/09/11
 * Time: 17:53
 */

class InterfaceElementLoader(ctx : GenerationContext, genDir: String, genPackage: String, elementType: EClass, context: String, modelingPackage: EPackage, modelPackage : String) {


  def generateLoader() {

    //Creation of the generation dir
    ProcessorHelper.checkOrCreateFolder(genDir)
    val file = new File(genDir + "/" + elementType.getName + "Loader.scala")

    if (!file.exists()) { //Does not override existing file. Should have been removed before if required.
      //System.out.println("Generation of loader for " + elementType.getName)
      val subLoaders = generateSubs()

      val pr = new PrintWriter(file,"utf-8")
      //System.out.println("Classifier class:" + cls.getClass)

      pr.println("package " + genPackage + ";")
      pr.println()
      pr.println("import xml.NodeSeq")
      pr.println("import scala.collection.JavaConversions._")
      //Import parent package (org.kevoree.sub => org.kevoree._)
      pr.println("import " + modelPackage + "._")
      pr.println("import " + genPackage.substring(0,genPackage.lastIndexOf(".")) + "._")
      pr.println()

      //Generates the Trait
      pr.print("trait " + elementType.getName + "Loader")
      if (subLoaders.size > 0) {
        var stringListSubLoaders = List[String]()
        subLoaders.foreach(sub => stringListSubLoaders = stringListSubLoaders ++ List(sub.getName + "Loader"))
        pr.println(stringListSubLoaders.mkString(" extends ", " with ", " {"))
      } else {
        pr.println("{")
      }

      pr.println("")

      generateLoadingMethod(pr)
      pr.println("")
      generateResolvingMethod(pr)
      pr.println("")
      pr.println("}")

      pr.flush()
      pr.close()

    }
  }


  private def generateSubs(): List[EClass] = {

    var listContainedElementsTypes = List[EClass]()
    ProcessorHelper.getAllConcreteSubTypes(elementType).foreach {
      concreteType =>
        if (!concreteType.isInterface) {
          val el = new BasicElementLoader(ctx, genDir, genPackage, concreteType, context, modelingPackage,modelPackage)
          el.generateLoader()
        } else {
          //System.out.println("ReferenceType of " + ref.getName + " is an interface. Not supported yet.")
          val el = new InterfaceElementLoader(ctx, genDir, genPackage, concreteType, context, modelingPackage,modelPackage)
          el.generateLoader()
        }
        if (!listContainedElementsTypes.contains(concreteType)) {
          listContainedElementsTypes = listContainedElementsTypes ++ List(concreteType)
        }
    }
   // System.out.print(elementType.getName + " Uses:{")
   // listContainedElementsTypes.foreach(elem => System.out.print(elem.getName + ","))
   // System.out.println()
    listContainedElementsTypes
  }

  private def generateLoadingMethod(pr: PrintWriter) {
    pr.println("\t\tdef load" + elementType.getName + "(parentId : String, parentNode : NodeSeq, refNameInParent : String, context : " + context + ") : scala.collection.mutable.ListBuffer[" + ProcessorHelper.fqn(ctx,elementType) + "] = {")
    pr.println("\t\t\t\tval loadedElements = new scala.collection.mutable.ListBuffer[" + ProcessorHelper.fqn(ctx,elementType) + "]()")
    pr.println("\t\t\t\tvar i = 0")
    pr.println("\t\t\t\tval " + elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1) + "List = (parentNode \\\\ refNameInParent)") //\"" + elementNameInParent + "\")")
    pr.println("\t\t\t\t" + elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1) + "List.foreach { xmiElem =>")
    pr.println("\t\t\t\tval currentElementId = parentId + \"/@\" + refNameInParent + \".\" + i")
    pr.println("\t\t\t\t\t\txmiElem.attributes.find(att => att.key.equals(\"type\")) match {")
    pr.println("\t\t\t\t\t\t\t\tcase Some(s) => {")
    pr.println("\t\t\t\t\t\t\t\t\t\t\t\ts.value.text match {")
    ProcessorHelper.getAllConcreteSubTypes(elementType).foreach {
      concreteType =>
        pr.println("\t\t\t\t\t\t\t\t\t\t\t\tcase \"" + modelingPackage.getName + ":" + concreteType.getName + "\" => {")
        pr.println("\t\t\t\t\t\t\t\t\t\t\t\t\t\tloadedElements.append(load" + concreteType.getName + "Element(currentElementId,xmiElem,context))")
        pr.println("\t\t\t\t\t\t\t\t\t\t\t\t\t}")
    }
    pr.println("\t\t\t\t\t\t\t\t\t\t\t\tcase _@e => throw new UnsupportedOperationException(\"Processor for TypeDefinitions has no mapping for type:\" + e)")
    pr.println("\t\t\t\t\t\t\t\t\t\t}")
    pr.println("\t\t\t\t\t\t\t\t}")
    pr.println("\t\t\t\t\t\t\t\tcase None => System.out.println(\"No 'type' attribute.\")")
    pr.println("\t\t\t\t\t\t}")

    pr.println("\t\t\t\t\t\ti += 1")
    pr.println("\t\t\t\t}")
    pr.println("\t\t\t\tloadedElements")
    pr.println("\t\t}")
  }

  private def generateResolvingMethod(pr: PrintWriter) {
    pr.println("\t\tdef resolve" + elementType.getName + "(parentId : String, parentNode : NodeSeq, refNameInParent : String, context : " + context + ") {")
    pr.println("\t\t\t\tvar i = 0")
    pr.println("\t\t\t\tval " + elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1) + "List = (parentNode \\\\ refNameInParent)") //\"" + elementNameInParent + "\")")
    pr.println("\t\t\t\t" + elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1) + "List.foreach { xmiElem =>")
    pr.println("\t\t\t\t\t\tval currentElementId = parentId + \"/@\" + refNameInParent + \".\" + i")
    pr.println("\t\t\t\t\t\txmiElem.attributes.find(att => att.key.equals(\"type\")) match {")
    pr.println("\t\t\t\t\t\t\t\t\t\tcase Some(s) => {")
    pr.println("\t\t\t\t\t\t\t\t\t\t\t\ts.value.text match {")
    ProcessorHelper.getAllConcreteSubTypes(elementType).foreach {
      concreteType =>
        pr.println("\t\t\t\t\t\t\t\t\t\t\t\tcase \"" + modelingPackage.getName + ":" + concreteType.getName + "\" => {")
        pr.println("\t\t\t\t\t\t\t\t\t\t\t\t\t\tresolve" + concreteType.getName + "Element(currentElementId,xmiElem,context)")
        pr.println("\t\t\t\t\t\t\t\t\t\t\t\t\t}")
    }
    pr.println("\t\t\t\t\t\t\t\t\t\t\t\tcase _@e => throw new UnsupportedOperationException(\"Processor for TypeDefinitions has no mapping for type:\" + e)")
    pr.println("\t\t\t\t\t\t\t\t\t\t}")
    pr.println("\t\t\t\t\t\t\t\t}")
    pr.println("\t\t\t\t\t\t\t\tcase None => System.out.println(\"No 'type' attribute.\")")
    pr.println("\t\t\t\t\t\t}")
    pr.println("\t\t\t\t\t\ti += 1")
    pr.println("\t\t\t\t}")
    pr.println("\t\t}")
  }

}