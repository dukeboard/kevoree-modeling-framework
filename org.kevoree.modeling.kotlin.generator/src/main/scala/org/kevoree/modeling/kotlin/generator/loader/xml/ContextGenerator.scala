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


package org.kevoree.modeling.kotlin.generator.loader.xml

import java.io.{File, PrintWriter}
import org.eclipse.emf.ecore.EClass
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 25/09/11
 * Time: 15:25
 */

class ContextGenerator(ctx:GenerationContext, genDir: String, genPackage: String, elementType: EClass, modelPackage : String) {


  def generateContext() {

    val localFile = new File(genDir + "/" + elementType.getName + "LoadContext.kt")
     val pr = new PrintWriter(localFile,"utf-8")

    pr.println("package " + genPackage)
    pr.println()
    pr.println("import javax.xml.stream.XMLStreamReader")
    pr.println()

    pr.println("class " + elementType.getName + "LoadContext(reader : XMLStreamReader) {")

    pr.println()
    pr.println("\t\tvar xmiReader : XMLStreamReader = reader")
    pr.println()
    pr.println("\t\tvar "+elementType.getName.substring(0,1).toLowerCase + elementType.getName.substring(1)+" : "+ ProcessorHelper.fqn(ctx,elementType)+"? = null")
    pr.println()
    pr.println("\t\tvar loaded_"+elementType.getName.substring(0,1).toLowerCase + elementType.getName.substring(1)+" : MutableList<"+ ProcessorHelper.fqn(ctx,elementType)+"> = java.util.ArrayList<"+ProcessorHelper.fqn(ctx,elementType)+">()")
    pr.println()
    pr.println("\t\tval map : java.util.HashMap<String, Any> = java.util.HashMap<String, Any>()")
    pr.println()
    pr.println("\t\tval elementsCount : java.util.HashMap<String, Int> = java.util.HashMap<String, Int>()")
    pr.println()
    pr.println("\t\tval resolvers : MutableList<() -> Unit> = java.util.ArrayList<() -> Unit>()")
    pr.println()
    pr.println("\t\tval stats : java.util.HashMap<String, Int> = java.util.HashMap<String, Int>()")
    pr.println()
    //pr.println("\t\tvar factory : " + ctx.factoryPackage + "." + ctx.factoryName + " = " + ctx.factoryPackage + ".impl.Default" + ctx.factoryName + "()")
    //pr.println()

    pr.println("}")

    pr.flush()
    pr.close()

  }

}