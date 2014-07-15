// This is a generated file. Not intended for manual editing.
package org.kevoree.modeling.idea.psi.impl;

import java.util.List;
import org.jetbrains.annotations.*;
import com.intellij.lang.ASTNode;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.util.PsiTreeUtil;
import static org.kevoree.modeling.idea.psi.MetaModelTypes.*;
import org.kevoree.modeling.idea.psi.*;

public class MetaModelTypeDeclarationImpl extends MetaModelNamedElementImpl implements MetaModelTypeDeclaration {

  public MetaModelTypeDeclarationImpl(ASTNode node) {
    super(node);
  }

  public void accept(@NotNull PsiElementVisitor visitor) {
    if (visitor instanceof MetaModelVisitor) ((MetaModelVisitor)visitor).visitTypeDeclaration(this);
    else super.accept(visitor);
  }

  @Override
  @NotNull
  public PsiElement getIdent() {
    return findNotNullChildByType(IDENT);
  }

  public PsiElement setName(String newName) {
    return MetaModelUtil.setName(this, newName);
  }

  public PsiElement getNameIdentifier() {
    return MetaModelUtil.getNameIdentifier(this);
  }

}
