package org.kevoree.modeling.idea.structure;

import com.intellij.ide.structureView.StructureViewTreeElement;
import com.intellij.ide.util.treeView.smartTree.SortableTreeElement;
import com.intellij.ide.util.treeView.smartTree.TreeElement;
import com.intellij.navigation.ItemPresentation;
import com.intellij.openapi.editor.Editor;
import com.intellij.openapi.editor.ScrollType;
import com.intellij.util.PlatformIcons;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.kevoree.modeling.idea.psi.MetaModelOperationDeclaration;

import javax.swing.*;

/**
 * Created by gregory.nain on 16/07/2014.
 */
public class MetaModelStructureViewOperationElement implements StructureViewTreeElement, SortableTreeElement {

    private MetaModelOperationDeclaration opeDecl;
    private Editor editor;
    private Icon myIcon = PlatformIcons.FIELD_ICON;
    private String simpleType = null;
    private boolean attribute = false;
    private boolean id = false;
    private boolean contained = false;


    public MetaModelStructureViewOperationElement(MetaModelOperationDeclaration opeDecl, Editor editor) {
        this.opeDecl = opeDecl;
        this.editor = editor;
        if (opeDecl.getOperationReturn() != null) {
            simpleType = opeDecl.getOperationReturn().getTypeDeclaration().getText().substring(opeDecl.getOperationReturn().getTypeDeclaration().getText().lastIndexOf(".") + 1);
        }

        setIcon();
    }


    private void setIcon() {
        myIcon = PlatformIcons.METHOD_ICON;
    }

    public boolean isAttribute() {
        return attribute;
    }

    public boolean isId() {
        return id;
    }

    public boolean isContained() {
        return contained;
    }

    @Override
    public Object getValue() {
        return opeDecl;
    }

    @Override
    public void navigate(boolean b) {
        editor.getCaretModel().moveToOffset(opeDecl.getTextOffset());
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
                return opeDecl.getOperationName().getIdent().getText() + " : " + simpleType;
            }

            @Nullable
            @Override
            public String getLocationString() {
                return null;
            }

            @Nullable
            @Override
            public Icon getIcon(boolean b) {
                return myIcon;
            }
        };
    }

    @Override
    public TreeElement[] getChildren() {
        return EMPTY_ARRAY;
    }

    @NotNull
    @Override
    public String getAlphaSortKey() {
        return opeDecl.getOperationName().getIdent().getText();
    }
}
