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


package org.kevoree.tools.ecore.kotlin.gencode.model

import org.eclipse.emf.ecore.EPackage
import java.io.{File, FileOutputStream, PrintWriter}
import org.kevoree.tools.ecore.kotlin.gencode.{GenerationContext, ProcessorHelper}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 23/09/11
 * Time: 13:35
 */

trait TraitGenerator {


  def generateContainerAPI(ctx: GenerationContext, packageGenDir: String, packElement: EPackage) {
    var formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase
    formatedFactoryName += packElement.getName.substring(1)
    formatedFactoryName += "Container"
    ProcessorHelper.checkOrCreateFolder(packageGenDir)
    val localFile = new File(packageGenDir + "/" + formatedFactoryName + ".kt")
    val pr = new PrintWriter(localFile, "utf-8")
    pr.println("package " + ProcessorHelper.fqn(ctx, packElement) + ";")
    pr.println()
    pr.println(ProcessorHelper.generateHeader(packElement))
    //case class name
    pr.println("trait " + formatedFactoryName + " {")

    pr.println("fun setRecursiveReadOnly() : Unit")
    pr.println("fun eContainer() : " + formatedFactoryName + "?")
    pr.println("fun isReadOnly() : Boolean")
    pr.println("fun setInternalReadOnly()")

    pr.println("fun selectByQuery(query : String) : List<Any>")

    pr.println("fun findByPath<A>(query : String, clazz : Class<A>) : A?")
    pr.println("fun findByPath(query : String) : Any?")




    pr.println("}")

    pr.flush()
    pr.close()


  }


  def generateContainerTrait(ctx: GenerationContext, packageGenDir: String, packElement: EPackage) {
    var formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase
    formatedFactoryName += packElement.getName.substring(1)
    formatedFactoryName += "Container"
    ProcessorHelper.checkOrCreateFolder(packageGenDir + "/impl/")
    val localFile = new File(packageGenDir + "/impl/" + formatedFactoryName + "Internal.kt")
    val pr = new PrintWriter(localFile, "utf-8")

    pr.println("package " + ProcessorHelper.fqn(ctx, packElement) + ".impl;")
    pr.println()
    pr.println(ProcessorHelper.generateHeader(packElement))
    //case class name
    pr.println("trait " + formatedFactoryName + "Internal {")
    pr.println()
    pr.println("internal open var internal_eContainer : " + ProcessorHelper.fqn(ctx, packElement) + "." + formatedFactoryName + "?")
    pr.println("internal open var internal_unsetCmd : (()->Unit)?")

    //generate getter
    pr.println("fun eContainer() : " + ProcessorHelper.fqn(ctx, packElement) + "." + formatedFactoryName + "? { return internal_eContainer }")

    pr.println("internal open var internal_readOnlyElem : Boolean")

    pr.println("open fun setRecursiveReadOnly()")

    pr.println("fun setInternalReadOnly(){")
    pr.println("internal_readOnlyElem = true")
    pr.println("}")

    pr.println("fun isReadOnly() : Boolean {")
    pr.println("return internal_readOnlyElem")
    pr.println("}")

    //generate setter
    pr.print("\nfun setEContainer( container : " + ProcessorHelper.fqn(ctx, packElement) + "." + formatedFactoryName + "?, unsetCmd : (()->Unit)? ) {\n")
    pr.println("if(internal_readOnlyElem){throw Exception(\"ReadOnly Element are not modifiable\")}")
    pr.println("val tempUnsetCmd = internal_unsetCmd")
    pr.println("internal_unsetCmd = null")

    pr.println("if(tempUnsetCmd != null){")
    pr.println("tempUnsetCmd()")
    pr.println("}")

    pr.println("internal_eContainer = container\n")
    pr.println("internal_unsetCmd = unsetCmd")
    pr.println("}")

    pr.println("fun internalGetQuery(selfKey : String) : String? { return null }")

    pr.println("}")

    pr.flush()
    pr.close()

    ctx.setKevoreeContainer(Some(ProcessorHelper.fqn(ctx, packElement) + "." + formatedFactoryName))
    ctx.setKevoreeContainerImplFQN(ProcessorHelper.fqn(ctx, packElement) + ".impl." + formatedFactoryName+"Internal")

  }

}