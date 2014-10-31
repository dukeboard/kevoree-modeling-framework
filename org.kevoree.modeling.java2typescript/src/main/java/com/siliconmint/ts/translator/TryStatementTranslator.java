
package com.siliconmint.ts.translator;

import com.intellij.psi.PsiCatchSection;
import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiTryStatement;

public class TryStatementTranslator extends Translator<PsiTryStatement> {

  private static final String EXCEPTION_VAR = "$ex$";

  @Override
  public void translate(PsiElementVisitor visitor, PsiTryStatement element, TranslationContext ctx) {
    ctx.print("try {\n");
    ctx.increaseIdent();

    element.getTryBlock().accept(visitor);

    ctx.decreaseIdent();
    ctx.print("}");

    PsiCatchSection[] catchSections = element.getCatchSections();
    if (catchSections != null && catchSections.length > 0) {
      ctx.append(" catch (").append(EXCEPTION_VAR).append(") {\n");

      ctx.increaseIdent();

      for (int i=0; i < catchSections.length; i++) {
        PsiCatchSection catchSection = catchSections[i];
        String exceptionType = TypeHelper.getType(catchSection.getCatchType());


        ctx.print("if (").append(EXCEPTION_VAR).append(" instanceof ").append(exceptionType).append(") {\n");

        ctx.increaseIdent();

        ctx.print("var ").append(catchSection.getParameter().getName());
        ctx.append(": ").append(exceptionType).append(" = <").append(exceptionType).append(">").append(EXCEPTION_VAR).append(";\n");

        catchSection.accept(visitor);

        ctx.decreaseIdent();

        if (i != catchSections.length - 1) {
          ctx.print("} else ");
        } else {
          ctx.print("}\n ");
        }
      }

      ctx.decreaseIdent();

      ctx.print("}");
    }

    if ( element.getFinallyBlock() != null ) {
      ctx.append(" finally {\n");

      ctx.increaseIdent();
      element.getFinallyBlock().accept(visitor);
      ctx.decreaseIdent();

      ctx.print("}");
    }

    ctx.append("\n");
  }

}
