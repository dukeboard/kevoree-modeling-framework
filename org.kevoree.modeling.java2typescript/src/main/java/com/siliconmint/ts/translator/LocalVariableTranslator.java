package com.siliconmint.ts.translator;

import com.intellij.psi.*;

public class LocalVariableTranslator extends Translator<PsiLocalVariable> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiLocalVariable element, TranslationContext ctx) {
    boolean loopDeclaration = false;

    PsiElement parent = element.getParent();
    if (parent instanceof PsiDeclarationStatement) {
      parent = parent.getParent();
      if (parent instanceof PsiLoopStatement) {
        loopDeclaration = true;
      }
    }

    if (loopDeclaration) {
      ctx.append("var ");
    } else {
      ctx.print("var ");
    }


    ctx.append(element.getName());
    ctx.append(": ");
    ctx.append(TypeHelper.getVariableType(element));

    if (element.hasInitializer()) {
      ctx.append(" = ");
      element.getInitializer().accept(visitor);
    }

    if (!loopDeclaration) {
      ctx.append(";");
      ctx.append("\n");
    }
  }
}
