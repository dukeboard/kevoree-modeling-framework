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
import org.eclipse.emf.ecore.{EClass, EClassifier, EPackage}
import scala.None
import org.kevoree.tools.ecore.gencode.cloner.ClonerGenerator

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 22/09/11
 * Time: 08:32
 */

object Processor extends TraitGenerator with PackageFactoryGenerator with ClassGenerator with ClonerGenerator{

  def process(location: String, pack: EPackage, containerPack: Option[String] , modelVersion : String, isRoot : Boolean = false) {
    //log.debug("Processing package: " + containerPack + "." + pack.getName)
    val dir = location + "/" + pack.getName
    val thisPack =
      containerPack match {
        case None => pack.getName
        case Some(container) => container + "." + pack.getName
      }

    ProcessorHelper.checkOrCreateFolder(dir)
    ProcessorHelper.checkOrCreateFolder(dir + "/impl")
    generatePackageFactory(dir, thisPack, pack,modelVersion)
    generateContainerTrait(dir, thisPack, pack)
    //generateMutableTrait(dir, thisPack, pack)
    pack.getEClassifiers.foreach(c => process(dir, thisPack, c, pack))
    pack.getESubpackages.foreach(p => process(dir, pack, Some(thisPack),modelVersion))

    if(isRoot){
      generateCloner(pack,location,thisPack)
    }




  }


  private def process(location: String, pack: String, cls: EClassifier, packElement: EPackage) {
    //log.debug("Processing classifier:" + cls.getName)
    cls match {
      case cl: EClass => {
        generateClass(location, pack, cl, packElement)
        generateCompanion(location, pack, cl, packElement)
      }
      case _ => println("No processor found for classifier: " + cls.getClass)
    }

  }



}