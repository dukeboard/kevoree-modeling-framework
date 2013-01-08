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
package org.kevoree.tools.ecore.kotlin.gencode

import java.io.File
import org.eclipse.emf.ecore.xmi.XMIResource
import org.eclipse.emf.common.util.{URI => EmfUri}

import java.net.URI
import org.eclipse.emf.ecore.xmi.impl.XMIResourceImpl
import org.eclipse.emf.ecore.{EPackage, EClass}

/**
 * Created by IntelliJ IDEA.
 * User: gregory.nain
 * Date: 21/03/12
 * Time: 13:43
 * To change this template use File | Settings | File Templates.
 */

class GenerationContext {

  /**
   * Package to be added before the RootPackage of the model
   */
  private var packagePrefix: Option[String] = None

  def setPackagePrefix(pack: Option[String]) {
    packagePrefix = pack
  }

  def getPackagePrefix = packagePrefix

  /**
   * Base folder for the generation process
   */
  private var rootGenerationDirectory: File = null

  def setRootGenerationDirectory(dir: File) {
    rootGenerationDirectory = dir
  }

  def getRootGenerationDirectory = rootGenerationDirectory


  /**
   * Base user src folder
   */
  private var rootUserDirectory: File = null

  def setRootUserDirectory(dir: File) {
    rootUserDirectory = dir
  }

  def getRootUserDirectory = rootUserDirectory



  /**
   * Specifies the RootContainer class name.
   */
  private var rootXmiContainerClassName: Option[String] = None

  def setRootContainerClassName(className: Option[String]) {
    rootXmiContainerClassName = className
  }

  def getRootContainerClassName = rootXmiContainerClassName


  private var modelFileMap: Map[String, XMIResource] = Map.empty[String, XMIResource]

  def getEcoreModel(ecorefile: File): XMIResource = {
    modelFileMap.get(ecorefile.toURI.getPath) match {
      case Some(file) => file
      case None => {
        System.out.println("[INFO] Loading model file " + ecorefile.getAbsolutePath)
        val fileUri = EmfUri.createFileURI(ecorefile.getAbsolutePath)
        val resource = new XMIResourceImpl(fileUri)
        resource.load(null)
        modelFileMap = modelFileMap + ((ecorefile.toURI.getPath, resource))
           /*
        import scala.collection.JavaConversions._
        resource.getContents.foreach {
          m =>
            org.eclipse.emf.ecore.util.Diagnostician.INSTANCE.validate(m)
        }    */

        resource
      }
    }
  }

  private var rootContainers: Map[EPackage, EClass] = Map.empty[EPackage, EClass]

  def getRootContainerInPackage(pack: EPackage): Option[EClass] = {
    rootContainers.get(pack) match {
      case Some(cls) => Some(cls)
      case None => {
        ProcessorHelper.lookForRootElement(pack, rootXmiContainerClassName) match {
          case Some(cls) => {
            rootContainers = rootContainers + ((pack, cls))
            Some(cls)
          }
          case None => None
        }
      }
    }
  }

  private var kevoreeContainer: Option[String] = None

  def getKevoreeContainer = kevoreeContainer

  def setKevoreeContainer(ct: Option[String]) {
    kevoreeContainer = ct
  }


}
