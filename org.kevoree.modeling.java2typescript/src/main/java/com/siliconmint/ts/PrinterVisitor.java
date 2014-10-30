
package com.siliconmint.ts;

import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;

public class PrinterVisitor extends PsiElementVisitor {

  private final int identSize = 2;
  private int ident = 0;

  @Override
  public void visitElement(PsiElement element) {
    for (int i=0; i < ident; i++) {
      System.out.print(' ');
    }
    printElement(element);

    ident += 2;
    element.acceptChildren(this);
    ident -= 2;
  }

  protected void printElement(PsiElement element) {
    System.out.println(element.toString());
  }

}
