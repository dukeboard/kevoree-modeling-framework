
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiArrayAccessExpression;
import com.intellij.psi.PsiElementVisitor;

public class ArrayAccessExpressionTranslator extends Translator<PsiArrayAccessExpression> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiArrayAccessExpression element, TranslationContext ctx) {
    element.getArrayExpression().accept(visitor);
    ctx.append('[');
    element.getIndexExpression().accept(visitor);
    ctx.append(']');
  }

}
