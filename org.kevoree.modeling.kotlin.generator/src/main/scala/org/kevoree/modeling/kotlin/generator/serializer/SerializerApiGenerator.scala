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


package org.kevoree.modeling.kotlin.generator.serializer

//EClass, EClassifier,

import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore.{EClass, EPackage}
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}
import java.io.{PrintWriter, File}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 24/09/11
 * Time: 18:09
 */

class SerializerApiGenerator(ctx : GenerationContext) {

  def generateSerializerAPI() {
    val serializerGenBaseDir = ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "serializer"
    val localFile = new File(serializerGenBaseDir + File.separator + "ModelSerializer.kt")
    if(!localFile.exists()) {
          ProcessorHelper.checkOrCreateFolder(serializerGenBaseDir)

          val pr = new PrintWriter(localFile,"utf-8")

          val ve = new VelocityEngine()
          ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName)
          ve.init()
          val template = ve.getTemplate("templates/SerializerAPI.vm")
          val ctxV = new VelocityContext()

          ctxV.put("helper",new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
          ctxV.put("ctx",ctx)

          template.merge(ctxV,pr)

          pr.flush()
          pr.close()
    }
  }

}