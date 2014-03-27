package org.kevoree.modeling.kotlin.generator;

import org.eclipse.emf.ecore.EDataType;
import org.eclipse.emf.ecore.EOperation;
import org.eclipse.emf.ecore.EParameter;
import org.kevoree.modeling.aspect.AspectMethod;

import java.util.HashMap;

/**
 * Created with IntelliJ IDEA.
 * User: duke
 * Date: 07/10/13
 * Time: 16:59
 */
public class AspectMethodMatcher {

    private static HashMap<String, String> equivalentMap = new HashMap<String, String>();
    static {
        equivalentMap.put("List<*>", "MutableList");
        equivalentMap.put("List<Any?>", "MutableList");
        equivalentMap.put("List<Any?>", "MutableList<Any?>");
        equivalentMap.put("MutableIterator<*>", "MutableIterator");
        equivalentMap.put("MutableIterator<Any?>", "MutableIterator");
        equivalentMap.put("Class<out Any?>", "Class");
    }

    public static Boolean isMethodEqual(EOperation eop, AspectMethod aop, GenerationContext ctx) {
        if (!eop.getName().equals(aop.name)) {
            return false;
        }
        String methodReturnTypeTxt = "";
        if (eop.getEType() != null) {
            if (eop.getEType() instanceof EDataType) {
                methodReturnTypeTxt = ProcessorHelper.getInstance().convertType(eop.getEType().getName());
            } else {
                methodReturnTypeTxt = ProcessorHelper.getInstance().fqn(ctx, eop.getEType());
            }
        }

        boolean  returnTypeCheck = false;

        returnTypeCheck |= equivalentMap.get(methodReturnTypeTxt) == aop.returnType;
        returnTypeCheck |= (equivalentMap.get(methodReturnTypeTxt) != null) && equivalentMap.get(methodReturnTypeTxt).equals(aop.returnType);
        returnTypeCheck |= (eop.getEType() != null && eop.getEType().getName() != null && eop.getEType().getName().equals(aop.returnType));
        returnTypeCheck |= (eop.getEType() != null && eop.getLowerBound() == 0 && eop.getEType().getName() != null && (eop.getEType().getName()+"?").equals(aop.returnType));
        returnTypeCheck |= (eop.getEType() != null && ProcessorHelper.getInstance().fqn(ctx,eop.getEType()).equals(aop.returnType));
        returnTypeCheck |= (eop.getEType() != null && eop.getLowerBound() == 0 && (ProcessorHelper.getInstance().fqn(ctx,eop.getEType())+"?").equals(aop.returnType));
        returnTypeCheck |= aop.returnType != null && methodReturnTypeTxt.equals(aop.returnType);


        if (!returnTypeCheck) {
            System.err.println(methodReturnTypeTxt + "<->" + aop.returnType+"-"+(eop.getLowerBound() == 0)+"-"+(eop.getEType() != null && eop.getLowerBound() == 0 && (ProcessorHelper.getInstance().fqn(ctx,eop.getEType())+"?").equals(aop.returnType))+"-"+(ProcessorHelper.getInstance().fqn(ctx,eop.getEType())+"?"));
            return false;
        }
        if (eop.getEParameters().size() != aop.params.size()) {
            //System.out.println(aop.name+"-"+eop.getEParameters().size()+"<?>"+aop.params.size());
            return false;
        } else {
            int i = 0;

            for(EParameter eparam : eop.getEParameters()) {
                i = i + 1;
                if (eparam.getEType() instanceof EDataType) {
                    methodReturnTypeTxt = ProcessorHelper.getInstance().convertType(eparam.getEType().getName());
                } else {
                    methodReturnTypeTxt = ProcessorHelper.getInstance().fqn(ctx, eparam.getEType());
                }
                returnTypeCheck = false;
                if (((equivalentMap.get(methodReturnTypeTxt) != null) && equivalentMap.get(methodReturnTypeTxt).equals(aop.params.get(i - 1).type)) || (eparam.getEType() != null && eparam.getEType().getName().equals(aop.params.get(i - 1).type))) {
                    returnTypeCheck = true;
                } else {
                    if (methodReturnTypeTxt.equals(aop.params.get(i - 1).type)) {
                        returnTypeCheck = true;
                    }
                }

                if (!returnTypeCheck) {
                    System.err.println(methodReturnTypeTxt + "<=>" + aop.params.get(i - 1).type + "/" + returnTypeCheck);
                    return false;
                }
            }

        }
        return true;
    }

}
