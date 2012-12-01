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
import java.io.{PrintWriter, File}
import scala.collection.JavaConversions._
import org.kevoree.tools.ecore.gencode.{GenerationContext, ProcessorHelper}

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
    val file = new File(genDir + "/" + elementType.getName + "Loader.scala")

    if (!file.exists()) {
      //Does not override existing file. Should have been removed before if required.
      val subLoaders = generateSubs(elementType)
      val pr = new PrintWriter(file,"utf-8")
      pr.println("package " + genPackage )
      pr.println()
      pr.println("import xml.NodeSeq")
      pr.println("import " + modelPackage + "._")
      pr.println("import " + genPackage.substring(0, genPackage.lastIndexOf(".")) + "._")
      pr.println("import javax.xml.stream.XMLStreamConstants")

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
      generateElementLoadingMethod(pr)
      pr.println("")
      pr.println("}")
      pr.flush()
      pr.close()

      ProcessorHelper.formatScalaSource(file)

    }
  }

  private def generateSubs(currentType: EClass): List[EClass] = {
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

    listContainedElementsTypes
  }

  private def generateCollectionLoadingMethod(pr: PrintWriter) {
    pr.println("def load" + elementType.getName + "(parentId: String, parentNode: NodeSeq, refNameInParent : String, context : " + context + ") : scala.collection.mutable.ListBuffer[" + ProcessorHelper.fqn(ctx,elementType) + "] = {")
    pr.println("val loadedElements = new scala.collection.mutable.ListBuffer[" + ProcessorHelper.fqn(ctx,elementType) + "]()")
    pr.println("var i = 0")
    pr.println("val " + elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1) + "List = (parentNode \\\\ refNameInParent)") //\"" + elementNameInParent + "\")")
    pr.println("" + elementType.getName.substring(0, 1).toLowerCase + elementType.getName.substring(1) + "List.foreach { xmiElem =>")
    pr.println("loadedElements.append(load" + elementType.getName + "Element(parentId + \"/@\" + refNameInParent + \".\" + i,xmiElem,context))")
    pr.println("i += 1")
    pr.println("}")
    pr.println("loadedElements")
    pr.println("}")
  }

  private def generateElementLoadingMethod(pr: PrintWriter) {
    pr.println("def load" + elementType.getName + "Element(elementId: String, context : " + context + ") : " + ProcessorHelper.fqn(ctx,elementType) + " = {")
    pr.println("")

    val ePackageName = elementType.getEPackage.getName
    val factory = ProcessorHelper.fqn(ctx,elementType.getEPackage) + "." + ePackageName.substring(0, 1).toUpperCase + ePackageName.substring(1) + "Factory"

    pr.println("val elementTagName = context.xmiReader.getLocalName")
    pr.println("val modelElem = " + factory + ".create" + elementType.getName)
    pr.println("context.map += elementId -> modelElem")
    //pr.println("System.out.println(\"Stored:\" + elementId +\"->\"+ modelElem.class.getSimpleName)")
    pr.println("")

    elementType.getEAllAttributes.foreach { att =>
      val methName = "set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1)
      pr.println("val " + att.getName + "Val = context.xmiReader.getAttributeValue(null,\"" + att.getName + "\")")
      pr.println("if("+att.getName+"Val != null && !" + att.getName + "Val.equals(\"\")){")
      pr.println("modelElem." + methName + "(" + ProcessorHelper.convertType(att.getEAttributeType.getInstanceClassName) + ".valueOf(" + att.getName + "Val))")
      pr.println("}")
      pr.println("")
    }
    pr.println("")



    elementType.getEAllReferences.filter(ref => !ref.isContainment).foreach {
      ref =>
        pr.println("val " + ref.getName + "Val = context.xmiReader.getAttributeValue(null,\"" + ref.getName + "\")")
        pr.println("if("+ref.getName+"Val != null && !" + ref.getName + "Val.equals(\"\")){")

        pr.println(ref.getName+"Val.split(\" \").foreach{ xmiRef =>")
        pr.println("context.resolvers.append(()=>{")
        pr.println("context.map.get(xmiRef) match {")
        var methName: String = ""
        if (ref.getUpperBound == 1) {
          methName = "set"
        } else {
          methName = "add"
        }
        methName += ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
        if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          pr.println("case Some(s: " + ProcessorHelper.fqn(ctx,ref.getEReferenceType) + ") => modelElem." + methName + "(Some(s))")
        } else {
          pr.println("case Some(s: " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ") => modelElem." + methName + "(s)")
        }


        pr.println("case None => throw new Exception(\"KMF Load error : " + ref.getEReferenceType.getName + " not found in map ! xmiRef:\" + xmiRef)")
        pr.println("}")
        pr.println("})")
        pr.println("}")
        pr.println("}")
        pr.println("")
    }
    pr.println("")





    if(elementType.getEAllContainments.size() > 0) {
      pr.println("var done = false")
      pr.println("while(!done) {")
      pr.println("context.xmiReader.nextTag() match {")
      pr.println("case XMLStreamConstants.START_ELEMENT => {")
      pr.println("context.xmiReader.getLocalName match {")
      pr.println("")

      elementType.getEAllContainments.foreach {refa =>
        pr.println("case \""+refa.getName+"\" => {")

        val formattedReferenceName = refa.getName.substring(0, 1).toUpperCase + refa.getName.substring(1)

        //pr.println("val " + refa.getName + " = ")

        if(!refa.isMany) {
          pr.println("val " + refa.getName + "ElementId = elementId + \"/@" + refa.getName+"\"")
          if (!refa.isRequired) {
            pr.println("modelElem.set" + formattedReferenceName + "(Some(load" + refa.getEReferenceType.getName + "Element(" + refa.getName + "ElementId, context)))")
          } else {
            pr.println("modelElem.set" + formattedReferenceName + "(load" + refa.getEReferenceType.getName + "Element(" + refa.getName + "ElementId, context)))")
          }
        } else {
          pr.println("val i = context.elementsCount.getOrElse(elementId + \"/@" + refa.getName + "\",0)")
          pr.println("val " + refa.getName + "ElementId = elementId + \"/@" + refa.getName + ".\" + i")
          pr.println("modelElem.add" + formattedReferenceName + "(load" + refa.getEReferenceType.getName + "Element(" + refa.getName + "ElementId, context))")
          pr.println("context.elementsCount.update(elementId + \"/@" + refa.getName + "\",i+1)")
        }

        pr.println("}") //case
      }

      pr.println("")
      pr.println("}")//Match
      pr.println("}")//Case Start
      pr.println("case XMLStreamConstants.END_ELEMENT => {")
      pr.println("if(context.xmiReader.getLocalName.equals(elementTagName)){done = true}")
      pr.println("}") //case END
      pr.println("}")//Match
      pr.println("}")//while
      pr.println("")
    }
    pr.println("modelElem")
    pr.println("}")
  }

}
