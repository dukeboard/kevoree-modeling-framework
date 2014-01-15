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
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}
import scala.collection.JavaConversions._

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/02/13
 * Time: 18:39
 */
trait KMFQLSelectorGenerator {

  def generateSelectorCache(ctx: GenerationContext, packageGenDir: String, packElement: EPackage) {
    var formatedCacheName: String = packElement.getName.substring(0, 1).toUpperCase
    formatedCacheName += packElement.getName.substring(1)
    formatedCacheName += "ResolverCacheInternal"
    ProcessorHelper.getInstance().checkOrCreateFolder(packageGenDir + "/impl/")
    val localFile = new File(packageGenDir + "/impl/" + formatedCacheName + ".kt")
    val pr = new PrintWriter(localFile, "utf-8")

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("templates/KMFQLSelectorCache.vm");
    val ctxV = new VelocityContext()
    ctxV.put("formatedCacheName", formatedCacheName)
    ctxV.put("packElem", ProcessorHelper.getInstance().fqn(ctx, packElement))
    ctxV.put("ctx", ctx)
    template.merge(ctxV, pr)
    pr.flush()
    pr.close()
    ctx.kevoreeCacheResolver = ProcessorHelper.getInstance().fqn(ctx, packElement)+".impl."+formatedCacheName
  }

  def generateSelectorMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext) {

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("templates/KMFQLSelectorByQuery.vm");
    val ctxV = new VelocityContext()
    ctxV.put("ctx", ctx)
    ctxV.put("FQNHelper", ProcessorHelper.getInstance())
    val optionalRelationShipNameGen = cls.getEAllReferences.size == 1
    ctxV.put("optionalRelationShipNameGen", optionalRelationShipNameGen)
    if (optionalRelationShipNameGen) {
      val relationShipOptionalName = cls.getEAllReferences().get(0).getName()
      ctxV.put("relationShipOptionalName", relationShipOptionalName)
    }
    ctxV.put("eRefs",cls.getEAllReferences())
    ctxV.put("eSub",cls.getEAllContainments())
    ctxV.put("formatedFactoryName",ctx.kevoreeContainer)
    template.merge(ctxV, pr)
  }

}
