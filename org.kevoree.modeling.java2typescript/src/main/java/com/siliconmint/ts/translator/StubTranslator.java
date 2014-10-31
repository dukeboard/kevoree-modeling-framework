
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;

public class StubTranslator extends Translator<PsiElement> {

  public static final StubTranslator INSTANCE = new StubTranslator();

  @Override
  public void translate(PsiElementVisitor visitor, PsiElement element, TranslationContext ctx) {
    ctx.print(String.format("Unsupported type:  %s", element.toString()));
    ctx.increaseIdent();
    element.acceptChildren(visitor);
    ctx.decreaseIdent();
  }

}
