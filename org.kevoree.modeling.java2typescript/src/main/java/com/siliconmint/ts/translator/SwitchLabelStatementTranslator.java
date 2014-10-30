
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiSwitchLabelStatement;

public class SwitchLabelStatementTranslator extends Translator<PsiSwitchLabelStatement> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiSwitchLabelStatement element, TranslationContext ctx) {
    if (element.isDefaultCase()) {
      ctx.print("default: \n");
    } else {
      ctx.print("case ");
      element.getCaseValue().accept(visitor);
      ctx.append(": \n");
    }
  }

}
