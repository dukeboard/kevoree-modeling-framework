package org.kevoree.modeling.idea.structure;

import com.intellij.icons.AllIcons;
import com.intellij.ide.structureView.StructureViewTreeElement;
import com.intellij.ide.util.treeView.smartTree.SortableTreeElement;
import com.intellij.ide.util.treeView.smartTree.TreeElement;
import com.intellij.navigation.ItemPresentation;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.editor.ScrollType;
import com.intellij.util.PlatformIcons;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.idea.psi.MetaModelClassDeclaration;
import org.kevoree.modeling.idea.psi.MetaModelEnumDeclaration;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by gregory.nain on 16/07/2014.
 */
public class MetaModelStructureViewEnumElement implements StructureViewTreeElement, SortableTreeElement {

    private MetaModelEnumDeclaration enumDecl;
    private String presText;
    private Editor editor;
    public List<MetaModelStructureViewEnumElementElement> elements = new ArrayList<MetaModelStructureViewEnumElementElement>();

    public MetaModelStructureViewEnumElement(MetaModelEnumDeclaration enumDecl, Editor editor) {
        this.enumDecl = enumDecl;
        this.editor = editor;
        int indexOfPoint = enumDecl.getTypeDeclaration().getName().lastIndexOf(".");
        if(indexOfPoint > 0) {
            presText = enumDecl.getTypeDeclaration().getName().substring(indexOfPoint+1);
        } else {
            presText = enumDecl.getTypeDeclaration().getName();
        }
    }

    @Override
    public Object getValue() {
        return enumDecl;
    }

    @Override
    public void navigate(boolean b) {
        //System.out.println("Editor:" + editor.getClass());
        editor.getCaretModel().moveToOffset(enumDecl.getTextOffset());
        editor.getScrollingModel().scrollToCaret(ScrollType.CENTER_UP);
    }

    @Override
    public boolean canNavigate() {
        return true;
    }

    @Override
    public boolean canNavigateToSource() {
        return true;
    }

    @NotNull
    @Override
    public ItemPresentation getPresentation() {
        return new ItemPresentation() {
            @Nullable
            @Override
            public String getPresentableText() {
                return presText;
            }

            @Nullable
            @Override
            public String getLocationString() {
                return null;
            }

            @Nullable
            @Override
            public Icon getIcon(boolean b) {
                return AllIcons.Nodes.Enum;
            }
        };
    }

    @Override
    public TreeElement[] getChildren() {
        List<TreeElement> all = new ArrayList<TreeElement>();
        all.addAll(elements);
        return all.toArray(new TreeElement[all.size()]);
    }

    @NotNull
    @Override
    public String getAlphaSortKey() {
        return presText;
    }
}
