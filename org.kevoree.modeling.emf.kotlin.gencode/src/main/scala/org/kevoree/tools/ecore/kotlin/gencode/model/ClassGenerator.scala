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

package org.kevoree.tools.ecore.kotlin.gencode.model

import java.io.{File, PrintWriter}
import org.kevoree.tools.ecore.kotlin.gencode.ProcessorHelper._
import scala.collection.JavaConversions._
import org.eclipse.emf.ecore._
import xmi.impl.XMIResourceImpl
import org.kevoree.tools.ecore.kotlin.gencode.{GenerationContext, ProcessorHelper}
import scala.Some

/**
 * Created by IntelliJ IDEA.
 * Users: Gregory NAIN, Fouquet Francois
 * Date: 23/09/11
 * Time: 13:35
 */

trait ClassGenerator extends ClonerGenerator {

  def generateCompanion(ctx: GenerationContext, currentPackageDir: String, packElement: EPackage, cls: EClass, srcCurrentDir: String) {
    val localFile = new File(currentPackageDir + "/impl/" + cls.getName + "Impl.kt")
    val userFile = new File(srcCurrentDir + "/impl/" + cls.getName + "Impl.kt")
    if (userFile.exists()) {
      return;
    }
    val pr = new PrintWriter(localFile, "utf-8")
    val pack = ProcessorHelper.fqn(ctx, packElement)
    pr.println("package " + pack + ".impl")
    pr.println()
    pr.println("import " + pack + ".*")
    pr.println()
    pr.print("class " + cls.getName + "Impl(")
    pr.println(") : " + cls.getName + " {")

    //test if generation of variable from Base Trait
    // if (cls.getESuperTypes.isEmpty) {
    val formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase + packElement.getName.substring(1) + "Container"

    pr.println("override var internal_eContainer : " + formatedFactoryName + "? = null")
    pr.println("override var internal_unsetCmd : (()->Unit)? = null")
    pr.println("override var internal_readOnlyElem : Boolean = false")
    //  }

    //generate init
    cls.getEAllAttributes.foreach {
      att => {
        pr.print("override public var " + protectReservedWords("_" + att.getName) + " : ")
        ProcessorHelper.convertType(att.getEAttributeType) match {
          case "java.lang.String" => pr.println("String = \"\"")
          case "String" => pr.println("String = \"\"")
          case "Double" => pr.println("Double = 0.0")
          case "java.lang.Integer" => pr.println("Int = 0")
          case "Int" => pr.println("Int = 0")
          case "Boolean" | "java.lang.Boolean" => pr.println("Boolean = false")
          case "java.lang.Object" | "Any" => pr.println("Any? = null")
          case "null" => throw new UnsupportedOperationException("ClassGenerator:: Attribute type: " + att.getEAttributeType.getInstanceClassName + " has not been converted in a known type. Can not initialize.")
          case _@className => {
            println("--->" + className)
            pr.println(className)
          }
        }
      }
    }
    cls.getEAllReferences.foreach {
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
          pr.println("override var " + protectReservedWords("_" + ref.getName) + "_java_cache :List<" + typeRefName + ">? = null")
          if (hasID(ref.getEReferenceType)) {
            pr.println("override val " + protectReservedWords("_" + ref.getName) + " : java.util.HashMap<Any," + typeRefName + "> = java.util.HashMap<Any," + typeRefName + ">()")
          } else {
            pr.println("override val " + protectReservedWords("_" + ref.getName) + " :MutableList<" + typeRefName + "> = java.util.ArrayList<" + typeRefName + ">()")
          }
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          // optional single ref
          pr.println("override var " + protectReservedWords("_" + ref.getName) + " : " + typeRefName + "? = null")
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 1) {
          // mandatory single ref
          pr.println("override var " + protectReservedWords("_" + ref.getName) + " : " + typeRefName + "? = null")
        } else if (ref.getLowerBound > 1) {
          // else
          pr.println("override var " + protectReservedWords("_" + ref.getName) + "_java_cache :List<" + typeRefName + ">? = null")
          if (hasID(ref.getEReferenceType)) {
            pr.println("override val " + protectReservedWords("_" + ref.getName) + " : java.util.HashMap<Any," + typeRefName + "> = java.util.HashMap<Any," + typeRefName + ">()")
          } else {
            pr.println("override val " + protectReservedWords("_" + ref.getName) + " :MutableList<" + typeRefName + "> = java.util.ArrayList<" + typeRefName + ">()")
          }
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::Not standard arrity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
        }
    }




    pr.println("}")

    pr.flush()
    pr.close()


  }

  private def resolveCrossRefTypeDef(cls: EClass, ref: EReference, pack: String): String = {

    val uri = ref.getEReferenceType.asInstanceOf[InternalEObject].eProxyURI()
    val uriString = uri.toString
    val resource = new XMIResourceImpl(uri)
    resource.load(null)
    val packa = resource.getAllContents.next().asInstanceOf[EPackage]
    val typName = uriString.substring(uriString.lastIndexOf("#//") + 3)
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
    val localFile = new File(currentPackageDir + "/" + cls.getName + ".kt")
    val pr = new PrintWriter(localFile, "utf-8")
    val pack = ProcessorHelper.fqn(ctx, packElement)
    pr.println("package " + pack + "")
    pr.println()
    pr.println(generateHeader(packElement))
    //case class name
    pr.print("trait " + cls.getName)
    pr.println((generateSuperTypes(ctx, cls, packElement) match {
      case None => "{"
      case Some(s) => s + " {"
    }))


    generateAtts(pr, cls, ctx, pack)

    // Getters and Setters Generation
    generateAllGetterSetterMethod(pr, cls, ctx, pack)

    //GENERATE CLONE METHOD
    generateCloneMethods(ctx, cls, pr, packElement)
    generateKMFQLMethods(pr, cls, ctx, pack)

    pr.println("}")
    pr.flush()
    pr.close()

  }


  private def generateKMFQLMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String) {
    if (hasID(cls)) {
      if (cls.getEAllSuperTypes.exists(st => hasID(st))) {
        pr.print("override ")
      }
      pr.println("fun internalGetKey() : String {")
      var first = true
      cls.getEAllAttributes.filter(att => att.isID).foreach {
        att =>
          if (!first) {
            pr.print("+\"/\"+")
          }
          pr.print("return get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "()")
          first = false
      }
      pr.println("}")

      if (cls.getEAllSuperTypes.exists(st => hasID(st))) {
        pr.print("override ")
      }
      pr.println("fun buildQuery() : String? {")
      pr.println("return eContainer()?.internalGetQuery(internalGetKey())")
      pr.println("}")
    }


    //GENERATE findByID methods
    var generateReflexifMapper = false
    cls.getEReferences.foreach(ref => {
      if (hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)) {
        generateReflexifMapper = true
        pr.println("fun find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(key : String) : " + protectReservedWords(ProcessorHelper.fqn(ctx, ref.getEReferenceType)) + "? {")
        pr.println("return " + protectReservedWords("_" + ref.getName) + ".get(key)")
        pr.println("}")
      }
    })
    if (generateReflexifMapper) {
      pr.println("override fun internalGetQuery(selfKey : String) : String? {")
      pr.println("var res : Any? = null")

      cls.getEAllReferences.foreach(ref => {
        if (hasID(ref.getEReferenceType)) {
          if (ref.getUpperBound == 1) {
            if (ref.getLowerBound == 0) {
              pr.println("if(get" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "() != null && get" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "()?.internalGetKey() == selfKey){")
              if (hasID(cls)) {
                pr.println("return eContainer()?.internalGetQuery(internalGetKey())+\"/" + ref.getName + "[\"+selfKey+\"]\"")
              } else {
                pr.println("return \"" + ref.getName + "[\"+selfKey+\"]\"")
              }
              pr.println("}")
            } else {
              pr.println("if(get" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "() != null && get" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "()?.internalGetKey() == selfKey){")
              if (hasID(cls)) {
                pr.println("return eContainer()?.internalGetQuery(internalGetKey())+\"/" + ref.getName + "[\"+selfKey+\"]\"")
              } else {
                pr.println("return \"" + ref.getName + "[\"+selfKey+\"]\"")
              }
              pr.println("}")
            }
          } else {
            //MANY
            pr.println("res = find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(selfKey)")
            pr.println("if(res != null){")
            if (hasID(cls)) {
              pr.println("return eContainer()?.internalGetQuery(internalGetKey())+\"/" + ref.getName + "[\"+selfKey+\"]\"")
            } else {
              pr.println("return \"" + ref.getName + "[\"+selfKey+\"]\"")
            }
            pr.println("}")
          }
        }
      })
      pr.println("return null")
      pr.println("}")

      if (cls.getEAllSuperTypes.exists(st => hasFindByIDMethod(st))) {
        pr.print("override fun ")
      } else {
        pr.print("fun ")
      }
      pr.println("findByQuery<A>(query : String, clazz : Class<A>) : A? {")
      pr.println("try {")
      pr.println("val res= findByQuery(query)")
      pr.println("if(res != null){return (res as A)} else {return (null)}")
      pr.println("}catch(e:Exception){")
      pr.println("return (null)")
      pr.println("}")
      pr.println("}")

      if (cls.getEAllSuperTypes.exists(st => hasFindByIDMethod(st))) {
        pr.print("override fun ")
      } else {
        pr.print("fun ")
      }
      pr.println("findByQuery(query : String) : Any? {")
      pr.println("val firstSepIndex = query.indexOf('[')")
      pr.println("var queryID = \"\"")
      pr.println("var extraReadChar = 2")

      val optionalRelationShipNameGen = cls.getEAllReferences.filter(ref => hasID(ref.getEReferenceType) /*&& (ref.getUpperBound == -1 || ref.getLowerBound > 1)*/).size == 1
      if (optionalRelationShipNameGen) {
        //Optional relationship definition
        val relationShipOptionalName = cls.getEAllReferences.filter(ref => hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)).get(0).getName
        pr.println("val relationName = \"" + relationShipOptionalName + "\"")
        pr.println("val optionalDetected = ( firstSepIndex != " + relationShipOptionalName.size + " )")
        pr.println("if(optionalDetected){ extraReadChar = extraReadChar - 2 }")
      } else {
        pr.println("val relationName = query.substring(0,query.indexOf('['))")
      }

      if (optionalRelationShipNameGen) {
        pr.println("if(query.indexOf('{') == 0){")
      } else {
        pr.println("if(query.indexOf('{') == firstSepIndex +1){")
      }

      pr.println("queryID = query.substring(query.indexOf('{')+1,query.indexOf('}'))")
      pr.println("extraReadChar = extraReadChar + 2")
      pr.println("} else {") //Normal case

      if (optionalRelationShipNameGen) {
        pr.println("if(optionalDetected){")

        pr.println("if(query.indexOf('/') != - 1){")
        pr.println("queryID = query.substring(0,query.indexOf('/'))")
        pr.println("} else {")
        pr.println("queryID = query.substring(0,query.size)")
        //pr.println("extraReadChar = extraReadChar - 1")
        pr.println("}")

        pr.println("} else {")
        pr.println("queryID = query.substring(query.indexOf('[')+1,query.indexOf(']'))")
        pr.println("}")
      } else {
        pr.println("queryID = query.substring(query.indexOf('[')+1,query.indexOf(']'))")
      }

      pr.println("}")

      if (optionalRelationShipNameGen) {
        pr.println("var subquery = query.substring((if(optionalDetected){0} else {relationName.size})+queryID.size+extraReadChar,query.size)")
      } else {
        pr.println("var subquery = query.substring(relationName.size+queryID.size+extraReadChar,query.size)")
      }
      pr.println("if (subquery.indexOf('/') != -1){")
      pr.println("subquery = subquery.substring(subquery.indexOf('/')+1,subquery.size)")
      pr.println("}")
      pr.println("return when(relationName) {")
      cls.getEAllReferences.foreach(ref => {
        if (hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)) {
          pr.println("\"" + ref.getName + "\" -> {")
          pr.println("val objFound = find" + protectReservedWords(ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)) + "ByID(queryID)")
          pr.println("if(subquery != \"\" && objFound != null){")
          if (hasFindByIDMethod(ref.getEReferenceType)) {
            pr.println("objFound.findByQuery(subquery)")
          } else {
            pr.println("throw Exception(\"KMFQL : rejected sucessor\")")
          }
          pr.println("} else {objFound}")
          pr.println("}")

        }
        if (hasID(ref.getEReferenceType) && (ref.getUpperBound == 1) && (ref.getLowerBound == 1)) {
          pr.println("\"" + ref.getName + "\" -> {")
          pr.println("get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "()")
          pr.println("}")
        }
        if (hasID(ref.getEReferenceType) && (ref.getUpperBound == 1) && (ref.getLowerBound == 0)) {
          pr.println("\"" + ref.getName + "\" -> {")
          pr.println("get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "()")
          pr.println("}")
        }
      })
      pr.println("else -> {}")
      pr.println("}")
      pr.println("}")
    } else {


      val superTypes = cls.getESuperTypes.toSet
      if (superTypes.size > 0) {
        pr.println()
        pr.println("override fun internalGetQuery(selfKey : String) : String? {")
        pr.println("var subResult : String? = null")
        superTypes.foreach(superType => {
          pr.println("subResult = super<" + superType.getName + ">.internalGetQuery(selfKey)")
          pr.println("if(subResult!=null){")
          pr.println("  return subResult")
          pr.println("}")
        })
        pr.println("return null")
        pr.println("}")
        pr.println("")
      }


    }
  }


  private def generateAtts(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String) {

    cls.getEAttributes.foreach {
      att =>
        pr.print("var " + protectReservedWords("_" + att.getName) + " : ")
        ProcessorHelper.convertType(att.getEAttributeType) match {
          case "java.lang.String" => pr.println("String")
          case "java.lang.Integer" => pr.println("Int")
          case "java.lang.Boolean" => pr.println("Boolean")
          case "java.lang.Object" | "Any" => pr.println("Any?")
          case "null" => throw new UnsupportedOperationException("ClassGenerator:: Attribute type: " + att.getEAttributeType.getInstanceClassName + " has not been converted in a known type. Can not initialize.")
          case _@className => pr.println(className)
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
          pr.println("var " + protectReservedWords("_" + ref.getName) + "_java_cache : List<" + typeRefName + ">?")
          if (hasID(ref.getEReferenceType)) {
            pr.println("val " + protectReservedWords("_" + ref.getName) + " : java.util.HashMap<Any," + typeRefName + ">")
          } else {
            pr.println("val " + protectReservedWords("_" + ref.getName) + " :MutableList<" + typeRefName + ">")
          }
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          // optional single ref
          pr.println("var " + protectReservedWords("_" + ref.getName) + " : " + typeRefName + "?")
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 1) {
          // mandatory single ref
          pr.println("var " + protectReservedWords("_" + ref.getName) + " : " + typeRefName + "?")
        } else if (ref.getLowerBound > 1) {
          // else
          pr.println("var " + protectReservedWords("_" + ref.getName) + "_java_cache : List<" + typeRefName + ">?")
          if (hasID(ref.getEReferenceType)) {
            pr.println("val " + protectReservedWords("_" + ref.getName) + " : java.util.HashMap<Any," + typeRefName + ">")
          } else {
            pr.println("val " + protectReservedWords("_" + ref.getName) + " :MutableList<" + typeRefName + ">")
          }
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::Not standard arrity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
        }
    }
  }


  private def generateAllGetterSetterMethod(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String) {


    cls.getEAttributes.foreach {
      att =>
      //Generate getter
        if (ProcessorHelper.convertType(att.getEAttributeType) == "Any"){
          pr.print("fun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "() : " + ProcessorHelper.convertType(att.getEAttributeType) + "? {\n")
        } else {
          pr.print("fun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "() : " + ProcessorHelper.convertType(att.getEAttributeType) + " {\n")
        }
        pr.println(" return " + protectReservedWords("_" + att.getName) + "\n}")


        //generate setter
        pr.print("\nfun set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1))
        pr.print("(" + protectReservedWords(att.getName) + " : " + ProcessorHelper.convertType(att.getEAttributeType) + ") {\n")
        pr.println("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}")
        pr.println(protectReservedWords("_" + att.getName) + " = " + protectReservedWords(att.getName))
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
          throw new UnsupportedOperationException("GenDefConsRef::Not a standard arrity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
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
    /*
    res += {
      if (isOptional) {
        if (!isSingleRef) {
          "?"
        } else {
          ""
        }
      } else {
        ""
      }
    }*/
    res += " {\n"
    //Method core
    if (isSingleRef) {
      res += "return "
      res += protectReservedWords("_" + ref.getName)
      res += "\n"
    } else {
      res += "return if(" + protectReservedWords("_" + ref.getName) + "_java_cache != null){\n"
      res += protectReservedWords("_" + ref.getName) + "_java_cache as List<" + typeRefName + ">\n"
      res += "} else {\n"
      if (hasID(ref.getEReferenceType)) {
        res += "val tempL = java.util.Collections.unmodifiableList(" + protectReservedWords("_" + ref.getName) + ".values().toList()) \n"
      } else {
        res += "val tempL = java.util.Collections.unmodifiableList(" + protectReservedWords("_" + ref.getName) + ") \n"
      }

      res += protectReservedWords("_" + ref.getName) + "_java_cache = tempL\n"
      res += "tempL\n"
      res += "}\n"
    }
    res += "}"
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
      res += "\nfun noOpposite_set" + formatedLocalRefName
    } else {
      res += "\nfun set" + formatedLocalRefName
    }

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

    res += " ) {\n"

    //Read only protection
    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    if (ref.isMany) {
      res += "if(" + protectReservedWords(ref.getName) + " == null){ throw IllegalArgumentException(\"The list in parameter of the setter cannot be null. Use removeAll to empty a collection.\") }\n"
    }
    if (!isSingleRef) {
      //Clear cache
      res += (protectReservedWords("_" + ref.getName) + "_java_cache=null\n")
    }

    res += "if(" + protectReservedWords("_" + ref.getName) + "!= " + protectReservedWords(ref.getName) + "){\n"
    val oppositRef = ref.getEOpposite

    if (!ref.isMany) {
      // -> Single ref : 0,1 or 1
      if (!noOpposite && (oppositRef != null)) {
        //Management of opposite relation in regular setter
        val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)

        if (oppositRef.isMany) {
          // 0,1 or 1  -- *

          if (ref.isRequired) {
            // Single Ref  1
            res += "if(" + protectReservedWords("_" + ref.getName) + " != null){\n"
            res += protectReservedWords("_" + ref.getName) + "!!.noOpposite_remove" + formatedOpositName + "(this)\n"
            res += "}\n"
            res += "if(" + protectReservedWords(ref.getName) + " != null){\n"
            res += "" + protectReservedWords(ref.getName) + ".noOpposite_add" + formatedOpositName + "(this)\n"
            res += "}\n"
          } else {
            // Single Ref  0,1
            res += "if(" + protectReservedWords("_" + ref.getName) + " != null) { " + protectReservedWords("_" + ref.getName) + "!!.noOpposite_remove" + formatedOpositName + "(this) }\n"
            res += "if(" + protectReservedWords(ref.getName) + "!=null) {" + protectReservedWords(ref.getName) + ".noOpposite_add" + formatedOpositName + "(this)}\n"
          }

        } else {
          // -> // 0,1 or 1  --  0,1 or 1

          if (ref.isRequired) {
            // 1 -- 0,1 or 1

            res += "if(" + protectReservedWords("_" + ref.getName) + " != null){\n"
            res += "" + protectReservedWords("_" + ref.getName) + ".noOpposite_set" + formatedOpositName + "(null)\n"

            if (ref.isContainment) {
              res += "" + protectReservedWords("_" + ref.getName) + "?.setEContainer(null,null)\n"
            }
            res += "}\n"

            res += "if(" + protectReservedWords(ref.getName) + " != null){\n"

            res += protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(this)\n"

            if (ref.isContainment) {
              res += protectReservedWords(ref.getName) + "?.setEContainer(this,null)\n"
            }

            res += "}\n"

          } else {
            // 0,1 -- 0,1 or 1
            if (oppositRef.isRequired) {
              // 0,1 -- 1
              if (!ref.isContainment) {
                res += "if(this." + protectReservedWords(ref.getName) + "!=null){" + protectReservedWords("_" + ref.getName) + ".noOpposite_set" + formatedOpositName + "(null) }\n"
                res += "if(" + protectReservedWords(ref.getName) + "!=null){" + protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(this)}\n"
              } else {
                res += "if(" + protectReservedWords("_" + ref.getName) + "!=null) {\n"
                res += protectReservedWords("_" + ref.getName) + ".noOpposite_set" + formatedOpositName + "(null)\n"
                res += protectReservedWords("_" + ref.getName) + ".setEContainer(null,null)\n"
                res += "}\n"
                res += "if(" + protectReservedWords(ref.getName) + "!= null) {\n"
                res += protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(this)\n"
                res += protectReservedWords(ref.getName) + ".setEContainer(this,null)\n"
                res += "}\n"
              }
            } else {
              // 0,1 -- 0,1
              if (!ref.isContainment) {
                res += "if(" + protectReservedWords("_" + ref.getName) + "!=null) {" + protectReservedWords("_" + ref.getName) + ".noOpposite_set" + formatedOpositName + "(null) }\n"
                res += "if(" + protectReservedWords(ref.getName) + "!=null) {" + protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(this)}\n"
              } else {
                res += "if(" + protectReservedWords("_" + ref.getName) + "!=null) {\n"
                res += protectReservedWords("_" + ref.getName) + ".noOpposite_set" + formatedOpositName + "(null)\n"
                res += protectReservedWords("_" + ref.getName) + ".setEContainer(null,null)\n"
                res += "}\n"
                res += "if(" + protectReservedWords(ref.getName) + "!= null) {\n"
                res += protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(this)\n"
                res += protectReservedWords(ref.getName) + "?.setEContainer(this,null)\n"
                res += "}\n"
              }

            }

          }
        }
      }

      if (noOpposite && ref.isContainment) {
        // containment relation in noOpposite Method
        if (!ref.isRequired) {
          res += "if(" + protectReservedWords("_" + ref.getName) + "!=null){ " + protectReservedWords("_" + ref.getName) + ".setEContainer(null,null)}\n"
          res += "if(" + protectReservedWords(ref.getName) + "!=null) {" + protectReservedWords(ref.getName) + ".setEContainer(this,null)}\n"
        } else {
          res += "if(" + protectReservedWords("_" + ref.getName) + " != null){\n"
          res += protectReservedWords("_" + ref.getName) + "?.setEContainer(null, null)\n"
          res += "}\n"
          res += "if(" + protectReservedWords(ref.getName) + " != null){\n"
          res += protectReservedWords(ref.getName) + ".setEContainer(this, {() -> " + protectReservedWords("_" + ref.getName) + "= _:" + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + " )\n"
          res += "}\n"
        }
      } else {
        // containment with no opposite relation
        if (ref.isContainment && (ref.getEOpposite == null)) {
          if (ref.isMany) {
            res += protectReservedWords(ref.getName) + ".setEContainer(this, {() -> this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + protectReservedWords(ref.getName) + ")} )\n"
          } else {
            /* if (ref.isRequired) {
               res += "if(" + protectReservedWords("_" + ref.getName) + " != null){" + protectReservedWords("_" + ref.getName) + ".setEContainer(null, null)}\n"
               res += "if(" + protectReservedWords(ref.getName) + " != null){" + protectReservedWords(ref.getName) + ".setEContainer(this, {() -> { this." + protectReservedWords(ref.getName) + "= null})})}\n"
             } else {*/
            res += "if(" + protectReservedWords("_" + ref.getName) + "!=null){ " + protectReservedWords("_" + ref.getName) + "?.setEContainer(null, null)}\n"
            res += "if(" + protectReservedWords(ref.getName) + "!=null){ " + protectReservedWords(ref.getName) + ".setEContainer(this, {() -> " + protectReservedWords("_" + ref.getName) + "= null})}\n"
            //}
          }

        }
      }
      //Setting of local reference
      res += protectReservedWords("_" + ref.getName) + " = (" + protectReservedWords(ref.getName) + ")\n"


    } else {
      // -> Collection ref : * or +
      res += protectReservedWords("_" + ref.getName) + ".clear()\n"

      if (hasID(ref.getEReferenceType)) {
        res += "for(el in " + protectReservedWords(ref.getName) + "){\n"
        res += protectReservedWords("_" + ref.getName) + ".put(el." + generateGetIDAtt(ref.getEReferenceType) + "(),el)\n"
        res += "}\n"
      } else {
        res += protectReservedWords("_" + ref.getName) + ".addAll(" + protectReservedWords(ref.getName) + ")\n"
      }

      if (ref.isContainment) {
        if (oppositRef != null) {
          res += "for(elem in " + protectReservedWords(ref.getName) + "){\n"
          res += "elem.setEContainer(this,{()->this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(elem)})\n"

          val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
          if (oppositRef.isMany) {
            res += "elem.noOpposite_add" + formatedOpositName + "(this)\n"
          } else {
            res += "elem.noOpposite_set" + formatedOpositName + "(this)\n"
          }
          res += "}\n"
        } else {
          res += "for(elem in " + protectReservedWords(ref.getName) + "){elem.setEContainer(this,{()->this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(elem)})}\n"
        }
      } else {
        if (oppositRef != null) {
          val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
          if (oppositRef.isMany) {
            res += "for(elem in " + protectReservedWords(ref.getName) + "){elem.noOpposite_add" + formatedOpositName + "(this)}\n"
          } else {

            val callParam = "this"

            res += "for(elem in " + protectReservedWords(ref.getName) + "){elem.noOpposite_set" + formatedOpositName + "(" + callParam + ")}\n"
          }
        }
      }

    }
    res += "}\n" //END IF newRef != localRef

    if (noOpposite && oppositRef != null && oppositRef.isMany && !hasID(ref.getEReferenceType)) {
      res += "else {\n"
      //DUPLICATE CASE OF SET / ONLY IN LOADER RUN
      val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
      // 0,1 or 1  -- *
      if (ref.isRequired) {
        // Single Ref  1
        res += "if(" + protectReservedWords("_" + ref.getName) + " != null){\n"
        res += protectReservedWords("_" + ref.getName) + "!!.noOpposite_remove" + formatedOpositName + "(this)\n"
        res += "}\n"
      } else {
        // Single Ref  0,1
        res += "if(this." + protectReservedWords(ref.getName) + "!=null){ this." + protectReservedWords(ref.getName) + ".noOpposite_remove" + formatedOpositName + "(this) }\n"
      }
      res += "}\n"
    }

    res += "\n}" //END Method
    res

  }


  private def generateAddMethod(cls: EClass, ref: EReference, typeRefName: String): String = {
    generateAddMethodOp(cls, ref, typeRefName, false) + generateAddAllMethodOp(cls, ref, typeRefName, false) +
      (if (ref.getEOpposite != null) {
        generateAddMethodOp(cls, ref, typeRefName, true) + generateAddAllMethodOp(cls, ref, typeRefName, true)
      } else {
        ""
      })
  }

  private def generateAddAllMethodOp(cls: EClass, ref: EReference, typeRefName: String, noOpposite: Boolean): String = {
    var res = ""
    res += "\n"
    if (noOpposite) {
      res += "\nfun noOpposite_addAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    } else {
      res += "\nfun addAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    }
    res += "(" + protectReservedWords(ref.getName) + " :List<" + typeRefName + ">) {\n"
    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    //Clear cache
    res += (protectReservedWords("_" + ref.getName) + "_java_cache=null\n")

    if (hasID(ref.getEReferenceType)) {

      res += "for(el in " + protectReservedWords(ref.getName) + "){\n"
      res += protectReservedWords("_" + ref.getName) + ".put(el." + generateGetIDAtt(ref.getEReferenceType) + "(),el)\n"
      res += "}\n"

    } else {
      res += protectReservedWords("_" + ref.getName) + ".addAll(" + protectReservedWords(ref.getName) + ")\n"
    }


    if ((!noOpposite && ref.getEOpposite != null) || ref.isContainment) {
      res += "for(el in " + protectReservedWords(ref.getName) + "){\n"
      if (ref.isContainment) {
        res += "el.setEContainer(this,{()->this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(el)})\n"
      }
      if (ref.getEOpposite != null && !noOpposite) {
        val opposite = ref.getEOpposite
        val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)
        if (!opposite.isMany) {
          res += "el.noOpposite_set" + formatedOpositName + "(this)"
        } else {
          res += "el.noOpposite_add" + formatedOpositName + "(this)"
        }
      }
      res += "}\n"
    }
    res += "}\n"
    res
  }


  private def generateAddMethodOp(cls: EClass, ref: EReference, typeRefName: String, noOpposite: Boolean): String = {
    //generate add
    var res = ""
    val formatedAddMethodName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    if (noOpposite) {
      res += "\nfun noOpposite_add" + formatedAddMethodName
    } else {
      res += "\nfun add" + formatedAddMethodName
    }
    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ") {\n"
    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")

    //Clear cache
    res += (protectReservedWords("_" + ref.getName) + "_java_cache=null\n")

    if (ref.isContainment) {
      res += "" + protectReservedWords(ref.getName) + ".setEContainer(this,{()->this.remove" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "(" + protectReservedWords(ref.getName) + ")})\n"
    }

    if (hasID(ref.getEReferenceType)) {
      res += protectReservedWords("_" + ref.getName) + ".put(" + protectReservedWords(ref.getName) + "." + generateGetIDAtt(ref.getEReferenceType) + "()," + protectReservedWords(ref.getName) + ")\n"
    } else {
      res += protectReservedWords("_" + ref.getName) + ".add(" + protectReservedWords(ref.getName) + ")\n"
    }



    if (ref.getEOpposite != null && !noOpposite) {
      val opposite = ref.getEOpposite
      val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)

      if (!opposite.isMany) {
        res += protectReservedWords(ref.getName) + ".noOpposite_set" + formatedOpositName + "(this)"
      } else {
        res += protectReservedWords(ref.getName) + ".noOpposite_add" + formatedOpositName + "(this)"
      }
    }
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
      res += "\nfun noOpposite_remove" + formatedMethodName
    } else {
      res += "\nfun remove" + formatedMethodName
    }


    res += "(" + protectReservedWords(ref.getName) + " : " + typeRefName + ") {\n"

    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    //Clear cache
    res += (protectReservedWords("_" + ref.getName) + "_java_cache=null\n")



    if (isOptional) {
      if (hasID(ref.getEReferenceType)) {
        res += "if(" + protectReservedWords("_" + ref.getName) + ".size() != 0 && " + protectReservedWords("_" + ref.getName) + ".containsKey(" + protectReservedWords(ref.getName) + "." + generateGetIDAtt(ref.getEReferenceType) + "())) {\n"
      } else {
        res += "if(" + protectReservedWords("_" + ref.getName) + ".size() != 0 && " + protectReservedWords("_" + ref.getName) + ".indexOf(" + protectReservedWords(ref.getName) + ") != -1 ) {\n"
      }

    } else {

      if (hasID(ref.getEReferenceType)) {
        res += "if(" + protectReservedWords("_" + ref.getName) + ".size == " + ref.getLowerBound + "&& " + protectReservedWords("_" + ref.getName) + ".containsKey(" + protectReservedWords(ref.getName) + "." + generateGetIDAtt(ref.getEReferenceType) + "()) ) {\n"
      } else {
        res += "if(" + protectReservedWords("_" + ref.getName) + ".size == " + ref.getLowerBound + "&& " + protectReservedWords("_" + ref.getName) + ".indexOf(" + protectReservedWords(ref.getName) + ") != -1 ) {\n"
      }

      res += "throw UnsupportedOperationException(\"The list of " + protectReservedWords(ref.getName) + " must contain at least " + ref.getLowerBound + " element. Connot remove sizeof(" + protectReservedWords(ref.getName) + ")=\"+" + protectReservedWords("_" + ref.getName) + ".size)\n"
      res += "} else {\n"
    }

    if (hasID(ref.getEReferenceType)) {
      res += protectReservedWords("_" + ref.getName) + ".remove(" + protectReservedWords(ref.getName) + "." + generateGetIDAtt(ref.getEReferenceType) + "())\n"
    } else {
      res += protectReservedWords("_" + ref.getName) + ".remove(" + protectReservedWords("_" + ref.getName) + ".indexOf(" + protectReservedWords(ref.getName) + "))\n"
    }

    if (ref.isContainment) {
      //TODO
      res += "" + protectReservedWords(ref.getName) + "?.setEContainer(null,null)\n"
    }

    val oppositRef = ref.getEOpposite
    if (!noOpposite && oppositRef != null) {
      val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
      if (oppositRef.isMany) {
        res += "" + protectReservedWords(ref.getName) + ".noOpposite_remove" + formatedOpositName + "(this)\n"
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
      res += "\nfun noOpposite_removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "() {\n"
    } else {
      res += "\nfun removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "() {\n"
    }

    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    if ((!noOpposite && ref.getEOpposite != null) || ref.isContainment) {


      if (hasID(ref.getEReferenceType)) {
        //TODO CALL GETTER

        res += "for(elm in " + protectReservedWords("_" + ref.getName + "_java_cache") + "!!){\n"
        res += "val el = elm\n"
      } else {
        res += "val temp_els = java.util.Collections.unmodifiableList(" + protectReservedWords("_" + ref.getName) + ")\n"
        res += "for(el in temp_els){\n"
      }

      if (ref.isContainment) {
        res += "el.setEContainer(null,null)\n"
      }
      if (ref.getEOpposite != null && !noOpposite) {
        val opposite = ref.getEOpposite
        val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)
        if (!opposite.isMany) {
          res += "el.noOpposite_set" + formatedOpositName + "(null)"
        } else {
          res += "el.noOpposite_remove" + formatedOpositName + "(this)"
        }
      }
      res += "}\n"
    }
    res += (protectReservedWords("_" + ref.getName) + "_java_cache=null\n")
    res += protectReservedWords("_" + ref.getName) + ".clear()\n"

    res += "}"
    res
  }


}
