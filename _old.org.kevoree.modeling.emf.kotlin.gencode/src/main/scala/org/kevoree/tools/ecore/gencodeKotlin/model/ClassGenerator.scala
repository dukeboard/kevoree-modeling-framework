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


package org.kevoree.tools.ecore.gencodeKotlin.model

import java.io.{File, PrintWriter}
import org.kevoree.tools.ecore.gencodeKotlin.ProcessorHelper._
import scala.collection.JavaConversions._
import org.eclipse.emf.ecore._
import xmi.impl.XMIResourceImpl
import org.kevoree.tools.ecore.gencodeKotlin.{GenerationContext, ProcessorHelper}

/**
 * Created by IntelliJ IDEA.
 * Users: Gregory NAIN, Fouquet Francois
 * Date: 23/09/11
 * Time: 13:35
 */

trait ClassGenerator extends ClonerGenerator {

  def generateCompanion(ctx: GenerationContext, currentPackageDir: String, packElement: EPackage, cls: EClass) {
    val pr = new PrintWriter(new File(currentPackageDir + "/impl/" + cls.getName + "Impl.kt"), "utf-8")
    //System.out.println("Classifier class:" + cls.getClass)

    val pack = ProcessorHelper.fqn(ctx, packElement)

    pr.println("package " + pack + ".impl")
    pr.println()
    pr.println("import " + pack + ".*")
    pr.println()

    pr.print("class " + cls.getName + "Impl(")

    pr.println(") : " + cls.getName + " {")

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

  def generateClass(ctx: GenerationContext, currentPackageDir: String, packElement: EPackage, cls: EClass) {
    val pr = new PrintWriter(new File(currentPackageDir + "/" + cls.getName + ".kt"), "utf-8")
    //System.out.println("Generating class:" + cls.getName)

    val pack = ProcessorHelper.fqn(ctx, packElement)

    pr.println("package " + pack + ";")
    pr.println()

    //pr.println("import " + pack + ".impl._;")
    //pr.println()
    pr.println(generateHeader(packElement))
    //case class name
    pr.print("trait " + cls.getName)

    pr.println((generateSuperTypes(ctx, cls, packElement) match {
      case None => "{"
      case Some(s) => s + " {"
    }))


    cls.getEAttributes.foreach {
      att =>

        pr.print("\t\tprivate var " + protectReservedWords(att.getName) + " : ")
        ProcessorHelper.convertType(att.getEAttributeType) match {
          case "java.lang.String" => pr.println("java.lang.String = \"\"\n")
          case "java.lang.Integer" => pr.println("java.lang.Integer = 0\n")
          case "java.lang.Boolean" => pr.println("java.lang.Boolean = false\n")
          case "java.lang.Object" => pr.println("java.lang.Object = null\n")
          case "null" => throw new UnsupportedOperationException("ClassGenerator:: Attribute type: " + att.getEAttributeType.getInstanceClassName + " has not been converted in a known type. Can not initialize.")
          case _@className => pr.println(className+"=_")
        }

    }


    cls.getEReferences.foreach {
      ref =>
        val typeRefName = (
          if (ref.getEReferenceType.getName == null) {
            resolveCrossRefTypeDef(cls, ref, pack)
          } else {
            ProcessorHelper.fqn(ctx, ref.getEReferenceType) //.getName
          }
          )



        if (ref.getUpperBound == -1) {
          // multiple values
          pr.println("\t\tprivate val " + protectReservedWords(ref.getName) + " : java.util.List<" + typeRefName + "> = new java.util.ArrayList<" + typeRefName + ">()\n")
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          // optional single ref
          pr.println("\t\tprivate var " + protectReservedWords(ref.getName) + " : Option[" + typeRefName + "] = None\n")
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 1) {
          // mandatory single ref
          pr.println("\t\tprivate var " + protectReservedWords(ref.getName) + " : " + typeRefName + " = _\n")
        } else if (ref.getLowerBound > 1) {
          // else
          pr.println("\t\tprivate val " + protectReservedWords(ref.getName) + " : java.util.List<" + typeRefName + "> = new java.util.ArrayList<" + typeRefName + ">()\n")
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::Not standard arrity: " + cls.getName + "->" + typeRefName + "<" + ref.getLowerBound + "," + ref.getUpperBound + ">. Not implemented yet !")
        }
    }


    // Getters and Setters Generation


    cls.getEAttributes.foreach {
      att =>
      //Generate getter
        pr.print("\n\t\tfun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + " : " +
          ProcessorHelper.convertType(att.getEAttributeType) + " = {\n")
        pr.println("\t\t\t" + protectReservedWords(att.getName) + "\n\t\t}")

        //generate setter
        pr.print("\n\t\tfun set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1))
        pr.print("(" + protectReservedWords(att.getName) + " : " + ProcessorHelper.convertType(att.getEAttributeType) + ") {\n")
        pr.println("\t\t\tthis." + protectReservedWords(att.getName) + " = " + protectReservedWords(att.getName))
        pr.println("\t\t}")
    }


    cls.getEReferences.foreach {
      ref =>
        val typeRefName = (
          if (ref.getEReferenceType.getName == null) {
            resolveCrossRefTypeDef(cls, ref, pack)
          } else {
            ProcessorHelper.fqn(ctx, ref.getEReferenceType) //.getName
          }
          )


        if (ref.getUpperBound == -1) {
          // multiple values
          pr.println(generateGetter(ref, typeRefName, false, false))
          pr.println(generateSetter(ctx, cls, ref, typeRefName, false, false))
          pr.println(generateAddMethod(cls, ref, typeRefName))
          pr.println(generateRemoveMethod(cls, ref, typeRefName, true))
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
          pr.println(generateRemoveMethod(cls, ref, typeRefName, false))
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::None standard arrity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
        }

    }


    //GENERATE CLONE METHOD
    generateCloneMethods(ctx, cls, pr, packElement)

    pr.println("")
    pr.println("}")

    pr.flush()
    pr.close()

  }


  private def generateGetter(ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean): String = {
    //Generate getter
    val methName = "get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    var res = ""
    res += "\n\t\tfun " + methName + " : "

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
    res += "\n\t\t\t\t" + protectReservedWords(ref.getName) + (if (!isSingleRef) {".toList"}else{""})
    res += "\n\t\t}"


    if (!isSingleRef) {
      res += "\n\t\tfun " + methName + "ForJ : java.util.List[" + typeRefName + "] = {"
      res += "\n\t\t\t\timport scala.collection.JavaConversions._"
      res += "\n\t\t\t\t" + protectReservedWords(ref.getName)
      res += "\n\t\t}"
    }
    res
  }


  private def generateSetter(ctx:GenerationContext, cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean): String = {
    val oppositRef = ref.asInstanceOf[EReference].getEOpposite
    (if(oppositRef != null && !ref.isMany) {
      generateSetterOp(ctx,cls,ref,typeRefName,isOptional,isSingleRef,true)
    }else{""}) + generateSetterOp(ctx,cls,ref,typeRefName,isOptional,isSingleRef,false)
  }

  private def generateSetterOp(ctx:GenerationContext, cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean, noOpposite : Boolean): String = {
    //generate setter
    var res = ""

    val formatedLocalRefName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)

    if(noOpposite){
      res += "\n\t\tfun noOpposite_set" + formatedLocalRefName
    } else {
      res += "\n\t\tfun set" + formatedLocalRefName
    }

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
    /*if (isOptional) {

      if (isSingleRef) {
        res += "\t\t\t\t\t\t\t\tthis." + protectReservedWords(ref.getName) + " = (" + protectReservedWords(ref.getName) + ")\n"
      } else {
        res += "\t\t\t\t\t\t\t\tthis." + protectReservedWords(ref.getName) + ".clear()\n"
        res += "\t\t\t\t\t\t\t\tthis." + protectReservedWords(ref.getName) + ".insertAll(0," + protectReservedWords(ref.getName) + ")\n"
      }

    } else {*/
    if (cls.getEAllContainments.contains(ref)) {
      res += "\t\t\tif(this."+protectReservedWords(ref.getName)+"!= "+protectReservedWords(ref.getName)+"){\n"
    }

    if (isSingleRef) {
      if(noOpposite) {
        res += "\t\t\t\tthis." + protectReservedWords(ref.getName) + " = (" + protectReservedWords(ref.getName) + ")\n"
      } else {
        val oppositRef = ref.asInstanceOf[EReference].getEOpposite
        if(oppositRef != null) {
          val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
          if(oppositRef.isMany) {
            if(ref.isRequired) {
              res += "\t\t\t\t" + protectReservedWords(ref.getName) + ".add" + formatedOpositName + "(this)\n"
            } else {
              res += "\t\t\t\t" + protectReservedWords(ref.getName) + " match {\n"
              res += "\t\t\t\t  case Some(tc) => tc.add" + formatedOpositName + "(this)\n"
              res += "\t\t\t\t  case None => if(this." + protectReservedWords(ref.getName) + ".isDefined){this." + protectReservedWords(ref.getName) + ".get.remove" + formatedOpositName + "(this)}\n"
              res += "\t\t\t\t}\n"
            }
          } else {
            if(oppositRef.isContainment) {
              res += "\t\t\t\t"+protectReservedWords(ref.getName)+".set" + formatedOpositName + "(this)\n"
            } else {
              res += "\t\t\t\t"+protectReservedWords(ref.getName)+".noOpposite_set" + formatedOpositName + "(this)\n"
              res += "\t\t\t\tnoOpposite_set"+formatedLocalRefName+"("+protectReservedWords(ref.getName)+")\n"
            }

          }
        } else {
          res += "\t\t\t\tthis." + protectReservedWords(ref.getName) + " = (" + protectReservedWords(ref.getName) + ")\n"
        }
      }
    } else {
      res += "\t\t\t\tthis." + protectReservedWords(ref.getName) + ".clear()\n"
      res += "\t\t\t\tthis." + protectReservedWords(ref.getName) + ".insertAll(0," + protectReservedWords(ref.getName) + ")\n"

    }
    //}


    // res += "\t\t\t\tthis." + protectReservedWords(ref.getName) + " = " + protectReservedWords(ref.getName) + "\n"
    // }


    //Is the current ref contained in this class ?
    if (cls.getEAllContainments.contains(ref)) {
      if (isSingleRef) {
        if (isOptional) { //Optional contained single ref
          res += "\t\t\t\t" + protectReservedWords(ref.getName) + ".map{ dic=>"
          res += "\t\t\t\tdic.setEContainer(this, Some(() => { this." + protectReservedWords(ref.getName) + "= None }) )\n"
          res += oppositTestAndAdd(ref,"dic")
          res += "\t\t\t\t}"
        } else {//mandatory contained single ref
          if(noOpposite) {
            res += "\t\t\t\t" + protectReservedWords(ref.getName) + ".setEContainer(this, Some(() => { this." + protectReservedWords(ref.getName) + "= _:"+ProcessorHelper.fqn(ctx, ref.getEReferenceType)+" }) )\n"
          }
          //res += oppositTestAndAdd(ref, protectReservedWords(ref.getName))
        }
      } else { //contained List
        res += "\t\t\t\t" + protectReservedWords(ref.getName) + ".foreach{el=>\n"
        res += "\t\t\t\t\tel.setEContainer(this,Some(()=>{this.remove" + formatedLocalRefName + "(el)}))\n"
        res += oppositTestAndAdd (ref, "el")
        res += "\t\t\t\t}\n"

      }
      res += "\t\t\t}\n"  //END TEST == IF
    }

    res += "\n\t\t}"
    res

  }


  private def oppositTestAndAdd(ref : EReference, refCurrentName:String) : String = {
    var result = ""
    val oppositRef = ref.asInstanceOf[EReference].getEOpposite
    if(oppositRef != null) {
      val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
      if(oppositRef.isMany) {//List
        //result += "\t\t\t\t\tif(!"+refCurrentName+".get"+formatedOpositName+".contains(this)) {\n"
        result += "\t\t\t\t\t\t"+refCurrentName+".add"+formatedOpositName+"(this)\n"
        //result += "\t\t\t\t\t}\n"
      } else if(!oppositRef.isRequired) {//Option
        result += "\t\t\t\t\t"+refCurrentName+".get"+formatedOpositName+" match {\n"
        result += "\t\t\t\t\t\tcase Some(e) => {\n"
        result += "\t\t\t\t\t\t\tif(e.isInstanceOf["+ref.getEContainingClass.getName+"] && e != this) {\n"
        result += "\t\t\t\t\t\t\t\te.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "("+refCurrentName+")\n"
        result += "\t\t\t\t\t\t\t}\n"
        result += "\t\t\t\t\t\t\t"+refCurrentName+".noOpposite_set"+formatedOpositName+"(Some(this))\n"
        result += "\t\t\t\t\t\t}\n"
        result += "\t\t\t\t\t\tcase None => "+refCurrentName+".noOpposite_set"+formatedOpositName+"(Some(this))\n"
        result += "\t\t\t\t\t}\n"
      } else { //mandatory single
        //result += "\t\t\t\t\tif("+protectReservedWords(ref.getName)+".get"+formatedOpositName+" != this) {\n"
        //result += "\t\t\t\t\t\t"+protectReservedWords(ref.getName)+".noOpposite_set"+formatedOpositName+"(this)\n"
        result += "\t\t\t\t\tif("+refCurrentName+".get"+formatedOpositName+".isInstanceOf["+ref.getEContainingClass.getName+"] && "+refCurrentName+".get"+formatedOpositName+" != this) {\n"
        result += "\t\t\t\t\t\t"+refCurrentName+".get"+formatedOpositName+".remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "("+refCurrentName+")\n"
        result += "\t\t\t\t\t}\n"
        result += "\t\t\t\t\t"+refCurrentName+".noOpposite_set"+formatedOpositName+"(this)\n"
        //result += "\t\t\t\t\t}\n"
      }
    }
    result
  }

  private def generateAddMethod(cls: EClass, ref: EReference, typeRefName: String): String = {
    //generate add
    var res = ""
    res += "\n\t\tfun add" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ") {\n"
    if (cls.getEAllContainments.contains(ref)) {
      res += "\t\t\t\t" + protectReservedWords(ref.getName) + ".setEContainer(this,Some(()=>{this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + protectReservedWords(ref.getName) + ")}))\n"
    }
    res += "\t\t\t\tthis." + protectReservedWords(ref.getName) + ".append(" + protectReservedWords(ref.getName) + ")\n"
    res += oppositTestAndAdd(ref, protectReservedWords(ref.getName))
    res += "\t\t}"
    res += "\n"
    res += "\n\t\tfun addAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "(" + protectReservedWords(ref.getName) + " : List[" + typeRefName + "]) {\n"
    res += "\t\t\t\t" + protectReservedWords(ref.getName) + ".foreach{ elem => add" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(elem)}\n"
    res += "\t\t}"

    res
  }

  private def generateRemoveMethod(cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean): String = {
    //generate remove
    var res = ""

    res += "\n\t\tfun remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ") {\n"
    if (isOptional) {
      res += "\t\t\t\tif(this." + protectReservedWords(ref.getName) + ".size != 0 && this."+protectReservedWords(ref.getName) +".indexOf("+protectReservedWords(ref.getName)+") != -1 ) {\n"
    } else {
      res += "\t\t\t\tif(this." + protectReservedWords(ref.getName) + ".size == " + ref.getLowerBound + "&& this."+protectReservedWords(ref.getName) +".indexOf("+protectReservedWords(ref.getName)+") != -1 ) {\n"
      res += "\t\t\t\t\t\tthrow new UnsupportedOperationException(\"The list of " + protectReservedWords(ref.getName) + " must contain at least " + ref.getLowerBound + " element. Connot remove sizeof(" + protectReservedWords(ref.getName) + ")=\"+this." + protectReservedWords(ref.getName) + ".size)\n"
      res += "\t\t\t\t} else {\n"
    }
    /*
    res += "\t\t\t\t\t\tvar nList = List[" + typeRefName + "]()\n"
    res += "\t\t\t\t\t\tthis." + protectReservedWords(ref.getName) + ".foreach(e => if(e != (" + protectReservedWords(ref.getName) + ")) nList = nList ++ List(e))\n"
    res += "\t\t\t\t\t\tthis." + protectReservedWords(ref.getName) + " = nList\n"
    */
    res += "\t\t\t\t\t\tthis." + protectReservedWords(ref.getName) + ".remove(this."+ protectReservedWords(ref.getName) +".indexOf("+protectReservedWords(ref.getName)+"))\n"

    if (cls.getEAllContainments.contains(ref)) {
      res += "\t\t\t\t\t\t" + protectReservedWords(ref.getName) + ".setEContainer(null,None)\n"
      val oppositRef = ref.asInstanceOf[EReference].getEOpposite
      if(oppositRef != null) {
        val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
        if(!oppositRef.isRequired) {
          res += "\t\t\t\t\t\t"+protectReservedWords(ref.getName)+".noOpposite_set"+formatedOpositName+"(None)\n"
        } else {
          res += "\t\t\t\t\t\t"+protectReservedWords(ref.getName)+".noOpposite_set"+formatedOpositName+"(_:"+cls.getName+")\n"
        }
      }
    }
    res += "\t\t\t\t}\n"
    res += "\t\t}\n"

    res += "\n\t\tfun removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "() {\n"
    res += "\t\t\t\tthis." + protectReservedWords(ref.getName) + ".foreach{ elem => remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(elem)}\n"
    res += "\t\t}"
    res
  }

}
