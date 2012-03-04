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

import java.io.{File, PrintWriter}
import org.kevoree.tools.ecore.gencode.ProcessorHelper._
import org.kevoree.tools.ecore.gencode.ProcessorHelper
import scala.collection.JavaConversions._
import org.eclipse.emf.ecore._
import xmi.impl.XMIResourceImpl
import org.kevoree.tools.ecore.gencode.cloner.ClonerGenerator

/**
 * Created by IntelliJ IDEA.
 * Users: Gregory NAIN, Fouquet Francois
 * Date: 23/09/11
 * Time: 13:35
 */

trait ClassGenerator extends ClonerGenerator {

  def generateCompanion(location: String, pack: String, cls: EClass, packElement: EPackage) {
    val pr = new PrintWriter(new File(location + "/impl/" + cls.getName + "Impl.scala"),"utf-8")
    //System.out.println("Classifier class:" + cls.getClass)

    pr.println("package " + pack + ".impl;")
    pr.println()
    pr.println("import " + pack + "._;")
    pr.println()

    pr.print("class " + cls.getName + "Impl(")

    pr.println(") extends " + cls.getName + " {")

    //pr.println("")

    pr.println("\n\n}")

    pr.flush()
    pr.close()

  }

  private def resolveCrossRefTypeDef(cls: EClass, ref: EReference, pack: String): String = {

    //TODO : NETOYER :-)
    //URI d'exemple:
    //System.out.println("RefTypeInstanceType:" + ref.getEReferenceType)
    //    System.out.println("RefType:" + ref.getEReferenceType.eIsProxy())
    val uri = ref.getEReferenceType.asInstanceOf[InternalEObject].eProxyURI()
    val uriString = uri.toString
    /*
    System.out.println("Tricky part")
    System.out.println("Uri:" + uriString)
    System.out.println("Trying to load URI:" + uriString)
    */
    val resource = new XMIResourceImpl(uri);
    resource.load(null);

    //System.out.println("Resolved Ref:" + resolvedRef)
    val packa = resource.getAllContents.next().asInstanceOf[EPackage]
    //System.out.println("Package Name:" + packa.getName)

    //System.out.println("RefTypeInstanceTypeUri:" + uri)
    val typName = uriString.substring(uriString.lastIndexOf("#//") + 3)
    //System.out.println("RefTypeInstanceTypeName:" + typName)
    //throw new UnsupportedOperationException("Reference type of ref:" + ref.getName + " in class:" + cls.getName + " is null.\n")
    pack.substring(0, pack.lastIndexOf(".")) + "." + packa.getName + "." + typName
  }

  def generateClass(location: String, pack: String, cls: EClass, packElement: EPackage) {
    val pr = new PrintWriter(new File(location + "/" + cls.getName + ".scala"),"utf-8")
    //System.out.println("Generating class:" + cls.getName)

    pr.println("package " + pack + ";")
    pr.println()
    //pr.println("import " + pack + ".impl._;")
    //pr.println()
    pr.println(generateHeader(packElement))
    //case class name
    pr.print("trait " + cls.getName)

    pr.println((generateSuperTypes(cls, packElement) match {
      case None => "{"
      case Some(s) => s + " {"
    }))


    cls.getEAttributes.foreach {
      att =>

        pr.print("\t\tprivate var " + protectReservedWords(att.getName) + " : ")
        ProcessorHelper.convertType(att.getEAttributeType.getInstanceClassName) match {
          case "java.lang.String" => pr.println("java.lang.String = \"\"\n")
          case "java.lang.Integer" => pr.println("java.lang.Integer = 0\n")
          case "java.lang.Boolean" => pr.println("java.lang.Boolean = false\n")
          case "java.lang.Object" => pr.println("java.lang.Object = null\n")
          case _@e => throw new UnsupportedOperationException("ClassGenerator:: Attribute type: " + att.getEAttributeType.getInstanceClassName + " has net been converted in a known type. Can not initialize.")
        }

    }


    cls.getEReferences.foreach {
      ref =>
        val typeRefName = (
          if (ref.getEReferenceType.getName == null) {
            resolveCrossRefTypeDef(cls, ref, pack)
          } else {
            ref.getEReferenceType.getName
          }
          )

        if (ref.getUpperBound == -1) {
          // multiple values
          pr.println("\t\tprivate var " + protectReservedWords(ref.getName) + " : List[" + typeRefName + "] = List[" + typeRefName + "]()\n")
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          // optional single ref
          pr.println("\t\tprivate var " + protectReservedWords(ref.getName) + " : Option[" + typeRefName + "] = None\n")
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 1) {
          // mandatory single ref
          pr.println("\t\tprivate var " + protectReservedWords(ref.getName) + " : " + typeRefName + " = _\n")
        } else if (ref.getLowerBound > 1) {
          // else
          pr.println("\t\tprivate var " + protectReservedWords(ref.getName) + " : List[" + typeRefName + "] = List[" + typeRefName + "]()\n")
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::None standard arrity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
        }
    }


    // Getters and Setters Generation


    cls.getEAttributes.foreach {
      att =>
      //Generate getter
        pr.print("\n\t\tdef get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + " : " +
          ProcessorHelper.convertType(att.getEAttributeType.getInstanceClassName) + " = {\n")
        pr.println("\t\t\t\t" + protectReservedWords(att.getName) + "\n\t\t}")

        //generate setter
        pr.print("\n\t\tdef set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1))
        pr.print("(" + protectReservedWords(att.getName) + " : " + ProcessorHelper.convertType(att.getEAttributeType.getInstanceClassName) + ") {\n")
        pr.println("\t\t\t\tthis." + protectReservedWords(att.getName) + " = " + protectReservedWords(att.getName) + "\n\t\t}")
    }


    cls.getEReferences.foreach {
      ref =>
        val typeRefName = (
          if (ref.getEReferenceType.getName == null) {
            resolveCrossRefTypeDef(cls, ref, pack)
          } else {
            ref.getEReferenceType.getName
          }
          )


        if (ref.getUpperBound == -1) {
          // multiple values
          pr.println(generateGetter(ref, typeRefName, false, false))
          pr.println(generateSetter(cls, ref, typeRefName, false, false))
          pr.println(generateAddMethod(cls, ref, typeRefName))
          pr.println(generateRemoveMethod(cls, ref, typeRefName, true))
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          // optional single ref
          pr.println(generateGetter(ref, typeRefName, true, true))
          pr.println(generateSetter(cls, ref, typeRefName, true, true))
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 1) {
          // mandatory single ref
          pr.println(generateGetter(ref, typeRefName, false, true))
          pr.println(generateSetter(cls, ref, typeRefName, false, true))
        } else if (ref.getLowerBound > 1) {
          pr.println(generateGetter(ref, typeRefName, false, false))
          pr.println(generateSetter(cls, ref, typeRefName, false, false))
          pr.println(generateAddMethod(cls, ref, typeRefName))
          pr.println(generateRemoveMethod(cls, ref, typeRefName, false))
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::None standard arrity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
        }

    }


    //GENERATE CLONE METHOD
    generateCloneMethods(pack,cls,pr,packElement)


    pr.println("")
    pr.println("}")

    pr.flush()
    pr.close()

  }


  private def generateGetter(ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean): String = {
    //Generate getter
    val methName = "get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    var res = ""
    res += "\n\t\tdef " + methName + " : "

    //Set return type
    res += {
      if (isOptional) {
        "Option["
      } else {
        ""
      }
    }
    res += {
      if (!isSingleRef) {
        "List["
      } else {
        ""
      }
    }
    res += typeRefName
    res += {
      if (!isSingleRef) {
        "]"
      } else {
        ""
      }
    }
    res += {
      if (isOptional) {
        "]"
      } else {
        ""
      }
    }
    res += " = {"
    //Method core
    res += "\n\t\t\t\t" + protectReservedWords(ref.getName)
    res += "\n\t\t}"


    if (!isSingleRef) {
      res += "\n\t\tdef " + methName + "ForJ : java.util.List[" + typeRefName + "] = {"
      res += "\n\t\t\t\timport scala.collection.JavaConversions._"
      res += "\n\t\t\t\t" + protectReservedWords(ref.getName)
      res += "\n\t\t}"
    }


    res
  }

  private def generateSetter(cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean): String = {
    //generate setter
    var res = ""
    res += "\n\t\tdef set" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "(" + protectReservedWords(ref.getName) + " : "

    //Set parameter type
    //res += {if (isOptional) {"Option["}else{""}}
    res += {
      if (!isSingleRef) {
        "List["
      } else {
        if (isOptional) {
          "Option["
        } else {
          ""
        }
      }
    }
    res += typeRefName
    res += {
      if (!isSingleRef) {
        "]"
      } else {
        if (isOptional) {
          "]"
        } else {
          ""
        }
      }
    }
    // res += {if (isOptional) {"]"}else{""}}
    res += " ) {\n"

    //Method core
    if (isOptional) {

      if (isSingleRef) {
        res += "\t\t\t\t\t\t\t\tthis." + protectReservedWords(ref.getName) + " = (" + protectReservedWords(ref.getName) + ")\n"
      } else {
        res += "\t\t\t\t\t\t\t\tthis." + protectReservedWords(ref.getName) + " = " + protectReservedWords(ref.getName) + "\n"
      }

    } else {
      res += "\t\t\t\tthis." + protectReservedWords(ref.getName) + " = " + protectReservedWords(ref.getName) + "\n"
    }
    if (cls.getEAllContainments.contains(ref)) {
      if (isSingleRef) {
        if(isOptional){
          res += "\t\t\t\t" + protectReservedWords(ref.getName) + ".map{ dic=>"
          res += "\t\t\t\tdic.setEContainer(this, Some(() => { this." + protectReservedWords(ref.getName) + "= None }) )\n"
          res += "\t\t\t\t}"
        } else {
          res += "\t\t\t\t" + protectReservedWords(ref.getName) + ".setEContainer(this, Some(() => { this." + protectReservedWords(ref.getName) + "= None }) )\n"
        }
      } else {
        res += "\t\t\t\t" + protectReservedWords(ref.getName) + ".foreach{e=>e.setEContainer(this,Some(()=>{this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(e)}))}\n"
      }
    }
    res += "\n\t\t}"
    res

  }

  private def generateAddMethod(cls: EClass, ref: EReference, typeRefName: String): String = {
    //generate add
    var res = ""
    res += "\n\t\tdef add" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ") {\n"
    if (cls.getEAllContainments.contains(ref)) {
      res += "\t\t\t\t" + protectReservedWords(ref.getName) + ".setEContainer(this,Some(()=>{this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + protectReservedWords(ref.getName) + ")}))\n"
    }
    res += "\t\t\t\tthis." + protectReservedWords(ref.getName) + " = this." + protectReservedWords(ref.getName) + " ++ List(" + protectReservedWords(ref.getName) + ")\n"
    res += "\t\t}"
    res += "\n"
    res += "\n\t\tdef addAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "(" + protectReservedWords(ref.getName) + " : List[" + typeRefName + "]) {\n"
    res += "\t\t\t\t" + protectReservedWords(ref.getName) + ".foreach{ elem => add" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(elem)}\n"
    res += "\t\t}"

    res
  }

  private def generateRemoveMethod(cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean): String = {
    //generate remove
    var res = ""

    res += "\n\t\tdef remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ") {\n"
    if (isOptional) {
      res += "\t\t\t\tif(this." + protectReservedWords(ref.getName) + ".size != 0 ) {\n"
    } else {
      res += "\t\t\t\tif(this." + protectReservedWords(ref.getName) + ".size == " + ref.getLowerBound + ") {\n"
      res += "\t\t\t\t\t\tthrow new UnsupportedOperationException(\"The list of " + protectReservedWords(ref.getName) + " must contain at least " + ref.getLowerBound + " element. Connot remove sizeof(" + protectReservedWords(ref.getName) + ")=\"+this." + protectReservedWords(ref.getName) + ".size)\n"
      res += "\t\t\t\t} else {\n"
    }
    res += "\t\t\t\t\t\tvar nList = List[" + typeRefName + "]()\n"
    res += "\t\t\t\t\t\tthis." + protectReservedWords(ref.getName) + ".foreach(e => if(e != (" + protectReservedWords(ref.getName) + ")) nList = nList ++ List(e))\n"
    res += "\t\t\t\t\t\tthis." + protectReservedWords(ref.getName) + " = nList\n"
    if (cls.getEAllContainments.contains(ref)) {
      res += "\t\t\t\t\t\t" + protectReservedWords(ref.getName) + ".setEContainer(null,None)\n"
    }
    res += "\t\t\t\t}\n"
    res += "\t\t}\n"

    res += "\n\t\tdef removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "() {\n"
    res += "\t\t\t\tthis." + protectReservedWords(ref.getName) + ".foreach{ elem => remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(elem)}\n"
    res += "\t\t}"
    res
  }

}
