
package com.siliconmint.ts.translator;

import com.google.common.base.*;
import com.intellij.psi.*;

import java.util.*;

public class AnonymousClassTranslator<T extends PsiAnonymousClass> extends Translator<T> {

    private static final Joiner joiner = Joiner.on(", ");

    @Override
    public void translate(PsiElementVisitor visitor, T element, TranslationContext ctx) {

        ctx.append("{");

        printClassMembers(visitor, element, ctx);

        ctx.append("}");
    }


    private void printClassMembers(PsiElementVisitor visitor, T element, TranslationContext ctx) {
        PsiMethod[] methods = element.getMethods();

        for(int i = 0; i < methods.length; i++) {
            PsiMethod method = methods[i];
            ctx.append(method.getName());
            ctx.append(":function(");
            printParameterList(method, ctx);
            ctx.append("){\n");
            if(method.getBody() != null) {
                method.getBody().accept(visitor);
            }
            ctx.append("}");
            if(i < methods.length-1) {
                ctx.append(", ");
            }
        }

    }


    private void printParameterList(PsiMethod element, TranslationContext ctx) {
        List<String> params = new ArrayList<String>();
        StringBuilder paramSB = new StringBuilder();

        for (PsiParameter parameter : element.getParameterList().getParameters()) {
            paramSB.setLength(0);
            if (parameter.isVarArgs()) {
                paramSB.append("...");
            }
            paramSB.append(parameter.getName());
            paramSB.append(": ");
            paramSB.append(TypeHelper.getParameterType(parameter));
            params.add(paramSB.toString());
        }
        ctx.append(joiner.join(params));
    }

}
