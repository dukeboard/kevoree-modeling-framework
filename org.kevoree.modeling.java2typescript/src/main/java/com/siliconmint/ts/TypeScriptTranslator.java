
package com.siliconmint.ts;

import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;
import com.siliconmint.ts.translator.*;

public class TypeScriptTranslator extends PsiElementVisitor {

  private TranslationContext ctx = new TranslationContext();

  @Override
  public void visitElement(PsiElement element) {
    translateElement(element);
  }

  protected void translateElement(PsiElement element) {
    Translators.getTranslator(element).translate(this, element, ctx);
  }

  public TranslationContext getCtx() {
    return ctx;
  }
}
