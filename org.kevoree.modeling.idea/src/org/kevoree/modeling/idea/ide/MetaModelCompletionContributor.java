package org.kevoree.modeling.idea.ide;

import com.intellij.codeInsight.completion.*;
import com.intellij.codeInsight.lookup.LookupElementBuilder;
import com.intellij.patterns.PlatformPatterns;
import com.intellij.util.ProcessingContext;
import org.jetbrains.annotations.NotNull;
import org.kevoree.modeling.MetaModelLanguage;
import org.kevoree.modeling.idea.psi.MetaModelTypes;

/**
 * Created by duke on 21/01/2014.
 */
public class MetaModelCompletionContributor extends CompletionContributor {

    String[] primitives = {"String","Integer","Long"};

    public MetaModelCompletionContributor() {
        extend(CompletionType.BASIC,
                PlatformPatterns.psiElement(MetaModelTypes.IDENT).withLanguage(MetaModelLanguage.INSTANCE).afterLeaf(PlatformPatterns.psiElement(MetaModelTypes.COLON)),
                new CompletionProvider<CompletionParameters>() {
                    public void addCompletions(@NotNull CompletionParameters parameters,
                                               ProcessingContext context,
                                               @NotNull CompletionResultSet resultSet) {

                        for(String p : primitives){
                            resultSet.addElement(LookupElementBuilder.create(p));
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
