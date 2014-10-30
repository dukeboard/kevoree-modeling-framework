
package com.siliconmint.ts.translator;

import com.google.common.base.Joiner;
import com.intellij.psi.*;

import java.util.ArrayList;
import java.util.List;

public class ClassTranslator extends Translator<PsiClass> {

  private static final Joiner joiner = Joiner.on(", ");

  @Override
  public void translate(PsiElementVisitor visitor, PsiClass element, TranslationContext ctx) {

    boolean anonymousClass = element instanceof PsiAnonymousClass;

    if (!anonymousClass) {
      printClassDeclaration(element, ctx);
    }

    printClassMembers(visitor, element, ctx);

    if (!ctx.hasWhitespace()) {
      ctx.append("\n");
    }

    if (!anonymousClass) {
      ctx.print("}\n");
      ctx.append("\n");
    }

    printInnerClasses(visitor, element, ctx);

  }

  private void printInnerClasses(PsiElementVisitor visitor, PsiClass element, TranslationContext ctx) {
    PsiClass[] innerClasses = element.getInnerClasses();
    if (innerClasses != null && innerClasses.length > 0) {
      ctx.print("module ").append(element.getName()).append(" { \n");
      ctx.increaseIdent();
      for (PsiClass innerClass : innerClasses) {
        innerClass.accept(visitor);
        ctx.append("\n");
      }
      ctx.decreaseIdent();
      ctx.print("}\n");
    }
  }

  private void printClassMembers(PsiElementVisitor visitor, PsiClass element, TranslationContext ctx) {
    ctx.increaseIdent();

    PsiField[] fields = element.getFields();
    if (fields != null && fields.length > 0) {
      for (PsiField field: fields) {
        field.accept(visitor);
      }
    }

    PsiClassInitializer[] initializers = element.getInitializers();
    if (initializers != null && initializers.length > 0) {
      for (PsiClassInitializer initializer : initializers) {
        if (initializer.hasModifierProperty("static")){
          ctx.print("//TODO Resolve static initializer\n");
          ctx.print("static {\n");
        } else {
          ctx.print("//TODO Resolve instance initializer\n");
          ctx.print("{\n");
        }
        ctx.increaseIdent();
        initializer.getBody().accept(visitor);
        ctx.decreaseIdent();
        ctx.print("}\n");
      }
    }

    PsiMethod[] methods = element.getMethods();
    if (methods != null && methods.length > 0) {
      for (PsiMethod method : methods) {
        method.accept(visitor);
      }
    }

      if(element.isEnum()) {
          ctx.print("public equals(other: AccessMode): boolean {\n" +
                  "        return this == other;\n" +
                  "    }\n");
      }

    ctx.decreaseIdent();
  }

  private void printClassDeclaration(PsiClass element, TranslationContext ctx) {
    if (!ctx.hasWhitespace()){
      ctx.append("\n");
    }

    if (element.isInterface()) {
      ctx.print("interface ");
    } else {
      ctx.print("class ");
    }

    ctx.append(element.getName());

    PsiTypeParameter[] typeParameters = element.getTypeParameters();
    if (typeParameters != null && typeParameters.length > 0) {
      ctx.append('<');
      for (int i=0; i < typeParameters.length; i++) {
        ctx.append(typeParameters[i].getName());
        if (i != typeParameters.length - 1) {
          ctx.append(", ");
        }
      }
      ctx.append('>');
    }

    PsiClassType[] extendsList = element.getExtendsListTypes();
    if (extendsList != null && extendsList.length != 0 && !element.isEnum()) {
      ctx.append(" extends ");

      writeTypeList(ctx, extendsList);
    }

    PsiClassType[] implementsList = element.getImplementsListTypes();
    if (implementsList != null && implementsList.length != 0) {
      ctx.append(" implements ");

      writeTypeList(ctx, implementsList);
    }

    ctx.append(" {\n\n");
  }

  private void writeTypeList(TranslationContext ctx, PsiClassType[] typeList) {
    for (int i=0; i < typeList.length; i++) {
      PsiClassType type = typeList[i];

      ctx.append(TypeHelper.getType(type));

        /*
      PsiType[] parameters = type.getParameters();
      if (parameters != null && parameters.length > 0) {
        ctx.append('<');
        TypeHelper.getTypeParameters(parameters);
        ctx.append('>');
      }
*/
      if (i != typeList.length - 1) {
        ctx.append(", ");
      }
    }
  }

}
