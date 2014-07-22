package org.kevoree.modeling.idea.ide;

import com.intellij.codeInsight.completion.*;
import com.intellij.codeInsight.lookup.LookupElementBuilder;
import com.intellij.patterns.PlatformPatterns;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiElementVisitor;
import com.intellij.util.ProcessingContext;
import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling.MetaModelLanguage;
import org.kevoree.modeling.idea.psi.MetaModelDeclaration;
import org.kevoree.modeling.idea.psi.MetaModelTypes;
import org.kevoree.modeling.util.PrimitiveTypes;

/**
 * Created by duke on 21/01/2014.
 */
public class MetaModelCompletionContributor extends CompletionContributor {


    public MetaModelCompletionContributor() {
        extend(CompletionType.BASIC,
                PlatformPatterns.psiElement(MetaModelTypes.IDENT).withLanguage(MetaModelLanguage.INSTANCE).afterLeaf(PlatformPatterns.psiElement(MetaModelTypes.COLON)),
                new CompletionProvider<CompletionParameters>() {
                    public void addCompletions(@NotNull CompletionParameters parameters,
                                               ProcessingContext context,
                                               @NotNull final CompletionResultSet resultSet) {
                        for (PrimitiveTypes p : PrimitiveTypes.values()) {
                            resultSet.addElement(LookupElementBuilder.create(p.toString()));
                        }
                        parameters.getOriginalFile().acceptChildren(new PsiElementVisitor() {
                            @Override
                            public void visitElement(PsiElement element) {
                                if (element instanceof MetaModelDeclaration) {
                                    MetaModelDeclaration declaration = (MetaModelDeclaration) element;
                                    if (declaration.getClassDeclaration() != null && declaration.getClassDeclaration().getTypeDeclaration() != null) {
                                        resultSet.addElement(LookupElementBuilder.create(declaration.getClassDeclaration().getTypeDeclaration()));
                                    }
                                }
                                super.visitElement(element);
                            }
                        });
                    }
                }
        );
        extend(CompletionType.BASIC,
                PlatformPatterns.psiElement(MetaModelTypes.IDENT).withLanguage(MetaModelLanguage.INSTANCE).afterLeaf(PlatformPatterns.psiElement(MetaModelTypes.MULT_CLOSE)),
                new CompletionProvider<CompletionParameters>() {
                    public void addCompletions(@NotNull CompletionParameters parameters,
                                               ProcessingContext context,
                                               @NotNull final CompletionResultSet resultSet) {
                        resultSet.addElement(LookupElementBuilder.create("oppositeOf"));
                    }
                }
        );

        extend(CompletionType.BASIC,
                PlatformPatterns.psiElement(MetaModelTypes.ANNOTATION).withLanguage(MetaModelLanguage.INSTANCE),
                new CompletionProvider<CompletionParameters>() {
                    public void addCompletions(@NotNull CompletionParameters parameters,
                                               ProcessingContext context,
                                               @NotNull final CompletionResultSet resultSet) {

                        if(parameters.getPosition().getText().startsWith("@")){
                            resultSet.addElement(LookupElementBuilder.create("id"));
                            resultSet.addElement(LookupElementBuilder.create("contained"));
                        } else {
                            resultSet.addElement(LookupElementBuilder.create("@id"));
                            resultSet.addElement(LookupElementBuilder.create("@contained"));
                        }
                    }
                }
        );

        extend(CompletionType.BASIC,
                PlatformPatterns.psiElement().withLanguage(MetaModelLanguage.INSTANCE).afterLeaf(PlatformPatterns.psiElement(MetaModelTypes.BODY_CLOSE)),
                new CompletionProvider<CompletionParameters>() {
                    public void addCompletions(@NotNull CompletionParameters parameters,
                                               ProcessingContext context,
                                               @NotNull CompletionResultSet resultSet) {
                        resultSet.addElement(LookupElementBuilder.create("class "));
                    }
                }
        );
    }

}
