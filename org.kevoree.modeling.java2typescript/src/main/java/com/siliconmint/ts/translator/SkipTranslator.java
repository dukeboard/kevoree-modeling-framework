
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;

public class SkipTranslator extends Translator<PsiElement> {

  public static final SkipTranslator INSTANCE = new SkipTranslator();

  @Override
  public void translate(PsiElementVisitor visitor, PsiElement element, TranslationContext ctx) {
    element.acceptChildren(visitor);
  }

}
