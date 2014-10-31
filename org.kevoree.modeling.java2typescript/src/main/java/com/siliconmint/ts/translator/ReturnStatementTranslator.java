
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiReturnStatement;

public class ReturnStatementTranslator extends Translator<PsiReturnStatement> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiReturnStatement element, TranslationContext ctx) {
    ctx.print("return");
    if (element.getReturnValue() != null) {
      ctx.append(' ');
      element.getReturnValue().accept(visitor);
    }
    ctx.append(";\n");
  }

}
