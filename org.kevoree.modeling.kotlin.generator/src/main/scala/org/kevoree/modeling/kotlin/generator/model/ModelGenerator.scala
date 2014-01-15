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
package org.kevoree.modeling.kotlin.generator.model

import org.eclipse.emf.ecore.resource.ResourceSet
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}
import org.eclipse.emf.ecore._
import scala.collection.JavaConversions._

/**
 * Created by IntelliJ IDEA.
 * User: gregory.nain
 * Date: 21/03/12
 * Time: 14:02
 * To change this template use File | Settings | File Templates.
 */

class ModelGenerator(ctx: GenerationContext) extends TraitGenerator
with PackageFactoryGenerator
with ClassGenerator
with ClonerGenerator
with EnumGenerator
with KMFQLFinder
with KMFQLSelectorGenerator
with APIGenerator
with ContainedElementsGenerator
with DiffGenerator
with ConstantsGenerator {

  /**
   * Processes the generation of the model classes. Goes deep in packages hierarchy then generate files.
   * @param model the XMIResource to be generated
   * @param modelVersion the version of the model to be included in headers
   */
  def process(model: ResourceSet, modelVersion: String) {

    if (ctx.genSelector) {
      generateSelectorCache(ctx, ProcessorHelper.getPackageGenDir(ctx, ctx.basePackageForUtilitiesGeneration), ctx.basePackageForUtilitiesGeneration)
    }
    generateConstants(ctx, model)
    generateCloner(ctx, ctx.basePackageForUtilitiesGeneration, model)

    val loaderGenBaseDir = ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath
    ProcessorHelper.checkOrCreateFolder(loaderGenBaseDir)

    generateModelTraceAPI(ctx, loaderGenBaseDir)
    generateModelTraceCompare(ctx, loaderGenBaseDir)
    model.getAllContents.filter(c => c.isInstanceOf[EClassifier]).foreach{ potentialRoot2 =>

      val potentialRoot = potentialRoot2.asInstanceOf[EClassifier]
        val currentPackage = potentialRoot.getEPackage
        val currentPackageDir = ProcessorHelper.getPackageGenDir(ctx, currentPackage)
        val userPackageDir = ProcessorHelper.getPackageUserDir(ctx, currentPackage)
        ProcessorHelper.checkOrCreateFolder(currentPackageDir)
        if (currentPackage.getEClassifiers.size() != 0) {
          ProcessorHelper.checkOrCreateFolder(currentPackageDir + "/impl")
          generatePackageFactory(ctx, currentPackageDir, currentPackage, modelVersion)
          generatePackageFactoryDefaultImpl(ctx, currentPackageDir, currentPackage, modelVersion)
          if (ctx.flyweightFactory) {
            generateFlyweightFactory(ctx, currentPackageDir, currentPackage, modelVersion)
          }
        }
        process(currentPackageDir, currentPackage, potentialRoot, userPackageDir,ctx.newMetaClasses.exists(m => m.packageName+"."+m.name == ProcessorHelper.fqn(ctx,potentialRoot)))
    }
  }


  private def process(currentPackageDir: String, packElement: EPackage, cls: EClassifier, userPackageDir: String, isHiddenMetaClass : Boolean) {
    cls match {
      case cl: EClass => {
        if (!cl.isAbstract && !cl.isInterface) {
          generateFlatClass(ctx, currentPackageDir, packElement, cl)
        }
        if(!isHiddenMetaClass){
          generateAPI(ctx, currentPackageDir, packElement, cl, userPackageDir)
        }
      }
      case dt: EDataType => {
        dt match {
          case enum: EEnum => generateEnum(ctx, currentPackageDir, packElement, enum)
          case _ => System.out.println("Generic DataType " + cls.getName + " ignored for generation.")
        }
      }
      case _ => println("No processor found for classifier: " + cls)
    }

  }

}
