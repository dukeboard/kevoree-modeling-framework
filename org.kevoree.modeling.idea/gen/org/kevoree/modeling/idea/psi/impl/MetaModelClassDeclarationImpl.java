// This is a generated file. Not intended for manual editing.
package org.kevoree.modeling.idea.psi.impl;

import java.util.List;
import org.jetbrains.annotations.*;
import com.intellij.lang.ASTNode;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;
import com.intellij.psi.util.PsiTreeUtil;
import static org.kevoree.modeling.idea.psi.MetaModelTypes.*;
import com.intellij.extapi.psi.ASTWrapperPsiElement;
import org.kevoree.modeling.idea.psi.*;

public class MetaModelClassDeclarationImpl extends ASTWrapperPsiElement implements MetaModelClassDeclaration {

  public MetaModelClassDeclarationImpl(ASTNode node) {
    super(node);
  }

  public void accept(@NotNull PsiElementVisitor visitor) {
    if (visitor instanceof MetaModelVisitor) ((MetaModelVisitor)visitor).visitClassDeclaration(this);
    else super.accept(visitor);
  }

  @Override
  @NotNull
  public List<MetaModelClassElemDeclaration> getClassElemDeclarationList() {
    return PsiTreeUtil.getChildrenOfTypeAsList(this, MetaModelClassElemDeclaration.class);
  }

  @Override
  @Nullable
  public MetaModelParentsDeclaration getParentsDeclaration() {
    return findChildByClass(MetaModelParentsDeclaration.class);
  }

  @Override
  @Nullable
  public MetaModelTypeDeclaration getTypeDeclaration() {
    return findChildByClass(MetaModelTypeDeclaration.class);
  }

}
