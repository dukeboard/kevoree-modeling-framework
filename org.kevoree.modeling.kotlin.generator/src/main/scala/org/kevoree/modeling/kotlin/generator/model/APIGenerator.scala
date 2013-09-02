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

import org.eclipse.emf.ecore._
import org.kevoree.modeling.kotlin.generator.ProcessorHelper._
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}
import java.io.{PrintWriter, File}
import scala.collection.JavaConversions._
import scala.Some

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 14/02/13
 * Time: 10:37
 */
trait APIGenerator extends ClassGenerator {

  def generateAPI(ctx: GenerationContext, currentPackageDir: String, packElement: EPackage, cls: EClass, srcCurrentDir: String) {
    val localFile = new File(currentPackageDir + "/" + cls.getName + ".kt")
    val pr = new PrintWriter(localFile, "utf-8")
    val pack = ProcessorHelper.fqn(ctx, packElement)
    pr.println("package " + pack + "")
    pr.println()
    pr.println(generateHeader(packElement))
    pr.print("trait " + cls.getName)
    pr.println((generateSuperTypes(ctx, cls, packElement) match {
      case None => "{"
      case Some(s) => s + " {"
    }))

    cls.getEAttributes.foreach {
      att =>
        if (cls.getEAllAttributes.exists(att2 => att2.getName.equals(att.getName) && att2.getEContainingClass != cls)) {} else {
          if(att.isMany){
            pr.println("public open var " + ProcessorHelper.protectReservedWords(att.getName) + " : List<" + ProcessorHelper.convertType(att.getEAttributeType, ctx) + ">?")
          } else {
            pr.println("public open var " + ProcessorHelper.protectReservedWords(att.getName) + " : " + ProcessorHelper.convertType(att.getEAttributeType, ctx) + "?")
          }
        }
    }

    //Kotlin workaround // Why prop are not generated properly ?
    if(ctx.getJS()){
      cls.getEAttributes.foreach { att =>
        if(att.isMany){
          pr.println("public fun get"+toCamelCase(att)+"()"+" : List<" + ProcessorHelper.convertType(att.getEAttributeType, ctx) + ">")
          pr.println("public fun set"+toCamelCase(att)+"(p"+" : List<" + ProcessorHelper.convertType(att.getEAttributeType, ctx) + ">)")
        } else {
          pr.println("public fun get"+toCamelCase(att)+"() : "+ProcessorHelper.convertType(att.getEAttributeType, ctx)+"?")
          pr.println("public fun set"+toCamelCase(att)+"(p : "+ProcessorHelper.convertType(att.getEAttributeType, ctx)+"?)")
        }
      }
      cls.getEReferences.foreach { ref =>
        val typeRefName = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
        if(ref.isMany){
          pr.println("public fun get"+toCamelCase(ref)+"()"+" : List<" + typeRefName + ">")
          pr.println("public fun set"+toCamelCase(ref)+"(p"+" : List<" + typeRefName + ">)")
        } else {
          pr.println("public fun get"+toCamelCase(ref)+"() : "+typeRefName+"?")
          pr.println("public fun set"+toCamelCase(ref)+"(p : "+typeRefName+"?)")
        }
      }
    }
    //end kotlin workaround

    cls.getEReferences.foreach {
      ref =>
        val typeRefName = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
        if (ref.isMany) {
          pr.println("open var " + protectReservedWords(ref.getName) + " : List<" + typeRefName + ">")
          generateAddMethod(pr, cls, ref, typeRefName)
          generateAddAllMethod(pr, cls, ref, typeRefName)
          generateRemoveMethod(pr, cls, ref, typeRefName)
          generateRemoveAllMethod(pr, cls, ref, typeRefName)
          pr.println("fun find" + toCamelCase(ref) + "ByID(key : String?) : " + protectReservedWords(ProcessorHelper.fqn(ctx, ref.getEReferenceType)) + "?")
        } else {
          pr.println("open var " + protectReservedWords(ref.getName) + " : " + typeRefName + "?")
        }
    }
    /* Then generated user method */
    /* next we generated custom method */
    cls.getEAllOperations.filter(op => op.getName != "eContainer").foreach {
      op =>

        if(op.getEContainingClass != cls){
          pr.print("override ")
        }
        pr.print("fun " + op.getName + "(")
        var isFirst = true
        op.getEParameters.foreach {
          p =>
            if (!isFirst) {
              pr.println(",")
            }
            val returnTypeP = if (p.getEType.isInstanceOf[EDataType]) {
              ProcessorHelper.convertType(p.getEType.getName)
            } else {
              ProcessorHelper.fqn(ctx, p.getEType)
            }
            pr.print(p.getName() + "P :" + returnTypeP)
            isFirst = false
        }
        if (op.getEType != null) {

          val returnTypeOP = if (op.getEType.isInstanceOf[EDataType]) {
            ProcessorHelper.convertType(op.getEType.getName)
          } else {
            ProcessorHelper.fqn(ctx, op.getEType)
          }

          pr.println("):" + returnTypeOP + ";")
        } else {
          pr.println("):Unit;")
        }
    }
    pr.println("}")
    pr.flush()
    pr.close()
  }

  private def generateAddAllMethod(pr: PrintWriter, cls: EClass, ref: EReference, typeRefName: String) {
    pr.println("fun addAll" + toCamelCase(ref) + "(" + protectReservedWords(ref.getName) + " :List<" + typeRefName + ">)")
  }

  private def generateAddMethod(pr: PrintWriter, cls: EClass, ref: EReference, typeRefName: String) {
    pr.println("fun add" + toCamelCase(ref) + "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ")")
  }

  private def generateRemoveMethod(pr: PrintWriter, cls: EClass, ref: EReference, typeRefName: String) {
    pr.println("fun remove" + toCamelCase(ref) + "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ")")
  }

  private def generateRemoveAllMethod(pr: PrintWriter, cls: EClass, ref: EReference, typeRefName: String) {
    pr.println("fun removeAll" + toCamelCase(ref) + "()")
  }

  private def toCamelCase(ref: EReference): String = {
    return ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
  }

  private def toCamelCase(att: EAttribute): String = {
    return att.getName.substring(0, 1).toUpperCase + att.getName.substring(1)
  }




}
