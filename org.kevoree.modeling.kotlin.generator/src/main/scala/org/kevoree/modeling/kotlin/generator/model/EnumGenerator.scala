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

import org.apache.velocity.app.VelocityEngine
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader
import org.apache.velocity.VelocityContext
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

    var localFile : File = null;
    if(ctx.getJS()){
      localFile = new File(currentPackageDir + "/" + formattedEnumName + ".kt")
    } else {
      localFile = new File(currentPackageDir + "/" + formattedEnumName + ".java")
    }

    val pr = new PrintWriter(localFile, "utf-8")

    val packageName = ProcessorHelper.fqn(ctx, packElement)

    //Header
    pr.println("package " + packageName + ";")
    pr.println()
    pr.println()

    pr.println(ProcessorHelper.generateHeader(packElement))

    //Class core

    if(ctx.getJS()){
      pr.println("enum class " + formattedEnumName + " {")
    } else {
      pr.println("public enum " + formattedEnumName + " {")
    }


    import scala.collection.JavaConversions._
    var i = 0
    en.getELiterals.foreach {
      enumLit =>
        if(i!=0){
          if(!ctx.getJS()){
             pr.println(",")
          }
        }

        pr.println(enumLit.getName.toUpperCase)
        i = i + 1
    }
pr.println("}")

    pr.flush()
    pr.close()
  }


  def generateActionTypeClass(ctx : GenerationContext) {
    ProcessorHelper.checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "util")

    val extension = if(ctx.getJS()){"kt"}else{"java"}

    val localFile = new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "util" + File.separator + "ActionType."+extension)
    val pr = new PrintWriter(localFile, "utf-8")

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()

    val template = if(ctx.getJS()){ve.getTemplate("templates/util/JSActionType.vm")}else{ve.getTemplate("templates/util/ActionType.vm")}
    val ctxV = new VelocityContext()
    ctxV.put("ctx",ctx)
    ctxV.put("FQNHelper",new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    template.merge(ctxV,pr)
    pr.flush()
    pr.close()

  }

  def generateElementAttributeTypeClass(ctx : GenerationContext) {
    ProcessorHelper.checkOrCreateFolder(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "util")

    val extension = if(ctx.getJS()){"kt"}else{"java"}

    val localFile = new File(ctx.getBaseLocationForUtilitiesGeneration.getAbsolutePath + File.separator + "util" + File.separator + "ElementAttributeType."+extension)
    val pr = new PrintWriter(localFile, "utf-8")

    val ve = new VelocityEngine()
    ve.setProperty("file.resource.loader.class", classOf[ClasspathResourceLoader].getName())
    ve.init()

    val template = if(ctx.getJS()){ve.getTemplate("templates/util/JSElementAttributeType.vm")}else{ve.getTemplate("templates/util/ElementAttributeType.vm")}
    val ctxV = new VelocityContext()
    ctxV.put("ctx",ctx)
    ctxV.put("FQNHelper",new org.kevoree.modeling.kotlin.generator.ProcessorHelperClass())
    template.merge(ctxV,pr)
    pr.flush()
    pr.close()

  }


}
