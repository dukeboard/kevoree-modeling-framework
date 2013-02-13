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


package org.kevoree.tools.ecore.kotlin.gencode.loader.xml

//EClass, EClassifier,

import org.eclipse.emf.ecore.{EClass, EPackage}
import org.kevoree.tools.ecore.kotlin.gencode.{GenerationContext, ProcessorHelper}
import scala.collection.JavaConversions._

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 24/09/11
 * Time: 18:09
 */

class LoaderGenerator(ctx : GenerationContext) {

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
        val loaderGenBaseDir = ProcessorHelper.getPackageGenDir(ctx, cls.getEPackage) + "/loader/"
        ProcessorHelper.checkOrCreateFolder(loaderGenBaseDir)

        val el = new RootLoader(ctx, loaderGenBaseDir, cls.getEPackage)
        el.generateLoader(cls, cls.getEPackage.getName+ ":" + cls.getName)
      }
      case None => throw new UnsupportedOperationException("Root container not found. Returned None.")
    }
  }



}