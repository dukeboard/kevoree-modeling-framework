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


package org.kevoree.tools.ecore.gencode.loader

//EClass, EClassifier,

import scala.collection.JavaConversions._
import org.eclipse.emf.ecore.{EClassifier, EClass, EPackage}
import collection.mutable.Buffer
import org.kevoree.tools.ecore.gencode.{GenerationContext, ProcessorHelper}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 24/09/11
 * Time: 18:09
 */

class LoaderGenerator(ctx : GenerationContext) {

  def generateLoader(pack : EPackage) {

    val loaderGenBaseDir = ProcessorHelper.getPackageGenDir(ctx, pack) + "/loader/"
    ProcessorHelper.checkOrCreateFolder(loaderGenBaseDir)

    val el = new RootLoader(ctx, loaderGenBaseDir, pack)

    ctx.getRootContainerInPackage(pack) match {
      case Some(cls : EClass) => {
        el.generateLoader(cls, pack.getName+ ":" + cls.getName)
      }
      case None => throw new UnsupportedOperationException("Root container not found. Returned None.")
    }
  }



}