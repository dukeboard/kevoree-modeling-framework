
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiSuperExpression;

public class SuperExpressionTranslator extends Translator<PsiSuperExpression> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiSuperExpression element, TranslationContext ctx) {
    ctx.append("super");
  }

}
