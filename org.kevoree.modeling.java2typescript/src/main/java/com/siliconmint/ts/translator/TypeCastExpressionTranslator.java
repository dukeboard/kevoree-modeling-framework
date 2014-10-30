
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiTypeCastExpression;

public class TypeCastExpressionTranslator extends Translator<PsiTypeCastExpression> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiTypeCastExpression element, TranslationContext ctx) {
    ctx.append('<').append(TypeHelper.getType(element.getCastType().getType())).append('>');
    element.getOperand().accept(visitor);
  }

}
