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

import java.io._
import org.eclipse.emf.ecore.xmi.XMIResource
import org.eclipse.emf.ecore._


/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 22/09/11
 * Time: 09:49
 */

object ProcessorHelper {


  def copyFromStream(intputStream: InputStream,name: String, target: String) {
    val targetFile = new File(new File(target.replace("/",File.separator)), name.replace("/",File.separator))
    targetFile.getParentFile.mkdirs()
    val out = new FileOutputStream(targetFile)
    val src = intputStream
    val buffer = new Array[Byte](1024)
    var len = src.read(buffer)
    while (len != -1) {
      out.write(buffer, 0, len)
      len = src.read(buffer)
      if (Thread.interrupted()) {
        throw new InterruptedException()
      }
    }
  }

  def copyFromStream(name: String, target: String) {
    val targetFile = new File(new File(target.replace("/",File.separator)), name.replace("/",File.separator))
    targetFile.getParentFile.mkdirs()
    val out = new FileOutputStream(targetFile)
    val src = ProcessorHelper.getClass.getClassLoader.getResourceAsStream(name)
    val buffer = new Array[Byte](1024)
    var len = src.read(buffer)
    while (len != -1) {
      out.write(buffer, 0, len)
      len = src.read(buffer)
      if (Thread.interrupted()) {
        throw new InterruptedException()
      }
    }
  }

  private val helper = new ProcessorHelperClass


  def getEClassInEPackage(ePackage: EPackage): java.util.List[EClass] = {
    helper.getEClassInEPackage(ePackage)
  }


  def checkOrCreateFolder(path: String) {
    helper.checkOrCreateFolder(path)
  }

  def convertJType(aType: EDataType): String = {
    helper.convertJType(aType)
  }

  def convertType(aType: EDataType): String = {
    helper.convertType(aType)
  }

  def convertJType(theType: String): String = {
    helper.convertJType(theType)
  }

  def convertType(theType: String): String = {
    helper.convertType(theType)
  }

  def protectReservedWords(word: String): String = {
    helper.protectReservedWords(word)
  }

  def protectReservedJWords(word: String): String = {
    helper.protectReservedJWords(word)
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

  def collectAllClassifiersInModel(model: XMIResource): java.util.ArrayList[EClassifier] = {
    helper.collectAllClassifiersInModel(model: XMIResource)
  }


  def collectAllClassifiersInPackage(pack: EPackage): java.util.ArrayList[EClassifier] = {
    helper.collectAllClassifiersInPackage(pack)
  }

}