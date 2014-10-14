package org.kevoree.modeling.kotlin.generator;

import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EEnum;
import org.eclipse.emf.ecore.EReference;

import java.io.PrintWriter;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 05/11/2013
 * Time: 14:16
 */
public class FlatReflexiveSetters {


    public static void generateFlatReflexiveSetters(GenerationContext ctx, EClass cls, PrintWriter pr) {
        pr.println("override fun reflexiveMutator(mutationType : org.kevoree.modeling.api.util.ActionType, refName : String, value : Any?, setOpposite : Boolean, fireEvents : Boolean) {");
        if (ctx.persistence) {
            pr.println("checkLazyLoad()");
        }
        pr.println("when(refName) {");
        for (EAttribute att : cls.getEAllAttributes()) {
            pr.println(ctx.basePackageForUtilitiesGeneration + ".util.Constants.Att_" + att.getName() + " -> {"); //START ATTR
            String valueType = "";
            Boolean isEnum = false;
            if (att.getEAttributeType() instanceof EEnum) {
                isEnum = true;
                valueType = ProcessorHelper.getInstance().fqn(ctx, att.getEAttributeType());
            } else {
                valueType = ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx);
            }
            if (att.isMany()) {
                pr.println("if(value is java.util.ArrayList<*>){");
                if (ctx.generateEvents) {
                    pr.println("this.internal_" + att.getName() + "(value as List<" + valueType + ">, fireEvents)");
                } else {
                    pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = (value as List<" + valueType + ">)");
                }
                pr.println("}else {");
                pr.println("if(value is String){");
                pr.println("val splitted = org.kevoree.modeling.api.util.AttConverter.convAttFlat(value)");
                pr.println("var tempArrayValues : MutableList<" + valueType + "> = java.util.ArrayList<" + valueType + ">()");
                pr.println("for(eachV in splitted){");
                if (ctx.js) {
                    if (valueType.equals("Boolean")) {
                        pr.println("tempArrayValues.add(\"true\" == eachV || true == eachV)");
                    } else {
                        pr.println("tempArrayValues.add(eachV as " + valueType + ")");
                    }
                } else {
                    if (valueType.equals("Boolean")
                            || valueType.equals("Double")
                            || valueType.equals("Int")
                            || valueType.equals("Float")
                            || valueType.equals("Long")
                            || valueType.equals("Short")) {
                        pr.println("tempArrayValues.add(eachV.toString().to" + valueType + "())");
                    } else if (valueType.equals("Byte")) {
                        pr.println("tempArrayValues.add(eachV.toString().toInt().to" + valueType + "())");
                    } else if (valueType.equals("ByteArray")) {
                        pr.println("tempArrayValues.add(value.toString().toByteArray(java.nio.charset.Charset.defaultCharset()))");
                    } else {
                        pr.println("tempArrayValues.add(eachV as " + valueType + ")");
                    }
                }
                pr.println("}");
                if (ctx.generateEvents) {
                    pr.println("this.internal_" + att.getName() + "(tempArrayValues as List<" + valueType + ">, fireEvents)");
                } else {
                    pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = (tempArrayValues as List<" + valueType + ">)");
                }
                pr.println("}");
                pr.println("}");
            } else {
                if (ctx.js) {

                    if (valueType.equals("Boolean")) {
                        if (ctx.generateEvents) {
                            pr.println("this.internal_" + att.getName() + "((\"true\" == value || true == value), fireEvents)");
                        } else {
                            pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = (\"true\" == value || true == value)");
                        }
                    } else if (valueType.equals("java.util.Date")) {
                        pr.println("if(value is java.util.Date){");
                        if (ctx.generateEvents) {
                            pr.println("this.internal_" + att.getName() + "((value as? " + valueType + "), fireEvents)");
                        } else {
                            pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = (value as? " + valueType + ")");
                        }
                        pr.println("} else {");
                        if (ctx.generateEvents) {
                            pr.println("this.internal_" + att.getName() + "(java.util.Date(value.toString().toLong()), fireEvents)");
                        } else {
                            pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = java.util.Date(value.toString().toLong())");
                        }
                        pr.println("}");
                    } else {
                        if (isEnum) {
                            pr.println("var convValue : " + valueType+"?");
                            pr.println("if(value is " + valueType + " || value == null){");
                            pr.println("convValue=value as? " + valueType);
                            pr.println("} else {");
                            pr.println("convValue=" + valueType + ".valueOf(value.toString())");
                            pr.println("}");
                            if (ctx.generateEvents) {
                                pr.println("this.internal_" + att.getName() + "(convValue, fireEvents)");
                            } else {
                                pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = convValue");
                            }
                        } else {
                            if (ctx.generateEvents) {
                                pr.println("this.internal_" + att.getName() + "((value as? " + valueType + "), fireEvents)");
                            } else {
                                pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = (value as? " + valueType + ")");
                            }
                        }
                    }
                } else {

                    if (valueType.equals("String")) {
                        if (ctx.generateEvents) {
                            pr.println("this.internal_" + att.getName() + "((value as? " + valueType + "), fireEvents)");
                        } else {
                            pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = (value as? " + valueType + ")");
                        }
                    } else if (valueType.equals("Boolean")
                            || valueType.equals("Double")
                            || valueType.equals("Int")
                            || valueType.equals("Float")
                            || valueType.equals("Long")
                            || valueType.equals("Short")) {
                        if (ctx.generateEvents) {
                            pr.println("this.internal_" + att.getName() + "((value.toString().to" + valueType + "()), fireEvents)");
                        } else {
                            pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = (value.toString().to" + valueType + "())");
                        }
                    } else if (valueType.equals("Byte")) {
                        if (ctx.generateEvents) {
                            pr.println("this.internal_" + att.getName() + "((value.toString().toInt().to" + valueType + "()), fireEvents)");
                        } else {
                            pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = (value.toString().toInt().to" + valueType + "())");
                        }
                    } else if (valueType.equals("ByteArray")) {
                        if (ctx.generateEvents) {
                            pr.println("this.internal_" + att.getName() + "((value.toString().toByteArray(java.nio.charset.Charset.defaultCharset())), fireEvents)");
                        } else {
                            pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = (value.toString().toByteArray(java.nio.charset.Charset.defaultCharset()))");
                        }
                    } else if (valueType.equals("java.util.Date")) {
                        pr.println("if(value is java.util.Date){");
                        if (ctx.generateEvents) {
                            pr.println("this.internal_" + att.getName() + "((value as? " + valueType + "), fireEvents)");
                        } else {
                            pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = (value as? " + valueType + ")");
                        }
                        pr.println("} else {");
                        if (ctx.generateEvents) {
                            pr.println("this.internal_" + att.getName() + "(java.util.Date(value.toString().toLong()), fireEvents)");
                        } else {
                            pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = java.util.Date(value.toString().toLong())");
                        }
                        pr.println("}");
                    } else if (valueType.equals("Any")) {
                        if (ctx.generateEvents) {
                            pr.println("this.internal_" + att.getName() + "((value.toString() as? " + valueType + "), fireEvents)");
                        } else {
                            pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = (value.toString() as? " + valueType + ")");
                        }
                    } else {
                        if (isEnum) {
                            pr.println("var convValue : " + valueType+"?");
                            pr.println("if(value is " + valueType + " || value == null){");
                            pr.println("convValue=value as? " + valueType);
                            pr.println("} else {");
                            pr.println("convValue=" + valueType + ".valueOf(value.toString())");
                            pr.println("}");
                            if (ctx.generateEvents) {
                                pr.println("this.internal_" + att.getName() + "(convValue, fireEvents)");
                            } else {
                                pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = convValue");
                            }
                        } else {
                            if (ctx.generateEvents) {
                                pr.println("this.internal_" + att.getName() + "((value as? " + valueType + "), fireEvents)");
                            } else {
                                pr.println("this." + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = (value as? " + valueType + ")");
                            }
                        }
                    }
                }
            }
            pr.println("}"); //END ATTR
        }

        for (EReference ref : cls.getEAllReferences()) {
            pr.println(ctx.basePackageForUtilitiesGeneration + ".util.Constants.Ref_" + ref.getName() + " -> {"); //START REF
            pr.println("when(mutationType) {");
            String valueType = ProcessorHelper.getInstance().fqn(ctx, ref.getEType());
            if (ref.isMany()) {
                pr.println("org.kevoree.modeling.api.util.ActionType.ADD -> {");
                String methodNameClean = "add" + ProcessorHelper.getInstance().toCamelCase(ref);
                if (ref.getEOpposite() != null || ctx.generateEvents) {
                    pr.println("this.internal_" + methodNameClean + "(value as " + valueType + ", setOpposite, fireEvents)");
                } else {
                    pr.println("this." + methodNameClean + "(value as " + valueType + ")");
                }
                pr.println("}");
                pr.println("org.kevoree.modeling.api.util.ActionType.ADD_ALL -> {");
                String methodNameClean2 = "addAll" + ProcessorHelper.getInstance().toCamelCase(ref);
                if (ref.getEOpposite() != null || ctx.generateEvents) {
                    pr.println("this.internal_" + methodNameClean2 + "(value as List<" + valueType + ">, setOpposite, fireEvents)");
                } else {
                    pr.println("this." + methodNameClean2 + "(value as List<" + valueType + ">)");
                }
                pr.println("}");
                pr.println("org.kevoree.modeling.api.util.ActionType.REMOVE -> {");
                String methodNameClean3 = "remove" + ProcessorHelper.getInstance().toCamelCase(ref);
                if (ref.getEOpposite() != null || ctx.generateEvents) {
                    pr.println("        this.internal_" + methodNameClean3 + "(value as " + valueType + ", setOpposite, fireEvents)");
                } else {
                    pr.println("        this." + methodNameClean3 + "(value as " + valueType + ")");
                }
                pr.println("}");
                pr.println("org.kevoree.modeling.api.util.ActionType.REMOVE_ALL -> {");
                String methodNameClean4 = "removeAll" + ProcessorHelper.getInstance().toCamelCase(ref);
                if (ref.getEOpposite() != null) {
                    pr.println("        this.internal_" + methodNameClean4 + "(setOpposite, fireEvents)");
                } else {
                    pr.println("        this." + methodNameClean4 + "()");
                }
                pr.println("}");
            } else {
                pr.println("org.kevoree.modeling.api.util.ActionType.SET -> {");
                String methodNameClean = ProcessorHelper.getInstance().protectReservedWords(ref.getName());
                if (ref.getEOpposite() != null || ctx.generateEvents) {
                    pr.println("      this.internal_" + ref.getName() + "(value as? " + valueType + ", setOpposite, fireEvents)");
                } else {
                    pr.println("      this." + methodNameClean + " = (value as? " + valueType + ")");
                }
                pr.println("}");
                pr.println("org.kevoree.modeling.api.util.ActionType.REMOVE -> {");
                if (ref.getEOpposite() != null || ctx.generateEvents) {
                    pr.println("        this.internal_" + ref.getName() + "(null, setOpposite, fireEvents)");
                } else {
                    pr.println("      this." + methodNameClean + " = null");
                }
                pr.println("}");

                pr.println("org.kevoree.modeling.api.util.ActionType.ADD -> {");
                if (ref.getEOpposite() != null || ctx.generateEvents) {
                    pr.println("        this.internal_" + ref.getName() + "(value as? " + valueType + ", setOpposite, fireEvents)");
                } else {
                    pr.println("      this." + methodNameClean + " = (value as? " + valueType + ")");
                }
                pr.println("}");

            }
            if (ref.isMany()) {
                pr.println("org.kevoree.modeling.api.util.ActionType.RENEW_INDEX -> {");
                pr.println("if(" + "_" + ref.getName() + ".size() != 0 && " + "_" + ref.getName() + ".containsKey(value)) {");
                pr.println("val obj = _" + ref.getName() + ".get(value)");
                pr.println("val objNewKey = obj!!.internalGetKey()\n");
                pr.println("if(objNewKey == null){throw Exception(\"Key newed to null \"+obj)}\n");
                pr.println("_" + ref.getName() + ".remove(value)");
                pr.println("_" + ref.getName() + ".put(objNewKey,obj)");
                pr.println("}");
                pr.println("}");
            } else {
                pr.println("org.kevoree.modeling.api.util.ActionType.RENEW_INDEX -> {");
                pr.println("}");
            }
            pr.println("else -> {throw Exception(" + ctx.basePackageForUtilitiesGeneration + ".util.Constants.UNKNOWN_MUTATION_TYPE_EXCEPTION + mutationType)}");
            pr.println("}"); //END MUTATION TYPE
            pr.println("}"); //END Ref When case
        }
        pr.println("    else -> { throw Exception(\"Can not reflexively \"+mutationType+\" for \"+refName + \" on \"+ this) }");
        pr.println("}"); //END REFS NAME WHEN

        pr.println("}"); //END METHOD
    }

}
