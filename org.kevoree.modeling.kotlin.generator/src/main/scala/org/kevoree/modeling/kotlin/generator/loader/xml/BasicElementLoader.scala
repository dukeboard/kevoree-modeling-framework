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


package org.kevoree.modeling.kotlin.generator.loader.xml

import org.eclipse.emf.ecore.{EReference, EEnum, EClass}
import java.io.PrintWriter
import scala.collection.JavaConversions._
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 29/09/11
 * Time: 17:24
 */

class BasicElementLoader(ctx: GenerationContext, elementType: EClass) {

  def generateLoader() {
    if (!ctx.generatedLoaderFiles.contains(ProcessorHelper.fqn(ctx, elementType))) {
      ctx.generatedLoaderFiles.add(ProcessorHelper.fqn(ctx, elementType))
      //Does not override existing file. Should have been removed before if required.
      generateSubs(elementType)
      generateElementLoadingMethod(ctx.loaderPrintWriter)
    }

  }

  private def generateSubs(currentType: EClass): List[EClass] = {
    var listContainedElementsTypes = List[EClass]()

    val subTypes = currentType.getEAllContainments.collect {
      case ref: EReference => ref.getEReferenceType
    } ++ ProcessorHelper.getAllConcreteSubTypes(elementType)

    subTypes.foreach {
      _type =>
        if (_type != currentType) {
          //avoid looping in self-containment
          if (!_type.isInterface && !_type.isAbstract) {
            //Generates loaders for simple elements
            val el = new BasicElementLoader(ctx, _type)
            el.generateLoader()

          } else {
            val el = new InterfaceElementLoader(ctx, _type)
            el.generateLoader()
          }
          if (!listContainedElementsTypes.contains(_type)) {
            listContainedElementsTypes = listContainedElementsTypes ++ List(_type)
          }
        }
    }

    listContainedElementsTypes
  }


  private def generateElementLoadingMethod(pr: PrintWriter) {
    pr.println("private fun load" + elementType.getName + "Element(elementId2: String, context : LoadingContext) : " + ProcessorHelper.fqn(ctx, elementType) + " {")
    pr.println("var elementId: String = elementId2")

    val ePackageName = elementType.getEPackage.getName

    val references = elementType.getEAllReferences.filter(ref => !ref.isContainment)
    val concreteSubTypes = ProcessorHelper.getAllConcreteSubTypes(elementType)
    if (concreteSubTypes.size > 0) {

      pr.println("var xsiType : String? = null")
      pr.println("if(context.xmiReader!!.getAttributeCount() > " + (elementType.getEAllAttributes.size() + references.size) + ") { //loadSubType")
      pr.println("for(i in 0.rangeTo(context.xmiReader!!.getAttributeCount()-1)){")
      pr.println("val localName = context.xmiReader!!.getAttributeLocalName(i)")
      pr.println("val xsi = context.xmiReader!!.getAttributePrefix(i)")
      pr.println("if (localName == \"type\" && xsi==\"xsi\"){")
      pr.println("xsiType = context.xmiReader!!.getAttributeValue(i)")
      pr.println("break")
      pr.println("}") //END IF
      pr.println("}") //END FOR
      pr.println("}") //END IF
      pr.println("")
      pr.println("when {")
      concreteSubTypes.foreach {
        concreteType =>
          pr.println("(xsiType != null) && (xsiType.equals(\"" + ProcessorHelper.fqn(ctx, concreteType.getEPackage) + ":" + concreteType.getName + "\") || xsiType!!.endsWith(\"" + concreteType.getEPackage.getName.toLowerCase + ":" + concreteType.getName + "\")) -> {")

          pr.println("return load" + concreteType.getName + "Element(elementId,context)")
          pr.println("}") // END WHEN CASE
      }

      pr.println("xsiType == null || xsiType.equals(\"" + ProcessorHelper.fqn(ctx, elementType.getEPackage) + ":" + elementType.getName + "\") || xsiType!!.endsWith(\"" + elementType.getEPackage.getName.toLowerCase + ":" + elementType.getName + "\")-> {")
    }

    // DEFAULT BEHAVIOR
    if (elementType.getEAllContainments.size() > 0) {
      pr.println("val elementTagName = context.xmiReader!!.getLocalName()")
    }

    pr.println("val modelElem = mainFactory.get" + ePackageName.substring(0, 1).toUpperCase + ePackageName.substring(1) + "Factory()" + ".create" + elementType.getName + "()")

    pr.println("context.map.put(elementId, modelElem)")
    //TODO: REMOVE NEXT LiNE AFTER DEBUG
   // pr.println("if(debug){System.out.println(\"Stored:\" + elementId)}")


    pr.println("")


    def lookupWellFormedName(ec: EClass): Boolean = {
      var namedElement = false
      elementType.getEAnnotations.foreach {
        eAnot =>
          if (eAnot.getDetails.get("constraints") != null && eAnot.getDetails.get("constraints").contains("WellFormedName")) {
            namedElement = true
          }
      }
      if (!namedElement) {
        ec.getEAllSuperTypes.foreach {
          sT =>
            sT.getEAnnotations.foreach {
              eAnot =>
                if (eAnot.getDetails.get("constraints") != null && eAnot.getDetails.get("constraints").contains("WellFormedName")) {
                  namedElement = true
                }
            }
        }
      }
      namedElement
    }
    val namedElement = lookupWellFormedName(elementType)



    if (elementType.getEAllAttributes.size() > 0 || references.size > 0) {

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
          val FQattTypeName = ProcessorHelper.fqn(ctx, att.getEAttributeType)

          if (att.getEAttributeType.isInstanceOf[EEnum]) {
            pr.println("modelElem." + methName + "(" + FQattTypeName + ".valueOf(valueAtt))")
          }
          else {
            val attTypeName = ProcessorHelper.convertType(att.getEAttributeType)
            attTypeName match {
              case "String" => {
                pr.println("modelElem." + methName + "(unescapeXml(valueAtt))")
              }
              case "Boolean" | "Double" | "Int" => {
                pr.println("modelElem." + methName + "(valueAtt.to" + attTypeName + "())")
              }
              case "Any" => {
                pr.println("modelElem." + methName + "(valueAtt as " + attTypeName + ")")
              }
              case "Class<out jet.Any?>" => {
                //TODO do something :-) ObjectStream ?
                //pr.println("modelElem." + methName + "(valueAtt as " + attTypeName + ")")
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
          var mutatorType: String = ""

          if (ref.getUpperBound == 1) {
            mutatorType = "set"
          } else {
            mutatorType = "add"
          }
          val methName : String =  mutatorType + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)

          pr.println("\"" + ref.getName + "\" -> {")
          pr.println("for(xmiRef in valueAtt.split(\" \")) {")

          pr.println("var adjustedRef = if(xmiRef.startsWith(\"#\")){xmiRef.substring(1)}else{xmiRef}")
          pr.println("adjustedRef = if(adjustedRef.startsWith(\"//\")){\"/0\" + adjustedRef.substring(1)} else { adjustedRef}")

          if (ref.getEOpposite != null) {
            pr.println("if(!context.isOppositeAlreadySet(elementId,adjustedRef)) {")
            pr.println("context.storeOppositeRelation(elementId,adjustedRef)")
          }
          pr.println("val ref = context.map.get(adjustedRef)")
          pr.println("if( ref != null) {")
          pr.println("modelElem." + methName + "(ref as " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ")")
          pr.println("} else {")
          pr.println("context.resolvers.add(XMIResolveCommand(context, modelElem, \""+mutatorType+"\", \""+ref.getName+"\", adjustedRef))")
          pr.println("}") // Else

          if (ref.getEOpposite != null) {
            pr.println("}")
          }
          pr.println("}") // For
          pr.println("}") // Case
        // pr.println("}")
      }
      pr.println("else->{System.err.println(\"" + elementType.getName + ">>AttributeName not in cases:\" + attrName) }")
      pr.println("}") // when
      pr.println(" }") // if value att not null
      pr.println(" }") // if prefix != null
      pr.println(" }") // For


      //TODO check getName
      if (namedElement) {
        System.err.println("Warning NamedElement XMI compat !!! "+elementType.getName)
        pr.println("var WellNamedID = elementId.substring(0,elementId.lastIndexOf(\"/\")+1) + modelElem.getName()")
        pr.println("context.map.put(WellNamedID, modelElem)")
        pr.println("if(debug){System.out.println(\"Stored:\" + WellNamedID)}")

        pr.println("if(elementId != \"/0\"){elementId = WellNamedID}")

      }

      pr.println("")

    }

    if (elementType.getEAllContainments.size() > 0) {
      pr.println("var done = false")
      pr.println("while(!done) {")
      pr.println("when(context.xmiReader!!.nextTag()){")
      pr.println("XMLStreamConstants.START_ELEMENT -> {")
      pr.println("when(context.xmiReader!!.getLocalName()){")
      pr.println("")

      elementType.getEAllContainments.foreach {
        refa =>
          pr.println("\"" + refa.getName + "\" -> {")

          val formattedReferenceName = refa.getName.substring(0, 1).toUpperCase + refa.getName.substring(1)

          if (!refa.isMany) {

            pr.println("val " + refa.getName + "ElementId = elementId + \"/@" + refa.getName + "\"")

            pr.println("modelElem.set" + formattedReferenceName + "(load" + refa.getEReferenceType.getName + "Element(" + refa.getName + "ElementId, context))")
            //}
          } else {
            pr.println("val i = context.elementsCount.get(elementId + \"/@" + refa.getName + "\") ?: 0")
            pr.println("val " + refa.getName + "ElementId = elementId + \"/@" + refa.getName + ".\" + i")
            pr.println("modelElem.add" + formattedReferenceName + "(load" + refa.getEReferenceType.getName + "Element(" + refa.getName + "ElementId, context))")
            pr.println("context.elementsCount.put(elementId + \"/@" + refa.getName + "\",i+1)")
          }
          pr.println("}") //case
      }

      pr.println("")
      pr.println("else -> {}")
      pr.println("}") //Match
      pr.println("}") //Case Start
      pr.println("XMLStreamConstants.END_ELEMENT -> {")
      pr.println("if(context.xmiReader!!.getLocalName().equals(elementTagName)){done = true}")
      pr.println("}") //case END
      pr.println("else -> {}")
      pr.println("}") //Match
      pr.println("}") //while
      pr.println("")
    } else {
      pr.println("context.xmiReader!!.nextTag()")
    }
    pr.println("return (modelElem as " + ProcessorHelper.fqn(ctx, elementType) + ")")



    if (concreteSubTypes.size > 0) {
      pr.println("}") // END WHEN CASE

      pr.println("else -> {throw UnsupportedOperationException(\"Processor for " + elementType.getName + " has no mapping for type:\" + xsiType+ \" elementId:\" + elementId);}")
      pr.println("}") // END WHEN
    }

    pr.println("}") //END LOADING METHOD
  }

}
