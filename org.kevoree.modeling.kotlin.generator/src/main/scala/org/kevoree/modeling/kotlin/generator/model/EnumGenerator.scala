package org.kevoree.modeling.kotlin.generator.model

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

import org.eclipse.emf.ecore.{EPackage, EEnum}
import java.io.{File, PrintWriter}
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}


/**
 * Created by IntelliJ IDEA.
 * User: gregory.nain
 * Date: 20/03/12
 * Time: 13:31
 * To change this template use File | Settings | File Templates.
 */

trait EnumGenerator {

  def generateEnum(ctx : GenerationContext, currentPackageDir: String, packElement: EPackage, en: EEnum) {
    var formattedEnumName: String = en.getName.substring(0, 1).toUpperCase
    formattedEnumName += en.getName.substring(1)

    val localFile = new File(currentPackageDir + "/" + formattedEnumName + ".kt")
    val pr = new PrintWriter(localFile, "utf-8")

    val packageName = ProcessorHelper.fqn(ctx, packElement)

    //Header
    pr.println("package " + packageName + ";")
    pr.println()
    pr.println()

    pr.println(ProcessorHelper.generateHeader(packElement))

    //Class core
    pr.println("enum class " + formattedEnumName + " {")
    import scala.collection.JavaConversions._
    en.getELiterals.foreach {
      enumLit =>
        pr.println(enumLit.getName.toUpperCase)
    }

    pr.println("}")

    pr.flush()
    pr.close()
  }

}
