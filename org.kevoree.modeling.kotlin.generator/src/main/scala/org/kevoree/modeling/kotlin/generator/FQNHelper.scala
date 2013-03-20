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

import org.eclipse.emf.ecore.{EClassifier, EPackage}

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 20/03/13
 * Time: 12:00
 * To change this template use File | Settings | File Templates.
 */
class FQNHelper {


  def protectReservedWords(word: String): String = {
    word match {
      case "type" => "`type`"
      case "object" => "`object`"
      case "requires" => "`requires`"
      case _ => word //throw new UnsupportedOperationException("ProcessorHelper::protectReservedWords::No matching found for word: " + word);null
    }
  }

  /**
   * Computes the Fully Qualified Name of the package in the context of the model.
   * @param pack the package which FQN has to be computed
   * @return the Fully Qualified package name
   */
  def fqn(pack: EPackage): String = {
    var locFqn = protectReservedWords(pack.getName)
    var parentPackage = pack.getESuperPackage
    while (parentPackage != null) {
      locFqn = parentPackage.getName + "." + locFqn
      parentPackage = parentPackage.getESuperPackage
    }
    locFqn
  }

  /**
   * Computes the Fully Qualified Name of the package in the context of the generation (i.e. including the package prefix if any).
   * @param ctx the generation context
   * @param pack the package which FQN has to be computed
   * @return the Fully Qualified package name
   */
  def fqn(ctx: GenerationContext, pack: EPackage): String = {
    ctx.getPackagePrefix match {
      case Some(prefix) => {
        if (prefix.endsWith(".")) {
          prefix + fqn(pack)
        } else {
          prefix + "." + fqn(pack)
        }
      }
      case None => fqn(pack)
    }
  }

  /**
   * Computes the Fully Qualified Name of the class in the context of the model.
   * @param cls the class which FQN has to be computed
   * @return the Fully Qualified Class name
   */
  def fqn(cls: EClassifier): String = {
    fqn(cls.getEPackage) + "." + cls.getName
  }

  /**
   * Computes the Fully Qualified Name of the class in the context of the generation (i.e. including the package prefix if any).
   * @param ctx the generation context
   * @param cls the class which FQN has to be computed
   * @return the Fully Qualified Class name
   */
  def fqn(ctx: GenerationContext, cls: EClassifier): String = {
    fqn(ctx, cls.getEPackage) + "." + cls.getName
  }

}
