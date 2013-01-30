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
package org.kevoree.tools.ecore.kotlin.gencode.model

import org.kevoree.tools.ecore.kotlin.gencode.{ProcessorHelper, GenerationContext}
import org.eclipse.emf.ecore._
import scala.collection.JavaConversions._

/**
 * Created by IntelliJ IDEA.
 * User: gregory.nain
 * Date: 21/03/12
 * Time: 14:02
 * To change this template use File | Settings | File Templates.
 */

class ModelGenerator(ctx:GenerationContext) extends TraitGenerator
with PackageFactoryGenerator
with ClassGenerator
with ClonerGenerator
with EnumGenerator {

  /**
   * Processes the generation of the model classes. Goes deep in packages hierarchy then generate files.
   * @param currentPackage the EPackage to be generated
   * @param modelVersion the version of the model to be included in headers
   * @param isRoot specifies if the method call is made on the containerRoot package
   */
  def process(currentPackage: EPackage, modelVersion : String, isRoot : Boolean = false) {

    val currentPackageDir = ProcessorHelper.getPackageGenDir(ctx, currentPackage)
    val currentUserPackageDir = ProcessorHelper.getPackageUserDir(ctx, currentPackage)



    ProcessorHelper.checkOrCreateFolder(currentPackageDir)
    if(currentPackage.getEClassifiers.size() != 0) {
      ProcessorHelper.checkOrCreateFolder(currentPackageDir + "/impl")
      generatePackageFactory(ctx, currentPackageDir, currentPackage, modelVersion)
      generatePackageFactoryDefaultImpl(ctx, currentPackageDir, currentPackage, modelVersion)
    }


    if(ctx.getKevoreeContainer.isEmpty) {
      generateContainerTrait(ctx, currentPackageDir, currentPackage)
    }

    //generateMutableTrait(dir, thisPack, pack)
    currentPackage.getEClassifiers.foreach(c => process(currentPackageDir, currentPackage, c,currentUserPackageDir))
    currentPackage.getESubpackages.foreach(subPack => process(subPack, modelVersion))


    if(isRoot){
      generateCloner(ctx, currentPackageDir, currentPackage)
    }

  }


  private def process(currentPackageDir: String, packElement: EPackage, cls: EClassifier, userPackageDir : String) {
    //log.debug("Processing classifier:" + cls.getName)
    cls match {
      case cl: EClass => {
        generateClass(ctx, currentPackageDir, packElement, cl)
        generateCompanion(ctx, currentPackageDir, packElement, cl, userPackageDir)
      }
      case dt : EDataType => { dt match {
        case enum : EEnum => generateEnum(ctx, currentPackageDir, packElement, enum)
        case _ => System.out.println("Generic DataType " + cls.getName + " ignored for generation.")
      }

      }
      case _ => println("No processor found for classifier: " + cls)
    }

  }

}
