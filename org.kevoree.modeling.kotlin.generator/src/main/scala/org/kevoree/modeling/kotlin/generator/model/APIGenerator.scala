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
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}
import java.io.{FileOutputStream, PrintWriter, File}
import scala.collection.JavaConversions._
import java.util
import scala.Some

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 14/02/13
 * Time: 10:37
 */
trait APIGenerator {

  def generateAPI(ctx: GenerationContext, currentPackageDir: String, packElement: EPackage, cls: EClass, srcCurrentDir: String) {

    val localFile = new File(currentPackageDir + "/api.kt")
    val first = !localFile.exists()
    val localFileS = new FileOutputStream(localFile, true)
    val pr = new PrintWriter(localFileS)
    val pack = ProcessorHelper.getInstance().fqn(ctx, packElement)
    if (first) {
      pr.println("package " + pack + "")
      pr.println()
    }
    pr.print("trait " + cls.getName)
    pr.println(ProcessorHelper.getInstance().generateSuperTypes(ctx, cls, packElement) + " {")
    cls.getEAttributes.foreach {
      att =>
        if (cls.getEAllAttributes.exists(att2 => att2.getName.equals(att.getName) && att2.getEContainingClass != cls)) {} else {
          if (att.isMany) {
            pr.println("public open var " + ProcessorHelper.getInstance().protectReservedWords(att.getName) + " : List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType, ctx) + ">?")
          } else {
            pr.println("public open var " + ProcessorHelper.getInstance().protectReservedWords(att.getName) + " : " + ProcessorHelper.getInstance().convertType(att.getEAttributeType, ctx) + "?")
          }
        }
    }
    //Kotlin workaround // Why prop are not generated properly ?
    if (ctx.js && ctx.ecma3compat) {
      ProcessorHelper.getInstance().noduplicate(cls.getEAttributes).foreach {
        att =>

          if (cls.getEAllAttributes.exists(att2 => att2.getName.equals(att.getName) && att2.getEContainingClass != cls)) {

          } else {
            if (att.isMany) {
              pr.println("public fun get" + ProcessorHelper.getInstance().toCamelCase(att) + "()" + " : List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType, ctx) + ">")
              pr.println("public fun set" + ProcessorHelper.getInstance().toCamelCase(att) + "(p" + " : List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType, ctx) + ">)")
            } else {
              pr.println("public fun get" + ProcessorHelper.getInstance().toCamelCase(att) + "() : " + ProcessorHelper.getInstance().convertType(att.getEAttributeType, ctx) + "?")
              pr.println("public fun set" + ProcessorHelper.getInstance().toCamelCase(att) + "(p : " + ProcessorHelper.getInstance().convertType(att.getEAttributeType, ctx) + "?)")
            }
          }
      }
      cls.getEReferences.foreach {
        ref =>

          if (cls.getEAllReferences.exists(ref2 => ref2.getName.equals(ref.getName) && ref2.getEContainingClass != cls)) {

          } else {
            val typeRefName = ProcessorHelper.getInstance().fqn(ctx, ref.getEReferenceType)
            if (ref.isMany) {
              pr.println("public fun get" + ProcessorHelper.getInstance().toCamelCase(ref) + "()" + " : List<" + typeRefName + ">")
              pr.println("public fun set" + ProcessorHelper.getInstance().toCamelCase(ref) + "(p" + " : List<" + typeRefName + ">)")
            } else {
              pr.println("public fun get" + ProcessorHelper.getInstance().toCamelCase(ref) + "() : " + typeRefName + "?")
              pr.println("public fun set" + ProcessorHelper.getInstance().toCamelCase(ref) + "(p : " + typeRefName + "?)")
            }
          }
      }
    }
    //end kotlin workaround
    cls.getEReferences.foreach {
      ref =>
        if (cls.getEAllReferences.exists(ref2 => ref2.getName.equals(ref.getName) && ref2.getEContainingClass != cls)) {
        } else {
          val typeRefName = ProcessorHelper.getInstance().fqn(ctx, ref.getEReferenceType)
          if (ref.isMany) {
            pr.println("open var " + ProcessorHelper.getInstance().protectReservedWords(ref.getName) + " : List<" + typeRefName + ">")
            generateAddMethod(pr, cls, ref, typeRefName)
            generateAddAllMethod(pr, cls, ref, typeRefName)
            generateRemoveMethod(pr, cls, ref, typeRefName)
            generateRemoveAllMethod(pr, cls, ref, typeRefName)
            pr.println("fun find" + ProcessorHelper.getInstance().toCamelCase(ref) + "ByID(key : String) : " + ProcessorHelper.getInstance().protectReservedWords(ProcessorHelper.getInstance().fqn(ctx, ref.getEReferenceType)) + "?")
          } else {
            pr.println("open var " + ProcessorHelper.getInstance().protectReservedWords(ref.getName) + " : " + typeRefName + "?")
          }
        }
    }
    /* Then generated user method */
    /* next we generated custom method */

    def matchEOperation(op1: EOperation, op2: EOperation): Boolean = {
      if (op1.getName != op2.getName) {
        return false
      }
      op1.getEParameters.foreach {
        opP =>
          if (!op2.getEParameters.exists(op2P => {
            opP.getName == op2P.getName && ProcessorHelper.getInstance().fqn(opP.getEType) == ProcessorHelper.getInstance().fqn(op2P.getEType)
          })) {
            return false
          }
      }
      op2.getEParameters.foreach {
        opP =>
          if (!op1.getEParameters.exists(op2P => {
            opP.getName == op2P.getName && ProcessorHelper.getInstance().fqn(opP.getEType) == ProcessorHelper.getInstance().fqn(op2P.getEType)
          })) {
            return false
          }
      }
      true
    }

    val alreadyGenerated = new util.ArrayList[EOperation]()

    cls.getEAllOperations.filter(op => op.getName != "eContainer").foreach {
      op =>

        if (!alreadyGenerated.exists(preOp => matchEOperation(preOp, op))) {
          alreadyGenerated.add(op)

          if (op.getEContainingClass != cls) {
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
                ProcessorHelper.getInstance().convertType(p.getEType.getName)
              } else {
                ProcessorHelper.getInstance().fqn(ctx, p.getEType)
              }
              pr.print(p.getName() + "P :" + returnTypeP)
              isFirst = false
          }
          if (op.getEType != null) {

            var returnTypeOP = if (op.getEType.isInstanceOf[EDataType]) {
              ProcessorHelper.getInstance().convertType(op.getEType.getName)
            } else {
              ProcessorHelper.getInstance().fqn(ctx, op.getEType)
            }
            if (returnTypeOP == null || returnTypeOP == "null") {
              returnTypeOP = "Unit"
            }
            if (op.getLowerBound == 0) {
              returnTypeOP = returnTypeOP + "?"
            }
            pr.println("):" + returnTypeOP + ";")
          } else {
            pr.println("):Unit;")
          }
        }


    }
    pr.println("}")
    pr.flush()
    pr.close()
  }

  private def generateAddAllMethod(pr: PrintWriter, cls: EClass, ref: EReference, typeRefName: String) {
    pr.println("fun addAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ProcessorHelper.getInstance().protectReservedWords(ref.getName) + " :List<" + typeRefName + ">)")
  }

  private def generateAddMethod(pr: PrintWriter, cls: EClass, ref: EReference, typeRefName: String) {
    pr.println("fun add" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ProcessorHelper.getInstance().protectReservedWords(ref.getName) + " : " + typeRefName + ")")
  }

  private def generateRemoveMethod(pr: PrintWriter, cls: EClass, ref: EReference, typeRefName: String) {
    pr.println("fun remove" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ProcessorHelper.getInstance().protectReservedWords(ref.getName) + " : " + typeRefName + ")")
  }

  private def generateRemoveAllMethod(pr: PrintWriter, cls: EClass, ref: EReference, typeRefName: String) {
    pr.println("fun removeAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "()")
  }

}
