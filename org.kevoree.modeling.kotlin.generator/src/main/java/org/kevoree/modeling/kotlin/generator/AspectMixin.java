package org.kevoree.modeling.kotlin.generator;

import org.eclipse.emf.common.notify.Notifier;
import org.eclipse.emf.ecore.*;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.kevoree.modeling.aspect.AspectClass;
import org.kevoree.modeling.aspect.AspectMethod;
import org.kevoree.modeling.aspect.AspectParam;
import org.kevoree.modeling.aspect.AspectVar;

import java.util.HashSet;
import java.util.Iterator;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/10/13
 * Time: 16:56
 */
public class AspectMixin {

    public static void mixin(ResourceSet model, GenerationContext ctx) {

        Iterator<Notifier> iterator = model.getAllContents();
        while(iterator.hasNext()) {
            Notifier content = iterator.next();

            if(content instanceof EClass) {
                EClass eclass = (EClass)content;
                //Should have aspect covered all method
                HashSet<EOperation> operationList = new HashSet<EOperation>();

                for(EOperation op : eclass.getEAllOperations()) {
                    if( !op.getName().equals("eContainer")) {
                        operationList.add(op);
                    }
                }

                for(AspectClass aspect : ctx.aspects.values()) {

                    if (AspectMatcher.aspectMatcher(ctx, aspect, eclass)) {
                        //aspect match

                        for(AspectVar varD : aspect.vars) {
                            if(!varD.isPrivate) {

                                EAttribute pAtt = null;
                                for(EAttribute att : eclass.getEAllAttributes()) {
                                    if(att.getName().equals(varD.name)) {
                                        pAtt = att;
                                        break;
                                    }
                                }

                                if(pAtt == null){

                                    EAttribute newAtt = EcoreFactory.eINSTANCE.createEAttribute();
                                    newAtt.setName(varD.name);


                                    Iterator<Notifier> iterator2 = model.getAllContents();
                                    while(iterator2.hasNext()) {
                                        Notifier c = iterator2.next();
                                        if (c instanceof EClass) {
                                            EClass cc = (EClass)c;
                                            if (cc.getName().equals(varD.typeName) || (varD.typeName != null && cc.getName().equals(varD.typeName.replace("?", "")))) {
                                                //TODO add FQN of class aspect
                                                newAtt.setEType(cc);
                                                if (varD.typeName.trim().endsWith("?")) {
                                                    newAtt.setLowerBound(0);
                                                } else {
                                                    newAtt.setLowerBound(1);
                                                }
                                            }
                                        }
                                    }
                                    if (newAtt.getEType() == null) {
                                        EDataType dataType = EcoreFactory.eINSTANCE.createEDataType();
                                        dataType.setName(varD.typeName.replace("?",""));
                                        dataType.setInstanceClassName(varD.typeName.replace("?",""));
                                        //dataType.setInstanceTypeName(varD.typeName)

                                        newAtt.setEType(dataType);

                                        if (varD.typeName!=null && varD.typeName.trim().endsWith("?")) {
                                            newAtt.setLowerBound(0);
                                        } else {
                                            newAtt.setLowerBound(1);
                                        }
                                    }
                                    eclass.getEStructuralFeatures().add(newAtt);
                                }
                            }
                        }

                        for(AspectMethod method : aspect.methods) {

                            EOperation foundOp = null;
                            for(EOperation op : operationList) {
                                if(AspectMethodMatcher.isMethodEqual(op, method, ctx) && !method.privateMethod) {
                                    foundOp = op;
                                    break;
                                }
                            }

                            HashSet<EOperation> toRemove = new HashSet<EOperation>();
                            if(foundOp != null) {
                                for(EOperation opLoop : operationList) {
                                    if (AspectMethodMatcher.isMethodEqual(opLoop, method, ctx)) {
                                        toRemove.add(opLoop);
                                    }
                                }
                                toRemove.add(foundOp);
                                operationList.removeAll(toRemove);
                            } else {
                                //is it a new method

                                EOperation tempOp = null;
                                for(EOperation op : eclass.getEAllOperations()) {
                                    if(AspectMethodMatcher.isMethodEqual(op, method, ctx)) {
                                        tempOp = op;
                                        break;
                                    }
                                }

                                if (!method.privateMethod && (tempOp == null)) {

                                    String returnT = (method.returnType!=null ? method.returnType : "Unit");

                                    System.err.println("Add aspect Method ("+method.privateMethod+") to Ecore " + method.name + ":" + returnT + "/" + aspect.aspectedClass);

                                    EOperation newEOperation = EcoreFactory.eINSTANCE.createEOperation();
                                    newEOperation.setName(method.name);


                                    Iterator<Notifier> iterator3 = model.getAllContents();
                                    while(iterator3.hasNext()) {
                                        Notifier c = iterator3.next();
                                        if (c instanceof EClass) {
                                            EClass cc = (EClass)c;
                                            if (cc.getName().equals(method.returnType) || (method.returnType != null && cc.getName().equals(method.returnType.replace("?", "")))) {
                                                //TODO add FQN of class aspect
                                                newEOperation.setEType(cc);
                                                if (method.returnType.trim().endsWith("?")) {
                                                    newEOperation.setLowerBound(0);
                                                } else {
                                                    newEOperation.setLowerBound(1);
                                                }
                                            }
                                        }
                                    }
                                    if (newEOperation.getEType() == null) {
                                        EDataType dataType = EcoreFactory.eINSTANCE.createEDataType();
                                        dataType.setName(method.returnType);
                                        dataType.setInstanceClassName(method.returnType);


                                        newEOperation.setEType(dataType);
                                        if (method.returnType!=null && method.returnType.trim().endsWith("?")) {
                                            newEOperation.setLowerBound(0);
                                        } else {
                                            newEOperation.setLowerBound(1);
                                        }
                                    }

                                    for(AspectParam p : method.params) {
                                        EParameter newEParam = EcoreFactory.eINSTANCE.createEParameter();
                                        newEParam.setName(p.name);


                                        Iterator<Notifier> iterator4 = model.getAllContents();
                                        while(iterator4.hasNext()) {
                                            Notifier c = iterator4.next();
                                            if (c instanceof EClass) {
                                                EClass cc = (EClass)c;
                                                if (cc.getName().equals(p.type)) {
                                                    //TODO add FQN of class aspect
                                                    newEParam.setEType(cc);
                                                }
                                            }
                                        }
                                        if (newEParam.getEType() == null) {
                                            EDataType dataTypeParam = EcoreFactory.eINSTANCE.createEDataType();
                                            dataTypeParam.setName(p.type);
                                            newEParam.setEType(dataTypeParam);
                                        }
                                        newEOperation.getEParameters().add(newEParam);
                                    }
                                    eclass.getEOperations().add(newEOperation);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

