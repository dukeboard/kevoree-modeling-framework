
package com.siliconmint.ts.translator;

import com.intellij.psi.*;

public class FieldTranslator extends Translator<PsiField> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiField element, TranslationContext ctx) {
    if (element instanceof PsiEnumConstant) {
      translateEnumConstant(visitor, (PsiEnumConstant) element, ctx);
    } else {
      translateClassField(visitor, element, ctx);
    }
  }

  private void translateEnumConstant(PsiElementVisitor visitor, PsiEnumConstant element, TranslationContext ctx) {
    String enumName = ((PsiClass) element.getParent()).getName();
    ctx.print("public static ").append(element.getName()).append(": ").append(enumName);
    ctx.append(" = new ").append(enumName);
    ctx.append('(');
    if (element.getArgumentList() != null) {
      PsiExpression[] arguments = element.getArgumentList().getExpressions();
      for (int i=0; i < arguments.length; i++) {
        arguments[i].accept(visitor);
        if (i != arguments.length - 1) {
          ctx.append(", ");
        }
      }
    }
    ctx.append(");\n");
  }

  private void translateClassField(PsiElementVisitor visitor, PsiField element, TranslationContext ctx) {

    PsiModifierList modifierList = element.getModifierList();
    if (modifierList.hasModifierProperty("private")) {
      ctx.print("private ");
    } else {
      ctx.print("public ");
    }

    if (modifierList.hasModifierProperty("static")) {
      ctx.append("static ");
    }

    ctx.append(element.getName()).append(": ").append(TypeHelper.getFieldType(element));

    if (element.hasInitializer()) {
      ctx.append(" = ");

      element.getInitializer().accept(visitor);

      ctx.append(";\n");
    } else {
      if (TypeHelper.isPrimitiveField(element)) {
        ctx.append(" = 0");
      } else {
        ctx.append(" = null");
      }

      ctx.append(";\n");
    }
  }

}
