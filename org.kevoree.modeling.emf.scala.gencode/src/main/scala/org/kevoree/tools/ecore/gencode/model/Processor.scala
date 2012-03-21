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


package org.kevoree.tools.ecore.gencode.model

import scala.collection.JavaConversions._
import org.kevoree.tools.ecore.gencode.ProcessorHelper
import scala.None
import org.kevoree.tools.ecore.gencode.cloner.ClonerGenerator
import org.eclipse.emf.ecore._

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 22/09/11
 * Time: 08:32
 */

object Processor extends TraitGenerator
with PackageFactoryGenerator
with ClassGenerator
with ClonerGenerator
with EnumGenerator {

  /**
   * Processes the generation of the model classes. Goes deep in packages hierarchy then generate files.
   * @param baseDir the directory in which the package @pack will be generated.
   * @param pack the EPackage to be generated
   * @param parentPackage is the value of the parent package
   * @param modelVersion the version of the model to be included in headers
   * @param isRoot specifies if the method call is made on the root package
   */
  def process(baseDir: String, pack: EPackage, parentPackage: Option[String] , modelVersion : String, isRoot : Boolean = false, rootXmiContainerClassName: Option[String]) {
    //log.debug("Processing package: " + containerPack + "." + pack.getName)
    val genDir = baseDir + "/" + pack.getName
    val packageName = parentPackage match {
      case Some(parent) => {if(parent.endsWith(".")){parent}else{parent + "."}} + pack.getName
      case None => pack.getName
    }

    ProcessorHelper.checkOrCreateFolder(genDir)
    ProcessorHelper.checkOrCreateFolder(genDir + "/impl")
    generatePackageFactory(genDir, packageName, pack,modelVersion)
    generateContainerTrait(genDir, packageName, pack)
    //generateMutableTrait(dir, thisPack, pack)
    pack.getEClassifiers.foreach(c => process(genDir, packageName, c, pack))
    pack.getESubpackages.foreach(subPack => process(genDir, subPack, Some(packageName),modelVersion, false, rootXmiContainerClassName))

    if(isRoot){
      generateCloner(pack,baseDir,packageName,rootXmiContainerClassName)
    }

  }


  private def process(location: String, pack: String, cls: EClassifier, packElement: EPackage) {
    //log.debug("Processing classifier:" + cls.getName)
    cls match {
      case cl: EClass => {
        generateClass(location, pack, cl, packElement)
        generateCompanion(location, pack, cl, packElement)
      }
      case dt : EDataType => { dt match {
        case enum : EEnum => generateEnum(location, pack, enum, packElement)
        case _ => System.out.println("Generic DataType " + cls.getName + " ignored for generation.")
      }

      }
      case _ => println("No processor found for classifier: " + cls)
    }

  }



}