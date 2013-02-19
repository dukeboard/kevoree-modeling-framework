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
package org.kevoree.tools.ecore.kotlin.gencode.model

import java.io.PrintWriter
import org.eclipse.emf.ecore.EClass
import org.kevoree.tools.ecore.kotlin.gencode.{GenerationContext, ProcessorHelper}
import org.kevoree.tools.ecore.kotlin.gencode.ProcessorHelper._
import scala.collection.JavaConversions._

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/02/13
 * Time: 18:39
 */
trait KMFQLSelectorGenerator {

  def hasFindByIDMethod(cls: EClass): Boolean

  def hasID(cls: EClass): Boolean


  def generateSelectorMethods(pr: PrintWriter, cls: EClass,ctx:GenerationContext) {

  //  if (hasFindByIDMethod(cls)) {
      pr.print("override fun ")
      pr.println("selectByQuery(query : String) : List<Any> {")
      pr.println("val collected = java.util.ArrayList<Any>()")
      pr.println("try {")


      pr.println("val firstSepIndex = query.indexOf('[')")
      pr.println("var queryID = \"\"")
      pr.println("var extraReadChar = 2")

      val optionalRelationShipNameGen = cls.getEAllReferences.filter(ref => hasID(ref.getEReferenceType) /*&& (ref.getUpperBound == -1 || ref.getLowerBound > 1)*/).size == 1
      if (optionalRelationShipNameGen) {
        //Optional relationship definition
        val relationShipOptionalName = cls.getEAllReferences.filter(ref => hasID(ref.getEReferenceType) /*&& (ref.getUpperBound == -1 || ref.getLowerBound > 1)*/).get(0).getName
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
      pr.println("when(relationName) {")
      cls.getEAllReferences.foreach(ref => {
        if (hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)) {
          pr.println("\"" + ref.getName + "\" -> {")
          pr.println("val objFound = find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(queryID)")
          pr.println("if(subquery != \"\" && objFound != null){")
          if (hasFindByIDMethod(ref.getEReferenceType)) {
            pr.println("return objFound.selectByQuery(subquery)")
          } else {
            pr.println("throw Exception(\"KMFQL : rejected sucessor\")")
          }
          pr.println("} else {")
          //Not found by id search by lookung every solution
          if (hasFindByIDMethod(ref.getEReferenceType)) {
            pr.println("if(subquery != \"\"){")
            pr.println("val internalFilter = fr.inria.jfilter.Parser.instance.parse(queryID)")
            pr.println("val subResult = internalFilter!!.filter(" + protectReservedWords("_" + ref.getName) + ".values())!!")
            pr.println("for(subObj in subResult){")
            pr.println("collected.addAll( (subObj as "+ProcessorHelper.fqn(ctx,ref.getEReferenceType)+").selectByQuery(subquery))")
            pr.println("}")
            pr.println("} else {")
            pr.println("val internalFilter = fr.inria.jfilter.Parser.instance.parse(queryID)")
            pr.println("val subResult = internalFilter!!.filter(" + protectReservedWords("_" + ref.getName) + ".values())!!")
            pr.println("collected.addAll(subResult)")
            pr.println("}")
            pr.println("return collected")
          } else {
            pr.println("val internalFilter = fr.inria.jfilter.Parser.instance.parse(queryID)")
            pr.println("val subResult = internalFilter!!.filter(" + protectReservedWords("_" + ref.getName) + ".values())!!")
            pr.println("collected.addAll(subResult)")
            pr.println("return collected")
          }

          pr.println("}")
          pr.println("}")

        }
        if (hasID(ref.getEReferenceType) && (ref.getUpperBound == 1) && (ref.getLowerBound == 1)) {
          pr.println("\"" + ref.getName + "\" -> {")
          pr.println("val internalFilter = fr.inria.jfilter.Parser.instance.parse(queryID)")
          pr.println("val subResult = internalFilter!!.filter(java.util.Collections.singleton(get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "()))!!")
          pr.println("collected.add(subResult)")
          pr.println("return collected")
          pr.println("}")
        }
        if (hasID(ref.getEReferenceType) && (ref.getUpperBound == 1) && (ref.getLowerBound == 0)) {
          pr.println("\"" + ref.getName + "\" -> {")
          pr.println("val internalFilter = fr.inria.jfilter.Parser.instance.parse(queryID)")
          pr.println("val subResult = internalFilter!!.filter(java.util.Collections.singleton(get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "()))!!")
          pr.println("collected.add(subResult)")
          pr.println("return collected")
          pr.println("}")
        }
      })
      pr.println("else -> {return collected}")
      pr.println("}")

      pr.println("} catch(e:Exception){")
      pr.println("return collected }")

      pr.println("}")
   // }


  }

}
