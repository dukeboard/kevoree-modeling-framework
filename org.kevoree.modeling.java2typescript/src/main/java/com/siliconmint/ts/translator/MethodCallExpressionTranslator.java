
package com.siliconmint.ts.translator;

import com.intellij.psi.*;

public class MethodCallExpressionTranslator extends Translator<PsiMethodCallExpression> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiMethodCallExpression element, TranslationContext ctx) {
    element.getMethodExpression().accept(visitor);
    ctx.append('(');

    PsiExpression[] arguments = element.getArgumentList().getExpressions();
    for (int i=0; i < arguments.length; i++){
      arguments[i].accept(visitor);
      if (i != arguments.length - 1) {
        ctx.append(", ");
      }
    }
    ctx.append(")");
  }

}
