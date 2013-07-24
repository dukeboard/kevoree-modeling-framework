

package org.kevoree.modeling.kotlin.generator.model

import java.io.{File, PrintWriter}
import org.kevoree.modeling.kotlin.generator.ProcessorHelper._
import scala.collection.JavaConversions._
import org.eclipse.emf.ecore._
import org.kevoree.modeling.kotlin.generator.{GenerationContext, ProcessorHelper}
import scala.Some

/**
 * Created by IntelliJ IDEA.
 * Users: Gregory NAIN, Fouquet Francois
 * Date: 23/09/11
 * Time: 13:35
 */

trait ClassGenerator extends ClonerGenerator {

  var param_suf = "P"

  def generateKMFQLMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String)

  def generateSelectorMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext)

  def generateEqualsMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext)

  def generateContainedElementsMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext)

  def generateCompanion(ctx: GenerationContext, currentPackageDir: String, packElement: EPackage, cls: EClass, srcCurrentDir: String) {
    val localFile = new File(currentPackageDir + "/impl/" + cls.getName + "Impl.kt")
    val userFile = new File(srcCurrentDir + "/impl/" + cls.getName + "Impl.kt")
    if (userFile.exists()) {
      return
    }

    val pr = new PrintWriter(localFile, "utf-8")
    val pack = ProcessorHelper.fqn(ctx, packElement)
    pr.println("package " + pack + ".impl")
    pr.println()
    pr.println("import " + pack + ".*")
    pr.println()
    pr.print("class " + cls.getName + "Impl(")
    pr.println(") : " + cls.getName + "Internal {")
    //test if generation of variable from Base Trait
    // if (cls.getESuperTypes.isEmpty) {
    //val formatedFactoryName: String = packElement.getName.substring(0, 1).toUpperCase + packElement.getName.substring(1) + "Container"
    pr.println("override internal var internal_eContainer : " + ctx.getKevoreeContainer.get + "? = null")
    pr.println("override internal var internal_containmentRefName : String? = null")
    pr.println("override internal var internal_unsetCmd : " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand? = null")
    pr.println("override internal var internal_readOnlyElem : Boolean = false")
    pr.println("override internal var internal_recursive_readOnlyElem : Boolean = false")
    if (ctx.generateEvents) {
      pr.println("override internal var internal_modelElementListeners : MutableList<" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelElementListener>? = null")
      pr.println("override internal var internal_modelTreeListeners : MutableList<" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelTreeListener>? = null")
    }

    //pr.println("override internal var containedIterable : Iterable<"+ctx.getKevoreeContainer.get+">? = null")


    //  }
    //generate init
    cls.getEAllAttributes.foreach {
      att => {
        val defaultValue = att.getDefaultValueLiteral
        pr.print("override internal var " + "_" + att.getName + " : ")
        ProcessorHelper.convertType(att.getEAttributeType) match {
          case "java.lang.String" => pr.println("String = \"\"")
          case "String" => pr.println("String = \"\"")
          case "Double" => pr.println("Double = " + {
            if (defaultValue == null) {
              "0.0"
            } else {
              defaultValue
            }
          })
          case "java.lang.Integer" => pr.println("Int = " + {
            if (defaultValue == null) {
              "0"
            } else {
              defaultValue
            }
          })
          case "Int" => pr.println("Int = " ++ {
            if (defaultValue == null) {
              "0"
            } else {
              defaultValue
            }
          })
          case "Boolean" | "java.lang.Boolean" => pr.println("Boolean = " + {
            if (defaultValue == null) {
              "false"
            } else {
              defaultValue
            }
          })
          case "java.lang.Object" | "Any" => pr.println("Any? = null")
          case "java.lang.Class" | "Class" | "Class<out jet.Any?>" => pr.println("Class<out jet.Any?>? = null")
          case "null" => throw new UnsupportedOperationException("ClassGenerator:: Attribute type: " + att.getEAttributeType.getInstanceClassName + " has not been converted in a known type. Can not initialize.")
          case "float" | "Float" => "Float = " + {
            if (defaultValue == null) {
              "0"
            } else {
              defaultValue
            }
          }
          case "char" | "Char" => "Char = 'a'"
          case "java.math.BigInteger" => "java.math.BigInteger = java.math.BigInteger.ZERO"
          case _@className => {
            if (att.getEAttributeType.isInstanceOf[EEnum]) {
              pr.println(ProcessorHelper.fqn(ctx, att.getEAttributeType) + "? = null")
            } else {
              // println("--->" + className)
              pr.println(className)
            }
          }
        }
      }
    }
    cls.getEAllReferences.foreach {
      ref =>
        val typeRefName = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
        if (ref.getUpperBound == -1) {
          // multiple values
          pr.println("override internal var " + "_" + ref.getName + "_java_cache :List<" + typeRefName + ">? = null")
          if (hasID(ref.getEReferenceType)) {
            pr.println("override internal val " + "_" + ref.getName + " : java.util.HashMap<Any," + typeRefName + "> = java.util.HashMap<Any," + typeRefName + ">()")
          } else {
            pr.println("override internal val " + "_" + ref.getName + " :MutableList<" + typeRefName + "> = java.util.ArrayList<" + typeRefName + ">()")
          }
          if (ctx.generateEvents && ref.isContainment) {
            pr.println("override internal var removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "CurrentlyProcessing : Boolean = false")
          }
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          // optional single ref
          pr.println("override internal var " + "_" + ref.getName + " : " + typeRefName + "? = null")
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 1) {
          // mandatory single ref
          pr.println("override internal var " + "_" + ref.getName + " : " + typeRefName + "? = null")
        } else if (ref.getLowerBound > 1) {
          // else
          pr.println("override internal var " + "_" + ref.getName + "_java_cache :List<" + typeRefName + ">? = null")
          if (hasID(ref.getEReferenceType)) {
            pr.println("override internal val " + "_" + ref.getName + " : java.util.HashMap<Any," + typeRefName + "> = java.util.HashMap<Any," + typeRefName + ">()")
          } else {
            pr.println("override internal val " + "_" + ref.getName + " :MutableList<" + typeRefName + "> = java.util.ArrayList<" + typeRefName + ">()")
          }
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::Not standard arrity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
        }
    }
    pr.println("}")
    pr.flush()
    pr.close()
  }

  def hasID(cls: EClass): Boolean = {
    cls.getEAllAttributes.exists {
      att => att.isID
    }
  }

  /*
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
  */


  def hasFindByIDMethod(cls: EClass): Boolean = {
    cls.getEReferences.exists(ref => {
      hasID(ref.getEReferenceType) && (ref.getUpperBound == -1 || ref.getLowerBound > 1)
    })
  }

  private def getGetter(name: String): String = {
    "get" + name.charAt(0).toUpper + name.substring(1) + "()"
  }

  def generateClass(ctx: GenerationContext, currentPackageDir: String, packElement: EPackage, cls: EClass) {
    val localFile = new File(currentPackageDir + "/impl/" + cls.getName + "Internal.kt")
    val pr = new PrintWriter(localFile, "utf-8")
    val pack = ProcessorHelper.fqn(ctx, packElement)
    pr.println("package " + pack + ".impl")
    pr.println()
    pr.println(generateHeader(packElement))
    //case class name

    ctx.classFactoryMap.put(pack + "." + cls.getName, ctx.packageFactoryMap.get(pack))

    pr.print("trait " + cls.getName + "Internal")
    pr.println((generateSuperTypesPlusSuperAPI(ctx, cls, packElement) match {
      case None => "{"
      case Some(s) => s + " {"
    }))

    //Generate RecursiveReadOnly
    pr.println("override fun setRecursiveReadOnly(){")

    pr.println("if(internal_recursive_readOnlyElem == true){return}")
    pr.println("internal_recursive_readOnlyElem = true")

    cls.getEAllReferences.foreach {
      contained =>
        if (contained.getUpperBound == -1) {
          // multiple values
          pr.println("for(sub in this." + getGetter(contained.getName) + "){")
          pr.println("sub.setRecursiveReadOnly()")
          pr.println("}")
        } else if (contained.getUpperBound == 1 /*&& contained.getLowerBound == 0*/ ) {
          // optional single ref
          pr.println("val subsubsubsub" + contained.getName + " = this." + getGetter(contained.getName) + "")
          pr.println("if(subsubsubsub" + contained.getName + "!= null){ ")
          pr.println("subsubsubsub" + contained.getName + ".setRecursiveReadOnly()")
          pr.println("}")
        } else if (contained.getLowerBound > 1) {
          // else
          pr.println("for(sub in this." + getGetter(contained.getName) + "){")
          pr.println("\t\t\tsub.setRecursiveReadOnly()")
          pr.println("\t\t}")
        } else {
          throw new UnsupportedOperationException("ClonerGenerator::Not standard arrity: " + cls.getName + "->" + contained.getName + "[" + contained.getLowerBound + "," + contained.getUpperBound + "]. Not implemented yet !")
        }
        pr.println()
    }
    pr.println("setInternalReadOnly()")

    pr.println("}")

    generateAtts(pr, cls, ctx, pack)
    generateDeleteMethod(pr, cls, ctx, pack)

    // Getters and Setters Generation
    generateAllGetterSetterMethod(pr, cls, ctx, pack)

    //if(cls.getEAllReferences.exists{ c => !c.isContainment }) {
    generateFlatReflexiveSetters(ctx, cls, pr)
    // }

    //GENERATE CLONE METHOD
    generateCloneMethods(ctx, cls, pr, packElement)
    generateKMFQLMethods(pr, cls, ctx, pack)

    if (ctx.genSelector) {
      generateSelectorMethods(pr, cls, ctx)
    }

    generateEqualsMethods(pr, cls, ctx)
    generateContainedElementsMethods(pr, cls, ctx)

    pr.println("}")
    pr.flush()
    pr.close()

  }

  def generateFlatReflexiveSetters(ctx: GenerationContext, cls: EClass, pr: PrintWriter) {
    pr.println("override fun reflexiveMutator(mutationType : String,refName : String, value : Any?) {")
    pr.println("val refMethodName = mutationType + refName.substring(0, 1).toUpperCase() + refName.substring(1); ")
    pr.println("  when(refMethodName) {")

    //TODO DO same for ATT

    cls.getEAllReferences.foreach {
      ref =>
        if (ref.isMany) {
          val methods = List("add", "remove", "addAll", "removeAll")
          methods.foreach {
            methodName =>
              val methodNameClean = methodName + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
              val valueType = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
              pr.println("   \"" + methodNameClean + "\" -> {")
              if (methodName.equals("addAll")) {
                pr.println("      this." + methodNameClean + "(value as List<" + valueType + ">)")
              } else if (methodName.equals("removeAll")) {
                pr.println("      this." + methodNameClean + "()")
              } else {
                pr.println("      this." + methodNameClean + "(value as " + valueType + ")")
              }

              pr.println("    }")
          }
        } else {
          val methodNameClean = "set" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
          val valueType = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
          pr.println("   \"" + methodNameClean + "\" -> {")
          pr.println("      this." + methodNameClean + "(value as " + valueType + ")")
          pr.println("    }")
        }
    }
    pr.println("    else -> { throw Exception(\"Can reflexively \"+mutationType+\" for \"+refName + \" on \"+ this) }")
    pr.println("  }")
    pr.println("}")
  }

  def generateFlatClass(ctx: GenerationContext, currentPackageDir: String, packElement: EPackage, cls: EClass) {

    val localFile = new File(currentPackageDir + "/impl/" + cls.getName + "Impl.kt")
    val pr = new PrintWriter(localFile, "utf-8")
    val pack = ProcessorHelper.fqn(ctx, packElement)
    pr.println("package " + pack + ".impl")
    pr.println()
    pr.println(generateHeader(packElement))
    //case class name
    ctx.classFactoryMap.put(pack + "." + cls.getName, ctx.packageFactoryMap.get(pack))
    pr.print("class " + cls.getName + "Impl")
    pr.println(" : " + ctx.getKevoreeContainerImplFQN + ", " + fqn(ctx, packElement) + "." + cls.getName + " { ")

    pr.println("override internal var internal_eContainer : " + ctx.getKevoreeContainer.get + "? = null")
    pr.println("override internal var internal_containmentRefName : String? = null")
    pr.println("override internal var internal_unsetCmd : " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand? = null")
    pr.println("override internal var internal_readOnlyElem : Boolean = false")
    pr.println("override internal var internal_recursive_readOnlyElem : Boolean = false")
    if (ctx.generateEvents) {
      pr.println("override internal var internal_modelElementListeners : MutableList<" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelElementListener>? = null")
      pr.println("override internal var internal_modelTreeListeners : MutableList<" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelTreeListener>? = null")
    }
    //generate init
    cls.getEAllAttributes.foreach {
      att => {
        val defaultValue = att.getDefaultValueLiteral
        pr.print("internal var " + "_" + att.getName + " : ")
        ProcessorHelper.convertType(att.getEAttributeType) match {
          case "java.lang.String" => pr.println("String = \"\"")
          case "String" => pr.println("String = \"\"")
          case "Double" => pr.println("Double = " + {
            if (defaultValue == null) {
              "0.0"
            } else {
              defaultValue
            }
          })
          case "java.lang.Integer" => pr.println("Int = " + {
            if (defaultValue == null) {
              "0"
            } else {
              defaultValue
            }
          })
          case "Int" => pr.println("Int = " ++ {
            if (defaultValue == null) {
              "0"
            } else {
              defaultValue
            }
          })
          case "Boolean" | "java.lang.Boolean" => pr.println("Boolean = " + {
            if (defaultValue == null) {
              "false"
            } else {
              defaultValue
            }
          })
          case "java.lang.Object" | "Any" => pr.println("Any? = null")
          case "java.lang.Class" | "Class" | "Class<out jet.Any?>" => pr.println("Class<out jet.Any?>? = null")
          case "null" => throw new UnsupportedOperationException("ClassGenerator:: Attribute type: " + att.getEAttributeType.getInstanceClassName + " has not been converted in a known type. Can not initialize.")
          case "float" | "Float" => "Float = " + {
            if (defaultValue == null) {
              "0"
            } else {
              defaultValue
            }
          }
          case "char" | "Char" => "Char = 'a'"
          case "java.math.BigInteger" => "java.math.BigInteger = java.math.BigInteger.ZERO"
          case _@className => {
            if (att.getEAttributeType.isInstanceOf[EEnum]) {
              pr.println(ProcessorHelper.fqn(ctx, att.getEAttributeType) + "? = null")
            } else {
              // println("--->" + className)
              pr.println(className)
            }
          }
        }
      }
    }
    cls.getEAllReferences.foreach {
      ref =>
        val typeRefName = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
        if (ref.getUpperBound == -1) {
          // multiple values
          pr.println("internal var " + "_" + ref.getName + "_java_cache :List<" + typeRefName + ">? = null")
          if (hasID(ref.getEReferenceType)) {
            pr.println("internal val " + "_" + ref.getName + " : java.util.HashMap<Any," + typeRefName + "> = java.util.HashMap<Any," + typeRefName + ">()")
          } else {
            pr.println("internal val " + "_" + ref.getName + " :MutableList<" + typeRefName + "> = java.util.ArrayList<" + typeRefName + ">()")
          }
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          // optional single ref
          pr.println("internal var " + "_" + ref.getName + " : " + typeRefName + "? = null")
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 1) {
          // mandatory single ref
          pr.println("internal var " + "_" + ref.getName + " : " + typeRefName + "? = null")
        } else if (ref.getLowerBound > 1) {
          // else
          pr.println("internal var " + "_" + ref.getName + "_java_cache :List<" + typeRefName + ">? = null")
          if (hasID(ref.getEReferenceType)) {
            pr.println("internal val " + "_" + ref.getName + " : java.util.HashMap<Any," + typeRefName + "> = java.util.HashMap<Any," + typeRefName + ">()")
          } else {
            pr.println("internal val " + "_" + ref.getName + " :MutableList<" + typeRefName + "> = java.util.ArrayList<" + typeRefName + ">()")
          }
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::Not standard arrity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
        }
    }

    //Generate RecursiveReadOnly
    pr.println("override fun setRecursiveReadOnly(){")

    pr.println("if(internal_recursive_readOnlyElem == true){return}")
    pr.println("internal_recursive_readOnlyElem = true")

    cls.getEAllReferences.foreach {
      contained =>
        if (contained.getUpperBound == -1) {
          // multiple values
          pr.println("for(sub in this." + getGetter(contained.getName) + "){")
          pr.println("sub.setRecursiveReadOnly()")
          pr.println("}")
        } else if (contained.getUpperBound == 1 /*&& contained.getLowerBound == 0*/ ) {
          // optional single ref
          pr.println("val subsubsubsub" + contained.getName + " = this." + getGetter(contained.getName) + "")
          pr.println("if(subsubsubsub" + contained.getName + "!= null){ ")
          pr.println("subsubsubsub" + contained.getName + ".setRecursiveReadOnly()")
          pr.println("}")
        } else if (contained.getLowerBound > 1) {
          // else
          pr.println("for(sub in this." + getGetter(contained.getName) + "){")
          pr.println("\t\t\tsub.setRecursiveReadOnly()")
          pr.println("\t\t}")
        } else {
          throw new UnsupportedOperationException("ClonerGenerator::Not standard arity: " + cls.getName + "->" + contained.getName + "[" + contained.getLowerBound + "," + contained.getUpperBound + "]. Not implemented yet !")
        }
        pr.println()
    }
    pr.println("setInternalReadOnly()")
    pr.println("}")
    generateDeleteMethod(pr, cls, ctx, pack)
    // Getters and Setters Generation
    generateAllGetterSetterMethod(pr, cls, ctx, pack)
    //GENERATE CLONE METHOD
    generateCloneMethods(ctx, cls, pr, packElement)
    generateFlatReflexiveSetters(ctx, cls, pr)
    generateKMFQLMethods(pr, cls, ctx, pack)
    if (ctx.genSelector) {
      generateSelectorMethods(pr, cls, ctx)
    }
    generateEqualsMethods(pr, cls, ctx)
    generateContainedElementsMethods(pr, cls, ctx)
    pr.println("}")
    pr.flush()
    pr.close()
  }

  private def generateDeleteMethod(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String) {

    pr.println("override fun delete(){")
    if (!ctx.getJS()) {
      pr.println("for(sub in containedElements()){")
      pr.println("sub.delete()")
      pr.println("}")
    } else {
      cls.getEAllContainments.foreach {
        c =>
          if (c.isMany()) {
            pr.println("for(el in " + "_" + c.getName + "){")
            if (c.getEReferenceType.getEIDAttribute != null) {
              pr.println("el.value.delete()")
            } else {
              pr.println("el.delete()")
            }
            pr.println("}")
          } else {
            pr.println("_" + c.getName + "?.delete()")
          }
      }
    }

    cls.getEReferences.foreach {
      ref =>
        if (ref.isMany) {
          pr.println("_" + ref.getName + "?.clear()")
          pr.println("_" + ref.getName + "_java_cache = null")
        } else {
          pr.println("_" + ref.getName + " = null")
        }
    }
    pr.println("}")
  }


  private def generateAtts(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String) {

    cls.getEAttributes.foreach {
      att =>
        pr.print("internal var " + "_" + att.getName + " : ")
        ProcessorHelper.convertType(att.getEAttributeType) match {
          case "java.lang.String" => pr.println("String")
          case "java.lang.Integer" => pr.println("Int")
          case "java.lang.Boolean" => pr.println("Boolean")
          case "java.lang.Object" | "Any" => pr.println("Any?")
          case "java.lang.Class" | "Class" | "Class<out jet.Any?>" => pr.println("Class<out jet.Any?>?")

          case "null" => throw new UnsupportedOperationException("ClassGenerator:: Attribute type: " + att.getEAttributeType.getInstanceClassName + " has not been converted in a known type. Can not initialize.")
          case _@className => {
            if (att.getEAttributeType.isInstanceOf[EEnum]) {
              pr.println(ProcessorHelper.fqn(ctx, att.getEAttributeType) + "?")
            } else {
              //println("--->" + className)
              pr.println(className)
            }
          }
        }
    }

    cls.getEReferences.foreach {
      ref =>
        val typeRefName = ProcessorHelper.fqn(ctx, ref.getEReferenceType)

        if (ref.getUpperBound == -1) {
          // multiple values
          pr.println("internal var " + "_" + ref.getName + "_java_cache : List<" + typeRefName + ">?")
          if (hasID(ref.getEReferenceType)) {
            pr.println("internal val " + "_" + ref.getName + " : java.util.HashMap<Any," + typeRefName + ">")
          } else {
            pr.println("internal val " + "_" + ref.getName + " :MutableList<" + typeRefName + ">")
          }
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          // optional single ref
          pr.println("internal var " + "_" + ref.getName + " : " + typeRefName + "?")
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 1) {
          // mandatory single ref
          pr.println("internal var " + "_" + ref.getName + " : " + typeRefName + "?")
        } else if (ref.getLowerBound > 1) {
          // else
          pr.println("internal var " + "_" + ref.getName + "_java_cache : List<" + typeRefName + ">?")
          if (hasID(ref.getEReferenceType)) {
            pr.println("internal val " + "_" + ref.getName + " : java.util.HashMap<Any," + typeRefName + ">")
          } else {
            pr.println("internal val " + "_" + ref.getName + " :MutableList<" + typeRefName + ">")
          }
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::Not standard arrity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
        }
    }
  }


  private def generateAllGetterSetterMethod(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String) {

    val atts = if (ctx.getGenFlatInheritance) {
      cls.getEAllAttributes
    } else {
      cls.getEAttributes
    }
    atts.foreach {
      att =>
      //Generate getter
        if (att.getEAttributeType.isInstanceOf[EEnum]) {
          pr.print("override fun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "() : " + ProcessorHelper.fqn(ctx, att.getEAttributeType) + "? {\n")
        } else if (ProcessorHelper.convertType(att.getEAttributeType) == "Any") {
          pr.print("override fun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "() : Any? {\n")
        } else {

          if (ProcessorHelper.convertType(att.getEAttributeType).contains("Class")) {
            pr.print("override fun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "() : " + ProcessorHelper.convertType(att.getEAttributeType) + "? {\n")
          } else {
            pr.print("override fun get" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1) + "() : " + ProcessorHelper.convertType(att.getEAttributeType) + " {\n")
          }

        }
        pr.println(" return " + "_" + att.getName + "\n}")
        //generate setter
        pr.print("\n override fun set" + att.getName.substring(0, 1).toUpperCase + att.getName.substring(1))
        if (att.getEAttributeType.isInstanceOf[EEnum]) {
          pr.print("(" + att.getName + param_suf + " : " + ProcessorHelper.fqn(ctx, att.getEAttributeType) + ") {\n")
        } else {
          pr.print("(" + att.getName + param_suf + " : " + ProcessorHelper.convertType(att.getEAttributeType) + ") {\n")
        }
        pr.println("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}")
        pr.println("_" + att.getName + " = " + att.getName + param_suf)
        if (ctx.generateEvents) {
          pr.println("fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.set, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Attribute, \"" + att.getName + "\", " + att.getName + param_suf + "))")
        }
        pr.println("}")
    }

    val refs = if (ctx.getGenFlatInheritance) {
      cls.getEAllReferences
    } else {
      cls.getEReferences
    }
    refs.foreach {
      ref =>
        val typeRefName = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
        if (ref.getUpperBound == -1) {
          // multiple values
          pr.println(generateGetter(ctx, ref, typeRefName, false, false))
          pr.println(generateSetter(ctx, cls, ref, typeRefName, false, false))
          pr.println(generateAddMethod(cls, ref, typeRefName, ctx))
          pr.println(generateRemoveMethod(cls, ref, typeRefName, true, ctx))
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 0) {
          // optional single ref
          pr.println(generateGetter(ctx, ref, typeRefName, true, true))
          pr.println(generateSetter(ctx, cls, ref, typeRefName, true, true))
        } else if (ref.getUpperBound == 1 && ref.getLowerBound == 1) {
          // mandatory single ref
          pr.println(generateGetter(ctx, ref, typeRefName, false, true))
          pr.println(generateSetter(ctx, cls, ref, typeRefName, false, true))
        } else if (ref.getLowerBound > 1) {
          pr.println(generateGetter(ctx, ref, typeRefName, false, false))
          pr.println(generateSetter(ctx, cls, ref, typeRefName, false, false))
          pr.println(generateAddMethod(cls, ref, typeRefName, ctx))
          pr.println(generateRemoveMethod(cls, ref, typeRefName, false, ctx))
        } else {
          throw new UnsupportedOperationException("GenDefConsRef::Not a standard arity: " + cls.getName + "->" + typeRefName + "[" + ref.getLowerBound + "," + ref.getUpperBound + "]. Not implemented yet !")
        }
    }
  }

  private def generateGetter(ctx: GenerationContext, ref: EReference, typeRefName: String, isOptional: Boolean, isSingleRef: Boolean): String = {
    //Generate getter
    val methName = "get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    var res = ""
    res += "\noverride fun " + methName + "() : "
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
        if (ctx.getJS()) {
          "List<"
        } else {
          "MutableList<"
        }
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
    res += " {\n"
    //Method core
    if (isSingleRef) {
      res += "return "
      res += "_" + ref.getName
      res += "\n"
    } else {
      if (ctx.getJS()) {
        if (hasID(ref.getEReferenceType)) {
          res += "return _" + ref.getName + ".values().toList()"
        } else {
          res += "return _" + ref.getName //TODO protection for JS
        }
      } else {
        res += "if(" + "_" + ref.getName + "_java_cache != null){\n"
        res += "return _" + ref.getName + "_java_cache as MutableList<" + typeRefName + ">\n"
        res += "} else {\n"
        if (hasID(ref.getEReferenceType)) {
          res += "_" + ref.getName + "_java_cache = java.util.Collections.unmodifiableList(_" + ref.getName + ".values().toList())\n"
          res += "return _" + ref.getName + "_java_cache as MutableList<" + typeRefName + ">\n"
        } else {
          res += "val tempL = java.util.ArrayList<" + typeRefName + ">()\n"
          res += "tempL.addAll(" + "_" + ref.getName + ")\n"
          res += "_" + ref.getName + "_java_cache = java.util.Collections.unmodifiableList(tempL)\n"
          res += "return tempL\n"
        }
        res += "}\n"
      }
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


    val implExt = if (ctx.getGenFlatInheritance) {
      "Impl"
    } else {
      "Internal"
    }
    val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + implExt

    if (noOpposite) {
      res += "\nfun noOpposite_set" + formatedLocalRefName
    } else {
      res += "\noverride fun set" + formatedLocalRefName
    }
    res += "(" + ref.getName + param_suf + " : "
    res += {
      if (!isSingleRef) {
        "List<" + typeRefName + ">"
      } else {
        typeRefName + "?"
      }
    }

    res += " ) {\n"

    //Read only protection
    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    if (ref.isMany) {
      res += "if(" + ref.getName + param_suf + " == null){ throw IllegalArgumentException(\"The list in parameter of the setter cannot be null. Use removeAll to empty a collection.\") }\n"
    }
    if (!isSingleRef) {
      //Clear cache
      res += ("_" + ref.getName + "_java_cache=null\n")
    }

    res += "if(" + "_" + ref.getName + "!= " + ref.getName + param_suf + "){\n"
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
            res += "if(" + "_" + ref.getName + " != null){\n"
            res += "(" + "_" + ref.getName + " as " + refInternalClassFqn + ")!!.noOpposite_remove" + formatedOpositName + "(this)\n"
            res += "}\n"
            res += "if(" + ref.getName + param_suf + " != null){\n"
            res += "(" + ref.getName + param_suf + " as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)\n"
            res += "}\n"
          } else {
            // Single Ref  0,1
            res += "if(" + "_" + ref.getName + " != null) { (" + "_" + ref.getName + " as " + refInternalClassFqn + ")!!.noOpposite_remove" + formatedOpositName + "(this) }\n"
            res += "if(" + ref.getName + param_suf + "!=null) {(" + ref.getName + param_suf + " as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)}\n"
          }

        } else {
          // -> // 0,1 or 1  --  0,1 or 1

          if (ref.isRequired) {
            // 1 -- 0,1 or 1

            res += "if(" + "_" + ref.getName + " != null){\n"
            res += "(" + "_" + ref.getName + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(null)\n"

            if (ref.isContainment) {
              res += "(" + "_" + ref.getName + "!! as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null,null,null)\n"
            }
            res += "}\n"

            res += "if(" + ref.getName + param_suf + " != null){\n"

            res += "(" + ref.getName + param_suf + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)\n"

            if (ref.isContainment) {
              res += "(" + ref.getName + param_suf + "!! as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this,null,\"" + ref.getName + "\")\n"
            }

            res += "}\n"

          } else {
            // 0,1 -- 0,1 or 1
            if (oppositRef.isRequired) {
              // 0,1 -- 1
              if (!ref.isContainment) {
                res += "if(" + "_" + ref.getName + "!=null){(" + "_" + ref.getName + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(null) }\n"
                res += "if(" + ref.getName + param_suf + "!=null){(" + ref.getName + param_suf + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)}\n"
              } else {
                res += "if(" + "_" + ref.getName + "!=null) {\n"
                res += "(" + "_" + ref.getName + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(null)\n"
                res += "(" + "_" + ref.getName + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null,null,null)\n"
                res += "}\n"
                res += "if(" + ref.getName + param_suf + "!= null) {\n"
                res += "(" + ref.getName + param_suf + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)\n"
                res += "(" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this,null,\"" + ref.getName + "\")\n"
                res += "}\n"
              }
            } else {
              // 0,1 -- 0,1
              if (!ref.isContainment) {
                res += "if(" + "_" + ref.getName + "!=null) {(" + "_" + ref.getName + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(null) }\n"
                res += "if(" + ref.getName + param_suf + "!=null) {(" + ref.getName + param_suf + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)}\n"
              } else {
                res += "if(" + "_" + ref.getName + "!=null) {\n"
                res += "(" + "_" + ref.getName + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(null)\n"
                res += "_" + ref.getName + ".setEContainer(null,null,null)\n"
                res += "}\n"
                res += "if(" + ref.getName + param_suf + "!= null) {\n"
                res += "(" + ref.getName + param_suf + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)\n"
                res += "(" + ref.getName + param_suf + "!! as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this,null,\"" + ref.getName + "\")\n"
                res += "}\n"
              }

            }

          }
        }
      }

      if (noOpposite && ref.isContainment) {
        // containment relation in noOpposite Method
        if (!ref.isRequired) {
          res += "if(" + "_" + ref.getName + "!=null){\n"
          res += "(" + "_" + ref.getName + " as " + ctx.getKevoreeContainerImplFQN + " ).setEContainer(null,null,null)\n"
          res += "}\n"
          res += "if(" + ref.getName + param_suf + "!=null) {\n"
          res += "(" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + " ).setEContainer(this,null,\"" + ref.getName + "\")\n"
          res += "}\n"
        } else {
          res += "if(" + "_" + ref.getName + " != null){\n"
          res += "(" + "_" + ref.getName + "!! as " + ctx.getKevoreeContainerImplFQN + " ).setEContainer(null, null,null)\n"
          res += "}\n"
          res += "if(" + ref.getName + param_suf + " != null){\n"
          res += "(" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, \"set\", \"" + ref.getName + "\", Any),\"" + ref.getName + "\" )\n"
          res += "}\n"
        }
      } else {
        // containment with no opposite relation
        if (ref.isContainment && (ref.getEOpposite == null)) {
          if (ref.isMany) {
            res += "(" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, \"remove\", \"" + ref.getName + "\", " + ref.getName + param_suf + "),\"" + ref.getName + "\" )\n"
          } else {
            res += "if(" + "_" + ref.getName + "!=null){\n"
            res += "(" + "_" + ref.getName + "!! as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null, null,null)\n"
            res += "}\n"
            res += "if(" + ref.getName + param_suf + "!=null){\n"
            res += "(" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this,  " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, \"set\", \"" + ref.getName + "\", null),\"" + ref.getName + "\")\n"
            res += "}\n"
          }
        }
      }
      //Setting of local reference
      res += "_" + ref.getName + " = " + ref.getName + param_suf + "\n"
      if (ctx.generateEvents) {
        if (ref.isContainment) {
          res += "fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.set, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Containment, \"" + ref.getName + "\", " + ref.getName + param_suf + "))\n"
        } else {
          res += "fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.set, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Reference, \"" + ref.getName + "\", " + ref.getName + param_suf + "))\n"
        }
      }

    } else {
      // -> Collection ref : * or +
      res += "_" + ref.getName + ".clear()\n"

      if (hasID(ref.getEReferenceType)) {
        res += "for(el in " + ref.getName + param_suf + "){\n"
        if(ctx.getGenFlatInheritance) {
          res += "_" + ref.getName + ".put((el as "+ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Impl).internalGetKey(),el)\n"
        } else {
          res += "_" + ref.getName + ".put((el as "+ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Internal).internalGetKey(),el)\n"
        }

        res += "}\n"
      } else {
        res += "_" + ref.getName + ".addAll(" + ref.getName + param_suf + ")\n"
      }

      if (ref.isContainment) {
        if (oppositRef != null) {
          res += "for(elem in " + ref.getName + param_suf + "){\n"
          res += "(elem as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this," + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, \"remove\", \"" + ref.getName + "\", elem),\"" + ref.getName + "\")\n"
          val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
          if (oppositRef.isMany) {
            res += "(elem as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)\n"
          } else {
            res += "(elem as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)\n"
          }
          res += "}\n"
        } else {
          res += "for(elem in " + ref.getName + param_suf + "){\n"
          res += "(elem as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this," + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, \"remove\", \"" + ref.getName + "\", elem),\"" + ref.getName + "\")\n"
          res += "}\n"

        }
      } else {
        if (oppositRef != null) {
          val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
          if (oppositRef.isMany) {
            res += "for(elem in " + ref.getName + param_suf + "){(elem as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)}\n"
          } else {

            val callParam = "this"

            res += "for(elem in " + ref.getName + param_suf + "){(elem as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(" + callParam + ")}\n"
          }
        }
      }
      if (ctx.generateEvents) {
        if (ref.isContainment) {
          res += "fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.set, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Containment, \"" + ref.getName + "\", " + ref.getName + param_suf + "))"
        } else {
          res += "fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.set, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Reference, \"" + ref.getName + "\", " + ref.getName + param_suf + "))"
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
        res += "if(" + "_" + ref.getName + " != null){\n"
        res += "(" + "_" + ref.getName + " as " + refInternalClassFqn + ")!!.noOpposite_remove" + formatedOpositName + "(this)\n"
        res += "}\n"
      } else {
        // Single Ref  0,1
        res += "if(" + "_" + ref.getName + "!=null){ (" + "_" + ref.getName + " as " + refInternalClassFqn + ")!!.noOpposite_remove" + formatedOpositName + "(this) }\n"
      }
      res += "}\n"
    }
    res += "\n}" //END Method
    res
  }


  private def generateAddMethod(cls: EClass, ref: EReference, typeRefName: String, ctx: GenerationContext): String = {
    generateAddMethodOp(cls, ref, typeRefName, false, ctx) + generateAddAllMethodOp(cls, ref, typeRefName, false, ctx) +
      (if (ref.getEOpposite != null) {
        generateAddMethodOp(cls, ref, typeRefName, true, ctx) + generateAddAllMethodOp(cls, ref, typeRefName, true, ctx)
      } else {
        ""
      })
  }

  private def generateAddAllMethodOp(cls: EClass, ref: EReference, typeRefName: String, noOpposite: Boolean, ctx: GenerationContext): String = {
    var res = ""
    res += "\n"
    if (noOpposite) {
      res += "\nfun noOpposite_addAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    } else {
      res += "\noverride fun addAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    }
    res += "(" + ref.getName + param_suf + " :List<" + typeRefName + ">) {\n"
    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    //Clear cache
    res += ("_" + ref.getName + "_java_cache=null\n")
    if (hasID(ref.getEReferenceType)) {
      res += "for(el in " + ref.getName + param_suf + "){\n"
      if(ctx.getGenFlatInheritance) {
        res += "_" + ref.getName + ".put((el as "+ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Impl).internalGetKey(),el)\n"
      } else {
        res += "_" + ref.getName + ".put((el as "+ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Internal).internalGetKey(),el)\n"
      }
      res += "}\n"
    } else {
      res += "_" + ref.getName + ".addAll(" + ref.getName + param_suf + ")\n"
    }

    if ((!noOpposite && ref.getEOpposite != null) || ref.isContainment) {
      res += "for(el in " + ref.getName + param_suf + "){\n"
      if (ref.isContainment) {
        res += "(el as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this," + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, \"remove\", \"" + ref.getName + "\", el),\"" + ref.getName + "\")\n"
      }
      if (ref.getEOpposite != null && !noOpposite) {
        val opposite = ref.getEOpposite
        val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)

        val implExt = if (ctx.getGenFlatInheritance) {
          "Impl"
        } else {
          "Internal"
        }
        val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + implExt
        if (!opposite.isMany) {
          res += "(el as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)"
        } else {
          res += "(el as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)"
        }
      }
      res += "}\n"
    }
    if (ctx.generateEvents) {
      if (ref.isContainment) {
        res += "fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.addAll, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Containment, \"" + ref.getName + "\", " + ref.getName + param_suf + "))\n"
      } else {
        res += "fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.addAll, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Reference, \"" + ref.getName + "\", " + ref.getName + param_suf + "))\n"
      }
    }


    res += "}\n"
    res
  }


  private def generateAddMethodOp(cls: EClass, ref: EReference, typeRefName: String, noOpposite: Boolean, ctx: GenerationContext): String = {
    //generate add
    var res = ""
    val formatedAddMethodName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
    if (noOpposite) {
      res += "\nfun noOpposite_add" + formatedAddMethodName
    } else {
      res += "\noverride fun add" + formatedAddMethodName
    }
    res += "(" + ref.getName + param_suf + " : " + typeRefName + ") {\n"
    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")

    //Clear cache
    res += ("_" + ref.getName + "_java_cache=null\n")

    if (ref.isContainment) {
      res += "(" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this," + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, \"remove\", \"" + ref.getName + "\", " + ref.getName + param_suf + "),\"" + ref.getName + "\")\n"
    }

    if (hasID(ref.getEReferenceType)) {
      if(ctx.getGenFlatInheritance) {
        res += "_" + ref.getName + ".put((" + ref.getName + param_suf + " as "+ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Impl).internalGetKey()," + ref.getName + param_suf + ")\n"
      } else {
        res += "_" + ref.getName + ".put((" + ref.getName + param_suf + " as "+ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Internal).internalGetKey()," + ref.getName + param_suf + ")\n"
      }
    } else {
      res += "_" + ref.getName + ".add(" + ref.getName + param_suf + ")\n"
    }

    if (ctx.generateEvents) {
      if (ref.isContainment) {
        res += "fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.add, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Containment, \"" + ref.getName + "\", " + ref.getName + param_suf + "))\n"
      } else {
        res += "fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.add, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Reference, \"" + ref.getName + "\", " + ref.getName + param_suf + "))\n"
      }

    }



    if (ref.getEOpposite != null && !noOpposite) {
      val opposite = ref.getEOpposite
      val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)

      val implExt = if (ctx.getGenFlatInheritance) {
        "Impl"
      } else {
        "Internal"
      }
      val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + implExt

      if (!opposite.isMany) {
        res += "(" + ref.getName + param_suf + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(this)"
      } else {
        res += "(" + ref.getName + param_suf + " as " + refInternalClassFqn + ").noOpposite_add" + formatedOpositName + "(this)"
      }
    }
    res += "}"
    res
  }


  private def generateRemoveMethod(cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, ctx: GenerationContext): String = {
    generateRemoveMethodOp(cls, ref, typeRefName, isOptional, false, ctx) + generateRemoveAllMethod(cls, ref, typeRefName, isOptional, false, ctx) +
      (if (ref.getEOpposite != null) {
        generateRemoveMethodOp(cls, ref, typeRefName, isOptional, true, ctx) + generateRemoveAllMethod(cls, ref, typeRefName, isOptional, true, ctx)
      } else {
        ""
      })
  }

  private def generateRemoveMethodOp(cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, noOpposite: Boolean, ctx: GenerationContext): String = {
    //generate remove
    var res = ""
    val formatedMethodName = ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)

    if (ctx.generateEvents && ref.isContainment && !noOpposite) {
      // only once in the class, only for contained references
      if (!ctx.js) {
        // initialized in the Impl
        res += "\nvar removeAll" + formatedMethodName + "CurrentlyProcessing : Boolean\n"
      } else {
        res += "\nvar removeAll" + formatedMethodName + "CurrentlyProcessing : Boolean = false\n"
      }

    }

    if (noOpposite) {
      res += "\nfun noOpposite_remove" + formatedMethodName
    } else {
      res += "\noverride fun remove" + formatedMethodName
    }


    res += "(" + ref.getName + param_suf + " : " + typeRefName + ") {\n"

    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    //Clear cache
    res += ("_" + ref.getName + "_java_cache=null\n")



    if (isOptional) {
      if (hasID(ref.getEReferenceType)) {
        if(ctx.getGenFlatInheritance) {
          res += "if(" + "_" + ref.getName + ".size() != 0 && " + "_" + ref.getName + ".containsKey((" + ref.getName + param_suf + " as "+ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Impl).internalGetKey())) {\n"
        } else {
          res += "if(" + "_" + ref.getName + ".size() != 0 && " + "_" + ref.getName + ".containsKey((" + ref.getName + param_suf + " as "+ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Internal).internalGetKey())) {\n"
        }
      } else {
        res += "if(" + "_" + ref.getName + ".size() != 0 && " + "_" + ref.getName + ".indexOf(" + ref.getName + param_suf + ") != -1 ) {\n"
      }

    } else {

      if (hasID(ref.getEReferenceType)) {
        if(ctx.getGenFlatInheritance) {
          res += "if(" + "_" + ref.getName + ".size == " + ref.getLowerBound + "&& " + "_" + ref.getName + ".containsKey((" + ref.getName + param_suf + " as "+ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Impl).internalGetKey()) ) {\n"
        } else {
          res += "if(" + "_" + ref.getName + ".size == " + ref.getLowerBound + "&& " + "_" + ref.getName + ".containsKey((" + ref.getName + param_suf + " as "+ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Internal).internalGetKey()) ) {\n"
        }
      } else {
        res += "if(" + "_" + ref.getName + ".size == " + ref.getLowerBound + "&& " + "_" + ref.getName + ".indexOf(" + ref.getName + param_suf + ") != -1 ) {\n"
      }

      res += "throw UnsupportedOperationException(\"The list of " + ref.getName + param_suf + " must contain at least " + ref.getLowerBound + " element. Can not remove sizeof(" + ref.getName + param_suf + ")=\"+" + "_" + ref.getName + ".size)\n"
      res += "} else {\n"
    }

    if (hasID(ref.getEReferenceType)) {
      if(ctx.getGenFlatInheritance) {
      res += "_" + ref.getName + ".remove((" + ref.getName + param_suf + " as "+ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Impl).internalGetKey())\n"
      } else {
        res += "_" + ref.getName + ".remove((" + ref.getName + param_suf + " as "+ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Internal).internalGetKey())\n"
      }
    } else {
      if (ctx.getJS()) {
        // Kotlin JS fix: arrayList.remove(arrayList.indexOf(elem)) does not work in Javascript, but arrayList.remove(elem) does
        res += "_" + ref.getName + ".remove(" + ref.getName + param_suf + ")\n"
      } else {
        // keep the O(1) complexity in Java
        res += "_" + ref.getName + ".remove(" + "_" + ref.getName + ".indexOf(" + ref.getName + param_suf + "))\n"
      }
    }

    if (ref.isContainment) {
      //TODO
      res += "(" + ref.getName + param_suf + "!! as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null,null,null)\n"
    }

    if (ctx.generateEvents) {
      if (ref.isContainment) {
        res += "if(!removeAll" + formatedMethodName + "CurrentlyProcessing) {\n"
        res += "fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.remove, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Containment, \"" + ref.getName + "\", " + ref.getName + param_suf + "))\n"
        res += "}\n"
      } else {
        res += "fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.remove, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Reference, \"" + ref.getName + "\", " + ref.getName + param_suf + "))\n"
      }
    }

    val oppositRef = ref.getEOpposite
    if (!noOpposite && oppositRef != null) {
      val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
      val implExt = if (ctx.getGenFlatInheritance) {
        "Impl"
      } else {
        "Internal"
      }
      val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + implExt

      if (oppositRef.isMany) {
        res += "(" + ref.getName + param_suf + " as " + refInternalClassFqn + ").noOpposite_remove" + formatedOpositName + "(this)\n"
      } else {
        res += "(" + ref.getName + param_suf + " as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(null)\n"
      }
    }

    res += "}\n"
    res += "}\n"

    res
  }

  private def generateRemoveAllMethod(cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, noOpposite: Boolean, ctx: GenerationContext): String = {
    var res = ""
    if (noOpposite) {
      res += "\nfun noOpposite_removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "() {\n"
    } else {
      res += "\noverride fun removeAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "() {\n"
    }

    res += ("if(isReadOnly()){throw Exception(\"This model is ReadOnly. Elements are not modifiable.\")}\n")
    if (ctx.generateEvents && ref.isContainment) {
      res += "\nremoveAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "CurrentlyProcessing=true\n"
    }
    val getterCall = "get" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "()"
    if (hasID(ref.getEReferenceType)) {
      res += "val temp_els = " + getterCall + "!!\n"
    } else {
      var collectionHelper = "java.util.Collections.unmodifiableList"
      if (ctx.getJS()) {
        collectionHelper = ""
      }
      res += "val temp_els = " + collectionHelper + "(" + getterCall + ")\n"
    }


    if ((!noOpposite && ref.getEOpposite != null) || ref.isContainment) {

      res += "for(el in temp_els!!){\n"

      if (ref.isContainment) {
        res += "(el as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null,null,null)\n"
      }
      if (ref.getEOpposite != null && !noOpposite) {
        val opposite = ref.getEOpposite
        val formatedOpositName = opposite.getName.substring(0, 1).toUpperCase + opposite.getName.substring(1)


        val implExt = if (ctx.getGenFlatInheritance) {
          "Impl"
        } else {
          "Internal"
        }
        val refInternalClassFqn = ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + implExt
        if (!opposite.isMany) {
          res += "(el as " + refInternalClassFqn + ").noOpposite_set" + formatedOpositName + "(null)\n"
        } else {
          res += "(el as " + refInternalClassFqn + ").noOpposite_remove" + formatedOpositName + "(this)\n"
        }
      }
      res += "}\n"
    }
    res += "_" + ref.getName + "_java_cache=null\n"
    res += "_" + ref.getName + ".clear()\n"

    if (ctx.generateEvents) {
      if (ref.isContainment) {
        res += "fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.removeAll, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Containment, \"" + ref.getName + "\", temp_els))\n"
        res += "\nremoveAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "CurrentlyProcessing=false\n"

      } else {
        res += "fireModelEvent(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent(path(), " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.EventType.removeAll, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".events.ModelEvent.ElementAttributeType.Reference, \"" + ref.getName + "\", temp_els))\n"
      }
    }

    res += "}\n"
    res
  }


}
