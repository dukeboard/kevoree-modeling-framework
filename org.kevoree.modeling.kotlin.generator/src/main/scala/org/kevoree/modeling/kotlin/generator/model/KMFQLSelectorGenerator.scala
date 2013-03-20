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

import java.io.{File, PrintWriter}
import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore.{EPackage, EClass}
import org.kevoree.modeling.kotlin.generator.{FQNHelper, GenerationContext, ProcessorHelper}
import org.kevoree.modeling.kotlin.generator.ProcessorHelper._
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

  def generateSelectorCache(ctx: GenerationContext, packageGenDir: String, packElement: EPackage) {
    var formatedCacheName: String = packElement.getName.substring(0, 1).toUpperCase
    formatedCacheName += packElement.getName.substring(1)
    formatedCacheName += "ResolverCacheInternal"
    ProcessorHelper.checkOrCreateFolder(packageGenDir + "/impl/")
    val localFile = new File(packageGenDir + "/impl/" + formatedCacheName + ".kt")
    val pr = new PrintWriter(localFile, "utf-8")

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("KMFQLSelectorCache.vm");
    val ctxV = new VelocityContext()
    ctxV.put("formatedCacheName", formatedCacheName)
    ctxV.put("packElem", ProcessorHelper.fqn(ctx, packElement))
    ctxV.put("ctx", ctx)
    template.merge(ctxV, pr)
    pr.flush()
    pr.close()
    ctx.setkevoreeCacheResolver(formatedCacheName)
  }

  def generateSelectorMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext) {

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("KMFQLSelectorByQuery.vm");
    val ctxV = new VelocityContext()
    ctxV.put("ctx", ctx)
    ctxV.put("FQNHelper", new FQNHelper())
    val optionalRelationShipNameGen = cls.getEAllReferences.filter(ref => hasID(ref.getEReferenceType)).size == 1
    ctxV.put("optionalRelationShipNameGen", optionalRelationShipNameGen)
    if (optionalRelationShipNameGen) {
      val relationShipOptionalName = cls.getEAllReferences.filter(ref => hasID(ref.getEReferenceType)).get(0).getName
      ctxV.put("relationShipOptionalName", relationShipOptionalName)
    }
    ctxV.put("eRefs",cls.getEAllReferences)
    template.merge(ctxV, pr)


    /*
  pr.print("override fun ")
  pr.println("selectByQuery(query : String) : List<Any> {")
  pr.println("val collected = java.util.ArrayList<Any>()")
  pr.println("try {")
  pr.println("val firstSepIndex = query.indexOf('[')")
  pr.println("var queryID = \"\"")
  pr.println("var extraReadChar = 2")
  val optionalRelationShipNameGen = cls.getEAllReferences.filter(ref => hasID(ref.getEReferenceType)).size == 1
  if (optionalRelationShipNameGen) {
    val relationShipOptionalName = cls.getEAllReferences.filter(ref => hasID(ref.getEReferenceType)).get(0).getName
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
    if (hasID(ref.getEReferenceType) && ref.isMany()) {
      pr.println("\"" + ref.getName + "\" -> {")
      pr.println("val objFound = find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(queryID)")
      pr.println("if(subquery != \"\" && objFound != null){")
      if (hasFindByIDMethod(ref.getEReferenceType)) {
        pr.println("return objFound.selectByQuery(subquery)")
      } else {
        pr.println("throw Exception(\"KMFQL : rejected sucessor\")")
      }
      pr.println("} else {")
      if (hasFindByIDMethod(ref.getEReferenceType)) {
        pr.println("if(subquery != \"\"){")
        pr.println("val subResult = " + ctx.getkevoreeCacheResolver + ".filter(queryID," + "_" + ref.getName + ".values())")
        pr.println("for(subObj in subResult){")
        pr.println("collected.addAll( (subObj as " + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ").selectByQuery(subquery))")
        pr.println("}")
        pr.println("} else {")
        pr.println("val subResult = " + ctx.getkevoreeCacheResolver + ".filter(queryID," + "_" + ref.getName + ".values())")
        pr.println("collected.addAll(subResult)")
        pr.println("}")
        pr.println("return collected")
      } else {
        pr.println("val subResult = " + ctx.getkevoreeCacheResolver + ".filter(queryID," + "_" + ref.getName + ".values())")
        pr.println("collected.addAll(subResult)")
        pr.println("return collected")
      }
      pr.println("}")
      pr.println("}")
    }
    if (!ref.isMany()) {
      pr.println("\"" + ref.getName + "\" -> {")
      pr.println("val subResult = " + ctx.getkevoreeCacheResolver + ".filter(queryID,java.util.Collections.singleton(get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "()))")
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

  */

  }

}
