
package org.kevoree.modeling.kotlin.generator.model

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


import java.io.{File, PrintWriter}
import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore.resource.ResourceSet
import org.eclipse.emf.ecore.util.EcoreUtil
import org.eclipse.emf.ecore.{EEnum, EPackage, EClass}
import scala.collection.JavaConversions._
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}


/**
 * Created by IntelliJ IDEA.
 * User: Francois Fouquet
 * Date: 02/10/11
 * Time: 20:55
 */

trait ClonerGenerator {


  def generateCloner(ctx: GenerationContext, pack: EPackage, model: ResourceSet) {
    ProcessorHelper.checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "cloner")
    val pr = new PrintWriter(new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "cloner" + File.separator + "DefaultModelCloner.kt"), "utf-8")
    val packageName = ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration)
    ctx.clonerPackage = packageName + ".cloner"
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName)
    ve.init()
    val template = ve.getTemplate("templates/ModelCloner.vm")
    val ctxV = new VelocityContext()
    ctxV.put("packageName", packageName)
    ctxV.put("potentialRoots", ProcessorHelper.collectAllClassifiersInModel(model))
    ctxV.put("ctx", ctx)
    ctxV.put("helper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    ctxV.put("packages", ctx.packageFactoryMap.values())
    template.merge(ctxV, pr)
    pr.flush()
    pr.close()
  }

}