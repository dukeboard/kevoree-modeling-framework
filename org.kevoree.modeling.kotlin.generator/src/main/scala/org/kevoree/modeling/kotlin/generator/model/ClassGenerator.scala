

package org.kevoree.modeling.kotlin.generator.model

import java.io.{File, PrintWriter}
import org.kevoree.modeling.kotlin.generator.ProcessorHelper._
import scala.collection.JavaConversions._
import org.eclipse.emf.ecore._
import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}
import scala.collection.mutable

/**
 * Created by IntelliJ IDEA.
 * Users: Gregory NAIN, Fouquet Francois
 * Date: 23/09/11
 * Time: 13:35
 */

trait ClassGenerator extends ClonerGenerator {

  private def toCamelCase(ref: EReference): String = {
    return ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1)
  }

  private def toCamelCase(att: EAttribute): String = {
    return att.getName.substring(0, 1).toUpperCase + att.getName.substring(1)
  }

  var param_suf = "P"

  def generateKMFQLMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String)

  def generateSelectorMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext)

  def generateEqualsMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext)

  def generateContainedElementsMethods(pr: PrintWriter, cls: EClass, ctx: GenerationContext)

  def generateDiffMethod(pr: PrintWriter, cls: EClass, ctx: GenerationContext)

  def generateFlatReflexiveSetters(ctx: GenerationContext, cls: EClass, pr: PrintWriter) {
    pr.println("override fun reflexiveMutator(mutationType : Int, refName : String, value : Any?, noOpposite : Boolean) {")
    pr.println("when(refName) {")
    cls.getEAllAttributes.foreach {
      att =>
        pr.println(ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Att_" + att.getName + " -> {") //START ATTR
        pr.println("when(mutationType) {")
        pr.println("org.kevoree.modeling.api.util.ActionType.SET -> {")
        //hu ? TODO refactoring this craps
        var valueType: String = ""
        if (att.getEAttributeType.isInstanceOf[EEnum]) {
          valueType = ProcessorHelper.fqn(ctx, att.getEAttributeType)
        } else {
          valueType = ProcessorHelper.convertType(att.getEAttributeType, ctx)
        }
        if (ctx.getJS()) {
          valueType match {
            case "Boolean" => {
              pr.println("this." + protectReservedWords(att.getName) + " = (\"true\" == value || true == value)")
            }
            case _ => {
              pr.println("this." + protectReservedWords(att.getName) + " = (value as? " + valueType + ")")
            }
          }
        } else {
          valueType match {
            case "String" => {
              pr.println("this." + protectReservedWords(att.getName) + " = (value as? " + valueType + ")")
            }
            case "Boolean" | "Double" | "Int" => {
              pr.println("this." + protectReservedWords(att.getName) + " = (value.toString().to" + valueType + "())")
            }
            case "Any" => {
              pr.println("this." + protectReservedWords(att.getName) + " = (value.toString() as? " + valueType + ")")
            }
            case _ => {
              pr.println("this." + protectReservedWords(att.getName) + " = (value as? " + valueType + ")")
            }
          }
        }
        pr.println("}")
        pr.println("else -> {throw Exception(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.UNKNOWN_MUTATION_TYPE_EXCEPTION + mutationType)}")
        pr.println("}") //END MUTATION TYPE
        pr.println("}") //END ATTR
    }

    cls.getEAllReferences.foreach {
      ref =>
        pr.println(ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + " -> {") //START REF
        pr.println("when(mutationType) {")
        val valueType = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
        if (ref.isMany) {
          pr.println("org.kevoree.modeling.api.util.ActionType.ADD -> {")
          val methodNameClean = "add" + toCamelCase(ref)
          if(ref.getEOpposite != null) {
            pr.println("      if(noOpposite) {")
            pr.println("        this.noOpposite_" + methodNameClean + "(value as " + valueType + ")")
            pr.println("      } else {")
            pr.println("        this." + methodNameClean + "(value as " + valueType + ")")
            pr.println("      }")
          } else {
            pr.println("        this." + methodNameClean + "(value as " + valueType + ")")
          }
          pr.println("}")
          pr.println("org.kevoree.modeling.api.util.ActionType.ADD_ALL -> {")
          val methodNameClean2 = "addAll" + toCamelCase(ref)
          if(ref.getEOpposite != null) {
            pr.println("      if(noOpposite) {")
            pr.println("        this.noOpposite_" + methodNameClean2 + "(value as List<" + valueType + ">)")
            pr.println("      } else {")
            pr.println("        this." + methodNameClean2 + "(value as List<" + valueType + ">)")
            pr.println("      }")
          } else {
            pr.println("        this." + methodNameClean2 + "(value as List<" + valueType + ">)")
          }
          pr.println("}")
          pr.println("org.kevoree.modeling.api.util.ActionType.REMOVE -> {")
          val methodNameClean3 = "remove" + toCamelCase(ref)
          if(ref.getEOpposite != null) {
            pr.println("      if(noOpposite) {")
            pr.println("        this.noOpposite_" + methodNameClean3 + "(value as " + valueType + ")")
            pr.println("      } else {")
            pr.println("        this." + methodNameClean3 + "(value as " + valueType + ")")
            pr.println("      }")
          } else {
            pr.println("        this." + methodNameClean3 + "(value as " + valueType + ")")
          }
          pr.println("}")
          pr.println("org.kevoree.modeling.api.util.ActionType.REMOVE_ALL -> {")
          val methodNameClean4 = "removeAll" + toCamelCase(ref)
          if(ref.getEOpposite != null) {
          pr.println("      if(noOpposite) {")
          pr.println("        this.noOpposite_" + methodNameClean4 + "()")
          pr.println("      } else {")
          pr.println("        this." + methodNameClean4 + "()")
          pr.println("      }")
          } else {
            pr.println("        this." + methodNameClean4 + "()")
          }
          pr.println("}")
        } else {
          pr.println("org.kevoree.modeling.api.util.ActionType.SET -> {")
          val methodNameClean = ProcessorHelper.protectReservedWords(ref.getName)
          val valueType = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
          if(ref.getEOpposite != null) {
            pr.println("      if(noOpposite) {")
            pr.println("        this.noOpposite_" + methodNameClean + "(value as? " + valueType + ")")
            pr.println("      } else {")
            pr.println("      this." + methodNameClean + " = (value as? " + valueType + ")")
            pr.println("      }")
          } else {
            pr.println("      this." + methodNameClean + " = (value as? " + valueType + ")")
          }

          pr.println("}")

          pr.println("org.kevoree.modeling.api.util.ActionType.REMOVE -> {")
          if(ref.getEOpposite != null) {
            pr.println("      if(noOpposite) {")
            pr.println("        this.noOpposite_" + methodNameClean + "(null)")
            pr.println("      } else {")
            pr.println("        this." + methodNameClean + " = null")
            pr.println("      }")
          } else {
            pr.println("      this." + methodNameClean + " = null")
          }
          pr.println("}")

          pr.println("org.kevoree.modeling.api.util.ActionType.ADD -> {")
          if(ref.getEOpposite != null) {
            pr.println("      if(noOpposite) {")
            pr.println("        this.noOpposite_" + methodNameClean + "(value as? " + valueType + ")")
            pr.println("      } else {")
            pr.println("        this." + methodNameClean + " = (value as? " + valueType + ")")
            pr.println("      }")
          } else {
            pr.println("      this." + methodNameClean + " = (value as? " + valueType + ")")
          }
          pr.println("}")

        }
        if (ref.isMany) {
          pr.println("org.kevoree.modeling.api.util.ActionType.RENEW_INDEX -> {")
          pr.println("if(" + "_" + ref.getName + ".size() != 0 && " + "_" + ref.getName + ".containsKey(value)) {")
          pr.println("val obj = _" + ref.getName + ".get(value)")


          //pr.println("val objNewKey = (obj as " + ProcessorHelper.fqn(ctx, ref.getEReferenceType.getEPackage) + ".impl." + ref.getEReferenceType.getName + "Impl).internalGetKey()\n")
          pr.println("val objNewKey = (obj as " + ctx.getKevoreeContainerImplFQN +").internalGetKey()\n")
          pr.println("if(objNewKey == null){throw Exception(\"Key newed to null \"+obj)}\n")
          pr.println("_" + ref.getName + ".remove(value)")
          pr.println("_" + ref.getName + ".put(objNewKey,obj)")
          pr.println("}")
          pr.println("}")
        } else {
          pr.println("org.kevoree.modeling.api.util.ActionType.RENEW_INDEX -> {")
          pr.println("}")
        }

        pr.println("else -> {throw Exception(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.UNKNOWN_MUTATION_TYPE_EXCEPTION + mutationType)}")
        pr.println("}") //END MUTATION TYPE
        pr.println("}") //END Ref When case
    }
    pr.println("    else -> { throw Exception(\"Can reflexively \"+mutationType+\" for \"+refName + \" on \"+ this) }")
    pr.println("}") //END REFS NAME WHEN

    pr.println("}") //END METHOD
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

    val aspects = ctx.aspects.values().filter(v => v.aspectedClass == cls.getName || v.aspectedClass == pack + "." + cls.getName)
    var aspectsName = List[String]()
    aspects.foreach {
      a =>
        aspectsName = aspectsName ++ List(a.packageName + "." + a.name)
    }
    val resultAspectName = if (!aspectsName.isEmpty) {
      "," + aspectsName.mkString(",")
    } else {
      ""
    }

    pr.println(" : " + ctx.getKevoreeContainerImplFQN + ", " + fqn(ctx, packElement) + "." + cls.getName + resultAspectName + " { ")

    pr.println("override internal var internal_eContainer : " + ctx.getKevoreeContainer.get + "? = null")
    pr.println("override internal var internal_containmentRefName : String? = null")
    pr.println("override internal var internal_unsetCmd : " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand? = null")
    pr.println("override internal var internal_readOnlyElem : Boolean = false")
    pr.println("override internal var internal_recursive_readOnlyElem : Boolean = false")
    if (ctx.generateEvents) {
      pr.println("override internal var internal_modelElementListeners : MutableList<org.kevoree.modeling.api.events.ModelElementListener>? = null")
      pr.println("override internal var internal_modelTreeListeners : MutableList<org.kevoree.modeling.api.events.ModelElementListener>? = null")
    }

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

    generateMetaClassName(pr, cls, ctx)

    if (ctx.genTrace) {
      generateDiffMethod(pr, cls, ctx)
    }


    //Kotlin workaround // Why prop are not generated properly ?
    if(ctx.getJS()){
      cls.getEAllAttributes.foreach { att =>
        if(att.isMany){
          pr.println("override public fun get"+toCamelCase(att)+"()"+" : List<" + ProcessorHelper.convertType(att.getEAttributeType, ctx) + ">"+"{ return "+ProcessorHelper.protectReservedWords(att.getName)+"}")
          pr.println("override public fun set"+toCamelCase(att)+"(internal_p"+" : List<" + ProcessorHelper.convertType(att.getEAttributeType, ctx) + ">)"+"{ "+ProcessorHelper.protectReservedWords(att.getName)+" = internal_p }")
        } else {
          pr.println("override public fun get"+toCamelCase(att)+"() : "+ProcessorHelper.convertType(att.getEAttributeType, ctx)+"? { return "+ProcessorHelper.protectReservedWords(att.getName)+"}")
          pr.println("override public fun set"+toCamelCase(att)+"(internal_p : "+ProcessorHelper.convertType(att.getEAttributeType, ctx)+"?) { "+ProcessorHelper.protectReservedWords(att.getName)+" = internal_p }")
        }
      }
      cls.getEAllReferences.foreach { ref =>
        val typeRefName = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
        if(ref.isMany){
          pr.println("override public fun get"+toCamelCase(ref)+"()"+" : List<" + typeRefName + ">"+"{ return "+ProcessorHelper.protectReservedWords(ref.getName)+"}")
          pr.println("override public fun set"+toCamelCase(ref)+"(internal_p"+" : List<" + typeRefName + ">){ "+ProcessorHelper.protectReservedWords(ref.getName)+" = internal_p }")
        } else {
          pr.println("override public fun get"+toCamelCase(ref)+"() : "+typeRefName+"?"+"{ return "+ProcessorHelper.protectReservedWords(ref.getName)+"}")
          pr.println("override public fun set"+toCamelCase(ref)+"(internal_p : "+typeRefName+"?){ "+ProcessorHelper.protectReservedWords(ref.getName)+" = internal_p }")
        }
      }
    }
    pr.println("}")
    pr.flush()
    pr.close()
  }


  private def generateMetaClassName(pr: PrintWriter, cls: EClass, ctx: GenerationContext) {
    pr.println("override fun metaClassName() : String {")
    pr.println("return \"" + ProcessorHelper.fqn(ctx, cls) + "\";")
    pr.println("}")
  }

  private def generateDeleteMethod(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String) {
    //TODO unreference object
    pr.println("override fun delete(){")
    if (!ctx.getJS()) {
      pr.println("for(sub in containedElements()){")
      pr.println("sub.delete()")
      pr.println("}")
    } else {
      cls.getEAllContainments.foreach {
        c =>
          if (c.isMany()) {
            pr.println("for(el in " + "_" + c.getName + ".entrySet()){")
            if (c.getEReferenceType.getEIDAttribute != null) {
              pr.println("el.value.delete()")
            } else {
              pr.println("el.delete()")
            }
            pr.println("}")
          } else {
            pr.println(c.getName + "?.delete()")
          }
      }
    }
    cls.getEAllReferences.foreach {
      ref =>
        if (ref.isMany) {
          pr.println("_" + ref.getName + "?.clear()")
        } else {
          pr.println(ProcessorHelper.protectReservedWords(ref.getName) + " = null")
        }
    }
    pr.println("}")
  }

  private def generateAllGetterSetterMethod(pr: PrintWriter, cls: EClass, ctx: GenerationContext, pack: String) {
    val idAttributes = cls.getEAllAttributes.filter(att => att.isID && !att.getName.equals("generated_KMF_ID"))
    val alreadyGeneratedAttributes = new mutable.HashSet[String]()
    cls.getEAllAttributes.foreach {
      att =>
        if (!alreadyGeneratedAttributes.contains(att.getName)) {
          alreadyGeneratedAttributes.add(att.getName)
          var defaultValue = att.getDefaultValueLiteral
          if (att.getName.equals("generated_KMF_ID") && idAttributes.size == 0) {
            if (ctx.getJS()) {
              defaultValue = "\"\"+Math.random() + java.util.Date().getTime()"
            } else {
              defaultValue = "\"\"+hashCode() + java.util.Date().getTime()"
            }
          }
          //Generate getter
          if (att.isMany) {
            pr.println("public override var " + protectReservedWords(att.getName) + " : List<" + ProcessorHelper.convertType(att.getEAttributeType, ctx) + ">")
            pr.println("\t set(iP : List<" + ProcessorHelper.convertType(att.getEAttributeType, ctx) + ">){")
          } else {
            if (defaultValue == null || defaultValue == "") {
              pr.println("public override var " + protectReservedWords(att.getName) + " : " + ProcessorHelper.convertType(att.getEAttributeType, ctx) + "? = null")
            } else {
              pr.println("public override var " + protectReservedWords(att.getName) + " : " + ProcessorHelper.convertType(att.getEAttributeType, ctx) + "? = " + defaultValue)
            }
            pr.println("\t set(iP : " + ProcessorHelper.convertType(att.getEAttributeType, ctx) + "?){")
          }
          pr.println("if(isReadOnly()){throw Exception(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}")
          pr.println("if(iP != "+ProcessorHelper.protectReservedWords(att.getName)+"){")
          pr.println("val oldPath = path()")
          if (att.isID()) {
            pr.println("val oldId = internalGetKey()")
            pr.println("val previousParent = eContainer();")
            pr.println("val previousRefNameInParent = getRefInParent();")
          }
          pr.println("$" + protectReservedWords(att.getName) + " = iP")
          if (ctx.generateEvents) {
            pr.println("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(oldPath, org.kevoree.modeling.api.util.ActionType.SET, org.kevoree.modeling.api.util.ElementAttributeType.ATTRIBUTE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Att_" + att.getName + ", " + ProcessorHelper.protectReservedWords(att.getName) + "))")
          }
          if (att.isID()) {
            pr.println("if(previousParent!=null){")
            pr.println("previousParent.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.RENEW_INDEX, previousRefNameInParent!!, oldId);")
            pr.println("}")
            if (ctx.generateEvents) {
              pr.println("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(oldPath, org.kevoree.modeling.api.util.ActionType.RENEW_INDEX, org.kevoree.modeling.api.util.ElementAttributeType.REFERENCE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Att_" + att.getName + ", path()))")
            }
          }
          pr.println("}")
          pr.println("\t}//end of getter")

        }
    }

    cls.getEAllReferences.foreach {
      ref =>
        val typeRefName = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
        if (ref.isMany) {
          //Declare internal cache (Hash Map)
          pr.println("internal val " + "_" + ref.getName + " : java.util.HashMap<String," + typeRefName + "> = java.util.HashMap<String," + typeRefName + ">()")
          pr.println("override var " + protectReservedWords(ref.getName) + ":List<" + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + ">");
          pr.println("\t  get(){")
          pr.println("\t\t  return _" + ref.getName + ".values().toList()")
          pr.println("\t  }")
          pr.println(generateSetter(ctx, cls, ref, typeRefName, false))
          pr.println(generateAddMethod(cls, ref, typeRefName, ctx))
          pr.println(generateRemoveMethod(cls, ref, typeRefName, true, ctx))
        } else {
          pr.println("override var " + protectReservedWords(ref.getName) + ":" + ProcessorHelper.fqn(ctx, ref.getEReferenceType) + "?=null");
          pr.println(generateSetter(ctx, cls, ref, typeRefName, true))
        }
    }
  }

  private def generateSetter(ctx: GenerationContext, cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean): String = {
    val oppositRef = ref.getEOpposite
    var res = ""
    res = res + generateSetterOp(ctx, cls, ref, typeRefName, isOptional, false)
    if (oppositRef != null && !ref.isMany) {
      //Generates the NoOpposite_Set method only the local reference is a single ref. (opposite managed on the * side)
      res = res + generateSetterOp(ctx, cls, ref, typeRefName, isOptional, true)
    }
    res
  }

  private def generateSetterOp(ctx: GenerationContext, cls: EClass, ref: EReference, typeRefName: String, isOptional: Boolean, noOpposite: Boolean): String = {
    //generate setter
    var res = ""

    if (noOpposite) {
      res += "\nfun noOpposite_" + ref.getName
      res += "(" + ref.getName + param_suf + " : "
      res += {
        if (ref.isMany) {
          "List<" + typeRefName + ">"
        } else {
          typeRefName + "?"
        }
      }
      res += " ) {\n"
    } else {
      res += "\t set(" + ref.getName + param_suf + "){"
    }

    //Read only protection
    res += "if(isReadOnly()){throw Exception(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n"
    if (ref.isMany) {
      res += "if(" + ref.getName + param_suf + " == null){ throw IllegalArgumentException(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.LIST_PARAMETER_OF_SET_IS_NULL_EXCEPTION) }\n"
    }
    if (!ref.isMany) {
      res += "if($" + ProcessorHelper.protectReservedWords(ref.getName) + "!= " + ref.getName + param_suf + "){\n"
    } else {
      res += "if(_" + ref.getName + ".values()!= " + ref.getName + param_suf + "){\n"
    }
    val oppositRef = ref.getEOpposite
    if (!ref.isMany) {
      // -> Single ref : 0,1 or 1
      if (!noOpposite && (oppositRef != null)) {
        //Management of opposite relation in regular setter
        if (oppositRef.isMany) {
          // 0,1 or 1  -- *
          if (ref.isRequired) {
            // Single Ref  1
            res += "if($" + ProcessorHelper.protectReservedWords(ref.getName) + " != null){\n"
            res += "$" + ProcessorHelper.protectReservedWords(ref.getName) + "!!.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)\n"
            res += "}\n"
            res += "if(" + ref.getName + param_suf + " != null){\n"
            res += ref.getName + param_suf + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)\n"
            res += "}\n"
          } else {
            // Single Ref  0,1
            res += "if($" + ProcessorHelper.protectReservedWords(ref.getName) + " != null) {$" + ProcessorHelper.protectReservedWords(ref.getName) + "!!.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)}\n"
            res += "if(" + ref.getName + param_suf + "!=null) {" + ref.getName + param_suf + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)}\n"
          }

        } else {
          // -> // 0,1 or 1  --  0,1 or 1
          if (ref.isRequired) {
            // 1 -- 0,1 or 1
            res += "if($" + ProcessorHelper.protectReservedWords(ref.getName) + " != null){\n"
            res += "$" + ProcessorHelper.protectReservedWords(ref.getName) + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", null, true)\n"
            if (ref.isContainment) {
              res += "($" + ProcessorHelper.protectReservedWords(ref.getName) + "!! as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null,null,null)\n"
            }
            res += "}\n"
            res += "if(" + ref.getName + param_suf + " != null){\n"
            res += ref.getName + param_suf + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)\n"
            if (ref.isContainment) {
              res += "(" + ref.getName + param_suf + "!! as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this,null,\"" + ref.getName + "\")\n"
            }
            res += "}\n"

          } else {
            // 0,1 -- 0,1 or 1
            if (oppositRef.isRequired) {
              // 0,1 -- 1
              if (!ref.isContainment) {
                res += "if($" + ProcessorHelper.protectReservedWords(ref.getName) + "!=null){$" + ProcessorHelper.protectReservedWords(ref.getName) + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", null, true)}\n"
                res += "if(" + ref.getName + param_suf + "!=null){" + ref.getName + param_suf + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ",this, true)}\n"
              } else {
                res += "if(" + "_" + ref.getName + "!=null) {\n"
                res += "_" + ref.getName + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ",null, true)\n"
                res += "(" + "_" + ref.getName + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null,null,null)\n"
                res += "}\n"
                res += "if(" + ref.getName + param_suf + "!= null) {\n"
                res += ref.getName + param_suf + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)\n"
                res += "(" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this,null,\"" + ref.getName + "\")\n"
                res += "}\n"
              }
            } else {
              // 0,1 -- 0,1
              if (!ref.isContainment) {
                res += "if(" + "_" + ref.getName + "!=null) {_" + ref.getName + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", null, true)}\n"
                res += "if(" + ref.getName + param_suf + "!=null) {" + ref.getName + param_suf + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)}\n"
              } else {
                res += "if(" + "_" + ref.getName + "!=null) {\n"
                res += "_" + ref.getName + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", null, true)\n"
                res += "_" + ref.getName + ".setEContainer(null,null,null)\n"
                res += "}\n"
                res += "if(" + ref.getName + param_suf + "!= null) {\n"
                res += ref.getName + param_suf + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)\n"
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
          res += "if($" + ProcessorHelper.protectReservedWords(ref.getName) + "!=null){\n"
          res += "($" + ProcessorHelper.protectReservedWords(ref.getName) + " as " + ctx.getKevoreeContainerImplFQN + " ).setEContainer(null,null,null)\n"
          res += "}\n"
          res += "if(" + ref.getName + param_suf + "!=null) {\n"
          res += "(" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + " ).setEContainer(this,null,\"" + ref.getName + "\")\n"
          res += "}\n"
        } else {
          res += "if(" + ProcessorHelper.protectReservedWords(ref.getName) + " != null){\n"
          res += "(" + ProcessorHelper.protectReservedWords(ref.getName) + "!! as " + ctx.getKevoreeContainerImplFQN + " ).setEContainer(null, null,null)\n"
          res += "}\n"
          res += "if(" + ref.getName + param_suf + " != null){\n"
          res += "(" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, org.kevoree.modeling.api.util.ActionType.SET, \"" + ref.getName + "\", Any),\"" + ref.getName + "\" )\n"
          res += "}\n"
        }
      } else {
        // containment with no opposite relation
        if (ref.isContainment && (ref.getEOpposite == null)) {
          if (ref.isMany) {
            res += "(" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, org.kevoree.modeling.api.util.ActionType.REMOVE, \"" + ref.getName + "\", " + ref.getName + param_suf + "),\"" + ref.getName + "\" )\n"
          } else {
            res += "if($" + ProcessorHelper.protectReservedWords(ref.getName) + "!=null){\n"
            res += "($" + ProcessorHelper.protectReservedWords(ref.getName) + "!! as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null, null,null)\n"
            res += "}\n"
            res += "if(" + ref.getName + param_suf + "!=null){\n"
            res += "(" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this,  " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, org.kevoree.modeling.api.util.ActionType.SET, \"" + ref.getName + "\", null),\"" + ref.getName + "\")\n"
            res += "}\n"
          }
        }
      }
      //Setting of local reference
      res += "$" + ProcessorHelper.protectReservedWords(ref.getName) + " = " + ref.getName + param_suf + "\n"
      if (ctx.generateEvents) {
        if (ref.isContainment) {
          res += "fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.SET, org.kevoree.modeling.api.util.ElementAttributeType.CONTAINMENT, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + ", " + ref.getName + param_suf + "))\n"
        } else {
          res += "fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.SET, org.kevoree.modeling.api.util.ElementAttributeType.REFERENCE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + ", " + ref.getName + param_suf + "))\n"
        }
      }

    } else {
      // -> Collection ref : * or +
      res += "_" + ref.getName + ".clear()\n"
      res += "for(el in " + ref.getName + param_suf + "){\n"
      res += "val elKey = (el as " + ctx.getKevoreeContainerImplFQN + ").internalGetKey()\n"
      res += "if(elKey == null){throw Exception(\"Can't set collection, because one element has no key!\")}\n"
      res += "_" + ref.getName + ".put(elKey!!,el)\n"
      res += "}\n"
      if (ref.isContainment) {
        if (oppositRef != null) {
          res += "for(elem in " + ref.getName + param_suf + "){\n"
          res += "(elem as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this," + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, org.kevoree.modeling.api.util.ActionType.REMOVE, \"" + ref.getName + "\", elem),\"" + ref.getName + "\")\n"
          if (oppositRef.isMany) {
            res += "(elem as " + ctx.getKevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)\n"
          } else {
            res += "(elem as " + ctx.getKevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)\n"
          }
          res += "}\n"
        } else {
          res += "for(elem in " + ref.getName + param_suf + "){\n"
          res += "(elem as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this," + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, org.kevoree.modeling.api.util.ActionType.REMOVE, \"" + ref.getName + "\", elem),\"" + ref.getName + "\")\n"
          res += "}\n"
        }
      } else {
        if (oppositRef != null) {
          if (oppositRef.isMany) {
            res += "for(elem in " + ref.getName + param_suf + "){(elem as " + ctx.getKevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)}\n"
          } else {
            res += "for(elem in " + ref.getName + param_suf + "){(elem as " + ctx.getKevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)}\n"
          }
        }
      }
      if (ctx.generateEvents) {
        if (ref.isContainment) {
          res += "fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.SET, org.kevoree.modeling.api.util.ElementAttributeType.CONTAINMENT, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + ", " + ref.getName + param_suf + "))"
        } else {
          res += "fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.SET, org.kevoree.modeling.api.util.ElementAttributeType.REFERENCE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + ", " + ref.getName + param_suf + "))"
        }
      }
    }
    res += "}\n" //END IF newRef != localRef

    if (noOpposite && oppositRef != null && oppositRef.isMany) {
      res += "else {\n"
      //DUPLICATE CASE OF SET / ONLY IN LOADER RUN
      //val formatedOpositName = oppositRef.getName.substring(0, 1).toUpperCase + oppositRef.getName.substring(1)
      // 0,1 or 1  -- *
      if (ref.isRequired) {
        // Single Ref  1
        res += "if(" + ProcessorHelper.protectReservedWords(ref.getName) + " != null){\n"
        res += ProcessorHelper.protectReservedWords(ref.getName) + "!!.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)\n"
        res += "}\n"
      } else {
        // Single Ref  0,1
        res += "if(" + ProcessorHelper.protectReservedWords(ref.getName) + "!=null){ " + ProcessorHelper.protectReservedWords(ref.getName) + "!!.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)}\n"
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
    res += "if(isReadOnly()){throw Exception(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n"
    res += "for(el in " + ref.getName + param_suf + "){\n"
    res += "val _key_ = (el as " + ctx.getKevoreeContainerImplFQN + ").internalGetKey()\n"
    res += "if(_key_ == \"\" || _key_ == null){ throw Exception(\"Key empty : set the attribute key before adding the object\") }\n"
    res += "_" + ref.getName + ".put(_key_,el)\n"
    res += "}\n"
    if ((!noOpposite && ref.getEOpposite != null) || ref.isContainment) {
      res += "for(el in " + ref.getName + param_suf + "){\n"
      if (ref.isContainment) {
        res += "(el as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this," + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, org.kevoree.modeling.api.util.ActionType.REMOVE, \"" + ref.getName + "\", el),\"" + ref.getName + "\")\n"
      }
      if (ref.getEOpposite != null && !noOpposite) {
        val opposite = ref.getEOpposite
        if (!opposite.isMany) {
          res += "(el as " + ctx.getKevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName + ", this, true)\n"
        } else {
          res += "(el as " + ctx.getKevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName + ", this, true)\n"
        }
      }
      res += "}\n"
    }
    if (ctx.generateEvents) {
      if (ref.isContainment) {
        res += "fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.ADD_ALL, org.kevoree.modeling.api.util.ElementAttributeType.CONTAINMENT, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + ", " + ref.getName + param_suf + "))\n"
      } else {
        res += "fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.ADD_ALL, org.kevoree.modeling.api.util.ElementAttributeType.REFERENCE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + ", " + ref.getName + param_suf + "))\n"
      }
    }
    res += "}\n"
    res
  }


  private def generateAddMethodOp(cls: EClass, ref: EReference, typeRefName: String, noOpposite: Boolean, ctx: GenerationContext): String = {
    //generate add
    var res = ""
    if (noOpposite) {
      res += "\nfun noOpposite_add" + toCamelCase(ref)
    } else {
      res += "\noverride fun add" + toCamelCase(ref)
    }
    res += "(" + ref.getName + param_suf + " : " + typeRefName + ") {\n"
    res += "if(isReadOnly()){throw Exception(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n"
    if (ref.isContainment) {
      res += "(" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(this," + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, org.kevoree.modeling.api.util.ActionType.REMOVE, \"" + ref.getName + "\", " + ref.getName + param_suf + "),\"" + ref.getName + "\")\n"
    }

    res += "val _key_ = (" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").internalGetKey()\n"
    res += "if(_key_ == \"\" || _key_ == null){ throw Exception(\"Key empty : set the attribute key before adding the object\") }\n"
    res += "_" + ref.getName + ".put(_key_," + ref.getName + param_suf + ")\n"


    if (ctx.generateEvents) {
      if (ref.isContainment) {
        res += "fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.ADD, org.kevoree.modeling.api.util.ElementAttributeType.CONTAINMENT, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + ", " + ref.getName + param_suf + "))\n"
      } else {
        res += "fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.ADD, org.kevoree.modeling.api.util.ElementAttributeType.REFERENCE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + ", " + ref.getName + param_suf + "))\n"
      }

    }



    if (ref.getEOpposite != null && !noOpposite) {
      val opposite = ref.getEOpposite
      if (!opposite.isMany) {
        res += "(" + ref.getName + param_suf + " as " + typeRefName + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName + ", this, true)\n"
      } else {
        res += "(" + ref.getName + param_suf + " as " + typeRefName + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName + ", this, true)\n"
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
      res += "\nvar removeAll" + formatedMethodName + "CurrentlyProcessing : Boolean = false\n"


    }

    if (noOpposite) {
      res += "\nfun noOpposite_remove" + formatedMethodName
    } else {
      res += "\noverride fun remove" + formatedMethodName
    }


    res += "(" + ref.getName + param_suf + " : " + typeRefName + ") {\n"

    res += ("if(isReadOnly()){throw Exception(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n")
    if (isOptional) {
      res += "if(" + "_" + ref.getName + ".size() != 0 && " + "_" + ref.getName + ".containsKey((" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").internalGetKey())) {\n"
    } else {
      res += "if(" + "_" + ref.getName + ".size == " + ref.getLowerBound + "&& " + "_" + ref.getName + ".containsKey((" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").internalGetKey()) ) {\n"
      res += "throw UnsupportedOperationException(\"The list of " + ref.getName + param_suf + " must contain at least " + ref.getLowerBound + " element. Can not remove sizeof(" + ref.getName + param_suf + ")=\"+" + "_" + ref.getName + ".size)\n"
      res += "} else {\n"
    }

    res += "_" + ref.getName + ".remove((" + ref.getName + param_suf + " as " + ctx.getKevoreeContainerImplFQN + ").internalGetKey())\n"
    if (ref.isContainment) {
      //TODO
      res += "(" + ref.getName + param_suf + "!! as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null,null,null)\n"
    }

    if (ctx.generateEvents) {
      if (ref.isContainment) {
        res += "if(!removeAll" + formatedMethodName + "CurrentlyProcessing) {\n"
        res += "fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.REMOVE, org.kevoree.modeling.api.util.ElementAttributeType.CONTAINMENT, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + ", " + ref.getName + param_suf + "))\n"
        res += "}\n"
      } else {
        res += "fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.REMOVE, org.kevoree.modeling.api.util.ElementAttributeType.REFERENCE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + ", " + ref.getName + param_suf + "))\n"
      }
    }

    val oppositRef = ref.getEOpposite
    if (!noOpposite && oppositRef != null) {
      if (oppositRef.isMany) {
        res += "(" + ref.getName + param_suf + " as " + typeRefName + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", this, true)\n"
      } else {
        res += "(" + ref.getName + param_suf + " as " + typeRefName + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + oppositRef.getName + ", null, true)\n"
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
    res += "if(isReadOnly()){throw Exception(" + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n"
    if (ctx.generateEvents && ref.isContainment) {
      res += "\nremoveAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "CurrentlyProcessing=true\n"
    }
    res += "val temp_els = " + ProcessorHelper.protectReservedWords(ref.getName) + "!!\n"
    if ((!noOpposite && ref.getEOpposite != null) || ref.isContainment) {
      res += "for(el in temp_els!!){\n"
      if (ref.isContainment) {
        res += "(el as " + ctx.getKevoreeContainerImplFQN + ").setEContainer(null,null,null)\n"
      }
      if (ref.getEOpposite != null && !noOpposite) {
        val opposite = ref.getEOpposite
         if (!opposite.isMany) {
          res += "(el as " + ctx.getKevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName + ", null, true)\n"
        } else {
          res += "(el as " + ctx.getKevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName + ", this, true)\n"
        }
      }
      res += "}\n"
    }
    res += "_" + ref.getName + ".clear()\n"

    if (ctx.generateEvents) {
      if (ref.isContainment) {
        res += "fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.REMOVE_ALL, org.kevoree.modeling.api.util.ElementAttributeType.CONTAINMENT, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + ", temp_els))\n"
        res += "\nremoveAll" + ref.getName.substring(0, 1).toUpperCase + ref.getName.substring(1) + "CurrentlyProcessing=false\n"

      } else {
        res += "fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.REMOVE_ALL, org.kevoree.modeling.api.util.ElementAttributeType.REFERENCE, " + ProcessorHelper.fqn(ctx, ctx.getBasePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + ", temp_els))\n"
      }
    }

    res += "}\n"
    res
  }


}
