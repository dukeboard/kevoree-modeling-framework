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
trait JavaAPIGenerator extends ClassGenerator {

  def generateJAPI(ctx: GenerationContext, currentPackageDir: String, packElement: EPackage, cls: EClass, srcCurrentDir: String) {
    val localFile = new File(currentPackageDir + "/" + cls.getName + ".java")
    val pr = new PrintWriter(localFile, "utf-8")
    val pack = ProcessorHelper.fqn(ctx, packElement)
    pr.println("package " + pack + ";")
    pr.println()
    pr.println(generateHeader(packElement))
    pr.println("import java.util.List;")
    pr.print("public interface " + cls.getName)
    pr.println((generateSuperTypes(ctx, cls, packElement) match {
      case None => "{"
      case Some(s) => s.replace(":", "extends") + " {"
    }))
    generateJAllGetterSetterMethod(pr, cls, ctx, pack)
    pr.println("}")
    pr.flush()
    pr.close()


  }

  private def generateJAllGetterSetterMethod(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String) {
    cls.getEAttributes.foreach {
      att =>
      //Generate getter
        if (ProcessorHelper.convertType(att.getEAttributeType) == "Any" || att.getEAttributeType.isInstanceOf[EEnum]) {
          //pr.println("@org.jetbrains.annotations.NotNull")
          pr.print("public " + ProcessorHelper.convertJType(att.getEAttributeType) + " get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "();" + "\n")
        } else {
          pr.println("@org.jetbrains.annotations.NotNull")
          pr.print("public " + ProcessorHelper.convertJType(att.getEAttributeType) + " get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "();\n")
        }
        //generate setter
        pr.print("\n public void set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1))
        pr.print("(@org.jetbrains.annotations.NotNull " + ProcessorHelper.convertJType(att.getEAttributeType) + " " + ProcessorHelper.protectReservedJWords(att.getName) + " ); \n")
    }

    cls.getEReferences.foreach {
      ref =>
        val typeRefName = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
        if (ref.getUpperBound == -1) {
          // multiple values
          pr.println(generateJGetter(ref, typeRefName, false, false))
          pr.println(generateJSetter(ctx, cls, ref, typeRefName, false, false))
          pr.println(generateJAddMethod(cls, ref, typeRefName))
          pr.println(generateJRemoveMethod(cls, ref, typeRefName))
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          // optional single ref
          pr.println(generateJGetter(ref, typeRefName, true, true))
          pr.println(generateJSetter(ctx, cls, ref, typeRefName, true, true))
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 1) {
          // mandatory single ref
          pr.println(generateJGetter(ref, typeRefName, false, true))
          pr.println(generateJSetter(ctx, cls, ref, typeRefName, false, true))
        } else if (ref.getLowerBound > 1) {
          pr.println(generateJGetter(ref, typeRefName, false, false))
          pr.println(generateJSetter(ctx, cls, ref, typeRefName, false, false))
          pr.println(generateJAddMethod(cls, ref, typeRefName))
          pr.println(generateJRemoveMethod(cls, ref, typeRefName))
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::Not a standard arrity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
        }

        if (hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)) {
          pr.println("public " + protectReservedJWords(ProcessorHelper.fqn(ctx, ref.getEReferenceType)) + " find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(@org.jetbrains.annotations.NotNull String key);")
        }

    }

  }

  private def generateJGetter(ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean): String = {
    //Generate getter
    val methName = "get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    var res = ""

    if (!isSingleRef) {
      res += "@org.jetbrains.annotations.NotNull\n"
    }

    res += "public "

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
        ""
      }
    }
    res += " " + methName + "();"
    return res
  }

  private def generateJSetter(ctx: GenerationContext, cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean): String = {
    //generate setter
    var res = ""
    val formatedLocalRefName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "\n public void set" + formatedLocalRefName

    if (!isSingleRef) {
      res += "(@org.jetbrains.annotations.NotNull "
    } else {
      res += "( "
    }

    if (!isSingleRef) {
      res += "List<"
    }

    res += protectReservedJWords(typeRefName)
    if (!isSingleRef) {
      res += ">"
    }
    res += " " + protectReservedJWords(ref.getName) + " );\n"
    return res
  }

  private def generateJAddAllMethod(cls: EClass, ref: EReference, typeRefName: String): String = {
    var res = ""
    res += "\n"
    res += "\n public void addAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "(@org.jetbrains.annotations.NotNull List<" + typeRefName + "> " + protectReservedJWords(ref.getName) + ");\n"
    return res
  }

  private def generateJAddMethod(cls: EClass, ref: EReference, typeRefName: String): String = {
    //generate add
    var res = ""
    val formatedAddMethodName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "\n public void add" + formatedAddMethodName
    res += "(@org.jetbrains.annotations.NotNull " + typeRefName + " " + protectReservedJWords(ref.getName) + ");\n"
    res += generateJAddAllMethod(cls, ref, typeRefName)
    return res
  }

  private def generateJRemoveMethod(cls: EClass, ref: EReference, typeRefName: String): String = {
    //generate remove
    var res = ""
    val formatedMethodName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "\npublic void remove" + formatedMethodName
    res += "(@org.jetbrains.annotations.NotNull " + typeRefName + " " + protectReservedJWords(ref.getName) + ");\n"
    res += generateJRemoveAllMethod(cls, ref, typeRefName)
    return res
  }

  private def generateJRemoveAllMethod(cls: EClass, ref: EReference, typeRefName: String): String = {
    var res = ""
    res += "\npublic void removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "();\n"
    return res
  }


}
