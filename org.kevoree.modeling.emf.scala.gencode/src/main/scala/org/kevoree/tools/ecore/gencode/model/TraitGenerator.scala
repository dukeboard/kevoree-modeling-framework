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

import org.eclipse.emf.ecore.EPackage
import java.io.{File, FileOutputStream, PrintWriter}
import org.kevoree.tools.ecore.gencode.{GenerationContext, ProcessorHelper}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 23/09/11
 * Time: 13:35
 */

trait TraitGenerator {


  def generateContainerTrait(ctx : GenerationContext, packageGenDir: String, packElement: EPackage) {
    var formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase
    formatedFactoryName += packElement.getName.substring(1)
    formatedFactoryName += "Container"

    val pr = new PrintWriter(new File(packageGenDir + "/" + formatedFactoryName + ".scala"),"utf-8")


    pr.println("package " + ProcessorHelper.fqn(ctx, packElement) + ";")
    pr.println()
    //pr.println("import " + pack + ".;")
    pr.println()

    pr.println(ProcessorHelper.generateHeader(packElement))

    //case class name
    pr.println("trait " + formatedFactoryName + " {")
    pr.println()
    pr.println("\t private var internal_eContainer : " + formatedFactoryName + " = null")
    pr.println("\t private var internal_unsetCmd : Option[()=>Any] = None ")

    //generate getter
    pr.println("\tdef eContainer = internal_eContainer")

    pr.println("\tprivate var readOnlyElem = false")
    pr.println("\tdef setReadOnly(){")
    pr.println("\t\treadOnlyElem = true")
    pr.println("\t}")

    pr.println("\tdef isReadOnly() : Boolean = {")
    pr.println("\t\treadOnlyElem")
    pr.println("\t}")

    //generate setter
    pr.print("\n\tdef setEContainer( container : " + formatedFactoryName + ", unsetCmd : Option[()=>Any] ) {\n")
    pr.println("\t\tif(readOnlyElem){throw new Exception(\"ReadOnly Element are not modifiable\")}")
    pr.println("\t\tval tempUnsetCmd = internal_unsetCmd")
    pr.println("\t\tinternal_unsetCmd = None")
    pr.println("\t\ttempUnsetCmd.map{inCmd => inCmd() }")
    pr.println("\t\tthis.internal_eContainer = container\n")
    pr.println("\t\tinternal_unsetCmd = unsetCmd")
    pr.println("\t}")
    pr.println("}")
    pr.flush()
    pr.close()

    ctx.setKevoreeContainer(Some(ProcessorHelper.fqn(ctx, packElement) +"." +formatedFactoryName))
  }

}