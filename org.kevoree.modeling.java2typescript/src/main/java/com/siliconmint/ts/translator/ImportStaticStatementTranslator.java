package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiImportStaticStatement;
import com.intellij.psi.impl.source.PsiImportStaticStatementImpl;

public class ImportStaticStatementTranslator extends ImportStatementTranslatorBase<PsiImportStaticStatement> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiImportStaticStatement element, TranslationContext ctx) {
    ctx.print("// TODO Resolve static imports\n");
    super.translate(visitor, element, ctx);
  }

  @Override
  protected String[] getImportPath(PsiImportStaticStatement element) {
    PsiImportStaticStatementImpl importStatement = (PsiImportStaticStatementImpl) element;
    return importStatement.getClassReference().getQualifiedName().split("\\.");
  }

}

