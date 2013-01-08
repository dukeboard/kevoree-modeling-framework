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


package org.kevoree.tools.ecore.kotlin.gencode.loader.xpath

import org.eclipse.emf.ecore.{EPackage, EClass}
import java.io.{PrintWriter, File}
import scala.collection.JavaConversions._
import org.kevoree.tools.ecore.kotlin.gencode.{GenerationContext, ProcessorHelper}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 29/09/11
 * Time: 17:24
 */

class BasicElementLoader(ctx : GenerationContext, genDir: String, genPackage: String, elementType: EClass, context: String, modelingPackage: EPackage, modelPackage: String) {

  def generateLoader() {
    //Creation of the generation dir
    ProcessorHelper.checkOrCreateFolder(genDir)
    val file = new File(genDir + "/" + elementType.getName + "Loader.kt")

    if (!file.exists()) {
      //Does not override existing file. Should have been removed before if required.
      val subLoaders = generateSubs(elementType)
      val pr = new PrintWriter(file,"utf-8")
      pr.println("package " + genPackage + ";")
      pr.println()
      pr.println("import xml.NodeSeq")
      pr.println("import scala.collection.JavaConversions._")
      //Import parent package (org.kevoree.sub => org.kevoree._)
      pr.println("import " + modelPackage + "._")
      pr.println("import " + genPackage.substring(0, genPackage.lastIndexOf(".")) + "._")
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

      pr.println()
      generateCollectionLoadingMethod(pr)
      pr.println("")
      generateElementLoadingMethod(pr)
      pr.println("")
      generateCollectionResolutionMethod(pr)
      pr.println("")
      generateElementResolutionMethod(pr)
      pr.println("")
      pr.println("}")
      pr.flush()
      pr.close()

    }
  }

  private def generateSubs(currentType: EClass): List[EClass] = {
    //var factory = genPackage.substring(genPackage.lastIndexOf(".") + 1)
    //factory = factory.substring(0, 1).toUpperCase + factory.substring(1) + "Package"
    //modelingPackage.getEClassifiers.filter(cl => !cl.equals(elementType)).foreach{ ref =>

    var listContainedElementsTypes = List[EClass]()

    currentType.getEAllContainments.foreach {
      ref =>
        if(ref.getEReferenceType != currentType) { //avoid looping in self-containment
        if (!ref.getEReferenceType.isInterface) {
          //Generates loaders for simple elements
          val el = new BasicElementLoader(ctx, genDir, genPackage, ref.getEReferenceType, context, modelingPackage, modelPackage)
          el.generateLoader()

        } else {
          //System.out.println("ReferenceType of " + ref.getName + " is an interface. Not supported yet.")
          val el = new InterfaceElementLoader(ctx, genDir + "/sub/", genPackage + ".sub", ref.getEReferenceType, context, modelingPackage, modelPackage)
          el.generateLoader()
        }
        if (!listContainedElementsTypes.contains(ref.getEReferenceType)) {
          listContainedElementsTypes = listContainedElementsTypes ++ List(ref.getEReferenceType)
        }
        }
    }

    //System.out.print(currentType.getName + " Uses:{")
    //listContainedElementsTypes.foreach(elem => System.out.print(elem.getName + ","))
    //System.out.println()
    listContainedElementsTypes
  }

  private def generateCollectionLoadingMethod(pr: PrintWriter) {
    pr.println("\t\tdef load" + elementType.getName + "(parentId: String, parentNode: NodeSeq, refNameInParent : String, context : " + context + ") : scala.collection.mutable.ListBuffer[" + ProcessorHelper.fqn(ctx,elementType) + "] = {")
    pr.println("\t\t\t\tval loadedElements = new scala.collection.mutable.ListBuffer[" + ProcessorHelper.fqn(ctx,elementType) + "]()")
    pr.println("\t\t\t\tvar i = 0")
    pr.println("\t\t\t\tval " + elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1) + "List = (parentNode \\\\ refNameInParent)") //\"" + elementNameInParent + "\")")
    pr.println("\t\t\t\t" + elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1) + "List.foreach { xmiElem =>")
    //pr.println("\t\t\t\t\t\tval currentElementId = parentId + \"/@\" + refNameInParent + \".\" + i")
    //pr.println("\t\t\t\t\t\tloadedElements.append(load" + elementType.getName + "Element(currentElementId,xmiElem,context))")
    pr.println("\t\t\t\t\t\tloadedElements.append(load" + elementType.getName + "Element(parentId + \"/@\" + refNameInParent + \".\" + i,xmiElem,context))")
    pr.println("\t\t\t\t\t\ti += 1")
    pr.println("\t\t\t\t}")
    pr.println("\t\t\t\tloadedElements")
    pr.println("\t\t}")
  }

  private def generateElementLoadingMethod(pr: PrintWriter) {
    pr.println("\t\tdef load" + elementType.getName + "Element(elementId: String, elementNode: NodeSeq, context : " + context + ") : " + ProcessorHelper.fqn(ctx,elementType) + " = {")
    pr.println("\t\t")

    val ePackageName = elementType.getEPackage.getName
    val factory = ProcessorHelper.fqn(ctx,elementType.getEPackage) + "." + ePackageName.substring(0, 1).toUpperCase + ePackageName.substring(1) + "Factory"

    pr.println("\t\t\t\tval modelElem = " + factory + ".create" + elementType.getName)
    pr.println("\t\t\t\tcontext.map += elementId -> modelElem")
    pr.println("")
    elementType.getEAllContainments.foreach {
      ref =>

        if (ref.getUpperBound == 1) {
          pr.println("\t\t\t\t(elementNode \\ \"" + ref.getName + "\").headOption.map{head =>")
          pr.println("\t\t\t\t\t\tval " + ref.getName + "ElementId = elementId + \"/@" + ref.getName + "\"")
          pr.println("\t\t\t\t\t\tval " + ref.getName + " = load" + ref.getEReferenceType.getName + "Element(" + ref.getName + "ElementId, head,context)")
           if(ref.getLowerBound == 0){
             pr.println("\t\t\t\t\t\tmodelElem.set" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(Some(" + ref.getName + "))")

           } else {
             pr.println("\t\t\t\t\t\tmodelElem.set" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + ref.getName + ")")
           }

          //          pr.println("\t\t\t\t\t\t" + ref.getName + ".eContainer = modelElem")
          pr.println("\t\t\t\t}")
        } else {
          pr.println("\t\t\t\tval " + ref.getName + " = load" + ref.getEReferenceType.getName + "(elementId, elementNode, \"" + ref.getName + "\", context)")
          pr.println("\t\t\t\tmodelElem.set" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + ref.getName + ".toList)")
          //         pr.println("\t\t\t\t" + ref.getName + ".foreach{ e => e.eContainer = modelElem }")
        }
        pr.println("")
    }
    pr.println("\t\t\t\tmodelElem")
    pr.println("\t\t}")
  }


  private def generateCollectionResolutionMethod(pr: PrintWriter) {
    pr.println("\t\tdef resolve" + elementType.getName + "(parentId: String, parentNode: NodeSeq, refNameInParent : String, context : " + context + ") {")
    pr.println("\t\t\t\tvar i = 0")
    pr.println("\t\t\t\tval " + elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1) + "List = (parentNode \\\\ refNameInParent)") //\"" + elementNameInParent + "\")")
    pr.println("\t\t\t\t" + elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1) + "List.foreach { xmiElem =>")
    //pr.println("\t\t\t\t\t\tval currentElementId = parentId + \"/@\" + refNameInParent + \".\" + i")
    //pr.println("\t\t\t\t\t\tresolve" + elementType.getName + "Element(currentElementId,xmiElem,context)")
    pr.println("\t\t\t\t\t\tresolve" + elementType.getName + "Element(parentId + \"/@\" + refNameInParent + \".\" + i,xmiElem,context)")
    pr.println("\t\t\t\t\t\ti += 1")
    pr.println("\t\t\t\t}")
    pr.println("\t\t}")
  }


  private def generateElementResolutionMethod(pr: PrintWriter) {
    pr.println("\t\tdef resolve" + elementType.getName + "Element(elementId: String, elementNode: NodeSeq, context : " + context + ") {")
    pr.println("")
    pr.println("\t\t\t\tval modelElem = context.map(elementId).asInstanceOf[" + ProcessorHelper.fqn(ctx,elementType) + "]")
    pr.println("")
    elementType.getEAllAttributes.foreach {
      att =>
        val methName = "set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1)
        pr.println("\t\t\t\tval " + att.getName + "Val = (elementNode \\ \"@" + att.getName + "\").text")
        pr.println("\t\t\t\tif(!" + att.getName + "Val.equals(\"\")){")
        pr.println("\t\t\t\t\t\tmodelElem." + methName + "(" + ProcessorHelper.convertType(att.getEAttributeType.getInstanceClassName) + ".valueOf(" + att.getName + "Val))")
        pr.println("\t\t\t\t}")
        pr.println("")
    }
    pr.println("")

    elementType.getEAllContainments.foreach {
      ref =>
        if (ref.getUpperBound == 1) {
          pr.println("\t\t\t\t(elementNode \\ \"" + ref.getName + "\").headOption.map{head => ")
          pr.println("\t\t\t\t\t\tresolve" + ref.getEReferenceType.getName + "Element(elementId + \"/@" + ref.getName + "\", head, context)")
          pr.println("\t\t\t\t}")
        } else {
          pr.println("\t\t\t\tresolve" + ref.getEReferenceType.getName + "(elementId, elementNode, \"" + ref.getName + "\", context)")
        }
        pr.println("")
    }


    elementType.getEAllReferences.filter(ref => !elementType.getEAllContainments.contains(ref)).foreach {
      ref =>
        pr.println("\t\t\t\t(elementNode \\ \"@" + ref.getName + "\").headOption match {")
        pr.println("\t\t\t\t\t\tcase Some(head) => {")
        pr.println("\t\t\t\t\t\t\t\thead.text.split(\" \").foreach {")
        pr.println("\t\t\t\t\t\t\t\t\t\txmiRef =>")
        pr.println("\t\t\t\t\t\t\t\t\t\t\t\tcontext.map.get(xmiRef) match {")
        var methName: String = ""
        if (ref.getUpperBound == 1) {
          methName = "set"
        } else {
          methName = "add"
        }
        methName += ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
        if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          pr.println("\t\t\t\t\t\t\t\t\t\t\t\t\t\tcase Some(s: " + ProcessorHelper.fqn(ctx,ref.getEReferenceType) + ") => modelElem." + methName + "(Some(s))")
        } else {
          pr.println("\t\t\t\t\t\t\t\t\t\t\t\t\t\tcase Some(s: " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ") => modelElem." + methName + "(s)")
        }


        pr.println("\t\t\t\t\t\t\t\t\t\t\t\t\t\tcase None => throw new Exception(\"KMF Load error : " + ref.getEReferenceType.getName + " not found in map ! xmiRef:\" + xmiRef)")
        pr.println("\t\t\t\t\t\t\t\t\t\t\t\t}")
        pr.println("\t\t\t\t\t\t\t\t\t\t}")
        pr.println("\t\t\t\t\t\t\t\t}")
        pr.println("\t\t\t\t\t\tcase None => //No subtype for this library")
        pr.println("\t\t\t\t}")
    }

    pr.println("\t\t}")
  }

}