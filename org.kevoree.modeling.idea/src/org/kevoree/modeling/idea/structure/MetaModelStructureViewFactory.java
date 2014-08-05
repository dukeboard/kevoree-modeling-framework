package org.kevoree.modeling.idea.structure;

import com.intellij.ide.structureView.*;
import com.intellij.lang.PsiStructureViewFactory;
import com.intellij.openapi.editor.Editor;
import com.intellij.psi.PsiFile;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

/**
 * Created by gregory.nain on 16/07/2014.
 */
public class MetaModelStructureViewFactory implements PsiStructureViewFactory{



    public StructureViewBuilder getStructureViewBuilder(final PsiFile psiFile) {
        return new TreeBasedStructureViewBuilder() {
            @NotNull
            @Override
            public StructureViewModel createStructureViewModel(@Nullable Editor editor) {
                return new MetaModelStructureViewModel(psiFile, buildTree(psiFile, editor), editor);
            }

        };
    }

    private MetaModelStructureViewRootElement buildTree(PsiFile psiFile, final Editor editor) {

        final MetaModelStructureViewRootElement root = new MetaModelStructureViewRootElement(psiFile, editor);
        root.refresh();

        return root;
    }




}
