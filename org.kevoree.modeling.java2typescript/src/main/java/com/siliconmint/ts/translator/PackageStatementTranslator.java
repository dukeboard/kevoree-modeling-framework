package com.siliconmint.ts.translator;

import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.PsiPackageStatement;

public class PackageStatementTranslator extends Translator<PsiPackageStatement> {

  @Override
  public void translate(PsiElementVisitor visitor, PsiPackageStatement element, TranslationContext ctx) {
    ctx.setClassPackage(element.getPackageName());
  }

}
