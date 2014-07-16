package org.kevoree.modeling.idea.structure;

import com.intellij.ide.structureView.StructureViewTreeElement;
import com.intellij.ide.util.treeView.smartTree.TreeElement;
import com.intellij.navigation.ItemPresentation;
import com.intellij.openapi.editor.Editor;
import com.intellij.psi.PsiElement;
import com.intellij.psi.PsiFile;
import com.intellij.util.Icons;
import com.intellij.util.PlatformIcons;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;

import javax.swing.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * Created by gregory.nain on 16/07/2014.
 */
public class MetaModelStructureViewRootElement implements StructureViewTreeElement {


    private PsiFile element;
    private Editor editor;
    public List<MetaModelStructureViewClassElement> innerClasses = new ArrayList<MetaModelStructureViewClassElement>();
    public HashMap<String, MetaModelStructureViewPackageElement> packages = new HashMap<String, MetaModelStructureViewPackageElement>();

    public MetaModelStructureViewRootElement(PsiFile element, Editor editor) {
        this.element = element;
        this.editor = editor;
    }

    @Override
    public Object getValue() {
        return element;
    }

    @Override
    public void navigate(boolean b) {

    }

    @Override
    public boolean canNavigate() {
        return false;
    }

    @Override
    public boolean canNavigateToSource() {
        return false;
    }

    @NotNull
    @Override
    public ItemPresentation getPresentation() {
        return new ItemPresentation() {
            @Nullable
            @Override
            public String getPresentableText() {
                return element.getVirtualFile().toString();
            }

            @Nullable
            @Override
            public String getLocationString() {
                return element.getVirtualFile().getCanonicalPath();
            }

            @Nullable
            @Override
            public Icon getIcon(boolean b) {
                return PlatformIcons.FILE_ICON;
            }
        };
    }

    @Override
    public TreeElement[] getChildren() {
        List<TreeElement> res = new ArrayList<TreeElement>();
        res.addAll(packages.values());
        res.addAll(innerClasses);
        return res.toArray(new TreeElement[res.size()]);
    }
}
