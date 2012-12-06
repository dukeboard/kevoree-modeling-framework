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


package org.kevoree.tools.ecore.gencode.model

import java.io.{File, PrintWriter}
import org.kevoree.tools.ecore.gencode.ProcessorHelper._
import scala.collection.JavaConversions._
import org.eclipse.emf.ecore._
import xmi.impl.XMIResourceImpl
import org.kevoree.tools.ecore.gencode.{GenerationContext, ProcessorHelper}
import scala.Some

/**
 * Created by IntelliJ IDEA.
 * Users: Gregory NAIN, Fouquet Francois
 * Date: 23/09/11
 * Time: 13:35
 */

trait ClassGenerator extends ClonerGenerator {

  def generateCompanion(ctx: GenerationContext, currentPackageDir: String, packElement: EPackage, cls: EClass) {
    val localFile = new File(currentPackageDir + "/impl/" + cls.getName + "Impl.scala")
    val pr = new PrintWriter(localFile, "utf-8")
    //System.out.println("Classifier class:" + cls.getClass)

    val pack = ProcessorHelper.fqn(ctx, packElement)

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

    ProcessorHelper.formatScalaSource(localFile)

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


  def hasID(cls: EClass): Boolean = {
    cls.getEAllAttributes.exists {
      att => att.isID
    }
  }

  def getIdAtt(cls: EClass) = {
    cls.getEAllAttributes.find {
      att => att.isID
    }
  }

  def generateGetIDAtt(cls: EClass) = {
    if (getIdAtt(cls).isEmpty) {
      println(cls.getName)
    }


    "get" + getIdAtt(cls).get.getName.substring(0, 1).toUpperCase + getIdAtt(cls).get.getName.substring(1)
  }


  def hasFindByIDMethod(cls: EClass): Boolean = {
    cls.getEReferences.exists(ref => {
      hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)
    })
  }

  def generateClass(ctx: GenerationContext, currentPackageDir: String, packElement: EPackage, cls: EClass) {
    val localFile = new File(currentPackageDir + "/" + cls.getName + ".scala")
    val pr = new PrintWriter(localFile, "utf-8")
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

        pr.print("private var " + protectReservedWords(att.getName) + " : ")
        ProcessorHelper.convertType(att.getEAttributeType) match {
          case "java.lang.String" => pr.println("java.lang.String = \"\"\n")
          case "java.lang.Integer" => pr.println("java.lang.Integer = 0\n")
          case "java.lang.Boolean" => pr.println("java.lang.Boolean = false\n")
          case "java.lang.Object" => pr.println("java.lang.Object = null\n")
          case "null" => throw new UnsupportedOperationException("ClassGenerator:: Attribute type: " + att.getEAttributeType.getInstanceClassName + " has not been converted in a known type. Can not initialize.")
          case _@className => pr.println(className + "=_")
        }

    }



    if (hasID(cls)) {
      if(cls.getEAllSuperTypes.exists(st => hasID(st))){
        pr.print("override ")
      }
      pr.println("def internalGetKey() : Object = {")
      var first = true
      cls.getEAllAttributes.filter(att => att.isID).foreach {
        att =>
          if (!first) {
            pr.print("+\"/\"+")
          }
          pr.print("get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1))
          first = false
      }
      pr.println("}")
    }


    //GENERATE findByID methods
    var generateReflexifMapper = false
    cls.getEReferences.foreach(ref => {
      if (hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)) {
        generateReflexifMapper = true
        pr.println("def find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(key : String) : " + protectReservedWords(ProcessorHelper.fqn(ctx, ref.getEReferenceType)) + " = {")
        pr.println(protectReservedWords(ref.getName) + ".get(key)")
        pr.println("}")
      }
    })
    if (generateReflexifMapper) {

      if (cls.getEAllSuperTypes.exists(st => hasFindByIDMethod(st))) {
        pr.print("override def ")
      } else {
        pr.print("def ")
      }
      pr.println("findById(query : String) : Object = {")
      pr.println("val relationName = query.substring(0,query.indexOf('['))")
      pr.println("val queryID = query.substring(query.indexOf('[')+1,query.indexOf(']'))")
      pr.println("var subquery = \"\"")
      pr.println("if (query.indexOf('/') != -1){")
      pr.println("subquery = query.substring(query.indexOf('/')+1,query.size)")
      pr.println("}")
      pr.println("relationName match {")
      cls.getEAllReferences.foreach(ref => {
        if (hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)) {
          pr.println("case \"" + ref.getName + "\" => {")
          pr.println("val objFound = find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(queryID)")
          pr.println("if(subquery != \"\"){")
          if (hasFindByIDMethod(ref.getEReferenceType)) {
            pr.println("objFound.findById(subquery)")
          } else {
            pr.println("throw new Exception(\"KMFQL : rejected sucessor\")")
          }
          pr.println("} else {objFound}")
          pr.println("}")

        }
      })
      pr.println("}")




      pr.println("}")
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
          pr.println("private var " + protectReservedWords(ref.getName) + "_java_cache : java.util.List[" + typeRefName + "] = null\n")
          pr.println("private var " + protectReservedWords(ref.getName) + "_scala_cache : scala.collection.immutable.List[" + typeRefName + "] = null\n")
          if (hasID(ref.getEReferenceType)) {
            pr.println("private val " + protectReservedWords(ref.getName) + " : java.util.HashMap[Object," + typeRefName + "] = new java.util.HashMap[Object," + typeRefName + "]()\n")
          } else {
            pr.println("private val " + protectReservedWords(ref.getName) + " : scala.collection.mutable.ListBuffer[" + typeRefName + "] = new scala.collection.mutable.ListBuffer[" + typeRefName + "]()\n")
          }
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          // optional single ref
          pr.println("private var " + protectReservedWords(ref.getName) + " : Option[" + typeRefName + "] = None\n")
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 1) {
          // mandatory single ref
          pr.println("private var " + protectReservedWords(ref.getName) + " : " + typeRefName + " = _\n")
        } else if (ref.getLowerBound > 1) {
          // else
          pr.println("private var " + protectReservedWords(ref.getName) + "_java_cache : java.util.List[" + typeRefName + "] = null\n")
          pr.println("private var " + protectReservedWords(ref.getName) + "_scala_cache : scala.collection.immutable.List[" + typeRefName + "] = null\n")
          if (hasID(ref.getEReferenceType)) {
            pr.println("private val " + protectReservedWords(ref.getName) + " : java.util.HashMap[Object," + typeRefName + "] = new java.util.HashMap[Object," + typeRefName + "]()\n")
          } else {
            pr.println("private val " + protectReservedWords(ref.getName) + " : scala.collection.mutable.ListBuffer[" + typeRefName + "] = new scala.collection.mutable.ListBuffer[" + typeRefName + "]()\n")
          }
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::Not standard arrity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
        }
    }


    // Getters and Setters Generation


    cls.getEAttributes.foreach {
      att =>
      //Generate getter
        pr.print("\ndef get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + " : " +
          ProcessorHelper.convertType(att.getEAttributeType) + " = {\n")
        pr.println("" + protectReservedWords(att.getName) + "\n}")

        //generate setter
        pr.print("\ndef set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1))
        pr.print("(" + protectReservedWords(att.getName) + " : " + ProcessorHelper.convertType(att.getEAttributeType) + ") {\n")
        pr.println("if(isReadOnly()){throw new Exception(\"This model is ReadOnly. Elements are not modifiable.\")}")
        pr.println("this." + protectReservedWords(att.getName) + " = " + protectReservedWords(att.getName))
        pr.println("}")
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

    ProcessorHelper.formatScalaSource(localFile)

  }


  private def generateGetter(ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean): String = {
    //Generate getter
    val methName = "get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    var res = ""
    res += "\ndef " + methName + " : "

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
    res += " = {\n"
    //Method core
    if (isSingleRef) {
      res += protectReservedWords(ref.getName)
    } else {
      res += "if(" + protectReservedWords(ref.getName) + "_scala_cache != null){\n"
      res += protectReservedWords(ref.getName) + "_scala_cache\n"
      res += "} else {\n"

      if (hasID(ref.getEReferenceType)) {
        res += "import scala.collection.JavaConversions._\n"
        res += "val tempL : List[" + typeRefName + "] = " + protectReservedWords(ref.getName) + ".values().toList\n"
      } else {
        res += "val tempL : List[" + typeRefName + "] = " + protectReservedWords(ref.getName) + ".toList\n"
      }

      res += protectReservedWords(ref.getName) + "_scala_cache = tempL\n"
      res += "tempL\n"
      res += "}\n"
    }
    res += "}"


    if (!isSingleRef) {
      res += "\ndef " + methName + "ForJ : java.util.List[" + typeRefName + "] = {\n"
      res += "if(" + protectReservedWords(ref.getName) + "_java_cache != null){\n"
      res += protectReservedWords(ref.getName) + "_java_cache\n"
      res += "} else {\n"
      res += "import scala.collection.JavaConversions._\n"
      if (hasID(ref.getEReferenceType)) {
        res += "val tempL : java.util.List[" + typeRefName + "] = " + protectReservedWords(ref.getName) + ".values().toList\n"
      } else {
        res += "val tempL : java.util.List[" + typeRefName + "] = " + protectReservedWords(ref.getName) + ".toList\n"
      }

      res += protectReservedWords(ref.getName) + "_java_cache = tempL\n"
      res += "tempL\n"
      res += "}\n"
      res += "}"
    }
    res
  }


  private def generateSetter(ctx: GenerationContext, cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean): String = {
    val oppositRef = ref.getEOpposite
    (if (oppositRef != null && !ref.isMany) {
      //Generates the NoOpposite_Set method only the local reference is a single ref. (opposite managed on the * side)
      generateSetterOp(ctx, cls, ref, typeRefName, isOptional, isSingleRef, true)
    } else {
      ""
    }) + generateSetterOp(ctx, cls, ref, typeRefName, isOptional, isSingleRef, false)
  }

  private def generateSetterOp(ctx: GenerationContext, cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean, noOpposite: Boolean): String = {
    //generate setter
    var res = ""

    val formatedLocalRefName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)

    if (noOpposite) {
      res += "\ndef noOpposite_set" + formatedLocalRefName
    } else {
      res += "\ndef set" + formatedLocalRefName
    }

    res += "(" + protectReservedWords(ref.getName) + " : "

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

    res += " ) {\n"

    //Read only protection
    res += ("if(isReadOnly()){throw new Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    if (ref.isMany) {
      res += "if(" + protectReservedWords(ref.getName) + " == null) throw new IllegalArgumentException(\"The list in parameter of the setter cannot be null. Use removeAll to empty a collection.\")\n"
    }
    if (!isSingleRef) {
      //Clear cache
      res += (protectReservedWords(ref.getName) + "_scala_cache=null\n")
      res += (protectReservedWords(ref.getName) + "_java_cache=null\n")
    }

    //if (cls.getEAllContainments.contains(ref)) {
    res += "if(this." + protectReservedWords(ref.getName) + "!= " + protectReservedWords(ref.getName) + "){\n"
    // }

    val oppositRef = ref.getEOpposite


    if (!ref.isMany) {
      // => Single ref : 0,1 or 1
      if (!noOpposite && (oppositRef != null)) {
        //Management of opposite relation in regular setter
        val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)

        if (oppositRef.isMany) {
          // 0,1 or 1  -- *

          if (ref.isRequired) {
            // Single Ref  1
            res += "if(this." + protectReservedWords(ref.getName) + " != null){\n"
            res += "this." + protectReservedWords(ref.getName) + ".noOpposite_remove" + formatedOpositName + "(this)\n"
            res += "}\n"
            res += "if(" + protectReservedWords(ref.getName) + " != null){\n"
            res += "" + protectReservedWords(ref.getName) + ".noOpposite_add" + formatedOpositName + "(this)\n"
            res += "}\n"
          } else {
            // Single Ref  0,1
            res += "this." + protectReservedWords(ref.getName) + ".map { currentRef => currentRef.noOpposite_remove" + formatedOpositName + "(this) }\n"
            res += "" + protectReservedWords(ref.getName) + ".map {newRef => newRef.noOpposite_add" + formatedOpositName + "(this)}\n"
          }

        } else {
          // => // 0,1 or 1  --  0,1 or 1

          if (ref.isRequired) {
            // 1 -- 0,1 or 1

            res += "if(this." + protectReservedWords(ref.getName) + " != null){\n"
            if (oppositRef.isRequired) {
              // 0,1 -- 1
              res += "this." + protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(null)\n"
            } else {
              res += "this." + protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(None)\n"
            }
            if (ref.isContainment) {
              res += "this." + protectReservedWords(ref.getName) + ".setEContainer(null,None)\n"
            }
            res += "}\n"

            res += "if(" + protectReservedWords(ref.getName) + " != null){\n"
            if (oppositRef.isRequired) {
              // 0,1 -- 1
              res += protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(this)\n"
            } else {
              res += protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(Some(this))\n"
            }

            if (ref.isContainment) {
              res += protectReservedWords(ref.getName) + ".setEContainer(this,None)\n"
            }

            res += "}\n"

          } else {
            // 0,1 -- 0,1 or 1
            if (oppositRef.isRequired) {
              // 0,1 -- 1
              if (!ref.isContainment) {
                res += "this." + protectReservedWords(ref.getName) + ".map {currentRef => currentRef.noOpposite_set" + formatedOpositName + "(null) }\n"
                res += "" + protectReservedWords(ref.getName) + ".map {newRef => newRef.noOpposite_set" + formatedOpositName + "(this)}\n"
              } else {
                res += "this." + protectReservedWords(ref.getName) + ".map {currentRef => \n"
                res += "currentRef.noOpposite_set" + formatedOpositName + "(null)\n"
                res += "currentRef.setEContainer(null,None)\n"
                res += "}\n"
                res += "" + protectReservedWords(ref.getName) + ".map {newRef =>\n"
                res += "newRef.noOpposite_set" + formatedOpositName + "(this)\n"
                res += "newRef.setEContainer(this,None)\n"
                res += "}\n"
              }
            } else {
              // 0,1 -- 0,1
              if (!ref.isContainment) {
                res += "this." + protectReservedWords(ref.getName) + ".map {currentRef => currentRef.noOpposite_set" + formatedOpositName + "(None) }\n"
                res += "" + protectReservedWords(ref.getName) + ".map {newRef => newRef.noOpposite_set" + formatedOpositName + "(Some(this))}\n"
              } else {
                res += "this." + protectReservedWords(ref.getName) + ".map {currentRef => \n"
                res += "currentRef.noOpposite_set" + formatedOpositName + "(None)\n"
                res += "currentRef.setEContainer(null,None)\n"
                res += "}\n"
                res += "" + protectReservedWords(ref.getName) + ".map {newRef =>\n"
                res += "newRef.noOpposite_set" + formatedOpositName + "(Some(this))\n"
                res += "newRef.setEContainer(this,None)\n"
                res += "}\n"
              }

            }

          }
        }
      }

      if (noOpposite && ref.isContainment) {
        // containment relation in noOpposite Method
        if (!ref.isRequired) {
          res += "this." + protectReservedWords(ref.getName) + ".map {currentRef => currentRef.setEContainer(null,None)}\n"
          res += protectReservedWords(ref.getName) + ".map {newRef => newRef.setEContainer(this,None)}\n"
        } else {
          res += "if(this." + protectReservedWords(ref.getName) + " != null){\n"
          res += "this." + protectReservedWords(ref.getName) + ".setEContainer(null, None)\n"
          res += "}\n"
          res += "if(" + protectReservedWords(ref.getName) + " != null){\n"
          res += protectReservedWords(ref.getName) + ".setEContainer(this, Some(() => { this." + protectReservedWords(ref.getName) + "= _:" + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + " }) )\n"
          res += "}\n"
        }
      } else {
        // containment with no opposite relation
        if (ref.isContainment && (ref.getEOpposite == null)) {
          if (ref.isMany) {
            res += protectReservedWords(ref.getName) + ".setEContainer(this, Some(() => { this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + protectReservedWords(ref.getName) + ")}) )\n"
          } else {
            if (ref.isRequired) {
              res += "if(this." + protectReservedWords(ref.getName) + " != null){this." + protectReservedWords(ref.getName) + ".setEContainer(null, None)}\n"
              res += "if(" + protectReservedWords(ref.getName) + " != null){" + protectReservedWords(ref.getName) + ".setEContainer(this, Some(() => { this." + protectReservedWords(ref.getName) + "= null}))}\n"
            } else {
              res += "this." + protectReservedWords(ref.getName) + ".map{ elem => elem.setEContainer(null, None)}\n"
              res += protectReservedWords(ref.getName) + ".map{ elem => elem.setEContainer(this, Some(() => { this." + protectReservedWords(ref.getName) + "= None}))}\n"
            }
          }

        }
      }


      //Setting of local reference
      res += "this." + protectReservedWords(ref.getName) + " = (" + protectReservedWords(ref.getName) + ")\n"


    } else {
      // => Collection ref : * or +
      res += "this." + protectReservedWords(ref.getName) + ".clear()\n"

      if (hasID(ref.getEReferenceType)) {
        res += protectReservedWords(ref.getName) + ".foreach( el => {\n"
        res += "this." + protectReservedWords(ref.getName) + ".put(el." + generateGetIDAtt(ref.getEReferenceType) + ",el)\n"
        res += "})\n"
      } else {
        res += "this." + protectReservedWords(ref.getName) + ".insertAll(0," + protectReservedWords(ref.getName) + ")\n"
      }

      if (ref.isContainment) {
        if (oppositRef != null) {
          res += protectReservedWords(ref.getName) + ".foreach{elem=>\n"
          res += "elem.setEContainer(this,Some(()=>{this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(elem)}))\n"

          val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
          if (oppositRef.isMany) {
            res += "elem.noOpposite_add" + formatedOpositName + "(this)\n"
          } else {
            if (oppositRef.isRequired) {
              res += "elem.noOpposite_set" + formatedOpositName + "(this)\n"
            } else {
              res += "elem.noOpposite_set" + formatedOpositName + "(Some(this))\n"
            }
          }
          res += "}\n"
        } else {
          res += protectReservedWords(ref.getName) + ".foreach{elem=>elem.setEContainer(this,Some(()=>{this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(elem)}))}\n"
        }

        //elem.noOpposite_setOptionalSingleA_StarListB(Some(this))
      } else {
        if (oppositRef != null) {
          val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
          if (oppositRef.isMany) {
            res += protectReservedWords(ref.getName) + ".foreach{elem=>elem.noOpposite_add" + formatedOpositName + "(this)}\n"
          } else {

            val callParam = if (oppositRef.isRequired) {
              "this"
            } else {
              "Some(this)"
            }
            res += protectReservedWords(ref.getName) + ".foreach{elem=>elem.noOpposite_set" + formatedOpositName + "(" + callParam + ")}\n"
          }
        }
      }

    }

    //Is the current ref contained in this class ?
    /*
    if (cls.getEAllContainments.contains(ref)) {
      if (isSingleRef) {
        if (isOptional) {
          //Optional contained single ref
          res += "" + protectReservedWords(ref.getName) + ".map{ dic=>\n"
          res += "dic.setEContainer(this, Some(() => { this." + protectReservedWords(ref.getName) + "= None }) )\n"
          res += oppositTestAndAdd(ref, "dic")
          res += "}\n"
        } else {
          //mandatory contained single ref
          if (noOpposite) {
            res += "" + protectReservedWords(ref.getName) + ".setEContainer(this, Some(() => { this." + protectReservedWords(ref.getName) + "= _:" + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + " }) )\n"
          }
        }
      } else {
        //contained List
        res += "" + protectReservedWords(ref.getName) + ".foreach{el=>\n"
        res += "el.setEContainer(this,Some(()=>{this.remove" + formatedLocalRefName + "(el)}))\n"
        res += oppositTestAndAdd(ref, "el")
        res += "}\n"

      }

    }
    */
    res += "}\n" //END IF newRef != localRef

    if (noOpposite && oppositRef != null && oppositRef.isMany && !hasID(ref.getEReferenceType)) {
      res += "else {\n"
      //DUPLICATE CASE OF SET / ONLY IN LOADER RUN
      val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
      // 0,1 or 1  -- *
      if (ref.isRequired) {
        // Single Ref  1
        res += "if(this." + protectReservedWords(ref.getName) + " != null){\n"
        res += "this." + protectReservedWords(ref.getName) + ".noOpposite_remove" + formatedOpositName + "(this)\n"
        res += "}\n"
      } else {
        // Single Ref  0,1
        res += "this." + protectReservedWords(ref.getName) + ".map { currentRef => currentRef.noOpposite_remove" + formatedOpositName + "(this) }\n"
      }
      res += "}\n"
    }

    res += "\n}" //END Method
    res

  }


  /* private def oppositTestAndAdd(ref: EReference, refCurrentName: String): String = {
    var result = ""
    val oppositRef = ref.getEOpposite
    if(oppositRef != null) {
      val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
      if(oppositRef.isMany && ref.isMany) {// *--*
        result += ""+refCurrentName+".noOpposite_add"+formatedOpositName+"(this)\n"
      } else if(oppositRef.isMany && !ref.isMany) {//List *--0,1
        result += ""+refCurrentName+".add"+formatedOpositName+"(this)\n"
      } else if(!oppositRef.isRequired) {//Option   0,1--?
        result += ""+refCurrentName+".get"+formatedOpositName+" match {\n"
        result += "case Some(e) => {\n"
        result += "if(e.isInstanceOf[" + ref.getEContainingClass.getName + "] && e != this) {\n"
        result += "e.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + refCurrentName + ")\n"
        result += "}\n"
        result += "" + refCurrentName + ".noOpposite_set" + formatedOpositName + "(Some(this))\n"
        result += "}\n"
        result += "case None => " + refCurrentName + ".noOpposite_set" + formatedOpositName + "(Some(this))\n"
        result += "}\n"
        //result += "case None => "+refCurrentName+".noOpposite_set"+formatedOpositName+"(Some(this))\n"
        //result += "}\n"
      } else { //mandatory single   1--?

        /*
        result += "if("+refCurrentName+".get"+formatedOpositName+".isInstanceOf["+ref.getEContainingClass.getName+"] && "+refCurrentName+".get"+formatedOpositName+" != this) {\n"
        result += ""+refCurrentName+".get"+formatedOpositName+".remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "("+refCurrentName+")\n"
        result += "}\n"
        */
        result += ""+refCurrentName+".noOpposite_set"+formatedOpositName+"(this)\n"
      }
    }
    result
  }*/

  private def generateAddMethod(cls: EClass, ref: EReference, typeRefName: String): String = {
    generateAddMethodOp(cls, ref, typeRefName, false) + generateAddAllMethodOp(cls, ref, typeRefName, false) +
      (if (ref.getEOpposite != null) {
        //} && ref.getEOpposite.isMany){
        generateAddMethodOp(cls, ref, typeRefName, true) + generateAddAllMethodOp(cls, ref, typeRefName, true)
      } else {
        ""
      })

  }

  private def generateAddAllMethodOp(cls: EClass, ref: EReference, typeRefName: String, noOpposite: Boolean): String = {
    var res = ""

    res += "\n"
    if (noOpposite) {
      res += "\ndef noOpposite_addAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    } else {
      res += "\ndef addAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    }

    res += "(" + protectReservedWords(ref.getName) + " : List[" + typeRefName + "]) {\n"
    res += ("if(isReadOnly()){throw new Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    //Clear cache
    res += (protectReservedWords(ref.getName) + "_scala_cache=null\n")
    res += (protectReservedWords(ref.getName) + "_java_cache=null\n")

    if (hasID(ref.getEReferenceType)) {

      res += protectReservedWords(ref.getName) + ".foreach(el => {\n"
      res += "this." + protectReservedWords(ref.getName) + ".put(el." + generateGetIDAtt(ref.getEReferenceType) + ",el)\n"
      res += "})\n"

    } else {
      res += "this." + protectReservedWords(ref.getName) + ".appendAll(" + protectReservedWords(ref.getName) + ")\n"
    }


    if ((!noOpposite && ref.getEOpposite != null) || ref.isContainment) {
      res += protectReservedWords(ref.getName) + ".foreach{el=>\n"
      if (ref.isContainment) {
        res += "el.setEContainer(this,Some(()=>{this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(el)}))\n"
      }
      if (ref.getEOpposite != null && !noOpposite) {
        val opposite = ref.getEOpposite
        val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)
        if (!opposite.isMany) {
          if (!opposite.isRequired) {
            res += "el.noOpposite_set" + formatedOpositName + "(Some(this))"
          } else {
            res += "el.noOpposite_set" + formatedOpositName + "(this)"
          }
        } else {
          res += "el.noOpposite_add" + formatedOpositName + "(this)"
        }
      }
      res += "}\n"
    }
    //res += "" + protectReservedWords(ref.getName) + ".foreach{ elem => add" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(elem)}\n"
    res += "}\n"
    res
  }


  private def generateAddMethodOp(cls: EClass, ref: EReference, typeRefName: String, noOpposite: Boolean): String = {
    //generate add
    var res = ""
    val formatedAddMethodName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    if (noOpposite) {
      res += "\ndef noOpposite_add" + formatedAddMethodName
    } else {
      res += "\ndef add" + formatedAddMethodName
    }
    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ") {\n"
    res += ("if(isReadOnly()){throw new Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")

    //Clear cache
    res += (protectReservedWords(ref.getName) + "_scala_cache=null\n")
    res += (protectReservedWords(ref.getName) + "_java_cache=null\n")

    if (ref.isContainment) {
      res += "" + protectReservedWords(ref.getName) + ".setEContainer(this,Some(()=>{this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + protectReservedWords(ref.getName) + ")}))\n"
    }

    if (hasID(ref.getEReferenceType)) {
      res += "this." + protectReservedWords(ref.getName) + ".put(" + protectReservedWords(ref.getName) + "." + generateGetIDAtt(ref.getEReferenceType) + "," + protectReservedWords(ref.getName) + ")\n"
    } else {
      res += "this." + protectReservedWords(ref.getName) + ".append(" + protectReservedWords(ref.getName) + ")\n"
    }



    if (ref.getEOpposite != null && !noOpposite) {
      val opposite = ref.getEOpposite
      val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)

      if (!opposite.isMany) {
        if (!opposite.isRequired) {
          res += protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(Some(this))"
        } else {
          res += protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(this)"
        }
      } else {
        res += protectReservedWords(ref.getName) + ".noOpposite_add" + formatedOpositName + "(this)"
      }
    }


    /*
    if(!noOpposite) {
      res += oppositTestAndAdd(ref, protectReservedWords(ref.getName))
    }
    */
    res += "}"

    res
  }


  private def generateRemoveMethod(cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean): String = {
    generateRemoveMethodOp(cls, ref, typeRefName, isOptional, false) + generateRemoveAllMethod(cls, ref, typeRefName, isOptional, false) +
      (if (ref.getEOpposite != null) {
        generateRemoveMethodOp(cls, ref, typeRefName, isOptional, true) + generateRemoveAllMethod(cls, ref, typeRefName, isOptional, true)
      } else {
        ""
      })

  }

  private def generateRemoveMethodOp(cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, noOpposite: Boolean): String = {
    //generate remove
    var res = ""
    val formatedMethodName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)

    if (noOpposite) {
      res += "\ndef noOpposite_remove" + formatedMethodName
    } else {
      res += "\ndef remove" + formatedMethodName
    }


    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ") {\n"

    res += ("if(isReadOnly()){throw new Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    //Clear cache
    res += (protectReservedWords(ref.getName) + "_scala_cache=null\n")
    res += (protectReservedWords(ref.getName) + "_java_cache=null\n")



    if (isOptional) {
      if (hasID(ref.getEReferenceType)) {
        res += "if(this." + protectReservedWords(ref.getName) + ".size != 0 && this." + protectReservedWords(ref.getName) + ".containsKey(" + protectReservedWords(ref.getName) + "." + generateGetIDAtt(ref.getEReferenceType) + ")) {\n"
      } else {
        res += "if(this." + protectReservedWords(ref.getName) + ".size != 0 && this." + protectReservedWords(ref.getName) + ".indexOf(" + protectReservedWords(ref.getName) + ") != -1 ) {\n"
      }

    } else {

      if (hasID(ref.getEReferenceType)) {
        res += "if(this." + protectReservedWords(ref.getName) + ".size == " + ref.getLowerBound + "&& this." + protectReservedWords(ref.getName) + ".containsKey(" + protectReservedWords(ref.getName) + "." + generateGetIDAtt(ref.getEReferenceType) + ") ) {\n"
      } else {
        res += "if(this." + protectReservedWords(ref.getName) + ".size == " + ref.getLowerBound + "&& this." + protectReservedWords(ref.getName) + ".indexOf(" + protectReservedWords(ref.getName) + ") != -1 ) {\n"
      }

      res += "throw new UnsupportedOperationException(\"The list of " + protectReservedWords(ref.getName) + " must contain at least " + ref.getLowerBound + " element. Connot remove sizeof(" + protectReservedWords(ref.getName) + ")=\"+this." + protectReservedWords(ref.getName) + ".size)\n"
      res += "} else {\n"
    }

    if (hasID(ref.getEReferenceType)) {
      res += "this." + protectReservedWords(ref.getName) + ".remove(" + protectReservedWords(ref.getName) + "." + generateGetIDAtt(ref.getEReferenceType) + ")\n"
    } else {
      res += "this." + protectReservedWords(ref.getName) + ".remove(this." + protectReservedWords(ref.getName) + ".indexOf(" + protectReservedWords(ref.getName) + "))\n"
    }

    if (ref.isContainment) {
      res += "" + protectReservedWords(ref.getName) + ".setEContainer(null,None)\n"
    }

    val oppositRef = ref.getEOpposite
    if (!noOpposite && oppositRef != null) {
      val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
      if (oppositRef.isMany) {
        res += "" + protectReservedWords(ref.getName) + ".noOpposite_remove" + formatedOpositName + "(this)\n"
      } else if (!oppositRef.isRequired) {
        res += "" + protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(None)\n"
      } else {
        res += "" + protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(null)\n"
      }
    }

    res += "}\n"
    res += "}\n"

    res
  }

  private def generateRemoveAllMethod(cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, noOpposite: Boolean): String = {
    var res = ""
    if (noOpposite) {
      res += "\ndef noOpposite_removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "() {\n"
    } else {
      res += "\ndef removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "() {\n"
    }

    res += ("if(isReadOnly()){throw new Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    res += (protectReservedWords(ref.getName) + "_scala_cache=null\n")
    res += (protectReservedWords(ref.getName) + "_java_cache=null\n")
    if ((!noOpposite && ref.getEOpposite != null) || ref.isContainment) {

      if (hasID(ref.getEReferenceType)) {
        res += "import scala.collection.JavaConversions._\n"
        res += protectReservedWords(ref.getName) + ".values().foreach{el=>\n"
      } else {
        res += protectReservedWords(ref.getName) + ".foreach{el=>\n"
      }

      if (ref.isContainment) {
        res += "el.setEContainer(null,None)\n"
      }
      if (ref.getEOpposite != null && !noOpposite) {
        val opposite = ref.getEOpposite
        val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)
        if (!opposite.isMany) {
          if (!opposite.isRequired) {
            res += "el.noOpposite_set" + formatedOpositName + "(None)"
          } else {
            res += "el.noOpposite_set" + formatedOpositName + "(null)"
          }
        } else {
          res += "el.noOpposite_remove" + formatedOpositName + "(this)"
        }
      }
      res += "}\n"
    }
    res += "this." + protectReservedWords(ref.getName) + ".clear()\n"

    res += "}"
    res
  }


}
