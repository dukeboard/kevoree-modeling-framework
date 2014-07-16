package org.kevoree.modeling.idea.structure;

import com.intellij.ide.structureView.StructureViewModel;
import com.intellij.ide.structureView.StructureViewModelBase;
import com.intellij.ide.structureView.StructureViewTreeElement;
import com.intellij.ide.util.treeView.smartTree.Sorter;
import com.intellij.psi.PsiFile;
import org.jetbrains.annotations.NotNull;

/**
 * Created by gregory.nain on 16/07/2014.
 */
public class MetaModelStructureViewModel extends StructureViewModelBase {

    public MetaModelStructureViewModel(@NotNull PsiFile psiFile, @NotNull StructureViewTreeElement root) {
        super(psiFile, root);
    }

}
