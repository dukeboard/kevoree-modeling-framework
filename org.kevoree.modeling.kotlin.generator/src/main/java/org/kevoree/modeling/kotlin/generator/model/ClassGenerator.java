package org.kevoree.modeling.kotlin.generator.model;

import org.eclipse.emf.ecore.*;
import org.kevoree.modeling.aspect.*;
import org.kevoree.modeling.kotlin.generator.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * Created by IntelliJ IDEA.
 * Users: Gregory NAIN, Fouquet Francois
 * Date: 23/09/11
 * Time: 13:35
 */

public class ClassGenerator {

    private static final String param_suf = "P";


    public static void generateFlatClass(GenerationContext ctx, String currentPackageDir, EPackage packElement, EClass cls) {

        File localFile = new File(currentPackageDir + File.separator + "impl" + File.separator + cls.getName() + "Impl.kt");
        PrintWriter pr = null;
        try {
            pr = new PrintWriter(localFile, "utf-8");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        String pack = ProcessorHelper.getInstance().fqn(ctx, packElement);
        pr.println("package " + pack + ".impl");
        pr.println();

        AspectList<AspectClass> aspects = new AspectList<AspectClass>();
        ArrayList<String> aspectsName = new ArrayList<String>();

        for (AspectClass v : ctx.aspects.values()) {
            if (AspectMatcher.aspectMatcher(ctx, v, cls)) {
                aspects.add(v);
                aspectsName.add(v.packageName + "." + v.name);
                pr.println("import " + v.packageName + ".*");
                if (ctx.js) {
                    for (String imp : v.imports) {
                        if (!imp.equals("org.kevoree.modeling.api.aspect") && !imp.equals("org.kevoree.modeling.api.meta")) {
                            pr.println("import " + imp + ";");
                        }
                    }
                }
            }
        }


        pr.println(ProcessorHelper.getInstance().generateHeader(packElement));
        //case class name
        //ctx.classFactoryMap.put(pack + "." + cls.getName(), ctx.packageFactoryMap.get(pack));
        pr.print("class " + cls.getName() + "Impl");

        String tempClassName = ProcessorHelper.getInstance().fqn(ctx, cls);
        boolean newMetaClassExists = false;
        for (NewMetaClassCreation m : ctx.newMetaClasses) {
            if ((m.packageName + "." + m.name).equals(tempClassName)) {
                newMetaClassExists = true;
                break;
            }
        }

        String resultAspectName = ((!aspectsName.isEmpty() && !newMetaClassExists) ? "," + ProcessorHelper.getInstance().mkString(aspectsName, ",") : "");

        pr.println(" : " + ctx.kevoreeContainerImplFQN + ", " + ProcessorHelper.getInstance().fqn(ctx, packElement) + "." + cls.getName() + resultAspectName + " { ");

        pr.println("override internal var internal_eContainer : " + ctx.kevoreeContainer + "? = null");
        pr.println("override internal var internal_containmentRefName : String? = null");
        pr.println("override internal var internal_unsetCmd : " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand? = null");
        pr.println("override internal var internal_readOnlyElem : Boolean = false");
        pr.println("override internal var internal_recursive_readOnlyElem : Boolean = false");
        pr.println("override internal var internal_inboundReferences : java.util.HashMap<org.kevoree.modeling.api.KMFContainer, MutableSet<String>> = java.util.HashMap<org.kevoree.modeling.api.KMFContainer,  MutableSet<String>>()");
        pr.println("override internal var internal_deleteInProgress : Boolean = false");

        pr.println("override var internal_is_deleted : Boolean = false;");

        pr.println("override var is_root : Boolean = false;");

        if (ctx.generateEvents) {
            pr.println("override internal var internal_modelElementListeners : MutableList<org.kevoree.modeling.api.events.ModelElementListener>? = null");
            pr.println("override internal var internal_modelTreeListeners : MutableList<org.kevoree.modeling.api.events.ModelElementListener>? = null");
        }
        if (ctx.persistence) {
            pr.println("override var isResolved: Boolean = true");
            pr.println("override var inResolution: Boolean = false");
            pr.println("override var originFactory: org.kevoree.modeling.api.persistence.PersistenceKMFFactory? = null");
        }
        if (ctx.timeAware) {
            pr.println("override var now: org.kevoree.modeling.api.time.TimePoint? = null");
            pr.println("override var meta: org.kevoree.modeling.api.time.blob.EntityMeta? = null");
        }

        pr.println("override var path_cache : String? = null");
        pr.println("override var key_cache: String? = null");


        generateDeleteMethod(pr, cls, ctx, pack);
        generateAllGetterSetterMethod(pr, cls, ctx, pack);
        FlatReflexiveSetters.generateFlatReflexiveSetters(ctx, cls, pr);
        KMFQLFinder.generateKMFQLMethods(pr, cls, ctx, pack);
        ContainedElementsGenerator.generateContainedElementsMethods(pr, cls, ctx);
        generateMetaClassName(pr, cls, ctx);
        //Kotlin workaround // Why prop are not generated properly ?
        if (ctx.js && ctx.ecma3compat) {
            for (EAttribute att : ProcessorHelper.getInstance().noduplicate(cls.getEAllAttributes())) {
                if (att.isMany()) {
                    pr.println("override public fun get" + ProcessorHelper.getInstance().toCamelCase(att) + "()" + " : List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ">" + "{ return " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + "}");
                    pr.println("override public fun set" + ProcessorHelper.getInstance().toCamelCase(att) + "(internal_p" + " : List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ">)" + "{ " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = internal_p }");
                } else {
                    pr.println("override public fun get" + ProcessorHelper.getInstance().toCamelCase(att) + "() : " + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + "? { return " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + "}");
                    pr.println("override public fun set" + ProcessorHelper.getInstance().toCamelCase(att) + "(internal_p : " + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + "?) { " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = internal_p }");
                }
            }
            for (EReference ref : ProcessorHelper.getInstance().noduplicateRef(cls.getEAllReferences())) {
                String typeRefName = ProcessorHelper.getInstance().fqn(ctx, ref.getEReferenceType());
                if (ref.isMany()) {
                    pr.println("override public fun get" + ProcessorHelper.getInstance().toCamelCase(ref) + "()" + " : List<" + typeRefName + ">" + "{ return " + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + "}");
                    pr.println("override public fun set" + ProcessorHelper.getInstance().toCamelCase(ref) + "(internal_p" + " : List<" + typeRefName + ">){ " + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + " = internal_p }");
                } else {
                    pr.println("override public fun get" + ProcessorHelper.getInstance().toCamelCase(ref) + "() : " + typeRefName + "?" + "{ return " + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + "}");
                    pr.println("override public fun set" + ProcessorHelper.getInstance().toCamelCase(ref) + "(internal_p : " + typeRefName + "?){ " + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + " = internal_p }");
                }
            }
        }


        if (aspects.size() > 1) {
            HashMap<String, List<String>> methodUsage = new HashMap<String, List<String>>(); //todo not only on method name
            for (AspectClass aspect : aspects) {
                for (AspectMethod method : aspect.methods) {
                    if (!methodUsage.containsKey(method.name)) {
                        methodUsage.put(method.name, new ArrayList<String>());
                    }
                    methodUsage.get(method.name).add(aspect.packageName + "." + aspect.name);
                }
            }

            for (Map.Entry<String, List<String>> t : methodUsage.entrySet()) {
                if (t.getValue().size() > 1) {

                    EOperation op = null;
                    for (EOperation eop : cls.getEAllOperations()) {
                        if (eop.getName().equals(t.getKey())) {
                            op = eop;
                            break;
                        }
                    }

                    if (op != null) {
                        pr.print("override fun " + op.getName() + "(");
                        boolean isFirst = true;
                        for (EParameter p : op.getEParameters()) {
                            if (!isFirst) {
                                pr.println(",");
                            }
                            String returnTypeP = ((p.getEType() instanceof EDataType) ?
                                    ProcessorHelper.getInstance().convertType(p.getEType().getName())
                                    :
                                    ProcessorHelper.getInstance().fqn(ctx, p.getEType()));

                            pr.print(p.getName() + param_suf + " :" + returnTypeP);
                            isFirst = false;
                        }
                        if (op.getEType() != null) {

                            String returnTypeOP = ((op.getEType() instanceof EDataType) ?
                                    ProcessorHelper.getInstance().convertType(op.getEType().getName())
                                    :
                                    ProcessorHelper.getInstance().fqn(ctx, op.getEType()));

                            if (op.getLowerBound() == 0) {
                                returnTypeOP = returnTypeOP + "?";
                            }

                            pr.println("):" + returnTypeOP + "{");
                        } else {
                            pr.println("):Unit{");
                        }

                        if (!ctx.js) {
                            int currentT = t.getValue().size();
                            for (String superTrait : t.getValue()) {
                                currentT = currentT - 1;
                                if (currentT == 0) {
                                    pr.print("return ");
                                }
                                pr.print("super<" + superTrait + ">." + op.getName() + "(");
                                isFirst = true;
                                for (EParameter param : op.getEParameters()) {
                                    if (!isFirst) {
                                        pr.println(",");
                                    }
                                    pr.print(param.getName() + param_suf);
                                    isFirst = false;
                                }
                                pr.println(")");
                            }
                        } else {
                            //JS generate plain method code inside method body

                            try {
                                int currentT = t.getValue().size();
                                for (String superTrait : t.getValue()) {
                                    currentT = currentT - 1;
                                    AspectClass aspect = aspects.findByFqn(superTrait);
                                    AspectMethod method = aspect.methods.findByName(op.getName());
                                    if (currentT == 0) {
                                        pr.println(aspect.getContent(method));
                                    } else {
                                        String content = null;
                                        content = aspect.getContent(method).trim();
                                        if (!content.startsWith("throw ")) {
                                            pr.println(content.replace("return", ""));
                                        }
                                    }
                                }
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                        pr.println("}");
                    }
                }
            }
        }

        HashSet<String> hashSetVar = new HashSet<String>();
        for (AspectClass aspect : aspects) {
            for (AspectVar varD : aspect.vars) {
                if (!hashSetVar.contains(varD.name) && varD.isPrivate) {
                    String initString = "null";
                    if (!varD.typeName.trim().endsWith("?")) {
                        initString = ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants." + varD.typeName.toUpperCase() + "_DEFAULTVAL";
                    }
                    pr.println("override var " + varD.name + " : " + varD.typeName + " = " + initString);
                    hashSetVar.add(varD.name);
                }
            }
        }

        pr.println("}");
        pr.flush();
        pr.close();
    }


    private static void generateMetaClassName(PrintWriter pr, EClass cls, GenerationContext ctx) {
        pr.println("override fun metaClassName() : String {");
        pr.println("return " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants." + ProcessorHelper.getInstance().fqn(ctx, cls).replace('.', '_') + ";");
        pr.println("}");
    }

    private static void generateDeleteMethod(PrintWriter pr, EClass cls, GenerationContext ctx, String pack) {
        pr.println("override fun delete(){");
        if (ctx.persistence) {
            pr.println("checkLazyLoad();");
        }
        pr.println("internal_deleteInProgress = true");
        if (ctx.persistence) {
            pr.println("(this as org.kevoree.modeling.api.persistence.KMFContainerProxy).originFactory!!.remove(this)");
        } else {
            for (EReference ref : cls.getEAllReferences()) {
                if (ref.isMany()) {
                    if (ref.isContainment()) {
                        pr.println("for(el in " + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + "!!){\n");
                        pr.println("el.delete();\n");
                        pr.println("}\n");
                        //
                    } else {
                        pr.println("removeAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "()");
                    }
                } else {
                    pr.println("if(" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + " != null) {");
                    pr.println("(" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + "!! as " + ctx.kevoreeContainerImplFQN + ").removeInboundReference(this," + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")");
                    if (ref.isContainer()) {
                        pr.println(ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + "!!.delete();");
                    }
                    pr.println(ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + " = null");
                    pr.println("}");
                }
            }
        }
        pr.println("advertiseInboundRefs(org.kevoree.modeling.api.util.ActionType.REMOVE, this)");
        pr.println("internal_inboundReferences.clear()");
        pr.println("if(internal_unsetCmd!=null){internal_unsetCmd!!.run()}");
        pr.println("internal_is_deleted = true;");
        pr.println("}");
    }


    private static void generateAttributeSetterWithParameter(PrintWriter pr, EAttribute att, GenerationContext ctx, String pack, ArrayList<EAttribute> idAttributes) {

        if (att.isMany()) {
            pr.println("\tprivate fun internal_" + att.getName() + "(iP : List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ">?, fireEvents : Boolean = true){");
        } else {
            pr.println("\tprivate fun internal_" + att.getName() + "(iP : " + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + "?, fireEvents : Boolean = true){");
        }
        pr.println("if(isReadOnly()){throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}");
        pr.println("if(iP != " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + "){");
        if (ctx.generateEvents) {
            pr.println("val oldPath = path()");
        }
        if (att.isID()) {
            pr.println("val oldId = internalGetKey()");
            if (ctx.persistence) {
                pr.println("if(!inResolution){");
            }
            pr.println("path_cache = null");
            pr.println("key_cache = null");
            if (ctx.persistence) {
                pr.println("}");
            }
            pr.println("val previousParent = eContainer();");
            pr.println("val previousRefNameInParent = getRefInParent();");
        }
        pr.println("val kmf_previousVal = $" + ProcessorHelper.getInstance().protectReservedWords(att.getName()));
        pr.println("$" + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = iP");
        if (ctx.persistence) {
            pr.println("if(!inResolution){");
        }
        if (ctx.generateEvents) {
            pr.println("if(fireEvents) {");
            pr.println("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(oldPath, org.kevoree.modeling.api.util.ActionType.SET, org.kevoree.modeling.api.util.ElementAttributeType.ATTRIBUTE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Att_" + att.getName() + ", " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + ",kmf_previousVal,this))");
            pr.println("}");
        }
        if (att.isID()) {
            pr.println("if(previousParent!=null){");
            pr.println("previousParent.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.RENEW_INDEX, previousRefNameInParent!!, oldId,false,false)");
            pr.println("}");
            pr.println("advertiseInboundRefs(org.kevoree.modeling.api.util.ActionType.RENEW_INDEX, oldId)");

            if (ctx.generateEvents) {
                pr.println("if(fireEvents) {");
                pr.println("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(oldPath, org.kevoree.modeling.api.util.ActionType.RENEW_INDEX, org.kevoree.modeling.api.util.ElementAttributeType.ATTRIBUTE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Att_" + att.getName() + ", path(),null,this))");
                pr.println("}");
            }

            pr.println("visit(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".container.cleanCacheVisitor,true,true,false)");
        }
        if (ctx.persistence) {
            pr.println("}");
        }
        pr.println("\t}");
        pr.println("\t}//end of setter");
    }


    private static void generateAllGetterSetterMethod(PrintWriter pr, EClass cls, GenerationContext ctx, String pack) {
        ArrayList<EAttribute> idAttributes = new ArrayList<EAttribute>();
        for (EAttribute att : cls.getEAllAttributes()) {
            if (att.isID() && !att.getName().equals("generated_KMF_ID")) {
                idAttributes.add(att);
            }
        }

        HashSet<String> alreadyGeneratedAttributes = new HashSet<String>();
        for (EAttribute att : cls.getEAllAttributes()) {
            if (!alreadyGeneratedAttributes.contains(att.getName())) {
                alreadyGeneratedAttributes.add(att.getName());

                if (att.isMany()) {
                    pr.print("override public fun with");
                    pr.print(ProcessorHelper.getInstance().protectReservedWords(ProcessorHelper.getInstance().toCamelCase(att)));
                    pr.print("(p : ");
                    pr.println("List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ">) : " + ProcessorHelper.getInstance().fqn(ctx, cls.getEPackage()) + "." + cls.getName() + "{");
                    pr.println(ProcessorHelper.getInstance().protectReservedWords(att.getName()) + "=p;");
                    pr.println("return this;");
                    pr.println("}");
                } else {
                    pr.print("override public fun with");
                    pr.print(ProcessorHelper.getInstance().protectReservedWords(ProcessorHelper.getInstance().toCamelCase(att)));
                    pr.print("(p : ");
                    pr.println(ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ") : " + ProcessorHelper.getInstance().fqn(ctx, cls.getEPackage()) + "." + cls.getName() + "{");
                    pr.println(ProcessorHelper.getInstance().protectReservedWords(att.getName()) + "=p;");
                    pr.println("return this;");
                    pr.println("}");
                }


                String defaultValue = ProcessorHelper.getInstance().getDefaultValue(ctx, att);
                if (att.getName().equals("generated_KMF_ID") && idAttributes.size() == 0) {
                    if (ctx.js) {
                        defaultValue = "\"\"+Math.random() + java.util.Date().getTime()";
                    } else {
                        defaultValue = "\"\"+hashCode() + java.util.Date().getTime()";
                    }
                } else {
                    if (att.isMany()) {
                        defaultValue = "java.util.ArrayList<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ">()";
                    }
                }
                //Generate getter
                if (att.isMany()) {
                    if (defaultValue == null || "".equals(defaultValue)) {
                        pr.println("public override var " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " : List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ">? = null");
                    } else {
                        pr.println("public override var " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " : List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ">? = " + defaultValue);
                    }
                    pr.println("\t set(iP : List<" + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + ">?){");
                } else {
                    if (defaultValue == null || "".equals(defaultValue)) {
                        pr.println("public override var " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " : " + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + "? = null");
                    } else {
                        pr.println("public override var " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " : " + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + "? = " + defaultValue);
                    }
                    pr.println("\t set(iP : " + ProcessorHelper.getInstance().convertType(att.getEAttributeType(), ctx) + "?){");
                }
                if (ctx.persistence) {
                    pr.println("checkLazyLoad()");
                }
                if (ctx.generateEvents) {
                    pr.println("internal_" + att.getName() + "(iP, true)");
                } else {
                    pr.println("if(isReadOnly()){throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}");
                    pr.println("if(iP != " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + "){");
                    if (ctx.generateEvents) {
                        pr.println("val oldPath = path()");
                    }
                    if (att.isID()) {
                        pr.println("val oldId = internalGetKey()");
                        pr.println("val previousParent = eContainer();");
                        pr.println("val previousRefNameInParent = getRefInParent();");

                        if (ctx.persistence) {
                            pr.println("if(!inResolution){");
                        }
                        pr.println("path_cache = null");
                        pr.println("key_cache = null");
                        if (ctx.persistence) {
                            pr.println("}");
                        }

                    }
                    pr.println("val kmf_previousVal = $" + ProcessorHelper.getInstance().protectReservedWords(att.getName()));
                    pr.println("$" + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + " = iP");
                    if (ctx.generateEvents) {
                        pr.println("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(oldPath, org.kevoree.modeling.api.util.ActionType.SET, org.kevoree.modeling.api.util.ElementAttributeType.ATTRIBUTE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Att_" + att.getName() + ", " + ProcessorHelper.getInstance().protectReservedWords(att.getName()) + ",kmf_previousVal,this))");
                    }
                    if (att.isID()) {
                        pr.println("if(previousParent!=null){");
                        pr.println("previousParent.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.RENEW_INDEX, previousRefNameInParent!!, oldId,false,false);");
                        pr.println("}");
                        if (ctx.generateEvents) {
                            pr.println("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(oldPath, org.kevoree.modeling.api.util.ActionType.RENEW_INDEX, org.kevoree.modeling.api.util.ElementAttributeType.REFERENCE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Att_" + att.getName() + ", path(),null,this))");
                        }
                    }
                    pr.println("}");
                }
                pr.println("\t}//end of setter");

                if (ctx.persistence) {
                    pr.println("get(){");
                    pr.println("checkLazyLoad()");
                    pr.println("return $" + ProcessorHelper.getInstance().protectReservedWords(att.getName()));
                    pr.println("}");
                }

                pr.println();
                if (ctx.generateEvents) {
                    generateAttributeSetterWithParameter(pr, att, ctx, pack, idAttributes);
                }

            }
        }

        for (EReference ref : ProcessorHelper.getInstance().noduplicateRef(cls.getEAllReferences())) {

            String typeRefName = ProcessorHelper.getInstance().fqn(ctx, ref.getEReferenceType());
            if (ref.isMany()) {
                //Declare internal cache (Hash Map);
                pr.println("internal val " + "_" + ref.getName() + " : java.util.HashMap<String," + typeRefName + "> = java.util.HashMap<String," + typeRefName + ">()");
                pr.println("override var " + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + ":List<" + ProcessorHelper.getInstance().fqn(ctx, ref.getEReferenceType()) + ">");
                pr.println("\t  get(){");
                if (ctx.persistence) {
                    pr.println("checkLazyLoad()");
                }
                pr.println("\t\t  return _" + ref.getName() + ".values().toList()");
                pr.println("\t  }");
                pr.println(generateSetter(ctx, cls, ref, typeRefName, false));
                pr.println(generateAddMethod(cls, ref, typeRefName, ctx));
                pr.println(generateRemoveMethod(cls, ref, typeRefName, true, ctx));
            } else {
                pr.println("override var " + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + ":" + ProcessorHelper.getInstance().fqn(ctx, ref.getEReferenceType()) + "?=null");
                if (ctx.persistence) {
                    pr.println("get(){");
                    pr.println("checkLazyLoad()");
                    pr.println("return $" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()));
                    pr.println("}");
                }
                pr.println(generateSetter(ctx, cls, ref, typeRefName, true));

                pr.print("override public fun with");
                pr.print(ProcessorHelper.getInstance().protectReservedWords(ProcessorHelper.getInstance().toCamelCase(ref)));
                pr.print("(ref : " + typeRefName + ")");
                String packName = ProcessorHelper.getInstance().fqn(ctx, cls.getEPackage());
                pr.println(" : " + packName + "." + cls.getName() + "{");
                pr.println("return this;");
                pr.println("}");

            }
        }
    }

    private static String generateSetter(GenerationContext ctx, EClass cls, EReference ref, String typeRefName, Boolean isOptional) {
        return generateSetterOp(ctx, cls, ref, typeRefName) + generateInternalSetter(ctx, cls, ref, typeRefName);
    }

    private static String generateInternalSetter(GenerationContext ctx, EClass cls, EReference ref, String typeRefName) {
        StringBuffer res = new StringBuffer();
        res.append("\nfun internal_").append(ref.getName());
        res.append("(" + ref.getName() + param_suf + " : ");
        res.append(ref.isMany() ? "List<" + typeRefName + ">" : typeRefName + "?");
        res.append(", setOpposite : Boolean, fireEvents : Boolean ) {\n");

        if (ctx.persistence) {
            res.append("checkLazyLoad()\n");
        }

        if (!ref.isMany()) {
            res.append("if($" + ref.getName() + "!= " + ref.getName() + param_suf + "){\n");
        } else {
            res.append("if(_" + ref.getName() + ".values()!= " + ref.getName() + param_suf + "){\n");
        }

        if (!ref.isMany()) {

            if (ref.getEOpposite() != null) {
                res.append("if(setOpposite) {\n");
                if (ref.getEOpposite().isMany()) {
                    // 0,1 or 1  -- *
                    res.append("if($" + ref.getName() + " != null) {\n");
                    res.append("$" + ref.getName() + "!!.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getEOpposite().getName() + ", this, false, fireEvents)\n");
                    res.append("}\n");
                    res.append("if(" + ref.getName() + param_suf + "!=null) {\n");
                    res.append(ref.getName() + param_suf + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getEOpposite().getName() + ", this, false, fireEvents)\n");
                    res.append("}\n");
                } else {
                    // -> // 0,1 or 1  --  0,1 or 1
                    res.append("if($" + ref.getName() + " != null){\n");
                    res.append("$" + ref.getName() + "!!.reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getEOpposite().getName() + ", null, false, fireEvents)\n");
                    res.append("}\n");
                    res.append("if(" + ref.getName() + param_suf + " != null){\n");
                    res.append(ref.getName() + param_suf + ".reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getEOpposite().getName() + ", this, false, fireEvents)\n");
                    res.append("}\n");
                }
                res.append("}\n");
            }

            if (ref.isContainment()) {
                // containment relation in noOpposite Method

                res.append("if($" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + " != null){\n");
                if(ctx.persistence) {
                    res.append("originFactory!!.elementsToBeRemoved.add(($" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + "!! as " + ctx.kevoreeContainerImplFQN + ").path())\n");
                }
                res.append("($" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + "!! as " + ctx.kevoreeContainerImplFQN + " ).setEContainer(null, null,null)\n");
                res.append("}\n");

                res.append("if(" + ref.getName() + param_suf + "!=null){\n");
                if (ref.isMany()) {
                    res.append("(" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").setEContainer(this, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", " + ref.getName() + param_suf + ")," + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");
                } else {
                    res.append("(" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").setEContainer(this, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", null)," + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");
                }
                res.append("}\n");

            }

            //Setting of local reference

            res.append("val kmf_previousVal = $" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + "\n");

            res.append("if(" + ref.getName() + param_suf + " != null) {\n");
            res.append("(" + ref.getName() + param_suf + "!! as " + ctx.kevoreeContainerImplFQN + ").addInboundReference(this, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");
            res.append("} else {\n");
            res.append("if($" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + " != null) {\n");
            res.append("($" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + "!! as " + ctx.kevoreeContainerImplFQN + ").removeInboundReference(this, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");
            res.append("}\n");
            res.append("}\n");
            res.append("$" + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + " = " + ref.getName() + param_suf + "\n");


        } else {
            // -> Collection ref : * or +

            res.append("val kmf_previousVal = _" + ref.getName() + "\n");

            if (ref.getEOpposite() == null) {
                res.append("_" + ref.getName() + ".clear()\n");
            } else {
                res.append("this.internal_removeAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "(true, false)\n");
            }
            res.append("for(el in " + ref.getName() + param_suf + "){\n");
            res.append("val elKey = (el as " + ctx.kevoreeContainerImplFQN + ").internalGetKey()\n");
            res.append("if(elKey == null){throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.ELEMENT_HAS_NO_KEY_IN_COLLECTION)}\n");
            res.append("_" + ref.getName() + ".put(elKey!!,el)\n");
            res.append("(el as " + ctx.kevoreeContainerImplFQN + ").addInboundReference(this, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");

            if (ref.isContainment()) {
                res.append("(el as " + ctx.kevoreeContainerImplFQN + ").setEContainer(this," + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", el)," + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");
            }
            if (ref.getEOpposite() != null) {
                res.append("(el as " + ctx.kevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType." + (ref.getEOpposite().isMany() ? "ADD" : "SET") + ", " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getEOpposite().getName() + ", this, false, fireEvents)\n");
            }

            res.append("}\n");
        }

        if (ctx.generateEvents) {
            res.append("if(fireEvents) {\n");
            res.append("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.SET, org.kevoree.modeling.api.util.ElementAttributeType." + (ref.isContainment() ? "CONTAINMENT" : "REFERENCE") + ", " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", " + ref.getName() + param_suf + ",kmf_previousVal,this))\n");
            res.append("}\n");
        }

        res.append("}\n"); //END IF newRef != localRef
        res.append("}\n");
        return res.toString();
    }

    private static String generateSetterOp(GenerationContext ctx, EClass cls, EReference ref, String typeRefName) {
        //generate setter
        StringBuffer res = new StringBuffer();
        res.append("\t set(" + ref.getName() + param_suf + "){");

        //Read only protection
        res.append("if(isReadOnly()){throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n");
        if (ref.isMany()) {
            res.append("if(" + ref.getName() + param_suf + " == null){ throw IllegalArgumentException(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.LIST_PARAMETER_OF_SET_IS_NULL_EXCEPTION) }\n");
        }

        res.append("internal_" + ref.getName() + "(" + ref.getName() + param_suf + ", true, true)");

        res.append("\n}"); //END Method
        return res.toString();
    }


    private static String generateAddMethod(EClass cls, EReference ref, String typeRefName, GenerationContext ctx) {
        return generateDoAdd(cls, ref, typeRefName, ctx) +
                generateAdd(cls, ref, typeRefName, ctx) +
                generateAddAll(cls, ref, typeRefName, ctx) +
                ((ref.getEOpposite() != null || ctx.generateEvents) ?
                        generateAddWithParameter(cls, ref, typeRefName, ctx) +
                                generateAddAllWithParameter(cls, ref, typeRefName, ctx)
                        :
                        ""
                );
    }

    private static String generateDoAdd(EClass cls, EReference ref, String typeRefName, GenerationContext ctx) {
        StringBuffer res = new StringBuffer();
        res.append("\nprivate fun doAdd" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ref.getName() + param_suf + " : " + typeRefName + ") {\n");

        res.append("val _key_ = (" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").internalGetKey()\n");
        res.append("if(_key_ == null || _key_ == \"\"){ throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.EMPTY_KEY) }\n");
        res.append("if(!_" + ref.getName() + ".containsKey(_key_)) {\n");

        res.append("_" + ref.getName() + ".put(_key_," + ref.getName() + param_suf + ")\n");
        if (ref.isContainment()) {
            res.append("(" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").setEContainer(this," + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".container.RemoveFromContainerCommand(this, org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", " + ref.getName() + param_suf + ")," + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");
        }
        res.append("(" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").addInboundReference(this, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");


        res.append("} else {\n");
        res.append("error(\"Element not added, because a "+typeRefName+" already exists with id:\"+_key_)\n");
        res.append("}\n");
        res.append("}\n");
        return res.toString();
    }

    private static String generateAddWithParameter(EClass cls, EReference ref, String typeRefName, GenerationContext ctx) {
        StringBuffer res = new StringBuffer();
        res.append("\nprivate fun internal_add" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ref.getName() + param_suf + " : " + typeRefName + ", setOpposite : Boolean, fireEvents : Boolean) {\n");

        if (ctx.persistence) {
            res.append("checkLazyLoad()\n");
        }

        res.append("if(isReadOnly()){throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n");
        res.append("doAdd" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ref.getName() + param_suf + ")\n");

        if (ref.getEOpposite() != null) {
            res.append("if(setOpposite){\n");
            EReference opposite = ref.getEOpposite();
            res.append("(" + ref.getName() + param_suf + " as " + typeRefName + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType." + (opposite.isMany() ? "ADD" : "SET") + ", " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName() + ", this, false, fireEvents)\n");
            res.append("}\n");
        }

        if (ctx.generateEvents) {
            res.append("if(fireEvents){\n");
            if (ref.isContainment()) {
                res.append("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.ADD, org.kevoree.modeling.api.util.ElementAttributeType.CONTAINMENT, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", " + ref.getName() + param_suf + ",null,this))\n");
            } else {
                res.append("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.ADD, org.kevoree.modeling.api.util.ElementAttributeType.REFERENCE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", " + ref.getName() + param_suf + ",null,this))\n");
            }
            res.append("}\n");
        }
        res.append("}\n");
        return res.toString();
    }

    private static String generateAdd(EClass cls, EReference ref, String typeRefName, GenerationContext ctx) {
        StringBuffer res = new StringBuffer();
        res.append("\noverride fun add" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ref.getName() + param_suf + " : " + typeRefName + ") : " + ProcessorHelper.getInstance().fqn(ctx, cls.getEPackage()) + "." + cls.getName() + "{\n");

        if (ref.getEOpposite() != null || ctx.generateEvents) {
            res.append("internal_add" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ref.getName() + param_suf + ", true, true)\n");
        } else {
            res.append("if(isReadOnly()){throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n");
            res.append("doAdd" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ref.getName() + param_suf + ")\n");

            if (ref.getEOpposite() != null) {
                EReference opposite = ref.getEOpposite();
                if (!opposite.isMany()) {
                    res.append("(" + ref.getName() + param_suf + " as " + typeRefName + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName() + ", this, false, fireEvents)\n");
                } else {
                    res.append("(" + ref.getName() + param_suf + " as " + typeRefName + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName() + ", this, false, fireEvents)\n");
                }
            }
        }
        res.append("return this;\n");
        res.append("}\n");
        return res.toString();
    }

    private static String generateAddAllWithParameter(EClass cls, EReference ref, String typeRefName, GenerationContext ctx) {
        StringBuffer res = new StringBuffer();
        res.append("\nprivate fun internal_addAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ref.getName() + param_suf + " :List<" + typeRefName + ">, setOpposite : Boolean, fireEvents : Boolean) {\n");
        res.append("if(isReadOnly()){throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n");
        res.append("if (setOpposite) {\n");
        res.append("for(el in " + ref.getName() + param_suf + "){\n");
        res.append("doAdd" + ProcessorHelper.getInstance().toCamelCase(ref) + "(el)\n");
        if (ref.getEOpposite() != null) {
            EReference opposite = ref.getEOpposite();
            if (!opposite.isMany()) {
                res.append("(el as " + ctx.kevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName() + ", this, false, fireEvents)\n");
            } else {
                res.append("(el as " + ctx.kevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName() + ", this, false, fireEvents)\n");
            }
        }
        res.append("}\n");
        res.append("} else {\n");
        res.append("for(el in " + ref.getName() + param_suf + "){\n");
        res.append("doAdd" + ProcessorHelper.getInstance().toCamelCase(ref) + "(el)\n");
        res.append("}\n");
        res.append("}\n");

        if (ctx.generateEvents) {
            res.append("if (fireEvents) {\n");
            if (ref.isContainment()) {
                res.append("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.ADD_ALL, org.kevoree.modeling.api.util.ElementAttributeType.CONTAINMENT, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", " + ref.getName() + param_suf + ",null,this))\n");
            } else {
                res.append("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.ADD_ALL, org.kevoree.modeling.api.util.ElementAttributeType.REFERENCE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", " + ref.getName() + param_suf + ",null,this))\n");
            }
            res.append("}\n");
        }
        res.append("}\n");
        return res.toString();
    }

    private static String generateAddAll(EClass cls, EReference ref, String typeRefName, GenerationContext ctx) {
        StringBuffer res = new StringBuffer();
        res.append("\noverride fun addAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ref.getName() + param_suf + " :List<" + typeRefName + ">) : " + ProcessorHelper.getInstance().fqn(ctx, cls.getEPackage()) + "." + cls.getName() + "{\n");
        if (ref.getEOpposite() != null || ctx.generateEvents) {
            res.append("internal_addAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ref.getName() + param_suf + ", true, true)\n");
        } else {
            res.append("if(isReadOnly()){throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n");
            res.append("for(el in " + ref.getName() + param_suf + "){\n");
            res.append("doAdd" + ProcessorHelper.getInstance().toCamelCase(ref) + "(el)\n");
            if (ref.getEOpposite() != null) {
                EReference opposite = ref.getEOpposite();
                if (!opposite.isMany()) {
                    res.append("(el as " + ctx.kevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName() + ", this, false, fireEvents)\n");
                } else {
                    res.append("(el as " + ctx.kevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.ADD, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + opposite.getName() + ", this, false, fireEvents)\n");
                }
            }
            res.append("}\n");
        }
        res.append("return this;\n");
        res.append("}\n");
        return res.toString();
    }


    private static String generateRemoveMethod(EClass cls, EReference ref, String typeRefName, Boolean isOptional, GenerationContext ctx) {
        return generateRemove(cls, ref, typeRefName, ctx) +
                generateRemoveAll(cls, ref, typeRefName, ctx) +
                ((ref.getEOpposite() != null || ctx.generateEvents) ?
                        generateRemoveMethodWithParam(cls, ref, typeRefName, ctx) +
                                generateRemoveAllMethodWithParam(cls, ref, typeRefName, ctx) : "");
    }


    private static String generateRemoveMethodWithParam(EClass cls, EReference ref, String typeRefName, GenerationContext ctx) {
        StringBuffer res = new StringBuffer();
        res.append("\nprivate fun internal_remove" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ref.getName() + param_suf + " : " + typeRefName + ", setOpposite : Boolean, fireEvents : Boolean) {\n");

        if (ctx.persistence) {
            res.append("checkLazyLoad()\n");
        }

        res.append(("if(isReadOnly()){throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n"));
        if (!ref.isRequired()) {
            res.append("if(" + "_" + ref.getName() + ".size() != 0 && " + "_" + ref.getName() + ".containsKey((" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").internalGetKey())) {\n");
        } else {
            res.append("if(" + "_" + ref.getName() + ".size == " + ref.getLowerBound() + "&& " + "_" + ref.getName() + ".containsKey((" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").internalGetKey()) ) {\n");
            res.append("throw UnsupportedOperationException(\"The list of " + ref.getName() + param_suf + " must contain at least " + ref.getLowerBound() + " element. Can not remove sizeof(" + ref.getName() + param_suf + ")=\"+" + "_" + ref.getName() + ".size)\n");
            res.append("} else {\n");
        }

        res.append("val previousPathToBeRemoved = " + ref.getName() + param_suf + ".path()\n");

        res.append("_" + ref.getName() + ".remove((" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").internalGetKey())\n");
        res.append("(" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").removeInboundReference(this, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");
        if (ref.isContainment()) {
            //TODO
            res.append("(" + ref.getName() + param_suf + "!! as " + ctx.kevoreeContainerImplFQN + ").setEContainer(null,null,null)\n");
        }

        if (ctx.generateEvents) {
            if (ref.isContainment()) {
                res.append("if(!removeAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "CurrentlyProcessing && fireEvents) {\n");
                res.append("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.REMOVE, org.kevoree.modeling.api.util.ElementAttributeType.CONTAINMENT, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", " + ref.getName() + param_suf + ",previousPathToBeRemoved,this))\n");
                res.append("}\n");
            } else {
                res.append("if(fireEvents) {\n");
                res.append("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.REMOVE, org.kevoree.modeling.api.util.ElementAttributeType.REFERENCE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", " + ref.getName() + param_suf + ",previousPathToBeRemoved,this))\n");
                res.append("}\n");
            }
        }

        if (ref.getEOpposite() != null) {
            res.append("if(setOpposite){\n");
            if (ref.getEOpposite().isMany()) {
                res.append("(" + ref.getName() + param_suf + " as " + typeRefName + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getEOpposite().getName() + ", this, false, fireEvents)\n");
            } else {
                res.append("(" + ref.getName() + param_suf + " as " + typeRefName + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getEOpposite().getName() + ", null, false, fireEvents)\n");
            }
            res.append("}\n");
        }
        res.append("}\n");
        res.append("}\n");
        return res.toString();
    }


    private static String generateRemoveAllMethodWithParam(EClass cls, EReference ref, String typeRefName, GenerationContext ctx) {
        StringBuffer res = new StringBuffer();
        res.append("\nprivate fun internal_removeAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "(setOpposite : Boolean, fireEvents : Boolean) {\n");

        res.append("if(isReadOnly()){throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n");
        if (ctx.generateEvents && ref.isContainment()) {
            res.append("if(fireEvents){\n");
            res.append("\nremoveAll" + ref.getName().substring(0, 1).toUpperCase() + ref.getName().substring(1) + "CurrentlyProcessing=true\n");
            res.append("}\n");
        }
        res.append("val temp_els = " + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + "!!\n");

        if (ref.getEOpposite() != null) {
            if (ref.isContainment()) {
                res.append("if(setOpposite){\n");
                res.append("for(el in temp_els!!){\n");
                res.append("(el as " + ctx.kevoreeContainerImplFQN + ").removeInboundReference(this, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");
                res.append("(el as " + ctx.kevoreeContainerImplFQN + ").setEContainer(null,null,null)\n");
                if (!ref.getEOpposite().isMany()) {
                    res.append("(el as " + ctx.kevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getEOpposite().getName() + ", null, false, fireEvents)\n");
                } else {
                    res.append("(el as " + ctx.kevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getEOpposite().getName() + ", this, false, fireEvents)\n");
                }
                res.append("}\n");
                res.append("} else {\n");
                res.append("for(el in temp_els!!){\n");
                res.append("(el as " + ctx.kevoreeContainerImplFQN + ").removeInboundReference(this, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");
                res.append("(el as " + ctx.kevoreeContainerImplFQN + ").setEContainer(null,null,null)\n");
                res.append("}\n");
                res.append("}\n");
            } else {
                res.append("if(setOpposite){\n");
                res.append("for(el in temp_els!!){\n");
                res.append("(el as " + ctx.kevoreeContainerImplFQN + ").removeInboundReference(this, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");
                if (!ref.getEOpposite().isMany()) {
                    res.append("(el as " + ctx.kevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.SET, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getEOpposite().getName() + ", null, false, fireEvents)\n");
                } else {
                    res.append("(el as " + ctx.kevoreeContainerImplFQN + ").reflexiveMutator(org.kevoree.modeling.api.util.ActionType.REMOVE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getEOpposite().getName() + ", this, false, fireEvents)\n");
                }
                res.append("}\n");
                res.append("}\n");
            }
        } else {
            if (ref.isContainment()) {
                res.append("for(el in temp_els!!){\n");
                res.append("(el as " + ctx.kevoreeContainerImplFQN + ").setEContainer(null,null,null)\n");
                res.append("}\n");
            }
        }


        res.append("_" + ref.getName() + ".clear()\n");

        if (ctx.generateEvents) {
            res.append("if(fireEvents){\n");
            if (ref.isContainment()) {
                res.append("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.REMOVE_ALL, org.kevoree.modeling.api.util.ElementAttributeType.CONTAINMENT, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", temp_els,null,this))\n");
                res.append("\nremoveAll" + ref.getName().substring(0, 1).toUpperCase() + ref.getName().substring(1) + "CurrentlyProcessing=false\n");
            } else {
                res.append("fireModelEvent(org.kevoree.modeling.api.events.ModelEvent(path(), org.kevoree.modeling.api.util.ActionType.REMOVE_ALL, org.kevoree.modeling.api.util.ElementAttributeType.REFERENCE, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ", temp_els,null,this))\n");
            }
            res.append("}\n");
        }

        res.append("}\n");
        return res.toString();
    }


    private static String generateRemove(EClass cls, EReference ref, String typeRefName, GenerationContext ctx) {
        StringBuffer res = new StringBuffer();
        res.append("\noverride fun remove" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ref.getName() + param_suf + " : " + typeRefName + ") : " + ProcessorHelper.getInstance().fqn(ctx, cls.getEPackage()) + "." + cls.getName() + "{\n");
        if (ref.getEOpposite() != null || ctx.generateEvents) {
            res.append("internal_remove" + ProcessorHelper.getInstance().toCamelCase(ref) + "(" + ref.getName() + param_suf + ", true, true)\n");
        } else {

            res.append(("if(isReadOnly()){throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n"));
            if (!ref.isRequired()) {
                res.append("if(" + "_" + ref.getName() + ".size() != 0 && " + "_" + ref.getName() + ".containsKey((" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").internalGetKey())) {\n");
            } else {
                res.append("if(" + "_" + ref.getName() + ".size == " + ref.getLowerBound() + "&& " + "_" + ref.getName() + ".containsKey((" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").internalGetKey()) ) {\n");
                res.append("throw UnsupportedOperationException(\"The list of " + ref.getName() + param_suf + " must contain at least " + ref.getLowerBound() + " element. Can not remove sizeof(" + ref.getName() + param_suf + ")=\"+" + "_" + ref.getName() + ".size)\n");
                res.append("} else {\n");
            }

            res.append("_" + ref.getName() + ".remove((" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").internalGetKey())\n");
            res.append("(" + ref.getName() + param_suf + " as " + ctx.kevoreeContainerImplFQN + ").removeInboundReference(this, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");
            if (ref.isContainment()) {
                res.append("(" + ref.getName() + param_suf + "!! as " + ctx.kevoreeContainerImplFQN + ").setEContainer(null,null,null)\n");
            }
            res.append("}\n");
        }
        res.append("return this;\n");
        res.append("}\n");
        return res.toString();
    }


    private static String generateRemoveAll(EClass cls, EReference ref, String typeRefName, GenerationContext ctx) {
        StringBuffer res = new StringBuffer();
        if (ctx.generateEvents && ref.isContainment()) {
            // only once in the class, only for contained references
            res.append("\nvar removeAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "CurrentlyProcessing : Boolean = false\n");
        }
        res.append("\noverride fun removeAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "() : " + ProcessorHelper.getInstance().fqn(ctx, cls.getEPackage()) + "." + cls.getName() + "{\n");
        if (ref.getEOpposite() != null || ctx.generateEvents) {
            res.append("internal_removeAll" + ProcessorHelper.getInstance().toCamelCase(ref) + "(true, true)\n");
        } else {
            res.append("if(isReadOnly()){throw Exception(" + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.READ_ONLY_EXCEPTION)}\n");
            if (ctx.generateEvents && ref.isContainment()) {
                res.append("\nremoveAll" + ref.getName().substring(0, 1).toUpperCase() + ref.getName().substring(1) + "CurrentlyProcessing=true\n");
            }
            if (ctx.generateEvents || ref.isContainment()) {
                res.append("val temp_els = " + ProcessorHelper.getInstance().protectReservedWords(ref.getName()) + "!!\n");
            }
            if (ref.isContainment()) {
                res.append("for(el in temp_els!!){\n");
                res.append("(el as " + ctx.kevoreeContainerImplFQN + ").removeInboundReference(this, " + ProcessorHelper.getInstance().fqn(ctx, ctx.basePackageForUtilitiesGeneration) + ".util.Constants.Ref_" + ref.getName() + ")\n");
                res.append("(el as " + ctx.kevoreeContainerImplFQN + ").setEContainer(null,null,null)\n");
                res.append("}\n");
            }
            res.append("_" + ref.getName() + ".clear()\n");
        }
        res.append("return this;\n");
        res.append("}\n");
        return res.toString();
    }

}
