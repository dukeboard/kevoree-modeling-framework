package org.kevoree.modeling.idea.ide;

import com.intellij.lang.BracePair;
import com.intellij.psi.PsiFile;
import com.intellij.psi.tree.IElementType;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.idea.psi.MetaModelTypes;

public class MetaModelBraceMatcher implements com.intellij.lang.PairedBraceMatcher {
  private static BracePair[] ourBracePairs =
    {
      new BracePair(MetaModelTypes.BODY_OPEN, MetaModelTypes.BODY_CLOSE, true),
      new BracePair(MetaModelTypes.MULT_OPEN, MetaModelTypes.MULT_CLOSE, true),
    };

  @Override
  public BracePair[] getPairs() {
    return ourBracePairs;
  }

  @Override
  public boolean isPairedBracesAllowedBeforeType(@NotNull IElementType lbraceType, @Nullable IElementType contextType) {
    return true;
  }

  @Override
  public int getCodeConstructStart(PsiFile file, int openingBraceOffset) {
    return openingBraceOffset;
  }
}
