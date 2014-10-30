
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiConditionalExpression;
import com.intellij.psi.PsiElementVisitor;

public class ConditionalExpressionTranslator extends Translator<PsiConditionalExpression> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiConditionalExpression element, TranslationContext ctx) {
    element.getCondition().accept(visitor);
    ctx.append(" ? ");
    element.getThenExpression().accept(visitor);
    ctx.append(" : ");
    element.getElseExpression().accept(visitor);
  }

}
