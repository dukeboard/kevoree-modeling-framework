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


package org.kevoree.modeling.kotlin.generator.loader.json

import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore.resource.ResourceSet
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}
import java.io.{PrintWriter, File}
import java.util

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 24/09/11
 * Time: 18:09
 */

class JsonLoaderGenerator(ctx: GenerationContext) {


  def generateLoader(model: ResourceSet) {

    if (ctx.getJS()) {
      generateJSStaticJSONClasses()
    }

    val loaderGenBaseDir = ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "loader"
    ProcessorHelper.checkOrCreateFolder(loaderGenBaseDir)

    val localFile = new File(loaderGenBaseDir + "/JSONModelLoader.kt")
    val pr = new PrintWriter(localFile, "utf-8")
    pr.println("package " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".loader")
    pr.println("class JSONModelLoader : org.kevoree.modeling.api.json.JSONModelLoader() {")
    pr.println("override var factory : org.kevoree.modeling.api.KMFFactory? = "+ProcessorHelper.fqn(ctx,ctx.getBasePackageForUtilitiesGeneration) + ".factory.MainFactory()")
    pr.println("}")
    pr.flush()
    pr.close()
  }

  private def generateJSStaticJSONClasses() {
    //static IO
    var basePath = ctx.getRootGenerationDirectory + File.separator + "java" + File.separator + "io"
    ProcessorHelper.checkOrCreateFolder(basePath)
    var files = util.Arrays.asList("java.io.InputStream", "java.io.ByteArrayInputStream")
    import scala.collection.JavaConversions._
    files.foreach {
      f =>
        val genOutputStreamFile = new File(basePath + File.separator + f.substring(f.lastIndexOf(".") + 1) + ".kt")
        val OutputStream = new PrintWriter(genOutputStreamFile, "utf-8")
        val ve = new VelocityEngine()
        ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
        ve.init()
        val template1 = ve.getTemplate("templates/jsIO/" + f + ".vm")
        val ctxV = new VelocityContext()
        ctxV.put("helper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
        ctxV.put("ctx", ctx)

        template1.merge(ctxV, OutputStream)
        OutputStream.flush()
        OutputStream.close()
    }
    //static lang
    basePath = ctx.getRootGenerationDirectory + File.separator + "java" + File.separator + "lang"
    ProcessorHelper.checkOrCreateFolder(basePath)
    files = util.Arrays.asList("java.lang.StringBuilder", "java.lang.IntegerParser", "java.lang.LongParser")
    import scala.collection.JavaConversions._
    files.foreach {
      f =>
        val genOutputStreamFile = new File(basePath + File.separator + f.substring(f.lastIndexOf(".") + 1) + ".kt")
        val OutputStream = new PrintWriter(genOutputStreamFile, "utf-8")
        val ve = new VelocityEngine()
        ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
        ve.init()
        val template1 = ve.getTemplate("templates/jsIO/" + f + ".vm")
        val ctxV = new VelocityContext()
        ctxV.put("helper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
        ctxV.put("ctx", ctx)
        template1.merge(ctxV, OutputStream)
        OutputStream.flush()
        OutputStream.close()
    }
  }

}