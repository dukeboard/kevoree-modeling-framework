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

//EClass, EClassifier,

import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore.xmi.XMIResource
import org.eclipse.emf.ecore.{EClass, EPackage}
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}
import scala.collection.JavaConversions._
import java.io.{PrintWriter, File}
import java.util

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 24/09/11
 * Time: 18:09
 */

class JsonLoaderGenerator(ctx: GenerationContext) {

  private def generateContext() {
    val el = new ContextGenerator(ctx)
    el.generateContext()
  }


  def generateLoader(model: XMIResource) {

    generateStaticJSONClasses()
    generateJSONResolveCommand()
    if (ctx.getJS()) {
      generateJSStaticJSONClasses()
      generateContext()
    }

    val loaderGenBaseDir = ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "loader"
    ProcessorHelper.checkOrCreateFolder(loaderGenBaseDir)

    val localFile = new File(loaderGenBaseDir + "/JSONModelLoader.kt")
    ctx.loaderPrintWriter = new PrintWriter(localFile, "utf-8")
    ctx.generatedLoaderFiles.clear()

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName)
    ve.init()
    val template = ve.getTemplate("templates/json/JSONLoader.vm")
    val ctxV = new VelocityContext()

    //ctxV.put("rootElement",cls)
    ctxV.put("model", model)
    ctxV.put("helper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    ctxV.put("ctx", ctx)
    ctxV.put("allEClass", getEAllEclass(model))


    template.merge(ctxV, ctx.loaderPrintWriter)

    ctx.loaderPrintWriter.flush()
    ctx.loaderPrintWriter.close()
  }

  def generateJSONResolveCommand() {
    val genOutputStreamFile = new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "loader" + File.separator + "JSONResolveCommand.kt")
    val outputStream = new PrintWriter(genOutputStreamFile, "utf-8")
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template1 = ve.getTemplate("templates/commands/JSONResolveCommand.vm")
    val ctxV = new VelocityContext()
    ctxV.put("helper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    ctxV.put("ctx", ctx)

    template1.merge(ctxV, outputStream)
    outputStream.flush()
    outputStream.close()
  }

  private def generateJSStaticJSONClasses() {
    //static IO
    var basePath = ctx.getRootGenerationDirectory + File.separator + "java" + File.separator + "io"
    ProcessorHelper.checkOrCreateFolder(basePath)
    var files = util.Arrays.asList("java.io.InputStream","java.io.ByteArrayInputStream")
    import scala.collection.JavaConversions._
    files.foreach {
      f =>
        val genOutputStreamFile = new File(basePath + File.separator + f.substring(f.lastIndexOf(".")+1) + ".kt")
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
    files = util.Arrays.asList("java.lang.StringBuilder","java.lang.IntegerParser")
    import scala.collection.JavaConversions._
    files.foreach {
      f =>
        val genOutputStreamFile = new File(basePath + File.separator + f.substring(f.lastIndexOf(".")+1) + ".kt")
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

  private def generateStaticJSONClasses() {
    val loaderGenBaseDir = ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "loader"
    ProcessorHelper.checkOrCreateFolder(loaderGenBaseDir)
    val files = util.Arrays.asList("JsonReader", "JsonToken", "Lexer")
    import scala.collection.JavaConversions._
    files.foreach {
      f =>
        val genOutputStreamFile = new File(loaderGenBaseDir + File.separator + f + ".kt")
        val OutputStream = new PrintWriter(genOutputStreamFile, "utf-8")
        val ve = new VelocityEngine()
        ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
        ve.init()
        val template1 = ve.getTemplate("templates/json/" + f + ".vm")
        val ctxV = new VelocityContext()
        ctxV.put("helper", new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
        ctxV.put("ctx", ctx)

        template1.merge(ctxV, OutputStream)
        OutputStream.flush()
        OutputStream.close()
    }
  }


  def getEAllEclass(pack: XMIResource): java.util.List[EClass] = {
    val result = new util.ArrayList[EClass]()
    pack.getContents.foreach {
      eclass =>
        if (eclass.isInstanceOf[EPackage]) {
          getEAllPackage(eclass.asInstanceOf[EPackage], result)
        }
    }
    return result
  }

  def getEAllPackage(pack: EPackage, fillList: util.ArrayList[EClass]) {
    pack.getEClassifiers.foreach {
      eClazz =>
        if (eClazz.isInstanceOf[EClass]) {
          fillList.add(eClazz.asInstanceOf[EClass])
        }
    }
    pack.getESubpackages.foreach {
      sub =>
        getEAllPackage(sub, fillList)
    }
  }


}