package com.siliconmint.ts.translator;

import com.intellij.psi.PsiImportStatement;

public class ImportStatementTranslator extends ImportStatementTranslatorBase<PsiImportStatement> {

  @Override
  protected String[] getImportPath(PsiImportStatement element) {
    String qualifiedName = element.getQualifiedName();
      String[] result = qualifiedName.split("\\.");
      result[result.length-1] = TypeHelper.translateType(result[result.length-1]);
    return result;
  }

}
