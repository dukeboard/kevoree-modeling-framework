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

public class MetaModelAnnotationImpl extends ASTWrapperPsiElement implements MetaModelAnnotation {

  public MetaModelAnnotationImpl(ASTNode node) {
    super(node);
  }

  public void accept(@NotNull PsiElementVisitor visitor) {
    if (visitor instanceof MetaModelVisitor) ((MetaModelVisitor)visitor).visitAnnotation(this);
    else super.accept(visitor);
  }

  @Override
  @Nullable
  public MetaModelAnnotationParam getAnnotationParam() {
    return findChildByClass(MetaModelAnnotationParam.class);
  }

  @Override
  @NotNull
  public PsiElement getTannotation() {
    return findNotNullChildByType(TANNOTATION);
  }

}
