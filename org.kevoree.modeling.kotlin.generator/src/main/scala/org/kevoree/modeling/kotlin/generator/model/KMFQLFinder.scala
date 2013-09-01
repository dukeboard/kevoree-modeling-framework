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

    generateFindByPathMethods(ctx, cls, pr)
  }

  def generateFindByPathMethods(ctx: GenerationContext, cls: EClass, pr: PrintWriter) {
    pr.print("override fun findByID(relationName:String,idP : String) : org.kevoree.modeling.api.KMFContainer? {")
    pr.println("when(relationName) {")
    cls.getEAllReferences.foreach(ref => {
      if (ref.isMany) {
        pr.println(ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + " -> {")
        pr.println("return find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(idP)}")
      }
      if (ref.getUpperBound == 1) {
        pr.println(ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + " -> {")
        pr.println("val objFound = "+ProcessorHelper.protectReservedWords(ref.getName))
        pr.println("if(objFound!=null && (objFound as "+ctx.getKevoreeContainerImplFQN+").internalGetKey() == idP){")
        pr.println("return objFound")
        pr.println("}else{return null}")
        pr.println("}")
      }
    })
    pr.println("else -> {return null}")
    pr.println("}")
    pr.println("}")
  }


}
