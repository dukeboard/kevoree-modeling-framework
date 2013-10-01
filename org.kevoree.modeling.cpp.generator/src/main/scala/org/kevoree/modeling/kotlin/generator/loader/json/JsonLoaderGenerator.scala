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

import org.eclipse.emf.ecore.resource.ResourceSet
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}
import java.io.{PrintWriter, File}

class JsonLoaderGenerator(ctx: GenerationContext) {

  def generateLoader(model: ResourceSet) {
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
}