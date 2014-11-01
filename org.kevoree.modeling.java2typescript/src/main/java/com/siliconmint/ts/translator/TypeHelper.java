
package com.siliconmint.ts.translator;

import com.google.common.base.Joiner;
import com.google.common.collect.ImmutableSet;
import com.intellij.psi.*;
import com.intellij.psi.impl.source.PsiClassReferenceType;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class TypeHelper {

    public static String getGenericsIfAny(TranslationContext ctx, String type) {
        StringBuilder paramSB = new StringBuilder();
        Integer generics = ctx.getGenerics().get(type);
        if(generics != null) {
            paramSB.append("<");
            for(int i = 0; i < generics ; i++) {
                paramSB.append("any");
                if(i < generics-1) {
                    paramSB.append(",");
                }
            }
            paramSB.append(">");
        }
        return paramSB.toString();
    }

    public static String getFieldType(PsiField element, TranslationContext ctx) {
        String res = getType(element.getType(), ctx);
        res = res + getGenericsIfAny(ctx, res);
        return res ;
    }

    public static String getMethodReturnType(PsiMethod element, TranslationContext ctx) {
        if (element.getReturnType() == null) {
            return "void";
        } else {
            String res = getType(element.getReturnType(), ctx);
            res = res + getGenericsIfAny(ctx, res);
            return res ;
        }
    }

    public static String getParameterType(PsiParameter parameter, TranslationContext ctx) {
        String res = getType(parameter.getType(), ctx);
        res = res + getGenericsIfAny(ctx, res);
        return res ;
    }

    public static String getVariableType(PsiLocalVariable variable, TranslationContext ctx){
        String res = getType(variable.getType(), ctx);
        res = res + getGenericsIfAny(ctx, res);
        return res ;
    }

    public static String getAnonymousClassType(PsiAnonymousClass clazz, TranslationContext ctx){
        return getType(clazz.getBaseClassType(), ctx);
    }

    public static String getType(PsiJavaCodeReferenceElement reference, TranslationContext ctx) {
        String typeName;

        if (reference.isQualified()) {
            typeName = translateType(reference.getQualifiedName());
        } else {
            typeName = translateType(reference.getReferenceName());
        }

        PsiType[] typeParameters = reference.getTypeParameters();
        if (typeParameters != null && typeParameters.length > 0) {
            return String.format("%s<%s>", typeName, getTypeParameters(typeParameters, ctx));
        } else {
            return typeName;
        }
    }

    public static String getType(PsiType type, TranslationContext ctx) {
        if (type instanceof PsiArrayType) {
            type = ((PsiArrayType) type).getComponentType();
            String translatedType = getType(type, ctx);
            translatedType = translatedType.concat(TypeHelper.getGenericsIfAny(ctx, translatedType));
            return translatedType.concat("[]");
        } else if (type instanceof PsiClassReferenceType) {
            PsiJavaCodeReferenceElement reference = ((PsiClassReferenceType) type).getReference();
            String resolvedRef = getType(reference, ctx);
            resolvedRef = resolvedRef + getGenericsIfAny(ctx, resolvedRef);
            return resolvedRef;
        } else {
            return translateType(type.getCanonicalText());
        }
    }

    public static String translateType(String type){
        if (objects.contains(type)) {
            return "any";
        } else if (primitiveNumbers.contains(type) || objectNumbers.contains(type)) {
            return "number";
        } else if (strings.contains(type)) {
            return "string";
        } else if (booleans.contains(type)) {
            return "boolean";
        } else {
            return type;
        }
    }

    public static boolean isPrimitiveField(PsiField element) {
        String elementType = element.getType().getCanonicalText();
        return primitiveNumbers.contains(elementType);
    }

    public static String getTypeParameters(PsiType[] typeParameters, TranslationContext ctx) {
        List<String> paramStrings = new ArrayList<String>();
        for (PsiType type: typeParameters) {
            paramStrings.add(getType(type, ctx));
        }
        return Joiner.on(", ").join(paramStrings);
    }

    public static final Set<String> primitiveNumbers = ImmutableSet.of("byte", "short", "int", "long", "float", "double");

    public static final Set<String> objectNumbers = ImmutableSet.of(
            Byte.class.getName(),
            Byte.class.getSimpleName(),
            Short.class.getName(),
            Short.class.getSimpleName(),
            Integer.class.getName(),
            Integer.class.getSimpleName(),
            Long.class.getName(),
            Long.class.getSimpleName(),
            Float.class.getName(),
            Float.class.getSimpleName(),
            Double.class.getName(),
            Double.class.getSimpleName(),
            BigInteger.class.getName(),
            BigInteger.class.getSimpleName(),
            BigDecimal.class.getName(),
            BigDecimal.class.getSimpleName()
    );

    public static final Set<String> strings = ImmutableSet.of(
            "char",
            Character.class.getName(),
            Character.class.getSimpleName(),
            String.class.getName(),
            String.class.getSimpleName()
    );

    public static final Set<String> booleans = ImmutableSet.of(
            "boolean",
            Boolean.class.getName(),
            Boolean.class.getSimpleName()
    );

    public static final Set<String> objects = ImmutableSet.of(
            Object.class.getName(),
            Object.class.getSimpleName()
    );

}
