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


package org.kevoree.modeling.kotlin.generator

import java.io.{PrintWriter, File}
import java.text.SimpleDateFormat
import java.util.Date
import org.eclipse.emf.common.util.EList
import org.eclipse.emf.ecore.xmi.XMIResource
import scala.collection.JavaConversions._
import collection.mutable.Buffer
import org.eclipse.emf.ecore._
import io.Source


/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 22/09/11
 * Time: 09:49
 */

object ProcessorHelper {

  private val helper = new ProcessorHelperClass


  def getEClassInEPackage(ePackage : EPackage) : java.util.List[EClass] = {
    helper.getEClassInEPackage(ePackage)
  }


  def checkOrCreateFolder(path: String) {
    helper.checkOrCreateFolder(path)
  }


  def convertType(aType: EDataType): String = {
   helper.convertType(aType)
  }

  def convertType(theType: String): String = {
    helper.convertType(theType)
  }

  def protectReservedWords(word: String): String = {
    helper.protectReservedWords(word)
  }

  def generateHeader(packElement: EPackage): String = {
    helper.generateHeader(packElement)
  }


  def generateSuperTypes(ctx: GenerationContext, cls: EClass, packElement: EPackage): Option[String] = {
    helper.generateSuperTypes(ctx, cls, packElement)
  }

  def generateSuperTypesPlusSuperAPI(ctx: GenerationContext, cls: EClass, packElement: EPackage): Option[String] = {
    helper.generateSuperTypesPlusSuperAPI(ctx, cls, packElement)
  }


  def getAllConcreteSubTypes(iface: EClass): java.util.List[EClass] = {
    helper.getAllConcreteSubTypes(iface)
  }

  def getDirectConcreteSubTypes(iface: EClass): List[EClass] = {
    helper.getDirectConcreteSubTypes(iface)
  }


  def getPackageGenDir(ctx: GenerationContext, pack: EPackage): String = {
    helper.getPackageGenDir(ctx, pack)
  }

  def getPackageUserDir(ctx: GenerationContext, pack: EPackage): String = {
    helper.getPackageUserDir(ctx, pack)
  }


  /**
   * Computes the Fully Qualified Name of the package in the context of the model.
   * @param pack the package which FQN has to be computed
   * @return the Fully Qualified package name
   */
  def fqn(pack: EPackage): String = {
    helper.fqn(pack)
  }

  /**
   * Computes the Fully Qualified Name of the package in the context of the generation (i.e. including the package prefix if any).
   * @param ctx the generation context
   * @param pack the package which FQN has to be computed
   * @return the Fully Qualified package name
   */
  def fqn(ctx: GenerationContext, pack: EPackage): String = {
    helper.fqn(ctx, pack)
  }

  /**
   * Computes the Fully Qualified Name of the class in the context of the model.
   * @param cls the class which FQN has to be computed
   * @return the Fully Qualified Class name
   */
  def fqn(cls: EClassifier): String = {
    helper.fqn(cls)
  }

  /**
   * Computes the Fully Qualified Name of the class in the context of the generation (i.e. including the package prefix if any).
   * @param ctx the generation context
   * @param cls the class which FQN has to be computed
   * @return the Fully Qualified Class name
   */
  def fqn(ctx: GenerationContext, cls: EClassifier): String = {
    helper.fqn(ctx, cls)
  }

  def collectAllClassifiersInModel(model : XMIResource) : java.util.ArrayList[EClassifier] = {
    helper.collectAllClassifiersInModel(model : XMIResource)
  }


  def collectAllClassifiersInPackage(pack : EPackage) : java.util.ArrayList[EClassifier] = {
    helper.collectAllClassifiersInPackage(pack)
  }

}