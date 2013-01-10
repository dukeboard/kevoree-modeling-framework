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


package org.kevoree.tools.ecore.kotlin.gencode.model

import java.io.{File, FileOutputStream, PrintWriter}
import scala.collection.JavaConversions._
import org.eclipse.emf.ecore.{EClass, EPackage}
import org.kevoree.tools.ecore.kotlin.gencode.{GenerationContext, ProcessorHelper}

/**
 * Created by IntelliJ IDEA.
 * User: Gregory NAIN
 * Date: 23/09/11
 * Time: 13:35
 */

trait PackageFactoryGenerator {


  def generatePackageFactory(ctx:GenerationContext, packageGenDir: String, packElement: EPackage , modelVersion : String) {
    var formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase
    formatedFactoryName += packElement.getName.substring(1)
    formatedFactoryName += "Factory"

    val localFile = new File(packageGenDir + "/" + formatedFactoryName + ".kt")
    val pr = new PrintWriter(localFile,"utf-8")

    val packageName = ProcessorHelper.fqn(ctx, packElement)

    pr.println("package " + packageName + ";")
    pr.println()
    pr.println("import " + packageName + ".impl.*;")
    pr.println()
    pr.println(ProcessorHelper.generateHeader(packElement))
    //case class name
    pr.println("object " + formatedFactoryName + " {")
    pr.println()
    pr.println("\t fun eINSTANCE() = " + formatedFactoryName)
    pr.println("\t fun getVersion() = \""+ modelVersion+"\"")
    pr.println()
    packElement.getEClassifiers.filter(cls=>cls.isInstanceOf[EClass]).foreach {
      cls =>
        val methodName = "create" + cls.getName
        pr.println("\t fun " + methodName + "() : " + cls.getName + " { return " + cls.getName + "Impl() }")
    }
    pr.println()
    pr.println("}")

    pr.flush()
    pr.close()

  }


}