package org.kevoree.modeling.idea.psi;

import com.intellij.codeInsight.lookup.LookupElement;
import com.intellij.codeInsight.lookup.LookupElementBuilder;
import com.intellij.openapi.project.Project;
import com.intellij.openapi.util.TextRange;
import com.intellij.psi.*;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.MetaModelIcons;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by duke on 7/15/14.
 */
public class MetaModelReference extends PsiReferenceBase<PsiElement> implements PsiPolyVariantReference {

    private String key;

    public MetaModelReference(@NotNull PsiElement element, TextRange textRange) {
        super(element, textRange);
        if (textRange != null) {
            key = element.getText().substring(textRange.getStartOffset(), textRange.getEndOffset());
        } else {
            key = element.getText();
        }
    }

    @NotNull
    @Override
    public ResolveResult[] multiResolve(boolean b) {
        Project project = myElement.getProject();
        final List<MetaModelTypeDeclaration> properties = MetaModelUtil.findProperties(project, key);
        List<ResolveResult> results = new ArrayList<ResolveResult>();
        for (MetaModelTypeDeclaration property : properties) {
            results.add(new PsiElementResolveResult(property));
        }
        return results.toArray(new ResolveResult[results.size()]);
    }

    @Nullable
    @Override
    public PsiElement resolve() {
        ResolveResult[] resolveResults = multiResolve(false);
        return resolveResults.length == 1 ? resolveResults[0].getElement() : null;
    }

    @NotNull
    @Override
    public Object[] getVariants() {
        Project project = myElement.getProject();
        List<MetaModelTypeDeclaration> properties = MetaModelUtil.findProperties(project);
        List<LookupElement> variants = new ArrayList<LookupElement>();
        for (final MetaModelTypeDeclaration property : properties) {
            if (property != null && property.getName() != null && property.getName().length() > 0) {
                variants.add(LookupElementBuilder.create(property).
                                withIcon(MetaModelIcons.KEVS_ICON_16x16).
                                withTypeText(property.getContainingFile().getName())
                );
            }
        }
        return variants.toArray();
    }
}
