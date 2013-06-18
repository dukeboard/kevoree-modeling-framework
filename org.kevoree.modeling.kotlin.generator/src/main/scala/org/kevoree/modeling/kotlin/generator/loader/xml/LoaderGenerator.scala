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


package org.kevoree.modeling.kotlin.generator.loader.xml

//EClass, EClassifier,

import org.eclipse.emf.ecore.xmi.XMIResource
import org.eclipse.emf.ecore.{EClass, EPackage}
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}
import scala.collection.JavaConversions._
import java.io.File

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 24/09/11
 * Time: 18:09
 */

class LoaderGenerator(ctx : GenerationContext) {

  def generateLoader(model : XMIResource) {

        val loaderGenBaseDir = ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "loader"
        ProcessorHelper.checkOrCreateFolder(loaderGenBaseDir)

        val el = new RootLoader(ctx)
        el.generateXMIResolveCommand()
        el.generateLoader(model)
  }



}