
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiThisExpression;

public class ThisExpressionTranslator extends Translator<PsiThisExpression> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiThisExpression element, TranslationContext ctx) {
    ctx.append("this");
  }

}
