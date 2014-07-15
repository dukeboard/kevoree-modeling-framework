package org.kevoree.modeling.idea.psi.impl;

import com.intellij.extapi.psi.ASTWrapperPsiElement;
import com.intellij.lang.ASTNode;
import com.intellij.navigation.ItemPresentation;
import com.intellij.openapi.util.TextRange;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiReference;
import com.intellij.util.IncorrectOperationException;
import org.jetbrains.annotations.NonNls;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.MetaModelIcons;
import org.kevoree.modeling.idea.psi.MetaModelNamedElement;
import org.kevoree.modeling.idea.psi.MetaModelReference;

import javax.swing.*;

/**
 * Created by duke on 7/14/14.
 */
public class MetaModelNamedElementImpl extends ASTWrapperPsiElement implements MetaModelNamedElement {

    public MetaModelNamedElementImpl(@NotNull ASTNode node) {
        super(node);
    }

    @Nullable
    @Override
    public PsiElement getNameIdentifier() {
        return null;
    }

    @Override
    public PsiElement setName(@NonNls @NotNull String s) throws IncorrectOperationException {
        return null;
    }

    @Override
    public String getName() {
        return getNameIdentifier().getText();
    }

    @Override
    public ItemPresentation getPresentation() {
        return new ItemPresentation() {
            @Nullable
            @Override
            public String getPresentableText() {
                return getName();
            }

            @Nullable
            @Override
            public String getLocationString() {
                return getNode().getPsi().getContainingFile().getName();
            }

            @Nullable
            @Override
            public Icon getIcon(boolean unused) {
                return MetaModelIcons.KEVS_ICON_16x16;
            }
        };
    }

    @Override
    public PsiReference getReference() {
        return new MetaModelReference(getNode().getPsi(), new TextRange(0, getName().length()));
    }
}
