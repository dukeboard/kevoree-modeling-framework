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

import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
import org.eclipse.emf.ecore.EPackage
import java.io.{File, FileOutputStream, PrintWriter}
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 23/09/11
 * Time: 13:35
 */

trait TraitGenerator {


  def generateContainerAPI(ctx: GenerationContext) {
    //var formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase
    //formatedFactoryName += packElement.getName.substring(1)
    val formatedFactoryName = "KMFContainer"
    ProcessorHelper.checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "container")

    val extension = if(ctx.getJS()){".kt"} else { ".java"}

    val localFile = new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "container" + File.separator + formatedFactoryName + extension)
    val pr = new PrintWriter(localFile, "utf-8")
    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()

    val tName = if(ctx.getJS()){
       "templates/ContainerAPI.vm"
    } else {
       "templates/ContainerJAPI.vm"
    }

    val template = ve.getTemplate(tName);
    val ctxV = new VelocityContext()
    ctxV.put("formatedFactoryName",formatedFactoryName)
    ctxV.put("packElem",ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container")
    ctxV.put("FQNHelper",new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    ctxV.put("ctx",ctx)
    template.merge(ctxV,pr)
    pr.flush()
    pr.close()
  }

  def generateContainerTrait(ctx: GenerationContext) {
    val formatedFactoryName = "KMFContainer"
    ProcessorHelper.checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "container")
    val localFile = new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "container" + File.separator + formatedFactoryName + "Impl.kt")
    val pr = new PrintWriter(localFile, "utf-8")

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("templates/ContainerTrait.vm")
    val ctxV = new VelocityContext()
    ctxV.put("formatedFactoryName",formatedFactoryName)
    ctxV.put("packElem",ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container")
    ctxV.put("FQNHelper",new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    ctxV.put("ctx",ctx)
    template.merge(ctxV,pr)
    pr.flush()
    pr.close()

    ctx.setKevoreeContainer(Some(ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container." + formatedFactoryName))
    ctx.setKevoreeContainerImplFQN(ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container." + formatedFactoryName+"Impl")

  }

  def generateRemoveFromContainerCommand(ctx: GenerationContext) {
    ProcessorHelper.checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "container")
    val localFile = new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "container" + File.separator + "RemoveFromContainerCommand.kt")
    val pr = new PrintWriter(localFile, "utf-8")

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()
    val template = ve.getTemplate("templates/commands/RemoveFromContainerCommand.vm")
    val ctxV = new VelocityContext()
    ctxV.put("ctx",ctx)
    ctxV.put("helper",new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    template.merge(ctxV,pr)
    pr.flush()
    pr.close()
  }

}