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


package org.kevoree.tools.ecore.kotlin.gencode.loader.xml

import org.eclipse.emf.ecore.{EReference, EEnum, EPackage, EClass}
import java.io.{PrintWriter, File}
import scala.collection.JavaConversions._
import org.kevoree.tools.ecore.kotlin.gencode.{ProcessorHelper, GenerationContext}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 29/09/11
 * Time: 17:24
 */

class BasicElementLoader(ctx: GenerationContext, elementType: EClass, context: String, modelingPackage: EPackage, modelPackage: String) {

  def generateLoader() {
    //Creation of the generation dir
    //ProcessorHelper.checkOrCreateFolder(genDir)
    //val file = new File(genDir + "/" + elementType.getName + "Loader.kt")



    if (!ctx.generatedLoaderFiles.contains(elementType.getName)) {
      ctx.generatedLoaderFiles.add(elementType.getName)
      //Does not override existing file. Should have been removed before if required.
      generateSubs(elementType)
      generateElementLoadingMethod(ctx.loaderPrintWriter)
    }

    /*
    pr.println("package " + genPackage + ";" )
    pr.println()
    pr.println("import " + modelPackage + ".*")
    pr.println("import " + genPackage.substring(0, genPackage.lastIndexOf(".")) + ".*")
    pr.println("import javax.xml.stream.XMLStreamConstants")

    pr.println()

    //Generates the Trait
    pr.print("trait " + elementType.getName + "Loader")
    if (subLoaders.size > 0) {
      var stringListSubLoaders = List[String]()
      subLoaders.foreach(sub => stringListSubLoaders = stringListSubLoaders ++ List(sub.getName + "Loader"))
      pr.println(stringListSubLoaders.mkString(" : ", ", ", " {"))
    } else {
      pr.println("{")
    }
    pr.println()

    pr.println("")
    pr.println("}")
    pr.flush()
    pr.close()
  }
    */
  }

  private def generateSubs(currentType: EClass): List[EClass] = {
    var listContainedElementsTypes = List[EClass]()

    val subTypes = currentType.getEAllContainments.collect{ case ref:EReference => ref.getEReferenceType} ++ ProcessorHelper.getAllConcreteSubTypes(elementType)

    subTypes.foreach {
      _type =>
        if (_type != currentType) {
          //avoid looping in self-containment
          if (!_type.isInterface && !_type.isAbstract) {
            //Generates loaders for simple elements
            val el = new BasicElementLoader(ctx, _type, context, modelingPackage, modelPackage)
            el.generateLoader()

          } else {
            val el = new InterfaceElementLoader(ctx, _type, context, modelingPackage, modelPackage)
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
    pr.println("private fun load" + elementType.getName + "Element(elementId: String, context : " + context + ") : " + ProcessorHelper.fqn(ctx, elementType) + " {")
    pr.println("")

    val ePackageName = elementType.getEPackage.getName
    val factory = ProcessorHelper.fqn(ctx, elementType.getEPackage) + "." + ePackageName.substring(0, 1).toUpperCase + ePackageName.substring(1) + "Factory"

    val references = elementType.getEAllReferences.filter(ref => !ref.isContainment)
    val concreteSubTypes = ProcessorHelper.getAllConcreteSubTypes(elementType)
    if(concreteSubTypes.size > 0) {

      pr.println("var xsiType : String? = null")
      pr.println("if(context.xmiReader.getAttributeCount() > " + (elementType.getEAllAttributes.size() + references.size) + ") { //loadSubType")
      pr.println("for(i in 0.rangeTo(context.xmiReader.getAttributeCount()-1)){")
      pr.println("val localName = context.xmiReader.getAttributeLocalName(i)")
      pr.println("val xsi = context.xmiReader.getAttributePrefix(i)")
      pr.println("if (localName == \"type\" && xsi==\"xsi\"){")
      pr.println("xsiType = context.xmiReader.getAttributeValue(i)")
      pr.println("break")
      pr.println("}") //END IF
      pr.println("}") //END FOR
      pr.println("}") //END IF
      pr.println("")
      pr.println("when(xsiType) {")
      val fqnPack = ProcessorHelper.fqn(elementType.getEPackage).replace(".","_")
      concreteSubTypes.foreach {
        concreteType =>
          pr.println("\"" + fqnPack + ":" + concreteType.getName + "\" -> {")
          pr.println("return load" + concreteType.getName + "Element(elementId,context)")
          pr.println("}") // END WHEN CASE
      }

      pr.println("null, \"" + fqnPack + ":" + elementType.getName + "\" -> {")
    }

    // DEFAULT BEHAVIOR
    if (elementType.getEAllContainments.size() > 0) {
      pr.println("val elementTagName = context.xmiReader.getLocalName()")
    }

    pr.println("val modelElem = context.factory.create" + elementType.getName + "()")

    pr.println("context.map.put(elementId, modelElem)")
    pr.println("if(debug){System.out.println(\"Stored:\" + elementId)}")
    pr.println("")

    if (elementType.getEAllAttributes.size() > 0 || references.size > 0) {

      pr.println("for(i in 0.rangeTo(context.xmiReader.getAttributeCount()-1)) {")
      pr.println("val prefix = context.xmiReader.getAttributePrefix(i)")
      pr.println("if(prefix==null || prefix.equals(\"\")) {")
      pr.println("val attrName = context.xmiReader.getAttributeLocalName(i)")
      pr.println("val valueAtt = context.xmiReader.getAttributeValue(i)")
      pr.println("if( valueAtt != null) {")
      pr.println("when(attrName){")
      pr.println("")
      elementType.getEAllAttributes.foreach {
        att =>

          val methName = "set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1)
          pr.println("\"" + att.getName + "\" -> {")
          //pr.println("val value = context.xmiReader?.getAttributeValue(i)")
          // pr.println("modelElem." + methName + "(" + ProcessorHelper.convertType(att.getEAttributeType.getInstanceClassName) + ".valueOf(value))")

          val FQattTypeName = ProcessorHelper.fqn(ctx,att.getEAttributeType)
          val attTypeName = ProcessorHelper.convertType(att.getEAttributeType)


          /*
                  if(attTypeName.equals("String")) {
                    pr.println("modelElem." + methName + "(valueAtt)")
                  } else {
                    pr.println("modelElem." + methName + "(valueAtt.to"+ attTypeName +"() as "+attTypeName+")")
                  }
           */

          if (att.getEAttributeType.isInstanceOf[EEnum]) {
            pr.println("modelElem." + methName + "(" + FQattTypeName + ".valueOf(valueAtt))")
          }
          else {
            val attTypeName = ProcessorHelper.convertType(att.getEAttributeType)
             attTypeName match {
              case "String" => {
                pr.println("modelElem." + methName + "(valueAtt)")
              }
              case "Boolean" | "Double" | "Int"  => {
                pr.println("modelElem." + methName + "(valueAtt.to"+attTypeName+"())")
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
          // if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          //    pr.println("case Some(s: " + ProcessorHelper.fqn(ctx,ref.getEReferenceType) + ") => modelElem." + methName + "(Some(s))")

          val ePackageName = ProcessorHelper.fqn(ref.getEReferenceType.getEPackage)

          //pr.println("modelElem." + methName + "(ref as "+ePackageName+"."+ref.getEReferenceType.getName+")")          //} else {
          pr.println("modelElem." + methName + "(ref as " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ")")

          //  pr.println("case Some(s: " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ") => modelElem." + methName + "(s)")
          // }
          pr.println("} else {")
          pr.println("context.resolvers.add({()->")
          pr.println("val " + ref.getName + "Ref = context.map.get(adjustedRef)")
          pr.println("if(" + ref.getName + "Ref != null) {")
          //if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {


          //pr.println("modelElem." + methName + "("+ref.getName+"Ref as "+ePackageName+"."+ref.getEReferenceType.getName+")")
          pr.println("modelElem." + methName + "(" + ref.getName + "Ref as " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ")")
          //} else {
          //  pr.println("case Some(s: " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ") => modelElem." + methName + "(s)")
          //}
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

    if (elementType.getEAllContainments.size() > 0) {
      pr.println("var done = false")
      pr.println("while(!done) {")
      pr.println("when(context.xmiReader.nextTag()){")
      pr.println("XMLStreamConstants.START_ELEMENT -> {")
      pr.println("when(context.xmiReader.getLocalName()){")
      pr.println("")

      elementType.getEAllContainments.foreach {
        refa =>
          pr.println("\"" + refa.getName + "\" -> {")

          val formattedReferenceName = refa.getName.substring(0, 1).toUpperCase + refa.getName.substring(1)

          //pr.println("val " + refa.getName + " = ")

          if (!refa.isMany) {
            pr.println("val " + refa.getName + "ElementId = elementId + \"/@" + refa.getName + "\"")
            //if (!refa.isRequired) {
            //  pr.println("modelElem.set" + formattedReferenceName + "(Some(load" + refa.getEReferenceType.getName + "Element(" + refa.getName + "ElementId, context)))")
            //} else {
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
      pr.println("if(context.xmiReader.getLocalName().equals(elementTagName)){done = true}")
      pr.println("}") //case END
      pr.println("else -> {}")
      pr.println("}") //Match
      pr.println("}") //while
      pr.println("")
    }
    pr.println("return modelElem")



    if(concreteSubTypes.size > 0) {
      pr.println("}") // END WHEN CASE

      pr.println("else -> {throw UnsupportedOperationException(\"Processor for "+elementType.getName+" has no mapping for type:\" + xsiType+ \" elementId:\" + elementId);}")
      pr.println("}") // END WHEN
      //pr.println("return loadedElement")
      //pr.println("}") //END IF
      //pr.println("}") // END FOR
      //pr.println("throw UnsupportedOperationException(\"Processor for "+elementType.getName+" was unable to load element id: \" + elementId);")
      //pr.println("} else { // This type")
    }

    pr.println("}") //END LOADING METHOD
  }

}
