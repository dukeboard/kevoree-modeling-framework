
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiInstanceOfExpression;

public class InstanceOfExpressionTranslator extends Translator<PsiInstanceOfExpression> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiInstanceOfExpression element, TranslationContext ctx) {
    element.getOperand().accept(visitor);
    ctx.append(" instanceof ").append(TypeHelper.getType(element.getCheckType().getType()));
  }

}
