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
package org.kevoree.tools.ecore.kotlin.gencode.model

import java.io.PrintWriter
import org.eclipse.emf.ecore.EClass
import org.kevoree.tools.ecore.kotlin.gencode.{ProcessorHelper, GenerationContext}
import org.kevoree.tools.ecore.kotlin.gencode.ProcessorHelper._
import scala.collection.JavaConversions._


/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/02/13
 * Time: 19:09
 */
trait KMFQLFinder {

  def hasID(cls: EClass): Boolean

  def hasFindByIDMethod(cls: EClass): Boolean


  def generateKMFQLMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String) {
    if (hasID(cls)) {
      if (cls.getEAllSuperTypes.exists(st => hasID(st))) {
        pr.print("override ")
      }
      pr.println("fun internalGetKey() : String {")
      var first = true
      cls.getEAllAttributes.filter(att => att.isID).foreach {
        att =>
          if (!first) {
            pr.print("+\"/\"+")
          }
          pr.print("return get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "()")
          first = false
      }
      pr.println("}")

      pr.println("override fun path() : String? {")
      pr.println("return (eContainer() as " + ctx.getKevoreeContainerImplFQN + ").internalGetQuery(internalGetKey())")
      pr.println("}")
    } else {

      if (!cls.getEAllSuperTypes.exists(st => hasID(st))) {
        pr.println("override fun path() : String? {")
        pr.println("return null")
        pr.println("}")
      }


    }


    //GENERATE findByID methods
    var generateReflexifMapper = false
    cls.getEReferences.foreach(ref => {
      if (hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)) {
        generateReflexifMapper = true
        pr.println("override fun find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(key : String) : " + protectReservedWords(ProcessorHelper.fqn(ctx, ref.getEReferenceType)) + "? {")
        pr.println("return " + protectReservedWords("_" + ref.getName) + ".get(key)")
        pr.println("}")
      }
    })
    if (generateReflexifMapper) {
      pr.println("override fun internalGetQuery(selfKey : String) : String? {")
      pr.println("var res : Any? = null")


      cls.getEAllReferences.foreach(ref => {
        if (hasID(ref.getEReferenceType)) {
          if (ref.getUpperBound == 1) {
            val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Internal"
            if (ref.getLowerBound == 0) {

              pr.println("if(get" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "() != null && (get" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "() as " + refInternalClassFqn + ").internalGetKey() == selfKey){")
              if (hasID(cls)) {
                pr.println("return (eContainer() as " + ctx.getKevoreeContainerImplFQN + ").internalGetQuery(internalGetKey())+\"/" + ref.getName + "[\"+selfKey+\"]\"")
              } else {
                pr.println("return \"" + ref.getName + "[\"+selfKey+\"]\"")
              }
              pr.println("}")
            } else {
              pr.println("if(get" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "() != null && (get" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "() as " + refInternalClassFqn + ").internalGetKey() == selfKey){")
              if (hasID(cls)) {
                pr.println("return (eContainer() as " + ctx.getKevoreeContainerImplFQN + ").internalGetQuery(internalGetKey())+\"/" + ref.getName + "[\"+selfKey+\"]\"")
              } else {
                pr.println("return \"" + ref.getName + "[\"+selfKey+\"]\"")
              }
              pr.println("}")
            }
          } else {
            //MANY
            pr.println("res = find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(selfKey)")
            pr.println("if(res != null){")
            if (hasID(cls)) {
              pr.println("return (eContainer() as " + ctx.getKevoreeContainerImplFQN + ").internalGetQuery(internalGetKey())+\"/" + ref.getName + "[\"+selfKey+\"]\"")
            } else {
              pr.println("return \"" + ref.getName + "[\"+selfKey+\"]\"")
            }
            pr.println("}")
          }
        }
      })
      pr.println("return null")
      pr.println("}")

      pr.print("override fun ")
      pr.println("findByPath<A>(query : String, clazz : Class<A>) : A? {")
      pr.println("try {")
      pr.println("val res= findByPath(query)")
      pr.println("if(res != null){return (res as A)} else {return (null)}")
      pr.println("}catch(e:Exception){")
      pr.println("return (null)")
      pr.println("}")
      pr.println("}")

      pr.print("override fun ")
      pr.println("findByPath(query : String) : Any? {")
      pr.println("val firstSepIndex = query.indexOf('[')")
      pr.println("var queryID = \"\"")
      pr.println("var extraReadChar = 2")

      val optionalRelationShipNameGen = cls.getEAllReferences.filter(ref => hasID(ref.getEReferenceType) /*&& (ref.getUpperBound == -1 || ref.getLowerBound > 1)*/).size == 1
      if (optionalRelationShipNameGen) {
        //Optional relationship definition
        val relationShipOptionalName = cls.getEAllReferences.filter(ref => hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)).get(0).getName
        pr.println("val relationName = \"" + relationShipOptionalName + "\"")
        pr.println("val optionalDetected = ( firstSepIndex != " + relationShipOptionalName.size + " )")
        pr.println("if(optionalDetected){ extraReadChar = extraReadChar - 2 }")
      } else {
        pr.println("val relationName = query.substring(0,query.indexOf('['))")
      }

      if (optionalRelationShipNameGen) {
        pr.println("if(query.indexOf('{') == 0){")
      } else {
        pr.println("if(query.indexOf('{') == firstSepIndex +1){")
      }

      pr.println("queryID = query.substring(query.indexOf('{')+1,query.indexOf('}'))")
      pr.println("extraReadChar = extraReadChar + 2")
      pr.println("} else {") //Normal case

      if (optionalRelationShipNameGen) {
        pr.println("if(optionalDetected){")

        pr.println("if(query.indexOf('/') != - 1){")
        pr.println("queryID = query.substring(0,query.indexOf('/'))")
        pr.println("} else {")
        pr.println("queryID = query.substring(0,query.size)")
        //pr.println("extraReadChar = extraReadChar - 1")
        pr.println("}")

        pr.println("} else {")
        pr.println("queryID = query.substring(query.indexOf('[')+1,query.indexOf(']'))")
        pr.println("}")
      } else {
        pr.println("queryID = query.substring(query.indexOf('[')+1,query.indexOf(']'))")
      }

      pr.println("}")

      if (optionalRelationShipNameGen) {
        pr.println("var subquery = query.substring((if(optionalDetected){0} else {relationName.size})+queryID.size+extraReadChar,query.size)")
      } else {
        pr.println("var subquery = query.substring(relationName.size+queryID.size+extraReadChar,query.size)")
      }
      pr.println("if (subquery.indexOf('/') != -1){")
      pr.println("subquery = subquery.substring(subquery.indexOf('/')+1,subquery.size)")
      pr.println("}")
      pr.println("return when(relationName) {")
      cls.getEAllReferences.foreach(ref => {
        if (hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)) {
          pr.println("\"" + ref.getName + "\" -> {")
          pr.println("val objFound = find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(queryID)")
          pr.println("if(subquery != \"\" && objFound != null){")
          if (hasFindByIDMethod(ref.getEReferenceType)) {
            pr.println("objFound.findByPath(subquery)")
          } else {
            pr.println("throw Exception(\"KMFQL : rejected sucessor\")")
          }
          pr.println("} else {objFound}")
          pr.println("}")

        }
        if (hasID(ref.getEReferenceType) && (ref.getUpperBound == 1) && (ref.getLowerBound == 1)) {
          pr.println("\"" + ref.getName + "\" -> {")
          pr.println("get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "()")
          pr.println("}")
        }
        if (hasID(ref.getEReferenceType) && (ref.getUpperBound == 1) && (ref.getLowerBound == 0)) {
          pr.println("\"" + ref.getName + "\" -> {")
          pr.println("get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "()")
          pr.println("}")
        }
      })
      pr.println("else -> {}")
      pr.println("}")
      pr.println("}")
    } else {


      val superTypes = cls.getESuperTypes.toSet
      if (superTypes.size > 0) {
        pr.println()
        pr.println("override fun internalGetQuery(selfKey : String) : String? {")
        pr.println("var subResult : String? = null")
        superTypes.foreach(superType => {

          val ePackageName = ProcessorHelper.fqn(ctx, superType.getEPackage)
          pr.println("subResult = super<" + ePackageName+".impl."+superType.getName + "Internal>.internalGetQuery(selfKey)")
          pr.println("if(subResult!=null){")
          pr.println("  return subResult")
          pr.println("}")
        })
        pr.println("return null")
        pr.println("}")
        pr.println("")
      }


      if (!cls.getEAllSuperTypes.exists(st => hasID(st))) {
        pr.println("override fun findByPath<A>(query : String, clazz : Class<A>) : A? {return null}")
        pr.println("override fun findByPath(query : String) : Any? {return null}")
      }


    }
  }


}
