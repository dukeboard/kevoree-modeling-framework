
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;

public abstract class Translator<T extends PsiElement> {

  public abstract void translate(PsiElementVisitor visitor, T element, TranslationContext ctx);

}
