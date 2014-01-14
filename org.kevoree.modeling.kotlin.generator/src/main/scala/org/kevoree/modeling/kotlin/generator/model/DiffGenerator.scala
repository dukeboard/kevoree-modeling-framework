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
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, ProcessorHelperClass, GenerationContext}

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 24/04/13
 * Time: 15:54
 */
trait DiffGenerator {


  def generateModelTraceCompare(ctx: GenerationContext, packageGenDir: String) {

    val packageName = ProcessorHelper.fqn(ctx, ctx.basePackageForUtilitiesGeneration)
    ProcessorHelper.checkOrCreateFolder(packageGenDir + "/compare/")
    val localFile = new File(packageGenDir + "/compare/DefaultModelCompare.kt")
    val pr = new PrintWriter(localFile, "utf-8")
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("templates/DefaultModelCompare.vm")
    val ctxV = new VelocityContext()
    ctxV.put("helper", new ProcessorHelperClass())
    ctxV.put("ctx", ctx)
    ctxV.put("packageName", packageName)
    template.merge(ctxV, pr)
    pr.flush()
    pr.close()
  }


  def generateModelTraceAPI(ctx: GenerationContext, packageGenDir: String) {
    ProcessorHelper.checkOrCreateFolder(packageGenDir + "/trace/")
    val localFile = new File(packageGenDir + "/trace/DefaultTraceSequence.kt")
    val pr = new PrintWriter(localFile, "utf-8")
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("templates/trace/DefaultTraceSequence.vm")
    val ctxV = new VelocityContext()
    ctxV.put("helper", new ProcessorHelperClass())
    ctxV.put("ctx", ctx)
    template.merge(ctxV, pr)
    pr.flush()
    pr.close()
  }

  def generateDiffMethod(pr: PrintWriter, cls: EClass, ctx: GenerationContext) {
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("templates/trace/TraceCompareMethod.vm")
    val ctxV = new VelocityContext()
    ctxV.put("ctx", ctx)
    ctxV.put("currentClass", cls)
    ctxV.put("FQNHelper", new ProcessorHelperClass())
    template.merge(ctxV, pr)
  }

}
