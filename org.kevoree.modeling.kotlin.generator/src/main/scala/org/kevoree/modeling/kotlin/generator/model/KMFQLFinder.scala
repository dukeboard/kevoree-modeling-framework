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
package org.kevoree.modeling.kotlin.generator.model

import java.io.PrintWriter
import org.eclipse.emf.ecore.EClass
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}
import org.kevoree.modeling.kotlin.generator.ProcessorHelper._
import scala.collection.JavaConversions._


/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/02/13
 * Time: 19:09
 */
trait KMFQLFinder {

  def generateKMFQLMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String) {
    pr.println("override fun internalGetKey() : String? {")
    var first = true
    pr.print("return ")
    val idAttributes = cls.getEAllAttributes.filter(att => att.isID && !att.getName.equals("generated_KMF_ID"))

    if (idAttributes.size > 0) {
      //gets all IDs
      idAttributes.sortWith {
        (att1, att2) => att1.getName.toLowerCase < att2.getName.toLowerCase
      } //order alphabetically
        .foreach {
        att =>
          if (!first) {
            pr.print("+\"/\"+")
          }
          pr.print(" " + protectReservedWords(att.getName))
          first = false
      }
    } else {
      pr.print(" generated_KMF_ID")
    }

    pr.println()
    pr.println("}")
    pr.println("override fun path() : String? {")
    pr.println("val container = eContainer()")
    pr.println("if(container != null) {")
    pr.println("val parentPath = container.path()")
    pr.println("if(parentPath== null){return null} else {")
    pr.println("return  if(parentPath == \"\"){\"\"}else{parentPath + \"/\"} + internal_containmentRefName + \"[\"+internalGetKey()+\"]\"")
    pr.println("}")
    pr.println("} else {")
    pr.println("return \"\"")
    pr.println("}")
    pr.println("}")


    //GENERATE findByID methods
    var generateReflexifMapper = false
    cls.getEAllReferences.foreach(ref => {
      if (ref.isMany) {
        generateReflexifMapper = true
        pr.println("override fun find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(key : String?) : " + protectReservedWords(ProcessorHelper.fqn(ctx, ref.getEReferenceType)) + "? {")
        pr.println("return " + "_" + ref.getName + ".get(key)")
        pr.println("}")
      }
    })



    if (generateReflexifMapper || cls.getEAllSuperTypes.filter(st => st.getEAllReferences.exists(ref => ref.isMany)).size > 2) {
      generateFindByPathMethods(ctx, cls, pr)
    } else {
      if (!ctx.getJS()) {
        pr.println("override fun findByPath<A>(query : String, clazz : Class<A>) : A? {return null}")
      }
      pr.println("override fun findByPath(query : String) : Any? {return null}")
    }
  }

  def generateFindByPathMethods(ctx: GenerationContext, cls: EClass, pr: PrintWriter) {

    if (!ctx.getJS()) {
      pr.print("override fun ")
      pr.println("findByPath<A>(query : String, clazz : Class<A>) : A? {")
      pr.println("try {")
      pr.println("val res= findByPath(query)")
      pr.println("if(res != null){return res as A} else {return null}")
      pr.println("}catch(e:Exception){")
      pr.println("return null")
      pr.println("}")
      pr.println("}")
    }



    pr.print("override fun ")
    pr.println("findByPath(query : String) : Any? {")
    pr.println("val firstSepIndex = query.indexOf('[')")
    pr.println("var queryID = \"\"")
    pr.println("var extraReadChar = 2")

    val optionalRelationShipNameGen = cls.getEAllReferences.size == 1
    if (optionalRelationShipNameGen) {
      //Optional relationship definition
      val relationShipOptionalName = cls.getEAllReferences.get(0).getName
      pr.println("val relationName = " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + relationShipOptionalName)
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
      if (ref.isMany) {
        pr.println(ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + " -> {")
        pr.println("val objFound = find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(queryID)")
        pr.println("if(subquery != \"\" && objFound != null){")
        pr.println("objFound.findByPath(subquery)")
        pr.println("} else {objFound}")
        pr.println("}")

      }
      if (ref.getUpperBound == 1) {
        pr.println(ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + " -> {")
        pr.println("if(subquery != \"\"){")
        pr.println("var obj = " + ProcessorHelper.protectReservedWords(ref.getName))
        pr.println("obj?.findByPath(subquery)")
        pr.println("} else {")
        pr.println( ProcessorHelper.protectReservedWords(ref.getName) )
        pr.println("}")
        pr.println("}")
      }
    })
    pr.println("else -> {null}")
    pr.println("}")
    pr.println("}")
  }


}
