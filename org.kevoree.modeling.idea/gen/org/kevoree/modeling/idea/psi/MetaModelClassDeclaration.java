// This is a generated file. Not intended for manual editing.
package org.kevoree.modeling.idea.psi;

import java.util.List;
import org.jetbrains.annotations.*;
import com.intellij.psi.PsiElement;

public interface MetaModelClassDeclaration extends PsiElement {

  @Nullable
  MetaModelParentsDeclaration getParentsDeclaration();

  @NotNull
  List<MetaModelRelationDeclaration> getRelationDeclarationList();

  @Nullable
  MetaModelTypeDeclaration getTypeDeclaration();

}
