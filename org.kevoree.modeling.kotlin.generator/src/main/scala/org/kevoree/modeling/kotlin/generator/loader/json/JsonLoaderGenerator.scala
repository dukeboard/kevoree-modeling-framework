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


package org.kevoree.modeling.kotlin.generator.loader.json

//EClass, EClassifier,

import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore.{EClass, EPackage}
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}
import scala.collection.JavaConversions._
import java.io.{PrintWriter, File}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 24/09/11
 * Time: 18:09
 */

class JsonLoaderGenerator(ctx : GenerationContext) {

  def generateLoader(pack : EPackage) {

    //Fills the map of factory mappings
    if(ctx.packageFactoryMap.size()==0) {
      if(pack.getEClassifiers.size() != 0) {
        ctx.registerFactory(pack)
      }
      pack.getESubpackages.foreach{subPack =>
        if(subPack.getEClassifiers.size() != 0) {
          ctx.registerFactory(subPack)
        }
      }
    }

    ctx.getRootContainerInPackage(pack) match {
      case Some(cls : EClass) => {
        val loaderGenBaseDir = ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "loader"
        ProcessorHelper.checkOrCreateFolder(loaderGenBaseDir)

        val localFile = new File(loaderGenBaseDir + "/JSONModelLoader.kt")
        ctx.loaderPrintWriter = new PrintWriter(localFile,"utf-8")
        ctx.generatedLoaderFiles.clear()

        val ve = new VelocityEngine()
        ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName)
        ve.init()
        val template = ve.getTemplate("templates/JSONLoader.vm")
        val ctxV = new VelocityContext()

        ctxV.put("rootElement",cls)
        ctxV.put("helper",new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
        ctxV.put("ctx",ctx)

        template.merge(ctxV,ctx.loaderPrintWriter )

        ctx.loaderPrintWriter .flush()
        ctx.loaderPrintWriter .close()

      }
      case None => println("Root container not found in package: "+ProcessorHelper.fqn(ctx,pack) +". Loader generation aborted.")
    }
  }

}