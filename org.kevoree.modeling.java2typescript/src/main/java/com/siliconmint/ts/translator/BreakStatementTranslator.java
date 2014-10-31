
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiBreakStatement;
import com.intellij.psi.PsiElementVisitor;

public class BreakStatementTranslator extends Translator<PsiBreakStatement> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiBreakStatement element, TranslationContext ctx) {
    ctx.print("break");
    if (element.getLabelIdentifier() != null) {
      ctx.append(' ');
      ctx.append(element.getLabelIdentifier().getText().trim());
    }
    ctx.append(";\n");
  }

}
