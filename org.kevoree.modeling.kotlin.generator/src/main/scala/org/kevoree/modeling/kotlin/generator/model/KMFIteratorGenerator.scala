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
import org.kevoree.modeling.kotlin.generator.{ProcessorHelperClass, GenerationContext, ProcessorHelper}
import scala.collection.JavaConversions._

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/02/13
 * Time: 18:39
 */
trait KMFIteratorGenerator {

  def hasFindByIDMethod(cls: EClass): Boolean

  def hasID(cls: EClass): Boolean

  def generateIteratorFile(ctx: GenerationContext, packageGenDir: String, packElement: EPackage) {
    ProcessorHelper.checkOrCreateFolder(packageGenDir + "/util/")
    val localFile = new File(packageGenDir + "/util/CompositeIterator.kt")
    val pr = new PrintWriter(localFile, "utf-8")
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("CompositeIterator.vm")
    val ctxV = new VelocityContext()
    ctxV.put("packElem", ProcessorHelper.fqn(ctx, packElement))
    ctxV.put("ctx", ctx)
    template.merge(ctxV, pr)
    pr.flush()
    pr.close()
  }

  def generateIterableFile(ctx: GenerationContext, packageGenDir: String, packElement: EPackage) {
    ProcessorHelper.checkOrCreateFolder(packageGenDir + "/util/")
    val localFile = new File(packageGenDir + "/util/CompositeIterable.kt")
    val pr = new PrintWriter(localFile, "utf-8")
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("CompositeIterable.vm");
    val ctxV = new VelocityContext()
    ctxV.put("packElem", ProcessorHelper.fqn(ctx, packElement))
    ctxV.put("ctx", ctx)
    template.merge(ctxV, pr)
    pr.flush()
    pr.close()
  }



}
