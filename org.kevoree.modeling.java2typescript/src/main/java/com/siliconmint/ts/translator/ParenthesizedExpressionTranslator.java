
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiParenthesizedExpression;

public class ParenthesizedExpressionTranslator extends Translator<PsiParenthesizedExpression> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiParenthesizedExpression element, TranslationContext ctx) {
    ctx.append('(');
    element.getExpression().accept(visitor);
    ctx.append(')');
  }

}
