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


package org.kevoree.tools.ecore.gencode.loader

import java.io.{File, FileOutputStream, PrintWriter}
import org.eclipse.emf.ecore.EClass

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 25/09/11
 * Time: 15:25
 */

class ContextGenerator(genDir: String, genPackage: String, elementType: EClass, modelPackage : String) {


  def generateContext() {
     val pr = new PrintWriter(new File(genDir + "/" + elementType.getName + "LoadContext.scala"),"utf-8")

    pr.println("package " + genPackage + ";")
    pr.println()
    pr.println("import xml.NodeSeq")
    pr.println("import " + modelPackage + "._")
    pr.println()

    pr.println("class " + elementType.getName + "LoadContext {")

    pr.println()
    pr.println("\t\tvar xmiContent : NodeSeq = null")
    pr.println()
    pr.println("\t\tvar "+elementType.getName.substring(0,1).toLowerCase + elementType.getName.substring(1)+" : "+elementType.getName+" = null")
    pr.println()
    pr.println("\t\tvar map : Map[String, Any] = null")
    pr.println()
    pr.println("\t\tvar stats : Map[String, Int] = null")
    pr.println()

    pr.println("}")

    pr.flush()
    pr.close()
  }

}