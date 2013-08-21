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

import org.eclipse.emf.ecore.{EReference, EEnum, EClass, EPackage}
import org.kevoree.modeling.kotlin.generator.ProcessorHelper._
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}
import java.io.{PrintWriter, File}
import scala.collection.JavaConversions._

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

    generateAllGetterSetterMethod(pr, cls, ctx, pack)
    /* Then generated user method */
    /* next we generated custom method */
    cls.getEAllOperations.foreach {
      op =>
        pr.print("fun " + op.getName + "(")
        var isFirst = true
        op.getEParameters.foreach {
          p =>
            if (!isFirst) {
              pr.println(",")
            }
            pr.print(p.getName() + ":" + ProcessorHelper.convertType(p.getEType.getName))
            isFirst = false
        }
        if (op.getEType != null) {
          pr.println("):" + ProcessorHelper.convertType(op.getEType.getName) + ";")
        } else {
          pr.println("):Unit;")
        }
    }
    pr.println("}")
    pr.flush()
    pr.close()


  }

  private def generateAllGetterSetterMethod(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String) {
    cls.getEAttributes.foreach {
      att =>
        if (cls.getEAllAttributes.exists(att2 => att2.getName.equals(att.getName) && att2.getEContainingClass != cls && !att2.getEContainingClass.isAbstract)) {} else {

          //Generate getter
          if (ProcessorHelper.convertType(att.getEAttributeType) == "Any" || att.getEAttributeType.isInstanceOf[EEnum]) {
            pr.print("fun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "() : " + ProcessorHelper.convertType(att.getEAttributeType) + "?\n")
          } else {
            pr.print("fun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "() : " + ProcessorHelper.convertType(att.getEAttributeType) + "\n")
          }
          //generate setter
          pr.print("\nfun set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1))
          pr.print("(" + protectReservedWords(att.getName) + " : " + ProcessorHelper.convertType(att.getEAttributeType) + ") \n")
        }
    }



    cls.getEReferences.foreach {
      ref =>
        val typeRefName = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
        if (ref.getUpperBound == -1 || ref.getUpperBound > 1) {
          // multiple values
          pr.println(generateGetter(ref, typeRefName, false, false))
          pr.println(generateSetter(ctx, cls, ref, typeRefName, false, false))
          pr.println(generateAddMethod(cls, ref, typeRefName))
          pr.println(generateRemoveMethod(cls, ref, typeRefName))
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          // optional single ref
          pr.println(generateGetter(ref, typeRefName, true, true))
          pr.println(generateSetter(ctx, cls, ref, typeRefName, true, true))
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 1) {
          // mandatory single ref
          pr.println(generateGetter(ref, typeRefName, false, true))
          pr.println(generateSetter(ctx, cls, ref, typeRefName, false, true))
        } else if (ref.getLowerBound > 1) {
          pr.println(generateGetter(ref, typeRefName, false, false))
          pr.println(generateSetter(ctx, cls, ref, typeRefName, false, false))
          pr.println(generateAddMethod(cls, ref, typeRefName))
          pr.println(generateRemoveMethod(cls, ref, typeRefName))
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::Not a standard arrity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
        }

        if (hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)) {
          pr.println("fun find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(key : String) : " + protectReservedWords(ProcessorHelper.fqn(ctx, ref.getEReferenceType)) + "?")
        }

    }


  }

  private def generateGetter(ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean): String = {
    //Generate getter
    val methName = "get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    var res = ""
    res += "\nfun " + methName + "() : "

    //Set return type
    res += {
      if (isOptional) {
        ""
      } else {
        ""
      }
    }
    res += {
      if (!isSingleRef) {
        "List<"
      } else {
        ""
      }
    }
    res += typeRefName
    res += {
      if (!isSingleRef) {
        ">"
      } else {
        "?"
      }
    }
    return res
  }

  private def generateSetter(ctx: GenerationContext, cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean): String = {
    //generate setter
    var res = ""
    val formatedLocalRefName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "\nfun set" + formatedLocalRefName
    res += "(" + protectReservedWords(ref.getName) + " : "
    res += {
      if (!isSingleRef) {
        "List<"
      } else {
        if (isOptional) {
          ""
        } else {
          ""
        }
      }
    }
    res += typeRefName
    res += {
      if (!isSingleRef) {
        ">"
      } else {
        if (isOptional) {
          "?"
        } else {
          "?"
        }
      }
    }
    res += " )\n"
    return res
  }

  private def generateAddAllMethod(cls: EClass, ref: EReference, typeRefName: String): String = {
    var res = ""
    res += "\n"
    res += "\nfun addAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "(" + protectReservedWords(ref.getName) + " :List<" + typeRefName + ">)\n"
    return res
  }

  private def generateAddMethod(cls: EClass, ref: EReference, typeRefName: String): String = {
    //generate add
    var res = ""
    val formatedAddMethodName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "\nfun add" + formatedAddMethodName
    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ")\n"
    res += generateAddAllMethod(cls, ref, typeRefName)
    return res
  }

  private def generateRemoveMethod(cls: EClass, ref: EReference, typeRefName: String): String = {
    //generate remove
    var res = ""
    val formatedMethodName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "\nfun remove" + formatedMethodName
    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ")\n"
    res += generateRemoveAllMethod(cls, ref, typeRefName)
    return res
  }

  private def generateRemoveAllMethod(cls: EClass, ref: EReference, typeRefName: String): String = {
    var res = ""
    res += "\nfun removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "()\n"
    return res
  }


}
