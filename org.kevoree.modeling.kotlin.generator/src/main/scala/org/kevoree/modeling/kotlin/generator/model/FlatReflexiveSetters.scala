package org.kevoree.modeling.kotlin.generator.model

import org.kevoree.modeling.kotlin.generator.{ProcessorHelper, GenerationContext}
import org.eclipse.emf.ecore.{EReference, EEnum, EClass}
import java.io.PrintWriter
import org.kevoree.modeling.kotlin.generator.ProcessorHelper._
import scala.collection.JavaConversions._

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 14:16
 */
trait FlatReflexiveSetters {

  def toCamelCase(ref: EReference): String

  def generateFlatReflexiveSetters(ctx: GenerationContext, cls: EClass, pr: PrintWriter) {
    pr.println("override fun reflexiveMutator(mutationType : org.kevoree.modeling.api.util.ActionType, refName : String, value : Any?, setOpposite : Boolean, fireEvents : Boolean) {")
    if(ctx.persistence){
      pr.println("checkLazyLoad()")
    }
    pr.println("when(refName) {")
    cls.getEAllAttributes.foreach {
      att =>
        pr.println(ProcessorHelper.fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Att_" + att.getName + " -> {") //START ATTR
      var valueType: String = ""
        if (att.getEAttributeType.isInstanceOf[EEnum]) {
          valueType = ProcessorHelper.fqn(ctx, att.getEAttributeType)
        } else {
          valueType = ProcessorHelper.convertType(att.getEAttributeType, ctx)
        }
        if (att.isMany) {
          pr.println("if(value is java.util.ArrayList<*>){")
          if (ctx.generateEvents) {
            pr.println("this.internal_" + att.getName + "(value as List<" + valueType + ">, fireEvents)")
          } else {
            pr.println("this." + protectReservedWords(att.getName) + " = (value as List<" + valueType + ">)")
          }
          pr.println("}else {")
          pr.println("if(value is String){")
          pr.println("val splitted = org.kevoree.modeling.api.util.AttConverter.convAttFlat(value)")
          pr.println("var tempArrayValues : MutableList<" + valueType + "> = java.util.ArrayList<" + valueType + ">()")
          pr.println("for(eachV in splitted){")
          if (ctx.js) {
            valueType match {
              case "Boolean" => {
                pr.println("tempArrayValues.add(\"true\" == eachV || true == eachV)")
              }
              case _ => {
                pr.println("tempArrayValues.add(eachV as " + valueType + ")")
              }
            }
          } else {
            valueType match {
              case "Boolean" | "Double" | "Int" | "Float" | "Long" | "Short" => {
                pr.println("tempArrayValues.add(eachV.toString().to" + valueType + "())")
              }
              case "Byte" => {
                pr.println("tempArrayValues.add(eachV.toString().toInt().to" + valueType + "())")
              }
              case "ByteArray" => {
                pr.println("tempArrayValues.add(value.toString().toByteArray(java.nio.charset.Charset.defaultCharset()))")
              }
              case _ => {
                pr.println("tempArrayValues.add(eachV as " + valueType + ")")
              }
            }
          }
          pr.println("}")
          if (ctx.generateEvents) {
            pr.println("this.internal_" + att.getName + "(tempArrayValues as List<" + valueType + ">, fireEvents)")
          } else {
            pr.println("this." + protectReservedWords(att.getName) + " = (tempArrayValues as List<" + valueType + ">)")
          }
          pr.println("}")
          pr.println("}")
        } else {
          if (ctx.js) {
            valueType match {
              case "Boolean" => {
                if (ctx.generateEvents) {
                  pr.println("this.internal_" + att.getName + "((\"true\" == value || true == value), fireEvents)")
                } else {
                  pr.println("this." + protectReservedWords(att.getName) + " = (\"true\" == value || true == value)")
                }
              }
              case "java.util.Date" => {
                pr.println("if(value is java.util.Date){")
                if (ctx.generateEvents) {
                  pr.println("this.internal_" + att.getName + "((value as? " + valueType + "), fireEvents)")
                } else {
                  pr.println("this." + protectReservedWords(att.getName) + " = (value as? " + valueType + ")")
                }
                pr.println("} else {")
                if (ctx.generateEvents) {
                  pr.println("this.internal_" + att.getName + "(java.util.Date(value.toString().toLong()), fireEvents)")
                } else {
                  pr.println("this." + protectReservedWords(att.getName) + " = java.util.Date(value.toString().toLong())")
                }
                pr.println("}")
              }
              case _ => {
                if (ctx.generateEvents) {
                  pr.println("this.internal_" + att.getName + "((value as? " + valueType + "), fireEvents)")
                } else {
                  pr.println("this." + protectReservedWords(att.getName) + " = (value as? " + valueType + ")")
                }
              }
            }
          } else {
            valueType match {
              case "String" => {
                if (ctx.generateEvents) {
                  pr.println("this.internal_" + att.getName + "((value as? " + valueType + "), fireEvents)")
                } else {
                  pr.println("this." + protectReservedWords(att.getName) + " = (value as? " + valueType + ")")
                }
              }
              case "Boolean" | "Double" | "Int" | "Float" | "Long" | "Short" => {
                if (ctx.generateEvents) {
                  pr.println("this.internal_" + att.getName + "((value.toString().to" + valueType + "()), fireEvents)")
                } else {
                  pr.println("this." + protectReservedWords(att.getName) + " = (value.toString().to" + valueType + "())")
                }
              }
              case "Byte" => {
                if (ctx.generateEvents) {
                  pr.println("this.internal_" + att.getName + "((value.toString().toInt().to" + valueType + "()), fireEvents)")
                } else {
                  pr.println("this." + protectReservedWords(att.getName) + " = (value.toString().toInt().to" + valueType + "())")
                }
              }
              case "ByteArray" => {
                if (ctx.generateEvents) {
                  pr.println("this.internal_" + att.getName + "((value.toString().toByteArray(java.nio.charset.Charset.defaultCharset())), fireEvents)")
                } else {
                  pr.println("this." + protectReservedWords(att.getName) + " = (value.toString().toByteArray(java.nio.charset.Charset.defaultCharset()))")
                }
              }
              case "java.util.Date" => {
                pr.println("if(value is java.util.Date){")
                if (ctx.generateEvents) {
                  pr.println("this.internal_" + att.getName + "((value as? " + valueType + "), fireEvents)")
                } else {
                  pr.println("this." + protectReservedWords(att.getName) + " = (value as? " + valueType + ")")
                }
                pr.println("} else {")
                if (ctx.generateEvents) {
                  pr.println("this.internal_" + att.getName + "(java.util.Date(value.toString().toLong()), fireEvents)")
                } else {
                  pr.println("this." + protectReservedWords(att.getName) + " = java.util.Date(value.toString().toLong())")
                }
                pr.println("}")
              }
              case "Any" => {
                if (ctx.generateEvents) {
                  pr.println("this.internal_" + att.getName + "((value.toString() as? " + valueType + "), fireEvents)")
                } else {
                  pr.println("this." + protectReservedWords(att.getName) + " = (value.toString() as? " + valueType + ")")
                }
              }
              case _ => {
                if (ctx.generateEvents) {
                  pr.println("this.internal_" + att.getName + "((value as? " + valueType + "), fireEvents)")
                } else {
                  pr.println("this." + protectReservedWords(att.getName) + " = (value as? " + valueType + ")")
                }
              }
            }
          }
        }
        pr.println("}") //END ATTR
    }

    cls.getEAllReferences.foreach {
      ref =>
        pr.println(ProcessorHelper.fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName + " -> {") //START REF
        pr.println("when(mutationType) {")
        val valueType = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
        if (ref.isMany) {
          pr.println("org.kevoree.modeling.api.util.ActionType.ADD -> {")
          val methodNameClean = "add" + toCamelCase(ref)
          if (ref.getEOpposite != null || ctx.generateEvents) {
            pr.println("this.internal_" + methodNameClean + "(value as " + valueType + ", setOpposite, fireEvents)")
          } else {
            pr.println("this." + methodNameClean + "(value as " + valueType + ")")
          }
          pr.println("}")
          pr.println("org.kevoree.modeling.api.util.ActionType.ADD_ALL -> {")
          val methodNameClean2 = "addAll" + toCamelCase(ref)
          if (ref.getEOpposite != null || ctx.generateEvents) {
            pr.println("this.internal_" + methodNameClean2 + "(value as List<" + valueType + ">, setOpposite, fireEvents)")
          } else {
            pr.println("this." + methodNameClean2 + "(value as List<" + valueType + ">)")
          }
          pr.println("}")
          pr.println("org.kevoree.modeling.api.util.ActionType.REMOVE -> {")
          val methodNameClean3 = "remove" + toCamelCase(ref)
          if (ref.getEOpposite != null || ctx.generateEvents) {
            pr.println("        this.internal_" + methodNameClean3 + "(value as " + valueType + ", setOpposite, fireEvents)")
          } else {
            pr.println("        this." + methodNameClean3 + "(value as " + valueType + ")")
          }
          pr.println("}")
          pr.println("org.kevoree.modeling.api.util.ActionType.REMOVE_ALL -> {")
          val methodNameClean4 = "removeAll" + toCamelCase(ref)
          if (ref.getEOpposite != null) {
            pr.println("        this.internal_" + methodNameClean4 + "(setOpposite, fireEvents)")
          } else {
            pr.println("        this." + methodNameClean4 + "()")
          }
          pr.println("}")
        } else {
          pr.println("org.kevoree.modeling.api.util.ActionType.SET -> {")
          val methodNameClean = ProcessorHelper.protectReservedWords(ref.getName)
          val valueType = ProcessorHelper.fqn(ctx, ref.getEReferenceType)
          if (ref.getEOpposite != null || ctx.generateEvents) {
            pr.println("      this.internal_" + ref.getName + "(value as? " + valueType + ", setOpposite, fireEvents)")
          } else {
            pr.println("      this." + methodNameClean + " = (value as? " + valueType + ")")
          }
          pr.println("}")
          pr.println("org.kevoree.modeling.api.util.ActionType.REMOVE -> {")
          if (ref.getEOpposite != null || ctx.generateEvents) {
            pr.println("        this.internal_" + ref.getName + "(null, setOpposite, fireEvents)")
          } else {
            pr.println("      this." + methodNameClean + " = null")
          }
          pr.println("}")

          pr.println("org.kevoree.modeling.api.util.ActionType.ADD -> {")
          if (ref.getEOpposite != null || ctx.generateEvents) {
            pr.println("        this.internal_" + ref.getName + "(value as? " + valueType + ", setOpposite, fireEvents)")
          } else {
            pr.println("      this." + methodNameClean + " = (value as? " + valueType + ")")
          }
          pr.println("}")

        }
        if (ref.isMany) {
          pr.println("org.kevoree.modeling.api.util.ActionType.RENEW_INDEX -> {")
          pr.println("if(" + "_" + ref.getName + ".size() != 0 && " + "_" + ref.getName + ".containsKey(value)) {")
          pr.println("val obj = _" + ref.getName + ".get(value)")
          pr.println("val objNewKey = (obj as " + ctx.kevoreeContainerImplFQN + ").internalGetKey()\n")
          pr.println("if(objNewKey == null){throw Exception(\"Key newed to null \"+obj)}\n")
          pr.println("_" + ref.getName + ".remove(value)")
          pr.println("_" + ref.getName + ".put(objNewKey,obj)")
          pr.println("}")
          pr.println("}")
        } else {
          pr.println("org.kevoree.modeling.api.util.ActionType.RENEW_INDEX -> {")
          pr.println("}")
        }
        pr.println("else -> {throw Exception(" + ProcessorHelper.fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.UNKNOWN_MUTATION_TYPE_EXCEPTION + mutationType)}")
        pr.println("}") //END MUTATION TYPE
        pr.println("}") //END Ref When case
    }
    pr.println("    else -> { throw Exception(\"Can reflexively \"+mutationType+\" for \"+refName + \" on \"+ this) }")
    pr.println("}") //END REFS NAME WHEN

    pr.println("}") //END METHOD
  }

}
