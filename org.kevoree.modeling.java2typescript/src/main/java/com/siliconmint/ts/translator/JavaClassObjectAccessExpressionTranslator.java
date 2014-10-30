package com.siliconmint.ts.translator;

import com.intellij.psi.PsiClassObjectAccessExpression;
import com.intellij.psi.PsiElementVisitor;

public class JavaClassObjectAccessExpressionTranslator extends Translator<PsiClassObjectAccessExpression> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiClassObjectAccessExpression element, TranslationContext ctx) {
    ctx.append(TypeHelper.getType(element.getOperand().getType()));
  }

}
