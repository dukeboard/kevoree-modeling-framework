package com.siliconmint.ts.translator;

import com.intellij.psi.PsiArrayInitializerExpression;
import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiExpression;

public class ArrayInitializerExpressionTranslator extends Translator<PsiArrayInitializerExpression> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiArrayInitializerExpression element, TranslationContext ctx) {
    ctx.append("{");
    PsiExpression[] initializers = element.getInitializers();
    if (initializers != null && initializers.length > 0) {
      for (int i=0; i < initializers.length; i++){
        initializers[i].accept(visitor);
        if (i != initializers.length - 1) {
          ctx.append(", ");
        }
      }
    }
    ctx.append("}");
  }

}
