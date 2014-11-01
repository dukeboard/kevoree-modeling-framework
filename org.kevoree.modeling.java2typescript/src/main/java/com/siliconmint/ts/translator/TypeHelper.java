
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

    public static String getFieldType(PsiField element) {
        return getType(element.getType());
    }

    public static String getMethodReturnType(PsiMethod element) {
        if (element.getReturnType() == null) {
            return "void";
        } else {
            return getType(element.getReturnType());
        }
    }

    public static String getParameterType(PsiParameter parameter) {
        return getType(parameter.getType());
    }

    public static String getVariableType(PsiLocalVariable variable){
        return getType(variable.getType());
    }

    public static String getAnonymousClassType(PsiAnonymousClass clazz){
        return getType(clazz.getBaseClassType());
    }

    public static String getType(PsiJavaCodeReferenceElement reference) {
        String typeName;

        if (reference.isQualified()) {
            typeName = translateType(reference.getQualifiedName());
        } else {
            typeName = translateType(reference.getReferenceName());
        }

        PsiType[] typeParameters = reference.getTypeParameters();
        if (typeParameters != null && typeParameters.length > 0) {
            return String.format("%s<%s>", typeName, getTypeParameters(typeParameters));
        } else {
            return typeName;
        }
    }

    public static String getType(PsiType type) {
        if (type instanceof PsiArrayType) {
            type = ((PsiArrayType) type).getComponentType();
            String translatedType = getType(type);
            return translatedType.concat("[]");
        } else if (type instanceof PsiClassReferenceType) {
            PsiJavaCodeReferenceElement reference = ((PsiClassReferenceType) type).getReference();
            return getType(reference);
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

    public static String getTypeParameters(PsiType[] typeParameters) {
        List<String> paramStrings = new ArrayList<String>();
        for (PsiType type: typeParameters) {
            paramStrings.add(getType(type));
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
