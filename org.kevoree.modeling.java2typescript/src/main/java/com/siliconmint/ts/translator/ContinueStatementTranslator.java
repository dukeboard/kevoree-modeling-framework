
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiContinueStatement;
import com.intellij.psi.PsiElementVisitor;

public class ContinueStatementTranslator extends Translator<PsiContinueStatement> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiContinueStatement element, TranslationContext ctx) {
    ctx.print("continue");
    if (element.getLabelIdentifier() != null) {
      ctx.append(' ');
      ctx.append(element.getLabelIdentifier().getText().trim());
    }
    ctx.append(";\n");
  }

}
