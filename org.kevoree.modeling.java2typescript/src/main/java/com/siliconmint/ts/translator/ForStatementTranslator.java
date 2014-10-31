
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiForStatement;

public class ForStatementTranslator extends Translator<PsiForStatement> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiForStatement element, TranslationContext ctx) {
    ctx.print("for (");
    if (element.getInitialization() != null) {
      element.getInitialization().accept(visitor);
    }
    ctx.append("; ");
    if (element.getCondition() != null) {
      element.getCondition().accept(visitor);
    }
    ctx.append("; ");
    if (element.getUpdate() != null) {
      element.getUpdate().accept(visitor);
    }
    ctx.append(") {\n");

    ctx.increaseIdent();
    element.getBody().accept(visitor);
    ctx.decreaseIdent();

    ctx.print("}\n");
  }

}
