
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiWhiteSpace;

public class WhitespaceTranslator extends Translator<PsiWhiteSpace> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiWhiteSpace element, TranslationContext ctx) {
    // ctx.print(element.getText());
  }

}
