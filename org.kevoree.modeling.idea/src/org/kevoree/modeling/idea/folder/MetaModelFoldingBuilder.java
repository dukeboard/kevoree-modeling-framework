package org.kevoree.modeling.idea.folder;

import com.intellij.lang.ASTNode;
import com.intellij.lang.folding.FoldingBuilder;
import com.intellij.lang.folding.FoldingDescriptor;
import com.intellij.openapi.editor.Document;
import com.intellij.openapi.util.TextRange;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.idea.psi.MetaModelTypes;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by gregory.nain on 15/07/2014.
 */
public class MetaModelFoldingBuilder implements FoldingBuilder {
    @NotNull
    @Override
    public FoldingDescriptor[] buildFoldRegions(@NotNull ASTNode node, @NotNull Document document) {
        List<FoldingDescriptor> descriptors = new ArrayList<FoldingDescriptor>();

        appendDescriptors(node, document, descriptors);
        return descriptors.toArray(new FoldingDescriptor[descriptors.size()]);
    }


    private void appendDescriptors(final ASTNode node, final Document document, final List<FoldingDescriptor> descriptors) {

        if(node.getElementType() == MetaModelTypes.CLASS_DECLARATION || node.getElementType() == MetaModelTypes.ENUM_DECLARATION) {
            TextRange fullRange = node.getTextRange();
            if(fullRange.getEndOffset() - fullRange.getStartOffset() > 0) {

                try {
                    TextRange shortRange = new TextRange(fullRange.getStartOffset() + document.getText(fullRange).indexOf("{") + 1,fullRange.getEndOffset() - 1);
                    if (shortRange.getEndOffset() - shortRange.getStartOffset() > 1) {
                        descriptors.add(new FoldingDescriptor(node, shortRange));
                    }
                } catch (Exception e){

                }


            }
        }

        ASTNode child = node.getFirstChildNode();
        while (child != null) {
            appendDescriptors(child, document, descriptors);
            child = child.getTreeNext();
        }
    }

    @Nullable
    @Override
    public String getPlaceholderText(@NotNull ASTNode node) {
        return "...";

    }

    @Override
    public boolean isCollapsedByDefault(@NotNull ASTNode astNode) {
        return false;
    }
}

