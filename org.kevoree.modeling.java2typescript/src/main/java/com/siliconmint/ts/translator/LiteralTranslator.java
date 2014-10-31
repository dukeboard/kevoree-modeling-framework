
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiLiteralExpression;

public class LiteralTranslator extends Translator<PsiLiteralExpression> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiLiteralExpression element, TranslationContext ctx) {
    ctx.append(element.getText().trim());
  }

}
