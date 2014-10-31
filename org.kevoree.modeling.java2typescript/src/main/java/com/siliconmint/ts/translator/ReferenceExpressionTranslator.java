
package com.siliconmint.ts.translator;

import com.intellij.psi.*;

public class ReferenceExpressionTranslator extends Translator<PsiReferenceExpression> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiReferenceExpression element, TranslationContext ctx) {
    if (element.getQualifierExpression() != null) {
      element.getQualifierExpression().accept(visitor);
      ctx.append('.');
    } else {
      PsiElement resolution = element.resolve();
      if (resolution != null) {
        String qualifier = "this";
        if (resolution instanceof PsiField) {
          PsiField field = (PsiField) resolution;
          if (field.getModifierList().hasModifierProperty("static")) {
            qualifier = field.getContainingClass().getName();
          }
          ctx.append(qualifier).append('.');
        } else if (resolution instanceof PsiMethod) {
          PsiMethod method = (PsiMethod) resolution;
          if (method.getModifierList().hasModifierProperty("static")) {
            qualifier = method.getContainingClass().getName();
          }
          ctx.append(qualifier).append('.');
        }
      }
    }

    ctx.append(element.getReferenceName());
  }

}
